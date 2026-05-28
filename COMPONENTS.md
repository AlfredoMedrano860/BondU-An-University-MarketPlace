# Documentación de Componentes

Proyecto mobile-first simulado en mockup de iPhone. No usa librería de rutas — toda la navegación se maneja con estado en `App.tsx`.

---

## Índice

1. [Estructura general](#estructura-general)
2. [Flujo de navegación](#flujo-de-navegación)
3. [Datos (data/)](#datos-data)
4. [Hooks (hooks/)](#hooks-hooks)
5. [Layout](#layout)
6. [Componentes UI atómicos (ui/)](#componentes-ui-atómicos-ui)
7. [Componentes compuestos (templates/)](#componentes-compuestos-templates)
8. [Pantallas (screens/)](#pantallas-screens)

---

## Estructura general

```
src/
├── App.tsx
├── main.tsx
└── components/
    ├── data/
    │   ├── About.ts
    │   ├── AuthStore.ts
    │   ├── AuthValidations.ts
    │   ├── Faq.ts
    │   ├── FeaturedData.ts
    │   ├── InfoItem.ts
    │   ├── Navigation.ts
    │   ├── Product.ts
    │   ├── ProductStore.ts
    │   ├── ProductValidations.ts
    │   ├── Seller.ts
    │   ├── SettingsItem.ts
    │   ├── Terms.ts
    │   ├── User.ts
    │   └── UserProfile.ts
    ├── layout/
    │   └── AppLayout.tsx
    ├── ui/                      ← botones, inputs, elementos atómicos
    │   ├── AuxiliaryButton.tsx
    │   ├── BackButton.tsx
    │   ├── CodeInput.tsx
    │   ├── DotsIndicator.tsx
    │   ├── EmptyState.tsx
    │   ├── FavoriteButton.tsx
    │   ├── InputSpace.tsx
    │   ├── PrimaryButton.tsx
    │   ├── SecondaryButton.tsx
    │   └── StarRating.tsx
    ├── templates/               ← componentes compuestos reutilizables
    │   ├── AboutAccordion.tsx
    │   ├── AppHeader.tsx
    │   ├── BottomNav.tsx
    │   ├── FaqAccordion.tsx
    │   ├── FeaturedBanner.tsx
    │   ├── InfoContent.tsx
    │   ├── MyProductCard.tsx
    │   ├── ProductCard.tsx
    │   ├── ProductForm.tsx
    │   ├── ProductGallery.tsx
    │   ├── ProductGrid.tsx
    │   ├── ProductImagePicker.tsx
    │   ├── ProductInfo.tsx
    │   ├── ProductTabs.tsx
    │   ├── ProfileHeader.tsx
    │   ├── SearchBar.tsx
    │   ├── SellerTab.tsx
    │   ├── SettingRow.tsx
    │   ├── SettingsGroup.tsx
    │   ├── ShareTab.tsx
    │   ├── StepCode.tsx
    │   ├── StepEmail.tsx
    │   ├── StepNewPassword.tsx
    │   └── TermsAccordion.tsx
    └── screens/                 ← vistas completas
        ├── AccountScreen.tsx
        ├── AddProductScreen.tsx
        ├── FavoriteScreen.tsx
        ├── ForgotPasswordScreen.tsx
        ├── HomeScreen.tsx
        ├── InfoScreen.tsx
        ├── LoginScreen.tsx
        ├── MarketPlaceScreen.tsx
        ├── MyProductsScreen.tsx
        ├── ProductScreen.tsx
        ├── SettingsScreen.tsx
        ├── SignUpScreen.tsx
        └── WelcomeScreen.tsx
```

**Stack:** React 19, TypeScript, Tailwind CSS 4, Lucide React, Phosphor Icons, Radix UI, Vite.

---

## Árbol de composición completo

```
App
└── AppLayout
    └── <Pantalla activa>
        │
        ├── InfoScreen
        │   └── InfoContent (× 3 slides)
        │       ├── DotsIndicator
        │       └── PrimaryButton
        │
        ├── WelcomeScreen
        │   ├── PrimaryButton
        │   └── SecondaryButton
        │
        ├── LoginScreen
        │   ├── BackButton
        │   ├── InputSpace (× 2 campos)
        │   └── PrimaryButton
        │
        ├── SignUpScreen
        │   ├── BackButton
        │   ├── InputSpace (× 3 campos)
        │   └── PrimaryButton
        │
        ├── ForgotPasswordScreen
        │   ├── BackButton
        │   ├── StepEmail (paso 1)
        │   │   ├── InputSpace
        │   │   └── PrimaryButton
        │   ├── StepCode (paso 2)
        │   │   ├── CodeInput
        │   │   └── PrimaryButton
        │   └── StepNewPassword (paso 3)
        │       ├── InputSpace (× 2 campos)
        │       └── PrimaryButton
        │
        ├── HomeScreen / MarketPlaceScreen / FavoriteScreen
        │   ├── AppHeader
        │   │   └── SearchBar
        │   ├── FeaturedBanner (solo Home)
        │   │   └── DotsIndicator
        │   ├── ProductGrid  (o EmptyState si no hay productos)
        │   │   └── ProductCard (× n)
        │   │       ├── FavoriteButton
        │   │       └── AuxiliaryButton
        │   └── BottomNav
        │
        ├── ProductScreen
        │   ├── BackButton
        │   ├── ProductGallery
        │   ├── ProductInfo
        │   └── ProductTabs
        │       ├── [tab 0] descripción (texto plano)
        │       ├── [tab 1] SellerTab
        │       │   └── StarRating
        │       └── [tab 2] ShareTab
        │
        ├── SettingsScreen
        │   ├── ProfileHeader
        │   ├── SettingRow (× n)
        │   │   └── Toggle
        │   ├── FaqAccordion    ← Radix UI
        │   ├── AboutAccordion  ← Radix UI
        │   ├── TermsAccordion  ← Radix UI
        │   └── BottomNav
        │
        ├── AccountScreen
        │   ├── BackButton
        │   ├── InputSpace (× 7 campos)
        │   └── PrimaryButton
        │
        ├── MyProductsScreen
        │   ├── BackButton
        │   ├── MyProductCard (× n)  (o EmptyState si no hay productos)
        │   └── BottomNav
        │
        └── AddProductScreen
            ├── ProductImagePicker
            │   └── BackButton
            └── ProductForm
                ├── InputSpace (× 4 campos)
                └── PrimaryButton
```

---

## Flujo de navegación

`App.tsx` mantiene un estado `screen` y `currentUser`. No hay URLs ni rutas — solo un switch de estado.

```
InfoScreen (onboarding)  ←  Skip en cualquier slide
    ↓ (al terminar los 3 slides)
WelcomeScreen
    ↓ INICIAR SESIÓN          ↓ (botón Regístrate dentro de Login)
LoginScreen               SignUpScreen
    ↓ ¿Olvidaste contraseña?      ↓ REGISTRAR (vuelve a Login)
ForgotPasswordScreen
    paso 1: correo
    paso 2: código (CodeInput)
    paso 3: nueva contraseña
    ↓ (vuelve a Login)
         ↓ INICIAR SESIÓN
    HomeScreen  ←→  MarketPlaceScreen  ←→  FavoriteScreen  ←→  SettingsScreen
        ↓ (tap en producto)                                         ↓           ↓
    ProductScreen                                           AccountScreen  MyProductsScreen
        ↑ (botón atrás)
    AddProductScreen  ←  botón + en BottomNav
```

---