import { Button } from "@/components/ui/button";
import { Github, Linkedin, BarChart3 } from "lucide-react";
import { useRipple } from "@/hooks/useRipple";
import SectionOverlay from "@/components/SectionOverlay";
import { useEffect, useRef, useState } from 'react';
import RealTimeClock from "@/components/RealTimeClock";
import { motion } from 'framer-motion';

// --- TypingAnimation component (for the initial typing) ---
const TypingAnimation = ({ text, speed = 50, className, onComplete }) => {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    if (typedText.length < text.length) {
      const timer = setTimeout(() => {
        setTypedText(text.substring(0, typedText.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    } else {
      if (onComplete) {
        setTimeout(onComplete, 200);
      }
    }
  }, [typedText, text, speed, onComplete]);

  return (
    <span className={className}>
      {typedText}
      {typedText.length < text.length && <span className="typing-cursor"></span>}
    </span>
  );
};

// --- InteractiveName component (for the hover effect) ---
const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
};

const InteractiveName = ({ text }) => {
    const spansRef = useRef<(HTMLSpanElement | null)[]>([]);
    const containerRef = useRef<HTMLSpanElement | null>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const cursorRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            cursorRef.current.x = e.clientX;
            cursorRef.current.y = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);

        const initMouse = () => {
            if (containerRef.current) {
                const { left, top, width, height } = containerRef.current.getBoundingClientRect();
                const centerX = left + width / 2;
                const centerY = top + height / 2;
                mouseRef.current = { x: centerX, y: centerY };
                cursorRef.current = { x: centerX, y: centerY };
            }
        };
        initMouse();
        window.addEventListener('resize', initMouse);

        let rafId: number;
        const animate = () => {
            mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) * 0.05;
            mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) * 0.05;

            if (containerRef.current) {
                const maxDist = containerRef.current.getBoundingClientRect().width / 2;
                spansRef.current.forEach((span) => {
                    if (!span) return;
                    const rect = span.getBoundingClientRect();
                    const charCenter = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
                    const d = dist(mouseRef.current, charCenter);

                    const getAttr = (distance: number, minVal: number, maxVal: number) => {
                        const val = maxVal - (maxVal * distance) / maxDist;
                        return Math.max(minVal, val);
                    };

                    const wght = getAttr(d, 700, 900); 
                    const wdth = getAttr(d, 80, 120);
                    
                    span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}`;
                });
            }
            rafId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', initMouse);
            cancelAnimationFrame(rafId);
        };
    }, [text]);

    return (
        <span ref={containerRef} className="inline-block">
            {text.split('').map((char, i) => (
                <span key={i} ref={(el) => (spansRef.current[i] = el)} className="inline-block transition-all duration-100 ease-out">
                    {char}
                </span>
            ))}
        </span>
    );
};

// --- NEW Component to manage the typing-to-interactive switch ---
const NameAnimator = ({ text, speed, onTypingComplete }) => {
    const [isTypingDone, setIsTypingDone] = useState(false);

    const handleTypingFinish = () => {
        setIsTypingDone(true);
        if (onTypingComplete) {
            onTypingComplete();
        }
    };

    if (!isTypingDone) {
        return (
            <TypingAnimation
                text={text}
                speed={speed}
                onComplete={handleTypingFinish}
                className="block font-display text-7xl md:text-9xl lg:text-[10rem] font-bold text-gradient-shimmer leading-tight"
            />
        );
    }

    return (
        <span className="block font-display text-7xl md:text-9xl lg:text-[10rem] font-bold text-gradient-shimmer leading-tight">
            <InteractiveName text={text} />
        </span>
    );
};


// A small style component for animations.
const AnimationStyles = () => (
  <style>{`
    @keyframes pulse-slow {
      50% { opacity: 0.5; }
    }
    .animate-pulse-slow {
      animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    .cssbuttons-io-button {
      background: hsl(var(--primary-accent));
      color: white;
      font-family: inherit;
      padding: 0.35em;
      padding-left: 1.2em;
      font-size: 17px;
      font-weight: 500;
      border-radius: 0.9em;
      border: none;
      letter-spacing: 0.05em;
      display: flex;
      align-items: center;
      box-shadow: inset 0 0 1.6em -0.6em hsl(var(--primary-accent) / 0.7);
      overflow: hidden;
      position: relative;
      height: 2.8em;
      padding-right: 3.3em;
      cursor: pointer;
    }
    .cssbuttons-io-button .icon {
      background: white;
      margin-left: 1em;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 2.2em;
      width: 2.2em;
      border-radius: 0.7em;
      box-shadow: 0.1em 0.1em 0.6em 0.2em hsl(var(--primary-accent) / 0.8);
      right: 0.3em;
      transition: all 0.3s;
    }
    .cssbuttons-io-button:hover .icon {
      width: calc(100% - 0.6em);
    }
    .cssbuttons-io-button .icon svg {
      width: 1.1em;
      transition: transform 0.3s;
      color: hsl(var(--primary-accent));
    }
    .cssbuttons-io-button:hover .icon svg {
      transform: translateX(0.1em);
    }
    .cssbuttons-io-button:active .icon {
      transform: scale(0.95);
    }
    .typing-cursor {
      display: inline-block;
      width: 0.1em;
      height: 1em;
      background-color: hsl(var(--foreground));
      animation: blink 1s step-end infinite;
      margin-left: 0.1em;
      vertical-align: baseline;
    }
    @keyframes blink {
      from, to { background-color: transparent }
      50% { background-color: hsl(var(--foreground)); }
    }
  `}</style>
);

const Hero = () => {
  const createRipple = useRipple();
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [isNameTyped, setIsNameTyped] = useState(false);

  return (
    <>
      <AnimationStyles />
      <section
        id="hero"
        className="relative overflow-hidden min-h-screen flex items-center"
      >
        <SectionOverlay />

        <div className="absolute top-8 right-8 z-20">
            <RealTimeClock />
        </div>

        <div className="container max-w-6xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <h1 className="mb-6">
              <TypingAnimation
                text="Hi, I'm"
                className="block font-display font-bold text-5xl md:text-6xl lg:text-7xl text-black dark:text-white tracking-wide transition-colors duration-300"
                onComplete={() => setIsIntroComplete(true)}
              />
              {isIntroComplete && (
                <NameAnimator
                  text="Rohith"
                  speed={80}
                  onTypingComplete={() => setIsNameTyped(true)}
                />
              )}
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isNameTyped ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-medium mb-8 max-w-3xl leading-relaxed">
                A Data Analyst specializing in building BI solutions that drive business growth.
              </p>

              <div className="mb-12">
                <div className="inline-flex items-center gap-2 bg-green-900/50 text-green-300 border border-green-700/50 rounded-full px-4 py-1.5 text-sm">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-pulse-slow absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  Available for new opportunities
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <a href="#projects">
                  <button className="cssbuttons-io-button">
                    See My Work
                    <div className="icon">
                      <BarChart3 />
                    </div>
                  </button>
                </a>

                <div className="flex items-center gap-4">
                  <div className="relative group">
                    <a
                      href="https://github.com/rds-124"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-muted/50 hover:bg-muted hover:scale-110 transition-all duration-300 ripple-container flex items-center justify-center"
                      aria-label="GitHub Profile"
                      onClick={createRipple}
                    >
                      <Github className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
                    </a>
                    <span className="absolute bottom-full mb-2 left-1-2 -translate-x-1/2 w-max px-3 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      GitHub
                    </span>
                  </div>
                  <div className="relative group">
                    <a
                      href="https://linkedin.com/in/rohith124"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-muted/50 hover:bg-muted hover:scale-110 transition-all duration-300 ripple-container flex items-center justify-center"
                      aria-label="LinkedIn Profile"
                      onClick={createRipple}
                    >
                      <Linkedin className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
                    </a>
                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max px-3 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      LinkedIn
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
