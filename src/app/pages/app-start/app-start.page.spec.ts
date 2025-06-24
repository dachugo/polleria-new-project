import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppStartPage } from './app-start.page';

describe('AppStartPage', () => {
  let component: AppStartPage;
  let fixture: ComponentFixture<AppStartPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AppStartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
