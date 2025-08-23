import React, { useState, useEffect, useRef } from 'react';
import { Download, ArrowRight } from 'lucide-react';
import SplitText from "@/components/SplitText";

// --- 1. CSS updated for a wider "peek" animation ---
const BookStyles = () => (
  <style>{`
    .perspective {
      perspective: 2000px;
    }
    .preserve-3d {
      transform-style: preserve-3d;
    }
    .rotate-y-minus-80 {
      transform: rotateY(-80deg);
    }
    /* New class for the subtle peek animation, now opens more */
    .rotate-y-minus-35 {
      transform: rotateY(-35deg);
    }
    .book-cover {
      transform-origin: left;
      transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1); /* Smoother transition */
    }
    .cover-texture {
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAPElEQVR42mN8//59fxgYgOEBDEYfMBo/MBo/MBo/MBo/MBo/MBo/MBo/MBo/MBo/MBo/MBo/sPz/fxQYAPW4WkGj9b2NAAAAAElFTSuQmCC');
      background-blend-mode: overlay;
    }
  `}</style>
);

const Resume = () => {
  const [isBookOpen, setIsBookOpen] = useState(false);
  // --- New state to control the initial peek animation ---
  const [isPeeking, setIsPeeking] = useState(false);
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);
  const bookRef = useRef(null);

  // --- Effect for the one-time peek animation on scroll ---
  useEffect(() => {
    if (!bookRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedIn) {
          // Start the peek animation
          setTimeout(() => setIsPeeking(true), 300);

          // Close the peek and mark animation as complete
          setTimeout(() => {
            setIsPeeking(false);
            setHasAnimatedIn(true);
          }, 1500); // Peek lasts for 1.2 seconds

          observer.disconnect();
        }
      },
      { threshold: 0.6 } // Trigger when 60% of the book is visible
    );

    observer.observe(bookRef.current);

    return () => observer.disconnect();
  }, [hasAnimatedIn]);


  const handleToggleBook = () => {
    if (window.innerWidth < 768 && hasAnimatedIn) {
      setIsBookOpen(!isBookOpen);
    }
  };
  
  const handleMouseEnter = () => {
    if (window.innerWidth >= 768 && hasAnimatedIn) {
      setIsBookOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768 && hasAnimatedIn) {
      setIsBookOpen(false);
    }
  };

  const currentDate = new Date();
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  return (
    <>
      <BookStyles />
      <section id="resume" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <SplitText
              text="My Resume"
              className="font-display text-4xl md:text-5xl font-bold text-foreground"
              splitType="chars"
              delay={50}
            />
            <p className="text-lg text-muted-foreground mt-2">Open the cover to view and download my professional summary.</p>
          </div>

          <div className="flex justify-center">
            <div
              ref={bookRef} // Attach ref for the observer
              className="group perspective w-[240px] h-[320px] md:w-[280px] md:h-[380px] cursor-pointer"
              onClick={handleToggleBook}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className={`relative w-full h-full preserve-3d transition-transform duration-500 ${isBookOpen ? 'md:scale-105' : ''}`}>
                
                {/* --- Inside of the Book (Back Part) --- */}
                <div 
                  className="absolute w-full h-full rounded-r-lg p-2
                             bg-white/10 dark:bg-black/30 backdrop-blur-xl 
                             border border-white/20 shadow-inner"
                >
                  <a
                    href="/pdf/Rohith_D.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="block w-full h-full rounded-md overflow-hidden 
                               relative group/resume"
                    aria-label="View full resume in a new tab"
                  >
                    <div className="absolute inset-0 shadow-[inset_10px_0px_15px_-10px_rgba(0,0,0,0.4)] dark:shadow-[inset_10px_0px_15px_-10px_rgba(0,0,0,0.8)] pointer-events-none"></div>
                    <img
                      src="/images/resume.png"
                      alt="Preview of Rohith D's Resume"
                      className="w-full h-full object-cover object-top"
                    />
                  </a>
                </div>

                {/* --- The Cover of the Book (Front Part) --- */}
                <div 
                  className={`book-cover absolute w-full h-full rounded-lg p-6 flex flex-col justify-center items-center text-center preserve-3d
                             bg-white/20 dark:bg-black/40 backdrop-blur-lg 
                             border border-white/20 shadow-2xl
                             cover-texture bg-opacity-50
                             ${isBookOpen ? 'rotate-y-minus-80' : isPeeking ? 'rotate-y-minus-35' : ''}`}
                >
                  <div className="flex-grow flex flex-col justify-center items-center">
                    <h3 className="text-2xl font-bold text-black dark:text-white">My Resume</h3>
                    <p className="text-md text-black dark:text-gray-200 mt-2 hidden md:block">Hover to Open</p>
                    <p className="text-md text-black dark:text-gray-200 mt-2 md:hidden">Tap to Open</p>
                  </div>
                  
                  <div className="absolute bottom-6 w-full px-4">
                    <div className="flex items-center justify-center gap-2 text-xs text-black dark:text-gray-300">
                      <span>View Inside</span>
                      <ArrowRight size={14} />
                    </div>
                    <p className="text-xs text-black/70 dark:text-gray-400 mt-2">
                      Last Updated: {month} {year}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Resume;
