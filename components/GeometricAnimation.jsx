import dynamic from 'next/dynamic';
import { useState, useEffect, useCallback } from 'react';

const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
    ssr: false,
});

export default function GeometricAnimation() {
    const text = " SHARED FREQUENCIES RADIO";
    const [numParticles, setNumParticles] = useState(text.length * 4);
    const [particles, setParticles] = useState([]);
    let time = 0;

    const setup = useCallback((p5, canvasParentRef) => {
        const pixelDensity = window.devicePixelRatio || 1;
        p5.pixelDensity(pixelDensity);
        
        const parentWidth = canvasParentRef.offsetWidth;
        const canvas = p5.createCanvas(parentWidth, 150).parent(canvasParentRef);
        
        canvas.touchStarted(() => true);
        canvas.touchMoved(() => true);
        canvas.touchEnded(() => true);
        
        p5.frameRate(45);
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.textSize(window.innerWidth <= 660 ? 16 : 18);
        
        const padding = parentWidth / 2;
        const newParticles = [];
        for (let i = 0; i < numParticles; i++) {
            newParticles.push({
                x: p5.map(i, 0, numParticles, -padding, p5.width + padding),
                y: p5.height / 2,
                baseX: p5.map(i, 0, numParticles, -padding, p5.width + padding),
                baseY: p5.height / 2,
                phase: i * 0.1,
                letter: text[i % text.length],
                prevY: p5.height / 2,
                prevSpeed: 0,
                speed: window.innerWidth <= 660 ? 2 : 3
            });
        }
        setParticles(newParticles);
    }, [numParticles]);

    const draw = useCallback((p5) => {
        if (particles.length === 0) return;
        
        p5.background(0, 0, 0, 255);
        time += 0.033;
        
        const divisorWave = p5.map(p5.sin(time * 0.1), -1, 1, 8, 30);
        
        particles.forEach(particle => {
            particle.x += 2;
            
            if (particle.x > p5.windowWidth * 1.5) {
                particle.x -= p5.windowWidth * 2;
            } else if (particle.x < -p5.windowWidth * 0.5) {
                particle.x += p5.windowWidth * 2;
            }
            
            particle.prevY = particle.y;
            const prevSpeed = particle.prevSpeed;
            
            const scale = window.innerWidth <= 660 ? 1 : 1;
            const mainWave = p5.sin(time + particle.x * 0.01) * 30 * scale;
            // const detailWave = p5.sin(time * 2 + particle.x * 0.02) * 5 * scale;
            // const highFreqWave = p5.sin(time * 4 + particle.x * 0.03) * 5 * scale;
            
            particle.y = particle.baseY + mainWave;
            
            const currentSpeed = particle.y - particle.prevY;
            particle.prevSpeed = currentSpeed;
            
            const brightness = p5.map(p5.sin(time + particle.x * 0.01), -1, 1, 200, 255);
            p5.fill(brightness);
            p5.noStroke();
            
            let stretch;
            const speedFactor = Math.pow(Math.abs(currentSpeed), 2) / divisorWave;
            stretch = p5.map(speedFactor, 0, 1, 1, window.innerWidth <= 660 ? 5.0 : 10.0);
            
            p5.push();
            p5.translate(particle.x, particle.y);
            p5.scale(1, stretch);
            p5.text(particle.letter, 0, 0);
            p5.pop();
        });
    }, [particles]);

    const windowResized = useCallback((p5) => {
        if (!p5) return;
        
        const canvasParent = p5.canvas?.parentElement || document.querySelector('div[style*="overflow: hidden"]');
        if (!canvasParent) return;
        
        const parentWidth = canvasParent.offsetWidth;
        p5.resizeCanvas(parentWidth, 150);
        
        const padding = parentWidth / 2;
        const updatedParticles = particles.map((particle, i) => ({
            ...particle,
            baseX: p5.map(i, 0, numParticles, -padding, p5.width + padding),
            x: p5.map(i, 0, numParticles, -padding, p5.width + padding)
        }));
        setParticles(updatedParticles);
    }, [numParticles, particles]);

    useEffect(() => {
        const handleResize = () => {
            setNumParticles(window.innerWidth <= 660 
                ? text.length * 2
                : text.length * 4
            );
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={{ 
            position: 'relative', 
            zIndex: 0,
            width: '100%',
            overflow: 'hidden',
            WebkitTransform: 'translateZ(0)',
            transform: 'translateZ(0)',
            WebkitPerspective: '1000',
            perspective: '1000',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden'
        }}>
            <Sketch 
                setup={setup} 
                draw={draw} 
                windowResized={windowResized}
                touchStarted={() => true}
                touchMoved={() => true}
                touchEnded={() => true}
            />
        </div>
    );
} 