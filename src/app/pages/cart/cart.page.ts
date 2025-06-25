import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NavbarComponent],
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  usuario: any;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const stored = localStorage.getItem('perfil');
    if (stored) {
      this.usuario = JSON.parse(stored);
    }
  }
  async logout() {
    await this.authService.signOut();
    this.router.navigate(['/']);
  }
}
