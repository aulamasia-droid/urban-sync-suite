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
import Multas from "@/components/condo/modules/Multas";
import Avisos from "@/components/condo/modules/Avisos";
import BitacoraCorreos from "@/components/condo/modules/BitacoraCorreos";
import Chat from "@/components/condo/modules/Chat";
import Tickets from "@/components/condo/modules/Tickets";
import Reservas from "@/components/condo/modules/Reservas";
import Visitas from "@/components/condo/modules/Visitas";
import Documentos from "@/components/condo/modules/Documentos";
import Configuracion from "@/components/condo/modules/Configuracion";

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

  const nav = (id: string) => { setActiveModule(id); setNotifOpen(false); };
  const toggleDark = () => setDark(!dark);

  const renderModule = () => {
    switch (activeModule) {
      case "dashboard": return <Dashboard onNav={nav} />;
      case "casas": return <Casas />;
      case "residentes": return <Residentes />;
      case "estados": return <EstadosCuenta />;
      case "pagos": return <Pagos />;
      case "multas": return <Multas />;
      case "avisos": return <Avisos />;
      case "correos": return <BitacoraCorreos />;
      case "chat": return <Chat />;
      case "tickets": return <Tickets />;
      case "reservas": return <Reservas />;
      case "visitas": return <Visitas />;
      case "documentos": return <Documentos />;
      case "configuracion": return <Configuracion dark={dark} onToggleDark={toggleDark} />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar active={activeModule} onNav={nav} open={sidebarOpen} user={user} onLogout={() => setUser(null)} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar dark={dark} onToggleDark={toggleDark} user={user} notifOpen={notifOpen} setNotifOpen={setNotifOpen} onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-6">{renderModule()}</main>
        <footer className="border-t border-border px-6 py-2 text-center text-[10px] text-muted-foreground/60">
          © 2026 ARQENTA | Todos los derechos reservados |{" "}
          <a href="https://www.arqenta.com.mx" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">www.arqenta.com.mx</a>
        </footer>
      </div>
    </div>
  );
}
