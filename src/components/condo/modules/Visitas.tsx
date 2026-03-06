import { useState } from "react";
import { MOCK_VISITAS, Visita } from "@/data/mockData";
import { Card, PageHeader, Btn, DataTable, TD, estadoBadge } from "@/components/condo/SharedComponents";
import { Plus } from "lucide-react";

export default function Visitas() {
  const [form, setForm] = useState(false);

  return (
    <div>
      <PageHeader
        title="Control de Visitas"
        subtitle="Registro de visitas autorizadas"
        action={<Btn variant="primary" onClick={() => setForm(!form)}><Plus className="h-3.5 w-3.5" /> Registrar Visita</Btn>}
      />

      {form && (
        <Card className="mb-5">
          <h3 className="mb-4 text-[15px] font-bold text-card-foreground">Registrar Nueva Visita</h3>
          <div className="mb-3 grid grid-cols-3 gap-3">
            {[["Casa", "B-03"], ["Nombre del Visitante", "Juan García"], ["Hora", "15:00"]].map(([l, p]) => (
              <div key={l}>
                <label className="mb-1 block text-xs text-muted-foreground">{l}</label>
                <input placeholder={p} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-[13px] text-foreground outline-none" />
              </div>
            ))}
          </div>
          <div className="flex gap-2.5">
            <Btn variant="primary" onClick={() => setForm(false)}>Registrar</Btn>
            <Btn variant="ghost" onClick={() => setForm(false)}>Cancelar</Btn>
          </div>
        </Card>
      )}

      <Card>
        <DataTable
          columns={["Casa", "Residente", "Visitante", "Fecha", "Hora", "Estado"]}
          data={MOCK_VISITAS}
          renderRow={(row) => {
            const v = row as Visita;
            return (
              <>
                <TD><span className="font-bold text-primary">{v.casa}</span></TD>
                <TD>{v.residente}</TD>
                <TD><span className="font-semibold">{v.visitante}</span></TD>
                <TD>{v.fecha}</TD>
                <TD>{v.hora}</TD>
                <TD>{estadoBadge(v.estado)}</TD>
              </>
            );
          }}
        />
      </Card>
    </div>
  );
}
