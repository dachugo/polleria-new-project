import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar-pedido',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './sidebar-pedido.component.html',
  styleUrls: ['./sidebar-pedido.component.scss'],
})
export class SidebarPedidoComponent implements OnInit {
  pedidos: any[] = [];
  isOpen = false;

  constructor(
    private modalCtrl: ModalController,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.isOpen = true;
    await this.cargarPedidos();
    setInterval(() => this.cargarPedidos(), 5000);
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }

  async cargarPedidos() {
    const userId = this.authService.getCurrentUserId();
    if (!userId) return;

    const { data, error } = await this.authService.supabaseClient
      .from('pedidos')
      .select('*')
      .eq('usuario_id', userId)
      .order('fecha', { ascending: false });

    if (!error) {
      this.pedidos = data || [];
    } else {
      console.error('Error al cargar pedidos:', error);
    }
  }

  async marcarEntregado(pedidoId: string) {
    const { error } = await this.authService.supabaseClient
      .from('pedidos')
      .update({ estado: 'Entregado' })
      .eq('id', pedidoId);

    if (!error) {
      await this.cargarPedidos();
    } else {
      console.error('Error al actualizar pedido:', error);
    }
  }
}
