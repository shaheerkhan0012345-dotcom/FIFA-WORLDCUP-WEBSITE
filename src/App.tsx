import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X,
  Star,
  Dribbble,
  ChevronRight,
  Trophy
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { BeamsBackground } from '@/components/ui/beams-background';
import RotatingEarth from '@/components/ui/wireframe-dotted-globe';
import IntroLoader from '@/components/intro-loader';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const drawCover = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, canvasWidth: number, canvasHeight: number) => {
  const imageRatio = img.width / img.height;
  const canvasRatio = canvasWidth / canvasHeight;
  let renderWidth, renderHeight, x, y;

  if (canvasRatio > imageRatio) {
    renderWidth = canvasWidth;
    renderHeight = canvasWidth / imageRatio;
    x = 0;
    y = (canvasHeight - renderHeight) / 2;
  } else {
    renderWidth = canvasHeight * imageRatio;
    renderHeight = canvasHeight;
    x = (canvasWidth - renderWidth) / 2;
    y = 0;
  }

  ctx.drawImage(img, x, y, renderWidth, renderHeight);
};

// Premium distributed stars coordinate dataset for full-section deep celestial density
const STARS_DATA = [
  { top: "1.5%", left: "4%", size: "h-3.5 w-3.5", color: "text-yellow-400 fill-yellow-400", opacity: "opacity-60", duration: "3s" },
  { top: "3.5%", right: "8%", size: "h-2 w-2", color: "text-yellow-300 fill-yellow-300", opacity: "opacity-45", duration: "4s" },
  { top: "6%", left: "14%", size: "h-4 w-4", color: "text-yellow-400 fill-yellow-400", opacity: "opacity-70", duration: "2.5s" },
  { top: "9.5%", right: "12%", size: "h-2.5 w-2.5", color: "text-yellow-300 fill-yellow-300", opacity: "opacity-50", duration: "3.5s" },
  { top: "12%", left: "7%", size: "h-3 w-3", color: "text-yellow-400 fill-yellow-400", opacity: "opacity-65", duration: "5s" },
  { top: "15.5%", right: "15%", size: "h-3.5 w-3.5", color: "text-yellow-400 fill-yellow-400", opacity: "opacity-55", duration: "3s" },
  { top: "19%", left: "10%", size: "h-2 w-2", color: "text-yellow-300 fill-yellow-300", opacity: "opacity-40", duration: "4.5s" },
  { top: "22.5%", right: "5%", size: "h-4 w-4", color: "text-yellow-400 fill-yellow-400", opacity: "opacity-75", duration: "2s" },
  { top: "26%", left: "16%", size: "h-2.5 w-2.5", color: "text-yellow-300 fill-yellow-300", opacity: "opacity-50", duration: "3.2s" },
  { top: "29.5%", right: "9%", size: "h-3 w-3", color: "text-yellow-400 fill-yellow-400", opacity: "opacity-60", duration: "4.2s" },
  { top: "33%", left: "6%", size: "h-3.5 w-3.5", color: "text-yellow-400 fill-yellow-400", opacity: "opacity-80", duration: "2.8s" },
  { top: "36.5%", right: "14%", size: "h-2 w-2", color: "text-yellow-300 fill-yellow-300", opacity: "opacity-35", duration: "3.8s" },
  { top: "40%", left: "13%", size: "h-4 w-4", color: "text-yellow-400 fill-yellow-400", opacity: "opacity-70", duration: "4.8s" },
  { top: "43.5%", right: "8%", size: "h-2.5 w-2.5", color: "text-yellow-300 fill-yellow-300", opacity: "opacity-45", duration: "2.2s" },
  { top: "47%", left: "9%", size: "h-3 w-3", color: "text-yellow-400 fill-yellow-400", opacity: "opacity-60", duration: "3.6s" },
  { top: "50.5%", right: "18%", size: "h-3.5 w-3.5", color: "text-yellow-400 fill-yellow-400", opacity: "opacity-50", duration: "4.4s" },
  { top: "54%", left: "15%", size: "h-2 w-2", color: "text-yellow-300 fill-yellow-300", opacity: "opacity-40", duration: "3s" },
  { top: "57.5%", right: "11%", size: "h-4 w-4", color: "text-yellow-400 fill-yellow-400", opacity: "opacity-85", duration: "2.4s" },
  { top: "61%", left: "5%", size: "h-2.5 w-2.5", color: "text-yellow-300 fill-yellow-300", opacity: "opacity-65", duration: "4s" },
  { top: "64.5%", right: "16%", size: "h-3 w-3", color: "text-yellow-400 fill-yellow-400", opacity: "opacity-55", duration: "3.4s" },
  { top: "68%", left: "11%", size: "h-3.5 w-3.5", color: "text-yellow-400 fill-yellow-400", opacity: "opacity-75", duration: "2.6s" },
  { top: "71.5%", right: "10%", size: "h-2 w-2", color: "text-yellow-300 fill-yellow-300", opacity: "opacity-40", duration: "4.6s" },
  { top: "75%", left: "8%", size: "h-4 w-4", color: "text-yellow-400 fill-yellow-400", opacity: "opacity-80", duration: "3.8s" },
  { top: "78.5%", right: "6%", size: "h-2.5 w-2.5", color: "text-yellow-300 fill-yellow-300", opacity: "opacity-50", duration: "2.9s" },
  { top: "82%", left: "14%", size: "h-3 w-3", color: "text-yellow-400 fill-yellow-400", opacity: "opacity-60", duration: "4.1s" },
  { top: "85.5%", right: "15%", size: "h-3.5 w-3.5", color: "text-yellow-400 fill-yellow-400", opacity: "opacity-70", duration: "3.3s" },
  { top: "89%", left: "7%", size: "h-2 w-2", color: "text-yellow-300 fill-yellow-300", opacity: "opacity-30", duration: "5.2s" },
  { top: "92.5%", right: "9%", size: "h-4 w-4", color: "text-yellow-400 fill-yellow-400", opacity: "opacity-75", duration: "2.7s" },
  { top: "96%", left: "12%", size: "h-2.5 w-2.5", color: "text-yellow-300 fill-yellow-300", opacity: "opacity-55", duration: "3.7s" },
  { top: "98.5%", right: "12%", size: "h-3 w-3", color: "text-yellow-400 fill-yellow-400", opacity: "opacity-85", duration: "4.3s" },
  // Extra high density additions
  { top: "3%", left: "20%", size: "h-2.5 w-2.5", color: "text-yellow-300 fill-yellow-300", opacity: "opacity-40", duration: "3.1s" },
  { top: "13%", right: "25%", size: "h-3 w-3", color: "text-yellow-400 fill-yellow-400", opacity: "opacity-55", duration: "2.7s" },
  { top: "25%", left: "22%", size: "h-2 w-2", color: "text-yellow-300 fill-yellow-300", opacity: "opacity-35", duration: "4.2s" },
  { top: "35%", right: "22%", size: "h-3.5 w-3.5", color: "text-yellow-400 fill-yellow-400", opacity: "opacity-65", duration: "3.9s" },
  { top: "45%", left: "21%", size: "h-2.5 w-2.5", color: "text-yellow-300 fill-yellow-300", opacity: "opacity-50", duration: "4.3s" },
  { top: "58%", right: "24%", size: "h-3 w-3", color: "text-yellow-400 fill-yellow-400", opacity: "opacity-70", duration: "2.9s" },
  { top: "67%", left: "23%", size: "h-2 w-2", color: "text-yellow-300 fill-yellow-300", opacity: "opacity-45", duration: "3.3s" },
  { top: "79%", right: "20%", size: "h-3.5 w-3.5", color: "text-yellow-400 fill-yellow-400", opacity: "opacity-60", duration: "4.5s" },
  { top: "87%", left: "25%", size: "h-2.5 w-2.5", color: "text-yellow-300 fill-yellow-300", opacity: "opacity-50", duration: "2.6s" },
  { top: "95%", right: "23%", size: "h-3 w-3", color: "text-yellow-400 fill-yellow-400", opacity: "opacity-55", duration: "3.8s" }
];

// High-end sparse football-centric decorative coordinate dataset (low-quantity & themed)
const FOOTBALL_DATA = [
  { top: "6%", right: "18%", size: "h-5 w-5", opacity: "opacity-35", rotation: 360, duration: 18 },
  { top: "21%", left: "14%", size: "h-4.5 w-4.5", opacity: "opacity-25", rotation: -360, duration: 25 },
  { top: "37%", right: "15%", size: "h-5 w-5", opacity: "opacity-40", rotation: 360, duration: 20 },
  { top: "53%", left: "16%", size: "h-4 h-4", opacity: "opacity-25", rotation: -360, duration: 28 },
  { top: "69%", right: "20%", size: "h-5.5 w-5.5", opacity: "opacity-35", rotation: 360, duration: 22 },
  { top: "84%", left: "11%", size: "h-4.5 w-4.5", opacity: "opacity-30", rotation: -360, duration: 24 },
  { top: "95%", right: "13%", size: "h-5 w-5", opacity: "opacity-40", rotation: 360, duration: 19 }
];

interface Card3DScrollProps {
  children: React.ReactNode;
  stickyTopClass: string;
  className?: string;
  initialY?: number;
  duration?: number;
  viewportMargin?: string;
}

function Card3DScroll({ 
  children, 
  stickyTopClass, 
  className = "", 
  initialY = 80, 
  duration = 1.2, 
  viewportMargin = "-100px" 
}: Card3DScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = isMobile ? [0.9, 0.95, 0.92, 0.88] : [1.02, 1, 0.95, 0.91];

  const rotate = useTransform(scrollYProgress, [0, 0.42, 0.75, 1], [15, 0, -4, -6]);
  const scale = useTransform(scrollYProgress, [0, 0.42, 0.75, 1], scaleDimensions);
  const translate = useTransform(scrollYProgress, [0, 0.42, 0.75, 1], [25, 0, -8, -12]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.42, 0.75, 1], [0, 1, 1, 0.88, 0.78]);

  return (
    <div 
      ref={containerRef} 
      className={`${stickyTopClass} w-full`} 
      style={{ perspective: "1500px" }}
    >
      <motion.div
        initial={{ opacity: 0, y: initialY }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: viewportMargin as any }}
        transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
        style={{
          rotateX: rotate,
          scale,
          translateY: translate,
          opacity: opacity,
          transformStyle: "preserve-3d"
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

const FinalAnimationSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const targetFrameRef = useRef<number>(1);
  const currentFrameRef = useRef<number>(1);
  const lastDrawnFrameRef = useRef<number>(-1);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const frameCount = 26;
    let loadedCount = 0;
    
    const initialDraw = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (canvas && ctx && imagesRef.current[0] && imagesRef.current[0].complete) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawCover(ctx, imagesRef.current[0], canvas.width, canvas.height);
      }
    };

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `/img-2/ezgif-frame-${i.toString().padStart(3, '0')}.png`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1) {
          initialDraw();
        }
      };
      imagesRef.current.push(img);
    }
    
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const index = Math.min(Math.max(Math.round(currentFrameRef.current) - 1, 0), 25);
        const img = imagesRef.current[index];
        if (img && img.complete) {
          const ctx = canvas.getContext('2d');
          if (ctx) drawCover(ctx, img, canvas.width, canvas.height);
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerTop = rect.top;
      const containerHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      const scrollSpace = containerHeight - windowHeight;
      const scrolled = -containerTop;
      
      const progress = Math.min(Math.max(scrolled / scrollSpace, 0), 1);
      
      targetFrameRef.current = 1 + progress * 25;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    let rAFId: number;
    const lerp = (start: number, end: number, amt: number) => {
      return (1 - amt) * start + amt * end;
    };

    const updateFrame = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current = lerp(currentFrameRef.current, targetFrameRef.current, 0.08);
        const frameIndex = Math.min(Math.max(Math.round(currentFrameRef.current) - 1, 0), 25);
        if (frameIndex !== lastDrawnFrameRef.current) {
          const img = imagesRef.current[frameIndex];
          const canvas = canvasRef.current;
          const ctx = canvas?.getContext('2d');
          
          if (canvas && ctx && img && img.complete && img.width > 0) {
            drawCover(ctx, img, canvas.width, canvas.height);
            lastDrawnFrameRef.current = frameIndex;
          }
        }
        
        if (textRef.current) {
          const tOpacity = Math.min(Math.max((currentFrameRef.current - 18) / 4, 0), 1);
          textRef.current.style.opacity = tOpacity.toString();
          const tY = 50 * (1 - tOpacity);
          textRef.current.style.transform = `translateY(${tY}px)`;
        }
      }

      rAFId = requestAnimationFrame(updateFrame);
    };

    rAFId = requestAnimationFrame(updateFrame);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rAFId);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[300vh] bg-[#020714] z-40">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover opacity-90 mix-blend-lighten absolute inset-0"
        />
        {/* Overlay gradient to match theme */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020b1e] via-transparent to-[#020b1e]/20 pointer-events-none" />
        
        <div 
          ref={textRef}
          style={{ opacity: 0, transform: 'translateY(50px)' }}
          className="absolute z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center justify-center pointer-events-none transition-none"
        >
          <h2 className="font-display font-normal nextjs-text-hover text-4xl sm:text-6xl md:text-[80px] leading-[1.05] tracking-wide text-white uppercase drop-shadow-[0_10px_30px_rgba(2,11,30,0.8)]">
            Who will hold <br />
            <span className="text-yellow-400">Ballon d'Or 2026?</span>
          </h2>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'features' | 'news' | 'contacts'>('home');

  // Custom Cursor state trackers with desktop matching
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isCursorVisible, setIsCursorVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isCursorVisible) setIsCursorVisible(true);
    };

    const handleMouseLeave = () => setIsCursorVisible(false);
    const handleMouseEnter = () => setIsCursorVisible(true);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    const updateHoverClasses = () => {
      const links = document.querySelectorAll("a, button, [role='button'], .card, input, select, textarea, .interactable");
      links.forEach((link) => {
        link.addEventListener("mouseenter", () => setIsHovered(true));
        link.addEventListener("mouseleave", () => setIsHovered(false));
      });
    };

    updateHoverClasses();
    const observer = new MutationObserver(updateHoverClasses);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      observer.disconnect();
    };
  }, [isCursorVisible]);

  // Premium GSAP text and element scroll animations
  useEffect(() => {
    if (showLoader) return;

    gsap.registerPlugin(ScrollTrigger);

    const timer = setTimeout(() => {
      // 1. Fade up section groups
      const sections = gsap.utils.toArray(".gsap-fade-section");
      sections.forEach((sec: any) => {
        gsap.fromTo(sec, 
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sec,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      // 2. Headings with a cinematic curtain roll clip reveal
      const headings = gsap.utils.toArray(".gsap-fade-up-clip");
      headings.forEach((heading: any) => {
        gsap.fromTo(heading,
          { 
            y: "50px",
            opacity: 0,
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)"
          },
          {
            y: "0px",
            opacity: 1,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1.4,
            ease: "power4.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 88%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      // 3. Elegant letter stagger on tags
      const letterStaggers = gsap.utils.toArray(".gsap-stagger-letters");
      letterStaggers.forEach((line: any) => {
        const text = line.textContent || "";
        line.textContent = "";
        
        const textWrapper = document.createElement("span");
        textWrapper.className = "inline-block overflow-hidden";
        
        text.split("").forEach((char: string) => {
          const span = document.createElement("span");
          span.textContent = char === " " ? "\u00A0" : char;
          span.className = "inline-block gsap-letter transform translate-y-[120%] opacity-0";
          textWrapper.appendChild(span);
        });
        line.appendChild(textWrapper);

        gsap.to(line.querySelectorAll(".gsap-letter"), {
          y: "0%",
          opacity: 1,
          stagger: 0.02,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: line,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        });
      });
      
    }, 150);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [showLoader]);

  useEffect(() => {
    if (showLoader) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showLoader]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetFrameRef = useRef<number>(1);
  const currentFrameRef = useRef<number>(1);
  const lastDrawnFrameRef = useRef<number>(-1);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Preload frames and handle resize
  useEffect(() => {
    const frameCount = 40;
    let loadedCount = 0;
    
    const initialDraw = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (canvas && ctx && imagesRef.current[0] && imagesRef.current[0].complete) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawCover(ctx, imagesRef.current[0], canvas.width, canvas.height);
      }
    };

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `/hero-img/ezgif-frame-${i.toString().padStart(3, '0')}.png`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1) {
          initialDraw();
        }
      };
      imagesRef.current.push(img);
    }
    
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const index = Math.min(Math.max(Math.round(currentFrameRef.current) - 1, 0), 39);
        const img = imagesRef.current[index];
        if (img && img.complete) {
          const ctx = canvas.getContext('2d');
          if (ctx) drawCover(ctx, img, canvas.width, canvas.height);
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Monitor scroll progress of the first section to drive the frame scrub
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      
      const firstSectionScrollHeight = window.innerHeight * 3.5; 
      const progress = Math.min(Math.max(scrollTop / firstSectionScrollHeight, 0), 1);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pageProgress = docHeight > 0 ? scrollTop / docHeight : 0;
      
      const scrollProgressLine = document.getElementById("scroll-progress-line");
      if (scrollProgressLine) {
        scrollProgressLine.style.transform = `scaleX(${Math.min(Math.max(pageProgress, 0), 1)})`;
      }

      // Frames 1 to 40 map to progress 0 to 1
      targetFrameRef.current = 1 + progress * 39;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    let rAFId: number;
    const lerp = (start: number, end: number, amt: number) => {
      return (1 - amt) * start + amt * end;
    };

    const updateFrame = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current = lerp(currentFrameRef.current, targetFrameRef.current, 0.08);
        const frameIndex = Math.min(Math.max(Math.round(currentFrameRef.current) - 1, 0), 39);
        if (frameIndex !== lastDrawnFrameRef.current) {
          const img = imagesRef.current[frameIndex];
          const canvas = canvasRef.current;
          const ctx = canvas?.getContext('2d');
          
          if (canvas && ctx && img && img.complete && img.width > 0) {
            drawCover(ctx, img, canvas.width, canvas.height);
            lastDrawnFrameRef.current = frameIndex;
          }
        }
      }

      rAFId = requestAnimationFrame(updateFrame);
    };

    rAFId = requestAnimationFrame(updateFrame);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rAFId);
    };
  }, []);

  return (
    <div className="bg-[#020b1e] text-[#f1f5f9] flex flex-col font-sans relative select-none selection:bg-yellow-400 selection:text-blue-950 min-h-screen">
      
      {/* Animated World Cup 2026 Intro Loader Overlay */}
      {showLoader && (
        <IntroLoader onComplete={() => setShowLoader(false)} />
      )}
      
      {/* Premium Ambient Glows: Navy & Light Yellow Duotone Contrast */}
      <div className="fixed top-[15vh] left-[5%] w-[45vw] h-[45vw] max-w-[500px] bg-yellow-400/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-[20vh] right-[5%] w-[50vw] h-[50vw] max-w-[600px] bg-blue-500/10 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="fixed top-[60vh] right-[10%] w-[35vw] h-[35vw] max-w-[400px] bg-yellow-300/5 rounded-full blur-[125px] pointer-events-none z-0" />

      {/* Scroll-scrubbed Interactive Background Sequence */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#020817]">
        <canvas
          ref={canvasRef}
          className="w-full h-full opacity-80 mix-blend-lighten"
        />
        {/* Premium Navy Contrast Mask */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#020b1e] via-[#020b1e]/60 to-transparent pointer-events-none" />
      </div>

      {/* Moving Yellow Scroll Progress Indicator Line */}
      <div 
        id="scroll-progress-line"
        className="fixed top-0 left-0 w-full h-[3px] bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 z-[9999] transition-all duration-75 shadow-[0_2px_12px_rgba(250,204,21,0.8)] origin-left"
        style={{ transform: "scaleX(0)" }}
      />

      {/* Main Navigation Header removed as requested */}

      {/* SECTION 1: Transparent scroll spacer to view the trophy video spin (Trophy spin animation space) */}
      <div className="relative w-full h-[450vh] z-10 pointer-events-none flex flex-col justify-end items-center pb-12">
        {/* Spacer block to keep the helpful text at the bottom */}
        <div className="text-center font-mono text-[9px] tracking-widest text-zinc-500 pb-12 pointer-events-none select-none">
          SCROLL GENTLY TO EXPLORE
        </div>
      </div>

      {/* SECTION 2: PHYSICAL DOCUMENT FLOW (Scrolls naturally past the animation with solid background to overlay video) */}
      <section className="relative z-20 bg-gradient-to-b from-[#020b1e] via-[#041438] to-[#020b1e] w-full py-24 px-6 sm:px-12 border-t border-yellow-500/10 overflow-visible">
        
        {/* Dynamic Glowing Aurora Beams Background Animation */}
        <BeamsBackground className="opacity-25 pointer-events-none" />
        
        {/* Premium Twinkling Yellow Stars Background Decoration */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {STARS_DATA.map((star, idx) => (
            <Star 
              key={idx}
              className={`absolute text-yellow-400 fill-yellow-400 ${star.size} ${star.opacity} animate-pulse`}
              style={{
                top: star.top,
                left: (star as any).left || undefined,
                right: (star as any).right || undefined,
                animationDuration: star.duration
              }}
            />
          ))}

          {/* Sparse Golden Glowing Slowly Spinning Footballs */}
          {FOOTBALL_DATA.map((ball, idx) => (
            <motion.div
              key={`ball-${idx}`}
              className={`absolute text-yellow-500/70 ${ball.size} ${ball.opacity}`}
              style={{
                top: ball.top,
                left: (ball as any).left || undefined,
                right: (ball as any).right || undefined,
              }}
              animate={{ rotate: ball.rotation }}
              transition={{
                repeat: Infinity,
                duration: ball.duration,
                ease: "linear"
              }}
            >
              <Dribbble className="w-full h-full drop-shadow-[0_0_6px_rgba(234,179,8,0.45)]" />
            </motion.div>
          ))}
        </div>

        <div className="w-full max-w-5xl mx-auto pb-12 relative z-10">
          
          {/* Main Heading of the Second Section in beautiful white and yellow combination */}
          <motion.div 
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-24 md:mb-32"
          >
            <h2 className="gsap-fade-up-clip font-display font-normal nextjs-text-hover text-4xl sm:text-5xl md:text-[60px] leading-none tracking-wide text-white uppercase">
              WHO WILL BE <span className="text-yellow-400">CHAMPION?</span>
            </h2>
            <p className="gsap-stagger-letters font-mono text-yellow-400/60 text-xs sm:text-sm tracking-[0.3em] uppercase mt-4">
              THE BATTLE FOR ULTIMATE GLORY BEGINS
            </p>
          </motion.div>

          {/* STACKING CARDS SCROLL SYSTEM */}
          <div className="relative flex flex-col gap-0 w-full">
            
            {/* FIRST STACK CARD: Cristiano Ronaldo (Sticky in viewport) */}
            <Card3DScroll 
              stickyTopClass="sticky top-24 md:top-32 z-10 mb-32 md:mb-44"
              initialY={80}
              viewportMargin="-100px"
              duration={1.2}
              className="flex flex-col md:flex-row items-center justify-between gap-0 relative bg-[#040f2b]/95 backdrop-blur-md rounded-2xl nextjs-float p-6 border border-yellow-400/20 shadow-[0_30px_60px_rgba(2,11,30,0.7)] hover:border-yellow-400/60 hover:shadow-[0_45px_100px_rgba(234,179,8,0.25)] hover:scale-[1.015] transition-all duration-500 ease-out group cursor-pointer"
            >
              {/* Professional Country Flag Badge on Card Edge */}
              <div id="flag-ronaldo" className="absolute -top-3 -left-3 z-30 flex items-center gap-2 px-3.5 py-1.5 bg-[#030d26]/90 backdrop-blur-md rounded-full border border-yellow-400/40 shadow-[0_4px_16px_rgba(250,204,21,0.25)] hover:border-yellow-400/80 transition-all duration-300">
                <img 
                  src="https://flagcdn.com/w80/pt.png" 
                  alt="Portugal Flag" 
                  className="w-5 h-3.5 object-cover rounded-xs border border-white/20"
                  referrerPolicy="no-referrer"
                />
                <span className="font-mono text-[9px] font-black tracking-widest text-yellow-400">
                  PORTUGAL
                </span>
              </div>

              {/* Left Column: Premium Cristiano Ronaldo image card with relative shift */}
              <div className="relative w-full md:w-[58%] rounded-xl overflow-hidden shadow-2xl border border-yellow-400/10 aspect-[4/3] bg-[#02081c]">
                <img
                  src="/src/assets/images/ronaldo_matches_card_1781372448347.jpg"
                  alt="Cristiano Ronaldo on the pitch"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020b1e]/50 via-transparent to-[#020b1e]/20 pointer-events-none" />
              </div>
   
              {/* Right Overlapping Card: High density editorial card overlapping image */}
              <div className="w-full md:w-[48%] bg-[#06163e]/95 text-white rounded-lg p-8 md:p-12 shadow-[20px_20px_60px_rgba(2,11,30,0.8)] -mt-8 md:mt-0 md:-ml-16 relative z-10 flex flex-col justify-center items-start border border-yellow-400/20 group-hover:border-yellow-400/50 group-hover:-translate-y-1 transition-all duration-500 ease-out">
                
                {/* Category tag & date */}
                <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] font-black tracking-widest uppercase mb-4">
                  <span className="text-yellow-400 font-extrabold">MATCHES</span>
                  <span className="text-yellow-100/40">/</span>
                  <span className="text-yellow-100/60 font-bold">05.11.2026</span>
                </div>
   
                {/* Huge typographic headline inside card */}
                <h3 className="font-display font-normal nextjs-text-hover text-2xl sm:text-3xl md:text-[32px] leading-[1.12] tracking-wide text-white uppercase mb-3">
                  Road to <br />
                  <span className="text-yellow-400 font-extrabold">The Finals.</span>
                </h3>
   
                {/* Author/Stats subtone */}
                <p className="font-sans font-light text-blue-100/70 text-sm sm:text-base tracking-wide mb-8">
                  Uncompromising action, tactical masterclasses, and raw emotional power on the global stage.
                </p>
   
                {/* Bold Underlined text CTA link */}
                <a 
                  href="#match-summary"
                  className="group relative inline-flex flex-col items-start text-xs font-black tracking-widest text-[#fef9c3] uppercase py-1"
                >
                  <span>MORE</span>
                  <span className="h-[2px] bg-yellow-400 w-full group-hover:w-1/2 transition-all duration-300 mt-1" />
                </a>
   
              </div>
            </Card3DScroll>

            {/* SECOND STACK CARD: Lionel Messi (Slides over the First Card with deep overlapping shadows) */}
            <Card3DScroll 
              stickyTopClass="sticky top-28 md:top-36 z-20 mb-32 md:mb-44"
              initialY={120}
              viewportMargin="-80px"
              duration={1.4}
              className="flex flex-col md:flex-row items-center justify-between gap-0 relative bg-[#040f2b]/95 backdrop-blur-md rounded-2xl nextjs-float p-6 border border-yellow-400/25 shadow-[-10px_-20px_50px_rgba(2,11,30,0.8),0_40px_80px_rgba(2,11,30,0.8)] hover:border-yellow-400/65 hover:shadow-[0_45px_100px_rgba(234,179,8,0.25)] hover:scale-[1.015] transition-all duration-500 ease-out group cursor-pointer"
            >
              {/* Professional Country Flag Badge on Card Edge */}
              <div id="flag-messi" className="absolute -top-3 -left-3 z-30 flex items-center gap-2 px-3.5 py-1.5 bg-[#030d26]/90 backdrop-blur-md rounded-full border border-yellow-400/40 shadow-[0_4px_16px_rgba(250,204,21,0.25)] hover:border-yellow-400/80 transition-all duration-300">
                <img 
                  src="https://flagcdn.com/w80/ar.png" 
                  alt="Argentina Flag" 
                  className="w-5 h-3.5 object-cover rounded-xs border border-white/20"
                  referrerPolicy="no-referrer"
                />
                <span className="font-mono text-[9px] font-black tracking-widest text-yellow-400">
                  ARGENTINA
                </span>
              </div>

              {/* Left Column: Premium Lionel Messi image card */}
              <div className="relative w-full md:w-[58%] rounded-xl overflow-hidden shadow-2xl border border-yellow-400/10 aspect-[4/3] bg-[#02081c]">
                <img
                  src="/src/assets/images/messi_argentina_1781372965383.jpg"
                  alt="Lionel Messi"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020b1e]/50 via-transparent to-[#020b1e]/20 pointer-events-none" />
              </div>
   
              {/* Right Overlapping Card: High density editorial card overlapping image */}
              <div className="w-full md:w-[48%] bg-[#06163e]/95 text-white rounded-lg p-8 md:p-12 shadow-[20px_20px_60px_rgba(2,11,30,0.8)] -mt-8 md:mt-0 md:-ml-16 relative z-10 flex flex-col justify-center items-start border border-yellow-400/20 group-hover:border-yellow-400/50 group-hover:-translate-y-1 transition-all duration-500 ease-out">
                
                {/* Category tag & date */}
                <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] font-black tracking-widest uppercase mb-4">
                  <span className="text-yellow-400 font-extrabold">LEGENDS</span>
                  <span className="text-yellow-100/40">/</span>
                  <span className="text-yellow-100/60 font-bold">06.12.2026</span>
                </div>
   
                {/* Huge typographic headline inside card */}
                <h3 className="font-display font-normal nextjs-text-hover text-2xl sm:text-3xl md:text-[32px] leading-[1.12] tracking-wide text-white uppercase mb-3">
                  The Legacy <br />
                  <span className="text-yellow-400 font-extrabold">Continues.</span>
                </h3>
   
                {/* Author/Stats subtone */}
                <p className="font-sans font-light text-blue-100/70 text-sm sm:text-base tracking-wide mb-8">
                  The timeless duel of greatness, inspiring millions with flawless artistry and premium vision.
                </p>
   
                {/* Bold Underlined text CTA link */}
                <a 
                  href="#legacy-details"
                  className="group relative inline-flex flex-col items-start text-xs font-black tracking-widest text-[#fef9c3] uppercase py-1"
                >
                  <span>EXPLORE</span>
                  <span className="h-[2px] bg-yellow-400 w-full group-hover:w-1/2 transition-all duration-300 mt-1" />
                </a>
   
              </div>
            </Card3DScroll>

            {/* THIRD STACK CARD: Kylian Mbappé (Slides over the Second Card with deep overlapping shadows) */}
            <Card3DScroll 
              stickyTopClass="sticky top-32 md:top-40 z-30 mb-32 md:mb-44"
              initialY={156}
              viewportMargin="-60px"
              duration={1.5}
              className="flex flex-col md:flex-row items-center justify-between gap-0 relative bg-[#040f2b]/95 backdrop-blur-md rounded-2xl nextjs-float p-6 border border-yellow-400/30 shadow-[-10px_-20px_50px_rgba(2,11,30,0.85),0_45px_90px_rgba(2,11,30,0.85)] hover:border-yellow-400/70 hover:shadow-[0_45px_100px_rgba(234,179,8,0.25)] hover:scale-[1.015] transition-all duration-500 ease-out group cursor-pointer"
            >
              {/* Professional Country Flag Badge on Card Edge */}
              <div id="flag-mbappe" className="absolute -top-3 -left-3 z-30 flex items-center gap-2 px-3.5 py-1.5 bg-[#030d26]/90 backdrop-blur-md rounded-full border border-yellow-400/40 shadow-[0_4px_16px_rgba(250,204,21,0.25)] hover:border-yellow-400/80 transition-all duration-300">
                <img 
                  src="https://flagcdn.com/w80/fr.png" 
                  alt="France Flag" 
                  className="w-5 h-3.5 object-cover rounded-xs border border-white/20"
                  referrerPolicy="no-referrer"
                />
                <span className="font-mono text-[9px] font-black tracking-widest text-yellow-400">
                  FRANCE
                </span>
              </div>

              {/* Left Column: Premium Kylian Mbappé image card */}
              <div className="relative w-full md:w-[58%] rounded-xl overflow-hidden shadow-2xl border border-yellow-400/10 aspect-[4/3] bg-[#02081c]">
                <img
                  src="/src/assets/images/mbappe_france_card_1781373127351.jpg"
                  alt="Kylian Mbappé"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020b1e]/50 via-transparent to-[#020b1e]/20 pointer-events-none" />
              </div>
   
              {/* Right Overlapping Card: High density editorial card overlapping image */}
              <div className="w-full md:w-[48%] bg-[#06163e]/95 text-white rounded-lg p-8 md:p-12 shadow-[20px_20px_60px_rgba(2,11,30,0.8)] -mt-8 md:mt-0 md:-ml-16 relative z-10 flex flex-col justify-center items-start border border-yellow-400/20 group-hover:border-yellow-400/50 group-hover:-translate-y-1 transition-all duration-500 ease-out">
                
                {/* Category tag & date */}
                <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] font-black tracking-widest uppercase mb-4">
                  <span className="text-yellow-400 font-extrabold">FUTURE</span>
                  <span className="text-yellow-100/40">/</span>
                  <span className="text-yellow-100/60 font-bold">18.12.2026</span>
                </div>
   
                {/* Huge typographic headline inside card */}
                <h3 className="font-display font-normal nextjs-text-hover text-2xl sm:text-3xl md:text-[32px] leading-[1.12] tracking-wide text-white uppercase mb-3">
                  A New Era <br />
                  <span className="text-yellow-400 font-extrabold">Has Dawned.</span>
                </h3>
   
                {/* Author/Stats subtone */}
                <p className="font-sans font-light text-blue-100/70 text-sm sm:text-base tracking-wide mb-8">
                  Blazing-fast precision, raw athleticism, and royal leadership to carry the torch forward.
                </p>
   
                {/* Bold Underlined text CTA link */}
                <a 
                  href="#future-details"
                  className="group relative inline-flex flex-col items-start text-xs font-black tracking-widest text-[#fef9c3] uppercase py-1"
                >
                  <span>WITNESS</span>
                  <span className="h-[2px] bg-yellow-400 w-full group-hover:w-1/2 transition-all duration-300 mt-1" />
                </a>
   
              </div>
            </Card3DScroll>

            {/* FOURTH STACK CARD: Neymar Jr (Slides over the Third Card with deep overlapping shadows) */}
            <Card3DScroll 
              stickyTopClass="sticky top-36 md:top-44 z-40 mb-32 md:mb-44"
              initialY={190}
              viewportMargin="-40px"
              duration={1.6}
              className="flex flex-col md:flex-row items-center justify-between gap-0 relative bg-[#040f2b]/95 backdrop-blur-md rounded-2xl nextjs-float p-6 border border-yellow-400/35 shadow-[-10px_-20px_50px_rgba(2,11,30,0.9),0_50px_100px_rgba(2,11,30,0.9)] hover:border-yellow-400/75 hover:shadow-[0_45px_100px_rgba(234,179,8,0.25)] hover:scale-[1.015] transition-all duration-500 ease-out group cursor-pointer"
            >
              {/* Professional Country Flag Badge on Card Edge */}
              <div id="flag-neymar" className="absolute -top-3 -left-3 z-30 flex items-center gap-2 px-3.5 py-1.5 bg-[#030d26]/90 backdrop-blur-md rounded-full border border-yellow-400/40 shadow-[0_4px_16px_rgba(250,204,21,0.25)] hover:border-yellow-400/80 transition-all duration-300">
                <img 
                  src="https://flagcdn.com/w80/br.png" 
                  alt="Brazil Flag" 
                  className="w-5 h-3.5 object-cover rounded-xs border border-white/20"
                  referrerPolicy="no-referrer"
                />
                <span className="font-mono text-[9px] font-black tracking-widest text-yellow-400">
                  BRAZIL
                </span>
              </div>

              {/* Left Column: Premium Neymar Jr image card */}
              <div className="relative w-full md:w-[58%] rounded-xl overflow-hidden shadow-2xl border border-yellow-400/10 aspect-[4/3] bg-[#02081c]">
                <img
                  src="/src/assets/images/neymar_brazil_card_1781373259778.jpg"
                  alt="Neymar Jr"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020b1e]/50 via-transparent to-[#020b1e]/20 pointer-events-none" />
              </div>
   
              {/* Right Overlapping Card: High density editorial card overlapping image */}
              <div className="w-full md:w-[48%] bg-[#06163e]/95 text-white rounded-lg p-8 md:p-12 shadow-[20px_20px_60px_rgba(2,11,30,0.8)] -mt-8 md:mt-0 md:-ml-16 relative z-10 flex flex-col justify-center items-start border border-yellow-400/20 group-hover:border-yellow-400/50 group-hover:-translate-y-1 transition-all duration-500 ease-out">
                
                {/* Category tag & date */}
                <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] font-black tracking-widest uppercase mb-4">
                  <span className="text-yellow-400 font-extrabold font-black">SAMBA</span>
                  <span className="text-yellow-100/40">/</span>
                  <span className="text-yellow-100/60 font-bold font-black">21.12.2026</span>
                </div>
   
                {/* Huge typographic headline inside card */}
                <h3 className="font-display font-normal nextjs-text-hover text-2xl sm:text-3xl md:text-[32px] leading-[1.12] tracking-wide text-white uppercase mb-3">
                  Pure Samba <br />
                  <span className="text-yellow-400 font-extrabold">Magic.</span>
                </h3>
   
                {/* Author/Stats subtone */}
                <p className="font-sans font-light text-blue-100/70 text-sm sm:text-base tracking-wide mb-8">
                  Breathtaking flair, unstoppable dribbling masterclasses, and pure joyful expression of Neymar Jr.
                </p>
   
                {/* Bold Underlined text CTA link */}
                <a 
                  href="#samba-details"
                  className="group relative inline-flex flex-col items-start text-xs font-black tracking-widest text-[#fef9c3] uppercase py-1"
                >
                  <span>WITNESS FLAIR</span>
                  <span className="h-[2px] bg-yellow-400 w-full group-hover:w-1/2 transition-all duration-300 mt-1" />
                </a>
   
              </div>
            </Card3DScroll>

            {/* FIFTH STACK CARD: Lamine Yamal (Slides over the Fourth Card with deep overlapping shadows) */}
            <Card3DScroll 
              stickyTopClass="sticky top-40 md:top-48 z-50 mb-32 md:mb-44"
              initialY={224}
              viewportMargin="-20px"
              duration={1.7}
              className="flex flex-col md:flex-row items-center justify-between gap-0 relative bg-[#040f2b]/100 backdrop-blur-md rounded-2xl nextjs-float p-6 border border-yellow-400/40 shadow-[-10px_-20px_50px_rgba(2,11,30,0.95),0_55px_110px_rgba(2,11,30,0.95)] hover:border-yellow-400/80 hover:shadow-[0_45px_100px_rgba(234,179,8,0.25)] hover:scale-[1.015] transition-all duration-500 ease-out group cursor-pointer"
            >
              {/* Professional Country Flag Badge on Card Edge */}
              <div id="flag-yamal" className="absolute -top-3 -left-3 z-30 flex items-center gap-2 px-3.5 py-1.5 bg-[#030d26]/90 backdrop-blur-md rounded-full border border-yellow-400/40 shadow-[0_4px_16px_rgba(250,204,21,0.25)] hover:border-yellow-400/80 transition-all duration-300">
                <img 
                  src="https://flagcdn.com/w80/es.png" 
                  alt="Spain Flag" 
                  className="w-5 h-3.5 object-cover rounded-xs border border-white/20"
                  referrerPolicy="no-referrer"
                />
                <span className="font-mono text-[9px] font-black tracking-widest text-yellow-400">
                  SPAIN
                </span>
              </div>

              {/* Left Column: Premium Lamine Yamal image card */}
              <div className="relative w-full md:w-[58%] rounded-xl overflow-hidden shadow-2xl border border-yellow-400/10 aspect-[4/3] bg-[#02081c]">
                <img
                  src="/src/assets/images/yaml_spain_card_1781373491230.jpg"
                  alt="Lamine Yamal"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020b1e]/50 via-transparent to-[#020b1e]/20 pointer-events-none" />
              </div>
   
              {/* Right Overlapping Card: High density editorial card overlapping image */}
              <div className="w-full md:w-[48%] bg-[#06163e]/95 text-white rounded-lg p-8 md:p-12 shadow-[20px_20px_60px_rgba(2,11,30,0.8)] -mt-8 md:mt-0 md:-ml-16 relative z-10 flex flex-col justify-center items-start border border-yellow-400/20 group-hover:border-yellow-400/50 group-hover:-translate-y-1 transition-all duration-500 ease-out">
                
                {/* Category tag & date */}
                <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] font-black tracking-widest uppercase mb-4">
                  <span className="text-yellow-400 font-extrabold font-black">PRODIGY</span>
                  <span className="text-yellow-100/40">/</span>
                  <span className="text-yellow-100/60 font-bold font-black">13.07.2026</span>
                </div>
   
                {/* Huge typographic headline inside card */}
                <h3 className="font-display font-normal nextjs-text-hover text-2xl sm:text-3xl md:text-[32px] leading-[1.12] tracking-wide text-white uppercase mb-3">
                  The Golden <br />
                  <span className="text-yellow-400 font-extrabold">Wonderkid.</span>
                </h3>
   
                {/* Author/Stats subtone */}
                <p className="font-sans font-light text-blue-100/70 text-sm sm:text-base tracking-wide mb-8">
                  An extraordinary rise, fearless confidence, and elegant precision that has captured the global football pulse.
                </p>
   
                {/* Bold Underlined text CTA link */}
                <a 
                  href="#prodigy-details"
                  className="group relative inline-flex flex-col items-start text-xs font-black tracking-widest text-[#fef9c3] uppercase py-1"
                >
                  <span>EXPLORE RISE</span>
                  <span className="h-[2px] bg-yellow-400 w-full group-hover:w-1/2 transition-all duration-300 mt-1" />
                </a>
   
              </div>
            </Card3DScroll>

            {/* SIXTH STACK CARD: Vinícius Júnior (Slides over the Fifth Card with deep overlapping shadows) */}
            <Card3DScroll 
              stickyTopClass="sticky top-44 md:top-52 z-60 mb-32 md:mb-44"
              initialY={258}
              viewportMargin="-20px"
              duration={1.8}
              className="flex flex-col md:flex-row items-center justify-between gap-0 relative bg-[#040f2b]/100 backdrop-blur-md rounded-2xl nextjs-float p-6 border border-yellow-400/40 shadow-[-10px_-20px_50px_rgba(2,11,30,0.95),0_55px_110px_rgba(2,11,30,0.95)] hover:border-yellow-400/80 hover:shadow-[0_45px_100px_rgba(234,179,8,0.25)] hover:scale-[1.015] transition-all duration-500 ease-out group cursor-pointer"
            >
              {/* Professional Country Flag Badge on Card Edge */}
              <div id="flag-vini" className="absolute -top-3 -left-3 z-30 flex items-center gap-2 px-3.5 py-1.5 bg-[#030d26]/90 backdrop-blur-md rounded-full border border-yellow-400/40 shadow-[0_4px_16px_rgba(250,204,21,0.25)] hover:border-yellow-400/80 transition-all duration-300">
                <img 
                  src="https://flagcdn.com/w80/br.png" 
                  alt="Brazil Flag" 
                  className="w-5 h-3.5 object-cover rounded-xs border border-white/20"
                  referrerPolicy="no-referrer"
                />
                <span className="font-mono text-[9px] font-black tracking-widest text-yellow-400">
                  BRAZIL
                </span>
              </div>

              {/* Left Column: Premium Vinícius Júnior image card */}
              <div className="relative w-full md:w-[58%] rounded-xl overflow-hidden shadow-2xl border border-yellow-400/10 aspect-[4/3] bg-[#02081c]">
                <img
                  src="/src/assets/images/vini_jr_brazil_1781374289240.jpg"
                  alt="Vinícius Júnior"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020b1e]/50 via-transparent to-[#020b1e]/20 pointer-events-none" />
              </div>
   
              {/* Right Overlapping Card: High density editorial card overlapping image */}
              <div className="w-full md:w-[48%] bg-[#06163e]/95 text-white rounded-lg p-8 md:p-12 shadow-[20px_20px_60px_rgba(2,11,30,0.8)] -mt-8 md:mt-0 md:-ml-16 relative z-10 flex flex-col justify-center items-start border border-yellow-400/20 group-hover:border-yellow-400/50 group-hover:-translate-y-1 transition-all duration-500 ease-out">
                
                {/* Category tag & date */}
                <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] font-black tracking-widest uppercase mb-4">
                  <span className="text-yellow-400 font-extrabold font-black">DYNAMO</span>
                  <span className="text-yellow-100/40">/</span>
                  <span className="text-yellow-100/60 font-bold font-black">15.08.2026</span>
                </div>
   
                {/* Huge typographic headline inside card */}
                <h3 className="font-display font-normal nextjs-text-hover text-2xl sm:text-3xl md:text-[32px] leading-[1.12] tracking-wide text-white uppercase mb-3">
                  The Electric <br />
                  <span className="text-yellow-400 font-extrabold">Sensation.</span>
                </h3>
   
                {/* Author/Stats subtone */}
                <p className="font-sans font-light text-blue-100/70 text-sm sm:text-base tracking-wide mb-8">
                  Dazzling acceleration, lethal wing artistry, and a brilliant smile of Brazil's rising leader.
                </p>
   
                {/* Bold Underlined text CTA link */}
                <a 
                  href="#vini-details"
                  className="group relative inline-flex flex-col items-start text-xs font-black tracking-widest text-[#fef9c3] uppercase py-1"
                >
                  <span>EXPLORE SPEED</span>
                  <span className="h-[2px] bg-yellow-400 w-full group-hover:w-1/2 transition-all duration-300 mt-1" />
                </a>
   
              </div>
            </Card3DScroll>

            {/* SEVENTH STACK CARD: Jude Bellingham (Slides over the Sixth Card with deep overlapping shadows) */}
            <Card3DScroll 
              stickyTopClass="sticky top-48 md:top-56 z-70 mb-0"
              initialY={292}
              viewportMargin="-20px"
              duration={1.9}
              className="flex flex-col md:flex-row items-center justify-between gap-0 relative bg-[#040f2b]/100 backdrop-blur-md rounded-2xl nextjs-float p-6 border border-yellow-400/40 shadow-[-10px_-20px_50px_rgba(2,11,30,0.95),0_55px_110px_rgba(2,11,30,0.95)] hover:border-yellow-400/80 hover:shadow-[0_45px_100px_rgba(234,179,8,0.25)] hover:scale-[1.015] transition-all duration-500 ease-out group cursor-pointer"
            >
              {/* Professional Country Flag Badge on Card Edge */}
              <div id="flag-jude" className="absolute -top-3 -left-3 z-30 flex items-center gap-2 px-3.5 py-1.5 bg-[#030d26]/90 backdrop-blur-md rounded-full border border-yellow-400/40 shadow-[0_4px_16px_rgba(250,204,21,0.25)] hover:border-yellow-400/80 transition-all duration-300">
                <img 
                  src="https://flagcdn.com/w80/gb-eng.png" 
                  alt="England Flag" 
                  className="w-5 h-3.5 object-cover rounded-xs border border-white/20"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://flagcdn.com/w80/gb.png";
                  }}
                />
                <span className="font-mono text-[9px] font-black tracking-widest text-yellow-400">
                  ENGLAND
                </span>
              </div>

              {/* Left Column: Premium Jude Bellingham image card */}
              <div className="relative w-full md:w-[58%] rounded-xl overflow-hidden shadow-2xl border border-yellow-400/10 aspect-[4/3] bg-[#02081c]">
                <img
                  src="/src/assets/images/bellingham_england_card_1781374490508.jpg"
                  alt="Jude Bellingham"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020b1e]/50 via-transparent to-[#020b1e]/20 pointer-events-none" />
              </div>
   
              {/* Right Overlapping Card: High density editorial card overlapping image */}
              <div className="w-full md:w-[48%] bg-[#06163e]/95 text-white rounded-lg p-8 md:p-12 shadow-[20px_20px_60px_rgba(2,11,30,0.8)] -mt-8 md:mt-0 md:-ml-16 relative z-10 flex flex-col justify-center items-start border border-yellow-400/20 group-hover:border-yellow-400/50 group-hover:-translate-y-1 transition-all duration-500 ease-out">
                
                {/* Category tag & date */}
                <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] font-black tracking-widest uppercase mb-4">
                  <span className="text-yellow-400 font-extrabold font-black">MIDFIELD</span>
                  <span className="text-yellow-100/40">/</span>
                  <span className="text-yellow-100/60 font-bold font-black">28.12.2026</span>
                </div>
   
                {/* Huge typographic headline inside card */}
                <h3 className="font-display font-normal nextjs-text-hover text-2xl sm:text-3xl md:text-[32px] leading-[1.12] tracking-wide text-white uppercase mb-3">
                  The Golden <br />
                  <span className="text-yellow-400 font-extrabold">General.</span>
                </h3>
   
                {/* Author/Stats subtone */}
                <p className="font-sans font-light text-blue-100/70 text-sm sm:text-base tracking-wide mb-8">
                  Dominant physical presence, brilliant tactical leadership, and box-to-box dominance of England's generational star.
                </p>
   
                {/* Bold Underlined text CTA link */}
                <a 
                  href="#jude-details"
                  className="group relative inline-flex flex-col items-start text-xs font-black tracking-widest text-[#fef9c3] uppercase py-1"
                >
                  <span>EXPLORE POWER</span>
                  <span className="h-[2px] bg-yellow-400 w-full group-hover:w-1/2 transition-all duration-300 mt-1" />
                </a>
   
              </div>
            </Card3DScroll>

          </div>

        </div>
      </section>

      {/* SECTION 3: WORLD CUP HISTORIC HOST NATIONS GLOBAL PORTAL */}
      <section className="relative z-30 bg-[#020714] w-full py-24 px-6 sm:px-12 border-t border-yellow-500/10 overflow-hidden">
        
        {/* Ambient background glow decoration matching preceding layers */}
        <BeamsBackground className="opacity-15 pointer-events-none" />
        
        <div className="w-full max-w-6xl mx-auto relative z-10">
          
          {/* Main Title Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16 md:mb-20"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-400 text-xs font-mono tracking-widest uppercase mb-4 shadow-sm">
              <Trophy className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
              GLOBAL ARCHIVES
            </div>
            <h2 className="gsap-fade-up-clip font-display font-black nextjs-text-hover text-3xl sm:text-5xl md:text-[54px] leading-none tracking-wide text-white uppercase">
              WORLD CUP <span className="text-yellow-400 font-extrabold">HOST NATIONS</span>
            </h2>
            <p className="gsap-stagger-letters font-mono text-slate-400/80 text-xs sm:text-xs tracking-[0.25em] uppercase mt-3">
              Explore past tournament arenas and historic championship milestones
            </p>
          </motion.div>

          {/* Interactive D3 Canvas Globe Portal */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.15 }}
            className="w-full"
          >
            <RotatingEarth />
          </motion.div>

        </div>
      </section>

      {/* SECTION 4: FINAL ANIMATION SECTION */}
      <FinalAnimationSection />

      {/* Custom Theme-Matched Cursor */}
      <div 
        className="hidden md:block fixed pointer-events-none z-[99999] transition-opacity duration-300"
        style={{
          opacity: isCursorVisible ? 1 : 0,
          left: 0,
          top: 0
        }}
      >
        {/* Outer smooth-lag gold ring */}
        <div 
          className="fixed rounded-full border border-yellow-500/80 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 mix-blend-screen transition-all duration-150 ease-out"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            width: isHovered ? "54px" : "32px",
            height: isHovered ? "54px" : "32px",
            backgroundColor: isHovered ? "rgba(234, 179, 8, 0.12)" : "transparent",
            boxShadow: isHovered ? "0 0 20px rgba(234, 179, 8, 0.5)" : "0 0 8px rgba(234, 179, 8, 0.2)",
            transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`
          }}
        />
        {/* Inner high-contrast solid gold core dot */}
        <div 
          className="fixed rounded-full bg-yellow-400 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_12px_rgba(234,179,8,0.9)]"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            width: isHovered ? "8px" : "6px",
            height: isHovered ? "8px" : "6px",
            transform: `translate(-50%, -50%) scale(${isClicking ? 1.5 : 1})`,
            transition: "width 0.15s, height 0.15s, transform 0.1s"
          }}
        />
      </div>

    </div>
  );
}


