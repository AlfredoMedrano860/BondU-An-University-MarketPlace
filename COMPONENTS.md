# Documentación de Componentes

Proyecto mobile-first simulado en mockup de iPhone. No usa librería de rutas — toda la navegación se maneja con estado en `App.tsx`.

---

## Índice

1. [Estructura general](#estructura-general)
2. [Flujo de navegación](#flujo-de-navegación)
3. [Datos (data/)](#datos-data)
4. [Hooks (data/hooks/)](#hooks-datahooks)
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
    │   ├── hooks/               ← lógica extraída de componentes
    │   ├── interfaces/          ← User.ts, UserProfile.ts, Seller.ts
    │   ├── stores/              ← AuthStore.ts, ProductStore.ts
    │   ├── validations/         ← AuthValidations.ts, ProductValidations.ts
    │   └── mock data            ← Product.ts, FeaturedData.ts, InfoItem.ts, etc.
    ├── layout/
    ├── ui/                      ← botones, inputs, elementos atómicos
    ├── templates/               ← componentes compuestos reutilizables
    └── screens/                 ← vistas completas
```

**Stack:** React 19, TypeScript, Tailwind CSS 4, Lucide React, Phosphor Icons, Radix UI, Vite.

## Árbol de composición completo

```
App
└── AppLayout
    └── <Pantalla activa>
        │
        ├── InfoScreen
        │   └── InfoContent (× 3 slides)
        │       └── DotsIndicator
        │
        ├── WelcomeScreen
        │   ├── PrimaryButton
        │   └── SecondaryButton
        │
        ├── LoginScreen / SignUpScreen
        │   ├── BackButton
        │   └── InputSpace (× 2-3 campos)
        │       └── PrimaryButton
        │
        ├── HomeScreen / MarketPlaceScreen
        │   ├── AppHeader
        │   │   └── SearchBar
        │   ├── FeaturedBanner (solo Home)
        │   │   └── DotsIndicator
        │   ├── ProductGrid
        │   │   └── ProductCard (× n)
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
        │   ├── Toggle
        │   ├── FaqAccordion    ← Radix UI
        │   ├── AboutAccordion  ← Radix UI
        │   ├── TermsAccordion  ← Radix UI
        │   └── BottomNav
        │
        ├── AccountScreen
        │   ├── BackButton
        │   └── InputSpace (× 7 campos)
        │       └── PrimaryButton
        │
        ├── MyProductsScreen
        │   ├── BackButton
        │   └── MyProductCard (× n)
        │
        └── AddProductScreen
            ├── ProductImagePicker
            │   └── BackButton
            └── ProductForm
                └── InputSpace (× 3 campos)
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
    ↓ INICIAR SESIÓN              ↓ REGISTRAR (vuelve a Login)
         ↓
    HomeScreen  ←→  MarketPlaceScreen  ←→  SettingsScreen
        ↓ (tap en producto)                    ↓           ↓
    ProductScreen                      AccountScreen  MyProductsScreen
        ↓ (botón + en BottomNav)
    AddProductScreen
```

---

## Datos (`data/`)

---

### [User.ts](src/components/data/User.ts)

Interfaz base para todos los tipos de usuario.

```ts
interface User {
  id: number
  username: string
  email: string
  password: string
  avatar: string
  createdAt: Date
}
```

---

### [UserProfile.ts](src/components/data/UserProfile.ts)

Extiende `User`. Es el usuario que inició sesión.

```ts
interface UserProfile extends User {
  phone?: string
  university?: string
  career?: string
  notifications?: boolean
  language?: "es" | "en"
}
```

---

### [Seller.ts](src/components/data/Seller.ts)

Extiende `User`. Agrega calificación y reseñas.

```ts
interface Seller extends User {
  rating: number
  reviews: number
}
```

Exporta `sellers[]` con 1 vendedor de ejemplo.

---

### [Product.ts](src/components/data/Product.ts)

Modelo central de la app.

```ts
interface Product {
  id: number
  name: string
  price: number
  state: string       // "Nuevo" | "Usado"
  image: string
  gallery: string[]
  description: string
  seller: Seller
}
```

Exporta `products[]` con 4 productos de ejemplo.

---

### [AuthStore.ts](src/components/data/AuthStore.ts)

Maneja el estado de autenticación en memoria. Importa validaciones de `AuthValidations.ts`.

| Función | Descripción |
|---------|-------------|
| `register(username, email, password)` | Crea una cuenta y abre sesión |
| `login(email, password)` | Inicia sesión |
| `updateUser(fields)` | Actualiza campos del usuario actual |
| `deleteUser()` | Elimina la cuenta activa |
| `getCurrentUser()` | Retorna el usuario con sesión activa |
| `logout()` | Cierra la sesión |

Exporta `AuthResult: { ok: true; user } | { ok: false; error }`.

---

### [AuthValidations.ts](src/components/data/AuthValidations.ts)

Validaciones puras sin estado, importadas por `AuthStore`.

| Función | Descripción |
|---------|-------------|
| `validateRegister(username, email, password, users)` | Verifica campos y duplicados |
| `validateLogin(email, password)` | Verifica que los campos no estén vacíos |

---

### [ProductStore.ts](src/components/data/ProductStore.ts)

Maneja el arreglo de productos en memoria. Importa validaciones de `ProductValidations.ts`.

| Función | Descripción |
|---------|-------------|
| `getProducts()` | Retorna todos los productos |
| `getProductsByUser(userId)` | Filtra productos por vendedor |
| `addProduct(input)` | Agrega un producto nuevo |
| `removeProduct(productId)` | Elimina un producto por id |

Exporta `MAX_PRODUCT_IMAGES = 3` y `ProductResult: { ok: true; product } | { ok: false; error }`.

---

### [ProductValidations.ts](src/components/data/ProductValidations.ts)

| Función | Descripción |
|---------|-------------|
| `validateProduct(input)` | Verifica nombre, precio e imagen |

---

### [FeaturedData.ts](src/components/data/FeaturedData.ts)

Datos del banner rotativo de inicio.

```ts
interface FeaturedItem { id: number; image: string; alt: string }
```

Exporta `featuredItems[]` con 3 banners.

---

### [InfoItem.ts](src/components/data/InfoItem.ts)

Datos del onboarding.

```ts
interface InfoItem { image: string; title: string; description: string; buttonText?: string }
```

Exporta `infoItems[]` con 3 slides: Intercambia, Conecta, Ahorra.

---

### [navigation.ts](src/components/data/navigation.ts)

Datos de navegación de la app.

```ts
interface NavItem { id: number; icon: LucideIcon; screen: string }
```

Exporta `navItems[]` con los 5 ítems del `BottomNav` y `productTabs[]` con los nombres de las pestañas del detalle de producto.

---

### [FaqData.ts](src/components/data/FaqData.ts)

```ts
interface FaqItem { question: string; answer: string }
```

Exporta `faqItems[]` con 5 preguntas frecuentes.

---

### [AboutData.ts](src/components/data/AboutData.ts)

```ts
interface Developer { name: string; role: string; description: string; avatar: string }
```

Exporta `developers[]`, `mision` y `vision`.

---

### [TermsData.ts](src/components/data/TermsData.ts)

Exporta `terminos`, `privacidad`, `appVersion` y `appBaseUrl`.

---

## Hooks (`data/hooks/`)

Lógica extraída de componentes para mantener las pantallas limpias.

---

### [useAccountForm.ts](src/components/data/hooks/useAccountForm.ts)

Maneja el estado y el guardado del formulario de cuenta.

```ts
useAccountForm(currentUser, onUpdate)
// retorna { fields, setters, status, handleSave }
```

**Usado en:** `AccountScreen`.

---

### [useAddProductForm.ts](src/components/data/hooks/useAddProductForm.ts)

Maneja el estado y el guardado del formulario de nuevo producto.

```ts
useAddProductForm(currentUser, onBack)
// retorna { fields, setters, error, handleSave }
```

**Usado en:** `AddProductScreen`.

---

### [useImagePicker.ts](src/components/data/hooks/useImagePicker.ts)

Maneja el `useRef` y la lógica de selección de archivos del picker de imágenes.

```ts
useImagePicker(gallery, onGalleryChange)
// retorna { fileInputRef, handleFileChange, openPicker }
```

**Usado en:** `ProductImagePicker`.

---

### [useAccordion.ts](src/components/data/hooks/useAccordion.ts)

Hooks reutilizables para acordeones manuales.

```ts
useAccordion(defaultOpen?)   // retorna { open, toggle }
useAccordionIndex()          // retorna { openIndex, toggle }
```

---

## Layout

### [AppLayout.tsx](src/components/layout/AppLayout.tsx)

Wrapper mínimo que aplica fondo beige y ancho máximo. Recibe `children`.

**Usado en:** `App.tsx`.

---

## Componentes UI atómicos (`ui/`)

---

### [PrimaryButton.tsx](src/components/ui/PrimaryButton.tsx)

Botón CTA principal de ancho completo.

| Prop | Tipo |
|------|------|
| `text` | `string` |
| `onClick?` | `() => void` |

---

### [SecondaryButton.tsx](src/components/ui/SecondaryButton.tsx)

Botón con borde y sin fondo.

| Prop | Tipo |
|------|------|
| `text` | `string` |
| `onClick?` | `() => void` |

**Usado en:** `WelcomeScreen`.

---

### [AuxiliaryButton.tsx](src/components/ui/AuxiliaryButton.tsx)

Botón compacto amarillo para acciones secundarias.

| Prop | Tipo | Default |
|------|------|---------|
| `text?` | `string` | `"COMPRAR"` |
| `onClick?` | `() => void` | — |

**Usado en:** `ProductCard`.

---

### [BackButton.tsx](src/components/ui/BackButton.tsx)

Ícono `<` para navegación hacia atrás.

| Prop | Tipo |
|------|------|
| `onClick` | `() => void` |

---

### [DotsIndicator.tsx](src/components/ui/DotsIndicator.tsx)

Indicador de posición tipo carrusel.

| Prop | Tipo |
|------|------|
| `currentIndex` | `number` |
| `total` | `number` |

**Usado en:** `InfoContent`, `FeaturedBanner`.

---

### [InputSpace.tsx](src/components/ui/InputSpace.tsx)

Campo de texto controlado. Soporta modo contraseña (toggle ojo) y multilinea. Suprime el ícono nativo del browser en campos password.

| Prop | Tipo | Descripción |
|------|------|-------------|
| `type?` | `"text" \| "password"` | — |
| `placeholder?` | `string` | — |
| `value` | `string` | Valor controlado |
| `onChange` | `(v: string) => void` | — |
| `multiline?` | `boolean` | Renderiza `<textarea>` |

---

### [StarRating.tsx](src/components/ui/StarRating.tsx)

Estrellas llenas/vacías según `rating`.

| Prop | Tipo |
|------|------|
| `rating` | `number` |
| `reviews` | `number` |

**Usado en:** `SellerTab`.

---

## Componentes compuestos (`templates/`)

---

### [AppHeader.tsx](src/components/templates/AppHeader.tsx)

Cabecera con avatar y nombre del usuario actual, más `SearchBar`.

| Prop | Tipo |
|------|------|
| `currentUser` | `UserProfile` |

**Usado en:** `HomeScreen`, `MarketPlaceScreen`.

---

### [SearchBar.tsx](src/components/templates/SearchBar.tsx)

Input de búsqueda con lupa y filtros. Sin lógica (placeholder visual).

**Usado en:** `AppHeader`.

---

### [BottomNav.tsx](src/components/templates/BottomNav.tsx)

Barra de navegación inferior. Lee los ítems de `navigation.ts` y usa `findIndex` para determinar el ícono activo.

| Prop | Tipo |
|------|------|
| `onNavigate` | `(screen: string) => void` |
| `currentScreen` | `string` |

---

### [FeaturedBanner.tsx](src/components/templates/FeaturedBanner.tsx)

Carrusel automático cada 2 segundos. Lee de `FeaturedData.ts`.

**Usado en:** `HomeScreen`.

---

### [ProductCard.tsx](src/components/templates/ProductCard.tsx)

Tarjeta de producto con imagen, nombre, precio y botón comprar.

| Prop | Tipo |
|------|------|
| `product` | `Product` |
| `onBuy` | `(product: Product) => void` |

**Usado en:** `ProductGrid`.

---

### [ProductGrid.tsx](src/components/templates/ProductGrid.tsx)

Grilla de 2 columnas. Lee de `ProductStore.getProducts()`.

| Prop | Tipo |
|------|------|
| `onBuy` | `(product: Product) => void` |

**Usado en:** `HomeScreen`, `MarketPlaceScreen`.

---

### [ProductGallery.tsx](src/components/templates/ProductGallery.tsx)

Miniaturas seleccionables del producto. Renderiza solo las imágenes que existan en el array.

| Prop | Tipo |
|------|------|
| `gallery` | `string[]` |
| `selectedImage` | `number` |
| `onSelect` | `(index: number) => void` |

**Usado en:** `ProductScreen`.

---

### [ProductImagePicker.tsx](src/components/templates/ProductImagePicker.tsx)

Selector de hasta 3 imágenes para un producto nuevo. Imagen principal arriba + 3 slots abajo. Usa `useImagePicker`.

| Prop | Tipo |
|------|------|
| `gallery` | `string[]` |
| `onGalleryChange` | `(gallery: string[]) => void` |
| `onBack` | `() => void` |

**Usado en:** `AddProductScreen`.

---

### [ProductForm.tsx](src/components/templates/ProductForm.tsx)

Formulario de nuevo producto: nombre, precio, estado y descripción.

| Prop | Tipo |
|------|------|
| `name` | `string` |
| `price` | `string` |
| `state` | `string` |
| `description` | `string` |
| `error` | `string` |
| `onNameChange` | `(v: string) => void` |
| `onPriceChange` | `(v: string) => void` |
| `onStateChange` | `(v: string) => void` |
| `onDescriptionChange` | `(v: string) => void` |
| `onSave` | `() => void` |

**Usado en:** `AddProductScreen`.

---

### [ProductInfo.tsx](src/components/templates/ProductInfo.tsx)

Badge de estado, nombre y precio del producto.

| Prop | Tipo |
|------|------|
| `name` | `string` |
| `price` | `number` |
| `state` | `string` |

**Usado en:** `ProductScreen`.

---

### [ProductTabs.tsx](src/components/templates/ProductTabs.tsx)

Tres pestañas: Información, Vendedor, Compartir. Lee los nombres de `navigation.productTabs`.

| Prop | Tipo |
|------|------|
| `product` | `Product` |
| `selectedTab` | `number` |
| `onSelectTab` | `(i: number) => void` |

**Usado en:** `ProductScreen`.

---

### [SellerTab.tsx](src/components/templates/SellerTab.tsx)

Avatar, nombre y calificación del vendedor.

| Prop | Tipo |
|------|------|
| `seller` | `Seller` |

**Usado en:** `ProductTabs` (tab 1).

---

### [ShareTab.tsx](src/components/templates/ShareTab.tsx)

URL del producto con botón copiar. La URL base viene de `TermsData.appBaseUrl`.

| Prop | Tipo |
|------|------|
| `productId` | `number` |

**Usado en:** `ProductTabs` (tab 2).

---

### [InfoContent.tsx](src/components/templates/InfoContent.tsx)

Tarjeta de onboarding con imagen, título, descripción, dots y botón siguiente.

| Prop | Tipo | Descripción |
|------|------|-------------|
| `item` | `InfoItem` | Slide actual |
| `currentIndex` | `number` | Posición |
| `total` | `number` | Total de slides |
| `onNext` | `() => void` | Avanza o termina |
| `onSkip` | `() => void` | Salta al WelcomeScreen |

**Usado en:** `InfoScreen`.

---

### [ProfileHeader.tsx](src/components/templates/ProfileHeader.tsx)

Cabecera verde con avatar, nombre y correo del usuario.

| Prop | Tipo |
|------|------|
| `name` | `string` |
| `email` | `string` |
| `avatar` | `string` |

**Usado en:** `SettingsScreen`, `AccountScreen`.

---

### [SettingRow.tsx](src/components/templates/SettingRow.tsx)

Exporta tres componentes reutilizables para `SettingsScreen`.

`SettingRow` — fila con ícono, label y elemento derecho (flecha, toggle o texto).

| Prop | Tipo | Descripción |
|------|------|-------------|
| `icon` | `React.ElementType` | Ícono de lucide |
| `label` | `string` | Texto de la fila |
| `onClick?` | `() => void` | Acción al presionar |
| `border?` | `boolean` | Muestra borde inferior |
| `danger?` | `boolean` | Texto e ícono en rojo |
| `right?` | `React.ReactNode` | Elemento derecho personalizado |

`SectionTitle` — subtítulo de sección en mayúsculas.

`Toggle` — switch animado.

**Usado en:** `SettingsScreen`.

---

### [MyProductCard.tsx](src/components/templates/MyProductCard.tsx)

Tarjeta de producto propio con imagen, nombre, precio, estado y botón ELIMINAR.

| Prop | Tipo |
|------|------|
| `product` | `Product` |
| `onRemove` | `(id: number) => void` |

**Usado en:** `MyProductsScreen`.

---

### Acordeones de Settings (Radix UI)

Los tres usan `Accordion.Root`, `Accordion.Item`, `Accordion.Trigger` y `Accordion.Content` de `radix-ui`. La animación de apertura/cierre está definida en `_colors.css` con `slideDown` y `slideUp`.

**[FaqAccordion.tsx](src/components/templates/FaqAccordion.tsx)** — accordion anidado con 5 preguntas. Lee de `FaqData.faqItems`.

**[AboutAccordion.tsx](src/components/templates/AboutAccordion.tsx)** — misión, visión y equipo. Lee de `AboutData`.

**[TermsAccordion.tsx](src/components/templates/TermsAccordion.tsx)** — términos, privacidad y versión. Lee de `TermsData`.

**Usado en:** `SettingsScreen` (sección Información).

---

## Pantallas (`screens/`)

---

### [InfoScreen.tsx](src/components/screens/InfoScreen.tsx)

Onboarding de 3 slides. Skip lleva directo a `WelcomeScreen`.

| Prop | Descripción |
|------|-------------|
| `onFinish` | Navega a `WelcomeScreen` |

---

### [WelcomeScreen.tsx](src/components/screens/WelcomeScreen.tsx)

Logo + mascota con botones de ingreso y salida.

| Prop | Descripción |
|------|-------------|
| `onLogin` | Navega a `LoginScreen` |

---

### [LoginScreen.tsx](src/components/screens/LoginScreen.tsx)

Formulario de inicio de sesión. Muestra error si las credenciales son incorrectas.

| Prop | Descripción |
|------|-------------|
| `onLogin` | Recibe el usuario y navega a `HomeScreen` |
| `onSignUp` | Navega a `SignUpScreen` |
| `onBack` | Regresa a `WelcomeScreen` |

---

### [SignUpScreen.tsx](src/components/screens/SignUpScreen.tsx)

Formulario de registro. Al registrar navega a `LoginScreen` (no al home).

| Prop | Descripción |
|------|-------------|
| `onRegister` | Navega a `LoginScreen` |
| `onBack` | Regresa a `LoginScreen` |

---

### [HomeScreen.tsx](src/components/screens/HomeScreen.tsx)

Vista principal con header, banner y grilla de productos.

| Prop | Descripción |
|------|-------------|
| `onNavigate` | Para `BottomNav` |
| `currentUser` | Para `AppHeader` |

---

### [MarketPlaceScreen.tsx](src/components/screens/MarketPlaceScreen.tsx)

Igual que `HomeScreen` sin `FeaturedBanner`.

| Prop | Descripción |
|------|-------------|
| `onNavigate` | Para `BottomNav` |
| `currentUser` | Para `AppHeader` |

---

### [ProductScreen.tsx](src/components/screens/ProductScreen.tsx)

Detalle de producto con galería, info y tabs.

| Prop | Descripción |
|------|-------------|
| `product` | Objeto `Product` |
| `onBack` | Regresa a la pantalla anterior |

**Estado interno:** `selectedImage` y `selectedTab`.

---

### [SettingsScreen.tsx](src/components/screens/SettingsScreen.tsx)

Ajustes organizados en 4 secciones: Mi Perfil, Preferencias, Información y Sesión. Usa `SettingRow`, `SectionTitle` y `Toggle`.

| Prop | Descripción |
|------|-------------|
| `onNavigate` | Para navegar a subcategorías y `BottomNav` |
| `currentUser` | Para `ProfileHeader` y estados iniciales |
| `onLogout` | Limpia sesión y vuelve a `WelcomeScreen` |

---

### [AccountScreen.tsx](src/components/screens/AccountScreen.tsx)

Edición de datos personales y contraseña. Lógica manejada por `useAccountForm`.

| Prop | Descripción |
|------|-------------|
| `currentUser` | Usuario actual |
| `onBack` | Regresa a `SettingsScreen` |
| `onUpdate` | Recibe el usuario actualizado y lo sube a `App` |

---

### [MyProductsScreen.tsx](src/components/screens/MyProductsScreen.tsx)

Grilla de productos del usuario con opción de eliminar. Usa `MyProductCard`.

| Prop | Descripción |
|------|-------------|
| `userId` | Para filtrar con `getProductsByUser` |
| `onBack` | Regresa a `SettingsScreen` |

---

### [AddProductScreen.tsx](src/components/screens/AddProductScreen.tsx)

Formulario de nuevo producto. Lógica manejada por `useAddProductForm`.

| Prop | Descripción |
|------|-------------|
| `onBack` | Regresa a `MarketPlaceScreen` |
| `currentUser` | Para construir el `Seller` del producto |