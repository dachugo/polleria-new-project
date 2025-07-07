import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private sonados: Set<string> = new Set();

  constructor(private authService: AuthService) {
    this.iniciarChequeoGlobal();
  }

  iniciarChequeoGlobal() {
    setInterval(() => this.verificarPedidos(), 5000);
  }

  async verificarPedidos() {
    const userId = this.authService.getCurrentUserId();
    if (!userId) return;

    const { data, error } = await this.authService.supabaseClient
      .from('pedidos')
      .select('*')
      .eq('usuario_id', userId)
      .order('fecha', { ascending: false });

    if (error) {
      console.error('Error al verificar pedidos:', error);
      return;
    }

    const pedidos = data || [];
    for (const p of pedidos) {
      if (p.estado === 'Espera de entregar' && !this.sonados.has(p.id)) {
        this.reproducirSonido();
        this.sonados.add(p.id);
      }
    }
  }

  reproducirSonido() {
    const audio = new Audio('/assets/sounds/soundEffect-chicken.mp3');
    audio.play();
  }

  limpiarSonidos() {
    this.sonados.clear();
  }
}
