import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  AlertController,
  IonicModule,
  LoadingController,
  NavController,
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
    private router: Router,
    private navCtrl: NavController
  ) {
    this.userSubscription = this.authService
      .getCurrentUser()
      .subscribe((user) => {
        if (user) {
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
    this.authService.clearCachedProfile();
    localStorage.removeItem('perfil');

    const loading = await this.loadingController.create();
    await loading.present();

    const { correo, contrasena } = this.credentials.getRawValue();

    const { data, error } = await this.authService.signIn({
      email: correo,
      password: contrasena,
    });

    if (error || !data?.user?.id) {
      await loading.dismiss();
      this.showAlert(
        'Fallo en login',
        error?.message || 'Credenciales inválidas'
      );
      return;
    }

    await this.authService.refreshCurrentUser();

    const userId = data.user.id;

    await this.insertPerfilSiNoExiste(userId, {
      correo,
      nombre: '',
      direccion: '',
      telefono: '',
      rol_id: '5f71c4d4-662c-4ae9-b884-5713eb3221f6',
    });

    const perfil = await this.authService.getUserProfile();
    this.authService.setCachedProfile(perfil);

    await loading.dismiss();
    this.navCtrl.navigateRoot('/home');
  }

  async insertPerfilSiNoExiste(userId: string, perfilBase: any) {
    try {
      const { data } = await this.authService.supabaseClient
        .from('usuarios')
        .select('id')
        .eq('id', userId)
        .maybeSingle();

      if (!data) {
        console.log('Insertando perfil completo por primera vez');

        const tempData = localStorage.getItem('registro_temp');
        if (tempData) {
          try {
            const parsed = JSON.parse(tempData);
            perfilBase.nombre = parsed.nombre || '';
            perfilBase.direccion = parsed.direccion || '';
            perfilBase.telefono = parsed.telefono || '';
            localStorage.removeItem('registro_temp');
          } catch (e) {
            console.warn('No se pudo parsear datos de registro_temp');
          }
        }

        const { error } = await this.authService.supabaseClient
          .from('usuarios')
          .insert({
            id: userId,
            ...perfilBase,
          });

        if (error) {
          console.error('Error al insertar perfil:', error.message);
        }
      }
    } catch (e) {
      console.error('Error inesperado al verificar perfil:', e);
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
            const { error } = await this.authService.sendPasswordReset(
              result.email
            );
            await loading.dismiss();

            if (error) {
              await this.showAlert('Error', error.message);
            } else {
              await this.showAlert(
                '¡Listo!',
                'Revisa tu correo para restablecer la contraseña.'
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
