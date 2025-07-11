import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { PedidoEstadoService } from '../services/pedidos-estados.service';

@Component({
  selector: 'app-pedido-cargando',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],

  templateUrl: './pedido-cargando.page.html',
  styleUrls: ['./pedido-cargando.page.scss'],
})
export class PedidoCargandoPage implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private pedidoEstadoService: PedidoEstadoService
  ) {}
  total: number = 0;
  cartItems: any[] = [];
  async ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as { total: number; cartItems: any[] };

    if (state) {
      this.total = state.total;
      this.cartItems = state.cartItems;
    } else {
      await this.mostrarAlerta('Error: no hay datos del pedido');
      this.router.navigate(['/home']);
      return;
    }

    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      await this.mostrarAlerta('Usuario no autenticado');
      this.router.navigate(['/home']);
      return;
    }

    const { data: pedido, error } = await this.authService.supabaseClient
      .from('pedidos')
      .insert({
        usuario_id: userId,
        total: this.total,
        estado: 'Pendiente',
      })
      .select()
      .single();

    if (error) {
      await this.mostrarAlerta('Error al registrar pedido');
      this.router.navigate(['/home']);
      return;
    }

    for (const item of this.cartItems) {
      const detalle = {
        pedido_id: pedido.id,
        producto_id: item.producto.id,
        cantidad: item.cantidad,
        precio_unit: item.producto.precio,
      };

      const { error: detalleError } = await this.authService.supabaseClient
        .from('detalle_pedidos')
        .insert(detalle);

      if (detalleError) {
        await this.mostrarAlertaDebug(
          `Error al insertar detalle: ${detalleError.message}`
        );
      }
    }

    await this.authService.supabaseClient
      .from('carrito')
      .delete()
      .eq('usuario_id', userId);

    this.cartItems = [];
    this.total = 0;

    localStorage.setItem('pedidoActualId', pedido.id);

    this.pedidoEstadoService.iniciarSimulacion(pedido.id);

    setTimeout(() => {
      this.router.navigate(['/pedido-estado']);
    }, 1500);
  }

  async mostrarAlertaDebug(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Depuración',
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async simularEstados(pedidoId: string) {
    const estados = [
      'Confirmado',
      'En preparación',
      'Listo para enviar',
      'En camino',
      'Espera de entregar',
    ];

    let index = 0;

    const interval = setInterval(async () => {
      const estadoActual = estados[index];

      await this.authService.supabaseClient
        .from('pedidos')
        .update({ estado: estadoActual })
        .eq('id', pedidoId);

      if (estadoActual === 'En camino') {
        const user = await this.authService.getUserProfile();
        await this.mostrarAlerta(
          `El pedido está en camino a ${user?.direccion}`
        );
      }

      index++;
      if (index >= estados.length) {
        clearInterval(interval);
      }
    }, 7000);

    (window as any)['pedidoInterval'] = interval;
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Estado del pedido',
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
