import "./assets/styles/App.css";
import { useState, useEffect } from "react";
import AppLayout from "./components/layout/AppLayout";
import InfoScreen from "./components/screens/InfoScreen";
import WelcomeScreen from "./components/screens/WelcomeScreen";
import LoginScreen from "./components/screens/LoginScreen";
import SignUpScreen from "./components/screens/SignUpScreen";
import HomeScreen from "./components/screens/HomeScreen";
import MarketPlaceScreen from "./components/screens/MarketPlaceScreen";
import SettingsScreen from "./components/screens/SettingsScreen";
import AddProductScreen from "./components/screens/AddProductScreen";

function App() {
  const [screen, setScreen] = useState("info");

// Este useEffect se lo pedí a chat para el mockup del iphone y que a todos 
// se nos viera bien sin importar el tamaño de la pantalla.
// El mockup es solo para desarrollo, despues se quita.

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
              <LoginScreen onBack={() => setScreen("welcome")} onLogin={() => setScreen("home")} onSignUp={() => setScreen("signup")}/>
            )}
            {screen === "signup" && (
              <SignUpScreen onBack={() => setScreen("login")} onRegister={() => setScreen("home")} />
            )}
            {screen === "home" && (
              <HomeScreen onNavigate={setScreen} />
            )}
            {screen === "marketplace" && (
              <MarketPlaceScreen onNavigate={setScreen} />
            )}
            {screen === "settings" && (
              <SettingsScreen onNavigate={setScreen} />
            )}
            {screen === "addproduct" && (
              <AddProductScreen onBack={() => setScreen("marketplace")} />
            )}
          </AppLayout>
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;