import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  selector: 'app-cart-pay',
  templateUrl: './cart-pay.page.html',
  styleUrls: ['./cart-pay.page.scss'],
})
export class CartPayPage implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private location: Location,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.cargarCarrito();
  }

  async goBack() {
    this.location.back();
  }

  async cargarCarrito() {
    const userId = this.authService.getCurrentUserId();
    if (!userId) return;

    const { data, error } = await this.authService.supabaseClient
      .from('carrito')
      .select('*,producto:productos(*)')
      .eq('usuario_id', userId);

    if (error) {
      console.error('Error al acceder al carrito', error);
      return;
    }

    this.cartItems = data.map((item) => ({
      id: item.id,
      cantidad: item.cantidad,
      producto: item.producto, // conserva el objeto producto
    }));

    this.calcularTotalCart();
  }

  calcularTotalCart() {
    this.total = this.cartItems.reduce((acc, item) => {
      if (!item.producto) return acc;
      return acc + item.producto.precio * item.cantidad;
    }, 0);
  }

  async cambiarCantidad(item: any, cambio: number) {
    const nuevaCantidad = item.cantidad + cambio;

    if (nuevaCantidad <= 0) {
      const alert = await this.alertController.create({
        header: 'Eliminar orden',
        message:
          '¿Estás seguro de que deseas eliminar este producto de tu carrito?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Eliminar',
            handler: async () => {
              await this.authService.supabaseClient
                .from('carrito')
                .delete()
                .eq('id', item.id);
              this.cartItems = this.cartItems.filter((i) => i.id !== item.id);
              this.calcularTotalCart();
            },
          },
        ],
      });

      await alert.present();
    } else if (nuevaCantidad <= 10) {
      await this.authService.supabaseClient
        .from('carrito')
        .update({ cantidad: nuevaCantidad })
        .eq('id', item.id);
      item.cantidad = nuevaCantidad;
      this.calcularTotalCart();
    }
  }

  async clearCart() {
    const userId = this.authService.getCurrentUserId();
    if (!userId) return;

    await this.authService.supabaseClient
      .from('carrito')
      .delete()
      .eq('usuario_id', userId);

    this.cartItems = [];
    this.total = 0;
  }

  irAPagar() {
    this.router.navigate(['/pay-method'], {
      state: {
        total: this.total,
        cartItems: this.cartItems,
      },
    });
  }
}
