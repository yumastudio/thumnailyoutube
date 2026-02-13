import React, { useRef } from 'react';
import { useEditorStore } from '../store/useStore';
import { Upload, Type, Layout, Image as ImageIcon, Download, Settings, Wand2, Type as FontIcon } from 'lucide-react';

export const Sidebar = () => {
    const {
        data,
        updateTitle,
        updateTracklist,
        updateBackground,
        setTemplate,
        templates,
        setDimensions,
        updateEffects,
        setCustomFont,
        setCustomTitleColor,
        setCustomTracklistColor
    } = useEditorStore();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const fontInputRef = useRef<HTMLInputElement>(null);

    const handleFontUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fontName = file.name.split('.')[0];
                const newFont = new FontFace(fontName, `url(${e.target?.result})`);
                newFont.load().then((loadedFace) => {
                    document.fonts.add(loadedFace);
                    setCustomFont(fontName, e.target?.result as string);
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                updateBackground(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="w-80 h-screen bg-zinc-950 border-r border-zinc-800 flex flex-col text-white overflow-hidden">
            {/* Header: Reduced padding */}
            <div className="p-4 border-b border-zinc-800 shrink-0">
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                    MusicThumb
                </h1>
                <p className="text-[10px] text-zinc-500">Professional Creator</p>
            </div>

            <div className="p-3 space-y-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800">
                {/* Template Selector: Compact Grid */}
                <section>
                    <div className="flex items-center gap-2 mb-2 text-zinc-400 text-[10px] uppercase tracking-wider font-semibold">
                        <Layout className="w-3 h-3" /> Templates
                    </div>
                    <div className="relative">
                        <select
                            value={data.selectedTemplateId}
                            onChange={(e) => setTemplate(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 pl-3 pr-8 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50 appearance-none cursor-pointer"
                        >
                            {templates.map(t => (
                                <option key={t.id} value={t.id}>
                                    {t.name} ({t.category})
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                            <Layout className="w-3 h-3" />
                        </div>
                    </div>
                </section>

                {/* Upload & VFX: Combined/Compact */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-zinc-400 text-[10px] uppercase tracking-wider font-semibold">
                        <ImageIcon className="w-3 h-3" /> Background & Effects
                    </div>

                    <div className="flex gap-2">
                        {/* Upload Button: Smaller */}
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="flex-1 border border-dashed border-zinc-800 rounded-lg p-2 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-zinc-700 hover:bg-zinc-900/50 transition-colors group"
                        >
                            <Upload className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400" />
                            <span className="text-[10px] text-zinc-500 group-hover:text-zinc-300">Upload Img</span>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                            />
                        </div>

                        {/* Font Upload: Moved here for space */}
                        <div
                            onClick={() => fontInputRef.current?.click()}
                            className="flex-1 border border-zinc-800 bg-zinc-900 rounded-lg p-2 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-zinc-700 transition-colors group"
                        >
                            <FontIcon className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400" />
                            <span className="text-[10px] text-zinc-500 group-hover:text-zinc-300 truncate w-full text-center">
                                {data.customFont ? data.customFont.name.substring(0, 8) + '...' : 'Custom Font'}
                            </span>
                            <input
                                ref={fontInputRef}
                                type="file"
                                accept=".ttf,.otf,.woff"
                                className="hidden"
                                onChange={handleFontUpload}
                            />
                        </div>
                    </div>

                    {/* VFX Sliders: Compact */}
                    <div className="bg-zinc-900/50 p-2 rounded-lg border border-zinc-800/50 space-y-2">
                        {[
                            { label: 'Blur', key: 'blur', min: 0, max: 20, step: 1, val: data.effects.blur, unit: 'px' },
                            { label: 'Grain', key: 'grain', min: 0, max: 1, step: 0.05, val: data.effects.grain, unit: '%' },
                            { label: 'Vignette', key: 'vignette', min: 0, max: 1, step: 0.05, val: data.effects.vignette, unit: '%' }
                        ].map(eff => (
                            <div key={eff.key} className="flex items-center gap-2">
                                <span className="text-[10px] text-zinc-500 w-12">{eff.label}</span>
                                <input
                                    type="range" min={eff.min} max={eff.max} step={eff.step}
                                    value={eff.val}
                                    onChange={(e) => updateEffects({ [eff.key]: Number(e.target.value) })}
                                    className="flex-1 accent-blue-500 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Advanced Customization: New Feature */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-zinc-400 text-[10px] uppercase tracking-wider font-semibold">
                        <Settings className="w-3 h-3" /> Advanced Override
                    </div>

                    <div className="bg-zinc-900/50 p-2 rounded-lg border border-zinc-800/50 space-y-3">
                        {/* Title Overrides */}
                        <div>
                            <p className="text-[10px] text-zinc-500 mb-1 font-semibold">Title Override</p>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1">
                                    <span className="text-[9px] text-zinc-600 block">Pos X ({data.customTitlePosition?.x ?? 'Auto'}%)</span>
                                    <input
                                        type="range" min="0" max="100"
                                        value={data.customTitlePosition?.x ?? 50}
                                        onChange={(e) => useEditorStore.getState().setCustomTitlePosition(Number(e.target.value), data.customTitlePosition?.y ?? (templates.find(t => t.id === data.selectedTemplateId)!.title.y * 100))}
                                        className="w-full accent-purple-500 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[9px] text-zinc-600 block">Pos Y ({data.customTitlePosition?.y ?? 'Auto'}%)</span>
                                    <input
                                        type="range" min="0" max="100"
                                        value={data.customTitlePosition?.y ?? 50}
                                        onChange={(e) => useEditorStore.getState().setCustomTitlePosition(data.customTitlePosition?.x ?? (templates.find(t => t.id === data.selectedTemplateId)!.title.x * 100), Number(e.target.value))}
                                        className="w-full accent-purple-500 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>
                                <div className="col-span-2 space-y-1">
                                    <span className="text-[9px] text-zinc-600 block">Size ({data.customTitleFontSize ?? 'Auto'}px)</span>
                                    <input
                                        type="range" min="20" max="200"
                                        value={data.customTitleFontSize ?? 100}
                                        onChange={(e) => useEditorStore.getState().setCustomTitleFontSize(Number(e.target.value))}
                                        className="w-full accent-purple-500 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-zinc-800" />

                        {/* Tracklist Overrides */}
                        <div>
                            <p className="text-[10px] text-zinc-500 mb-1 font-semibold">Tracklist Override</p>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1">
                                    <span className="text-[9px] text-zinc-600 block">Start Y ({data.customTracklistStartPosition?.y ?? 'Auto'}%)</span>
                                    <input
                                        type="range" min="0" max="100"
                                        value={data.customTracklistStartPosition?.y ?? 50}
                                        onChange={(e) => useEditorStore.getState().setCustomTracklistStartPosition(data.customTracklistStartPosition?.x ?? 50, Number(e.target.value))}
                                        className="w-full accent-green-500 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[9px] text-zinc-600 block">Start X ({data.customTracklistStartPosition?.x ?? 'Auto'}%)</span>
                                    <input
                                        type="range" min="0" max="100"
                                        value={data.customTracklistStartPosition?.x ?? 50}
                                        onChange={(e) => useEditorStore.getState().setCustomTracklistStartPosition(Number(e.target.value), data.customTracklistStartPosition?.y ?? 50)}
                                        className="w-full accent-green-500 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>
                                <div className="col-span-2 space-y-1">
                                    <span className="text-[9px] text-zinc-600 block">Size ({data.customTracklistFontSize ?? 'Auto'}px)</span>
                                    <input
                                        type="range" min="10" max="100"
                                        value={data.customTracklistFontSize ?? 40}
                                        onChange={(e) => useEditorStore.getState().setCustomTracklistFontSize(Number(e.target.value))}
                                        className="w-full accent-green-500 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content Inputs */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 mb-1 text-zinc-400 text-[10px] uppercase tracking-wider font-semibold">
                        <Type className="w-3 h-3" /> Content
                    </div>

                    <div className="space-y-1">
                        <div className="flex justify-between items-center text-[10px] text-zinc-500">
                            <span>Title</span>
                            <input
                                type="color"
                                value={data.customTitleColor || '#ffffff'}
                                onChange={(e) => setCustomTitleColor(e.target.value)}
                                className="w-3 h-3 rounded-full overflow-hidden border-none p-0 bg-transparent cursor-pointer"
                            />
                        </div>
                        <input
                            value={data.title}
                            onChange={(e) => updateTitle(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-1 px-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50 placeholder:text-zinc-700"
                            placeholder="Enter title..."
                        />
                    </div>

                    <div className="space-y-1">
                        <div className="flex justify-between items-center text-[10px] text-zinc-500">
                            <span>Tracklist ({data.tracklist.length})</span>
                            <input
                                type="color"
                                value={data.customTracklistColor || '#ffffff'}
                                onChange={(e) => setCustomTracklistColor(e.target.value)}
                                className="w-3 h-3 rounded-full overflow-hidden border-none p-0 bg-transparent cursor-pointer"
                            />
                        </div>
                        <textarea
                            value={data.tracklist.join('\n')}
                            onChange={(e) => updateTracklist(e.target.value)}
                            className="w-full h-24 bg-zinc-900 border border-zinc-800 rounded-md p-2 text-[10px] text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50 font-mono scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent placeholder:text-zinc-700 leading-tight"
                            placeholder="Tracks..."
                        />
                    </div>
                </section>
            </div>

            <div className="p-3 border-t border-zinc-800 shrink-0">
                <button
                    onClick={useEditorStore.getState().triggerExport}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-lg hover:shadow-blue-500/20"
                >
                    <Download className="w-4 h-4" /> Export
                </button>
            </div>
        </div>
    );
};
