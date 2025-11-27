export interface Message {
  id: number;
  body: string;
  direction: "inbound" | "outbound";
  created_at: string;
  is_read?: number;
  status?: string; // allow any string from backend
}
