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

export interface Sticker {
    id: string;
    url: string; // Data URL
    x: number;
    y: number;
    scale: number;
    rotation: number;
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
        brightness: number; // -1 to 1, default 0
        contrast: number; // -100 to 100, default 0
        saturation: number; // -1 to 1, default 0
    };
    overlayOpacity?: number;
    customFont?: {
        name: string;
        src: string;
    };
    // Custom Overrides
    customTitlePosition?: { x: number; y: number }; // Percentage 0-1
    customTitleFontSize?: number;
    customTitleAlign?: 'left' | 'center' | 'right';
    customTitleShadowColor?: string;
    customTitleShadowBlur?: number;
    customTitleStrokeColor?: string;
    customTitleStrokeWidth?: number;

    customTracklistStartPosition?: { x: number; y: number }; // Percentage 0-1
    customTracklistFontSize?: number;
    customTracklistAlign?: 'left' | 'center' | 'right';
    customTracklistShadowColor?: string;
    customTracklistShadowBlur?: number;

    // Stickers
    stickers: Sticker[];
}
