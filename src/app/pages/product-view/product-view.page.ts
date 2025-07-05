import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HeaderProfileComponent } from 'src/app/components/header-profile/header-profile.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
import { FavoritosService } from 'src/app/services/favoritos.service';

@Component({
  selector: 'app-product-view',
  standalone: true,
  templateUrl: './product-view.page.html',
  styleUrls: ['./product-view.page.scss'],
  imports: [IonicModule, CommonModule, NavbarComponent, HeaderProfileComponent],
})
export class ProductViewPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private location: Location,
    private router: Router,
    private favoritosService: FavoritosService
  ) {}

  isInFavMap: { [productoId: string]: boolean } = {};
  isInCartMap: { [productoId: string]: boolean } = {};
  id: string = '';
  producto: any = null;
  loading = true;
  error = '';

  async ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    await this.loadProducto();
    await this.checkIfInCart(this.id);
    await this.updateFavoriteStatus(this.id);
  }

  goBack() {
    this.location.back();
  }

  async toggleFavorites(productoId: string) {
    await this.favoritosService.toggleFavorito(productoId);
    await this.updateFavoriteStatus(productoId);
  }

  async updateFavoriteStatus(productoId: string) {
    const favoritos = await this.favoritosService.loadFavorites();
    this.isInFavMap[productoId] = favoritos.some((p) => p.id === productoId);
  }

  async checkIfInCart(productoId: string) {
    const userId = this.authService.getCurrentUserId();

    if (!userId) {
      console.error('Usuario no autenticado');
      return;
    }

    const { data, error } = await this.authService.supabaseClient
      .from('carrito')
      .select('id')
      .eq('usuario_id', userId)
      .eq('producto_id', productoId)
      .limit(1);

    if (error) {
      console.error('Error al verificar carrito:', error);
      this.isInCartMap[productoId] = false;
      return;
    }

    this.isInCartMap[productoId] = !!(data && data.length > 0);
  }

  async toggleCarrito(productoId: string) {
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      console.error('Usuario no autenticado');
      return;
    }

    const inCart = this.isInCartMap[productoId];

    if (inCart) {
      const { error } = await this.authService.supabaseClient
        .from('carrito')
        .delete()
        .match({ usuario_id: userId, producto_id: productoId });

      if (error) {
        console.error('Error al eliminar del carrito:', error);
      } else {
        this.isInCartMap[productoId] = false;
      }
    } else {
      const { error } = await this.authService.supabaseClient
        .from('carrito')
        .insert({ usuario_id: userId, producto_id: productoId, cantidad: 1 });

      if (error) {
        console.error('Error al agregar al carrito:', error);
      } else {
        this.isInCartMap[productoId] = true;
      }
    }
  }

  async loadProducto() {
    const { data, error } = await this.authService.supabaseClient
      .from('productos')
      .select('*')
      .eq('id', this.id)
      .single();

    if (error) {
      console.error('Error al cargar producto:', error);
      this.error = 'No se pudo cargar el producto';
    } else {
      this.producto = data;
    }

    this.loading = false;
  }

  async cartPay() {
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      console.error('Usuario no autenticado');
      return;
    }

    const { data, error } = await this.authService.supabaseClient
      .from('carrito')
      .select('id')
      .eq('usuario_id', userId)
      .eq('producto_id', this.producto.id)
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error al verificar el carrito:', error);
      return;
    }

    if (!data) {
      const { error: insertError } = await this.authService.supabaseClient
        .from('carrito')
        .insert({
          usuario_id: userId,
          producto_id: this.producto.id,
          cantidad: 1,
        });

      if (insertError) {
        console.error('Error al agregar al carrito:', insertError);
        return;
      }
    }

    this.router.navigate(['/cart-pay']);
  }
}
