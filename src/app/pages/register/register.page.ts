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
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

function textOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    
    const textOnlyRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return textOnlyRegex.test(value) ? null : { textOnly: true };
  };
}

function addressValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    
    const addressRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s,.-]+$/;
    return addressRegex.test(value) ? null : { invalidAddress: true };
  };
}

function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    
    const phoneRegex = /^[0-9]{9}$/;
    return phoneRegex.test(value) ? null : { invalidPhone: true };
  };
}

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
      name: ['', [
        Validators.required, 
        Validators.maxLength(50),
        textOnlyValidator()
      ]],
      lastname: ['', [
        Validators.required, 
        Validators.maxLength(50),
        textOnlyValidator()
      ]],
      email: ['', [
        Validators.required, 
        Validators.email,
        Validators.maxLength(100)
      ]],
      address: ['', [
        Validators.required, 
        Validators.maxLength(200),
        addressValidator()
      ]],
      phone: ['', [
        Validators.required,
        phoneValidator()
      ]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8),
        Validators.maxLength(50)
      ]],
      passwordConfirmation: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
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

    localStorage.setItem(
      'registro_temp',
      JSON.stringify({
        nombre: `${name} ${lastname}`,
        direccion: address,
        telefono: phone,
      })
    );

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

  filterTextOnly(event: any, controlName: string) {
    const input = event.target;
    const value = input.value;
    const filteredValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    
    if (value !== filteredValue) {
      input.value = filteredValue;
      this.credentials.get(controlName)?.setValue(filteredValue);
    }
  }

  filterPhoneOnly(event: any) {
    const input = event.target;
    const value = input.value;
    const filteredValue = value.replace(/[^0-9]/g, '');
    
    if (value !== filteredValue) {
      input.value = filteredValue;
      this.credentials.get('phone')?.setValue(filteredValue);
    }
  }

  filterAddress(event: any) {
    const input = event.target;
    const value = input.value;
    const filteredValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s,.-]/g, '');
    
    if (value !== filteredValue) {
      input.value = filteredValue;
      this.credentials.get('address')?.setValue(filteredValue);
    }
  }

  filterPassword(event: any) {
    const input = event.target;
    const value = input.value;
    if (value.length > 50) {
      input.value = value.substring(0, 50);
      this.credentials.get('password')?.setValue(value.substring(0, 50));
    }
  }

  filterPasswordConfirmation(event: any) {
    const input = event.target;
    const value = input.value;
    if (value.length > 50) {
      input.value = value.substring(0, 50);
      this.credentials.get('passwordConfirmation')?.setValue(value.substring(0, 50));
    }
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
