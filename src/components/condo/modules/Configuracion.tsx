import { useState } from "react";
import { Card, PageHeader, Btn, Badge } from "@/components/condo/SharedComponents";
import { useSmtp, SmtpConfig } from "@/contexts/SmtpContext";
import { toast } from "sonner";
import { Mail, Eye, EyeOff, Server } from "lucide-react";

interface ConfiguracionProps {
  dark: boolean;
  onToggleDark: () => void;
}

export default function Configuracion({ dark, onToggleDark }: ConfiguracionProps) {
  const { smtp, setSmtp } = useSmtp();
  const [smtpForm, setSmtpForm] = useState<SmtpConfig>(smtp);
  const [showPassword, setShowPassword] = useState(false);
  const [testingEmail, setTestingEmail] = useState("");

  const handleSmtpSave = () => {
    if (smtpForm.enabled && (!smtpForm.host || !smtpForm.port || !smtpForm.user || !smtpForm.fromEmail)) {
      toast.error("Completa todos los campos obligatorios de SMTP");
      return;
    }
    setSmtp(smtpForm);
    toast.success("Configuración SMTP guardada correctamente");
  };

  const handleTestEmail = () => {
    if (!testingEmail.trim()) {
      toast.error("Ingresa un correo para la prueba");
      return;
    }
    if (!smtpForm.enabled) {
      toast.error("Activa SMTP primero para enviar una prueba");
      return;
    }
    toast.success(`Correo de prueba enviado a ${testingEmail} (simulación)`);
  };

  const updateField = (field: keyof SmtpConfig, value: string | boolean) => {
    setSmtpForm(prev => ({ ...prev, [field]: value }));
  };

  const inputClass = "w-full rounded-lg border border-input bg-background px-3 py-2 text-[13px] text-foreground outline-none focus:ring-2 focus:ring-ring";

  return (
    <div>
      <PageHeader title="Configuración General" subtitle="Preferencias y parámetros del condominio" />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Datos del Condominio */}
        <Card>
          <h3 className="mb-4 text-[15px] font-bold text-card-foreground">Datos del Condominio</h3>
          {[["Nombre", "Las Palmas Residencial"], ["Dirección", "Calle Las Palmas #100"], ["Ciudad", "Ciudad de México"], ["Administrador", "Admin General"], ["Teléfono", "555-9000"], ["Cuota Mensual", "$1,200"]].map(([l, v]) => (
            <div key={l} className="mb-3">
              <label className="mb-1 block text-xs text-muted-foreground">{l}</label>
              <input defaultValue={v} className={inputClass} />
            </div>
          ))}
          <Btn variant="primary">Guardar Cambios</Btn>
        </Card>

        <div className="space-y-4">
          {/* Apariencia */}
          <Card>
            <h3 className="mb-4 text-[15px] font-bold text-card-foreground">Apariencia</h3>
            <div className="flex items-center justify-between py-3">
              <div>
                <div className="text-sm font-semibold text-card-foreground">Modo Oscuro</div>
                <div className="text-xs text-muted-foreground">Cambiar tema de la aplicación</div>
              </div>
              <button
                onClick={onToggleDark}
                className={`relative h-6 w-11 rounded-full transition-colors ${dark ? "bg-primary" : "bg-border"}`}
              >
                <div className={`absolute top-[3px] h-[18px] w-[18px] rounded-full bg-card transition-[left] ${dark ? "left-[23px]" : "left-[3px]"}`} />
              </button>
            </div>
          </Card>

          {/* Notificaciones */}
          <Card>
            <h3 className="mb-4 text-[15px] font-bold text-card-foreground">Notificaciones</h3>
            {([["Alertas de adeudo", true], ["Avisos por correo", true], ["Recordatorios de pago", false], ["Notificaciones de tickets", true]] as [string, boolean][]).map(([l, v]) => (
              <div key={l} className="flex items-center justify-between border-b border-border py-2.5">
                <span className="text-[13px] text-card-foreground">{l}</span>
                <Badge variant={v ? "success" : "muted"}>{v ? "Activo" : "Inactivo"}</Badge>
              </div>
            ))}
          </Card>
        </div>

        {/* SMTP Configuration - full width */}
        <div className="lg:col-span-2">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5 text-primary" />
                <h3 className="text-[15px] font-bold text-card-foreground">Configuración SMTP</h3>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={smtpForm.enabled ? "success" : "muted"}>
                  {smtpForm.enabled ? "Activo" : "Inactivo"}
                </Badge>
                <button
                  onClick={() => updateField("enabled", !smtpForm.enabled)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${smtpForm.enabled ? "bg-primary" : "bg-border"}`}
                >
                  <div className={`absolute top-[3px] h-[18px] w-[18px] rounded-full bg-card transition-[left] ${smtpForm.enabled ? "left-[23px]" : "left-[3px]"}`} />
                </button>
              </div>
            </div>

            <div className="mb-4 rounded-lg border border-accent bg-accent/30 px-3.5 py-2.5 text-[13px] text-accent-foreground">
              <Mail className="mb-0.5 mr-1.5 inline-block h-3.5 w-3.5" />
              Al activar SMTP, los correos se enviarán usando tu servidor configurado en lugar del cliente de correo local. Todos los botones de "Enviar Mail" del sistema utilizarán esta configuración.
            </div>

            {smtpForm.enabled && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Host */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Servidor SMTP *</label>
                    <input
                      value={smtpForm.host}
                      onChange={e => updateField("host", e.target.value)}
                      placeholder="smtp.gmail.com"
                      className={inputClass}
                    />
                  </div>
                  {/* Port */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Puerto *</label>
                    <input
                      value={smtpForm.port}
                      onChange={e => updateField("port", e.target.value)}
                      placeholder="587"
                      className={inputClass}
                    />
                  </div>
                  {/* User */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Usuario SMTP *</label>
                    <input
                      value={smtpForm.user}
                      onChange={e => updateField("user", e.target.value)}
                      placeholder="admin@condominio.com"
                      className={inputClass}
                    />
                  </div>
                  {/* Password */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Contraseña SMTP</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={smtpForm.password}
                        onChange={e => updateField("password", e.target.value)}
                        placeholder="••••••••"
                        className={inputClass + " pr-10"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  {/* From Email */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Correo remitente *</label>
                    <input
                      value={smtpForm.fromEmail}
                      onChange={e => updateField("fromEmail", e.target.value)}
                      placeholder="admin@condominio.com"
                      className={inputClass}
                    />
                  </div>
                  {/* From Name */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Nombre remitente</label>
                    <input
                      value={smtpForm.fromName}
                      onChange={e => updateField("fromName", e.target.value)}
                      placeholder="Administración del Condominio"
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* SSL/TLS toggle */}
                <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
                  <div>
                    <div className="text-sm font-semibold text-card-foreground">Conexión segura (SSL/TLS)</div>
                    <div className="text-xs text-muted-foreground">Recomendado para puertos 465 y 587</div>
                  </div>
                  <button
                    onClick={() => updateField("secure", !smtpForm.secure)}
                    className={`relative h-6 w-11 rounded-full transition-colors ${smtpForm.secure ? "bg-primary" : "bg-border"}`}
                  >
                    <div className={`absolute top-[3px] h-[18px] w-[18px] rounded-full bg-card transition-[left] ${smtpForm.secure ? "left-[23px]" : "left-[3px]"}`} />
                  </button>
                </div>

                {/* Test email */}
                <div className="rounded-lg border border-border p-4">
                  <h4 className="mb-2 text-[13px] font-semibold text-card-foreground">Enviar correo de prueba</h4>
                  <div className="flex gap-2">
                    <input
                      value={testingEmail}
                      onChange={e => setTestingEmail(e.target.value)}
                      placeholder="test@ejemplo.com"
                      className={inputClass + " flex-1"}
                    />
                    <Btn variant="outline" onClick={handleTestEmail}>
                      <Mail className="h-3.5 w-3.5" /> Probar
                    </Btn>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Btn variant="primary" onClick={handleSmtpSave}>Guardar Configuración SMTP</Btn>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
