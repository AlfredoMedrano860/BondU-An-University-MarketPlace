import "./assets/styles/App.css";
import { useState, useEffect } from "react";
import { NotificationStack } from "./components/ui/NotificationStack";
import Loading from "./components/pages/Loading";
import Info from "./components/pages/Info";
import Welcome from "./components/pages/Welcome";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import ForgotPassword from "./components/pages/ForgotPassword";
import Home from "./components/pages/Home";
import MarketPlace from "./components/pages/MarketPlace";
import Settings from "./components/pages/Settings";
import AddProduct from "./components/pages/AddProduct";
import Account from "./components/pages/Account";
import MyProducts from "./components/pages/MyProducts";
import Favorite from "./components/pages/Favorite";
import ProductPage from "./components/pages/Product";
import Profile from "./components/pages/Profile";
import AppShellLayout from "./components/layout/AppShellLayout";
import { useAuthContext } from "./contexts/AuthContext";
import { useCurrentUserProfile } from "./hooks/useCurrentUserProfile";
import { useProfileNavigation } from "./hooks/useProfileNavigation";
import { useProductNavigation } from "./hooks/useProductNavigation";
import { useMarketplaceFilters } from "./hooks/useMarketplaceFilters";

/** Pantallas accesibles sin sesión iniciada. */
const preLogins = ["info", "welcome", "login", "signup", "forgotpassword"];
/** Pantallas que ocupan toda la pantalla, sin el header/nav de {@link AppShellLayout}. */
const fullbleedScreens = ["profile", "account", "myproducts", "sellerprofile"];

function App() {
  const { user: authUser, isAuthenticated, isLoading, logout } = useAuthContext();
  const { currentUser, refreshContactInfo, updateNotificationsPreference } = useCurrentUserProfile(authUser);
  const [screen, setScreen] = useState("loading");

  /** Navega a otra pantalla, descartando cualquier edición de producto en curso. */
  function navigate(target: string) {
    productNav.clearEdit();
    setScreen(target);
  }

  const productNav = useProductNavigation(screen, setScreen);
  const profileNav = useProfileNavigation(screen, productNav.productReturnScreen, setScreen, navigate);
  const marketplaceFilters = useMarketplaceFilters(screen, navigate);

  // Redirigir a home cuando el usuario se autentica, y a welcome cuando se desautentica
  useEffect(() => {
    if (isLoading || screen === "loading") return;
    if (isAuthenticated && preLogins.includes(screen)) {
      setScreen("home");
    }
    if (!isAuthenticated && !preLogins.includes(screen)) {
      setScreen("welcome");
    }
  }, [isAuthenticated, isLoading]);

  function handleLogout() {
    logout();
    navigate("welcome");
  }

  function renderScreen() {
    // ── LOADING ──
    if (screen === "loading") {
      return <Loading onFinish={() => navigate(isAuthenticated ? "home" : "info")} />;
    }

    // ── PRE-LOGIN ──
    if (preLogins.includes(screen)) {
      return (
        <div className="min-h-screen bg-beige">
          {screen === "info" && <Info onFinish={() => navigate("welcome")} />}
          {screen === "welcome" && <Welcome onLogin={() => navigate("login")} onExit={() => navigate("loading")} />}
          {screen === "login" && <Login onBack={() => navigate("welcome")} onLogin={() => navigate("home")} onSignUp={() => navigate("signup")} onForgotPassword={() => navigate("forgotpassword")} />}
          {screen === "signup" && <SignUp onBack={() => navigate("login")} onRegister={() => navigate("login")} />}
          {screen === "forgotpassword" && <ForgotPassword onBack={() => navigate("login")} onSuccess={() => navigate("login")} />}
        </div>
      );
    }

    // ── FULLBLEED ──
    if (currentUser && fullbleedScreens.includes(screen)) {
      return (
        <>
          {screen === "profile" && (
            <Profile
              currentUser={currentUser}
              onBack={() => navigate("settings")}
              onEdit={(p) => productNav.startEdit(p, "profile")}
              onEditProfile={() => navigate("account")}
              onViewReviewer={profileNav.openUserProfile}
            />
          )}
          {screen === "sellerprofile" && profileNav.viewedSeller && (
            <Profile
              key={profileNav.viewedSeller.id}
              currentUser={profileNav.viewedSeller}
              onBack={profileNav.backFromSellerProfile}
              onEdit={() => {}}
              isOwnProfile={false}
              reviewer={currentUser!}
              onBuyProduct={productNav.openProductDetail}
              onViewReviewer={profileNav.openUserProfile}
            />
          )}
          {screen === "account" && (
            <Account
              currentUser={currentUser}
              onBack={() => navigate("profile")}
              onUpdate={refreshContactInfo}
            />
          )}
          {screen === "myproducts" && (
            <MyProducts
              userId={currentUser.id}
              onBack={() => navigate("settings")}
              onEdit={(p) => productNav.startEdit(p, "myproducts")}
            />
          )}
        </>
      );
    }

    // ── LOGGED-IN CON HEADER ──
    return (
      <AppShellLayout
        screen={screen}
        currentUser={currentUser!}
        onNavigate={navigate}
        onSearch={marketplaceFilters.handleSearch}
        appliedState={marketplaceFilters.appliedState}
        appliedPrice={marketplaceFilters.appliedPrice}
        onFilterApply={marketplaceFilters.handleFilterApply}
      >
        {screen === "home" && currentUser && (
          <Home onNavigate={navigate} onViewProduct={productNav.openProductDetail} currentUser={currentUser} />
        )}
        {screen === "marketplace" && currentUser && (
          <MarketPlace
            currentUser={currentUser}
            searchTerm={marketplaceFilters.marketplaceSearch}
            onSearch={marketplaceFilters.setMarketplaceSearch}
            stateFilter={marketplaceFilters.appliedState}
            onClearState={() => marketplaceFilters.setAppliedState("")}
            priceFilter={marketplaceFilters.appliedPrice}
            onClearPrice={() => marketplaceFilters.setAppliedPrice(500)}
            onViewProduct={productNav.openProductDetail}
          />
        )}
        {screen === "settings" && currentUser && (
          <Settings
            onNavigate={navigate}
            currentUser={currentUser}
            onLogout={handleLogout}
            onNotificationsChange={updateNotificationsPreference}
          />
        )}
        {screen === "addproduct" && currentUser && (
          <AddProduct
            key={productNav.editProduct?.id ?? "new"}
            onBack={() => { productNav.clearEdit(); setScreen(productNav.editProduct ? productNav.editReturnScreen : "myproducts"); }}
            currentUser={currentUser}
            initialProduct={productNav.editProduct ?? undefined}
          />
        )}
        {screen === "favorite" && currentUser && (
          <Favorite onViewProduct={productNav.openProductDetail} currentUser={currentUser} />
        )}
        {screen === "productdetail" && productNav.viewedProduct && currentUser && (
          <ProductPage
            product={productNav.viewedProduct}
            onBack={() => navigate(productNav.productReturnScreen)}
            onViewSellerProfile={profileNav.openSellerProfile}
          />
        )}
      </AppShellLayout>
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
