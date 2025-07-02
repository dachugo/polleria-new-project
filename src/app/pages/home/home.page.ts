import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { HeaderProfileComponent } from 'src/app/components/header-profile/header-profile.component';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NavbarComponent,
    HeaderProfileComponent,
    ProductCardComponent,
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  categorySelected: 'all' | 'menu' | 'bebidas' = 'all';
  productosFiltrados: any[] = [];
  usuario: any;
  productos: any[] = [];

  readonly MENU_ID = '9c094064-ee42-489f-b90b-7c422358dabe';
  readonly BEBIDAS_ID = '2cff7f95-ca3c-44a7-918e-31972aa08d6e';

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    const stored = localStorage.getItem('perfil');
    if (stored) {
      this.usuario = JSON.parse(stored);
    }

    const { data, error } = await this.authService.supabaseClient
      .from('productos')
      .select('*')
      .eq('disponible', true);

    if (error) {
      console.error('Error al cargasr los productos:', error);
      return;
    }
    this.productos = data || [];
    this.filtrarProductos();
  }

  agregarAlCarrito(producto: any) {
    console.log('Producto agregado:', producto);
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

  seleccionarCategoria(categoria: 'menu' | 'bebidas') {
    if (this.categorySelected === categoria) {
      this.categorySelected = 'all';
    } else {
      this.categorySelected = categoria;
    }
    this.filtrarProductos();
  }
}
