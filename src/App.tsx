import "./assets/styles/App.css";
import { useState, useEffect } from "react";
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

function App() {
  const [screen, setScreen]           = useState("info");
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    function scaleIphone() {
      const wrapper = document.querySelector<HTMLElement>(".iphone-wrapper");
      if (!wrapper) return;
      const scale = Math.min(
        (window.innerHeight * 0.95) / 844,
        (window.innerWidth  * 0.95) / 390,
        1
      );
      wrapper.style.width  = `${390 * scale}px`;
      wrapper.style.height = `${844 * scale}px`;
      wrapper.style.transform = `scale(${scale})`;
      wrapper.style.transformOrigin = "top center";
    }
    scaleIphone();
    window.addEventListener("resize", scaleIphone);
    return () => window.removeEventListener("resize", scaleIphone);
  }, []);

  function handleLogin(user: UserProfile) {
    setCurrentUser(user);
    setScreen("home");
  }

  function handleLogout() {
    setCurrentUser(null);
    setScreen("welcome");
  }

  return (
    <div className="min-h-screen flex justify-center items-center app-background-gradient">
      <div className="iphone-wrapper">
        <div className="iphone-frame">
          <div className="iphone-screen">
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
                <HomeScreen onNavigate={setScreen} currentUser={currentUser} />
              )}
              {screen === "marketplace" && currentUser && (
                <MarketPlaceScreen onNavigate={setScreen} currentUser={currentUser} />
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
                <FavoriteScreen onNavigate={setScreen} currentUser={currentUser} />
              )}
            </AppLayout>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;