import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidoEstadoPage } from './pedido-estado.page';

describe('PedidoEstadoPage', () => {
  let component: PedidoEstadoPage;
  let fixture: ComponentFixture<PedidoEstadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoEstadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
