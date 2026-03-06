import { useState } from "react";
import { MOCK_PAGOS, Pago } from "@/data/mockData";
import { Card, PageHeader, Btn, DataTable, TD, estadoBadge } from "@/components/condo/SharedComponents";
import { Plus } from "lucide-react";

export default function Pagos() {
  const [modal, setModal] = useState<Pago | null>(null);

  return (
    <div>
      <PageHeader
        title="Gestión de Pagos"
        subtitle="Control de pagos y cuotas del condominio"
        action={<Btn variant="primary"><Plus className="h-3.5 w-3.5" /> Registrar Pago</Btn>}
      />

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50">
          <Card className="w-[400px]">
            <div className="mb-5 text-center">
              <div className="mb-2 text-4xl">💳</div>
              <h3 className="text-lg font-extrabold text-card-foreground">Simulación de Pago</h3>
              <p className="text-[13px] text-muted-foreground">Pago para: {modal.residente}</p>
              <div className="my-2 text-3xl font-extrabold text-primary">${modal.monto.toLocaleString()}</div>
            </div>
            <div className="mb-4 rounded-lg bg-[#003087] p-4 text-center">
              <div className="text-lg font-extrabold text-white">PayPal</div>
              <div className="text-xs text-white/70">Simulación de pago · No real</div>
            </div>
            <div className="flex gap-2.5">
              <Btn variant="primary" onClick={() => { alert("✅ Pago simulado registrado exitosamente"); setModal(null); }}>
                Confirmar Pago Simulado
              </Btn>
              <Btn variant="ghost" onClick={() => setModal(null)}>Cancelar</Btn>
            </div>
          </Card>
        </div>
      )}

      <Card>
        <DataTable
          columns={["Casa", "Residente", "Concepto", "Monto", "Fecha", "Estado", "Acciones"]}
          data={MOCK_PAGOS}
          renderRow={(row) => {
            const p = row as Pago;
            return (
              <>
                <TD><span className="font-bold text-primary">{p.casa}</span></TD>
                <TD>{p.residente}</TD>
                <TD>{p.concepto}</TD>
                <TD><span className="font-bold">${p.monto.toLocaleString()}</span></TD>
                <TD>{p.fecha}</TD>
                <TD>{estadoBadge(p.estado)}</TD>
                <TD>
                  {p.estado !== "pagado" && (
                    <Btn size="sm" variant="success" onClick={() => setModal(p)}>Pagar</Btn>
                  )}
                </TD>
              </>
            );
          }}
        />
      </Card>
    </div>
  );
}
