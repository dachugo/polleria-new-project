import { TestBed } from '@angular/core/testing';

import { PedidosEstadosService } from './pedidos-estados.service';

describe('PedidosEstadosService', () => {
  let service: PedidosEstadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidosEstadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
