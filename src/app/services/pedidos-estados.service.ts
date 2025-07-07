import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PedidoEstadoService {
  intervalId: any = null;
  estados = [
    'Confirmado',
    'En preparación',
    'Listo para enviar',
    'En camino',
    'Espera de entregar',
  ];

  constructor(private authService: AuthService) {}

  async iniciarSimulacion(pedidoId: string) {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    let index = 0;

    this.intervalId = setInterval(async () => {
      if (index >= this.estados.length) {
        clearInterval(this.intervalId);
        return;
      }

      const estado = this.estados[index];
      await this.authService.supabaseClient
        .from('pedidos')
        .update({ estado })
        .eq('id', pedidoId);

      index++;
    }, 7000);
  }

  detenerSimulacion() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
