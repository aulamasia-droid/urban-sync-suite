import { useState } from "react";
import { RolDemo } from "@/data/mockData";
import LoginScreen from "@/components/condo/LoginScreen";
import Sidebar from "@/components/condo/Sidebar";
import TopBar from "@/components/condo/TopBar";
import Dashboard from "@/components/condo/modules/Dashboard";
import Casas from "@/components/condo/modules/Casas";
import Residentes from "@/components/condo/modules/Residentes";
import EstadosCuenta from "@/components/condo/modules/EstadosCuenta";
import Pagos from "@/components/condo/modules/Pagos";
import PlaceholderModule from "@/components/condo/modules/PlaceholderModule";

export default function Index() {
  const [dark, setDark] = useState(false);
  const [user, setUser] = useState<RolDemo | null>(null);
  const [activeModule, setActiveModule] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);

  const root = document.documentElement;
  if (dark) root.classList.add("dark");
  else root.classList.remove("dark");

  if (!user) return <LoginScreen onLogin={setUser} />;

  const renderModule = () => {
    switch (activeModule) {
      case "dashboard": return <Dashboard onNav={(id) => { setActiveModule(id); setNotifOpen(false); }} />;
      case "casas": return <Casas />;
      case "residentes": return <Residentes />;
      case "estados": return <EstadosCuenta />;
      case "pagos": return <Pagos />;
      default: return <PlaceholderModule title={activeModule.charAt(0).toUpperCase() + activeModule.slice(1)} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        active={activeModule}
        onNav={(id) => { setActiveModule(id); setNotifOpen(false); }}
        open={sidebarOpen}
        user={user}
        onLogout={() => setUser(null)}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar
          dark={dark}
          onToggleDark={() => setDark(!dark)}
          user={user}
          notifOpen={notifOpen}
          setNotifOpen={setNotifOpen}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 overflow-y-auto p-6">
          {renderModule()}
        </main>
      </div>
    </div>
  );
}
