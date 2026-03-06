import { useState } from "react";
import { MOCK_CHAT, ChatMessage } from "@/data/mockData";
import { Card, PageHeader, Btn } from "@/components/condo/SharedComponents";

const CANALES = ["administracion", "seguridad", "mantenimiento"];

export default function Chat() {
  const [canal, setCanal] = useState("administracion");
  const [msgs, setMsgs] = useState<ChatMessage[]>(MOCK_CHAT);
  const [input, setInput] = useState("");

  const filtrados = msgs.filter(m => m.canal === canal);

  const sendMsg = () => {
    if (!input.trim()) return;
    setMsgs([...msgs, {
      id: Date.now(), canal, autor: "Tú", avatar: "TU", mensaje: input,
      hora: new Date().toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" }),
      propio: true,
    }]);
    setInput("");
  };

  return (
    <div>
      <PageHeader title="Chat Interno" subtitle="Comunicación en tiempo real (simulación)" />
      <Card className="flex h-[calc(100vh-220px)] overflow-hidden !p-0">
        {/* Channels */}
        <div className="w-[180px] flex-shrink-0 border-r border-border p-3">
          <div className="mb-2 px-2 text-[11px] font-bold uppercase text-muted-foreground">Canales</div>
          {CANALES.map(c => (
            <button
              key={c}
              onClick={() => setCanal(c)}
              className={`mb-0.5 w-full rounded-md px-2.5 py-2 text-left text-[13px] transition-colors ${
                canal === c ? "bg-primary/10 font-semibold text-primary" : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              # {c}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
            {filtrados.map(m => (
              <div key={m.id} className={`flex gap-2.5 ${m.propio ? "flex-row-reverse" : ""}`}>
                <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                  m.propio ? "bg-primary text-primary-foreground" : "bg-accent text-primary"
                }`}>
                  {m.avatar}
                </div>
                <div className="max-w-[60%]">
                  <div className={`mb-1 flex items-center gap-1.5 ${m.propio ? "flex-row-reverse" : ""}`}>
                    <span className="text-xs font-semibold text-card-foreground">{m.autor}</span>
                    <span className="text-[11px] text-muted-foreground">{m.hora}</span>
                  </div>
                  <div className={`rounded-xl px-3 py-2 text-[13px] ${
                    m.propio
                      ? "rounded-tr-sm bg-primary text-primary-foreground"
                      : "rounded-tl-sm border border-border bg-background text-card-foreground"
                  }`}>
                    {m.mensaje}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2.5 border-t border-border p-3">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMsg()}
              placeholder="Escribe un mensaje..."
              className="flex-1 rounded-lg border border-input bg-background px-3.5 py-2.5 text-[13px] text-foreground outline-none placeholder:text-muted-foreground"
            />
            <Btn variant="primary" onClick={sendMsg}>Enviar</Btn>
          </div>
        </div>
      </Card>
    </div>
  );
}
