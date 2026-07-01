import { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Text, Rect, Image as KonvaImage, Group } from 'react-konva';
import Konva from 'konva';
import useImage from 'use-image';
import { useEditorStore } from '../store/useStore';
import type { Sticker } from '../types';

const BackgroundImage = ({ src, width, height, blur, grain, brightness, contrast, saturation }: any) => {
    const [image] = useImage(src);
    const imageRef = useRef<any>(null);

    useEffect(() => {
        if (imageRef.current) {
            imageRef.current.cache();
        }
    }, [image, blur, grain, brightness, contrast, saturation]);

    // calculate crop
    let crop = { x: 0, y: 0, width: 0, height: 0 };
    if (image) {
        const imgRatio = image.width / image.height;
        const canvasRatio = width / height;
        if (canvasRatio > imgRatio) {
            crop.width = image.width;
            crop.height = image.width / canvasRatio;
            crop.x = 0;
            crop.y = (image.height - crop.height) / 2;
        } else {
            crop.height = image.height;
            crop.width = image.height * canvasRatio;
            crop.y = 0;
            crop.x = (image.width - crop.width) / 2;
        }
    }

    return (
        <KonvaImage
            ref={imageRef}
            image={image}
            width={width}
            height={height}
            crop={image ? crop : undefined}
            filters={[Konva.Filters.Blur, Konva.Filters.Noise, Konva.Filters.Brighten, Konva.Filters.Contrast, Konva.Filters.HSL]}
            blurRadius={blur}
            noise={grain}
            brightness={brightness}
            contrast={contrast}
            hslSaturation={saturation}
        />
    );
};

const StickerLayer = ({ sticker, onDragEnd }: { sticker: Sticker, onDragEnd: (e: any) => void }) => {
    const [image] = useImage(sticker.url);
    if (!image) return null;

    // Auto-scale to a reasonable default size if the image is too large
    const MAX_SIZE = 250;
    let w = image.width;
    let h = image.height;
    if (w > MAX_SIZE || h > MAX_SIZE) {
        const ratio = Math.min(MAX_SIZE / w, MAX_SIZE / h);
        w *= ratio;
        h *= ratio;
    }

    return (
        <KonvaImage
            image={image}
            x={sticker.x}
            y={sticker.y}
            width={w}
            height={h}
            scaleX={sticker.scale}
            scaleY={sticker.scale}
            rotation={sticker.rotation}
            draggable
            onDragEnd={onDragEnd}
        />
    );
};

export const CanvasEditor = () => {
    const store = useEditorStore();
    const { data, getCurrentTemplate, exportTrigger, updateBackground, updateSticker } = store;
    const template = getCurrentTemplate();
    const stageRef = useRef<any>(null);
    const { width: SCENE_WIDTH, height: SCENE_HEIGHT } = data.dimensions; 

    useEffect(() => {
        if (exportTrigger > 0 && stageRef.current) {
            // Fix: Because the Stage is scaled down for display, we must increase pixelRatio 
            // inversely so the final exported image matches the true SCENE_WIDTH/HEIGHT
            const uri = stageRef.current.toDataURL({ pixelRatio: 1 / scale });
            const link = document.createElement('a');
            link.download = `thumbnail-${Date.now()}.png`;
            link.href = uri;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }, [exportTrigger, scale]);

    // Responsive scaling
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth - 64; 
                const containerHeight = containerRef.current.offsetHeight - 64; 
                const scaleX = containerWidth / SCENE_WIDTH;
                const scaleY = containerHeight / SCENE_HEIGHT;
                const newScale = Math.min(scaleX, scaleY, 1);
                setScale(newScale);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [SCENE_WIDTH, SCENE_HEIGHT]);

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
                    brightness={data.effects.brightness}
                    contrast={data.effects.contrast}
                    saturation={data.effects.saturation}
                />
            );
        }

        if (template.background.type === 'color' || template.background.type === 'gradient') {
            return <Rect width={SCENE_WIDTH} height={SCENE_HEIGHT} fill={template.background.value} />;
        }

        return <Rect width={SCENE_WIDTH} height={SCENE_HEIGHT} fill="#333" />;
    };

    const titleAlign = data.customTitleAlign || template.title.align;
    const tracklistAlign = data.customTracklistAlign || template.tracklist.align;

    return (
        <div
            className="flex-1 flex items-center justify-center bg-transparent p-8 overflow-hidden relative"
            ref={containerRef}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <div 
                className="relative shadow-[0_0_80px_-20px_rgba(139,92,246,0.3)] rounded-lg overflow-hidden ring-1 ring-white/20 transition-transform duration-500 hover:scale-[1.01]"
                style={{ width: SCENE_WIDTH * scale, height: SCENE_HEIGHT * scale }}
            >
                <Stage ref={stageRef} width={SCENE_WIDTH * scale} height={SCENE_HEIGHT * scale} scaleX={scale} scaleY={scale}>
                    <Layer>
                        {/* Background */}
                        {renderBackground()}

                        {/* Base overlay for contrast */}
                        <Rect width={SCENE_WIDTH} height={SCENE_HEIGHT} fill="black" opacity={data.overlayOpacity ?? 0.4} />

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

                        {/* Stickers */}
                        {data.stickers.map(sticker => (
                            <StickerLayer 
                                key={sticker.id} 
                                sticker={sticker} 
                                onDragEnd={(e) => updateSticker(sticker.id, { x: e.target.x(), y: e.target.y() })} 
                            />
                        ))}

                        {/* Title */}
                        <Text
                            draggable
                            onDragEnd={(e) => {
                                const newX = Math.max(0, Math.min(e.target.x(), SCENE_WIDTH)) / SCENE_WIDTH * 100;
                                const newY = Math.max(0, Math.min(e.target.y(), SCENE_HEIGHT)) / SCENE_HEIGHT * 100;
                                store.setCustomTitlePosition(newX, newY);
                            }}
                            text={data.title}
                            x={data.customTitlePosition ? getX(data.customTitlePosition.x / 100) : getX(template.title.x)}
                            y={data.customTitlePosition ? getY(data.customTitlePosition.y / 100) : getY(template.title.y)}
                            fontSize={data.customTitleFontSize || template.title.fontSize}
                            fontFamily={data.customFont ? data.customFont.name : template.title.fontFamily}
                            fill={data.customTitleColor || template.title.color}
                            align={titleAlign}
                            width={SCENE_WIDTH} 
                            offsetX={titleAlign === 'center' ? SCENE_WIDTH / 2 : titleAlign === 'right' ? SCENE_WIDTH : 0}
                            fontStyle="bold"
                            shadowColor={data.customTitleShadowColor || "black"}
                            shadowBlur={data.customTitleShadowBlur ?? 20}
                            shadowOpacity={0.9}
                            shadowOffsetX={4}
                            shadowOffsetY={4}
                            stroke={data.customTitleStrokeColor}
                            strokeWidth={data.customTitleStrokeWidth}
                            wrap="word"
                        />

                        {/* Tracklist */}
                        <Group
                            draggable
                            onDragEnd={(e) => {
                                const groupX = e.target.x();
                                const groupY = e.target.y();
                                const currentBaseX = data.customTracklistStartPosition ? getX(data.customTracklistStartPosition.x / 100) : getX(template.tracklist.x);
                                const currentBaseY = data.customTracklistStartPosition ? getY(data.customTracklistStartPosition.y / 100) : getY(template.tracklist.y);
                                
                                const newBaseX = currentBaseX + groupX;
                                const newBaseY = currentBaseY + groupY;
                                
                                store.setCustomTracklistStartPosition(
                                    (newBaseX / SCENE_WIDTH) * 100, 
                                    (newBaseY / SCENE_HEIGHT) * 100
                                );
                                
                                e.target.x(0);
                                e.target.y(0);
                            }}
                        >
                        {data.tracklist.slice(0, 20).map((track, i) => {
                            const COLUMN_LIMIT = 10;
                            const col = Math.floor(i / COLUMN_LIMIT);
                            const row = i % COLUMN_LIMIT;
                            const isMultiColumn = data.tracklist.length > COLUMN_LIMIT;

                            let width = SCENE_WIDTH;
                            let offsetX = tracklistAlign === 'center' ? SCENE_WIDTH / 2 : tracklistAlign === 'right' ? width : 0;
                            let x = getX(template.tracklist.x);

                            if (isMultiColumn) {
                                width = (SCENE_WIDTH / 2) - 80; 
                                const colCenter = col === 0 ? SCENE_WIDTH * 0.25 : SCENE_WIDTH * 0.75;
                                if (tracklistAlign === 'center') {
                                    x = colCenter;
                                    offsetX = width / 2;
                                } else if (tracklistAlign === 'left') {
                                    const colStart = col === 0 ? 50 : (SCENE_WIDTH / 2) + 50;
                                    x = colStart;
                                    offsetX = 0;
                                } else { 
                                    const colEnd = col === 0 ? (SCENE_WIDTH / 2) - 50 : SCENE_WIDTH - 50;
                                    x = colEnd;
                                    offsetX = width; 
                                }
                            }

                            return (
                                <Text
                                    key={i}
                                    text={`${template.tracklist.showNumbers ? String(i + 1).padStart(2, '0') + '. ' : ''}${track}`}
                                    x={data.customTracklistStartPosition ? (isMultiColumn ? x : getX(data.customTracklistStartPosition.x / 100)) : x}
                                    y={(data.customTracklistStartPosition ? getY(data.customTracklistStartPosition.y / 100) : getY(template.tracklist.y)) + (row * (data.customTracklistFontSize || template.tracklist.fontSize) * template.tracklist.lineHeight)}
                                    fontSize={data.customTracklistFontSize || template.tracklist.fontSize}
                                    fontFamily={data.customFont ? data.customFont.name : template.tracklist.fontFamily}
                                    fill={data.customTracklistColor || template.tracklist.color}
                                    align={tracklistAlign}
                                    width={width}
                                    offsetX={offsetX}
                                    shadowColor={data.customTracklistShadowColor || "black"}
                                    shadowBlur={data.customTracklistShadowBlur ?? 10}
                                    shadowOpacity={0.8}
                                    shadowOffsetX={2}
                                    shadowOffsetY={2}
                                />
                            );
                        })}
                        </Group>
                    </Layer>
                </Stage>
            </div>
        </div>
    );
};
