import { RolDemo } from "@/data/mockData";
import { Search, Sun, Moon, Bell, Menu } from "lucide-react";

interface TopBarProps {
  dark: boolean;
  onToggleDark: () => void;
  user: RolDemo;
  notifOpen: boolean;
  setNotifOpen: (v: boolean) => void;
  onMenuToggle: () => void;
}

const NOTIFICATIONS = [
  { txt: "3 residentes con adeudo crítico", tipo: "destructive", hora: "hace 1h" },
  { txt: "Ticket #1: Fuga en A-03 pendiente", tipo: "warning", hora: "hace 2h" },
  { txt: "Asamblea programada para el 22 Ene", tipo: "primary", hora: "hace 5h" },
];

export default function TopBar({ dark, onToggleDark, user, notifOpen, setNotifOpen, onMenuToggle }: TopBarProps) {
  return (
    <header className="flex h-14 items-center gap-3 border-b border-border bg-card px-4">
      <button onClick={onMenuToggle} className="rounded-md p-2 text-muted-foreground hover:bg-secondary">
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex flex-1 items-center gap-2 rounded-lg border border-input bg-background px-3 py-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          placeholder="Buscar en el sistema..."
          className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="flex items-center gap-2">
        <button onClick={onToggleDark} className="rounded-md border border-border p-2 text-muted-foreground hover:bg-secondary">
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative rounded-md border border-border p-2 text-muted-foreground hover:bg-secondary"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
              3
            </span>
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-11 z-50 w-80 rounded-xl border border-border bg-card p-3 shadow-lg">
              <h4 className="mb-2 text-xs font-bold text-card-foreground">Notificaciones</h4>
              {NOTIFICATIONS.map((n, i) => (
                <div key={i} className="mb-1.5 flex items-start gap-2.5 rounded-lg p-2 hover:bg-secondary">
                  <div className={`mt-1 h-2 w-2 rounded-full ${
                    n.tipo === "destructive" ? "bg-destructive" : n.tipo === "warning" ? "bg-warning" : "bg-primary"
                  }`} />
                  <div>
                    <p className="text-xs text-card-foreground">{n.txt}</p>
                    <p className="text-[10px] text-muted-foreground">{n.hora}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            {user.nombre.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="text-xs font-semibold text-card-foreground">{user.nombre}</div>
            <div className="text-[10px] text-muted-foreground">Rol: {user.nombre}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
