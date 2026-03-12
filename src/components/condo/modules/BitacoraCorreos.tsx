import { useState } from "react";
import { MOCK_CORREOS, MOCK_RESIDENTS, MOCK_MULTAS, Correo } from "@/data/mockData";
import { Card, PageHeader, Btn, DataTable, TD, Badge } from "@/components/condo/SharedComponents";
import { MessageSquare, Mail, Paperclip } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const TIPO_VARIANT: Record<string, "info" | "destructive" | "warning" | "success"> = {
  aviso: "info", adeudo: "destructive", multa: "warning", reserva: "success",
};

const DESTINATARIO_OPTIONS = [
  { value: "todos", label: "Todos los residentes" },
  { value: "adeudo", label: "Residentes con adeudo" },
  { value: "multa", label: "Residentes con multa pendiente" },
  { value: "casa", label: "Casa específica" },
  { value: "residente", label: "Residente específico" },
];

export default function BitacoraCorreos() {
  const [correos, setCorreos] = useState(MOCK_CORREOS);
  const [showModal, setShowModal] = useState(false);
  const [dest, setDest] = useState("todos");
  const [casaSel, setCasaSel] = useState("");
  const [residenteSel, setResidenteSel] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [archivo, setArchivo] = useState<string | null>(null);

  const casas = [...new Set(MOCK_RESIDENTS.map(r => r.casa))].sort();

  const resetForm = () => {
    setDest("todos");
    setCasaSel("");
    setResidenteSel("");
    setMensaje("");
    setArchivo(null);
  };

  const getDestinatarioLabel = () => {
    if (dest === "todos") return "Todos los residentes";
    if (dest === "adeudo") return "Residentes con adeudo";
    if (dest === "multa") return "Residentes con multa pendiente";
    if (dest === "casa") return casaSel ? `Casa ${casaSel}` : "";
    if (dest === "residente") {
      const r = MOCK_RESIDENTS.find(r => r.nombre === residenteSel);
      return r ? `${r.nombre} (${r.casa})` : "";
    }
    return "";
  };

  const handleSend = () => {
    const destinatario = getDestinatarioLabel();
    if (!destinatario || !mensaje.trim()) {
      toast.error("Completa todos los campos requeridos");
      return;
    }

    const now = new Date();
    const fecha = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const nuevo: Correo = {
      id: correos.length + 1,
      destinatario,
      asunto: mensaje.length > 50 ? mensaje.substring(0, 50) + "..." : mensaje,
      fecha,
      estado: "enviado",
      tipo: "aviso",
      canal: "whatsapp",
    };

    setCorreos([nuevo, ...correos]);
    setShowModal(false);
    resetForm();
    toast.success("Aviso por WhatsApp registrado en bitácora");
  };

  return (
    <div>
      <PageHeader
        title="Bitácora de Correos"
        subtitle="Registro de comunicaciones enviadas (simulación)"
        action={
          <div className="flex gap-2">
            <Btn variant="success" onClick={() => setShowModal(true)}>
              <MessageSquare className="h-3.5 w-3.5" /> Aviso WhatsApp
            </Btn>
          </div>
        }
      />
      <Card>
        <div className="mb-4 rounded-lg border border-amber-300 bg-amber-50 px-3.5 py-2.5 text-[13px] text-amber-800">
          📧 Esta es una simulación visual. No se envían correos ni mensajes reales.
        </div>
        <DataTable
          columns={["Canal", "Destinatario", "Asunto", "Fecha", "Tipo", "Estado"]}
          data={correos}
          renderRow={(row) => {
            const c = row as Correo;
            return (
              <>
                <TD>
                  {c.canal === "whatsapp" ? (
                    <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-emerald-700">
                      <MessageSquare className="h-3.5 w-3.5" /> WhatsApp
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-muted-foreground">
                      <Mail className="h-3.5 w-3.5" /> Correo
                    </span>
                  )}
                </TD>
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

      {/* Modal Aviso WhatsApp */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-emerald-600" />
              Enviar Aviso por WhatsApp
            </DialogTitle>
            <DialogDescription>
              Selecciona los destinatarios, escribe el mensaje y registra el envío.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Destinatarios */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Destinatarios</label>
              <select
                value={dest}
                onChange={(e) => setDest(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-[13px] text-foreground outline-none focus:ring-2 focus:ring-ring"
              >
                {DESTINATARIO_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {dest === "casa" && (
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Seleccionar Casa</label>
                <select
                  value={casaSel}
                  onChange={(e) => setCasaSel(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-[13px] text-foreground outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">— Seleccionar —</option>
                  {casas.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            )}

            {dest === "residente" && (
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Seleccionar Residente</label>
                <select
                  value={residenteSel}
                  onChange={(e) => setResidenteSel(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-[13px] text-foreground outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">— Seleccionar —</option>
                  {MOCK_RESIDENTS.map(r => (
                    <option key={r.id} value={r.nombre}>{r.nombre} ({r.casa})</option>
                  ))}
                </select>
              </div>
            )}

            {/* Mensaje */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Mensaje</label>
              <Textarea
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Estimados residentes, les informamos que..."
                className="min-h-[120px] text-[13px]"
              />
            </div>

            {/* Adjuntar archivo (simulado) */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Adjuntar documento (opcional)</label>
              <button
                onClick={() => setArchivo(archivo ? null : "documento_adjunto.pdf")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-input bg-background px-3 py-2 text-[13px] text-muted-foreground transition hover:bg-accent"
              >
                <Paperclip className="h-3.5 w-3.5" />
                {archivo ? archivo : "Adjuntar archivo"}
              </button>
              {archivo && (
                <span
                  className="ml-2 cursor-pointer text-xs text-destructive hover:underline"
                  onClick={() => setArchivo(null)}
                >
                  Quitar
                </span>
              )}
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => { setShowModal(false); resetForm(); }}>
              Cancelar
            </Button>
            <Button
              onClick={handleSend}
              className="bg-emerald-600 text-white hover:bg-emerald-700"
            >
              <MessageSquare className="mr-1.5 h-4 w-4" />
              Enviar por WhatsApp
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
