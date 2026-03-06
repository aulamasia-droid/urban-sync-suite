import { MOCK_DOCUMENTOS } from "@/data/mockData";
import { Card, PageHeader, Btn, Badge } from "@/components/condo/SharedComponents";
import { Plus } from "lucide-react";

const TIPO_EMOJI: Record<string, string> = { reglamento: "📋", acta: "📄", financiero: "💰", circular: "📢", contrato: "📝" };
const TIPO_VARIANT: Record<string, "info" | "warning" | "success" | "destructive" | "muted"> = {
  reglamento: "info", acta: "muted", financiero: "success", circular: "warning", contrato: "destructive",
};

export default function Documentos() {
  return (
    <div>
      <PageHeader
        title="Documentos del Condominio"
        subtitle="Reglamentos, actas y circulares"
        action={<Btn variant="primary"><Plus className="h-3.5 w-3.5" /> Subir Documento</Btn>}
      />
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_DOCUMENTOS.map(doc => (
          <Card key={doc.id} className="cursor-pointer transition-colors hover:bg-secondary/50">
            <div className="flex items-start gap-3.5">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-accent text-xl">
                {TIPO_EMOJI[doc.tipo] || "📄"}
              </div>
              <div className="flex-1">
                <div className="mb-1 text-sm font-bold text-card-foreground">{doc.nombre}</div>
                <div className="mb-2">
                  <Badge variant={TIPO_VARIANT[doc.tipo] || "muted"}>{doc.tipo}</Badge>
                </div>
                <div className="text-[11px] text-muted-foreground">{doc.fecha} · {doc.tamaño}</div>
              </div>
            </div>
            <div className="mt-3 flex gap-2 border-t border-border pt-3">
              <Btn variant="ghost" size="sm">Descargar</Btn>
              <Btn variant="ghost" size="sm">Ver</Btn>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
