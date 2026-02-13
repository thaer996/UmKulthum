
export type Language = 'en' | 'ar';

export interface SongData {
  nameEn: string;
  nameAr: string;
  url: string;
}

export interface Content {
  title: string;
  subtitle: string;
  heroTag: string;
  heroDescription: string;
  bioTitle: string;
  bioText: string;
  chatTitle: string;
  chatSubtitle: string;
  chatPlaceholder: string;
  legacyTitle: string;
  footerText: string;
  famousSongs: string[];
  featuredSongs: SongData[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
