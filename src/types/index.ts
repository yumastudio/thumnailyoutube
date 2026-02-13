export interface Template {
    id: string;
    name: string;
    category: string;
    // Visual properties
    background: {
        type: 'color' | 'gradient' | 'image';
        value: string; // Hex, gradient string, or image URL
        overlay?: {
            color: string;
            opacity: number;
        };
        blur?: number;
    };
    title: {
        fontFamily: string;
        fontSize: number;
        color: string;
        align: 'left' | 'center' | 'right';
        x: number; // Percentage 0-1 or fixed pixels
        y: number; // Percentage 0-1
        shadow?: string;
        stroke?: string;
        strokeWidth?: number;
        uppercase?: boolean;
    };
    tracklist: {
        fontFamily: string;
        fontSize: number;
        color: string;
        x: number;
        y: number;
        lineHeight: number;
        limit: number; // Max lines
        showNumbers: boolean;
        align: 'left' | 'center' | 'right';
    };
}

export interface ThumbnailData {
    title: string;
    tracklist: string[];
    backgroundImage: string | null; // Data URL or Object URL
    selectedTemplateId: string;
    // Overrides (optional)
    customTitleColor?: string;
    customTracklistColor?: string;
    // New Features
    dimensions: {
        width: number;
        height: number;
        label: string;
    };
    effects: {
        blur: number;
        grain: number; // 0-1
        vignette: number; // 0-1
    };
    customFont?: {
        name: string;
        src: string;
    };
    // Custom Overrides
    customTitlePosition?: { x: number; y: number }; // Percentage 0-1
    customTitleFontSize?: number;
    customTracklistStartPosition?: { x: number; y: number }; // Percentage 0-1
    customTracklistFontSize?: number;
}
