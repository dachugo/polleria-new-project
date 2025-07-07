import { Component } from '@angular/core';
import { PedidoService } from './services/pedido.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private pedidoService: PedidoService) {}
}
