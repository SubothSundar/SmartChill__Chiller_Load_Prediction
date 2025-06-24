"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

const NUM_LOGOS = 16;
const LOGO_SRC = "/logo4.png";

function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function getLogoProps(idx: number) {
  // Place logos even more inward, random vertical start, random size/rotation
  const side = idx % 2 === 0 ? "left" : "right";
  // Move logos even more inward: 0 to 80px from the edge
  const horizontal = getRandom(0, 80);
  const size = getRandom(80, 220);
  const rotate = getRandom(-30, 30);
  const duration = getRandom(8, 16); // seconds
  const delay = getRandom(0, 8); // seconds
  // Always start above the viewport for a true top-down effect
  const startTop = getRandom(-30, -10); // -30vh to -10vh
  return { side, horizontal, size, rotate, duration, delay, startTop };
}

export default function FloatingLogos() {
  // Use refs to trigger re-render for animation reset if needed
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Optionally, could trigger a re-render on resize for more randomness
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none select-none z-0">
      {Array.from({ length: NUM_LOGOS }).map((_, idx) => {
        const { side, horizontal, size, rotate, duration, delay, startTop } = getLogoProps(idx);
        return (
          <div
            key={idx}
            className="hidden lg:block fixed"
            style={{
              [side]: `${horizontal}px`,
              top: 0,
              width: `${size}px`,
              height: `${size}px`,
              opacity: 0.18,
              transform: `rotate(${rotate}deg)`,
              animation: `rainLogo ${duration}s linear ${delay}s infinite`,
              zIndex: 0,
            } as React.CSSProperties}
          >
            <Image src={LOGO_SRC} alt="Decorative Logo" width={size} height={size} style={{ width: "100%", height: "auto" }} />
            <style jsx global>{`
              @keyframes rainLogo {
                0% { top: ${startTop}vh; }
                100% { top: 110vh; }
              }
            `}</style>
          </div>
        );
      })}
    </div>
  );
} 