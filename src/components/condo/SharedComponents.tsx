import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`rounded-xl border border-border bg-card p-5 ${className}`}>
      {children}
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  color: "primary" | "success" | "warning" | "destructive";
  sub?: string;
}

const colorMap = {
  primary: { bg: "bg-primary/10", text: "text-primary" },
  success: { bg: "bg-success/10", text: "text-success" },
  warning: { bg: "bg-warning/10", text: "text-warning" },
  destructive: { bg: "bg-destructive/10", text: "text-destructive" },
};

export function StatCard({ label, value, icon, color, sub }: StatCardProps) {
  const c = colorMap[color];
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div className={`rounded-lg p-2.5 ${c.bg} ${c.text}`}>{icon}</div>
      </div>
      <div className="mt-3">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className={`text-2xl font-bold ${c.text}`}>{value}</p>
        {sub && <p className="mt-0.5 text-[11px] text-muted-foreground">{sub}</p>}
      </div>
    </Card>
  );
}

interface BadgeProps {
  variant: "success" | "destructive" | "warning" | "info" | "muted";
  children: ReactNode;
}

const badgeColors = {
  success: "bg-emerald-100 text-emerald-800",
  destructive: "bg-red-100 text-red-800",
  warning: "bg-amber-100 text-amber-800",
  info: "bg-blue-100 text-blue-800",
  muted: "bg-secondary text-secondary-foreground",
};

export function Badge({ variant, children }: BadgeProps) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${badgeColors[variant]}`}>
      {children}
    </span>
  );
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-card-foreground">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

interface BtnProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost" | "danger" | "success";
  size?: "sm" | "md" | "lg";
}

export function Btn({ children, onClick, variant = "primary", size = "md" }: BtnProps) {
  const base = "inline-flex items-center gap-1.5 rounded-lg font-medium transition-all cursor-pointer";
  const sizes = { sm: "px-3 py-1 text-xs", md: "px-4 py-2 text-sm", lg: "px-5 py-2.5 text-sm" };
  const variants = {
    primary: "bg-primary text-primary-foreground hover:opacity-90",
    outline: "border-2 border-primary text-primary hover:bg-primary/5",
    ghost: "border border-border bg-secondary text-secondary-foreground hover:bg-accent",
    danger: "bg-destructive text-destructive-foreground hover:opacity-90",
    success: "bg-success text-success-foreground hover:opacity-90",
  };
  return (
    <button onClick={onClick} className={`${base} ${sizes[size]} ${variants[variant]}`}>
      {children}
    </button>
  );
}

interface DataTableProps {
  columns: string[];
  data: unknown[];
  renderRow: (row: unknown, index: number) => ReactNode;
}

export function DataTable({ columns, data, renderRow }: DataTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-secondary">
            {columns.map(col => (
              <th key={col} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/50">
              {renderRow(row, i)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TD({ children }: { children: ReactNode }) {
  return <td className="px-4 py-3 text-card-foreground">{children}</td>;
}

export function estadoBadge(estado: string) {
  const map: Record<string, { variant: BadgeProps["variant"]; label: string }> = {
    al_corriente: { variant: "success", label: "Al Corriente" },
    adeudo: { variant: "destructive", label: "Con Adeudo" },
    parcial: { variant: "warning", label: "Pago Parcial" },
    pendiente: { variant: "warning", label: "Pendiente" },
    pagado: { variant: "success", label: "Pagado" },
    vencido: { variant: "destructive", label: "Vencido" },
    confirmada: { variant: "info", label: "Confirmada" },
    abierto: { variant: "warning", label: "Abierto" },
    en_proceso: { variant: "info", label: "En Proceso" },
    resuelto: { variant: "success", label: "Resuelto" },
    pagada: { variant: "success", label: "Pagada" },
    "ingresó": { variant: "info", label: "Ingresó" },
    "salió": { variant: "muted", label: "Salió" },
  };
  const s = map[estado] || { variant: "muted" as const, label: estado };
  return <Badge variant={s.variant}>{s.label}</Badge>;
}
