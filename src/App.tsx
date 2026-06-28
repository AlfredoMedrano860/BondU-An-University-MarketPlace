import "./assets/styles/App.css";
import { useState, useEffect } from "react";
import { NotificationStack } from "./components/ui/NotificationStack";
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
import type { FilterValues } from "./components/data/Filters";
import { getSellerById } from "./components/data/Seller";
import ProfileScreen from "./components/screens/ProfileScreen";
import MainLayout from "./components/layout/MainLayout";
import { useAuthContext } from "./contexts/AuthContext";
import type { AuthUser } from "./types/auth";
import avatarDefault from "./assets/imgs/IconoPerfil.png";

const preLoginScreens = ["info", "welcome", "login", "signup", "forgotpassword"];
const fullbleedScreens = ["profile", "account", "myproducts", "sellerprofile"];

/** Convierte el AuthUser del backend al UserProfile que esperan las pantallas existentes. */
function authUserToProfile(u: AuthUser): UserProfile {
  return {
    id: u.id as unknown as number,
    username: u.username,
    email: u.email,
    password: "",
    avatar: u.avatar ?? avatarDefault,
    createdAt: new Date(u.created_at),
    location: u.location ?? "",
    phone: u.phone ?? undefined,
    university: u.university ?? undefined,
    career: u.career ?? undefined,
  };
}

function App() {
  const { user: authUser, isAuthenticated, isLoading, logout } = useAuthContext();
  const currentUser: UserProfile | null = authUser ? authUserToProfile(authUser) : null;

  const [screen, setScreen] = useState("info");
  const [marketplaceSearch, setMarketplaceSearch] = useState("");
  const [appliedState, setAppliedState]   = useState("");
  const [appliedPrice, setAppliedPrice]   = useState(500);
  const [editProduct, setEditProduct]     = useState<Product | null>(null);
  const [editReturnScreen, setEditReturnScreen] = useState("marketplace");
  const [viewedSeller, setViewedSeller]   = useState<UserProfile | null>(null);
  const [sellerReturnScreen, setSellerReturnScreen] = useState("home");
  const [sellerStack, setSellerStack]     = useState<{ seller: UserProfile; returnScreen: string }[]>([]);
  const [viewedProduct, setViewedProduct] = useState<Product | null>(null);
  const [productReturnScreen, setProductReturnScreen] = useState("home");

  // Redirigir a home cuando el usuario se autentica, y a welcome cuando se desautentica
  useEffect(() => {
    if (isLoading) return;
    if (isAuthenticated && preLoginScreens.includes(screen)) {
      setScreen("home");
    }
    if (!isAuthenticated && !preLoginScreens.includes(screen)) {
      setScreen("welcome");
    }
  }, [isAuthenticated, isLoading]);

  function navigate(target: string) {
    setEditProduct(null);
    setScreen(target);
  }

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

  function openProductDetail(product: Product) {
    setViewedProduct(product);
    setProductReturnScreen(screen);
    setScreen("productdetail");
  }

  function startEdit(product: Product, returnScreen: string) {
    setEditProduct(product);
    setEditReturnScreen(returnScreen);
    setScreen("addproduct");
  }

  function handleLogout() {
    logout();
    navigate("welcome");
  }

  // ── PRE-LOGIN ──
  function renderScreen() {
    if (preLoginScreens.includes(screen)) {
      return (
        <div className="min-h-screen bg-beige">
          {screen === "info"           && <InfoScreen onFinish={() => navigate("welcome")} />}
          {screen === "welcome"        && <WelcomeScreen onLogin={() => navigate("login")} />}
          {screen === "login"          && <LoginScreen onBack={() => navigate("welcome")} onLogin={() => navigate("home")} onSignUp={() => navigate("signup")} onForgotPassword={() => navigate("forgotpassword")} />}
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
              onEditProfile={() => navigate("account")}
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
              onBack={() => navigate("profile")}
              onUpdate={() => {}}
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

    const handleFilterApply = ({ state, price }: FilterValues) => {
      setAppliedState(state);
      setAppliedPrice(price);
      navigate("marketplace");
    };

    return (
      <MainLayout screen={screen} currentUser={currentUser!} onNavigate={navigate} onSearch={handleSearch} appliedState={appliedState} appliedPrice={appliedPrice} onFilterApply={handleFilterApply}>
        {screen === "home" && currentUser && (
          <HomeScreen onNavigate={navigate} onViewProduct={openProductDetail} currentUser={currentUser} />
        )}
        {screen === "marketplace" && currentUser && (
          <MarketPlaceScreen
            currentUser={currentUser}
            searchTerm={marketplaceSearch}
            onSearch={(term) => setMarketplaceSearch(term)}
            stateFilter={appliedState}
            onClearState={() => setAppliedState("")}
            priceFilter={appliedPrice}
            onClearPrice={() => setAppliedPrice(500)}
            onViewProduct={openProductDetail}
          />
        )}
        {screen === "settings" && currentUser && (
          <SettingsScreen onNavigate={navigate} currentUser={currentUser} onLogout={handleLogout} />
        )}
        {screen === "addproduct" && currentUser && (
          <AddProductScreen
            onBack={() => { setEditProduct(null); setScreen(editProduct ? editReturnScreen : "myproducts"); }}
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

  if (isLoading) return null;

  return (
    <>
      <NotificationStack />
      {renderScreen()}
    </>
  );
}

export default App;
