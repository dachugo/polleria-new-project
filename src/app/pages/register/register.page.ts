import { Component } from '@angular/core';
import {
  IonicModule,
  LoadingController,
  AlertController,
  NavController,
} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

function passwordMatchValidator(
  password: string,
  confirmPassword: string
): ValidatorFn {
  return (form) => {
    const pass = form.get(password)?.value;
    const confirm = form.get(confirmPassword)?.value;
    return pass === confirm ? null : { mismatch: true };
  };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  credentials = this.fb.nonNullable.group(
    {
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: ['', [Validators.required]],
    },
    {
      validators: passwordMatchValidator('password', 'passwordConfirmation'),
    }
  );

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private navCtrl: NavController
  ) {}

  async createAccount() {
    const loading = await this.loadingController.create();
    await loading.present();

    const { email, password, name, lastname, address, phone } =
      this.credentials.getRawValue();

    // 1️⃣ Crear cuenta en Auth
    const { data, error } = await this.authService.supabaseClient.auth.signUp({
      email,
      password,
    });

    if (error || !data?.user) {
      await loading.dismiss();
      this.showAlert(
        'Error al registrar usuario',
        error?.message || 'Error desconocido'
      );
      return;
    }

    // 2️⃣ Hacer login para tener sesión activa
    const { error: loginError } =
      await this.authService.supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

    if (loginError) {
      await loading.dismiss();
      this.showAlert('Error al autenticar usuario', loginError.message);
      return;
    }

    // 3️⃣ Insertar perfil
    const userId = data.user.id;
    const { error: insertError } = await this.authService.supabaseClient
      .from('usuarios')
      .insert({
        id: userId,
        nombre: `${name} ${lastname}`,
        direccion: address,
        telefono: phone,
        correo: email,
        rol_id: '5f71c4d4-662c-4ae9-b884-5713eb3221f6',
      });

    if (insertError) {
      console.error(
        '❌ Error al insertar perfil en usuarios:',
        insertError.message
      );
      await loading.dismiss();
      this.showAlert('Error al guardar perfil', insertError.message);
      return;
    }

    await loading.dismiss();

    this.showAlert(
      'Registro exitoso',
      'Revisa tu correo para confirmar tu cuenta'
    );

    this.navCtrl.navigateRoot('/login');
  }

  goToLogin() {
    this.route.navigate(['login']);
  }

  async showAlert(title: string, msg: string) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
