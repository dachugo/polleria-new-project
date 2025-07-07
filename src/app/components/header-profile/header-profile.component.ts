import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { IonicModule, AlertController, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarPedidoComponent } from '../sidebar-pedido/sidebar-pedido.component';

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

  @Output() notifyClick = new EventEmitter<void>();

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private modalController: ModalController
  ) {}

  async ngOnInit() {
    const cached = this.authService.getCachedProfile();
    if (cached) {
      this.username = cached.nombre || cached.email || 'Usuario';
      if (cached.avatar) {
        this.selectedAvatar = cached.avatar;
      }
    }

    const { data, error } =
      await this.authService.supabaseClient.auth.getUser();
    if (error || !data.user) return;

    const perfil = await this.authService.getUserProfile();
    if (perfil) {
      this.username = perfil.nombre || data.user.email || 'Usuario';
      if (perfil.avatar) this.selectedAvatar = perfil.avatar;
    }

    this.authService.setCachedProfile({
      ...perfil,
      email: data.user.email,
    });
  }

  onNotifyClick() {
    this.notifyClick.emit();
    this.abrirSidebarEstadoPedido();
  }

  async abrirSidebarEstadoPedido() {
    const pedidoId = localStorage.getItem('pedidoActualId');

    if (!pedidoId) {
      await this.mostrarSidebar();
      return;
    }

    const { data: pedido, error } = await this.authService.supabaseClient
      .from('pedidos')
      .select('*')
      .eq('id', pedidoId)
      .single();

    if (error || !pedido) {
      await this.mostrarSidebar();
      return;
    }

    if (pedido.estado === 'En camino') {
      const perfil = await this.authService.getUserProfile();
      const direccion = perfil?.direccion || 'Dirección no disponible';
      const alert = await this.alertController.create({
        header: 'Tu pedido está en camino',
        message: `Yendo a: ${direccion}`,
        buttons: ['OK'],
      });
      await alert.present();
    }

    await this.mostrarSidebar();
  }

  async mostrarSidebar() {
    const modal = await this.modalController.create({
      component: SidebarPedidoComponent,
      cssClass: 'sidebar-pedido-modal',
      backdropDismiss: true,
      showBackdrop: false,
    });

    await modal.present();

    // ESPERA a que el modal se cierre antes de poder abrir otro
    await modal.onDidDismiss();
  }

  reproducirSonido() {
    const audio = new Audio('/assets/sounds/soundEffect-chicken.mp3');
    audio.play();
  }
}
