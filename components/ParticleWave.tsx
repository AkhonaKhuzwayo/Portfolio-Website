import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Particle {
    x: number;
    y: number;
    size: number;
    color: string;
    opacity: number;
    amplitude: number;
    frequency: number;
    offset: number;
    speed: number;
}

const ParticleWave: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const phase = useRef({ value: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationId: number;
        const goldShades = ['#D4AF37', '#FFD700', '#F9A602', '#E6BE8A', '#FFFFFF', '#B8860B'];

        const resize = () => {
            // Limit DPR to 1.5 to prevent massive performance hits on high-res displays
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            const width = window.innerWidth;
            const height = window.innerHeight;

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
            createParticles();
        };

        const createParticles = () => {
            particles = [];
            const count = 1800; // Reduced density for significant CPU savings
            const width = window.innerWidth;
            const height = window.innerHeight;

            for (let i = 0; i < count; i++) {
                const depth = Math.random(); // Used to simulate 3D layering
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * (height * 1.5), // Spread out further
                    size: depth * 3.2 + 0.8, // Larger particles for a "stronger" look
                    color: goldShades[Math.floor(Math.random() * goldShades.length)],
                    opacity: depth * 0.2 + 0.05, // Lower base opacity for dimming
                    amplitude: depth * 40 + 10,
                    frequency: depth * 0.004 + 0.002,
                    offset: Math.random() * Math.PI * 2,
                    speed: depth * 1.5 + 0.8 // Faster vertical drop
                });
            }
        };

        // Animate the phase variable using GSAP for smooth fluid motion
        const phaseTween = gsap.to(phase.current, {
            value: Math.PI * 2,
            duration: 10,
            repeat: -1,
            ease: "none"
        });

        // Cache theme state to avoid expensive DOM lookups in the animation loop
        let isLightMode = document.documentElement.getAttribute('data-theme') === 'light';
        const themeObserver = new MutationObserver(() => {
            isLightMode = document.documentElement.getAttribute('data-theme') === 'light';
        });
        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });

        const render = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            ctx.clearRect(0, 0, width, height);

            ctx.globalCompositeOperation = isLightMode ? 'source-over' : 'lighter';

            // Calculate scroll-dependent factors ONCE per frame, not inside the particle loop
            const scrollY = window.scrollY;
            const heroFactor = Math.max(0, 1 - (scrollY / 800));
            const alphaBase = isLightMode ? 0.6 : 0.2;
            const globalAlphaMultiplier = alphaBase + heroFactor * 0.15;
            const phaseValue = phase.current.value;

            particles.forEach(p => {
                // Heavier/Faster logic that stays strong even after Hero
                const currentSpeed = p.speed * (1 + heroFactor * 0.3);
                p.y += currentSpeed;

                // Subtle size boost in Hero, but remains large globally
                const currentSize = p.size * (1 + heroFactor * 0.2);

                // Reset when particle goes off screen
                if (p.y > height) p.y = -20;

                // Minimal horizontal sway for a more direct "drop" feel
                const xOffset = Math.sin(phaseValue * 0.5 + p.offset) * (p.amplitude * 0.2);

                // Boost alpha for visibility in light mode, otherwise keep it subtle for dark mode
                ctx.globalAlpha = p.opacity * globalAlphaMultiplier;
                ctx.beginPath();
                ctx.arc(p.x + xOffset, p.y, currentSize, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            });

            animationId = requestAnimationFrame(render);
        };

        window.addEventListener('resize', resize);
        resize();
        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
            phaseTween.kill();
            themeObserver.disconnect();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1, // Behind everything
                position: 'fixed', // Stay in background while scrolling
                pointerEvents: 'none',
                filter: 'blur(0.2px)' // Reduced blur intensity to save GPU resources
            }}
        />
    );
};

export default ParticleWave;