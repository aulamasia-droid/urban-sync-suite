import { useState } from "react";
import { MOCK_RESERVAS, Reserva } from "@/data/mockData";
import { Card, PageHeader, Btn, DataTable, TD, Badge, estadoBadge } from "@/components/condo/SharedComponents";
import { Plus } from "lucide-react";

const AREA_EMOJI: Record<string, string> = { "Salón": "🏛️", "Alberca": "🏊", "Terraza": "🌿", "Cancha": "⚽" };

export default function Reservas() {
  const [form, setForm] = useState(false);

  return (
    <div>
      <PageHeader
        title="Reserva de Áreas Comunes"
        subtitle="Calendario de reservas del condominio"
        action={<Btn variant="primary" onClick={() => setForm(!form)}><Plus className="h-3.5 w-3.5" /> Nueva Reserva</Btn>}
      />

      {form && (
        <Card className="mb-5">
          <h3 className="mb-4 text-[15px] font-bold text-card-foreground">Solicitar Reserva</h3>
          <div className="mb-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[["Casa", "A-01"], ["Área", "Salón"], ["Fecha", "2025-01-25"], ["Horario", "14:00 - 22:00"]].map(([l, p]) => (
              <div key={l}>
                <label className="mb-1 block text-xs text-muted-foreground">{l}</label>
                <input placeholder={p} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-[13px] text-foreground outline-none" />
              </div>
            ))}
          </div>
          <div className="flex gap-2.5">
            <Btn variant="primary" onClick={() => setForm(false)}>Solicitar Reserva</Btn>
            <Btn variant="ghost" onClick={() => setForm(false)}>Cancelar</Btn>
          </div>
        </Card>
      )}

      {/* Area summary cards */}
      <div className="mb-5 grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        {["Salón", "Alberca", "Terraza", "Cancha"].map(area => (
          <Card key={area} className="text-center">
            <div className="mb-2 text-3xl">{AREA_EMOJI[area]}</div>
            <div className="text-base font-bold text-card-foreground">{area}</div>
            <div className="text-xs text-muted-foreground">{MOCK_RESERVAS.filter(r => r.area === area).length} reservas</div>
          </Card>
        ))}
      </div>

      <Card>
        <DataTable
          columns={["Casa", "Residente", "Área", "Fecha", "Horario", "Estado"]}
          data={MOCK_RESERVAS}
          renderRow={(row) => {
            const r = row as Reserva;
            return (
              <>
                <TD><span className="font-bold text-primary">{r.casa}</span></TD>
                <TD>{r.residente}</TD>
                <TD><Badge variant="info">{r.area}</Badge></TD>
                <TD>{r.fecha}</TD>
                <TD>{r.hora}</TD>
                <TD>{estadoBadge(r.estado)}</TD>
              </>
            );
          }}
        />
      </Card>
    </div>
  );
}
