import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  AlertController,
  IonicModule,
  LoadingController,
} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  credentials = this.fb.nonNullable.group({
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required, Validators.minLength(6)]],
  });
  private userSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router
  ) {
    this.userSubscription = this.authService
      .getCurrentUser()
      .subscribe((user) => {
        if (user) {
          console.log('USER ON LOGIN PAGE: ', user);
          this.router.navigateByUrl('/home', { replaceUrl: true });
        }
      });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  get correo() {
    return this.credentials.controls.correo;
  }

  get contrasena() {
    return this.credentials.controls.contrasena;
  }

  goToRegister() {
    this.router.navigate(['register']);
  }

  async login() {
    if (this.credentials.invalid) {
      this.credentials.markAllAsTouched();
      return;
    }

    const loading = await this.loadingController.create();
    await loading.present();

    const { data, error } = await this.authService.signIn(
      this.credentials.getRawValue()
    );
    await loading.dismiss();

    if (error) {
      await this.showAlert('Error de Inicio de Sesión', error.message);
    } else {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    }
  }

  async forgotPassword() {
    const alert = await this.alertController.create({
      header: 'Restablecer Contraseña',
      message: 'Por favor, ingrese su correo',
      inputs: [
        {
          type: 'email',
          name: 'email',
          placeholder: 'Correo electrónico',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Restablecer',
          handler: async (result) => {
            const loading = await this.loadingController.create();
            await loading.present();
            const { data, error } = await this.authService.sendPasswordReset(
              result.email
            );
            await loading.dismiss();

            if (error) {
              await this.showAlert('Error', error.message);
            } else {
              await this.showAlert(
                '¡Listo!',
                'Por favor, verifica el correo en tu bandeja de entrada'
              );
            }
          },
        },
      ],
    });
    await alert.present();
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
