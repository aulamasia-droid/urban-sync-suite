import { RolDemo } from "@/data/mockData";
import {
  Home, Building2, Users, List, DollarSign, AlertTriangle, Bell,
  MessageSquare, Wrench, Calendar, Eye, FileText, Settings, LogOut, Mail
} from "lucide-react";
import logoArqenta from "@/assets/logo_arqenta.png";

export const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "casas", label: "Casas", icon: Building2 },
  { id: "residentes", label: "Residentes", icon: Users },
  { id: "estados", label: "Estados de Cuenta", icon: List },
  { id: "pagos", label: "Pagos", icon: DollarSign },
  { id: "multas", label: "Multas", icon: AlertTriangle },
  { id: "avisos", label: "Avisos", icon: Bell },
  { id: "correos", label: "Bitácora Correos", icon: Mail },
  { id: "chat", label: "Chat Interno", icon: MessageSquare },
  { id: "tickets", label: "Tickets", icon: Wrench },
  { id: "reservas", label: "Reservas", icon: Calendar },
  { id: "visitas", label: "Visitas", icon: Eye },
  { id: "documentos", label: "Documentos", icon: FileText },
  { id: "configuracion", label: "Configuración", icon: Settings },
] as const;

interface SidebarProps {
  active: string;
  onNav: (id: string) => void;
  open: boolean;
  user: RolDemo;
  onLogout: () => void;
}

export default function Sidebar({ active, onNav, open, user, onLogout }: SidebarProps) {
  if (!open) return null;

  return (
    <aside className="flex h-screen w-60 flex-col border-r border-sidebar-border bg-sidebar">
      {/* Brand */}
      <div className="flex items-center gap-3 border-b border-sidebar-border px-4 py-4">
        <img src={logoArqenta} alt="ARQENTA" className="h-9 w-auto" />
        <div>
          <div className="text-sm font-bold text-sidebar-foreground">ARQENTA</div>
          <div className="text-[11px] text-muted-foreground">Arquitectura Digital e IA</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-2">
        {NAV_ITEMS.map(item => {
          const isActive = active === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNav(item.id)}
              className={`mb-0.5 flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-[13px] transition-colors ${
                isActive
                  ? "bg-primary/10 font-semibold text-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t border-sidebar-border p-3">
        <div className="mb-2 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {user.nombre.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-xs font-semibold text-sidebar-foreground">{user.nombre}</div>
            <div className="truncate text-[10px] text-muted-foreground">{user.email}</div>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-3.5 w-3.5" />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
