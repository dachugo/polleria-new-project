# 🍗 Sistema de Gestión de Pollería (Ionic + Angular + Supabase + Stripe)

Este es un proyecto desarrollado para gestionar una pollería, compuesto por:

✅ **Aplicación móvil (Ionic + Angular)** para clientes
✅ **Panel web básico (JavaScript Vanilla)** para administradores
✅ **Backend en Supabase** con políticas RLS para proteger datos según el rol
✅ **Integración con Stripe** para gestionar pagos seguros

---

## 📱 Funcionalidades de la app móvil

* Registro e inicio de sesión mediante Supabase Auth
* Visualización de productos (platos y bebidas)
* Agregar / quitar favoritos
* Gestión de carrito de compras
* Envío de pedidos

## 🖥️ Funcionalidades del panel administrativo web

* Ingreso con autenticación
* Gestión de productos: agregar, eliminar
* Reportes de clientes y pedidos

---

## 🚀 Integraciones

* **Supabase**: base de datos y autenticación
* **Stripe**: gestión de pagos

✅ Claves sensibles ocultas mediante `src/environments/environment.secret.ts` (excluido del repo con `.gitignore`)
✅ Preparado para entornos de desarrollo y producción

---

## ⚡ Cómo probar el proyecto

1️⃣ Clona el repositorio:

```bash
git clone https://github.com/dachugo/polleria-new-project.git
```

2️⃣ Crea el archivo `src/environments/environment.secret.ts` con tus claves:

```ts
export const secretEnvironment = {
  supabaseUrl: 'TU_SUPABASE_URL',
  supabaseAnonKey: 'TU_SUPABASE_ANON_KEY',
  stripePublicKey: 'TU_STRIPE_PUBLIC_KEY'
};
```

3️⃣ Instala las dependencias:

```bash
npm install
```

4️⃣ Levanta el proyecto:

```bash
ionic serve
```

---

## 🌟 Notas

* El panel web conecta a la misma base de datos Supabase y puede integrarse fácilmente agregando las credenciales correspondientes.
* El código está modularizado: los servicios (carrito, favoritos) y las vistas están separados para un mantenimiento sencillo.
* Las políticas RLS protegen la información para que el cliente y el admin solo accedan a lo que les corresponde.

---

## 💬 Agradecimiento

¡Gracias por visitar el proyecto! Siéntete libre de contribuir o dejar tus sugerencias 🚀.
