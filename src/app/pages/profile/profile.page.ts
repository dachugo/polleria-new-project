import { Component } from '@angular/core';
import {
  AlertController,
  IonicModule,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  ValidatorFn,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NavbarComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  showAvatarModal = false;
  pendingAvatarSelection = '';
  initialAvatar = '';
  isEditing = false;
  isDisabled = false;
  inputDisabled = true;

  avatarUrls: string[] = [
    'https://ruriirwkpcwkdqoxclbx.supabase.co/storage/v1/object/public/avatars//bad_chicken.svg',
    'https://ruriirwkpcwkdqoxclbx.supabase.co/storage/v1/object/public/avatars//biirthday_chicken.svg',
    'https://ruriirwkpcwkdqoxclbx.supabase.co/storage/v1/object/public/avatars//fresh_chicken.svg',
    'https://ruriirwkpcwkdqoxclbx.supabase.co/storage/v1/object/public/avatars//girl_chicken.svg',
    'https://ruriirwkpcwkdqoxclbx.supabase.co/storage/v1/object/public/avatars//photo_chicken.svg',
    'https://ruriirwkpcwkdqoxclbx.supabase.co/storage/v1/object/public/avatars//default_chicken.svg',
    'https://ruriirwkpcwkdqoxclbx.supabase.co/storage/v1/object/public/avatars//chef_chicken.svg',
  ];

  selectedAvatar: string = '/assets/img/df_chicken.svg';

  openAvatarSelector() {
    this.showAvatarModal = true;
  }

  closeAvatarSelector() {
    this.showAvatarModal = false;
  }

  async confirmAvatarSelection(url: string) {
    this.pendingAvatarSelection = url;
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Elegir esta imagen como avatar?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Si',
          handler: () => {
            this.selectedAvatar = url;
            this.closeAvatarSelector();
          },
        },
      ],
    });
    await alert.present();
  }

  // VALIDADOR DE SOLO LETRAS
  nameValidator: ValidatorFn = (control) => {
    const value = control.value || '';
    const valid = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value);
    return valid ? null : { invalidName: true };
  };

  // VALIDADOR DE DIRECCIÓN LETRAS Y NÚMEROS
  addressValidator: ValidatorFn = (control) => {
    const value = control.value || '';
    const valid = /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s]+$/.test(value);
    return valid ? null : { invalidAddress: true };
  };

  // VALIDADOR DE SOLO NÚMEROS
  phoneValidator: ValidatorFn = (control) => {
    const value = control.value || '';
    const valid = /^[0-9]+$/.test(value);
    return valid ? null : { invalidPhone: true };
  };

  // FUNCIONES DE LIMPIEZA EN TIEMPO REAL (EXPERIENCIA DE USUARIO)
  onlyCharacteres(event: any) {
    const value = event.target.value;
    event.target.value = value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, '');
  }

  onlyAlphanumeric(event: any) {
    const value = event.target.value;
    event.target.value = value.replace(/[^A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s]/g, '');
  }

  onlyNumbers(event: any) {
    const value = event.target.value;
    event.target.value = value.replace(/[^0-9]/g, '');
  }

  // FORMULARIO REACTIVO
  credentials = this.fb.nonNullable.group({
    name: ['', [Validators.required, this.nameValidator]],
    lastname: ['', [Validators.required, this.nameValidator]],
    email: ['', [Validators.required, Validators.email]],
    address: ['', [Validators.required, this.addressValidator]],
    phone: ['', [Validators.required, this.phoneValidator]],
  });

  usuario: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    const { data, error } =
      await this.authService.supabaseClient.auth.getUser();
    if (error || !data.user) {
      console.error('No se pudo obtener el usuario:', error);
      return;
    }

    this.usuario = data.user;

    const perfil = await this.authService.getUserProfile();
    if (perfil) {
      this.usuario = { ...this.usuario, ...perfil };
      if (perfil.avatar) {
        this.selectedAvatar = perfil.avatar;
      }
    }

    this.initializeFormWithUserData();
  }

  private initializeFormWithUserData() {
    this.credentials.patchValue({
      name: this.usuario.nombre || '',
      lastname: this.usuario.apellido || '',
      email: this.usuario.email || this.usuario.correo || '',
      address: this.usuario.direccion || '',
      phone: this.usuario.telefono || '',
    });
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro de salir?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Salir',
          handler: async () => {
            localStorage.clear();
            sessionStorage.clear();

            await this.authService.signOut();
            this.router.navigate(['/']);
          },
        },
      ],
    });
    await alert.present();
  }

  editProfile() {
    this.isEditing = true;
    this.initialAvatar = this.selectedAvatar;
  }

  cancelEdit() {
    this.isEditing = false;
    this.initializeFormWithUserData();
    this.selectedAvatar = this.initialAvatar;
  }

  async saveChangesEdit() {
    const updated = this.credentials.getRawValue();

    const cambios: any = {};
    if (updated.name !== this.usuario.nombre) cambios.nombre = updated.name;
    if (updated.address !== this.usuario.direccion)
      cambios.direccion = updated.address;
    if (updated.phone !== this.usuario.telefono)
      cambios.telefono = updated.phone;
    if (this.selectedAvatar !== this.usuario.avatar)
      cambios.avatar = this.selectedAvatar;

    if (Object.keys(cambios).length === 0) {
      await this.alertController
        .create({
          header: 'Sin cambios',
          message: 'No realizaste ninguna modificación.',
          buttons: ['OK'],
        })
        .then((alert) => alert.present());
      return;
    }

    const { error } = await this.authService.supabaseClient
      .from('usuarios')
      .update(cambios)
      .eq('id', this.authService.getCurrentUserId());

    if (error) {
      console.error('Error al guardar:', error);
      await this.alertController
        .create({
          header: 'Error',
          message: 'Ocurrió un error al guardar los cambios.',
          buttons: ['OK'],
        })
        .then((alert) => alert.present());
      return;
    }

    this.usuario = { ...this.usuario, ...cambios };
    localStorage.setItem('perfil', JSON.stringify(this.usuario));

    this.isEditing = false;

    await this.alertController
      .create({
        header: 'Éxito',
        message: 'Perfil actualizado correctamente.',
        buttons: ['OK'],
      })
      .then((alert) => alert.present())
      .then(() => {
        location.reload();
      });
  }
}
