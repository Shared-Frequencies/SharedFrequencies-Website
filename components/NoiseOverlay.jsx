import { useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';

const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
    ssr: false,
});

export default function NoiseOverlay() {
    const setup = useCallback((p5, canvasParentRef) => {
        const canvas = p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
        p5.pixelDensity(1);
        p5.noLoop();
        canvas.style('pointer-events', 'none');
        
        p5.loadPixels();
        for (let i = 0; i < p5.pixels.length; i += 4) {
            const noise = p5.random(4, 60);
            p5.pixels[i] = noise;      // R
            p5.pixels[i + 1] = noise;  // G
            p5.pixels[i + 2] = noise;  // B
            p5.pixels[i + 3] = 20;     // Alpha
        }
        p5.updatePixels();
    }, []);

    const draw = useCallback((p5) => {
        // Empty draw function - pattern is now generated in setup
    }, []);

    const windowResized = useCallback((p5) => {
        p5.resizeCanvas(window.innerWidth, window.innerHeight);
    }, []);

    return (
        <>
            {/* Noise overlay */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9999,
                mixBlendMode: 'multiply'
            }}>
                <Sketch 
                    setup={setup}
                    draw={draw}
                    windowResized={windowResized}
                />
            </div>

            {/* Cyan tint overlay */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9998,
                backgroundColor: 'rgba(40, 130, 255, .8)',
                mixBlendMode: 'screen'
            }} />
        </>
    );
} 