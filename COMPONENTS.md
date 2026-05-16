# Documentación de Componentes

Proyecto mobile-first simulado en mockup de iPhone. No usa librería de rutas — toda la navegación se maneja con estado en `App.tsx`.

---

## Índice

1. [Estructura general](#estructura-general)
2. [Flujo de navegación](#flujo-de-navegación)
3. [Datos (data/)](#datos-data)
4. [Layout](#layout)
5. [Componentes UI atómicos (ui/)](#componentes-ui-atómicos-ui)
6. [Componentes compuestos (templates/)](#componentes-compuestos-templates)
7. [Pantallas (screens/)](#pantallas-screens)

---

## Estructura general

```
src/
├── App.tsx                  ← Raíz: maneja qué pantalla mostrar
├── main.tsx                 ← Entry point de React
└── components/
    ├── data/                ← Interfaces TypeScript y datos mock
    ├── layout/              ← Wrapper global de la app
    ├── ui/                  ← Botones, inputs y elementos atómicos
    ├── templates/           ← Componentes compuestos reutilizables
    └── screens/             ← Vistas completas (una por pantalla)
```

**Stack:** React 19, TypeScript, Tailwind CSS 4, Lucide React, Phosphor Icons, Vite.

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
        │   ├── SettingsGroup (Cuenta)
        │   ├── SettingsGroup (Preferencias)
        │   └── BottomNav
        │
        └── AddProductScreen
            ├── InputSpace (× 4 campos)
            └── BottomNav
```

---

## Flujo de navegación

`App.tsx` mantiene un estado `screen` que determina qué pantalla renderizar dentro del mockup de iPhone. No hay URLs ni rutas — solo un switch de estado.

```
InfoScreen (onboarding)
    ↓ (al terminar los 3 slides)
WelcomeScreen
    ↓ INICIAR SESIÓN          ↓ (botón Regístrate dentro de Login)
LoginScreen               SignUpScreen
    ↓ INICIAR SESIÓN              ↓ REGISTRAR
         ↘                      ↙
            HomeScreen  ←→  MarketPlaceScreen  ←→  SettingsScreen
                ↓ (tap en producto)
            ProductScreen
                ↓ (botón Agregar en BottomNav)
            AddProductScreen
```

El paso de pantalla se hace enviando callbacks como props (`onNavigate`, `onFinish`, `onBack`, etc.) desde `App.tsx` hacia cada pantalla.

---

## Datos (`data/`)

Archivos de solo TypeScript: definen interfaces y exportan arrays con datos hardcodeados que simulan una API.

---

### [Product.ts](src/components/data/Product.ts)

Define el modelo central de la app.

```ts
interface Product {
  id: number
  name: string
  price: number
  image: string        // imagen principal
  gallery: string[]   // imágenes adicionales para la galería
  description: string
  seller: Seller
}
```

Exporta `products[]` con 4 productos de ejemplo (auriculares).

---

### [Seller.ts](src/components/data/Seller.ts)

Modelo del vendedor asociado a cada producto.

```ts
interface Seller {
  id: number
  name: string
  avatar: string
  rating: number
  reviews: number
}
```

Exporta `sellers[]` con 1 vendedor de ejemplo (Alfredo Medrano).

---

### [FeaturedData.ts](src/components/data/FeaturedData.ts)

Datos del banner rotativo de la pantalla de inicio.

```ts
interface FeaturedItem {
  id: number
  image: string
  alt: string
}
```

Exporta `featuredItems[]` con 3 imágenes para el carrusel.

---

### [InfoItem.ts](src/components/data/InfoItem.ts)

Datos de las tarjetas del onboarding.

```ts
interface InfoItem {
  image: string
  title: string
  description: string
  buttonText: string
}
```

Exporta `infoItems[]` con 3 slides: *Intercambia*, *Conecta*, *Ahorra*.

---

### [SettingsItem.ts](src/components/data/SettingsItem.ts)

Define cada fila de la pantalla de ajustes.

```ts
interface SettingsItem {
  icon: React.ReactNode
  label: string
  group: SettingsGroup   // enum: Account | Preferences
  toggle?: boolean
  onPress?: () => void
}

enum SettingsGroup { Account, Preferences }
```

Exporta `settingsItems[]` con 5 ítems preconfigurados.

---

## Layout

### [AppLayout.tsx](src/components/layout/AppLayout.tsx)

Wrapper mínimo que aplica fondo beige y ancho máximo a todas las pantallas. Recibe `children` y los envuelve en un `div` con estilos base.

**Usado en:** `App.tsx` — envuelve cualquier pantalla que se renderice.

---

## Componentes UI atómicos (`ui/`)

Piezas reutilizables sin lógica de negocio propia.

---

### [PrimaryButton.tsx](src/components/ui/PrimaryButton.tsx)

Botón CTA principal de ancho completo con color primario de la app.

| Prop | Tipo | Descripción |
|------|------|-------------|
| `text` | `string` | Texto del botón |
| `onClick?` | `() => void` | Acción al presionar |

**Usado en:** `LoginScreen`, `SignUpScreen`, `WelcomeScreen`, `InfoScreen`.

---

### [SecondaryButton.tsx](src/components/ui/SecondaryButton.tsx)

Botón de borde con color primario, sin fondo. Variante secundaria del `PrimaryButton`.

| Prop | Tipo | Descripción |
|------|------|-------------|
| `text` | `string` | Texto del botón |
| `onClick?` | `() => void` | Acción al presionar |

**Usado en:** `WelcomeScreen` (botón SALIR).

---

### [AuxiliaryButton.tsx](src/components/ui/AuxiliaryButton.tsx)

Botón compacto dorado/amarillo para acciones secundarias dentro de tarjetas.

| Prop | Tipo | Default |
|------|------|---------|
| `text?` | `string` | `"COMPRAR"` |
| `onClick?` | `() => void` | — |

**Usado en:** `ProductCard`.

---

### [BackButton.tsx](src/components/ui/BackButton.tsx)

Ícono de flecha `<` para navegación hacia atrás. Solo recibe `onClick`.

| Prop | Tipo |
|------|------|
| `onClick` | `() => void` |

**Usado en:** `LoginScreen`, `SignUpScreen`, `ProductScreen`.

---

### [DotsIndicator.tsx](src/components/ui/DotsIndicator.tsx)

Indicador de posición tipo carrusel: puntitos que se iluminan según el slide activo.

| Prop | Tipo | Descripción |
|------|------|-------------|
| `currentIndex` | `number` | Slide activo |
| `total` | `number` | Total de slides |

**Usado en:** `InfoScreen`, `FeaturedBanner`.

---

### [InputSpace.tsx](src/components/ui/InputSpace.tsx)

Campo de texto controlado con soporte para contraseña (toggle ojo visible/oculto) y modo multilinea.

| Prop | Tipo | Descripción |
|------|------|-------------|
| `type?` | `string` | `"text"` o `"password"` |
| `placeholder?` | `string` | — |
| `value` | `string` | Valor controlado |
| `onChange` | `(v: string) => void` | Callback de cambio |
| `multiline?` | `boolean` | Renderiza `<textarea>` |

**Usado en:** `LoginScreen`, `SignUpScreen`, `AddProductScreen`.

---

### [StarRating.tsx](src/components/ui/StarRating.tsx)

Muestra estrellas llenas/vacías según `rating` y el número de reseñas.

| Prop | Tipo |
|------|------|
| `rating` | `number` |
| `reviews` | `number` |

**Usado en:** `SellerTab`.

---

## Componentes compuestos (`templates/`)

Combinan varios UI atómicos y reciben datos de negocio.

---

### [AppHeader.tsx](src/components/templates/AppHeader.tsx)

Cabecera superior con ícono de perfil de usuario y la barra de búsqueda incrustada.

No recibe props — el usuario está hardcodeado por ahora.

**Usado en:** `HomeScreen`, `MarketPlaceScreen`.

---

### [SearchBar.tsx](src/components/templates/SearchBar.tsx)

Input de búsqueda con ícono de lupa y botón de filtros a la derecha. Sin lógica de búsqueda aún (placeholder visual).

No recibe props.

**Usado en:** `AppHeader`.

---

### [BottomNav.tsx](src/components/templates/BottomNav.tsx)

Barra de navegación inferior con 5 ítems: Inicio, Marketplace, Agregar, Favoritos, Ajustes. El ícono activo se anima.

| Prop | Tipo | Descripción |
|------|------|-------------|
| `onNavigate` | `(screen: string) => void` | Cambia la pantalla activa en `App` |
| `currentScreen` | `string` | Pantalla actual para resaltar el ícono correcto |

**Usado en:** `HomeScreen`, `MarketPlaceScreen`, `SettingsScreen`.

---

### [FeaturedBanner.tsx](src/components/templates/FeaturedBanner.tsx)

Carrusel de imágenes destacadas con rotación automática cada 2 segundos. Usa `DotsIndicator` para mostrar la posición actual.

No recibe props — consume `featuredItems[]` de `FeaturedData.ts` directamente.

**Usado en:** `HomeScreen`.

---

### [ProductCard.tsx](src/components/templates/ProductCard.tsx)

Tarjeta individual de producto con imagen, nombre, precio y botón de compra.

| Prop | Tipo |
|------|------|
| `product` | `Product` |
| `onBuy` | `(product: Product) => void` |

**Usado en:** `ProductGrid`.

---

### [ProductGrid.tsx](src/components/templates/ProductGrid.tsx)

Grilla de 2 columnas que mapea `products[]` y renderiza un `ProductCard` por cada uno.

| Prop | Tipo | Descripción |
|------|------|-------------|
| `onBuy` | `(product: Product) => void` | Se pasa al `ProductCard` para abrir `ProductScreen` |

**Usado en:** `HomeScreen`, `MarketPlaceScreen`.

---

### [ProductGallery.tsx](src/components/templates/ProductGallery.tsx)

Imagen principal grande + miniaturas seleccionables debajo. Resalta la miniatura activa.

| Prop | Tipo | Descripción |
|------|------|-------------|
| `gallery` | `string[]` | URLs de imágenes |
| `selectedImage` | `string` | Imagen actualmente grande |
| `onSelect` | `(img: string) => void` | Cambia la imagen principal |

**Usado en:** `ProductScreen`.

---

### [ProductInfo.tsx](src/components/templates/ProductInfo.tsx)

Muestra nombre del producto, badge `NUEVO` y precio formateado.

| Prop | Tipo |
|------|------|
| `name` | `string` |
| `price` | `number` |

**Usado en:** `ProductScreen`.

---

### [ProductTabs.tsx](src/components/templates/ProductTabs.tsx)

Tres pestañas: **Información** (descripción), **Vendedor** (`SellerTab`), **Compartir** (`ShareTab`). Maneja qué tab está activo.

| Prop | Tipo |
|------|------|
| `product` | `Product` |
| `selectedTab` | `number` |
| `onSelectTab` | `(i: number) => void` |

**Usado en:** `ProductScreen`.

---

### [SellerTab.tsx](src/components/templates/SellerTab.tsx)

Muestra avatar, nombre del vendedor y su calificación con `StarRating`.

| Prop | Tipo |
|------|------|
| `seller` | `Seller` |

**Usado en:** `ProductTabs` (tab 1).

---

### [ShareTab.tsx](src/components/templates/ShareTab.tsx)

Genera una URL ficticia del producto y ofrece un botón para copiarla al portapapeles.

| Prop | Tipo |
|------|------|
| `productId` | `number` |

**Usado en:** `ProductTabs` (tab 2).

---

### [InfoContent.tsx](src/components/templates/InfoContent.tsx)

Tarjeta de onboarding: imagen, título, descripción y botón de avanzar. Incluye `DotsIndicator`.

| Prop | Tipo | Descripción |
|------|------|-------------|
| `item` | `InfoItem` | Datos del slide actual |
| `currentIndex` | `number` | Posición en el carrusel |
| `total` | `number` | Total de slides |
| `onNext` | `() => void` | Avanza al siguiente slide o termina |

**Usado en:** `InfoScreen`.

---

### [ProfileHeader.tsx](src/components/templates/ProfileHeader.tsx)

Cabecera de perfil con avatar circular, nombre y correo del usuario.

| Prop | Tipo |
|------|------|
| `name` | `string` |
| `email` | `string` |

**Usado en:** `SettingsScreen`.

---

### [SettingsGroup.tsx](src/components/templates/SettingsGroup.tsx)

Lista de filas de ajustes de un mismo grupo. Cada ítem puede tener toggle (switch) o flecha de navegación. El toggle de modo oscuro está conectado con el estado de `SettingsScreen`.

| Prop | Tipo | Descripción |
|------|------|-------------|
| `items` | `SettingsItem[]` | Ítems filtrados por grupo |
| `darkMode?` | `boolean` | Estado del toggle oscuro |
| `onToggle?` | `() => void` | Alterna el modo oscuro |

**Usado en:** `SettingsScreen`.

---

## Pantallas (`screens/`)

Vistas completas. Cada una recibe callbacks de `App.tsx` para cambiar de pantalla.

---

### [InfoScreen.tsx](src/components/screens/InfoScreen.tsx)

**Onboarding.** Muestra los 3 slides de `infoItems` uno a uno usando `InfoContent`. Al terminar el último llama a `onFinish`.

| Prop | Descripción |
|------|-------------|
| `onFinish` | Navega a `WelcomeScreen` |

**Flujo interno:** estado `currentIndex` local, avanza con el botón de `InfoContent`.

---

### [WelcomeScreen.tsx](src/components/screens/WelcomeScreen.tsx)

**Bienvenida.** Logo + mascota de la app con dos botones.

| Prop | Descripción |
|------|-------------|
| `onLogin` | Navega a `LoginScreen` |

El botón SALIR no tiene acción (pendiente).

---

### [LoginScreen.tsx](src/components/screens/LoginScreen.tsx)

**Inicio de sesión.** Formulario con email y contraseña controlados, enlace a registro.

| Prop | Descripción |
|------|-------------|
| `onLogin` | Navega a `HomeScreen` |
| `onSignUp` | Navega a `SignUpScreen` |
| `onBack` | Regresa a `WelcomeScreen` |

---

### [SignUpScreen.tsx](src/components/screens/SignUpScreen.tsx)

**Registro.** Formulario con usuario, email y contraseña.

| Prop | Descripción |
|------|-------------|
| `onSignUp` | Navega a `HomeScreen` |
| `onBack` | Regresa a `LoginScreen` |

---

### [HomeScreen.tsx](src/components/screens/HomeScreen.tsx)

**Inicio.** Vista principal con `AppHeader`, `FeaturedBanner` y `ProductGrid`.

| Prop | Descripción |
|------|-------------|
| `onNavigate` | Pasado a `BottomNav` para cambiar de sección |
| `onProductSelect` | Abre `ProductScreen` con el producto elegido |
| `currentScreen` | Resalta el ícono activo en `BottomNav` |

---

### [MarketPlaceScreen.tsx](src/components/screens/MarketPlaceScreen.tsx)

**Marketplace.** Igual que `HomeScreen` pero sin `FeaturedBanner`. Lista todos los productos directamente.

| Prop | Descripción |
|------|-------------|
| `onNavigate` | Para `BottomNav` |
| `onProductSelect` | Abre `ProductScreen` |
| `currentScreen` | Para `BottomNav` |

---

### [ProductScreen.tsx](src/components/screens/ProductScreen.tsx)

**Detalle de producto.** Muestra galería de imágenes, info del producto y tabs (descripción / vendedor / compartir).

| Prop | Descripción |
|------|-------------|
| `product` | Objeto `Product` a mostrar |
| `onBack` | Regresa a la pantalla anterior |

**Estado interno:** `selectedImage` (imagen activa en galería) y `selectedTab` (tab activo).

---

### [SettingsScreen.tsx](src/components/screens/SettingsScreen.tsx)

**Ajustes.** Muestra `ProfileHeader` y dos `SettingsGroup` (Cuenta y Preferencias). Incluye toggle de modo oscuro con estado local.

| Prop | Descripción |
|------|-------------|
| `onNavigate` | Para `BottomNav` |
| `currentScreen` | Para `BottomNav` |

---

### [AddProductScreen.tsx](src/components/screens/AddProductScreen.tsx)

**Agregar producto.** Formulario con: imagen (upload con preview), nombre, precio, estado del producto y descripción.

| Prop | Descripción |
|------|-------------|
| `onNavigate` | Para `BottomNav` |
| `currentScreen` | Para `BottomNav` |

Al guardar, los datos se imprimen en consola (pendiente integrar con `products[]`).

---


