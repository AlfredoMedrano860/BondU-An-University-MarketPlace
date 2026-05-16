interface AppLayoutProps {
  children: React.ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  return <main className="w-full max-w-107.5 min-h-screen bg-beige overflow-hidden">{children}</main>;
}

export default AppLayout;