import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-product-card',
  imports: [IonicModule, CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() price: number = 0;
  @Input() imageUrl: string = '';
  @Input() disabled: boolean = false;
  @Output() addClicked = new EventEmitter<void>();

  constructor(private router: Router) {}

  navigateProduct() {
    this.router.navigate(['/product-view', this.id]);
  }
}
