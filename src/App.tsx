import "./assets/styles/App.css";
import { useState } from "react";
import AppLayout from "./components/layout/AppLayout";
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
import type { UserProfile } from "./components/data/UserProfile";
import ProfileScreen from "./components/screens/ProfileScreen";

function App() {
  const [screen, setScreen]               = useState("info");
  const [currentUser, setCurrentUser]     = useState<UserProfile | null>(null);
  const [marketplaceSearch, setMarketplaceSearch] = useState("");

  function handleLogin(user: UserProfile) {
    setCurrentUser(user);
    setScreen("home");
  }

  function handleLogout() {
    setCurrentUser(null);
    setScreen("welcome");
  }

  return (
    <div className="min-h-screen bg-beige">
      <AppLayout>
        {screen === "info" && (
          <InfoScreen onFinish={() => setScreen("welcome")} />
        )}
        {screen === "welcome" && (
          <WelcomeScreen onLogin={() => setScreen("login")} />
        )}
        {screen === "login" && (
          <LoginScreen onBack={() => setScreen("welcome")} onLogin={handleLogin} onSignUp={() => setScreen("signup")} onForgotPassword={() => setScreen("forgotpassword")}/>
        )}
        {screen === "signup" && (
          <SignUpScreen onBack={() => setScreen("login")} onRegister={() => setScreen("login")} />
        )}
        {screen === "forgotpassword" && (
          <ForgotPasswordScreen onBack={() => setScreen("login")} onSuccess={() => setScreen("login")} />
        )}
        {screen === "home" && currentUser && (
          <HomeScreen
            onNavigate={setScreen}
            currentUser={currentUser}
            onSearch={(term) => { setMarketplaceSearch(term); setScreen("marketplace"); }}
          />
        )}
        {screen === "marketplace" && currentUser && (
          <MarketPlaceScreen
            onNavigate={setScreen}
            currentUser={currentUser}
            searchTerm={marketplaceSearch}
            onSearch={(term) => setMarketplaceSearch(term)}
          />
        )}
        {screen === "settings" && currentUser && (
          <SettingsScreen onNavigate={setScreen} currentUser={currentUser} onLogout={handleLogout} />
        )}
        {screen === "addproduct" && currentUser && (
          <AddProductScreen onBack={() => setScreen("marketplace")} currentUser={currentUser} />
        )}
        {screen === "account" && currentUser && (
          <AccountScreen currentUser={currentUser} onBack={() => setScreen("settings")} onUpdate={setCurrentUser} />
        )}
        {screen === "myproducts" && currentUser && (
          <MyProductsScreen userId={currentUser.id} onBack={() => setScreen("settings")} />
        )}
        {screen === "favorite" && currentUser && (
          <FavoriteScreen
            onNavigate={setScreen}
            currentUser={currentUser}
            onSearch={(term) => { setMarketplaceSearch(term); setScreen("marketplace"); }}
          />
        )}
        {screen === 'profile' && currentUser && (
          <ProfileScreen currentUser={currentUser} onBack={() => setScreen("settings")} />
        )}
      </AppLayout>
    </div>
  );
}

export default App;