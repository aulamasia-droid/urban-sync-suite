import { useState } from "react";
import { MOCK_MULTAS, Multa } from "@/data/mockData";
import { Card, PageHeader, Btn, DataTable, TD, Badge, estadoBadge } from "@/components/condo/SharedComponents";
import { Plus } from "lucide-react";

export default function Multas() {
  const [form, setForm] = useState(false);

  return (
    <div>
      <PageHeader
        title="Multas e Incidencias"
        subtitle={`${MOCK_MULTAS.filter(m => m.estado === "pendiente").length} multas pendientes`}
        action={<Btn variant="primary" onClick={() => setForm(!form)}><Plus className="h-3.5 w-3.5" /> Nueva Multa</Btn>}
      />

      {form && (
        <Card className="mb-5">
          <h3 className="mb-4 text-[15px] font-bold text-card-foreground">Registrar Nueva Multa</h3>
          <div className="mb-4 grid grid-cols-3 gap-3">
            {[["Casa", "A-01"], ["Tipo de Multa", "Ruido"], ["Monto ($)", "300"]].map(([label, placeholder]) => (
              <div key={label}>
                <label className="mb-1 block text-xs text-muted-foreground">{label}</label>
                <input placeholder={placeholder} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-[13px] text-foreground outline-none" />
              </div>
            ))}
          </div>
          <div className="mb-3">
            <label className="mb-1 block text-xs text-muted-foreground">Descripción</label>
            <textarea placeholder="Descripción de la incidencia..." className="min-h-[60px] w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-[13px] text-foreground outline-none" />
          </div>
          <div className="flex gap-2.5">
            <Btn variant="primary" onClick={() => setForm(false)}>Guardar Multa</Btn>
            <Btn variant="ghost" onClick={() => setForm(false)}>Cancelar</Btn>
          </div>
        </Card>
      )}

      <Card>
        <DataTable
          columns={["Casa", "Residente", "Tipo", "Descripción", "Monto", "Fecha", "Estado"]}
          data={MOCK_MULTAS}
          renderRow={(row) => {
            const m = row as Multa;
            return (
              <>
                <TD><span className="font-bold text-primary">{m.casa}</span></TD>
                <TD>{m.residente}</TD>
                <TD><Badge variant="info">{m.tipo}</Badge></TD>
                <TD><span className="text-muted-foreground">{m.descripcion}</span></TD>
                <TD><span className="font-bold text-destructive">${m.monto}</span></TD>
                <TD>{m.fecha}</TD>
                <TD>{estadoBadge(m.estado)}</TD>
              </>
            );
          }}
        />
      </Card>
    </div>
  );
}
