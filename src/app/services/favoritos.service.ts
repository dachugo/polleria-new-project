import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritosService {
  constructor(private authService: AuthService) {}

  async getUserIdOrWait(): Promise<string | null> {
    let userId = this.authService.getCurrentUserId();
    let attempts = 0;

    while (!userId && attempts < 5) {
      await new Promise((res) => setTimeout(res, 200));
      userId = this.authService.getCurrentUserId();
      attempts++;
    }

    if (!userId) {
      console.error('Usuario no disponible tras esperar');
    }

    return userId;
  }

  async loadFavorites(): Promise<any[]> {
    const userId = await this.getUserIdOrWait();
    if (!userId) return [];

    const { data, error } = await this.authService.supabaseClient
      .from('favoritos')
      .select(
        `
        id,
        producto:producto_id(id, nombre, descripcion, precio, imagen_url, categoria_id)
      `
      )
      .eq('usuario_id', userId);

    if (error) {
      console.error('Error al cargar los productos favoritos', error);
      return [];
    }

    return (data || []).map((item) => item.producto);
  }

  async toggleFavorito(productoId: string): Promise<void> {
    const userId = await this.getUserIdOrWait();
    if (!userId) return;

    const { data } = await this.authService.supabaseClient
      .from('favoritos')
      .select('id')
      .eq('usuario_id', userId)
      .eq('producto_id', productoId)
      .limit(1)
      .single();

    if (data) {
      await this.authService.supabaseClient
        .from('favoritos')
        .delete()
        .eq('id', data.id);
    } else {
      await this.authService.supabaseClient
        .from('favoritos')
        .insert({ usuario_id: userId, producto_id: productoId });
    }
  }
}
