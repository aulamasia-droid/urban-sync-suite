import { useState } from "react";
import { MOCK_RESIDENTS } from "@/data/mockData";
import { Card, PageHeader, Btn, estadoBadge } from "@/components/condo/SharedComponents";
import { Plus, Search } from "lucide-react";

export default function Casas() {
  const [search, setSearch] = useState("");
  const filtered = MOCK_RESIDENTS.filter(r =>
    r.casa.toLowerCase().includes(search.toLowerCase()) ||
    r.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Gestión de Casas"
        subtitle={`${MOCK_RESIDENTS.length} viviendas registradas`}
        action={<Btn variant="primary"><Plus className="h-3.5 w-3.5" /> Nueva Casa</Btn>}
      />
      <Card>
        <div className="mb-4 flex gap-3">
          <div className="flex max-w-[280px] flex-1 items-center gap-2 rounded-lg border border-input bg-background px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar casa o residente..."
              className="w-full bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map(r => (
            <div key={r.id} className="cursor-pointer rounded-xl border border-border bg-background p-4 transition-colors hover:bg-secondary">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="rounded-md bg-accent px-2.5 py-1 text-sm font-extrabold text-primary">{r.casa}</span>
                {estadoBadge(r.estado)}
              </div>
              <div className="mb-1 text-sm font-semibold text-card-foreground">{r.nombre}</div>
              <div className="mb-2 text-xs text-muted-foreground">{r.email}</div>
              {r.saldo > 0
                ? <div className="text-[13px] font-bold text-destructive">Adeudo: ${r.saldo.toLocaleString()}</div>
                : <div className="text-xs text-success">Sin adeudos ✓</div>
              }
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
