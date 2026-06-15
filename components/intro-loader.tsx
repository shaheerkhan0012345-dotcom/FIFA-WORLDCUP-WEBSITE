import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface IntroLoaderProps {
  onComplete: () => void;
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Elegant fast loading timer (2.2 seconds) to reveal the app smoothly
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isExiting && (
        <motion.div
          id="intro-page-loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.05,
            filter: "blur(4px)",
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 w-full h-full z-[99999] bg-[#020715] flex flex-col items-center justify-center overflow-hidden select-none"
        >
          {/* Extremely subtle ambient glow in the background */}
          <div className="absolute w-[250px] h-[250px] bg-yellow-500/10 rounded-full blur-[80px]" />

          {/* Centered Golden Logo Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ 
              scale: [0.95, 1, 0.97, 1],
              opacity: 1 
            }}
            transition={{
              scale: {
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut"
              },
              opacity: { duration: 0.6, ease: "easeOut" }
            }}
            className="w-48 h-64 flex items-center justify-center relative drop-shadow-[0_12px_44px_rgba(234,179,8,0.25)]"
          >
            {/* Precise High-Quality SVG recreation of the official 2026 FIFA World Cup Blocky Emblem cutout */}
            <svg 
              className="w-full h-full" 
              viewBox="0 0 200 240" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Gold metallic gradient matched perfectly to the website color theme */}
                <linearGradient id="loader-gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="50%" stopColor="#eab308" />
                  <stop offset="100%" stopColor="#ca8a04" />
                </linearGradient>

                {/* Mask for cutting out the precise white/transparent silhouette features of the Trophy and FIFA text */}
                <mask id="official-logo-cutout-mask">
                  {/* Base white block to show all content through */}
                  <rect x="0" y="0" width="200" height="240" fill="#ffffff" />
                  
                  {/* negative space cutout of World Cup Trophy */}
                  {/* Sphere at the top of the trophy */}
                  <circle cx="100" cy="85" r="21" fill="#000000" />
                  
                  {/* Elegant curved stem silhouette of the trophy */}
                  <path 
                    d="M 85,85 
                       C 85,110 90,128 92,142 
                       C 95,153 89,173 80,186 
                       C 73,197 73,201 100,201 
                       C 127,201 127,197 119,186 
                       C 110,173 105,153 108,142 
                       C 110,128 115,110 115,85 
                       Z" 
                    fill="#000000" 
                  />
                  {/* Standard trophy base tiers */}
                  <path d="M 81,198 H 119 V 213 H 81 Z" fill="#000000" />
                  
                  {/* FIFA negative space text cutout centered below the trophy stem within bottom block of "6" */}
                  <text 
                    x="100.5" 
                    y="226" 
                    fill="#000000" 
                    fontSize="13" 
                    fontWeight="1000" 
                    letterSpacing="0.8" 
                    textAnchor="middle" 
                    style={{ fontFamily: "Impact, Arial Black, sans-serif" }}
                  >
                    FIFA
                  </text>
                </mask>
              </defs>

              {/* Main Blocky '2' and '6' shapes drawn as per user picture with rounded outer bounds and sharp inner cuts */}
              <g mask="url(#official-logo-cutout-mask)">
                {/* 
                  Upper Block '2'
                  - Sharp inner cuts, thick geometric blocks
                  - Beautiful rounded outer corners (e.g. top-left and top-right)
                */}
                <path 
                  d="M 20,44 
                     C 20,24 40,16 60,16 
                     L 140,16 
                     C 160,16 180,24 180,44 
                     L 180,118 
                     L 82,118 
                     C 82,118 82,78 82,78 
                     L 138,78 
                     L 138,50 
                     L 62,50 
                     L 62,118 
                     L 20,118 
                     Z" 
                  fill="url(#loader-gold-gradient)" 
                />
                
                {/* 
                  Lower Block '6'
                  - Thick geometric block forms a solid backdrop matching the image format
                  - Beautiful rounded outer corners (e.g. bottom-left and bottom-right)
                */}
                <path 
                  d="M 20,126 
                     L 180,126 
                     L 180,160 
                     L 78,160 
                     C 78,160 78,192 78,192 
                     L 180,192 
                     L 180,214 
                     C 180,224 170,234 154,234 
                     L 46,234 
                     C 30,234 20,224 20,214 
                     Z" 
                  fill="url(#loader-gold-gradient)" 
                />
              </g>

              {/* Subtle TM trademark marker on bottom-right corner as shown in picture */}
              <text 
                x="184" 
                y="234" 
                fill="#fbcfe8" 
                opacity="0.35"
                fontSize="5" 
                fontWeight="bold"
              >
                TM
              </text>
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
