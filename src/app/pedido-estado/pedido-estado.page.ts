import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-pedido-estado',
  imports: [IonicModule, CommonModule],
  templateUrl: './pedido-estado.page.html',
  styleUrls: ['./pedido-estado.page.scss'],
})
export class PedidoEstadoPage implements OnInit {
  pedido: any = null;
  intervalId: any = null;

  estados = [
    'Pendiente',
    'Confirmado',
    'En preparación',
    'Listo para enviar',
    'En camino',
    'Espera de entregar',
    'Entregado',
  ];

  constructor(private router: Router, private authService: AuthService) {}

  async ngOnInit() {
    const pedidoId = localStorage.getItem('pedidoActualId');
    if (!pedidoId) {
      this.router.navigate(['/home']);
      return;
    }

    this.cargarPedido(pedidoId);

    this.intervalId = setInterval(() => {
      this.cargarPedido(pedidoId);
    }, 5000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  getStatusIcon(status: string): string {
    const icons: { [key: string]: string } = {
      Pendiente: 'hand-right-outline',
      Confirmado: 'thumbs-up-outline',
      'En preparación': 'bonfire-outline',
      'Listo para enviar': 'golf-outline',
      'En camino': 'walk-outline',
      'Espera de entregar': 'stopwatch-outline',
    };
    return icons[status] || 'help-outline';
  }

  async cargarPedido(pedidoId: string) {
    const { data, error } = await this.authService.supabaseClient
      .from('pedidos')
      .select('*')
      .eq('id', pedidoId)
      .single();

    if (!error) {
      this.pedido = data;
    }
  }

  regresarHome() {
    this.router.navigate(['/home']);
  }
}
