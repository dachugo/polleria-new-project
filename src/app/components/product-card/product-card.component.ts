import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product-card',
  imports: [IonicModule, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
})
export class ProductCardComponent {
  @Input() name: string = '';
  @Input() price: number = 0;
  @Input() imageUrl: string = '';
  @Input() disabled: boolean = false;
  @Output() addClicked = new EventEmitter<void>();

  onAddClick() {
    this.addClicked.emit();
  }
}
