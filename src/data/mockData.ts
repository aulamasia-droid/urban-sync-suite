export interface Resident {
  id: number; casa: string; nombre: string; email: string; tel: string; estado: string; saldo: number; avatar: string;
}
export interface Pago {
  id: number; residente: string; casa: string; concepto: string; monto: number; fecha: string; estado: string;
}
export interface Multa {
  id: number; casa: string; residente: string; tipo: string; descripcion: string; monto: number; fecha: string; estado: string;
  mail_enviado?: boolean; whatsapp_enviado?: boolean; fecha_ultimo_envio?: string;
}
export interface Aviso {
  id: number; titulo: string; tipo: string; contenido: string; fecha: string; autor: string; urgente: boolean;
}
export interface Ticket {
  id: number; casa: string; residente: string; categoria: string; descripcion: string; prioridad: string; estado: string; fecha: string;
}
export interface Reserva {
  id: number; casa: string; residente: string; area: string; fecha: string; hora: string; estado: string;
}
export interface Visita {
  id: number; casa: string; residente: string; visitante: string; fecha: string; hora: string; estado: string;
}
export interface ChatMessage {
  id: number; canal: string; autor: string; avatar: string; mensaje: string; hora: string; propio: boolean;
}
export interface Correo {
  id: number; destinatario: string; asunto: string; fecha: string; estado: string; tipo: string; canal: "correo" | "whatsapp";
}
export interface Documento {
  id: number; nombre: string; tipo: string; fecha: string; tamaño: string;
}
export interface RolDemo {
  id: string; nombre: string; email: string; password: string; color: string;
}

export const MOCK_RESIDENTS: Resident[] = [
  { id: 1, casa: "A-01", nombre: "Carlos Mendoza", email: "carlos@email.com", tel: "555-0101", estado: "al_corriente", saldo: 0, avatar: "CM" },
  { id: 2, casa: "A-02", nombre: "María García", email: "maria@email.com", tel: "555-0102", estado: "adeudo", saldo: 2400, avatar: "MG" },
  { id: 3, casa: "A-03", nombre: "Roberto López", email: "roberto@email.com", tel: "555-0103", estado: "al_corriente", saldo: 0, avatar: "RL" },
  { id: 4, casa: "A-04", nombre: "Ana Martínez", email: "ana@email.com", tel: "555-0104", estado: "parcial", saldo: 800, avatar: "AM" },
  { id: 5, casa: "A-05", nombre: "Luis Hernández", email: "luis@email.com", tel: "555-0105", estado: "adeudo", saldo: 4800, avatar: "LH" },
  { id: 6, casa: "A-06", nombre: "Patricia Ruiz", email: "patricia@email.com", tel: "555-0106", estado: "al_corriente", saldo: 0, avatar: "PR" },
  { id: 7, casa: "B-01", nombre: "Jorge Sánchez", email: "jorge@email.com", tel: "555-0107", estado: "al_corriente", saldo: 0, avatar: "JS" },
  { id: 8, casa: "B-02", nombre: "Laura Torres", email: "laura@email.com", tel: "555-0108", estado: "adeudo", saldo: 1200, avatar: "LT" },
  { id: 9, casa: "B-03", nombre: "Miguel Flores", email: "miguel@email.com", tel: "555-0109", estado: "al_corriente", saldo: 0, avatar: "MF" },
  { id: 10, casa: "B-04", nombre: "Carmen Díaz", email: "carmen@email.com", tel: "555-0110", estado: "al_corriente", saldo: 0, avatar: "CD" },
  { id: 11, casa: "B-05", nombre: "Fernando Vega", email: "fernando@email.com", tel: "555-0111", estado: "parcial", saldo: 400, avatar: "FV" },
  { id: 12, casa: "B-06", nombre: "Sofía Morales", email: "sofia@email.com", tel: "555-0112", estado: "al_corriente", saldo: 0, avatar: "SM" },
  { id: 13, casa: "C-01", nombre: "David Ortiz", email: "david@email.com", tel: "555-0113", estado: "adeudo", saldo: 3600, avatar: "DO" },
  { id: 14, casa: "C-02", nombre: "Isabel Castro", email: "isabel@email.com", tel: "555-0114", estado: "al_corriente", saldo: 0, avatar: "IC" },
  { id: 15, casa: "C-03", nombre: "Ricardo Jiménez", email: "ricardo@email.com", tel: "555-0115", estado: "al_corriente", saldo: 0, avatar: "RJ" },
];

export const MOCK_PAGOS: Pago[] = [
  { id: 1, residente: "Carlos Mendoza", casa: "A-01", concepto: "Cuota Mensual", monto: 1200, fecha: "2025-01-05", estado: "pagado" },
  { id: 2, residente: "María García", casa: "A-02", concepto: "Cuota Mensual", monto: 1200, fecha: "2025-01-10", estado: "vencido" },
  { id: 3, residente: "Roberto López", casa: "A-03", concepto: "Cuota Mensual", monto: 1200, fecha: "2025-01-08", estado: "pagado" },
  { id: 4, residente: "Ana Martínez", casa: "A-04", concepto: "Cuota Mensual", monto: 800, fecha: "2025-01-12", estado: "parcial" },
  { id: 5, residente: "Luis Hernández", casa: "A-05", concepto: "Cuota Mensual", monto: 1200, fecha: "2024-12-01", estado: "vencido" },
  { id: 6, residente: "Patricia Ruiz", casa: "A-06", concepto: "Cuota Mensual", monto: 1200, fecha: "2025-01-03", estado: "pagado" },
  { id: 7, residente: "Jorge Sánchez", casa: "B-01", concepto: "Cuota Mensual", monto: 1200, fecha: "2025-01-07", estado: "pagado" },
  { id: 8, residente: "Laura Torres", casa: "B-02", concepto: "Cuota Mensual", monto: 1200, fecha: "2025-01-15", estado: "pendiente" },
];

export const MOCK_MULTAS: Multa[] = [
  { id: 1, casa: "A-02", residente: "María García", tipo: "Ruido", descripcion: "Música alta después de las 11pm", monto: 500, fecha: "2025-01-08", estado: "pendiente" },
  { id: 2, casa: "A-05", residente: "Luis Hernández", tipo: "Estacionamiento", descripcion: "Vehículo en área prohibida", monto: 300, fecha: "2025-01-10", estado: "pendiente" },
  { id: 3, casa: "B-02", residente: "Laura Torres", tipo: "Basura", descripcion: "Depósito fuera de horario", monto: 200, fecha: "2025-01-12", estado: "pagada" },
  { id: 4, casa: "C-01", residente: "David Ortiz", tipo: "Mascotas", descripcion: "Mascota sin correa en área común", monto: 250, fecha: "2025-01-14", estado: "pendiente" },
  { id: 5, casa: "B-05", residente: "Fernando Vega", tipo: "Cuota Vencida", descripcion: "Cuota de diciembre sin pagar", monto: 400, fecha: "2025-01-01", estado: "pagada" },
];

export const MOCK_AVISOS: Aviso[] = [
  { id: 1, titulo: "Mantenimiento Alberca", tipo: "mantenimiento", contenido: "La alberca estará fuera de servicio el sábado 18 de enero para mantenimiento preventivo.", fecha: "2025-01-15", autor: "Administración", urgente: false },
  { id: 2, titulo: "Asamblea Ordinaria Enero", tipo: "asamblea", contenido: "Se convoca a todos los residentes a la asamblea ordinaria del mes el día 22 de enero a las 7pm en el salón de usos múltiples.", fecha: "2025-01-14", autor: "Comité", urgente: true },
  { id: 3, titulo: "Pago de Cuotas Enero", tipo: "pagos", contenido: "Recuerden que el plazo para pago de cuotas de enero vence el día 15. Eviten recargos.", fecha: "2025-01-10", autor: "Tesorería", urgente: false },
  { id: 4, titulo: "Nuevas Cámaras de Seguridad", tipo: "seguridad", contenido: "Se han instalado 4 nuevas cámaras en el acceso principal y estacionamiento para mayor seguridad.", fecha: "2025-01-08", autor: "Comité", urgente: false },
  { id: 5, titulo: "Reglamento Actualizado", tipo: "general", contenido: "El reglamento interno ha sido actualizado. Favor de revisar los cambios en la sección de Documentos.", fecha: "2025-01-05", autor: "Administración", urgente: false },
];

export const MOCK_TICKETS: Ticket[] = [
  { id: 1, casa: "A-03", residente: "Roberto López", categoria: "Agua", descripcion: "Fuga en tubería del baño principal", prioridad: "alta", estado: "en_proceso", fecha: "2025-01-13" },
  { id: 2, casa: "B-01", residente: "Jorge Sánchez", categoria: "Electricidad", descripcion: "Foco fundido en estacionamiento asignado", prioridad: "media", estado: "abierto", fecha: "2025-01-14" },
  { id: 3, casa: "A-06", residente: "Patricia Ruiz", categoria: "Jardinería", descripcion: "Árbol con ramas colgando hacia jardín privado", prioridad: "baja", estado: "abierto", fecha: "2025-01-12" },
  { id: 4, casa: "C-02", residente: "Isabel Castro", categoria: "Limpieza", descripcion: "Basura acumulada cerca de contenedor principal", prioridad: "media", estado: "resuelto", fecha: "2025-01-10" },
  { id: 5, casa: "B-04", residente: "Carmen Díaz", categoria: "Seguridad", descripcion: "Puerta de acceso lateral no cierra correctamente", prioridad: "alta", estado: "en_proceso", fecha: "2025-01-11" },
];

export const MOCK_RESERVAS: Reserva[] = [
  { id: 1, casa: "A-01", residente: "Carlos Mendoza", area: "Salón", fecha: "2025-01-18", hora: "14:00 - 22:00", estado: "confirmada" },
  { id: 2, casa: "B-03", residente: "Miguel Flores", area: "Alberca", fecha: "2025-01-19", hora: "10:00 - 14:00", estado: "confirmada" },
  { id: 3, casa: "A-04", residente: "Ana Martínez", area: "Terraza", fecha: "2025-01-20", hora: "16:00 - 20:00", estado: "pendiente" },
  { id: 4, casa: "C-03", residente: "Ricardo Jiménez", area: "Cancha", fecha: "2025-01-21", hora: "08:00 - 10:00", estado: "confirmada" },
];

export const MOCK_VISITAS: Visita[] = [
  { id: 1, casa: "A-01", residente: "Carlos Mendoza", visitante: "Juan Pérez", fecha: "2025-01-15", hora: "15:30", estado: "ingresó" },
  { id: 2, casa: "B-02", residente: "Laura Torres", visitante: "Empresa Plomería", fecha: "2025-01-15", hora: "10:00", estado: "ingresó" },
  { id: 3, casa: "A-03", residente: "Roberto López", visitante: "Familia López", fecha: "2025-01-15", hora: "14:00", estado: "pendiente" },
  { id: 4, casa: "C-01", residente: "David Ortiz", visitante: "Pizza Express", fecha: "2025-01-15", hora: "20:15", estado: "ingresó" },
  { id: 5, casa: "B-06", residente: "Sofía Morales", visitante: "Servicio Amazon", fecha: "2025-01-15", hora: "11:30", estado: "salió" },
];

export const MOCK_CHAT: ChatMessage[] = [
  { id: 1, canal: "administracion", autor: "Administración", avatar: "AD", mensaje: "Buenos días a todos. Recuerden el límite de cuotas esta semana.", hora: "09:00", propio: false },
  { id: 2, canal: "administracion", autor: "Carlos Mendoza", avatar: "CM", mensaje: "¿Cuál es el número de cuenta para hacer el depósito?", hora: "09:15", propio: false },
  { id: 3, canal: "administracion", autor: "Administración", avatar: "AD", mensaje: "BBVA 0123 4567 8901, a nombre de Condominio Residencial Las Palmas.", hora: "09:20", propio: true },
  { id: 4, canal: "seguridad", autor: "Vigilancia", avatar: "VG", mensaje: "Turno de noche sin novedades. Todo en orden.", hora: "06:00", propio: false },
  { id: 5, canal: "mantenimiento", autor: "Roberto López", avatar: "RL", mensaje: "La fuga del baño ya fue reportada en tickets, ¿cuándo vendrán?", hora: "10:30", propio: false },
  { id: 6, canal: "mantenimiento", autor: "Mantenimiento", avatar: "MT", mensaje: "Pasamos hoy en la tarde, entre 4 y 6pm.", hora: "10:45", propio: true },
];

export const MOCK_CORREOS: Correo[] = [
  { id: 1, destinatario: "Todos los residentes", asunto: "Aviso: Asamblea Ordinaria Enero", fecha: "2025-01-14 08:00", estado: "enviado", tipo: "aviso", canal: "correo" },
  { id: 2, destinatario: "María García (A-02)", asunto: "Recordatorio de adeudo - Cuota Enero", fecha: "2025-01-13 09:30", estado: "enviado", tipo: "adeudo", canal: "correo" },
  { id: 3, destinatario: "Luis Hernández (A-05)", asunto: "Multa por estacionamiento indebido #002", fecha: "2025-01-10 11:00", estado: "enviado", tipo: "multa", canal: "correo" },
  { id: 4, destinatario: "Carlos Mendoza (A-01)", asunto: "Confirmación de reserva - Salón 18 Ene", fecha: "2025-01-09 14:20", estado: "enviado", tipo: "reserva", canal: "correo" },
  { id: 5, destinatario: "Residentes con adeudo", asunto: "Último aviso: Cuotas vencidas diciembre", fecha: "2025-01-05 08:00", estado: "enviado", tipo: "adeudo", canal: "correo" },
];

export const MOCK_DOCUMENTOS: Documento[] = [
  { id: 1, nombre: "Reglamento Interno 2025", tipo: "reglamento", fecha: "2025-01-05", tamaño: "2.4 MB" },
  { id: 2, nombre: "Acta Asamblea Diciembre 2024", tipo: "acta", fecha: "2024-12-22", tamaño: "1.1 MB" },
  { id: 3, nombre: "Presupuesto Anual 2025", tipo: "financiero", fecha: "2025-01-01", tamaño: "890 KB" },
  { id: 4, nombre: "Circular #12 - Normas Alberca", tipo: "circular", fecha: "2024-11-15", tamaño: "340 KB" },
  { id: 5, nombre: "Contrato Servicio Vigilancia", tipo: "contrato", fecha: "2024-10-01", tamaño: "1.8 MB" },
];

export const ROLES_DEMO: RolDemo[] = [
  { id: "admin", nombre: "Administrador", email: "admin@condominio.mx", password: "admin123", color: "#0067c0" },
  { id: "tesoreria", nombre: "Tesorería", email: "tesoreria@condominio.mx", password: "tesoreria123", color: "#107c10" },
  { id: "vigilancia", nombre: "Vigilancia", email: "vigilancia@condominio.mx", password: "vigilancia123", color: "#c97b00" },
  { id: "comite", nombre: "Comité", email: "comite@condominio.mx", password: "comite123", color: "#6b6b6b" },
  { id: "residente", nombre: "Residente (A-01)", email: "carlos@email.com", password: "residente123", color: "#881798" },
];
