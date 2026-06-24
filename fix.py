import sys

with open('src/components/Sidebar.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = '{/* Advanced Customization: New Feature */}'
end_marker = '{/* Dedicated Color Pickers Block */}'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print('Markers not found')
    sys.exit(1)

advanced_block = """{/* Advanced Customization: New Feature */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-zinc-400 text-[10px] uppercase tracking-widest font-bold">
                        <Settings className="w-3 h-3 text-purple-400" /> Advanced Override
                    </div>

                    <div className="bg-white/5 p-3 rounded-xl border border-white/10 shadow-inner space-y-4">
                        {/* Title Overrides */}
                        <div>
                            <p className="text-[10px] text-zinc-400 mb-2 font-bold tracking-wide uppercase">Title Override</p>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <span className="text-[9px] text-zinc-500 block">Pos X ({data.customTitlePosition?.x ?? 'Auto'}%)</span>
                                    <input
                                        type="range" min={0} max={100}
                                        value={data.customTitlePosition?.x ?? getCurrentTemplate().title.x}
                                        onChange={(e) => useEditorStore.getState().setCustomTitlePosition(Number(e.target.value), data.customTitlePosition?.y ?? getCurrentTemplate().title.y)}
                                        className="w-full accent-purple-500 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer hover:bg-zinc-700"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[9px] text-zinc-500 block">Pos Y ({data.customTitlePosition?.y ?? 'Auto'}%)</span>
                                    <input
                                        type="range" min={0} max={100}
                                        value={data.customTitlePosition?.y ?? getCurrentTemplate().title.y}
                                        onChange={(e) => useEditorStore.getState().setCustomTitlePosition(data.customTitlePosition?.x ?? getCurrentTemplate().title.x, Number(e.target.value))}
                                        className="w-full accent-purple-500 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer hover:bg-zinc-700"
                                    />
                                </div>
                                <div className="space-y-1 col-span-2">
                                    <span className="text-[9px] text-zinc-500 block">Size ({data.customTitleFontSize ?? 'Auto'}px)</span>
                                    <input
                                        type="range" min={20} max={200}
                                        value={data.customTitleFontSize ?? getCurrentTemplate().title.fontSize}
                                        onChange={(e) => useEditorStore.getState().setCustomTitleFontSize(Number(e.target.value))}
                                        className="w-full accent-purple-500 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer hover:bg-zinc-700"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Tracklist Overrides */}
                        <div>
                            <p className="text-[10px] text-zinc-400 mb-2 font-bold tracking-wide uppercase">Tracklist Override</p>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <span className="text-[9px] text-zinc-500 block">Pos X ({data.customTracklistStartPosition?.x ?? 'Auto'}%)</span>
                                    <input
                                        type="range" min={0} max={100}
                                        value={data.customTracklistStartPosition?.x ?? getCurrentTemplate().tracklist.x}
                                        onChange={(e) => useEditorStore.getState().setCustomTracklistStartPosition(Number(e.target.value), data.customTracklistStartPosition?.y ?? getCurrentTemplate().tracklist.y)}
                                        className="w-full accent-purple-500 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer hover:bg-zinc-700"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[9px] text-zinc-500 block">Pos Y ({data.customTracklistStartPosition?.y ?? 'Auto'}%)</span>
                                    <input
                                        type="range" min={0} max={100}
                                        value={data.customTracklistStartPosition?.y ?? getCurrentTemplate().tracklist.y}
                                        onChange={(e) => useEditorStore.getState().setCustomTracklistStartPosition(data.customTracklistStartPosition?.x ?? getCurrentTemplate().tracklist.x, Number(e.target.value))}
                                        className="w-full accent-purple-500 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer hover:bg-zinc-700"
                                    />
                                </div>
                                <div className="space-y-1 col-span-2">
                                    <span className="text-[9px] text-zinc-500 block">Size ({data.customTracklistFontSize ?? 'Auto'}px)</span>
                                    <input
                                        type="range" min={10} max={100}
                                        value={data.customTracklistFontSize ?? getCurrentTemplate().tracklist.fontSize}
                                        onChange={(e) => useEditorStore.getState().setCustomTracklistFontSize(Number(e.target.value))}
                                        className="w-full accent-purple-500 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer hover:bg-zinc-700"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content Inputs */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 mb-1 text-zinc-400 text-[10px] uppercase tracking-widest font-bold">
                        <Type className="w-3 h-3 text-sky-400" /> Content
                    </div>

                    """

new_content = content[:start_idx] + advanced_block + content[end_idx:]

with open('src/components/Sidebar.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)
print('Successfully fixed Sidebar.tsx')
