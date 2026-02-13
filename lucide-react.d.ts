declare module 'lucide-react' {
    import { FC, SVGProps } from 'react';

    interface IconProps extends SVGProps<SVGSVGElement> {
        size?: number | string;
        color?: string;
        strokeWidth?: number | string;
        absoluteStrokeWidth?: boolean;
        className?: string;
    }

    type Icon = FC<IconProps>;

    export const Menu: Icon;
    export const X: Icon;
    export const ChevronDown: Icon;
    export const ChevronUp: Icon;
    export const ChevronLeft: Icon;
    export const ChevronRight: Icon;
    export const Search: Icon;
    export const Sun: Icon;
    export const Moon: Icon;
    export const Globe: Icon;
    export const Play: Icon;
    export const Pause: Icon;
    export const Volume2: Icon;
    export const VolumeX: Icon;
    export const Heart: Icon;
    export const Share2: Icon;
    export const ExternalLink: Icon;
    export const ArrowRight: Icon;
    export const ArrowLeft: Icon;
    export const Music: Icon;
    export const Mic: Icon;
    export const Star: Icon;
    export const Award: Icon;
    export const Calendar: Icon;
    export const MapPin: Icon;
    export const Clock: Icon;
    export const Info: Icon;
    export const Mail: Icon;
    export const Phone: Icon;
    export const Instagram: Icon;
    export const Twitter: Icon;
    export const Facebook: Icon;
    export const Youtube: Icon;
    export const Loader2: Icon;
    export const Check: Icon;
    export const AlertCircle: Icon;
    export const Plus: Icon;
    export const Minus: Icon;
    export const Settings: Icon;
    export const User: Icon;
    export const Home: Icon;
    export const Eye: Icon;
    export const EyeOff: Icon;
    export const Download: Icon;
    export const Upload: Icon;
    export const Trash2: Icon;
    export const Edit: Icon;
    export const Copy: Icon;
    export const MoreHorizontal: Icon;
    export const MoreVertical: Icon;
    export const Filter: Icon;
    export const SortAsc: Icon;
    export const SortDesc: Icon;
    export const RefreshCw: Icon;
    export const Bookmark: Icon;
    export const Bell: Icon;
    export const Lock: Icon;
    export const Unlock: Icon;
    export const Shield: Icon;
    export const Zap: Icon;
    export const Image: Icon;
    export const Video: Icon;
    export const FileText: Icon;
    export const Folder: Icon;
    export const Link: Icon;
    export const Send: Icon;
    export const MessageCircle: Icon;
    export const ThumbsUp: Icon;
    export const ThumbsDown: Icon;

    // Catch-all for any other icons
    const icons: Record<string, Icon>;
    export default icons;
}
