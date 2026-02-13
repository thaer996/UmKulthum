
export type Language = 'en' | 'ar';

export interface Content {
  title: string;
  subtitle: string;
  heroTag: string;
  bioTitle: string;
  bioContent: string;
  chatTitle: string;
  chatPlaceholder: string;
  chatDescription: string;
  legacyTitle: string;
  legacyDescription: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}
