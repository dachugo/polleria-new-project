import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HeaderProfileComponent } from 'src/app/components/header-profile/header-profile.component';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NavbarComponent,
    HeaderProfileComponent,
  ],
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {
  usuario: any;
  constructor(private authService: AuthService, private router: Router) {}

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
    }
  }

  async logout() {
    await this.authService.signOut();
    this.router.navigate(['/']);
  }

  async abrirNotificaciones() {}
}
