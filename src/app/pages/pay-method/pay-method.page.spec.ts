import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PayMethodPage } from './pay-method.page';

describe('PayMethodPage', () => {
  let component: PayMethodPage;
  let fixture: ComponentFixture<PayMethodPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PayMethodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
