import { useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { MOCK_RESIDENTS } from "@/data/mockData";
import { useSmtp } from "@/contexts/SmtpContext";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface RowActionsMultaProps {
  casa: string;
  residente: string;
  tipo: string;
  descripcion: string;
  monto: number;
  fecha: string;
  estado: string;
  onMailSent?: () => void;
  onWhatsAppSent?: () => void;
}

export default function RowActionsMulta({
  casa,
  residente,
  tipo,
  descripcion,
  monto,
  fecha,
  estado,
}: RowActionsMultaProps) {
  const [confirmAction, setConfirmAction] = useState<"mail" | "whatsapp" | null>(null);
  const { smtp } = useSmtp();

  const resident = MOCK_RESIDENTS.find((r) => r.casa === casa);
  const email = resident?.email;
  const tel = resident?.tel;

  const [editableEmail, setEditableEmail] = useState(email || "");

  const openConfirm = (action: "mail" | "whatsapp") => {
    if (action === "mail") setEditableEmail(email || "");
    setConfirmAction(action);
  };

  const handleConfirm = () => {
    if (confirmAction === "mail") {
      const targetEmail = editableEmail.trim();
      if (!targetEmail) {
        toast.error("Ingresa un correo electrónico válido");
        return;
      }

      if (smtp.enabled && smtp.host && smtp.fromEmail) {
        // SMTP mode - simulated, ready for backend
        toast.success(
          `Correo enviado vía SMTP (${smtp.host}) a ${targetEmail}`,
          { description: `Remitente: ${smtp.fromName} <${smtp.fromEmail}>` }
        );
      } else {
        // Fallback: open mailto
        const subject = encodeURIComponent(`Confirmación de multa - Casa ${casa}`);
        const body = encodeURIComponent(
          `Estimado(a) ${residente}:\n\nLa administración del condominio le informa que se ha registrado la siguiente multa o incidencia:\n\nCasa: ${casa}\nTipo: ${tipo}\nDescripción: ${descripcion}\nMonto: $${monto}\nFecha: ${fecha}\nEstado: ${estado}\n\nLe solicitamos atender esta notificación a la brevedad.\n\nAdministración del Condominio`
        );
        window.open(`mailto:${targetEmail}?subject=${subject}&body=${body}`, "_blank");
      }
    }

    if (confirmAction === "whatsapp" && tel) {
      const phone = tel.replace(/[^0-9]/g, "");
      const message = encodeURIComponent(
        `Hola ${residente}, administración del condominio le informa que se ha registrado una multa/incidencia en su vivienda.\n\nCasa: ${casa}\nTipo: ${tipo}\nDescripción: ${descripcion}\nMonto: $${monto}\nFecha: ${fecha}\nEstado: ${estado}\n\nSi tiene alguna duda puede comunicarse con administración.\n\nGracias.`
      );
      window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
    }

    setConfirmAction(null);
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex items-center gap-1.5">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              disabled={!email}
              onClick={() => openConfirm("mail")}
              className="inline-flex items-center gap-1 rounded-md border border-border bg-secondary px-2 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Mail className="h-3 w-3" />
              <span className="hidden sm:inline">Mail</span>
            </button>
          </TooltipTrigger>
          {!email && (
            <TooltipContent><p>Sin correo registrado</p></TooltipContent>
          )}
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              disabled={!tel}
              onClick={() => openConfirm("whatsapp")}
              className="inline-flex items-center gap-1 rounded-md border border-green-200 bg-green-50 px-2 py-1 text-[11px] font-medium text-green-700 transition-colors hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-green-800 dark:bg-green-950 dark:text-green-400 dark:hover:bg-green-900"
            >
              <MessageCircle className="h-3 w-3" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>
          </TooltipTrigger>
          {!tel && (
            <TooltipContent><p>Sin número de WhatsApp registrado</p></TooltipContent>
          )}
        </Tooltip>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={!!confirmAction} onOpenChange={() => setConfirmAction(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar envío</DialogTitle>
            <DialogDescription>
              ¿Deseas enviar esta notificación al residente{" "}
              <span className="font-semibold text-foreground">{residente}</span> por{" "}
              <span className="font-semibold text-foreground">
                {confirmAction === "mail" ? "correo electrónico" : "WhatsApp"}
              </span>?
            </DialogDescription>
          </DialogHeader>

          {confirmAction === "mail" && (
            <div className="space-y-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Correo del destinatario
                </label>
                <input
                  type="email"
                  value={editableEmail}
                  onChange={e => setEditableEmail(e.target.value)}
                  placeholder="correo@ejemplo.com"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-[13px] text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              {smtp.enabled && (
                <div className="rounded-lg border border-accent bg-accent/30 px-3 py-2 text-[12px] text-accent-foreground">
                  <Mail className="mr-1 inline-block h-3 w-3" />
                  Se enviará vía SMTP: <span className="font-semibold">{smtp.fromName}</span> &lt;{smtp.fromEmail}&gt;
                </div>
              )}
              {!smtp.enabled && (
                <div className="rounded-lg border border-border bg-muted px-3 py-2 text-[12px] text-muted-foreground">
                  SMTP no configurado — se abrirá tu cliente de correo local.
                </div>
              )}
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setConfirmAction(null)}>
              Cancelar
            </Button>
            <Button onClick={handleConfirm}>Confirmar envío</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
