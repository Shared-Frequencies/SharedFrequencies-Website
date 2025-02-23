import dynamic from 'next/dynamic';
import { useState, useEffect, useCallback } from 'react';

const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
    ssr: false,
});

// Animation configuration
const CONFIG = {
    TEXT: " SHARED FREQUENCIES RADIO",
    CANVAS_HEIGHT: 150,
    FRAME_RATE: 45,
    MOBILE_BREAKPOINT: 660,
    FONT_SIZE: {
        MOBILE: 16,
        DESKTOP: 18
    },
    PARTICLE_SPEED: {
        MOBILE: 2,
        DESKTOP: 3
    },
    PARTICLE_STRETCH: {
        MOBILE: 5.0,
        DESKTOP: 10.0
    },
    PARTICLE_MULTIPLIER: {
        MOBILE: 2,
        DESKTOP: 4
    }
};

export default function GeometricAnimation() {
    // Helper function for initial random values
    const getRandomValues = () => ({
        speed: Math.random() * 4.5 + 0.5,
        amplitude: Math.random() * 45 + 5,
        frequency: Math.random() * 0.049 + 0.001
    });

    // Get initial random values
    const initialValues = getRandomValues();
    
    const [particleSpeed, setParticleSpeed] = useState(initialValues.speed);
    const [waveAmplitude, setWaveAmplitude] = useState(initialValues.amplitude);
    const [waveFrequency, setWaveFrequency] = useState(initialValues.frequency);
    const [numParticles, setNumParticles] = useState(CONFIG.TEXT.length * CONFIG.PARTICLE_MULTIPLIER.DESKTOP);
    const [particles, setParticles] = useState([]);
    const [targetSpeed, setTargetSpeed] = useState(initialValues.speed);
    const [targetAmplitude, setTargetAmplitude] = useState(initialValues.amplitude);
    const [targetFrequency, setTargetFrequency] = useState(initialValues.frequency);
    let time = 0;

    const randomizeValues = useCallback(() => {
        setTargetSpeed(Math.random() * 4.5 + 0.5); // Random speed between 0.5 and 5
        setTargetAmplitude(Math.random() * 45 + 5); // Random amplitude between 5 and 50
        setTargetFrequency(Math.random() * 0.049 + 0.001); // Random frequency between 0.001 and 0.05
    }, []);

    const setup = useCallback((p5, canvasParentRef) => {
        const pixelDensity = window.devicePixelRatio || 1;
        p5.pixelDensity(pixelDensity);
        
        const parentWidth = canvasParentRef.offsetWidth;
        const canvas = p5.createCanvas(parentWidth, CONFIG.CANVAS_HEIGHT).parent(canvasParentRef);
        
        canvas.touchStarted(() => true);
        canvas.touchMoved(() => true);
        canvas.touchEnded(() => true);
        
        p5.frameRate(CONFIG.FRAME_RATE);
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.textSize(window.innerWidth <= CONFIG.MOBILE_BREAKPOINT ? CONFIG.FONT_SIZE.MOBILE : CONFIG.FONT_SIZE.DESKTOP);
        
        const padding = parentWidth / 2;
        const newParticles = [];
        for (let i = 0; i < numParticles; i++) {
            newParticles.push({
                x: p5.map(i, 0, numParticles, -padding, p5.width + padding),
                y: p5.height / 2,
                baseX: p5.map(i, 0, numParticles, -padding, p5.width + padding),
                baseY: p5.height / 2,
                phase: i * 0.1,
                letter: CONFIG.TEXT[i % CONFIG.TEXT.length],
                prevY: p5.height / 2,
                prevSpeed: 0,
                speed: window.innerWidth <= CONFIG.MOBILE_BREAKPOINT ? CONFIG.PARTICLE_SPEED.MOBILE : CONFIG.PARTICLE_SPEED.DESKTOP
            });
        }
        setParticles(newParticles);
    }, [numParticles]);

    const draw = useCallback((p5) => {
        if (particles.length === 0) return;
        
        p5.background(0, 0, 0, 255);
        time += 0.033;

        // Smooth interpolation towards target values
        const lerpFactor = 0.05;
        setParticleSpeed(prev => p5.lerp(prev, targetSpeed, lerpFactor));
        setWaveAmplitude(prev => p5.lerp(prev, targetAmplitude, lerpFactor));
        setWaveFrequency(prev => p5.lerp(prev, targetFrequency, lerpFactor));

        const divisorWave = p5.map(p5.sin(time * 0.1), -1, 1, 8, 30);
        
        particles.forEach(particle => {
            particle.x += particleSpeed;
            
            if (particle.x > p5.windowWidth * 1.5) {
                particle.x -= p5.windowWidth * 2;
            } else if (particle.x < -p5.windowWidth * 0.5) {
                particle.x += p5.windowWidth * 2;
            }
            
            particle.prevY = particle.y;
            const prevSpeed = particle.prevSpeed;
            
            const scale = window.innerWidth <= CONFIG.MOBILE_BREAKPOINT ? 1 : 1;
            const mainWave = p5.sin(time + particle.x * waveFrequency) * waveAmplitude * scale;
            
            particle.y = particle.baseY + mainWave;
            
            const currentSpeed = particle.y - particle.prevY;
            particle.prevSpeed = currentSpeed;
            
            const brightness = p5.map(p5.sin(time + particle.x * 0.01), -1, 1, 200, 255);
            p5.fill(brightness);
            p5.noStroke();
            
            // Calculate Y-scale based on sine wave position
            const wavePhase = (time + particle.x * waveFrequency) % (2 * Math.PI);
            const normalizedPhase = Math.abs(Math.sin(wavePhase));
            const yScaleFactor = p5.map(normalizedPhase, 0, 1, 1.8, 1);
            
            p5.push();
            p5.translate(particle.x, particle.y);
            p5.scale(1, yScaleFactor); // Scale only Y axis
            p5.text(particle.letter, 0, 0);
            p5.pop();
        });
    }, [particles, particleSpeed, waveAmplitude, waveFrequency, targetSpeed, targetAmplitude, targetFrequency]);

    const windowResized = useCallback((p5) => {
        if (!p5) return;
        
        const canvasParent = p5.canvas?.parentElement || document.querySelector('div[style*="overflow: hidden"]');
        if (!canvasParent) return;
        
        const parentWidth = canvasParent.offsetWidth;
        p5.resizeCanvas(parentWidth, CONFIG.CANVAS_HEIGHT);
        
        const padding = parentWidth / 2;
        const updatedParticles = particles.map((particle, i) => ({
            ...particle,
            baseX: p5.map(i, 0, numParticles, -padding, p5.width + padding),
            x: p5.map(i, 0, numParticles, -padding, p5.width + padding)
        }));
        setParticles(updatedParticles);
    }, [numParticles, particles]);

    const mousePressed = useCallback((p5) => {
        if (p5.mouseX > 0 && p5.mouseX < p5.width && p5.mouseY > 0 && p5.mouseY < p5.height) {
            randomizeValues();
            return false; // Prevent default
        }
    }, [randomizeValues]);

    useEffect(() => {
        const handleResize = () => {
            setNumParticles(window.innerWidth <= CONFIG.MOBILE_BREAKPOINT 
                ? CONFIG.TEXT.length * CONFIG.PARTICLE_MULTIPLIER.MOBILE
                : CONFIG.TEXT.length * CONFIG.PARTICLE_MULTIPLIER.DESKTOP
            );
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
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
                backfaceVisibility: 'hidden',
                cursor: 'pointer'
            }}>
                <Sketch 
                    setup={setup} 
                    draw={draw} 
                    windowResized={windowResized}
                    mousePressed={mousePressed}
                    touchStarted={() => true}
                    touchMoved={() => true}
                    touchEnded={() => true}
                />
            </div>
        </div>
    );
} 