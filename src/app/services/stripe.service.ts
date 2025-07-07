import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { secret } from 'src/environments/environment.secret';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private stripePromise: Promise<Stripe | null>;

  constructor() {
    this.stripePromise = loadStripe(secret.stripePublicKey);
  }

  getStripe() {
    return this.stripePromise;
  }
}
