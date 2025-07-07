import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StripeService } from 'src/app/services/stripe.service';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { AlertController } from '@ionic/angular';

import {
  Stripe,
  StripeCardCvcElement,
  StripeCardElement,
  StripeCardExpiryElement,
  StripeCardNumberElement,
} from '@stripe/stripe-js';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-pay-method',
  templateUrl: './pay-method.page.html',
  styleUrls: ['./pay-method.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule],
})
export class PayMethodPage implements OnInit {
  metodoSeleccionado: string | null = null;
  total: number = 0;
  usuario: any = null;
  cartItems: any[] = [];
  tarjetas: any[] = [];
  pagoEfectivo: boolean = false;
  pagoYape: boolean = false;
  showModal: boolean = false;
  stripe: Stripe | null = null;
  cardNumberElement: StripeCardNumberElement | null = null;
  cardExpiryElement: StripeCardExpiryElement | null = null;
  cardCvcElement: StripeCardCvcElement | null = null;

  constructor(
    private authService: AuthService,
    private stripeService: StripeService,
    private router: Router,
    private location: Location,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as { total: number; cartItems: any[] };

    if (state) {
      this.total = state.total;
      this.cartItems = state.cartItems || [];
    } else {
      this.location.back();
    }

    await this.cargarTarjetas();
    await this.loadUsuarios();
    this.stripe = await this.stripeService.getStripe();
  }

  async cargarTarjetas() {
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      console.warn('No hay usuario logueado');
      return;
    }

    const { data, error } = await this.authService.supabaseClient
      .from('tarjetas')
      .select('*')
      .eq('usuario_id', userId);

    if (!error && data) {
      this.tarjetas = data;
    } else if (error) {
      console.error('Error al cargar tarjetas:', error);
    }
  }

  async confirmarEliminarTarjeta(id: string) {
    const alert = await this.alertController.create({
      header: 'Eliminar método de pago',
      message: '¿Quieres eliminar este método de pago?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Sí',
          handler: async () => {
            await this.eliminarTarjeta(id);
          },
        },
      ],
    });

    await alert.present();
  }

  async eliminarTarjeta(id: string) {
    const { error } = await this.authService.supabaseClient
      .from('tarjetas')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error al eliminar la tarjeta:', error);
    } else {
      console.log('Tarjeta eliminada');
      await this.cargarTarjetas();
    }
  }

  goBack() {
    this.location.back();
  }

  async loadUsuarios() {
    const profile = await this.authService.getUserProfile();
    if (!profile) {
      console.warn('Error al recuperar el usuario');
      return;
    }
    this.usuario = profile;
  }

  abrirModalAgregarTarjeta() {
    this.showModal = true; // Esto hace que aparezca el form en el HTML

    // Espera a que Angular renderice
    setTimeout(async () => {
      const stripe = await this.stripeService.getStripe();
      if (!stripe) {
        console.error('Stripe no se inicializó');
        return;
      }

      const elements = stripe.elements();
      const cardNumber = elements.create('cardNumber');
      const cardExpiry = elements.create('cardExpiry');
      const cardCvc = elements.create('cardCvc');

      cardNumber.mount('#card-number-element');
      cardExpiry.mount('#card-expiry-element');
      cardCvc.mount('#card-cvc-element');

      this.cardNumberElement = cardNumber;
      this.cardExpiryElement = cardExpiry;
      this.cardCvcElement = cardCvc;
    }, 0);
  }

  cancelarAgregarTarjeta() {
    this.showModal = false;

    if (this.cardNumberElement) {
      this.cardNumberElement.unmount();
      this.cardNumberElement = null;
    }
    if (this.cardExpiryElement) {
      this.cardExpiryElement.unmount();
      this.cardExpiryElement = null;
    }
    if (this.cardCvcElement) {
      this.cardCvcElement.unmount();
      this.cardCvcElement = null;
    }
  }

  async guardarTarjeta() {
    if (!this.stripe || !this.cardNumberElement) return;

    const result = await this.stripe.createToken(this.cardNumberElement);
    if (result.error) {
      console.error(result.error.message);
    } else if (result.token) {
      await this.authService.supabaseClient.from('tarjetas').insert({
        usuario_id: this.authService.getCurrentUserId(),
        token_pago: result.token.id,
        numero_mascara: `XXXX-XXXX-XXXX-${result.token.card?.last4}`,
        nombre_propietario: result.token.card?.name || 'No informado',
        proveedor: 'Stripe',
      });

      console.log('Tarjeta guardada');
      this.cancelarAgregarTarjeta();
      await this.cargarTarjetas();
    }
  }

  async realizarPedido() {
    if (!this.metodoSeleccionado) {
      const alert = await this.alertController.create({
        header: 'Método de Pago',
        message: 'Por favor, selecciona un método de pago.',
        buttons: ['OK'],
      });

      await alert.present();
      return;
    }

    this.router.navigate(['/pedido-cargando'], {
      state: { total: this.total, cartItems: this.cartItems },
    });
  }
}
