import { useState } from "react";
import { MOCK_TICKETS } from "@/data/mockData";
import { Card, PageHeader, Btn, Badge, estadoBadge } from "@/components/condo/SharedComponents";
import { Plus } from "lucide-react";

const PRIO_VARIANT: Record<string, "destructive" | "warning" | "success"> = {
  alta: "destructive", media: "warning", baja: "success",
};

export default function Tickets() {
  const [form, setForm] = useState(false);

  return (
    <div>
      <PageHeader
        title="Tickets de Mantenimiento"
        subtitle={`${MOCK_TICKETS.filter(t => t.estado !== "resuelto").length} tickets activos`}
        action={<Btn variant="primary" onClick={() => setForm(!form)}><Plus className="h-3.5 w-3.5" /> Nuevo Ticket</Btn>}
      />

      {form && (
        <Card className="mb-5">
          <h3 className="mb-4 text-[15px] font-bold text-card-foreground">Reportar Problema</h3>
          <div className="mb-3 grid grid-cols-3 gap-3">
            {[["Casa", "A-01"], ["Categoría", "Agua"], ["Prioridad", "Media"]].map(([l, p]) => (
              <div key={l}>
                <label className="mb-1 block text-xs text-muted-foreground">{l}</label>
                <input placeholder={p} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-[13px] text-foreground outline-none" />
              </div>
            ))}
          </div>
          <textarea placeholder="Descripción del problema..." className="mb-3 min-h-[60px] w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-[13px] text-foreground outline-none" />
          <div className="flex gap-2.5">
            <Btn variant="primary" onClick={() => setForm(false)}>Crear Ticket</Btn>
            <Btn variant="ghost" onClick={() => setForm(false)}>Cancelar</Btn>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_TICKETS.map(tk => (
          <Card key={tk.id}>
            <div className="mb-2.5 flex items-start justify-between">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <Badge variant={PRIO_VARIANT[tk.prioridad] || "muted"}>{tk.prioridad.toUpperCase()}</Badge>
                  <Badge variant="info">{tk.categoria}</Badge>
                </div>
                <div className="text-[13px] font-semibold text-card-foreground">#{tk.id} · Casa {tk.casa}</div>
              </div>
              {estadoBadge(tk.estado)}
            </div>
            <p className="mb-2.5 text-[13px] text-muted-foreground">{tk.descripcion}</p>
            <div className="text-[11px] text-muted-foreground">{tk.residente} · {tk.fecha}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
