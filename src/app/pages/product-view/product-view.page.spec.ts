import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductViewPage } from './product-view.page';

describe('ProductViewPage', () => {
  let component: ProductViewPage;
  let fixture: ComponentFixture<ProductViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
