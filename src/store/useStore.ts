import { create } from 'zustand';
import type { ThumbnailData, Template } from '../types';
import { defaultTemplates } from '../templates/defaultTemplates';

interface EditorState {
    data: ThumbnailData;
    templates: Template[];
    selectedElement: 'title' | 'tracklist' | 'background' | null;

    // Actions
    updateTitle: (title: string) => void;
    updateTracklist: (text: string) => void;
    updateBackground: (image: string | null) => void;
    setTemplate: (templateId: string) => void;
    selectElement: (element: 'title' | 'tracklist' | 'background' | null) => void;
    triggerExport: () => void;
    exportTrigger: number;

    // Getters
    getCurrentTemplate: () => Template;

    // New Features Actions
    setDimensions: (width: number, height: number, label: string) => void;
    updateEffects: (effects: Partial<EditorState['data']['effects']>) => void;
    setCustomFont: (name: string, src: string) => void;
    setCustomTitleColor: (color: string) => void;
    setCustomTracklistColor: (color: string) => void;
    setCustomTitlePosition: (x: number, y: number) => void;
    setCustomTitleFontSize: (size: number) => void;
    setCustomTracklistStartPosition: (x: number, y: number) => void;
    setCustomTracklistFontSize: (size: number) => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
    data: {
        title: "MY AWESOME PLAYLIST",
        tracklist: [
            "Song Title One - Artist A", "Song Title Two - Artist B", "Song Title Three - Artist C", "Song Title Four - Artist D", "Song Title Five - Artist E",
            "Song Title Six - Artist F", "Song Title Seven - Artist G", "Song Title Eight - Artist H", "Song Title Nine - Artist I", "Song Title Ten - Artist J",
            "Song Title Eleven - Artist K", "Song Title Twelve - Artist L", "Song Title Thirteen - Artist M", "Song Title Fourteen - Artist N", "Song Title Fifteen - Artist O",
            "Song Title Sixteen - Artist P", "Song Title Seventeen - Artist Q", "Song Title Eighteen - Artist R", "Song Title Nineteen - Artist S", "Song Title Twenty - Artist T"
        ],
        backgroundImage: null,
        selectedTemplateId: defaultTemplates[0].id,
        // New Features Defaults
        dimensions: { width: 1280, height: 720, label: 'YouTube Thumbnail' },
        effects: { blur: 0, grain: 0, vignette: 0 },
    },
    templates: defaultTemplates,
    selectedElement: null,

    updateTitle: (title) => set((state) => ({
        data: { ...state.data, title }
    })),

    updateTracklist: (text) => set((state) => ({
        data: { ...state.data, tracklist: text.split('\n').filter(line => line.trim() !== '') }
    })),

    updateBackground: (image) => set((state) => ({
        data: { ...state.data, backgroundImage: image }
    })),

    setTemplate: (templateId) => set((state) => ({
        data: { ...state.data, selectedTemplateId: templateId }
    })),

    selectElement: (element) => set({ selectedElement: element }),

    exportTrigger: 0,
    triggerExport: () => set((state) => ({ exportTrigger: state.exportTrigger + 1 })),

    // New Features Implementation
    setDimensions: (width, height, label) => set((state) => ({
        data: { ...state.data, dimensions: { width, height, label } }
    })),

    updateEffects: (newEffects) => set((state) => ({
        data: { ...state.data, effects: { ...state.data.effects, ...newEffects } }
    })),

    setCustomFont: (name, src) => set((state) => ({
        data: { ...state.data, customFont: { name, src } }
    })),

    setCustomTitleColor: (color) => set((state) => ({
        data: { ...state.data, customTitleColor: color }
    })),

    setCustomTracklistColor: (color) => set((state) => ({
        data: { ...state.data, customTracklistColor: color }
    })),

    setCustomTitlePosition: (x, y) => set((state) => ({
        data: { ...state.data, customTitlePosition: { x, y } }
    })),

    setCustomTitleFontSize: (size) => set((state) => ({
        data: { ...state.data, customTitleFontSize: size }
    })),

    setCustomTracklistStartPosition: (x, y) => set((state) => ({
        data: { ...state.data, customTracklistStartPosition: { x, y } }
    })),

    setCustomTracklistFontSize: (size) => set((state) => ({
        data: { ...state.data, customTracklistFontSize: size }
    })),

    getCurrentTemplate: () => {
        const { templates, data } = get();
        return templates.find(t => t.id === data.selectedTemplateId) || templates[0];
    },
}));
