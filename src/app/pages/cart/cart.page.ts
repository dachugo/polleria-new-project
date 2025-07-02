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
  selector: 'app-cart',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NavbarComponent,
    HeaderProfileComponent,
    ProductCardComponent,
  ],
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  usuario: any;
  productos: any[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    const stored = localStorage.getItem('perfil');
    if (stored) {
      this.usuario = JSON.parse(stored);
    }

    const { data, error } = await this.authService.supabaseClient
      .from('productos')
      .select('*');

    console.log('Productos data:', data);
    console.log('Productos error:', error);

    if (error) {
      console.error('Error al cargar productos:', error);
      return;
    }

    this.productos = data || [];
  }

  agregarAlCarrito(producto: any) {
    console.log('Producto agregado:', producto);
    // Aquí llamas a un servicio que agregue el producto al carrito
  }

  async logout() {
    await this.authService.signOut();
    this.router.navigate(['/']);
  }
}
