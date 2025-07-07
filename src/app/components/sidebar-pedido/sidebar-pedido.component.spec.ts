import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SidebarPedidoComponent } from './sidebar-pedido.component';

describe('SidebarPedidoComponent', () => {
  let component: SidebarPedidoComponent;
  let fixture: ComponentFixture<SidebarPedidoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SidebarPedidoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
