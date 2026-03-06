import { useState } from "react";
import { MOCK_AVISOS } from "@/data/mockData";
import { Card, PageHeader, Btn, Badge } from "@/components/condo/SharedComponents";
import { Plus, Bell } from "lucide-react";

const TIPO_VARIANT: Record<string, "info" | "warning" | "success" | "destructive" | "muted"> = {
  mantenimiento: "warning", asamblea: "info", pagos: "success", seguridad: "destructive", general: "muted",
};

export default function Avisos() {
  const [form, setForm] = useState(false);

  return (
    <div>
      <PageHeader
        title="Avisos y Comunicados"
        subtitle="Comunicación con los residentes"
        action={<Btn variant="primary" onClick={() => setForm(!form)}><Plus className="h-3.5 w-3.5" /> Nuevo Aviso</Btn>}
      />

      {form && (
        <Card className="mb-5">
          <h3 className="mb-4 text-[15px] font-bold text-card-foreground">Crear Nuevo Aviso</h3>
          <div className="mb-3 grid grid-cols-1 gap-3 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <label className="mb-1 block text-xs text-muted-foreground">Título</label>
              <input placeholder="Título del aviso" className="w-full rounded-lg border border-input bg-background px-3 py-2 text-[13px] text-foreground outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">Tipo</label>
              <select className="w-full rounded-lg border border-input bg-background px-3 py-2 text-[13px] text-foreground outline-none">
                {["Mantenimiento", "Seguridad", "Pagos", "Asamblea", "General"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <textarea placeholder="Contenido del aviso..." className="mb-3 min-h-[80px] w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-[13px] text-foreground outline-none" />
          <div className="flex gap-2.5">
            <Btn variant="primary" onClick={() => setForm(false)}>Publicar Aviso</Btn>
            <Btn variant="ghost" onClick={() => setForm(false)}>Cancelar</Btn>
          </div>
        </Card>
      )}

      <div className="flex flex-col gap-3.5">
        {MOCK_AVISOS.map(a => (
          <Card key={a.id}>
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent">
                <Bell className="h-[18px] w-[18px] text-primary" />
              </div>
              <div className="flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="text-[15px] font-bold text-card-foreground">{a.titulo}</span>
                  {a.urgente && <Badge variant="destructive">🔴 Urgente</Badge>}
                  <Badge variant={TIPO_VARIANT[a.tipo] || "muted"}>{a.tipo}</Badge>
                </div>
                <p className="mb-2 text-[13px] text-muted-foreground">{a.contenido}</p>
                <span className="text-[11px] text-muted-foreground">{a.fecha} · Por: {a.autor}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
