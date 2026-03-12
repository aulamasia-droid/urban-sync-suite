import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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

interface SmtpContextType {
  smtp: SmtpConfig;
  setSmtp: (config: SmtpConfig) => void;
}

const SmtpContext = createContext<SmtpContextType>({ smtp: DEFAULT_SMTP, setSmtp: () => {} });

export function SmtpProvider({ children }: { children: ReactNode }) {
  const [smtp, setSmtpState] = useState<SmtpConfig>(() => {
    try {
      const saved = localStorage.getItem("smtp_config");
      return saved ? { ...DEFAULT_SMTP, ...JSON.parse(saved) } : DEFAULT_SMTP;
    } catch {
      return DEFAULT_SMTP;
    }
  });

  const setSmtp = (config: SmtpConfig) => {
    setSmtpState(config);
    localStorage.setItem("smtp_config", JSON.stringify(config));
  };

  return <SmtpContext.Provider value={{ smtp, setSmtp }}>{children}</SmtpContext.Provider>;
}

export const useSmtp = () => useContext(SmtpContext);
