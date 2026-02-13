import type { Template } from "../types";

export const defaultTemplates: Template[] = [
    {
        id: "minimal-clean",
        name: "Minimal Clean",
        category: "Minimal",
        background: {
            type: "color",
            value: "#1a1a1a",
        },
        title: {
            fontFamily: "'Inter', sans-serif",
            fontSize: 70,
            color: "#ffffff",
            align: "center",
            x: 0.5,
            y: 0.25, // Adjusted from 0.3
            uppercase: true,
        },
        tracklist: {
            fontFamily: "'Inter', sans-serif",
            fontSize: 24,
            color: "#cccccc",
            align: "center",
            x: 0.5,
            y: 0.45, // Adjusted from 0.5
            lineHeight: 1.4,
            limit: 10,
            showNumbers: true,
        },
    },
    {
        id: "lofi-chill",
        name: "Lo-fi Chill",
        category: "Relaxing",
        background: {
            type: "image",
            value: "placeholder",
            overlay: {
                color: "#000000",
                opacity: 0.3,
            },
        },
        title: {
            fontFamily: "'Playfair Display', serif",
            fontSize: 80,
            color: "#f0f0f0",
            align: "left",
            x: 0.05,
            y: 0.2,
            shadow: "2px 2px 4px rgba(0,0,0,0.5)",
        },
        tracklist: {
            fontFamily: "'Source Code Pro', monospace",
            fontSize: 24,
            color: "#e0e0e0",
            align: "left",
            x: 0.05,
            y: 0.45, // Adjusted from 0.4 (consistent spacing)
            lineHeight: 1.5,
            limit: 10,
            showNumbers: true,
        },
    },
    {
        id: "cyber-neon",
        name: "Cyber Neon",
        category: "Electronic",
        background: {
            type: "gradient",
            value: "linear-gradient(45deg, #2b1055, #7597de)",
        },
        title: {
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 75,
            color: "#00ffcc",
            align: "center",
            x: 0.5,
            y: 0.2, // Adjusted from 0.25
            shadow: "0 0 10px #00ffcc",
            uppercase: true,
        },
        tracklist: {
            fontFamily: "'Inter', sans-serif",
            fontSize: 26,
            color: "#ffffff",
            align: "center",
            x: 0.5,
            y: 0.45, // Adjusted from 0.5
            lineHeight: 1.3,
            limit: 10,
            showNumbers: true,
        },
    },
    {
        id: "lofi-dream",
        name: "Lofi Dream",
        category: "Relaxing",
        background: {
            type: "color",
            value: "#2d2438",
            overlay: {
                color: "#ffcba4",
                opacity: 0.1,
            },
        },
        title: {
            fontFamily: "'Playfair Display', serif",
            fontSize: 75,
            color: "#ffcbba",
            align: "center",
            x: 0.5,
            y: 0.25, // Adjusted from 0.35
            shadow: "2px 2px 0px #4a3b5c",
        },
        tracklist: {
            fontFamily: "'Source Code Pro', monospace",
            fontSize: 22,
            color: "#e6d5f7",
            align: "center",
            x: 0.5,
            y: 0.45, // Adjusted from 0.55
            lineHeight: 1.5,
            limit: 10,
            showNumbers: true,
        },
    },
    {
        id: "jazz-classic",
        name: "Classic Jazz Club",
        category: "Jazz",
        background: {
            type: "gradient",
            value: "linear-gradient(to bottom, #141e30, #243b55)",
        },
        title: {
            fontFamily: "'Playfair Display', serif",
            fontSize: 90,
            color: "#d4af37", // Gold
            align: "center",
            x: 0.5,
            y: 0.2,
            shadow: "1px 1px 2px rgba(0,0,0,0.8)",
            uppercase: true,
        },
        tracklist: {
            fontFamily: "'Inter', sans-serif",
            fontSize: 24,
            color: "#f8f8f8",
            align: "center",
            x: 0.5,
            y: 0.45, // Adjusted from 0.45
            lineHeight: 1.4,
            limit: 10,
            showNumbers: true,
        },
    },
    {
        id: "jazz-noir",
        name: "Midnight Jazz Noir",
        category: "Jazz",
        background: {
            type: "color",
            value: "#000000",
        },
        title: {
            fontFamily: "'Cinzel', serif",
            fontSize: 80,
            color: "#ffffff",
            align: "right",
            x: 0.95,
            y: 0.2,
            shadow: "0px 0px 10px rgba(255,255,255,0.2)",
        },
        tracklist: {
            fontFamily: "'Playfair Display', serif",
            fontSize: 26,
            color: "#a0a0a0",
            align: "right",
            x: 0.95,
            y: 0.45, // Adjusted from 0.4
            lineHeight: 1.3,
            limit: 10,
            showNumbers: true,
        },
    },
    // NEW JAZZ TEMPLATES
    {
        id: "jazz-lounge",
        name: "Smooth Jazz Lounge",
        category: "Jazz",
        background: {
            type: "color",
            value: "#3e2723", // Dark Brown
            overlay: { color: "#d7ccc8", opacity: 0.1 }
        },
        title: {
            fontFamily: "'Playfair Display', serif",
            fontSize: 85,
            color: "#ffe082", // Amber
            align: "left",
            x: 0.05,
            y: 0.25,
            shadow: "1px 1px 2px #000",
        },
        tracklist: {
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 22,
            color: "#ffecb3",
            align: "left",
            x: 0.05,
            y: 0.45, // Adjusted from 0.5
            lineHeight: 1.5,
            limit: 10,
            showNumbers: true,
        },
    },
    {
        id: "jazz-vinyl",
        name: "Vintage Vinyl",
        category: "Jazz",
        background: {
            type: "color",
            value: "#dd2c00", // Retro Orange/Redish
            overlay: { color: "#000", opacity: 0.2 }
        },
        title: {
            fontFamily: "'Pacifico', cursive",
            fontSize: 70, // Reduced from 90
            color: "#fff",
            align: "center",
            x: 0.5,
            y: 0.15, // Adjusted from 0.25 to prevent overlap
            shadow: "2px 2px 0px #000",
        },
        tracklist: {
            fontFamily: "'Source Code Pro', monospace",
            fontSize: 24,
            color: "#fff",
            align: "center",
            x: 0.5,
            y: 0.45, // Adjusted from 0.55
            lineHeight: 1.4,
            limit: 10,
            showNumbers: true,
        },
    },
    {
        id: "acoustic-coffee",
        name: "Acoustic Coffee",
        category: "Acoustic",
        background: {
            type: "color",
            value: "#5c4033", // Dark wood
            overlay: {
                color: "#000000",
                opacity: 0.4,
            },
        },
        title: {
            fontFamily: "'Playfair Display', serif",
            fontSize: 70,
            color: "#e8dcca",
            align: "center",
            x: 0.5,
            y: 0.2, // Adjusted from 0.25
            shadow: "2px 2px 4px rgba(0,0,0,0.6)",
        },
        tracklist: {
            fontFamily: "'Nunito', sans-serif",
            fontSize: 24,
            color: "#d4c5b0",
            align: "center",
            x: 0.5,
            y: 0.45, // Adjusted from 0.5
            lineHeight: 1.5, // Reduced from 1.6
            limit: 10,
            showNumbers: true,
        },
    },
    {
        id: "night-drive",
        name: "Night Drive Phonk",
        category: "Electronic",
        background: {
            type: "gradient",
            value: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        },
        title: {
            fontFamily: "'Righteous', sans-serif",
            fontSize: 90,
            color: "#ff0099",
            align: "center",
            x: 0.5,
            y: 0.25, // Adjusted from 0.3
            shadow: "0px 0px 20px #ff0099",
            uppercase: true,
            stroke: "#ffffff",
            strokeWidth: 2,
        },
        tracklist: {
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 24,
            color: "#ffffff",
            align: "center",
            x: 0.5,
            y: 0.45, // Adjusted from 0.55
            lineHeight: 1.4,
            limit: 10,
            showNumbers: true,
        },
    },
    {
        id: "pop-hits",
        name: "Top Pop Hits",
        category: "Pop",
        background: {
            type: "gradient",
            value: "linear-gradient(to right, #ff512f, #dd2476)",
        },
        title: {
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 75, // Reduced from 100
            color: "#ffffff",
            align: "left",
            x: 0.05,
            y: 0.15, // Adjusted from 0.2
            shadow: "4px 4px 0px rgba(0,0,0,0.2)",
            uppercase: true,
        },
        tracklist: {
            fontFamily: "'Inter', sans-serif",
            fontSize: 26, // Reduced from 28
            color: "#ffe6ea",
            align: "left",
            x: 0.05,
            y: 0.45, // Adjusted from 0.5
            lineHeight: 1.3,
            limit: 10,
            showNumbers: true,
        },
    },
    {
        id: "sad-mood",
        name: "Sad / Emotional",
        category: "Mood",
        background: {
            type: "color",
            value: "#2b2b2b",
        },
        title: {
            fontFamily: "'Inter', sans-serif",
            fontSize: 60,
            color: "#a0a0a0",
            align: "center",
            x: 0.5,
            y: 0.3, // Adjusted from 0.35
            uppercase: true,
        },
        tracklist: {
            fontFamily: "'Inter', sans-serif",
            fontSize: 22,
            color: "#707070",
            align: "center",
            x: 0.5,
            y: 0.45, // Adjusted from 0.55
            lineHeight: 1.5, // Significantly reduced from 1.8
            limit: 10,
            showNumbers: true,
        },
    },
    {
        id: "edm-festival",
        name: "EDM Festival",
        category: "Electronic",
        background: {
            type: "gradient",
            value: "linear-gradient(to bottom, #ff00cc, #333399)",
            overlay: { color: "#ffffff", opacity: 0.1 }
        },
        title: {
            fontFamily: "'Russo One', sans-serif",
            fontSize: 85, // Reduced from 100
            color: "#ffffff",
            align: "center",
            x: 0.5,
            y: 0.25,
            shadow: "4px 4px 0px #000000",
            uppercase: true,
            stroke: "#333399",
            strokeWidth: 3,
        },
        tracklist: {
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 26,
            color: "#ffffff",
            align: "center",
            x: 0.5,
            y: 0.45, // Adjusted for better fit
            lineHeight: 1.3,
            limit: 10,
            showNumbers: true,
        },
    },
    {
        id: "rock-metal",
        name: "Heavy Metal / Rock",
        category: "Rock",
        background: {
            type: "color",
            value: "#0a0a0a", // Almost black
            overlay: { color: "#8b0000", opacity: 0.3 } // Blood red tint
        },
        title: {
            fontFamily: "'Metal Mania', system-ui",
            fontSize: 85, // Reduced from 90
            color: "#ff3333",
            align: "center",
            x: 0.5,
            y: 0.25,
            shadow: "0px 0px 15px #ff0000",
            uppercase: true,
        },
        tracklist: {
            fontFamily: "'Russo One', sans-serif",
            fontSize: 24,
            color: "#cccccc",
            align: "center",
            x: 0.5,
            y: 0.45, // Adjusted for better fit
            lineHeight: 1.5,
            limit: 10,
            showNumbers: true,
        },
    },
    {
        id: "nature-ambient",
        name: "Nature Ambient",
        category: "Relaxing",
        background: {
            type: "gradient",
            value: "linear-gradient(to top, #96fbc4 0%, #f9f586 100%)",
        },
        title: {
            fontFamily: "'Nunito', sans-serif",
            fontSize: 70,
            color: "#2c5e1a",
            align: "center",
            x: 0.5,
            y: 0.25,
            uppercase: true,
        },
        tracklist: {
            fontFamily: "'Nunito', sans-serif",
            fontSize: 24,
            color: "#3a6351",
            align: "center",
            x: 0.5,
            y: 0.45,
            lineHeight: 1.5,
            limit: 10,
            showNumbers: false,
        },
    },
    {
        id: "workout-gym",
        name: "Gym Workout",
        category: "Sport",
        background: {
            type: "color",
            value: "#111111", // Nearly Black
        },
        title: {
            fontFamily: "'Oswald', sans-serif",
            fontSize: 100,
            color: "#ffff00", // Yellow Text
            align: "left",
            x: 0.05,
            y: 0.2,
            uppercase: true,
            stroke: "#ffff00",
            strokeWidth: 2,
        },
        tracklist: {
            fontFamily: "'Oswald', sans-serif",
            fontSize: 26,
            color: "#ffffff", // White
            align: "left",
            x: 0.05,
            y: 0.45,
            lineHeight: 1.3,
            limit: 10,
            showNumbers: true,
        },
    },
    {
        id: "retro-synth",
        name: "Retro Synthwave",
        category: "Electronic",
        background: {
            type: "gradient",
            value: "linear-gradient(180deg, #200122 0%, #6f0000 100%)",
        },
        title: {
            fontFamily: "'Righteous', sans-serif",
            fontSize: 85, // Reduced from 90
            color: "#fecf02", // Retro yellow/gold
            align: "center",
            x: 0.5,
            y: 0.25,
            shadow: "4px 4px 0px #b00e2e",
            uppercase: true,
        },
        tracklist: {
            fontFamily: "'Source Code Pro', monospace",
            fontSize: 24,
            color: "#ff00de", // Neon pink
            align: "center",
            x: 0.5,
            y: 0.45, // Adjusted for better fit
            lineHeight: 1.4,
            limit: 10,
            showNumbers: false,
        },
    },
    {
        id: "indie-vibes",
        name: "Indie Polaroid",
        category: "Pop",
        background: {
            type: "color",
            value: "#2d2d2d", // Dark
        },
        title: {
            fontFamily: "'Shadows Into Light', cursive",
            fontSize: 70,
            color: "#ff6b6b", // Light Red
            align: "center",
            x: 0.5,
            y: 0.3,
        },
        tracklist: {
            fontFamily: "'Source Code Pro', monospace",
            fontSize: 22,
            color: "#f0f0f0", // Whiteish
            align: "center",
            x: 0.5,
            y: 0.45,
            lineHeight: 1.5,
            limit: 10,
            showNumbers: false,
        },
    },
    {
        id: "hiphop-trap",
        name: "Trap / Hip Hop",
        category: "Hip Hop",
        background: {
            type: "color",
            value: "#000000",
        },
        title: {
            fontFamily: "'Anton', sans-serif",
            fontSize: 85, // Reduced from 90
            color: "#ffffff",
            align: "right",
            x: 0.9,
            y: 0.2, // Adjusted
            uppercase: true,
        },
        tracklist: {
            fontFamily: "'Oswald', sans-serif",
            fontSize: 26,
            color: "#ffaa00",
            align: "right",
            x: 0.9,
            y: 0.45, // Adjusted for better fit
            lineHeight: 1.4,
            limit: 10,
            showNumbers: true,
        },
    },
    {
        id: "classical-piano",
        name: "Classical Piano",
        category: "Classical",
        background: {
            type: "color",
            value: "#1a1a1a", // Dark Gray
        },
        title: {
            fontFamily: "'Cinzel', serif",
            fontSize: 75,
            color: "#ffffff", // White
            align: "center",
            x: 0.5,
            y: 0.25,
        },
        tracklist: {
            fontFamily: "'Playfair Display', serif",
            fontSize: 24,
            color: "#e0e0e0", // Light Gray
            align: "center",
            x: 0.5,
            y: 0.45,
            lineHeight: 1.5,
            limit: 10,
            showNumbers: true,
        },
    },
    {
        id: "summer-beach",
        name: "Summer Beach Hits",
        category: "Pop",
        background: {
            type: "gradient",
            value: "linear-gradient(to top, #4facfe 0%, #00f2fe 100%)",
        },
        title: {
            fontFamily: "'Pacifico', cursive",
            fontSize: 75, // Reduced from 80
            color: "#fff",
            align: "center",
            x: 0.5,
            y: 0.2,
            shadow: "2px 2px 5px rgba(0,0,0,0.3)",
        },
        tracklist: {
            fontFamily: "'Nunito', sans-serif",
            fontSize: 26,
            color: "#e0f7fa",
            align: "center",
            x: 0.5,
            y: 0.45,
            lineHeight: 1.5,
            limit: 10,
            showNumbers: false,
        },
    },
    {
        id: "study-focus",
        name: "Study & Focus",
        category: "Minimal",
        background: {
            type: "color",
            value: "#0f172a", // Dark Slate
        },
        title: {
            fontFamily: "'Inter', sans-serif",
            fontSize: 60,
            color: "#e2e8f0", // Light Slate
            align: "left",
            x: 0.1,
            y: 0.3,
            uppercase: true,
            strokeWidth: 0,
        },
        tracklist: {
            fontFamily: "'Source Code Pro', monospace",
            fontSize: 20,
            color: "#94a3b8", // Med Slate
            align: "left",
            x: 0.1,
            y: 0.45,
            lineHeight: 1.6,
            limit: 10,
            showNumbers: true,
        },
    },
];
