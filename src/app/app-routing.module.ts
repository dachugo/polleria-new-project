import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/app-start/app-start.page').then((m) => m.AppStartPage),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./pages/cart/cart.page').then((m) => m.CartPage),
  },
  {
    path: 'favorite',
    loadComponent: () =>
      import('./pages/favorite/favorite.page').then((m) => m.FavoritePage),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.page').then((m) => m.ProfilePage),
  },
  {
    path: 'product-view/:id',
    loadComponent: () =>
      import('./pages/product-view/product-view.page').then(
        (m) => m.ProductViewPage
      ),
  },
  {
    path: 'cart-pay',
    loadComponent: () =>
      import('./pages/cart-pay/cart-pay.page').then((m) => m.CartPayPage),
  },
  {
    path: 'pay-method',
    loadComponent: () =>
      import('./pages/pay-method/pay-method.page').then((m) => m.PayMethodPage),
  },
  {
    path: 'pedido-estado',
    loadComponent: () =>
      import('./pedido-estado/pedido-estado.page').then(
        (m) => m.PedidoEstadoPage
      ),
  },
  {
    path: 'pedido-cargando',
    loadComponent: () =>
      import('./pedido-cargando/pedido-cargando.page').then(
        (m) => m.PedidoCargandoPage
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
