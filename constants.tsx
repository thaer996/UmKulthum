
import { Content } from './types';

const FEATURED_SONGS = [
  {
    nameEn: "Birdak",
    nameAr: "برضاك",
    url: "https://soundcloud.com/oumkalthum/fcvjkgejfq2s"
  },
  {
    nameEn: "Enta Omri",
    nameAr: "انت عمري",
    url: "https://soundcloud.com/dhahri-oussama/ak1jlpuxh5fe"
  },
  {
    nameEn: "Al Atlal",
    nameAr: "الاطلال",
    url: "https://soundcloud.com/muhamed-elhakim/rv5kqttzmasy"
  },
  {
    nameEn: "Fakkarouni",
    nameAr: "فكروني",
    url: "https://soundcloud.com/nour_znky/531fvrcazg7n"
  },
  {
    nameEn: "Siret El Hob",
    nameAr: "سيرة الحب",
    url: "https://soundcloud.com/aquarius-girl-531562137/4sfctou3auyf"
  },
  {
    nameEn: "Hob Eih",
    nameAr: "حب ايه",
    url: "https://soundcloud.com/besho-kamal/7hopudewxaxc"
  },
  {
    nameEn: "Ba'eed Annak",
    nameAr: "بعيد عنك",
    url: "https://soundcloud.com/mustafa-el-tayeb-1/wxzwer0kwsrg"
  },
  {
    nameEn: "Lessa Faker",
    nameAr: "لسا فاكر",
    url: "https://soundcloud.com/natilmohammed/976uuq8cllhu"
  }
];

export const TRANSLATIONS: Record<string, Content> = {
  en: {
    title: "Kalthoumiat",
    subtitle: "Um Kalthoum",
    heroTag: "Star of the East",
    heroDescription: "Experience the eternal voice that defined an era of Arabic music — through stories, songs, and an AI-powered conversation with the legend herself.",
    bioTitle: "A Voice Beyond Time",
    bioText: "Um Kalthoum was more than a singer; she was a cultural phenomenon. Known as 'Kawkab al-Sharq' (Star of the East), her career spanned over five decades, uniting the Arab world with her emotive and technically perfect voice. She transformed Arabic music forever.",
    chatTitle: "Dialogue with a Legend",
    chatSubtitle: "Experience an AI-powered conversation with the Star of the East. Ask about her music, life, and timeless legacy.",
    chatPlaceholder: "How did her career start?",
    legacyTitle: "The Eternal Legacy",
    footerText: "A digital tribute to the greatest voice in Arabic music history. Preserving her legacy for generations to come.",
    famousSongs: [
      "Alf Leila Wa Leila", "Amal Hayati", "Arouh Li Meen",
      "Ya Msaharni", "Ansak Ya Salam", "Hagartak",
      "El Hob Keda", "Daret El Ayam"
    ],
    featuredSongs: FEATURED_SONGS
  },
  ar: {
    title: "كلثوميات",
    subtitle: "أم كلثوم",
    heroTag: "كوكب الشرق",
    heroDescription: "استمتع بالصوت الخالد الذي حدد حقبة من الموسيقى العربية — عبر القصص والأغاني ومحادثة مدعومة بالذكاء الاصطناعي مع الأسطورة نفسها.",
    bioTitle: "صوت يتجاوز الزمن",
    bioText: "كانت أم كلثوم أكثر من مجرد مغنية؛ كانت ظاهرة ثقافية. عُرفت بلقب 'كوكب الشرق'، وامتدت مسيرتها لأكثر من خمسة عقود، موحدة العالم العربي بصوتها العاطفي والمثالي تقنياً. لقد غيّرت الموسيقى العربية إلى الأبد.",
    chatTitle: "حوار مع الأسطورة",
    chatSubtitle: "جرّب محادثة مدعومة بالذكاء الاصطناعي مع كوكب الشرق. اسأل عن موسيقاها وحياتها وإرثها الخالد.",
    chatPlaceholder: "كيف بدأت مسيرتها الفنية؟",
    legacyTitle: "الإرث الخالد",
    footerText: "تحية رقمية لأعظم صوت في تاريخ الموسيقى العربية. نحفظ إرثها للأجيال القادمة.",
    famousSongs: [
      "ألف ليلة وليلة", "أمل حياتي", "أروح لمين",
      "يا مسهرني", "أنساك يا سلام", "هجرتك",
      "الحب كده", "دارت الأيام"
    ],
    featuredSongs: FEATURED_SONGS
  }
};

export const COLORS = {
  primary: '#FF9D00',
  secondary: '#D4AF37',
  background: '#050505',
  card: '#121212',
  text: '#FFFFFF',
  muted: '#888888'
};
