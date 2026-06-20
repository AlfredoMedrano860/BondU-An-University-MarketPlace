import { useState, useRef, useLayoutEffect, useEffect, type ReactNode } from "react";
import AppLayout from "./AppLayout";
import AppHeader from "../templates/AppHeader";
import ProfileHeader from "../templates/ProfileHeader";
import BottomNav from "../ui/BottomNav";
import Filtros, { type FilterValues } from "../templates/Filters";
import type { UserProfile } from "../data/UserProfile";

const headerScreens    = ["home", "marketplace", "favorite", "addproduct", "productdetail"];
const bottomNavScreens = ["home", "marketplace", "favorite", "addproduct", "settings"];
const filterScreens    = ["home", "marketplace", "favorite"];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

interface MainLayoutProps {
  screen: string;
  currentUser: UserProfile;
  onNavigate: (screen: string) => void;
  onSearch: (term: string) => void;
  appliedEstado: string;
  appliedPrecio: number;
  onFilterApply: (filters: FilterValues) => void;
  children: ReactNode;
}

function MainLayout({ screen, currentUser, onNavigate, onSearch, appliedEstado, appliedPrecio, onFilterApply, children }: MainLayoutProps) {
  const headerRef    = useRef<HTMLDivElement>(null);
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef= useRef<ReturnType<typeof setTimeout> | null>(null);
  const [headerH, setHeaderH] = useState(0);
  const isMobile = useIsMobile();

  const [showFilters, setShowFilters]   = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);

  useLayoutEffect(() => {
    if (headerRef.current) setHeaderH(headerRef.current.offsetHeight);
  }, [screen]);

  useEffect(() => {
    return () => {
      if (openTimerRef.current)  clearTimeout(openTimerRef.current);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  function openFilters() {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setShowFilters(true);
    openTimerRef.current = setTimeout(() => setPanelVisible(true), 10);
  }

  function closeFilters() {
    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    setPanelVisible(false);
    closeTimerRef.current = setTimeout(() => setShowFilters(false), 300);
  }

  function handleApply(filters: FilterValues) {
    closeFilters();
    onFilterApply(filters);
  }

  return (
    <div className="flex flex-col h-dvh bg-beige">

      <div ref={headerRef}>
        {headerScreens.includes(screen) && (
          <AppHeader
            currentUser={currentUser}
            onSearch={onSearch}
            onFilterOpen={filterScreens.includes(screen) ? openFilters : undefined}
          />
        )}
      </div>

      {screen === "settings" && (
        <ProfileHeader
          name={currentUser.username}
          email={currentUser.email}
          avatar={currentUser.avatar}
        />
      )}

      <AppLayout>
        {children}
      </AppLayout>

      {bottomNavScreens.includes(screen) && (
        <BottomNav onNavigate={onNavigate} currentScreen={screen} />
      )}

      {/* Backdrop — fixed so overflow-hidden never clips it */}
      {showFilters && (
        <div
          className={`fixed inset-0 z-40 transition-opacity duration-300 ${
            panelVisible ? "opacity-100" : "opacity-0"
          } ${isMobile ? "bg-black/40" : "bg-transparent"}`}
          onClick={closeFilters}
        />
      )}

      {/* Mobile: bottom sheet */}
      {showFilters && isMobile && (
        <div
          className={`fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 ease-out ${
            panelVisible ? "translate-y-0" : "translate-y-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <Filtros
            initialEstado={appliedEstado}
            initialPrecio={appliedPrecio}
            onApply={handleApply}
            onClose={closeFilters}
            className="rounded-t-3xl rounded-b-none"
          />
        </div>
      )}

      {/* Desktop: dropdown below the filter button */}
      {showFilters && !isMobile && (
        <div
          className={`fixed right-10 md:right-16 lg:right-20 z-50 w-80
            transition-all duration-300 ease-out
            ${panelVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}`}
          style={{ top: headerH + 8 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Filtros
            initialEstado={appliedEstado}
            initialPrecio={appliedPrecio}
            onApply={handleApply}
            onClose={closeFilters}
            className="rounded-3xl"
          />
        </div>
      )}

    </div>
  );
}

export default MainLayout;
