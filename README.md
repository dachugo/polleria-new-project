# 🍗 Pollería Arenas - Aplicación Móvil

[![Angular](https://img.shields.io/badge/Angular-19.0.0-red.svg)](https://angular.io/)
[![Ionic](https://img.shields.io/badge/Ionic-8.0.0-blue.svg)](https://ionicframework.com/)
[![Capacitor](https://img.shields.io/badge/Capacitor-7.4.0-purple.svg)](https://capacitorjs.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2.50.0-green.svg)](https://supabase.com/)
[![Stripe](https://img.shields.io/badge/Stripe-7.4.0-008cdd.svg)](https://stripe.com/)

## 📱 Descripción del Proyecto

**Pollería Arenas** es una aplicación móvil completa y moderna desarrollada para restaurantes de pollería, que permite a los clientes realizar pedidos, gestionar carritos de compra, y realizar pagos de forma segura y eficiente. La aplicación está diseñada para funcionar tanto en dispositivos móviles como en navegadores web.

## ✨ Características Principales

### 🏠 **Página de Inicio**
- **Banner promocional** con diseño atractivo
- **Catálogo de productos** organizado por categorías (Menú y Bebidas)
- **Filtros inteligentes** para navegar fácilmente entre productos
- **Diseño responsive** adaptado a diferentes tamaños de pantalla

### 🛒 **Sistema de Carrito de Compras**
- **Gestión de productos** con cantidades personalizables
- **Cálculo automático** de totales
- **Persistencia de datos** en tiempo real
- **Integración con base de datos** para sincronización

### 💳 **Métodos de Pago**
- **Integración con Stripe** para pagos con tarjeta de crédito/débito
- **Pago en efectivo** para entregas a domicilio
- **Pago con Yape** (transferencia móvil peruana)
- **Gestión de tarjetas guardadas** para usuarios registrados

### 👤 **Sistema de Usuarios**
- **Registro e inicio de sesión** seguro
- **Perfiles de usuario** personalizables
- **Autenticación con Supabase** (Firebase alternative)
- **Recuperación de contraseñas** por email

### 📋 **Gestión de Pedidos**
- **Seguimiento en tiempo real** del estado del pedido
- **Estados del pedido**: Pendiente → Confirmado → En preparación → Listo → En camino → Entregado
- **Notificaciones automáticas** de cambios de estado
- **Historial de pedidos** para usuarios registrados

### ❤️ **Sistema de Favoritos**
- **Guardado de productos favoritos** para acceso rápido
- **Sincronización** entre dispositivos
- **Interfaz intuitiva** para gestión de favoritos

### 🎨 **Diseño y UX**
- **Interfaz moderna** con Material Design
- **Iconografía intuitiva** para mejor experiencia de usuario
- **Navegación fluida** entre secciones
- **Temas adaptables** para diferentes preferencias

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- **Angular 19** - Framework principal para desarrollo web
- **Ionic 8** - Framework para aplicaciones móviles híbridas
- **TypeScript** - Lenguaje de programación tipado
- **SCSS** - Preprocesador CSS para estilos avanzados

### **Backend y Base de Datos**
- **Supabase** - Backend-as-a-Service con base de datos PostgreSQL
- **Autenticación JWT** - Sistema de autenticación seguro
- **Base de datos relacional** para productos, usuarios y pedidos

### **Pagos y Transacciones**
- **Stripe** - Plataforma de pagos en línea
- **API de tarjetas** para procesamiento seguro
- **Múltiples métodos de pago** (efectivo, Yape, tarjetas)

### **Desarrollo Móvil**
- **Capacitor 7** - Framework para aplicaciones nativas
- **Android nativo** - Soporte completo para dispositivos Android
- **Responsive design** - Adaptable a diferentes dispositivos

### **Herramientas de Desarrollo**
- **ESLint** - Linter para calidad de código
- **Karma + Jasmine** - Framework de testing
- **Angular CLI** - Herramientas de línea de comandos

## 🚀 Instalación y Configuración

### **Prerrequisitos**
- Node.js (versión 18 o superior)
- npm o yarn
- Angular CLI
- Ionic CLI
- Android Studio (para desarrollo móvil)

### **Instalación**

1. **Clonar el repositorio**
```bash
git clone [URL_DEL_REPOSITORIO]
cd arenas-app-project
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo environment.ts con tus credenciales de Supabase y Stripe
cp src/environments/environment.example.ts src/environments/environment.ts
```

4. **Ejecutar en modo desarrollo**
```bash
npm start
```

5. **Construir para producción**
```bash
npm run build
```

### **Configuración Móvil**

1. **Agregar plataforma Android**
```bash
ionic capacitor add android
```

2. **Sincronizar cambios**
```bash
ionic capacitor sync
```

3. **Abrir en Android Studio**
```bash
ionic capacitor open android
```

## 📱 Funcionalidades por Página

### **App Start** (`/`)
- Pantalla de bienvenida
- Navegación a login/registro
- Diseño atractivo con branding

### **Home** (`/home`)
- Catálogo principal de productos
- Filtros por categoría
- Header con perfil de usuario
- Banner promocional

### **Cart** (`/cart`)
- Vista del carrito de compras
- Gestión de cantidades
- Cálculo de totales
- Navegación al pago

### **Cart Pay** (`/cart-pay`)
- Resumen del pedido
- Confirmación de productos
- Selección de método de pago

### **Pay Method** (`/pay-method`)
- Integración con Stripe
- Gestión de tarjetas guardadas
- Procesamiento de pagos
- Confirmación de transacción

### **Pedido Estado** (`/pedido-estado`)
- Seguimiento en tiempo real
- Estados del pedido
- Notificaciones automáticas

### **Profile** (`/profile`)
- Gestión de perfil de usuario
- Información personal
- Historial de pedidos

## 🔧 Arquitectura del Proyecto

```
src/
├── app/
│   ├── components/          # Componentes reutilizables
│   │   ├── header-profile/  # Header con perfil de usuario
│   │   ├── navbar/          # Navegación inferior
│   │   ├── product-card/    # Tarjeta de producto
│   │   └── sidebar-pedido/  # Sidebar de pedidos
│   ├── pages/               # Páginas principales
│   ├── services/            # Servicios de lógica de negocio
│   │   ├── auth.service.ts  # Autenticación
│   │   ├── cart.service.ts  # Gestión del carrito
│   │   ├── stripe.service.ts # Integración con Stripe
│   │   └── ...
│   └── guards/              # Guardias de ruta
├── assets/                  # Recursos estáticos
│   ├── img/                 # Imágenes y logos
│   └── sounds/              # Efectos de sonido
└── environments/            # Configuraciones por entorno
```

## 🎯 Casos de Uso

### **Para Clientes**
1. **Explorar menú** - Navegar por productos disponibles
2. **Realizar pedidos** - Agregar productos al carrito
3. **Gestionar favoritos** - Guardar productos preferidos
4. **Pagar online** - Usar múltiples métodos de pago
5. **Seguir pedidos** - Monitorear estado en tiempo real

### **Para Restaurantes**
1. **Gestión de productos** - Actualizar menú y precios
2. **Procesamiento de pedidos** - Confirmar y preparar pedidos
3. **Seguimiento de entregas** - Actualizar estados de pedidos
4. **Análisis de ventas** - Reportes y estadísticas

## 🔒 Seguridad

- **Autenticación JWT** con Supabase
- **Validación de formularios** en frontend y backend
- **Procesamiento seguro** de pagos con Stripe
- **Encriptación** de datos sensibles
- **Guardias de ruta** para páginas protegidas

## 📊 Base de Datos

### **Tablas Principales**
- **usuarios** - Información de clientes
- **productos** - Catálogo de productos
- **carrito** - Productos en carrito de compra
- **pedidos** - Historial de pedidos
- **favoritos** - Productos favoritos de usuarios
- **tarjetas** - Métodos de pago guardados

## 🚀 Despliegue

### **Web**
- Construir con `npm run build`
- Desplegar en cualquier hosting estático (Netlify, Vercel, etc.)

### **Móvil**
- Generar APK con Android Studio
- Publicar en Google Play Store
- Distribuir internamente para testing

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Pollería Arenas** - [Tu Nombre/Organización]

## 🙏 Agradecimientos

- **Ionic Framework** por el framework móvil
- **Angular Team** por el framework web
- **Supabase** por el backend-as-a-service
- **Stripe** por la plataforma de pagos

## 📞 Contacto

- **Email**: [tu-email@ejemplo.com]
- **Website**: [https://tu-sitio-web.com]
- **LinkedIn**: [https://linkedin.com/in/tu-perfil]

---

⭐ **¡No olvides darle una estrella al proyecto si te gustó!**
