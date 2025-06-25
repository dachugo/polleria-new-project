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

    // ✅ Guardar datos en localStorage para usarlos tras la verificación
    localStorage.setItem(
      'registro_temp',
      JSON.stringify({
        nombre: `${name} ${lastname}`,
        direccion: address,
        telefono: phone,
      })
    );

    // Crear cuenta en Supabase Auth
    const { data, error } = await this.authService.supabaseClient.auth.signUp({
      email,
      password,
    });

    await loading.dismiss();

    if (error || !data?.user) {
      this.showAlert(
        'Error al registrar usuario',
        error?.message || 'Error desconocido'
      );
      return;
    }

    // ✅ Informar que debe confirmar el correo
    this.showAlert(
      'Registro exitoso',
      'Revisa tu correo para confirmar tu cuenta antes de iniciar sesión.'
    );

    // Redirigir al login
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
