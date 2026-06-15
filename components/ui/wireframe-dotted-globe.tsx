import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { motion, AnimatePresence } from "motion/react";
import { Compass, ZoomIn, ZoomOut, Trophy, Calendar, MapPin, Landmark, Award, X } from "lucide-react";

// Official World Cup Host Location Data
export interface HostLocation {
  id: string;
  name: string;
  country: string;
  year: string;
  lat: number;
  lng: number;
  flag: string;
  info: string;
  stadium: string;
  winner: string;
}

export const HOST_LATEST_DATA: HostLocation[] = [
  {
    id: "northamerica2026",
    name: "Dallas, NY/NJ, Mexico & Canada",
    country: "USA, Mexico & Canada",
    year: "2026",
    lat: 32.7767,
    lng: -96.7970,
    flag: "🇺🇸🇲🇽🇨🇦",
    info: "The first ever 48-team World Cup spread across three massive co-host nations, featuring 104 matches of epic global showdowns.",
    stadium: "MetLife Stadium, AT&T Stadium & Estadio Azteca",
    winner: "TBD / Upcoming"
  },
  {
    id: "qatar2022",
    name: "Doha",
    country: "Qatar",
    year: "2022",
    lat: 25.2854,
    lng: 51.5310,
    flag: "🇶🇦",
    info: "A spectacular Winter World Cup culminating in Lionel Messi lifting the trophy after one of the greatest finals in sporting history.",
    stadium: "Lusail Iconic Stadium",
    winner: "Argentina 🇦🇷"
  },
  {
    id: "russia2018",
    name: "Moscow",
    country: "Russia",
    year: "2018",
    lat: 55.7558,
    lng: 37.6173,
    flag: "🇷🇺",
    info: "An action-packed tournament concluding with Kylian Mbappé and France storming to victory against Croatia in Moscow.",
    stadium: "Luzhniki Stadium",
    winner: "France 🇫🇷"
  },
  {
    id: "brazil2014",
    name: "Rio de Janeiro",
    country: "Brazil",
    year: "2014",
    lat: -22.9068,
    lng: -43.1729,
    flag: "🇧🇷",
    info: "Full of Brazilian samba spirit and drama, featuring Germany's historic, clinical triumph over Argentina at the iconic Maracanã.",
    stadium: "Maracanã Stadium",
    winner: "Germany 🇩🇪"
  },
  {
    id: "safrica2010",
    name: "Johannesburg",
    country: "South Africa",
    year: "2010",
    lat: -26.2041,
    lng: 28.0473,
    flag: "🇿🇦",
    info: "Africa's historic first FIFA World Cup, legendary for the rhythmic hum of Vuvuzelas and Spain's maiden world championship victory.",
    stadium: "Soccer City (FNB Stadium)",
    winner: "Spain 🇪🇸"
  },
  {
    id: "germany2006",
    name: "Berlin",
    country: "Germany",
    year: "2006",
    lat: 52.5200,
    lng: 13.4050,
    flag: "🇩🇪",
    info: "Praised as the highly organized 'Sommermärchen' (Summer Fairytale). Italy secured their fourth star in a legendary penalty shootout.",
    stadium: "Olympiastadion Berlin",
    winner: "Italy 🇮🇹"
  },
  {
    id: "koreajapan2002",
    name: "Yokohama & Seoul",
    country: "Japan & South Korea",
    year: "2002",
    lat: 35.4437,
    lng: 139.6441,
    flag: "🇯🇵🇰🇷",
    info: "The first World Cup held in Asia, co-hosted beautifully. Highlighted by South Korea's dream run and Ronaldo Nazário's redemption goals.",
    stadium: "International Stadium Yokohama",
    winner: "Brazil 🇧🇷"
  },
  {
    id: "france1998",
    name: "Paris",
    country: "France",
    year: "1998",
    lat: 48.8566,
    lng: 2.3522,
    flag: "🇫🇷",
    info: "Zinedine Zidane's immortal heading masterclass secured Les Bleus their historic first-ever title under a roaring home crowd.",
    stadium: "Stade de France",
    winner: "France 🇫🇷"
  },
  {
    id: "usa1994",
    name: "Pasadena (Los Angeles)",
    country: "USA",
    year: "1994",
    lat: 34.1613,
    lng: -118.1676,
    flag: "🇺🇸",
    info: "Shattered attendance records that stand to this day, culminating in a dramatic goalless final and legendary penalty shootout.",
    stadium: "Rose Bowl",
    winner: "Brazil 🇧🇷"
  },
  {
    id: "italy1990",
    name: "Rome",
    country: "Italy",
    year: "1990",
    lat: 41.9028,
    lng: 12.4964,
    flag: "🇮🇹",
    info: "Atmospheres lit up by Pavarotti's soaring peak 'Nessun Dorma', and Lothar Matthäus leading West Germany to ultimate glory.",
    stadium: "Stadio Olimpico",
    winner: "West Germany 🇩🇪"
  },
  {
    id: "mexico1986",
    name: "Mexico City",
    country: "Mexico",
    year: "1986",
    lat: 19.4326,
    lng: -99.1332,
    flag: "🇲🇽",
    info: "Diego Maradona's legendary masterclass, featuring the iconic 'Hand of God' and the breathtaking 'Goal of the Century' at Azteca.",
    stadium: "Estadio Azteca",
    winner: "Argentina 🇦🇷"
  }
];

export const HOST_FLAG_IMAGES: Record<string, string[]> = {
  northamerica2026: ["us", "mx", "ca"],
  qatar2022: ["qa"],
  russia2018: ["ru"],
  brazil2014: ["br"],
  safrica2010: ["za"],
  germany2006: ["de"],
  koreajapan2002: ["jp", "kr"],
  france1998: ["fr"],
  usa1994: ["us"],
  italy1990: ["it"],
  mexico1986: ["mx"]
};

export const getWinnerFlagCode = (winner: string): string | null => {
  const lower = winner.toLowerCase();
  if (lower.includes("argentina")) return "ar";
  if (lower.includes("france")) return "fr";
  if (lower.includes("germany")) return "de";
  if (lower.includes("spain")) return "es";
  if (lower.includes("italy")) return "it";
  if (lower.includes("brazil")) return "br";
  return null;
};

interface RotatingEarthProps {
  width?: number;
  height?: number;
  className?: string;
  onSelectHost?: (host: HostLocation) => void;
}

export default function RotatingEarth({ width = 1200, height = 800, className = "", onSelectHost }: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedHostId, setSelectedHostId] = useState<string>("northamerica2026");
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [infoCardVisible, setInfoCardVisible] = useState<boolean>(false);

  // References to communicate with D3 loop dynamically
  const stateRef = useRef({
    selectedId: "northamerica2026",
    targetRotation: null as [number, number] | null,
    autoRotate: true,
    manualRotation: [35, -15] as [number, number], // Starters position angled to NA
    currentRadius: 300,
    userDragging: false,
    resumeTimer: null as any
  });

  // Track state change in ref
  useEffect(() => {
    stateRef.current.selectedId = selectedHostId;
  }, [selectedHostId]);

  const flagImagesRef = useRef<Record<string, HTMLImageElement>>({});

  useEffect(() => {
    const codes = ["us", "mx", "ca", "qa", "ru", "br", "za", "de", "jp", "kr", "fr", "it"];
    codes.forEach(code => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = `https://flagcdn.com/w80/${code}.png`;
      img.onload = () => {
        flagImagesRef.current[code] = img;
      };
    });
  }, []);

  // Handle choosing host from UI list
  const chooseHost = (id: string) => {
    setSelectedHostId(id);
    const host = HOST_LATEST_DATA.find((h) => h.id === id);
    if (host) {
      if (onSelectHost) onSelectHost(host);
      // Disable auto rotate and queue smooth interpolation to this city
      stateRef.current.autoRotate = false;
      stateRef.current.targetRotation = [-host.lng, -host.lat];
      
      // Keep card open
      setInfoCardVisible(true);

      // Reset auto rotation resumption timer
      if (stateRef.current.resumeTimer) clearTimeout(stateRef.current.resumeTimer);
      stateRef.current.resumeTimer = setTimeout(() => {
        stateRef.current.autoRotate = true;
      }, 7000);
    }
  };

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    // Use parent container width for seamless responsiveness
    let currentW = containerRef.current.clientWidth || width;
    let currentH = Math.min(height, window.innerHeight * 0.78);
    
    // Scale size proportionally to be more immersive (larger but within safe bounds)
    let baseRadius = Math.min(currentW, currentH) / 2.15;
    stateRef.current.currentRadius = baseRadius * zoomLevel;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = currentW * dpr;
    canvas.height = currentH * dpr;
    canvas.style.width = `${currentW}px`;
    canvas.style.height = `${currentH}px`;
    context.scale(dpr, dpr);

    // Create orthographic projection
    const projection = d3
      .geoOrthographic()
      .scale(stateRef.current.currentRadius)
      .translate([currentW / 2, currentH / 2])
      .clipAngle(90);

    const path = d3.geoPath().projection(projection).context(context);

    // High detail checking algorithm helpers for dotted land representation
    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point;
      let inside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside;
        }
      }
      return inside;
    };

    const pointInFeature = (point: [number, number], feature: any): boolean => {
      const geometry = feature.geometry;
      if (geometry.type === "Polygon") {
        const coordinates = geometry.coordinates;
        if (!pointInPolygon(point, coordinates[0])) {
          return false;
        }
        for (let i = 1; i < coordinates.length; i++) {
          if (pointInPolygon(point, coordinates[i])) {
            return false;
          }
        }
        return true;
      } else if (geometry.type === "MultiPolygon") {
        for (const polygon of geometry.coordinates) {
          if (pointInPolygon(point, polygon[0])) {
            let inHole = false;
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) {
                inHole = true;
                break;
              }
            }
            if (!inHole) {
              return true;
            }
          }
        }
        return false;
      }
      return false;
    };

    // Fast resolution grids for golden halftone dots
    const generateDotsInPolygon = (feature: any, dotSpacing = 16) => {
      const dots: [number, number][] = [];
      const bounds = d3.geoBounds(feature);
      const [[minLng, minLat], [maxLng, maxLat]] = bounds;

      // Adaptive step size based on grid size
      const stepSize = dotSpacing * 0.082;
      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point: [number, number] = [lng, lat];
          if (pointInFeature(point, feature)) {
            dots.push(point);
          }
        }
      }
      return dots;
    };

    interface DotData {
      lng: number;
      lat: number;
    }

    const allDots: DotData[] = [];
    let landFeatures: any;

    const render = () => {
      if (!context) return;
      context.clearRect(0, 0, currentW, currentH);

      const activeRadius = projection.scale();
      const scaleFactor = activeRadius / baseRadius;

      // Draw Earth ocean styled in deep space blue to merge perfectly with background
      context.beginPath();
      context.arc(currentW / 2, currentH / 2, activeRadius, 0, 2 * Math.PI);
      
      // Beautiful deep radial space-ocean fill
      const oceanGrad = context.createRadialGradient(
        currentW / 2 - activeRadius * 0.2, currentH / 2 - activeRadius * 0.2, activeRadius * 0.1,
        currentW / 2, currentH / 2, activeRadius
      );
      // Perfect dark aesthetic, color aligned with page background
      oceanGrad.addColorStop(0, "#040d21");
      oceanGrad.addColorStop(0.5, "#020716");
      oceanGrad.addColorStop(1, "#01040a");
      context.fillStyle = oceanGrad;
      context.fill();

      // Soft white backlighting-shield ring
      context.lineWidth = 1.5 * scaleFactor;
      context.strokeStyle = "rgba(234, 179, 8, 0.45)"; // Soft golden edge
      context.stroke();

      if (landFeatures) {
        // Draw Golden Graticule lines (longitude/latitude grid)
        const graticule = d3.geoGraticule();
        context.beginPath();
        path(graticule());
        context.strokeStyle = "#d4af37"; // Elegant gold color
        context.lineWidth = 0.6 * scaleFactor;
        context.globalAlpha = 0.12; // Translucent
        context.stroke();
        context.globalAlpha = 1.0;

        // Draw translucent landmasses glowing underlying borders
        context.beginPath();
        landFeatures.features.forEach((feature: any) => {
          path(feature);
        });
        context.fillStyle = "rgba(212, 175, 55, 0.04)"; // Extremely subtle inner gold land fill
        context.fill();
        context.strokeStyle = "rgba(212, 175, 55, 0.35)"; // Soft gold land outline
        context.lineWidth = 0.8 * scaleFactor;
        context.stroke();

        // Draw Halftone grid dots in majestic gold/yellow
        context.fillStyle = "#fbbf24"; // Radiant yellow/gold dots
        context.globalAlpha = 0.8;
        allDots.forEach((dot) => {
          const projected = projection([dot.lng, dot.lat]);
          if (
            projected &&
            projected[0] >= 0 &&
            projected[0] <= currentW &&
            projected[1] >= 0 &&
            projected[1] <= currentH
          ) {
            context.beginPath();
            context.arc(projected[0], projected[1], 1.15 * scaleFactor, 0, 2 * Math.PI);
            context.fill();
          }
        });
        context.globalAlpha = 1.0;

        // Draw interactive pins with pulsing animations for Host Nations
        const centerLngLat: [number, number] = [-projection.rotate()[0], -projection.rotate()[1]];
        const timeElapsed = performance.now();

        HOST_LATEST_DATA.forEach((host) => {
          // Check if the coordinate is in the visible front hemisphere (within 90 degrees)
          const isVisible = d3.geoDistance([host.lng, host.lat], centerLngLat) < Math.PI / 2;
          
          if (isVisible) {
            const projected = projection([host.lng, host.lat]);
            if (projected) {
              const x = projected[0];
              const y = projected[1];
              const isSelected = host.id === stateRef.current.selectedId;

              // Animated pulsing circle indicators
              const pulseCycle = (timeElapsed % 1200) / 1200; // 0 to 1 cycle
              const pulseRadius = (isSelected ? 24 : 15) * scaleFactor * (1 + pulseCycle * 0.4);
              const pulseOpacity = 1 - pulseCycle;

              context.save();
              
              // Pulsing halo
              context.beginPath();
              context.arc(x, y, pulseRadius, 0, 2 * Math.PI);
              context.strokeStyle = isSelected ? "rgba(255, 234, 0, " + pulseOpacity + ")" : "rgba(212, 175, 55, " + pulseOpacity + ")";
              context.lineWidth = isSelected ? 2.5 : 1.2;
              context.stroke();

              // Drawing a solid bright core dot surrounded by a glowing shadow
              context.beginPath();
              context.arc(x, y, (isSelected ? 7 : 4.5) * scaleFactor, 0, 2 * Math.PI);
              
              // Radiant yellow/white core for active, bright amber/gold for others
              const dotGradient = context.createRadialGradient(x, y, 0.5, x, y, (isSelected ? 7 : 4.5) * scaleFactor);
              if (isSelected) {
                dotGradient.addColorStop(0, "#ffffff");
                dotGradient.addColorStop(0.3, "#facc15");
                dotGradient.addColorStop(1, "#d97706");
              } else {
                dotGradient.addColorStop(0, "#fef08a");
                dotGradient.addColorStop(1, "#b45309");
              }
              context.fillStyle = dotGradient;
              
              // Add shadow glow inside 2D canvas
              context.shadowColor = "#facc15";
              context.shadowBlur = isSelected ? 18 : 8;
              context.fill();

              // Label overlay for selected host
              if (isSelected) {
                context.shadowBlur = 0; // reset
                const flagCodes = HOST_FLAG_IMAGES[host.id] || [];
                const flagW = 16;
                const flagH = 11;
                const space = 2;
                const totalW = flagCodes.length * flagW + (flagCodes.length - 1) * space;

                const yearText = host.year;
                context.font = `bold ${Math.max(10, 11 * scaleFactor)}px var(--font-sans)`;
                const yearWidth = context.measureText(yearText).width;
                
                const contentGap = 5;
                const totalContentW = totalW + (totalW > 0 ? contentGap : 0) + yearWidth;
                
                const padX = 6;
                const padY = 3.5;
                
                const rx = x - totalContentW / 2 - padX;
                const ry = y - 18 * scaleFactor - 16;
                const rw = totalContentW + padX * 2;
                const rh = 14 + padY * 2;
                
                context.fillStyle = "rgba(11, 17, 30, 0.95)";
                context.strokeStyle = "rgba(250, 204, 21, 0.9)";
                context.lineWidth = 1.5;
                
                context.beginPath();
                context.roundRect(rx, ry, rw, rh, 5);
                context.fill();
                context.stroke();

                // Draw flags starting X inside the banner
                let currentDrawX = rx + padX;
                const drawY = ry + (rh - flagH) / 2;
                
                let loadedAll = true;
                flagCodes.forEach((code) => {
                  if (!flagImagesRef.current[code]) loadedAll = false;
                });
                
                if (loadedAll) {
                  flagCodes.forEach((code) => {
                    const img = flagImagesRef.current[code];
                    if (img) {
                      context.drawImage(img, currentDrawX, drawY, flagW, flagH);
                    }
                    currentDrawX += flagW + space;
                  });
                  currentDrawX += contentGap - space; // offset back
                } else {
                  // Fallback emoji
                  context.fillStyle = "#ffffff";
                  context.fillText(host.flag + " ", currentDrawX, ry + rh - padY);
                  currentDrawX += context.measureText(host.flag + " ").width;
                }
                
                // Draw Year Text
                context.fillStyle = "#fef08a"; // Vibrant text
                context.font = `bold ${Math.max(10, 11 * scaleFactor)}px var(--font-sans)`;
                context.textAlign = "left";
                context.textBaseline = "middle";
                context.fillText(yearText, currentDrawX, ry + rh / 2 + 0.5);
              } else {
                // Draw small flag images right above the unselected yellow dots
                context.shadowBlur = 0; // reset
                const flagCodes = HOST_FLAG_IMAGES[host.id] || [];
                const flagW = 16;
                const flagH = 11;
                const space = 2;
                const totalW = flagCodes.length * flagW + (flagCodes.length - 1) * space;
                
                let startX = x - totalW / 2;
                let drawY = y - (11 * scaleFactor) - flagH;
                
                let loadedAll = true;
                flagCodes.forEach((code) => {
                  if (!flagImagesRef.current[code]) loadedAll = false;
                });
                
                if (loadedAll) {
                  // Draw elegant background outline slot for flags to make them pop!
                  context.fillStyle = "rgba(4, 13, 33, 0.75)";
                  context.strokeStyle = "rgba(250, 204, 21, 0.35)";
                  context.lineWidth = 1;
                  context.beginPath();
                  context.roundRect(startX - 2.5, drawY - 2.5, totalW + 5, flagH + 5, 4);
                  context.fill();
                  context.stroke();

                  // Render flags side-by-side
                  flagCodes.forEach((code) => {
                    const img = flagImagesRef.current[code];
                    if (img) {
                      context.drawImage(img, startX, drawY, flagW, flagH);
                    }
                    startX += flagW + space;
                  });
                } else {
                  // Fallback to emoji if images aren't fully preloaded yet
                  context.shadowBlur = 0;
                  context.font = `${Math.max(12, 12 * scaleFactor)}px var(--font-sans)`;
                  context.textAlign = "center";
                  context.textBaseline = "bottom";
                  context.fillStyle = "#ffffff";
                  context.fillText(host.flag, x, y - 8 * scaleFactor);
                }
              }
              context.restore();
            }
          }
        });
      }
    };

    // Load geometry features and run
    const loadWorldData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json"
        );
        if (!response.ok) throw new Error("Failed to load land data");
        landFeatures = await response.json();

        // Multi-tier dot resolver
        landFeatures.features.forEach((feature: any) => {
          const dots = generateDotsInPolygon(feature, 20); // Spacing optimized for beauty and computation
          dots.forEach(([lng, lat]) => {
            allDots.push({ lng, lat });
          });
        });

        setIsLoading(false);
        render();
      } catch (err: any) {
        console.error("D3 map load failure", err);
        setError("Failed to stream digital physical map data. Please verify your connection.");
        setIsLoading(false);
      }
    };

    // Rotation Loop Timer using d3.timer for high-perf frame rate rendering
    let lastTime = 0;
    const rotateSpeed = 0.18;

    const tick = () => {
      // Check if smooth rotation to a targeted anchor is active
      if (stateRef.current.targetRotation) {
        const dest = stateRef.current.targetRotation;
        const current = stateRef.current.manualRotation;

        let deltaLng = dest[0] - current[0];
        // Handle longitude meridian jump smoothly
        if (deltaLng > 180) deltaLng -= 360;
        if (deltaLng < -180) deltaLng += 360;

        const deltaLat = dest[1] - current[1];

        // Linear interpolation step
        current[0] += deltaLng * 0.055;
        current[1] += deltaLat * 0.055;

        projection.rotate(current);
        render();

        // Snap when close enough
        if (Math.abs(deltaLng) < 0.2 && Math.abs(deltaLat) < 0.2) {
          stateRef.current.manualRotation = [...dest];
          stateRef.current.targetRotation = null;
        }
      } else if (stateRef.current.autoRotate && !stateRef.current.userDragging) {
        // Continuous automatic spin
        const current = stateRef.current.manualRotation;
        current[0] += rotateSpeed;
        projection.rotate(current);
        render();
      } else {
        // Re-render when stationary to process interactive custom pulses
        render();
      }
    };

    const d3Timer = d3.timer(tick);

    // Mouse movement interaction handlers on canvas
    const handleMouseDown = (event: MouseEvent) => {
      stateRef.current.autoRotate = false;
      stateRef.current.targetRotation = null;
      stateRef.current.userDragging = true;
      
      const startX = event.clientX;
      const startY = event.clientY;
      const startRotation = [...stateRef.current.manualRotation] as [number, number];

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const dragSensitivity = 0.24;
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;

        const current = [
          startRotation[0] + dx * dragSensitivity,
          Math.max(-80, Math.min(80, startRotation[1] - dy * dragSensitivity))
        ] as [number, number];

        stateRef.current.manualRotation = current;
        projection.rotate(current);
        render();
      };

      const handleMouseUp = () => {
        stateRef.current.userDragging = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);

        // Resume auto-spinning after some idle time
        if (stateRef.current.resumeTimer) clearTimeout(stateRef.current.resumeTimer);
        stateRef.current.resumeTimer = setTimeout(() => {
          stateRef.current.autoRotate = true;
        }, 5000);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    // Canvas click detection for host pin clicking
    const handleCanvasClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;

      const centerLngLat: [number, number] = [-projection.rotate()[0], -projection.rotate()[1]];
      let clickedHost: HostLocation | null = null;
      let minDistance = 18; // Pixel radius to detect mouse accuracy

      HOST_LATEST_DATA.forEach((host) => {
        const isVisible = d3.geoDistance([host.lng, host.lat], centerLngLat) < Math.PI / 2;
        if (isVisible) {
          const projected = projection([host.lng, host.lat]);
          if (projected) {
            const dx = clickX - projected[0];
            const dy = clickY - projected[1];
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < minDistance) {
              minDistance = dist;
              clickedHost = host;
            }
          }
        }
      });

      if (clickedHost) {
        chooseHost(clickedHost.id);
      }
    };

    // Canvas Hover pointer cursor changing
    const handleCanvasMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const centerLngLat: [number, number] = [-projection.rotate()[0], -projection.rotate()[1]];
      let isHoveringPoint = false;

      HOST_LATEST_DATA.forEach((host) => {
        const isVisible = d3.geoDistance([host.lng, host.lat], centerLngLat) < Math.PI / 2;
        if (isVisible) {
          const projected = projection([host.lng, host.lat]);
          if (projected) {
            const dx = mouseX - projected[0];
            const dy = mouseY - projected[1];
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 15) {
              isHoveringPoint = true;
            }
          }
        }
      });

      canvas.style.cursor = isHoveringPoint
        ? "pointer"
        : stateRef.current.userDragging
        ? "grabbing"
        : "grab";
    };

    // Touch support for mobile layouts
    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      stateRef.current.autoRotate = false;
      stateRef.current.targetRotation = null;
      stateRef.current.userDragging = true;

      const touch = event.touches[0];
      const startX = touch.clientX;
      const startY = touch.clientY;
      const startRotation = [...stateRef.current.manualRotation] as [number, number];

      const handleTouchMove = (moveEvent: TouchEvent) => {
        if (moveEvent.touches.length !== 1) return;
        const moveTouch = moveEvent.touches[0];
        const dragSensitivity = 0.28;
        const dx = moveTouch.clientX - startX;
        const dy = moveTouch.clientY - startY;

        const current = [
          startRotation[0] + dx * dragSensitivity,
          Math.max(-80, Math.min(80, startRotation[1] - dy * dragSensitivity))
        ] as [number, number];

        stateRef.current.manualRotation = current;
        projection.rotate(current);
        render();
      };

      const handleTouchEnd = () => {
        stateRef.current.userDragging = false;
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);

        if (stateRef.current.resumeTimer) clearTimeout(stateRef.current.resumeTimer);
        stateRef.current.resumeTimer = setTimeout(() => {
          stateRef.current.autoRotate = true;
        }, 5000);
      };

      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("mousemove", handleCanvasMouseMove);
    canvas.addEventListener("touchstart", handleTouchStart);

    loadWorldData();

    // Secondary cleaner
    const handleResize = () => {
      currentW = containerRef.current?.clientWidth || width;
      currentH = Math.min(height, window.innerHeight * 0.78);
      
      const newDpr = window.devicePixelRatio || 1;
      canvas.width = currentW * newDpr;
      canvas.height = currentH * newDpr;
      canvas.style.width = `${currentW}px`;
      canvas.style.height = `${currentH}px`;
      context.scale(newDpr, newDpr);
      
      baseRadius = Math.min(currentW, currentH) / 2.15;
      stateRef.current.currentRadius = baseRadius * zoomLevel;
      projection.scale(stateRef.current.currentRadius).translate([currentW / 2, currentH / 2]);
      render();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      d3Timer.stop();
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("click", handleCanvasClick);
      canvas.removeEventListener("mousemove", handleCanvasMouseMove);
      canvas.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("resize", handleResize);
      if (stateRef.current.resumeTimer) clearTimeout(stateRef.current.resumeTimer);
    };
  }, [width, height, zoomLevel]);

  const selectedHost = HOST_LATEST_DATA.find((h) => h.id === selectedHostId) || HOST_LATEST_DATA[0];

  return (
    <div 
      ref={containerRef} 
      className={`w-full min-h-[580px] bg-transparent relative overflow-hidden flex items-center justify-center ${className}`}
    >
      
      {/* Absolute Glowing Ambient Backdrop Background */}
      <div className="absolute inset-0 bg-radial-gradient from-yellow-500/5 via-transparent to-transparent pointer-events-none" />

      {/* LOADING SCREEN */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#020714]/80 backdrop-blur-sm z-30">
          <div className="relative w-16 h-16 mb-4">
            <div className="absolute inset-0 border-4 border-yellow-500/10 rounded-full" />
            <div className="absolute inset-0 border-4 border-t-yellow-500 border-l-yellow-500 rounded-full animate-spin" />
          </div>
          <p className="font-mono text-xs text-yellow-400 uppercase tracking-widest animate-pulse">
            STREAMING DIGITAL MAP EARTH DATA...
          </p>
        </div>
      )}

      {/* ERROR SCREEN */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#020713]/90 z-30 p-6">
          <div className="text-center max-w-sm">
            <div className="w-12 h-12 rounded-full bg-red-900/20 border border-red-500 flex items-center justify-center mx-auto mb-4 text-red-500 font-bold">!</div>
            <p className="text-white font-display font-semibold mb-2">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-3 px-4 py-1.5 bg-yellow-500 text-slate-900 text-xs font-mono font-black uppercase tracking-wider rounded-lg hover:bg-yellow-400 transition-colors"
              id="reload-earth"
            >
              Reload Widget
            </button>
          </div>
        </div>
      )}

      {/* D3 Canvas WebGL style rotating earth - mx-auto avoids stretching distortion */}
      <canvas
        ref={canvasRef}
        className="block mx-auto z-10"
      />

      {/* DETAILS OVERLAY CARD: Selected host country info */}
      <div className="absolute top-5 left-5 right-5 lg:right-auto lg:max-w-md z-20">
        <AnimatePresence mode="wait">
          {infoCardVisible && (
            <motion.div
              key={selectedHost.id}
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#030a1c]/95 border border-yellow-400/30 backdrop-blur-md rounded-2xl p-5 shadow-2xl relative overflow-hidden"
            >
              
              {/* Elegant subtle top linear gauge */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-amber-500" />

              {/* Close Button / Cross Option */}
              <button
                onClick={() => setInfoCardVisible(false)}
                className="absolute top-3.5 right-3.5 w-6 h-6 rounded-lg bg-slate-900/40 hover:bg-slate-800 border border-slate-800 hover:border-yellow-400/50 text-slate-400 hover:text-yellow-400 flex items-center justify-center transition-all z-10"
                title="Close details"
                id="close-info-card"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-start gap-4">
                {/* Big Flag and Year Emblem */}
                <div className="flex flex-col items-center justify-center bg-[#071330] rounded-xl px-3.5 py-2.5 border border-yellow-400/20 shrink-0 min-w-[70px]">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {(HOST_FLAG_IMAGES[selectedHost.id] || []).map((code) => (
                      <img
                        key={code}
                        src={`https://flagcdn.com/w80/${code}.png`}
                        alt={code}
                        referrerPolicy="no-referrer"
                        className="w-7 h-5 object-cover rounded shadow-md border border-slate-700/60"
                      />
                    ))}
                  </div>
                  <span className="text-xs font-mono font-black text-yellow-400 tracking-wider">
                    {selectedHost.year}
                  </span>
                </div>

                <div className="flex-1 pr-6">
                  <div className="text-[10px] font-mono text-yellow-400/80 font-bold uppercase tracking-[0.2em] mb-0.5">
                    FIFA World Cup Host
                  </div>
                  <h2 className="font-display font-black text-xl text-white tracking-tight uppercase leading-none">
                    {selectedHost.country}
                  </h2>
                  <p className="text-slate-400 font-mono text-[10px] tracking-wide mt-1 inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-yellow-500" />
                    {selectedHost.name}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex flex-col gap-2">
                <p className="text-xs leading-relaxed text-slate-300">
                  {selectedHost.info}
                </p>
                
                <div className="grid grid-cols-2 gap-3 mt-1 pt-1">
                  <div className="bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/40">
                    <div className="text-[9px] font-mono uppercase tracking-wider text-slate-500 flex items-center gap-1 mb-1">
                      <Landmark className="w-3 h-3 text-yellow-500" />
                      Main Venue
                    </div>
                    <div className="text-xs font-semibold text-slate-200 truncate leading-tight" title={selectedHost.stadium}>
                      {selectedHost.stadium}
                    </div>
                  </div>
                  <div className="bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/40">
                    <div className="text-[9px] font-mono uppercase tracking-wider text-slate-500 flex items-center gap-1 mb-1">
                      <Award className="w-3 h-3 text-yellow-500 animate-pulse" />
                      Winner
                    </div>
                    <div className="text-xs font-bold text-yellow-400 truncate leading-tight flex items-center gap-1.5">
                      {getWinnerFlagCode(selectedHost.winner) && (
                        <img
                          src={`https://flagcdn.com/w40/${getWinnerFlagCode(selectedHost.winner)}.png`}
                          alt="Winner Flag"
                          referrerPolicy="no-referrer"
                          className="w-5 h-3.5 object-cover rounded shadow border border-slate-700/60 shrink-0"
                        />
                      )}
                      <span>{selectedHost.winner}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
