import { MOCK_RESIDENTS, MOCK_PAGOS, MOCK_MULTAS, MOCK_TICKETS, MOCK_VISITAS, MOCK_RESERVAS, MOCK_AVISOS } from "@/data/mockData";
import { Card, StatCard, PageHeader, Btn, estadoBadge } from "@/components/condo/SharedComponents";
import { Building2, CheckCircle, AlertTriangle, DollarSign, Shield, Wrench, Bell } from "lucide-react";

interface DashboardProps {
  onNav: (id: string) => void;
}

export default function Dashboard({ onNav }: DashboardProps) {
  const totalCasas = MOCK_RESIDENTS.length;
  const alCorriente = MOCK_RESIDENTS.filter(r => r.estado === "al_corriente").length;
  const conAdeudo = MOCK_RESIDENTS.filter(r => r.estado === "adeudo").length;
  const ingresosMes = MOCK_PAGOS.filter(p => p.estado === "pagado").reduce((s, p) => s + p.monto, 0);
  const multasActivas = MOCK_MULTAS.filter(m => m.estado === "pendiente").length;
  const ticketsAbiertos = MOCK_TICKETS.filter(t => t.estado !== "resuelto").length;

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Resumen general del condominio · Enero 2025" />

      {/* Stat Cards */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Total Viviendas" value={totalCasas} icon={<Building2 className="h-5 w-5" />} color="primary" sub="de 100 registradas" />
        <StatCard label="Al Corriente" value={alCorriente} icon={<CheckCircle className="h-5 w-5" />} color="success" sub={`${Math.round(alCorriente / totalCasas * 100)}% del total`} />
        <StatCard label="Con Adeudo" value={conAdeudo} icon={<AlertTriangle className="h-5 w-5" />} color="destructive" sub="requieren atención" />
        <StatCard label="Ingresos del Mes" value={`$${ingresosMes.toLocaleString()}`} icon={<DollarSign className="h-5 w-5" />} color="warning" sub="pagos confirmados" />
        <StatCard label="Multas Activas" value={multasActivas} icon={<Shield className="h-5 w-5" />} color="primary" sub="por cobrar" />
        <StatCard label="Tickets Abiertos" value={ticketsAbiertos} icon={<Wrench className="h-5 w-5" />} color="warning" sub="pendientes de atención" />
      </div>

      {/* Avisos + Adeudos */}
      <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[15px] font-bold text-card-foreground">Avisos Recientes</h3>
            <Btn variant="ghost" size="sm" onClick={() => onNav("avisos")}>Ver todos</Btn>
          </div>
          {MOCK_AVISOS.slice(0, 3).map(a => (
            <div key={a.id} className="flex gap-3 border-b border-border py-2.5">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-accent">
                <Bell className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-semibold text-card-foreground">{a.titulo}</div>
                <div className="text-[11px] text-muted-foreground">{a.fecha} · {a.autor}</div>
              </div>
              {a.urgente && (
                <span className="self-start rounded-full bg-red-100 px-2.5 py-0.5 text-[11px] font-semibold text-red-800">Urgente</span>
              )}
            </div>
          ))}
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[15px] font-bold text-card-foreground">Residentes con Adeudo</h3>
            <Btn variant="ghost" size="sm" onClick={() => onNav("estados")}>Ver estados</Btn>
          </div>
          {MOCK_RESIDENTS.filter(r => r.estado === "adeudo" || r.estado === "parcial").slice(0, 4).map(r => (
            <div key={r.id} className="flex items-center gap-2.5 border-b border-border py-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-[11px] font-bold text-red-800">
                {r.avatar}
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-semibold text-card-foreground">{r.nombre} · {r.casa}</div>
                <div className="text-xs font-bold text-destructive">Adeudo: ${r.saldo.toLocaleString()}</div>
              </div>
              {estadoBadge(r.estado)}
            </div>
          ))}
        </Card>
      </div>

      {/* Tickets + Visitas + Reservas */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card>
          <h3 className="mb-3.5 text-[15px] font-bold text-card-foreground">Tickets Recientes</h3>
          {MOCK_TICKETS.slice(0, 3).map(tk => (
            <div key={tk.id} className="flex items-center justify-between border-b border-border py-2">
              <div>
                <div className="text-xs font-semibold text-card-foreground">{tk.categoria} · {tk.casa}</div>
                <div className="text-[11px] text-muted-foreground">{tk.descripcion.slice(0, 35)}...</div>
              </div>
              {estadoBadge(tk.estado)}
            </div>
          ))}
        </Card>

        <Card>
          <h3 className="mb-3.5 text-[15px] font-bold text-card-foreground">Visitas de Hoy</h3>
          {MOCK_VISITAS.slice(0, 3).map(v => (
            <div key={v.id} className="flex items-center justify-between border-b border-border py-2">
              <div>
                <div className="text-xs font-semibold text-card-foreground">{v.visitante}</div>
                <div className="text-[11px] text-muted-foreground">Casa {v.casa} · {v.hora}</div>
              </div>
              {estadoBadge(v.estado)}
            </div>
          ))}
        </Card>

        <Card>
          <h3 className="mb-3.5 text-[15px] font-bold text-card-foreground">Próximas Reservas</h3>
          {MOCK_RESERVAS.slice(0, 3).map(r => (
            <div key={r.id} className="border-b border-border py-2">
              <div className="text-xs font-semibold text-card-foreground">{r.area} · {r.casa}</div>
              <div className="text-[11px] text-muted-foreground">{r.fecha} · {r.hora}</div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
