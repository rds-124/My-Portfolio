import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

// --- 1. CSS for the Marquee Animations ---
// Now includes a second animation for the reverse scroll.
const MarqueeStyles = () => (
  <style>{`
    @keyframes scroll-left {
      0% { transform: translateX(0); }
      100% { transform: translateX(-100%); }
    }
    @keyframes scroll-right {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(0); }
    }
    .animate-scroll-left {
      animation: scroll-left 40s linear infinite;
    }
    .animate-scroll-right {
      animation: scroll-right 40s linear infinite;
    }
  `}</style>
);

const Marquee = () => {
  // --- 2. Text is now separated into two lines ---
  const marqueeLine1 = ["Thanks for visiting my portfolio!"];
  const marqueeLine2 = [
    "Let's build something amazing together",
    "Code & Crafted with",
    "by Rohith D",
  ];

  // Repeat arrays to ensure a seamless loop for both lines
  const repeatedLine1 = [...marqueeLine1, ...marqueeLine1, ...marqueeLine1, ...marqueeLine1];
  const repeatedLine2 = [...marqueeLine2, ...marqueeLine2];

  // Helper component to render the repeated items to avoid code duplication
  const MarqueeContent = ({ items, isLine2 = false }) => (
    <>
      {items.map((item, index) => (
        <div key={index} className="flex items-center flex-shrink-0 mx-6">
          {isLine2 && item === "Code & Crafted with" ? (
            <span className="flex items-center text-lg font-medium text-gray-400">
              {item} <Heart className="w-5 h-5 mx-2 text-red-500" fill="currentColor" />
            </span>
          ) : (
            <span className="text-lg font-medium text-gray-400">{item}</span>
          )}
          <Sparkles className="w-5 h-5 ml-6 text-cyan-400/50" />
        </div>
      ))}
    </>
  );

  return (
    <>
      <MarqueeStyles />
      <div className="relative w-full py-6 overflow-hidden bg-transparent border-y border-white/10">
        {/* --- Line 1 --- */}
        <div className="relative flex mb-4">
          {/* THE FIX IS HERE: The content is duplicated to ensure a seamless loop */}
          <div className="flex animate-scroll-left">
            <MarqueeContent items={repeatedLine1} />
            <MarqueeContent items={repeatedLine1} />
          </div>
        </div>

        {/* --- Line 2 --- */}
        <div className="relative flex">
          {/* THE FIX IS HERE: The content is duplicated to ensure a seamless loop */}
          <div className="flex animate-scroll-right">
            <MarqueeContent items={repeatedLine2} isLine2 />
            <MarqueeContent items={repeatedLine2} isLine2 />
          </div>
        </div>
      </div>
    </>
  );
};

export default Marquee;
