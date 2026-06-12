interface AppLayoutProps {
  children: React.ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  return (
    <main className="w-full min-h-screen bg-beige">
      <div className="max-w-screen-2xl mx-auto min-h-screen">
        {children}
      </div>
    </main>
  );
}

export default AppLayout;