import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private stripePromise: Promise<Stripe | null>;

  constructor() {
    this.stripePromise = loadStripe(
      'pk_test_51Ri20NRZHk1auBmr5uSQZKW4bG2IDrEOptb10mcTZzUfcvqrJSc04gCOzuWTqJHcOXlyCqoGcvGCZTMdZ8UtfCPT00rMuaxtQ3'
    );
  }

  getStripe() {
    return this.stripePromise;
  }
}
