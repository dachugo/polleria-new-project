import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartPayPage } from './cart-pay.page';

describe('CartPayPage', () => {
  let component: CartPayPage;
  let fixture: ComponentFixture<CartPayPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
