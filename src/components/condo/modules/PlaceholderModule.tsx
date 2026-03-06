import { PageHeader, Card } from "../SharedComponents";

interface PlaceholderModuleProps {
  title: string;
  subtitle?: string;
}

export default function PlaceholderModule({ title, subtitle }: PlaceholderModuleProps) {
  return (
    <div>
      <PageHeader title={title} subtitle={subtitle || "Este módulo estará disponible próximamente."} />
      <Card>
        <div className="flex min-h-[200px] items-center justify-center text-muted-foreground">
          <p>Contenido del módulo "{title}" — Partes 2 y 3 pendientes.</p>
        </div>
      </Card>
    </div>
  );
}
