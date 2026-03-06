import { MOCK_CORREOS, Correo } from "@/data/mockData";
import { Card, PageHeader, DataTable, TD, Badge } from "@/components/condo/SharedComponents";

const TIPO_VARIANT: Record<string, "info" | "destructive" | "warning" | "success"> = {
  aviso: "info", adeudo: "destructive", multa: "warning", reserva: "success",
};

export default function BitacoraCorreos() {
  return (
    <div>
      <PageHeader title="Bitácora de Correos" subtitle="Registro de comunicaciones enviadas (simulación)" />
      <Card>
        <div className="mb-4 rounded-lg border border-amber-300 bg-amber-50 px-3.5 py-2.5 text-[13px] text-amber-800">
          📧 Esta es una simulación visual. No se envían correos reales.
        </div>
        <DataTable
          columns={["Destinatario", "Asunto", "Fecha", "Tipo", "Estado"]}
          data={MOCK_CORREOS}
          renderRow={(row) => {
            const c = row as Correo;
            return (
              <>
                <TD>{c.destinatario}</TD>
                <TD><span className="font-semibold">{c.asunto}</span></TD>
                <TD>{c.fecha}</TD>
                <TD><Badge variant={TIPO_VARIANT[c.tipo] || "muted"}>{c.tipo}</Badge></TD>
                <TD><Badge variant="success">✓ Enviado</Badge></TD>
              </>
            );
          }}
        />
      </Card>
    </div>
  );
}
