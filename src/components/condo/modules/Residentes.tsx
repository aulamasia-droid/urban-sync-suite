import { useState } from "react";
import { MOCK_RESIDENTS, MOCK_PAGOS, MOCK_MULTAS, Resident } from "@/data/mockData";
import { Card, PageHeader, Btn, DataTable, TD, estadoBadge } from "@/components/condo/SharedComponents";
import { Plus } from "lucide-react";

export default function Residentes() {
  const [selected, setSelected] = useState<Resident | null>(null);

  if (selected) return <ResidenteDetalle residente={selected} onBack={() => setSelected(null)} />;

  return (
    <div>
      <PageHeader
        title="Gestión de Residentes"
        subtitle={`${MOCK_RESIDENTS.length} residentes activos`}
        action={<Btn variant="primary"><Plus className="h-3.5 w-3.5" /> Nuevo Residente</Btn>}
      />
      <Card>
        <DataTable
          columns={["Casa", "Residente", "Contacto", "Estado", "Saldo", "Acciones"]}
          data={MOCK_RESIDENTS}
          renderRow={(row) => {
            const r = row as Resident;
            return (
              <>
                <TD><span className="font-bold text-primary">{r.casa}</span></TD>
                <TD>
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-primary">{r.avatar}</div>
                    <span className="font-semibold text-card-foreground">{r.nombre}</span>
                  </div>
                </TD>
                <TD>
                  <div className="text-xs text-muted-foreground">
                    <div>{r.email}</div>
                    <div>{r.tel}</div>
                  </div>
                </TD>
                <TD>{estadoBadge(r.estado)}</TD>
                <TD>
                  <span className={`font-bold ${r.saldo > 0 ? "text-destructive" : "text-success"}`}>
                    {r.saldo > 0 ? `$${r.saldo.toLocaleString()}` : "Sin adeudo"}
                  </span>
                </TD>
                <TD><Btn size="sm" variant="ghost" onClick={() => setSelected(r)}>Ver perfil</Btn></TD>
              </>
            );
          }}
        />
      </Card>
    </div>
  );
}

function ResidenteDetalle({ residente, onBack }: { residente: Resident; onBack: () => void }) {
  const pagosRes = MOCK_PAGOS.filter(p => p.casa === residente.casa);
  const multasRes = MOCK_MULTAS.filter(m => m.casa === residente.casa);

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Btn variant="ghost" onClick={onBack}>← Volver</Btn>
        <h1 className="text-xl font-extrabold text-card-foreground">Perfil de Residente</h1>
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card>
          <div className="mb-5 text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-xl font-extrabold text-primary">{residente.avatar}</div>
            <h2 className="mb-1 text-base font-extrabold text-card-foreground">{residente.nombre}</h2>
            <div className="mb-2.5 text-[13px] text-muted-foreground">Casa {residente.casa}</div>
            {estadoBadge(residente.estado)}
          </div>
          <div className="border-t border-border pt-4">
            {[
              { label: "Correo", val: residente.email },
              { label: "Teléfono", val: residente.tel },
              { label: "Saldo", val: residente.saldo > 0 ? `$${residente.saldo.toLocaleString()} adeudo` : "Sin adeudo" },
            ].map(item => (
              <div key={item.label} className="mb-3">
                <div className="text-[11px] font-semibold uppercase text-muted-foreground">{item.label}</div>
                <div className="text-[13px] font-semibold text-card-foreground">{item.val}</div>
              </div>
            ))}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <h3 className="mb-3 text-sm font-bold text-card-foreground">Historial de Pagos</h3>
            {pagosRes.length > 0 ? (
              <DataTable columns={["Concepto", "Monto", "Fecha", "Estado"]} data={pagosRes} renderRow={(row) => {
                const p = row as typeof pagosRes[0];
                return (<><TD>{p.concepto}</TD><TD>${p.monto.toLocaleString()}</TD><TD>{p.fecha}</TD><TD>{estadoBadge(p.estado)}</TD></>);
              }} />
            ) : <p className="text-[13px] text-muted-foreground">Sin historial de pagos</p>}
          </Card>
          <Card>
            <h3 className="mb-3 text-sm font-bold text-card-foreground">Multas</h3>
            {multasRes.length > 0 ? (
              <DataTable columns={["Tipo", "Descripción", "Monto", "Estado"]} data={multasRes} renderRow={(row) => {
                const m = row as typeof multasRes[0];
                return (<><TD>{m.tipo}</TD><TD>{m.descripcion}</TD><TD>${m.monto}</TD><TD>{estadoBadge(m.estado)}</TD></>);
              }} />
            ) : <p className="text-[13px] text-muted-foreground">Sin multas registradas</p>}
          </Card>
        </div>
      </div>
    </div>
  );
}
