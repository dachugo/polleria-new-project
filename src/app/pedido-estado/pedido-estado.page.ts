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

    setInterval(() => {
      this.cargarPedido(pedidoId);
    }, 5000);
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
