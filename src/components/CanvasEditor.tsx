import { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Text, Rect, Image as KonvaImage } from 'react-konva';
import Konva from 'konva';
import useImage from 'use-image';
import { useEditorStore } from '../store/useStore';
// import { cn } from '../lib/utils';

// const SCENE_WIDTH = 1280;
// const SCENE_HEIGHT = 720;

const BackgroundImage = ({ src, width, height, blur, grain }: { src: string, width: number, height: number, blur: number, grain: number }) => {
    const [image] = useImage(src);
    const imageRef = useRef<any>(null);

    useEffect(() => {
        if (imageRef.current) {
            imageRef.current.cache();
        }
    }, [image, blur, grain]);

    return (
        <KonvaImage
            ref={imageRef}
            image={image}
            width={width}
            height={height}
            filters={[Konva.Filters.Blur, Konva.Filters.Noise]}
            blurRadius={blur}
            noise={grain}
        />
    );
};

export const CanvasEditor = () => {
    const { data, getCurrentTemplate, exportTrigger, updateBackground } = useEditorStore();
    const template = getCurrentTemplate();
    const stageRef = useRef<any>(null);
    const { width: SCENE_WIDTH, height: SCENE_HEIGHT } = data.dimensions; // Dynamic Dimensions

    useEffect(() => {
        if (exportTrigger > 0 && stageRef.current) {
            const uri = stageRef.current.toDataURL({ pixelRatio: 1 });
            const link = document.createElement('a');
            link.download = `thumbnail-${Date.now()}.png`;
            link.href = uri;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }, [exportTrigger]);

    // Responsive scaling
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const newScale = Math.min(containerWidth / SCENE_WIDTH, 1);
                setScale(newScale); // Or create a smoother fit logic
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Helpers for positioning
    const getX = (percent: number) => percent * SCENE_WIDTH;
    const getY = (percent: number) => percent * SCENE_HEIGHT;

    // Drag & Drop Logic
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => updateBackground(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    // Background Logic
    const renderBackground = () => {
        if (data.backgroundImage) {
            return (
                <BackgroundImage
                    src={data.backgroundImage}
                    width={SCENE_WIDTH}
                    height={SCENE_HEIGHT}
                    blur={data.effects.blur}
                    grain={data.effects.grain}
                />
            );
        }

        // In a real app, 'template.background.value' might be a specific image url or gradient
        // For now simple color rect
        if (template.background.type === 'color' || template.background.type === 'gradient') {
            return <Rect width={SCENE_WIDTH} height={SCENE_HEIGHT} fill={template.background.value} />;
        }

        // Placeholder for template image
        return <Rect width={SCENE_WIDTH} height={SCENE_HEIGHT} fill="#333" />;
    };

    return (
        <div
            className="flex-1 flex items-center justify-center bg-zinc-900 p-8 overflow-hidden relative"
            ref={containerRef}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <div className="shadow-2xl ring-1 ring-white/10" style={{ width: SCENE_WIDTH * scale, height: SCENE_HEIGHT * scale }}>
                <Stage ref={stageRef} width={SCENE_WIDTH * scale} height={SCENE_HEIGHT * scale} scaleX={scale} scaleY={scale}>
                    <Layer>
                        {/* Background */}
                        {renderBackground()}

                        {/* Overlay if present - IMPROVED: Always add a base overlay for better text contrast as requested */}
                        <Rect width={SCENE_WIDTH} height={SCENE_HEIGHT} fill="black" opacity={0.4} />

                        {/* Additional template overlay */}
                        {template.background.overlay && (
                            <Rect width={SCENE_WIDTH} height={SCENE_HEIGHT} fill={template.background.overlay.color} opacity={template.background.overlay.opacity} />
                        )}

                        {/* Vignette Effect */}
                        {data.effects.vignette > 0 && (
                            <Rect
                                width={SCENE_WIDTH}
                                height={SCENE_HEIGHT}
                                fillRadialGradientStartPoint={{ x: SCENE_WIDTH / 2, y: SCENE_HEIGHT / 2 }}
                                fillRadialGradientStartRadius={0}
                                fillRadialGradientEndPoint={{ x: SCENE_WIDTH / 2, y: SCENE_HEIGHT / 2 }}
                                fillRadialGradientEndRadius={Math.max(SCENE_WIDTH, SCENE_HEIGHT) * 0.8}
                                fillRadialGradientColorStops={[0, 'transparent', 1, `rgba(0,0,0,${data.effects.vignette})`]}
                            />
                        )}

                        {/* Title */}
                        {/* Title */}
                        <Text
                            text={data.title}
                            x={data.customTitlePosition ? getX(data.customTitlePosition.x / 100) : getX(template.title.x)}
                            y={data.customTitlePosition ? getY(data.customTitlePosition.y / 100) : getY(template.title.y)}
                            fontSize={data.customTitleFontSize || template.title.fontSize}
                            fontFamily={data.customFont ? data.customFont.name : template.title.fontFamily}
                            fill={data.customTitleColor || template.title.color}
                            align={template.title.align}
                            width={SCENE_WIDTH} // Allow full width for centering? Or calc based on align
                            offsetX={template.title.align === 'center' ? SCENE_WIDTH / 2 : template.title.align === 'right' ? SCENE_WIDTH : 0}
                            fontStyle="bold"
                            shadowColor="black"
                            shadowBlur={20}
                            shadowOpacity={0.9}
                            shadowOffsetX={4}
                            shadowOffsetY={4}
                            wrap="word"
                        />

                        {/* Tracklist */}
                        {data.tracklist.slice(0, 20).map((track, i) => {
                            const COLUMN_LIMIT = 10;
                            const col = Math.floor(i / COLUMN_LIMIT);
                            const row = i % COLUMN_LIMIT;
                            const isMultiColumn = data.tracklist.length > COLUMN_LIMIT;

                            let align = template.tracklist.align;
                            let width = SCENE_WIDTH;
                            let offsetX = align === 'center' ? SCENE_WIDTH / 2 : align === 'right' ? width : 0;
                            let x = getX(template.tracklist.x);

                            if (isMultiColumn) {
                                // Explicitly split into 2 equal columns for 1-10 (Col 0) and 11-20 (Col 1)
                                width = (SCENE_WIDTH / 2) - 80; // Width of each column with padding

                                // Calculate base X for column
                                // Col 0 centers in left half (25%), Col 1 centers in right half (75%)
                                const colCenter = col === 0 ? SCENE_WIDTH * 0.25 : SCENE_WIDTH * 0.75;

                                if (align === 'center') {
                                    x = colCenter;
                                    offsetX = width / 2;
                                } else if (align === 'left') {
                                    // Left align relative to the column start
                                    // Col 0 starts at ~50px, Col 1 starts at center + 50px
                                    const colStart = col === 0 ? 50 : (SCENE_WIDTH / 2) + 50;
                                    x = colStart;
                                    offsetX = 0;
                                } else { // right
                                    // Right align relative to column end
                                    // Col 0 ends at center - 50px, Col 1 ends at width - 50px
                                    const colEnd = col === 0 ? (SCENE_WIDTH / 2) - 50 : SCENE_WIDTH - 50;
                                    x = colEnd;
                                    offsetX = width; // Text is drawn from x, so offset by width to align right edge
                                }
                            }

                            return (
                                <Text
                                    key={i}
                                    text={`${template.tracklist.showNumbers ? String(i + 1).padStart(2, '0') + '. ' : ''}${track}`}
                                    x={data.customTracklistStartPosition ? (isMultiColumn ? x : getX(data.customTracklistStartPosition.x / 100)) : x}
                                    y={(data.customTracklistStartPosition ? getY(data.customTracklistStartPosition.y / 100) : getY(template.tracklist.y)) + (row * (data.customTracklistFontSize || template.tracklist.fontSize) * template.tracklist.lineHeight)}
                                    // Note: Manual X override is tricky with multicolumn logic, for now applied simple X override if single column or handled above
                                    fontSize={data.customTracklistFontSize || template.tracklist.fontSize}
                                    fontFamily={data.customFont ? data.customFont.name : template.tracklist.fontFamily}
                                    fill={data.customTracklistColor || template.tracklist.color}
                                    align={align}
                                    width={width}
                                    offsetX={offsetX}
                                    shadowColor="black"
                                    shadowBlur={10}
                                    shadowOpacity={0.8}
                                    shadowOffsetX={2}
                                    shadowOffsetY={2}
                                />
                            );
                        })}
                    </Layer>
                </Stage>
            </div>
        </div>
    );
};
