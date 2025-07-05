import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HeaderProfileComponent } from 'src/app/components/header-profile/header-profile.component';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import { FavoritosService } from 'src/app/services/favoritos.service';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NavbarComponent,
    HeaderProfileComponent,
    ProductCardComponent,
  ],
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {
  categorySelected: 'all' | 'menu' | 'bebidas' = 'all';
  productosFiltrados: any[] = [];
  usuario: any;
  productos: any[] = [];

  readonly MENU_ID = '9c094064-ee42-489f-b90b-7c422358dabe';
  readonly BEBIDAS_ID = '2cff7f95-ca3c-44a7-918e-31972aa08d6e';

  constructor(
    private authService: AuthService,
    private router: Router,
    private favoritosService: FavoritosService
  ) {}

  async ngOnInit() {
    await this.cargarFavoritos();
    const stored = localStorage.getItem('perfil');
    if (stored) {
      this.usuario = JSON.parse(stored);
    }
    this.productosFiltrados = this.productos;
    this.filtrarProductos();
  }

  async logout() {
    await this.authService.signOut();
    this.router.navigate(['/']);
  }

  filtrarProductos() {
    if (this.categorySelected === 'menu') {
      this.productosFiltrados = this.productos.filter(
        (p) => p.categoria_id === this.MENU_ID
      );
    } else if (this.categorySelected === 'bebidas') {
      this.productosFiltrados = this.productos.filter(
        (p) => p.categoria_id === this.BEBIDAS_ID
      );
    } else {
      this.productosFiltrados = this.productos;
    }
  }

  async cargarFavoritos() {
    this.productos = await this.favoritosService.loadFavorites();
    this.filtrarProductos();
  }

  ionViewWillEnter() {
    this.cargarFavoritos();
  }
}
