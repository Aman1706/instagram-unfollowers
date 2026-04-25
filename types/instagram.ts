export interface StringData {
  href: string;
  value?: string;
  timestamp: number;
}

export interface InstagramEntry {
  title?: string;
  media_list_data?: unknown[];
  string_list_data?: StringData[];
}

export interface ParsedUser {
  username: string;
  href: string;
}

export type FileState = "idle" | "loaded" | "error" | "wrong-file";
