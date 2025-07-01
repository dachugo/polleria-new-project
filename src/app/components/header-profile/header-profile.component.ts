import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header-profile',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss'],
})
export class HeaderProfileComponent implements OnInit {
  username: string = '';
  @Input() introText: string = '¿Qué es lo que pediremos hoy?';

  selectedAvatar: string = '/assets/img/df_chicken.svg';
  avatarUrls: string[] = [
    'https://ruriirwkpcwkdqoxclbx.supabase.co/storage/v1/object/public/avatars//bad_chicken.svg',
    'https://ruriirwkpcwkdqoxclbx.supabase.co/storage/v1/object/public/avatars//biirthday_chicken.svg',
    'https://ruriirwkpcwkdqoxclbx.supabase.co/storage/v1/object/public/avatars//fresh_chicken.svg',
    'https://ruriirwkpcwkdqoxclbx.supabase.co/storage/v1/object/public/avatars//girl_chicken.svg',
    'https://ruriirwkpcwkdqoxclbx.supabase.co/storage/v1/object/public/avatars//photo_chicken.svg',
    'https://ruriirwkpcwkdqoxclbx.supabase.co/storage/v1/object/public/avatars//default_chicken.svg',
    'https://ruriirwkpcwkdqoxclbx.supabase.co/storage/v1/object/public/avatars//chef_chicken.svg',
  ];

  @Output() notifyClick = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    const { data, error } =
      await this.authService.supabaseClient.auth.getUser();
    if (error || !data.user) {
      console.error('No se pudo obtener el usuario:', error);
      return;
    }

    // No asignamos el email todavía
    let tempName = '';

    // Busca el perfil en la tabla usuarios
    const perfil = await this.authService.getUserProfile();
    if (perfil) {
      tempName = perfil.nombre || '';
      if (perfil.avatar) {
        this.selectedAvatar = perfil.avatar;
      }
    }

    // Si no hay nombre en el perfil, recién considera el email
    this.username = tempName || data.user.email || 'Usuario';
  }

  onNotifyClick() {
    this.notifyClick.emit();
  }

  abrirNotificaciones() {}
}
