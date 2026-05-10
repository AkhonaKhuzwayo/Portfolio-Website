import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface GoldenWaveProps {
  height?: number;
}

export default function GoldenWave({ height = 120 }: GoldenWaveProps) {
  const waveContainerRef = useRef<HTMLDivElement | null>(null);
  const wave1Ref = useRef<SVGPathElement | null>(null);
  const wave2Ref = useRef<SVGPathElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useLayoutEffect(() => {
    if (!wave1Ref.current || !wave2Ref.current) return;

    const ctx = gsap.context(() => {
      // Wave 1 - faster oscillation
      gsap.to(wave1Ref.current, {
        attr: {
          d: 'M0,50 Q250,30 500,50 T1000,50 L1000,120 L0,120 Z',
        },
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Wave 2 - slower, deeper oscillation
      gsap.to(wave2Ref.current, {
        attr: {
          d: 'M0,60 Q250,45 500,60 T1000,60 L1000,120 L0,120 Z',
        },
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5,
      });
    });

    return () => ctx.revert();
  }, [isMobile]);

  const waveHeight = isMobile ? 60 : height;
  const viewBoxHeight = isMobile ? 120 : 150;

  return (
    <div
      ref={waveContainerRef}
      className="golden-wave-container"
      style={{ height: `${waveHeight}px` }}
    >
      <svg
        viewBox={`0 0 1000 ${viewBoxHeight}`}
        preserveAspectRatio="none"
        className="golden-wave-svg"
      >
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FCF6BA" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#BF953F" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#AA771C" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#BF953F" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8B7500" stopOpacity="0.3" />
          </linearGradient>

          <filter id="waveGlow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
            <feColorMatrix
              type="saturate"
              values="1.2"
            />
          </filter>
        </defs>

        {/* Wave Layer 1 - Primary */}
        <path
          ref={wave1Ref}
          d="M0,50 Q250,30 500,50 T1000,50 L1000,120 L0,120 Z"
          fill="url(#waveGradient1)"
          filter="url(#waveGlow)"
          className="wave-path wave-path-1"
        />

        {/* Wave Layer 2 - Secondary */}
        <path
          ref={wave2Ref}
          d="M0,60 Q250,45 500,60 T1000,60 L1000,120 L0,120 Z"
          fill="url(#waveGradient2)"
          className="wave-path wave-path-2"
        />
      </svg>
    </div>
  );
}
