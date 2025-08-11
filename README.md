# 🍗 Pollería Arenas - Complete Management System

<div align="center">
  <img src="src/assets/img/image-logo-polleria.svg" alt="Pollería Arenas Logo" width="200"/>
  
  [![Angular](https://img.shields.io/badge/Angular-19.0.0-red.svg)](https://angular.io/)
  [![Ionic](https://img.shields.io/badge/Ionic-8.0.0-blue.svg)](https://ionicframework.com/)
  [![Capacitor](https://img.shields.io/badge/Capacitor-7.4.0-purple.svg)](https://capacitorjs.com/)
  [![Supabase](https://img.shields.io/badge/Supabase-2.50.0-green.svg)](https://supabase.com/)
  [![Stripe](https://img.shields.io/badge/Stripe-7.4.0-blue.svg)](https://stripe.com/)
</div>

## 📱 Project Description

**Pollería Arenas** is a complete mobile app for managing a chicken restaurant, allowing customers to place digital orders and administrators to manage the business efficiently.

### 🎯 Main Goals
- **Business Digitalization**: Transform traditional ordering into an intuitive digital process
- **Efficient Management**: Automate order handling, inventory, and customer management
- **User Experience**: Provide a modern, easy-to-use interface for customers and admins
- **Security**: Implement robust authentication and secure payments

---

## ⚡ **Programming Challenge - 10 DAYS**

This project was developed as an **intensive programming challenge** completed in **just 10 days**, demonstrating:

<div align="center">
  <img src="src/assets/screenshots-app/bg-presentation.png" alt="App Presentation" width="700"/>
  <p><em>Welcome to Polleria Arenas!</em></p>
</div>

### 🚀 **Technical Skills Demonstrated**
- **Full-Stack Development** with modern cutting-edge technologies
- **Software Architecture** robust and scalable from scratch
- **Complex API Integration** (Stripe, Supabase) in record time
- **Performance Optimization** for hybrid mobile applications
- **Advanced State Management** with reactive patterns

### 💼 **Key Professional Competencies**
- **Project Management** under extreme time pressure
- **Complex Problem Solving** efficiently
- **Technological Adaptability** with emerging frameworks
- **Critical Thinking** for quick architectural decisions
- **Technical Communication** clear and professional documentation

### 🎯 **Market Value**
- **Impact Portfolio**: Shows ability to deliver complete products quickly
- **Modern Tech Stack**: Experience with most in-demand market technologies
- **Real Project**: Functional solution for real business, not just academic exercises
- **Scalability**: Architecture ready for long-term growth and maintenance

### 🏆 **Challenge Highlights**
- **Complete MVP**: Functional app with all core features implemented
- **Full Integration**: Stripe + Supabase working perfectly in production
- **Professional UX/UI**: Intuitive and attractive interface developed in record time
- **Quality Code**: Modular structure, testing and complete documentation
- **Mobile Deployment**: App ready to publish on App Store and Google Play

---

## 📱 **App Screenshots & UI Showcase**

<div align="center">
  <h3>🎨 Complete App Interface Overview</h3>
  <p><em>See the beautiful and professional design of Pollería Arenas</em></p>
</div>

<div align="center">
  <img src="src/assets/screenshots-app/login-validations-screens.png" alt="Login and Validation Screens" width="700"/>
  <p><em>Secure authentication with form validations</em></p>
</div>

<div align="center">
  <img src="src/assets/screenshots-app/home-screenshots.png" alt="Home and Product Screens" width="700"/>
  <p><em>Home screen with product catalog and navigation</em></p>
</div>

<div align="center">
  <img src="src/assets/screenshots-app/sections-screenshots.png" alt="App Sections and Navigation" width="700"/>
  <p><em>App sections: cart, favorites, profile, and navigation</em></p>
</div>

<div align="center">
  <img src="src/assets/screenshots-app/payment-screenshots.png" alt="Payment Process Screens" width="700"/>
  <p><em>Payment flow with multiple payment methods</em></p>
</div>

<div align="center">
  <img src="src/assets/screenshots-app/order-screenshots.png" alt="Order Management Screens" width="700"/>
  <p><em>Order tracking and management system</em></p>
</div>

## 🚀 Technologies Used

### **Frontend & Mobile**
- **Ionic Framework 8.0.0** - Hybrid mobile app framework
- **Angular 19.0.0** - Modern web development framework
- **Capacitor 7.4.0** - Native browser for mobile features
- **TypeScript 5.6.3** - Typed programming language
- **SCSS** - CSS preprocessor for advanced styles

### **Backend & Database**
- **Supabase 2.50.0** - Backend-as-a-Service with PostgreSQL
- **Row Level Security (RLS)** - Granular security policies
- **Integrated Authentication** - User and session system

### **Payments & Integrations**
- **Stripe 7.4.0** - Secure payment platform
- **Multiple Payment Methods** - Cards, cash, Yape
- **Card Management** - Secure storage of payment methods

---

## ✨ Main Features

### 👤 **User Management**
- Secure registration and login
- Customizable profiles with avatars
- Personal information management (name, address, phone and even a custom profile icon)
- Persistent authentication system

### 🍽️ **Product Catalog**
- Menu and drinks visualization
- Filtering by categories (foods/drinks)
- High-quality images for each product
- Detailed price and description information

### ❤️ **Favorites System**
- Save favorite products
- Quick access to preferred products
- Synchronization with user account

### 🛒 **Shopping Cart**
- Add/remove products
- Quantity control (max 10 per product)
- Automatic total calculation
- Cart data persistence

### 💳 **Payment System**
- **Multiple Payment Methods**:
  - Credit/debit cards (Stripe)
  - Cash (Simulated)
- Saved card management
- Secure and validated payment process

### 📋 **Order Management**
- Automatic order creation
- Real-time status tracking
- Order states:
  - Pending → Confirmed → In Preparation → Ready to Send → On the Way → Delivered
- Automatic status change notifications

### 📱 **Mobile Experience**
- Responsive and adaptive design
- Intuitive tab navigation
- Reusable components
- Mobile device optimization

---

## 🏗️ Project Architecture

### **Component Structure**
```
src/app/
├── components/           # Reusable components
│   ├── header-profile/  # User info header
│   ├── navbar/          # Main navigation
│   ├── product-card/    # Product card
│   └── sidebar-pedido/  # Order sidebar
├── pages/               # Main pages
│   ├── home/           # Main page with products
│   ├── cart/           # Shopping cart
│   ├── favorite/       # Favorite products
│   ├── profile/        # User profile
│   ├── cart-pay/       # Payment process
│   ├── pay-method/     # Payment method selection
│   └── pedido-estado/  # Order tracking
└── services/           # App services
    ├── auth.service.ts # Authentication and user management
    ├── cart.service.ts # Cart management
    ├── stripe.service.ts # Stripe integration
    └── favoritos.service.ts # Favorites management
```

### **Design Patterns**
- **Modular Architecture** with standalone components
- **Injectable Services** for business logic
- **Authentication Guards** for route protection
- **Lazy Loading** for performance optimization
- **Reactive Forms** for data validation

---

## 🔧 Installation & Setup

### **Prerequisites**
- Node.js 18+
- npm or yarn
- Ionic CLI
- Supabase account
- Stripe account

### **1. Clone Repository**
```bash
git clone https://github.com/dachugo/polleria-new-project.git
cd polleria-new-project
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Environment Variables**
Create `src/environments/environment.secret.ts`:

```typescript
export const secret = {
  supabaseUrl: 'YOUR_SUPABASE_URL',
  supabaseKey: 'YOUR_SUPABASE_ANON_KEY',
  stripePublicKey: 'YOUR_STRIPE_PUBLIC_KEY'
};
```

### **4. Development**
```bash
# Development server
ionic serve

# Production build
ionic build

# Mobile device
ionic capacitor run android
ionic capacitor run ios
```

---

## 🗄️ Database Configuration

### **Main Tables in Supabase**
- **usuarios**: Customer information and profiles
- **productos**: Food and drinks catalog
- **categorias**: Product classification
- **carrito**: Cart products by user
- **favoritos**: Favorite products by user
- **pedidos**: Order history
- **tarjetas**: Saved payment methods
- **estados_pedido**: Status tracking

### **RLS Policies (Row Level Security)**
- **Users**: Only access their own information
- **Products**: Public read, admin write only
- **Cart/Favorites**: Users only see their own items
- **Orders**: Users see only their orders, admins see all

---

## 💳 Stripe Integration

### **Implemented Features**
- Stripe.js loading for secure processing
- Custom card elements
- Payment data validation
- Secure payment method storage
- Transaction processing

### **Required Configuration**
- Stripe public key in environment.secret.ts
- Webhook configuration for notifications
- Security policies for payment data

---

## 📱 Mobile Features

### **Capacitor Integration**
- **Android**: Complete native support
- **iOS**: Apple device compatibility
- **Web**: Full browser functionality
- **PWA**: Progressive web app capabilities

### **Native Features**
- Touch gesture optimization
- Gesture navigation
- Automatic screen size adaptation
- Mobile performance optimization

---

## 🚀 Deployment
### **Build Process**
```bash
# Production build
ionic build --prod

# Android build
ionic capacitor build android

# iOS build
ionic capacitor build ios
```

---

## 🔒 Security

### **Implemented Measures**
- JWT authentication with Supabase
- RLS policies for data protection
- Form validation in frontend and backend
- Sensitive data encryption
- CSRF protection in forms

### **Best Practices**
- Environment variables for sensitive keys
- User input validation
- Data sanitization
- Audit logs for critical actions

---

## 📊 Monitoring & Analytics

### **Performance Metrics**
- Page load times
- Database performance
- Memory and CPU usage
- User metrics (sessions, conversions)

### **Logs & Debugging**
- Structured debugging logs
- Real-time error monitoring
- Application performance metrics

---

## 🤝 Contributing

### **How to Contribute**
1. Fork repository
2. Create feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Create Pull Request

### **Code Standards**
- Follow Angular/Ionic conventions
- Document complex functions
- Maintain test coverage
- Review code before merge

---

<div align="center">
  <p><strong>Thanks for using Pollería Arenas! 🍗✨</strong></p>
  <p>A complete solution to digitize your chicken restaurant business</p>
</div>
