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
  credentials = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    address: ['', [Validators.required]],
    phone: ['', [Validators.required]],
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
    const stored = localStorage.getItem('perfil');
    if (stored) {
      this.usuario = JSON.parse(stored);
      this.initializeFormWithUserData();
    }
  }

  private initializeFormWithUserData() {
    this.credentials.patchValue({
      name: this.usuario.nombre || '',
      lastname: this.usuario.apellido || '',
      email: this.usuario.email || '',
      address: this.usuario.direccion || '',
      phone: this.usuario.telefono || '',
    });
  }

  async logout() {
    await this.authService.signOut();
    this.router.navigate(['/']);
  }

  async editProfile() {}
  async saveChangesEdit() {}
}
