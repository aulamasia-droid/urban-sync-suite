import { useState } from "react";
import { MOCK_RESIDENTS, MOCK_PAGOS, MOCK_MULTAS, Resident } from "@/data/mockData";
import { Card, PageHeader, Btn, DataTable, TD, estadoBadge } from "@/components/condo/SharedComponents";

export default function EstadosCuenta() {
  const [selected, setSelected] = useState<Resident | null>(null);

  if (selected) {
    const pagosRes = MOCK_PAGOS.filter(p => p.casa === selected.casa);
    const multasRes = MOCK_MULTAS.filter(m => m.casa === selected.casa && m.estado === "pendiente");
    const totalPagado = pagosRes.filter(p => p.estado === "pagado").reduce((s, p) => s + p.monto, 0);
    const totalMultas = multasRes.reduce((s, m) => s + m.monto, 0);

    const items = [
      { label: "Cuota Mensual", monto: 1200, tipo: "cargo" },
      { label: "Pagos Realizados", monto: totalPagado, tipo: "abono" },
      { label: "Multas Pendientes", monto: totalMultas, tipo: "cargo" },
    ];

    return (
      <div>
        <div className="mb-6 flex items-center gap-3">
          <Btn variant="ghost" onClick={() => setSelected(null)}>← Volver</Btn>
          <h1 className="text-xl font-extrabold text-card-foreground">Estado de Cuenta · {selected.casa}</h1>
        </div>
        <Card className="max-w-[600px]">
          <div className="mb-5 flex items-start justify-between border-b border-border pb-4">
            <div>
              <h2 className="mb-1 text-lg font-extrabold text-card-foreground">{selected.nombre}</h2>
              <p className="text-[13px] text-muted-foreground">Casa {selected.casa} · Enero 2025</p>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Saldo Final</div>
              <div className={`text-2xl font-extrabold ${selected.saldo > 0 ? "text-destructive" : "text-success"}`}>
                {selected.saldo > 0 ? `-$${selected.saldo.toLocaleString()}` : "$0.00"}
              </div>
            </div>
          </div>
          {items.map((item, i) => (
            <div key={i} className="flex items-center justify-between border-b border-border py-2.5">
              <span className="text-sm text-card-foreground">{item.label}</span>
              <span className={`text-sm font-bold ${item.tipo === "cargo" ? "text-destructive" : "text-success"}`}>
                {item.tipo === "cargo" ? "-" : "+"}${item.monto.toLocaleString()}
              </span>
            </div>
          ))}
          <div className="mt-5 flex gap-2.5">
            <Btn variant="primary">Registrar Pago</Btn>
            <Btn variant="ghost">Descargar PDF</Btn>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Estados de Cuenta" subtitle="Consulta el estado financiero de cada residente" />
      <Card>
        <DataTable
          columns={["Casa", "Residente", "Cuota", "Adeudo", "Estado", "Acciones"]}
          data={MOCK_RESIDENTS}
          renderRow={(row) => {
            const r = row as Resident;
            return (
              <>
                <TD><span className="font-bold text-primary">{r.casa}</span></TD>
                <TD><span className="font-semibold">{r.nombre}</span></TD>
                <TD>$1,200</TD>
                <TD>
                  <span className={`font-bold ${r.saldo > 0 ? "text-destructive" : "text-success"}`}>
                    {r.saldo > 0 ? `$${r.saldo.toLocaleString()}` : "$0"}
                  </span>
                </TD>
                <TD>{estadoBadge(r.estado)}</TD>
                <TD><Btn size="sm" variant="ghost" onClick={() => setSelected(r)}>Ver cuenta</Btn></TD>
              </>
            );
          }}
        />
      </Card>
    </div>
  );
}
