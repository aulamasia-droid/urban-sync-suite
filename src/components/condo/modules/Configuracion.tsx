import { useState } from "react";
import { Card, PageHeader, Btn, Badge } from "@/components/condo/SharedComponents";
import { useSmtp, SmtpConfig, WhatsAppWebhookConfig } from "@/contexts/SmtpContext";
import { toast } from "sonner";
import { Mail, Eye, EyeOff, Server, Webhook, Loader2 } from "lucide-react";
import { MOCK_RESIDENTS } from "@/data/mockData";

interface ConfiguracionProps {
  dark: boolean;
  onToggleDark: () => void;
}

export default function Configuracion({ dark, onToggleDark }: ConfiguracionProps) {
  const { smtp, setSmtp, webhook, setWebhook } = useSmtp();
  const [smtpForm, setSmtpForm] = useState<SmtpConfig>(smtp);
  const [webhookForm, setWebhookForm] = useState<WhatsAppWebhookConfig>(webhook);
  const [showPassword, setShowPassword] = useState(false);
  const [testingEmail, setTestingEmail] = useState("");
  const [testingWebhook, setTestingWebhook] = useState(false);
  const [selectedResidentId, setSelectedResidentId] = useState(MOCK_RESIDENTS[0]?.id ?? 0);
  const [testMessage, setTestMessage] = useState("Este es un mensaje de prueba desde el sistema de administración del condominio.");
  const [editablePayload, setEditablePayload] = useState("");

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

  const buildPayload = () => {
    const testResident = MOCK_RESIDENTS.find(r => r.id === selectedResidentId) || MOCK_RESIDENTS[0];
    return {
      tipo: "prueba",
      mensaje: testMessage,
      destinatario: {
        nombre: testResident.nombre,
        casa: testResident.casa,
        email: testResident.email,
        telefono: testResident.tel,
        estado: testResident.estado,
        saldo: testResident.saldo,
      },
      condominio: {
        nombre: "Las Palmas Residencial",
        administrador: "Admin General",
      },
      fecha: new Date().toISOString(),
    };
  };

  const refreshPayload = () => {
    setEditablePayload(JSON.stringify(buildPayload(), null, 2));
  };

  // Initialize editable payload on first render or when deps change
  const currentPayloadPreview = editablePayload || JSON.stringify(buildPayload(), null, 2);

  const handleWebhookTest = async () => {
    if (!webhookForm.url.trim()) {
      toast.error("Ingresa la URL del Webhook primero");
      return;
    }

    let payload: any;
    try {
      payload = JSON.parse(currentPayloadPreview);
    } catch {
      toast.error("El payload JSON no es válido. Corrige la sintaxis e intenta de nuevo.");
      return;
    }

    setTestingWebhook(true);
    try {
      const res = await fetch(webhookForm.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast.success("Webhook respondió correctamente ✅", { description: `Status: ${res.status}` });
      } else {
        toast.error(`Webhook respondió con error: ${res.status}`, { description: "Verifica la URL e intenta de nuevo." });
      }
    } catch (err: any) {
      toast.error("No se pudo conectar al Webhook", { description: err?.message || "Verifica la URL y que el servidor esté activo." });
    } finally {
      setTestingWebhook(false);
    }
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
              Al activar SMTP, los correos se enviarán usando tu servidor configurado en lugar del cliente de correo local.
            </div>

            {smtpForm.enabled && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Servidor SMTP *</label>
                    <input value={smtpForm.host} onChange={e => updateField("host", e.target.value)} placeholder="smtp.gmail.com" className={inputClass} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Puerto *</label>
                    <input value={smtpForm.port} onChange={e => updateField("port", e.target.value)} placeholder="587" className={inputClass} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Usuario SMTP *</label>
                    <input value={smtpForm.user} onChange={e => updateField("user", e.target.value)} placeholder="admin@condominio.com" className={inputClass} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Contraseña SMTP</label>
                    <div className="relative">
                      <input type={showPassword ? "text" : "password"} value={smtpForm.password} onChange={e => updateField("password", e.target.value)} placeholder="••••••••" className={inputClass + " pr-10"} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Correo remitente *</label>
                    <input value={smtpForm.fromEmail} onChange={e => updateField("fromEmail", e.target.value)} placeholder="admin@condominio.com" className={inputClass} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Nombre remitente</label>
                    <input value={smtpForm.fromName} onChange={e => updateField("fromName", e.target.value)} placeholder="Administración del Condominio" className={inputClass} />
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
                  <div>
                    <div className="text-sm font-semibold text-card-foreground">Conexión segura (SSL/TLS)</div>
                    <div className="text-xs text-muted-foreground">Recomendado para puertos 465 y 587</div>
                  </div>
                  <button onClick={() => updateField("secure", !smtpForm.secure)} className={`relative h-6 w-11 rounded-full transition-colors ${smtpForm.secure ? "bg-primary" : "bg-border"}`}>
                    <div className={`absolute top-[3px] h-[18px] w-[18px] rounded-full bg-card transition-[left] ${smtpForm.secure ? "left-[23px]" : "left-[3px]"}`} />
                  </button>
                </div>

                <div className="rounded-lg border border-border p-4">
                  <h4 className="mb-2 text-[13px] font-semibold text-card-foreground">Enviar correo de prueba</h4>
                  <div className="flex gap-2">
                    <input value={testingEmail} onChange={e => setTestingEmail(e.target.value)} placeholder="test@ejemplo.com" className={inputClass + " flex-1"} />
                    <Btn variant="outline" onClick={handleTestEmail}><Mail className="h-3.5 w-3.5" /> Probar</Btn>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Btn variant="primary" onClick={handleSmtpSave}>Guardar Configuración SMTP</Btn>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* WhatsApp Webhook Configuration - full width */}
        <div className="lg:col-span-2">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Webhook className="h-5 w-5 text-green-600 dark:text-green-400" />
                <h3 className="text-[15px] font-bold text-card-foreground">Webhook WhatsApp</h3>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={webhookForm.enabled ? "success" : "muted"}>
                  {webhookForm.enabled ? "Activo" : "Inactivo"}
                </Badge>
                <button
                  onClick={() => setWebhookForm(prev => ({ ...prev, enabled: !prev.enabled }))}
                  className={`relative h-6 w-11 rounded-full transition-colors ${webhookForm.enabled ? "bg-primary" : "bg-border"}`}
                >
                  <div className={`absolute top-[3px] h-[18px] w-[18px] rounded-full bg-card transition-[left] ${webhookForm.enabled ? "left-[23px]" : "left-[3px]"}`} />
                </button>
              </div>
            </div>

            <div className="mb-4 rounded-lg border border-green-200 bg-green-50/50 px-3.5 py-2.5 text-[13px] text-green-800 dark:border-green-800 dark:bg-green-950/30 dark:text-green-300">
              📲 Al activar el Webhook, los envíos de WhatsApp realizarán un POST a la URL configurada con toda la información del destinatario (nombre, casa, teléfono, email, saldo, estado) y el mensaje a enviar.
            </div>

            {webhookForm.enabled && (
              <div className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">URL del Webhook *</label>
                  <input
                    value={webhookForm.url}
                    onChange={e => setWebhookForm(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="https://tu-servidor.com/api/whatsapp-webhook"
                    className={inputClass}
                  />
                  <p className="mt-1.5 text-[11px] text-muted-foreground">
                    El sistema enviará un POST con JSON incluyendo: tipo, mensaje, destinatario (nombre, casa, email, teléfono, estado, saldo), datos del condominio y fecha.
                  </p>
                </div>

                {/* Ejemplo de payload */}
                <div className="rounded-lg border border-border bg-muted/50 p-3">
                  <h4 className="mb-2 text-[12px] font-semibold text-muted-foreground uppercase tracking-wide">Ejemplo de payload enviado</h4>
                  <pre className="overflow-x-auto rounded bg-background p-3 text-[11px] text-foreground">
{JSON.stringify({
  tipo: "aviso",
  mensaje: "Recordatorio de pago de cuota mensual.",
  destinatario: {
    nombre: "Juan Pérez",
    casa: "A-101",
    email: "juan@email.com",
    telefono: "5551234567",
    estado: "activo",
    saldo: 1200,
  },
  condominio: { nombre: "Las Palmas Residencial", administrador: "Admin General" },
  fecha: new Date().toISOString(),
}, null, 2)}
                  </pre>
                </div>

                {/* Test button */}
                <div className="rounded-lg border border-border p-4">
                  <h4 className="mb-2 text-[13px] font-semibold text-card-foreground">Probar Webhook</h4>
                  <p className="mb-3 text-[12px] text-muted-foreground">
                    Envía un payload de prueba con datos del primer residente a la URL configurada.
                  </p>
                  <button
                    onClick={handleWebhookTest}
                    disabled={testingWebhook}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {testingWebhook ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Webhook className="h-3.5 w-3.5" />}
                    {testingWebhook ? "Enviando..." : "Probar Webhook"}
                  </button>
                </div>

                <div className="flex gap-2">
                  <Btn variant="primary" onClick={handleWebhookSave}>Guardar Configuración Webhook</Btn>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
