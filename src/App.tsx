import "./assets/styles/App.css";
import { useState } from "react";
import InfoScreen from "./components/screens/InfoScreen";
import WelcomeScreen from "./components/screens/WelcomeScreen";
import LoginScreen from "./components/screens/LoginScreen";
import SignUpScreen from "./components/screens/SignUpScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import HomeScreen from "./components/screens/HomeScreen";
import MarketPlaceScreen from "./components/screens/MarketPlaceScreen";
import SettingsScreen from "./components/screens/SettingsScreen";
import AddProductScreen from "./components/screens/AddProductScreen";
import AccountScreen from "./components/screens/AccountScreen";
import MyProductsScreen from "./components/screens/MyProductsScreen";
import FavoriteScreen from "./components/screens/FavoriteScreen";
import ProductScreen from "./components/screens/ProductScreen";
import type { UserProfile } from "./components/data/UserProfile";
import type { Product } from "./components/data/Product";
import type { Seller } from "./components/data/Seller";
import { getSellerById } from "./components/data/Seller";
import ProfileScreen from "./components/screens/ProfileScreen";
import MainLayout from "./components/layout/MainLayout";

const preLoginScreens = ["info", "welcome", "login", "signup", "forgotpassword"];
const fullbleedScreens = ["profile", "account", "myproducts", "sellerprofile"];

/**
 * Componente raíz de la aplicación.
 *
 * Gestiona la navegación por nombre de pantalla (`screen`), el usuario autenticado
 * y el estado compartido entre pantallas (producto editado, perfil visto, búsqueda).
 * Divide el árbol en tres regiones:
 * - **Pre-login**: pantallas públicas sin layout (Info, Welcome, Login, SignUp, ForgotPassword).
 * - **Fullbleed**: pantallas autenticadas sin {@link MainLayout} (Profile, Account, MyProducts).
 * - **Con layout**: pantallas autenticadas dentro de {@link MainLayout} con header y nav.
 */
function App() {
  const [screen, setScreen]             = useState("info");
  const [currentUser, setCurrentUser]   = useState<UserProfile | null>(null);
  const [marketplaceSearch, setMarketplaceSearch] = useState("");
  const [editProduct, setEditProduct]   = useState<Product | null>(null);
  const [editReturnScreen, setEditReturnScreen] = useState("marketplace");
  const [viewedSeller, setViewedSeller] = useState<UserProfile | null>(null);
  const [sellerReturnScreen, setSellerReturnScreen] = useState("home");
  const [sellerStack, setSellerStack] = useState<{ seller: UserProfile; returnScreen: string }[]>([]);
  const [viewedProduct, setViewedProduct] = useState<Product | null>(null);
  const [productReturnScreen, setProductReturnScreen] = useState("home");

  /**
   * Navega a la pantalla indicada y limpia el producto en edición.
   * @param target - Nombre de la pantalla destino.
   */
  function navigate(target: string) {
    setEditProduct(null);
    setScreen(target);
  }

  /**
   * Abre el perfil de un vendedor. Si ya hay un perfil abierto, apila el anterior
   * para permitir navegar hacia atrás en la cadena de perfiles.
   * @param seller - Vendedor cuyo perfil se va a mostrar.
   */
  function openSellerProfile(seller: Seller) {
    if (screen === "sellerprofile" && viewedSeller) {
      setSellerStack(prev => [...prev, { seller: viewedSeller, returnScreen: sellerReturnScreen }]);
      setViewedSeller(seller as UserProfile);
    } else {
      setSellerStack([]);
      setViewedSeller(seller as UserProfile);
      setSellerReturnScreen(screen);
      setScreen("sellerprofile");
    }
  }

  /**
   * Retrocede desde el perfil de vendedor. Si hay perfiles apilados vuelve al anterior;
   * de lo contrario navega a la pantalla de origen.
   */
  function backFromSellerProfile() {
    if (sellerStack.length > 0) {
      const prev = sellerStack[sellerStack.length - 1];
      setSellerStack(s => s.slice(0, -1));
      setViewedSeller(prev.seller);
      setSellerReturnScreen(prev.returnScreen);
    } else {
      navigate(sellerReturnScreen);
    }
  }

  /**
   * Abre el detalle de un producto recordando la pantalla de origen para el retroceso.
   * @param product - Producto cuyo detalle se va a mostrar.
   */
  function openProductDetail(product: Product) {
    setViewedProduct(product);
    setProductReturnScreen(screen);
    setScreen("productdetail");
  }

  /**
   * Inicia la edición de un producto guardando la pantalla de retorno.
   * @param product - Producto a editar.
   * @param returnScreen - Pantalla a la que volver tras guardar.
   */
  function startEdit(product: Product, returnScreen: string) {
    setEditProduct(product);
    setEditReturnScreen(returnScreen);
    setScreen("addproduct");
  }

  /**
   * Guarda el usuario autenticado y navega a la pantalla de inicio.
   * @param user - Perfil del usuario que inició sesión.
   */
  function handleLogin(user: UserProfile) {
    setCurrentUser(user);
    navigate("home");
  }

  /** Limpia el usuario autenticado y vuelve a la pantalla de bienvenida. */
  function handleLogout() {
    setCurrentUser(null);
    navigate("welcome");
  }

  // ── PRE-LOGIN ──
  if (preLoginScreens.includes(screen)) {
    return (
      <div className="min-h-screen bg-beige">
        {screen === "info"           && <InfoScreen onFinish={() => navigate("welcome")} />}
        {screen === "welcome"        && <WelcomeScreen onLogin={() => navigate("login")} />}
        {screen === "login"          && <LoginScreen onBack={() => navigate("welcome")} onLogin={handleLogin} onSignUp={() => navigate("signup")} onForgotPassword={() => navigate("forgotpassword")} />}
        {screen === "signup"         && <SignUpScreen onBack={() => navigate("login")} onRegister={() => navigate("login")} />}
        {screen === "forgotpassword" && <ForgotPasswordScreen onBack={() => navigate("login")} onSuccess={() => navigate("login")} />}
      </div>
    );
  }

  // ── FULLBLEED ──
  if (currentUser && fullbleedScreens.includes(screen)) {
    return (
      <>
        {screen === "profile" && (
          <ProfileScreen
            currentUser={currentUser}
            onBack={() => navigate("settings")}
            onEdit={(p) => startEdit(p, "profile")}
            onViewReviewer={(id) => { const s = getSellerById(id); if (s) openSellerProfile(s); }}
          />
        )}
        {screen === "sellerprofile" && viewedSeller && (
          <ProfileScreen
            key={viewedSeller.id}
            currentUser={viewedSeller}
            onBack={backFromSellerProfile}
            onEdit={() => {}}
            isOwnProfile={false}
            reviewer={currentUser!}
            onBuyProduct={openProductDetail}
            onViewReviewer={(id) => { const s = getSellerById(id); if (s) openSellerProfile(s); }}
          />
        )}
        {screen === "account" && (
          <AccountScreen
            currentUser={currentUser}
            onBack={() => navigate("settings")}
            onUpdate={setCurrentUser}
          />
        )}
        {screen === "myproducts" && (
          <MyProductsScreen
            userId={currentUser.id}
            onBack={() => navigate("settings")}
            onEdit={(p) => startEdit(p, "myproducts")}
          />
        )}
      </>
    );
  }

  // ── LOGGED-IN CON HEADER ──
  const handleSearch = (term: string) => {
    setMarketplaceSearch(term);
    if (screen !== "marketplace") navigate("marketplace");
  };

  return (
    <MainLayout screen={screen} currentUser={currentUser!} onNavigate={navigate} onSearch={handleSearch}>
      {screen === "home" && currentUser && (
        <HomeScreen onNavigate={navigate} onViewProduct={openProductDetail} currentUser={currentUser} />
      )}
      {screen === "marketplace" && currentUser && (
        <MarketPlaceScreen
          currentUser={currentUser}
          searchTerm={marketplaceSearch}
          onSearch={(term) => setMarketplaceSearch(term)}
          onViewProduct={openProductDetail}
        />
      )}
      {screen === "settings" && currentUser && (
        <SettingsScreen onNavigate={navigate} currentUser={currentUser} onLogout={handleLogout} />
      )}
      {screen === "addproduct" && currentUser && (
        <AddProductScreen
          onBack={() => { setEditProduct(null); setScreen(editReturnScreen); }}
          currentUser={currentUser}
          initialProduct={editProduct ?? undefined}
        />
      )}
      {screen === "favorite" && currentUser && (
        <FavoriteScreen onViewProduct={openProductDetail} />
      )}
      {screen === "productdetail" && viewedProduct && currentUser && (
        <ProductScreen
          product={viewedProduct}
          onBack={() => navigate(productReturnScreen)}
          onViewSellerProfile={openSellerProfile}
        />
      )}
    </MainLayout>
  );
}

export default App;
