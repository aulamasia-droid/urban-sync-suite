import { useState } from "react";
import { ROLES_DEMO, RolDemo } from "@/data/mockData";
import logoAI from "@/assets/logo_ai.png";

interface LoginScreenProps {
  onLogin: (user: RolDemo) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const found = ROLES_DEMO.find(r => r.email === email && r.password === pass);
      if (found) {
        onLogin(found);
      } else {
        setError("Credenciales incorrectas. Usa los accesos de demostración.");
        setLoading(false);
      }
    }, 900);
  };

  const quickLogin = (rol: RolDemo) => {
    setEmail(rol.email);
    setPass(rol.password);
    setError("");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <img src={logoAI} alt="Administración Inteligente" className="mx-auto mb-3 h-20 w-auto" />
            
            <p className="mt-1 text-sm text-muted-foreground">Sistema de Administración Residencial</p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Correo Electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="usuario@condominio.mx"
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Contraseña
              </label>
              <input
                type="password"
                value={pass}
                onChange={e => setPass(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                placeholder="••••••••"
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/20"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
            )}

            <button
              onClick={handleLogin}
              disabled={loading || !email || !pass}
              className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Verificando..." : "Iniciar Sesión"}
            </button>
          </div>

          {/* Quick Access */}
          <div className="mt-6 border-t border-border pt-5">
            <p className="mb-3 text-center text-xs font-medium text-muted-foreground">Accesos de Demostración</p>
            <div className="grid grid-cols-2 gap-2">
              {ROLES_DEMO.map(r => (
                <button
                  key={r.id}
                  onClick={() => quickLogin(r)}
                  className="rounded-lg border border-border bg-secondary px-3 py-2 text-left transition-colors hover:bg-accent"
                >
                  <div className="text-xs font-semibold text-secondary-foreground">{r.nombre}</div>
                  <div className="text-[10px] text-muted-foreground">{r.email}</div>
                </button>
              ))}
            </div>
          </div>

          <p className="mt-5 text-center text-[11px] text-muted-foreground">
            v1.0.0 Demo · Administración Inteligente
          </p>
        </div>
      </div>
    </div>
  );
}
