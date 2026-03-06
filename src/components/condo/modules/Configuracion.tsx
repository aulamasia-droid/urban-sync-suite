import { Card, PageHeader, Btn, Badge } from "@/components/condo/SharedComponents";

interface ConfiguracionProps {
  dark: boolean;
  onToggleDark: () => void;
}

export default function Configuracion({ dark, onToggleDark }: ConfiguracionProps) {
  return (
    <div>
      <PageHeader title="Configuración General" subtitle="Preferencias y parámetros del condominio" />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <h3 className="mb-4 text-[15px] font-bold text-card-foreground">Datos del Condominio</h3>
          {[["Nombre", "Las Palmas Residencial"], ["Dirección", "Calle Las Palmas #100"], ["Ciudad", "Ciudad de México"], ["Administrador", "Admin General"], ["Teléfono", "555-9000"], ["Cuota Mensual", "$1,200"]].map(([l, v]) => (
            <div key={l} className="mb-3">
              <label className="mb-1 block text-xs text-muted-foreground">{l}</label>
              <input defaultValue={v} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-[13px] text-foreground outline-none" />
            </div>
          ))}
          <Btn variant="primary">Guardar Cambios</Btn>
        </Card>

        <div className="space-y-4">
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
      </div>
    </div>
  );
}
