import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface IntroLoaderProps {
  onComplete: () => void;
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [isExiting, setIsExiting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 4500);

    // Vanilla JS frame cycler — no React re-renders
    let frame = 1;
    let rAFId: number;
    let lastTime = performance.now();

    const draw = (time: number) => {
      if (time - lastTime >= 120) {
        const container = containerRef.current;
        if (container && container.children.length === 21) {
          const images = container.children;
          (images[frame - 1] as HTMLElement).style.opacity = "0";
          frame = frame >= 21 ? 1 : frame + 1;
          (images[frame - 1] as HTMLElement).style.opacity = "1";
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

  const frames = Array.from({ length: 21 }, (_, i) => i + 1);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isExiting && (
        <motion.div
          id="intro-page-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(12px)",
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-0 w-full h-full z-[99999] bg-[#020715] flex flex-col items-center justify-center overflow-hidden select-none"
        >
          {/* Ambient golden glow — starts small, pulses gently */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: [1, 1.25, 1], opacity: [0.45, 0.75, 0.45] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
            className="absolute w-[380px] h-[380px] bg-yellow-500/20 rounded-full blur-[120px]"
          />

          {/*
            Logo wrapper — smooth spring entry, no jarring scale/y jump.
            initial: slightly faded + barely scaled down
            animate: full size and opacity in one clean spring motion
          */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              opacity: { duration: 0.6, ease: "easeOut" },
              scale: { duration: 0.7, ease: [0.34, 1.4, 0.64, 1] },
            }}
            className="relative flex items-center justify-center w-64 h-64 md:w-80 md:h-80"
          >
            {/*
              HOW THE WHITE-BG REMOVAL WORKS:
              1. filter: invert(1)  → flips white background → black,
                                      dark logo pixels → become bright/light
              2. sepia+saturate+hue-rotate → tints those bright pixels to glowing gold
              3. mix-blend-mode: screen  → against the dark #020715 page background,
                                           black areas become invisible, golden logo shows ✓
            */}
            <div
              ref={containerRef}
              className="w-full h-full relative"
              style={{
                filter:
                  "invert(1) sepia(100%) saturate(600%) hue-rotate(5deg) brightness(1.15)",
                mixBlendMode: "screen",
              }}
            >
              {frames.map((f) => (
                <img
                  key={f}
                  src={`/fifa-loader/ezgif-frame-${f.toString().padStart(3, "0")}.png`}
                  alt=""
                  className="absolute inset-0 w-full h-full object-contain"
                  style={{ opacity: f === 1 ? 1 : 0, transition: "none" }}
                />
              ))}
            </div>

            {/* Shimmer sweep overlay */}
            <motion.div
              animate={{ backgroundPosition: ["200% center", "-200% center"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 pointer-events-none mix-blend-overlay"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
                backgroundSize: "200% 100%",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
