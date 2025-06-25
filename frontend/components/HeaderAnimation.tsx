"use client";
import Image from "next/image";

// Component for the header background animation
export default function HeaderAnimation() {
  const numLogos = 12; // Number of logos to animate
  const logoElements = Array.from({ length: numLogos }).map((_, i) => {
    const size = Math.random() * 30 + 30; // 30px to 60px
    const duration = Math.random() * 15 + 15; // 15s to 30s
    const delay = Math.random() * 15; // 0s to 15s
    const top = Math.random() * 70 + 5; // 5% to 75% from top of header

    return (
      <div
        key={i}
        className="absolute"
        style={{
          top: `${top}%`,
          width: `${size}px`,
          height: `${size}px`,
          opacity: 0.55,
          animation: `moveRight ${duration}s linear ${delay}s infinite`,
        }}
      >
        <Image src="/logo4.png" alt="" width={size} height={size} />
      </div>
    );
  });

  return (
    <>
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {logoElements}
      </div>
      <style jsx global>{`
        @keyframes moveRight {
          0% {
            transform: translateX(-100px) rotate(0deg);
          }
          100% {
            transform: translateX(100vw) rotate(360deg);
          }
        }
      `}</style>
    </>
  );
} 