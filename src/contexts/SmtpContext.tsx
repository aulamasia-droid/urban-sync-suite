import { createContext, useContext, useState, ReactNode } from "react";

export interface SmtpConfig {
  enabled: boolean;
  host: string;
  port: string;
  user: string;
  password: string;
  fromEmail: string;
  fromName: string;
  secure: boolean;
}

export interface WhatsAppWebhookConfig {
  enabled: boolean;
  url: string;
}

const DEFAULT_SMTP: SmtpConfig = {
  enabled: false,
  host: "",
  port: "587",
  user: "",
  password: "",
  fromEmail: "",
  fromName: "Administración del Condominio",
  secure: true,
};

const DEFAULT_WEBHOOK: WhatsAppWebhookConfig = {
  enabled: false,
  url: "",
};

interface SmtpContextType {
  smtp: SmtpConfig;
  setSmtp: (config: SmtpConfig) => void;
  webhook: WhatsAppWebhookConfig;
  setWebhook: (config: WhatsAppWebhookConfig) => void;
}

const SmtpContext = createContext<SmtpContextType>({
  smtp: DEFAULT_SMTP,
  setSmtp: () => {},
  webhook: DEFAULT_WEBHOOK,
  setWebhook: () => {},
});

export function SmtpProvider({ children }: { children: ReactNode }) {
  const [smtp, setSmtpState] = useState<SmtpConfig>(() => {
    try {
      const saved = localStorage.getItem("smtp_config");
      return saved ? { ...DEFAULT_SMTP, ...JSON.parse(saved) } : DEFAULT_SMTP;
    } catch {
      return DEFAULT_SMTP;
    }
  });

  const [webhook, setWebhookState] = useState<WhatsAppWebhookConfig>(() => {
    try {
      const saved = localStorage.getItem("whatsapp_webhook_config");
      return saved ? { ...DEFAULT_WEBHOOK, ...JSON.parse(saved) } : DEFAULT_WEBHOOK;
    } catch {
      return DEFAULT_WEBHOOK;
    }
  });

  const setSmtp = (config: SmtpConfig) => {
    setSmtpState(config);
    localStorage.setItem("smtp_config", JSON.stringify(config));
  };

  const setWebhook = (config: WhatsAppWebhookConfig) => {
    setWebhookState(config);
    localStorage.setItem("whatsapp_webhook_config", JSON.stringify(config));
  };

  return (
    <SmtpContext.Provider value={{ smtp, setSmtp, webhook, setWebhook }}>
      {children}
    </SmtpContext.Provider>
  );
}

export const useSmtp = () => useContext(SmtpContext);
