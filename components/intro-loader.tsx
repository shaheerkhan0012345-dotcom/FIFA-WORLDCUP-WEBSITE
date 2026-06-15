import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface IntroLoaderProps {
  onComplete: () => void;
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [isExiting, setIsExiting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Extended timeout so the user can actually watch the animation properly
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 4500);

    // Ultra-fast zero-lag Vanilla JS frame cycler
    let frame = 1;
    let rAFId: number;
    let lastTime = performance.now();

    const draw = (time: number) => {
      // Slowed down significantly (120ms per frame = ~8 fps)
      // This stops it from feeling like it "moves really fast" and lets them see it draw.
      if (time - lastTime >= 120) { 
        const container = containerRef.current;
        if (container && container.children.length === 21) {
          const images = container.children;
          // Hide previous frame
          (images[frame - 1] as HTMLElement).style.opacity = '0';
          
          // Advance frame
          frame = frame >= 21 ? 1 : frame + 1;
          
          // Show next frame
          (images[frame - 1] as HTMLElement).style.opacity = '1';
        }
        lastTime = time;
      }
      rAFId = requestAnimationFrame(draw);
    };

    rAFId = requestAnimationFrame(draw);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rAFId);
    };
  }, []);

  // Pre-generate the 21 frame indices for the img tags
  const frames = Array.from({ length: 21 }, (_, i) => i + 1);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isExiting && (
        <motion.div
          id="intro-page-loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(8px)",
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 w-full h-full z-[99999] bg-[#020715] flex flex-col items-center justify-center overflow-hidden select-none"
        >
          {/* Subtle ambient golden glow behind the logo */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[300px] h-[300px] bg-yellow-500/20 rounded-full blur-[100px]" 
          />

          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: [0.95, 1.05, 0.95], opacity: 1, y: 0 }}
            transition={{
              scale: { repeat: Infinity, duration: 4, ease: "easeInOut" },
              opacity: { duration: 0.8, ease: "easeOut" },
              y: { duration: 0.8, ease: "easeOut" }
            }}
            className="relative flex items-center justify-center w-64 h-64 md:w-80 md:h-80"
          >
            {/* 
              mix-blend-screen removes any native black backgrounds.
              If the images are transparent PNGs, it perfectly layers them.
              sepia + saturate + hue-rotate tints everything into beautiful glowing gold.
              Removed invert() and contrast() which were artificially creating the 'card' borders!
            */}
            <div 
              ref={containerRef}
              className="w-full h-full mix-blend-screen relative"
              style={{
                filter: "sepia(100%) saturate(500%) hue-rotate(5deg) brightness(1.2)"
              }}
            >
              {frames.map((f) => (
                <img 
                  key={f}
                  src={`/fifa-loader/ezgif-frame-${f.toString().padStart(3, '0')}.png`}
                  alt=""
                  className="absolute inset-0 w-full h-full object-contain"
                  style={{ opacity: f === 1 ? 1 : 0, transition: 'none' }}
                />
              ))}
            </div>
            
            {/* Shimmer effect overlay */}
            <motion.div 
              animate={{ backgroundPosition: ["200% center", "-200% center"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 pointer-events-none mix-blend-overlay"
              style={{
                backgroundImage: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)",
                backgroundSize: "200% 100%"
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
