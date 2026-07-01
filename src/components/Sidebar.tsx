import React, { useRef, useState } from 'react';
import { useEditorStore } from '../store/useStore';
import { Upload, Type, Layout, Image as ImageIcon, Download, Settings, Type as FontIcon, Sliders, Layers, Plus, X, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

export const Sidebar = () => {
    const store = useEditorStore();
    const { data, templates } = store;
    
    const fileInputRef = useRef<HTMLInputElement>(null);
    const fontInputRef = useRef<HTMLInputElement>(null);
    const logoInputRef = useRef<HTMLInputElement>(null);
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'content' | 'design' | 'pro'>('content');

    const handleFontUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fontName = file.name.split('.')[0];
                const newFont = new FontFace(fontName, `url(${e.target?.result})`);
                newFont.load().then((loadedFace) => {
                    document.fonts.add(loadedFace);
                    store.setCustomFont(fontName, e.target?.result as string);
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => store.updateBackground(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                store.addSticker({
                    id: Date.now().toString(),
                    url: reader.result as string,
                    x: 50, y: 50, scale: 1, rotation: 0
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const RATIOS = [
        { label: '16:9', w: 1280, h: 720 },
        { label: '1:1', w: 1080, h: 1080 },
        { label: '9:16', w: 1080, h: 1920 }
    ];

    return (
        <div className="w-84 h-full glass-panel flex flex-col text-white overflow-hidden rounded-2xl ring-1 ring-white/5 shadow-2xl">
            {/* Header */}
            <div className="p-5 border-b border-white/5 shrink-0 bg-white/5 flex flex-col justify-center">
                <h1 className="text-2xl font-display font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text tracking-tighter drop-shadow-sm">
                    MusicThumb <span className="text-xs text-white/50 bg-white/10 px-2 py-0.5 rounded-full ml-1 align-middle">PRO</span>
                </h1>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/5 bg-black/20">
                {[
                    { id: 'content', icon: Layout, label: 'Content' },
                    { id: 'design', icon: Sliders, label: 'Design' },
                    { id: 'pro', icon: Settings, label: 'Advanced' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex-1 py-3 flex flex-col items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                            activeTab === tab.id ? 'text-purple-400 bg-white/5 border-b-2 border-purple-400' : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="p-4 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
                
                {/* TAB: CONTENT */}
                {activeTab === 'content' && (
                    <>
                        {/* Aspect Ratio */}
                        <section>
                            <div className="flex items-center gap-2 mb-2 text-zinc-300 text-xs uppercase tracking-widest font-bold">
                                <Layout className="w-3.5 h-3.5 text-indigo-400" /> Aspect Ratio
                            </div>
                            <div className="flex bg-zinc-900/50 rounded-xl p-1 border border-white/5">
                                {RATIOS.map(r => (
                                    <button
                                        key={r.label}
                                        onClick={() => store.setDimensions(r.w, r.h, r.label)}
                                        className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
                                            data.dimensions.width === r.w && data.dimensions.height === r.h
                                                ? 'bg-purple-500/20 text-purple-300 shadow-sm'
                                                : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                        {r.label}
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Templates */}
                        <section>
                            <div className="flex items-center gap-2 mb-2 text-zinc-300 text-xs uppercase tracking-widest font-bold">
                                <Layers className="w-3.5 h-3.5 text-purple-400" /> Templates
                            </div>
                            <div className="relative">
                                {isDropdownOpen && (
                                    <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                                )}
                                <div
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-2.5 pl-3 pr-8 text-xs text-white cursor-pointer transition-all hover:bg-zinc-800/50 flex items-center justify-between shadow-inner"
                                >
                                    <span className="truncate font-medium">
                                        {templates.find(t => t.id === data.selectedTemplateId)?.name || 'Select Template'}
                                    </span>
                                    <Layout className="w-3 h-3 text-zinc-500 shrink-0" />
                                </div>
                                {isDropdownOpen && (
                                    <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] max-h-72 overflow-y-auto flex flex-col p-1 custom-scrollbar">
                                        {Array.from(new Set(templates.map(t => t.category))).map(category => (
                                            <div key={category} className="mb-1 last:mb-0">
                                                <div className="px-3 py-1.5 text-[10px] font-bold text-purple-300 uppercase tracking-wider bg-zinc-950/80 sticky top-0 z-10 backdrop-blur-md">{category}</div>
                                                {templates.filter(t => t.category === category).map(t => (
                                                    <div
                                                        key={t.id}
                                                        onMouseEnter={() => store.setTemplate(t.id)}
                                                        onClick={() => { store.setTemplate(t.id); setIsDropdownOpen(false); }}
                                                        className={`px-3 py-2 text-xs font-medium cursor-pointer transition-colors rounded-lg mx-1 my-0.5 ${data.selectedTemplateId === t.id ? 'bg-purple-500/20 text-purple-200' : 'text-zinc-300 hover:bg-white/10 hover:text-white'}`}
                                                    >
                                                        {t.name}
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center gap-2 mb-2 text-zinc-300 text-xs uppercase tracking-widest font-bold">
                                <Type className="w-3.5 h-3.5 text-pink-400" /> Text Content
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between items-center text-[10px] text-zinc-500 font-bold uppercase">
                                    <span>Title</span>
                                </div>
                                <input
                                    value={data.title}
                                    onChange={(e) => store.updateTitle(e.target.value)}
                                    className="w-full bg-zinc-950/50 border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all hover:bg-zinc-900/50"
                                />
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between items-center text-[10px] text-zinc-500 font-bold uppercase">
                                    <span>Tracklist</span>
                                </div>
                                <textarea
                                    value={data.tracklist.join('\n')}
                                    onChange={(e) => store.updateTracklist(e.target.value)}
                                    className="w-full h-32 bg-zinc-950/50 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 font-mono scrollbar-thin transition-all hover:bg-zinc-900/50 resize-none"
                                />
                            </div>
                        </section>
                    </>
                )}

                {/* TAB: DESIGN */}
                {activeTab === 'design' && (
                    <>
                        <section>
                            <div className="flex items-center gap-2 mb-3 text-zinc-300 text-xs uppercase tracking-widest font-bold">
                                <ImageIcon className="w-3.5 h-3.5 text-emerald-400" /> Assets & Fonts
                            </div>
                            <div className="flex gap-2">
                                <div onClick={() => fileInputRef.current?.click()} className="flex-1 glass-button rounded-xl p-3 flex flex-col items-center justify-center gap-2 cursor-pointer group">
                                    <Upload className="w-5 h-5 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                                    <span className="text-[11px] text-white font-medium group-hover:text-emerald-300">Upload BG</span>
                                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                </div>
                                <div onClick={() => fontInputRef.current?.click()} className="flex-1 glass-button rounded-xl p-3 flex flex-col items-center justify-center gap-2 cursor-pointer group">
                                    <FontIcon className="w-5 h-5 text-zinc-400 group-hover:text-purple-400 transition-colors" />
                                    <span className="text-[11px] text-white font-medium group-hover:text-purple-300 truncate w-full text-center">
                                        {data.customFont ? data.customFont.name.substring(0, 8) + '...' : 'Custom Font'}
                                    </span>
                                    <input ref={fontInputRef} type="file" accept=".ttf,.otf,.woff" className="hidden" onChange={handleFontUpload} />
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center gap-2 text-zinc-300 text-xs uppercase tracking-widest font-bold">
                                <Sliders className="w-3.5 h-3.5 text-blue-400" /> Image Filters
                            </div>
                            <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/10 space-y-4 shadow-inner backdrop-blur-md">
                                {[
                                    { label: 'Blur', key: 'blur', min: 0, max: 20, step: 1, val: data.effects.blur },
                                    { label: 'Grain', key: 'grain', min: 0, max: 1, step: 0.05, val: data.effects.grain },
                                    { label: 'Vignette', key: 'vignette', min: 0, max: 1, step: 0.05, val: data.effects.vignette },
                                    { label: 'Bright', key: 'brightness', min: -1, max: 1, step: 0.1, val: data.effects.brightness },
                                    { label: 'Contrast', key: 'contrast', min: -100, max: 100, step: 5, val: data.effects.contrast },
                                    { label: 'Saturat.', key: 'saturation', min: -1, max: 1, step: 0.1, val: data.effects.saturation }
                                ].map(eff => (
                                    <div key={eff.key} className="flex items-center gap-3">
                                        <span className="text-[10px] text-zinc-400 font-medium w-12">{eff.label}</span>
                                        <input
                                            type="range" min={eff.min} max={eff.max} step={eff.step} value={eff.val}
                                            onChange={(e) => store.updateEffects({ [eff.key]: Number(e.target.value) })}
                                            className="flex-1 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-400 hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </>
                )}

                {/* TAB: PRO / ADVANCED */}
                {activeTab === 'pro' && (
                    <>
                        <section className="space-y-4">
                            <div className="flex items-center justify-between text-zinc-300 text-xs uppercase tracking-widest font-bold">
                                <div className="flex items-center gap-2">
                                    <Plus className="w-3.5 h-3.5 text-pink-400" /> Logos / Stickers
                                </div>
                                <button onClick={() => logoInputRef.current?.click()} className="text-[10px] bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors text-white">Add</button>
                                <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                            </div>
                            {data.stickers.length === 0 ? (
                                <div className="text-[10px] text-zinc-500 italic text-center p-4 border border-white/5 border-dashed rounded-xl">No logos added. Click Add to upload.</div>
                            ) : (
                                <div className="space-y-2">
                                    {data.stickers.map((s, idx) => (
                                        <div key={s.id} className="flex items-center justify-between bg-white/[0.03] p-2 rounded-lg border border-white/5">
                                            <div className="flex items-center gap-2">
                                                <img src={s.url} className="w-6 h-6 object-contain rounded bg-black/20" alt="logo" />
                                                <span className="text-xs font-medium">Logo {idx + 1}</span>
                                            </div>
                                            <button onClick={() => store.removeSticker(s.id)} className="text-zinc-500 hover:text-red-400 p-1"><X className="w-3 h-3" /></button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center gap-2 text-zinc-300 text-xs uppercase tracking-widest font-bold">
                                <Settings className="w-3.5 h-3.5 text-amber-400" /> Advanced Text Overrides
                            </div>
                            
                            <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/10 space-y-5 shadow-inner backdrop-blur-md">
                                {/* TITLE */}
                                <div>
                                    <p className="text-[11px] text-amber-200/70 mb-3 font-bold uppercase tracking-wider">Title Override</p>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-[10px] font-medium text-zinc-400">
                                            <span>Align</span>
                                            <div className="flex bg-black/40 rounded-lg border border-white/10">
                                                {['left', 'center', 'right'].map(a => (
                                                    <button 
                                                        key={a}
                                                        onClick={() => store.setCustomTitleFormatting({ customTitleAlign: a as any })}
                                                        className={`p-1.5 px-2 ${data.customTitleAlign === a ? 'bg-amber-500/20 text-amber-300' : 'hover:bg-white/10 text-zinc-500'}`}
                                                    >
                                                        {a === 'left' ? <AlignLeft className="w-3 h-3"/> : a === 'center' ? <AlignCenter className="w-3 h-3"/> : <AlignRight className="w-3 h-3"/>}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between text-[10px] font-medium text-zinc-400">
                                            <span>Text Color</span>
                                            <input type="color" value={data.customTitleColor || '#ffffff'} onChange={(e) => store.setCustomTitleColor(e.target.value)} className="w-5 h-5 rounded cursor-pointer bg-transparent border-none p-0" />
                                        </div>
                                        <div className="flex items-center justify-between text-[10px] font-medium text-zinc-400">
                                            <span>Shadow Color</span>
                                            <input type="color" value={data.customTitleShadowColor || '#000000'} onChange={(e) => store.setCustomTitleFormatting({ customTitleShadowColor: e.target.value })} className="w-5 h-5 rounded cursor-pointer bg-transparent border-none p-0" />
                                        </div>
                                        <div className="flex items-center justify-between text-[10px] font-medium text-zinc-400 gap-4">
                                            <span className="whitespace-nowrap">Shadow Blur</span>
                                            <input type="range" min="0" max="50" value={data.customTitleShadowBlur ?? 20} onChange={(e) => store.setCustomTitleFormatting({ customTitleShadowBlur: Number(e.target.value) })} className="flex-1 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-400" />
                                        </div>
                                    </div>
                                </div>
                                <div className="h-px bg-white/5" />
                                {/* TRACKLIST */}
                                <div>
                                    <p className="text-[11px] text-amber-200/70 mb-3 font-bold uppercase tracking-wider">Tracklist Override</p>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-[10px] font-medium text-zinc-400">
                                            <span>Align</span>
                                            <div className="flex bg-black/40 rounded-lg border border-white/10">
                                                {['left', 'center', 'right'].map(a => (
                                                    <button 
                                                        key={a}
                                                        onClick={() => store.setCustomTracklistFormatting({ customTracklistAlign: a as any })}
                                                        className={`p-1.5 px-2 ${data.customTracklistAlign === a ? 'bg-amber-500/20 text-amber-300' : 'hover:bg-white/10 text-zinc-500'}`}
                                                    >
                                                        {a === 'left' ? <AlignLeft className="w-3 h-3"/> : a === 'center' ? <AlignCenter className="w-3 h-3"/> : <AlignRight className="w-3 h-3"/>}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between text-[10px] font-medium text-zinc-400">
                                            <span>Text Color</span>
                                            <input type="color" value={data.customTracklistColor || '#ffffff'} onChange={(e) => store.setCustomTracklistColor(e.target.value)} className="w-5 h-5 rounded cursor-pointer bg-transparent border-none p-0" />
                                        </div>
                                        <div className="flex items-center justify-between text-[10px] font-medium text-zinc-400 gap-4">
                                            <span className="whitespace-nowrap">Shadow Blur</span>
                                            <input type="range" min="0" max="50" value={data.customTracklistShadowBlur ?? 10} onChange={(e) => store.setCustomTracklistFormatting({ customTracklistShadowBlur: Number(e.target.value) })} className="flex-1 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                )}

            </div>

            <div className="p-4 border-t border-white/5 shrink-0 bg-white/5">
                <button
                    onClick={store.triggerExport}
                    className="w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-400 hover:via-purple-400 hover:to-pink-400 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_-5px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_-5px_rgba(168,85,247,0.7)] hover:scale-[1.02]"
                >
                    <Download className="w-4 h-4" /> Export Thumbnail
                </button>
            </div>
        </div>
    );
};
