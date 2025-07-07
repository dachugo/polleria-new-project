import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidoCargandoPage } from './pedido-cargando.page';

describe('PedidoCargandoPage', () => {
  let component: PedidoCargandoPage;
  let fixture: ComponentFixture<PedidoCargandoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoCargandoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
