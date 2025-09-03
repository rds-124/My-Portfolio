import React, { useState, useEffect, useRef } from 'react';

// --- Placeholder Components (to make this file self-contained) ---

const ArrowRightIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const XIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

// A simple substitute for the SplitText animation component
const SplitText = ({ text, className }) => {
  return <h2 className={className}>{text}</h2>;
};


// --- Component Styles ---
const ComponentStyles = () => (
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
    .rotate-y-minus-35 {
      transform: rotateY(-35deg);
    }
    .book-cover {
      transform-origin: left;
      transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
      will-change: transform; /* Hint for smoother animation */
    }
    .cover-texture {
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUEUgAAADIAAAAyCAYAAAAeP4ixAAAAPElEQVR42mN8//59fxgYgOEBDEYfMBo/MBo/MBo/MBo/MBo/MBo/MBo/MBo/MBo/MBo/MBo/sPz/fxQYAPW4WkGj9b2NAAAAAElFTSuQmCC');
    }
    /* Styles for modal animation */
    .modal-enter {
        opacity: 0;
    }
    .modal-enter-active {
        opacity: 1;
        transition: opacity 300ms;
    }
    .modal-exit {
        opacity: 1;
    }
    .modal-exit-active {
        opacity: 0;
        transition: opacity 300ms;
    }
    .modal-content-enter {
        transform: scale(0.9) translateY(20px);
    }
    .modal-content-enter-active {
        transform: scale(1) translateY(0);
        transition: transform 300ms;
    }
    .modal-content-exit {
        transform: scale(1) translateY(0);
    }
    .modal-content-exit-active {
        transform: scale(0.9) translateY(20px);
        transition: transform 300ms;
    }

    /* --- New class for promoting animations to the GPU --- */
    .gpu-accelerate {
      will-change: transform;
      transform: translateZ(0);
    }

    /* --- New styles for the custom download button --- */
    .styled-download-btn {
      --main-focus: #2d8cf0;
      --font-color: #f5f5f5; /* Brighter white for better contrast */
      --bg-color-sub: #222;
      --bg-color: #323232;
      --main-color: #f5f5f5; /* Brighter white for better contrast */
      position: relative;
      width: 150px;
      height: 40px;
      cursor: pointer;
      display: flex;
      align-items: center;
      border: 2px solid var(--main-color);
      box-shadow: 4px 4px var(--main-color);
      background-color: var(--bg-color);
      border-radius: 10px;
      overflow: hidden;
      text-decoration: none; /* Added for the <a> tag */
      transition: transform 0.3s, box-shadow 0.3s, background-color 0.3s;
    }

    .styled-download-btn, .styled-download-btn__icon, .styled-download-btn__text {
      /* REMOVED transition: all 0.3s; from here to be more specific below */
    }

    .styled-download-btn .styled-download-btn__text {
      transform: translateX(21px);
      color: var(--font-color);
      font-weight: 600;
      font-size: 14px;
      transition: transform 0.3s, color 0.3s;
    }

    .styled-download-btn .styled-download-btn__icon {
      position: absolute;
      transform: translateX(109px);
      height: 100%;
      width: 39px;
      background-color: var(--bg-color-sub);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s, width 0.3s;
    }

    .styled-download-btn .svg {
      width: 20px;
      fill: var(--main-color);
    }

    .styled-download-btn:hover {
      background: var(--bg-color);
    }

    .styled-download-btn:hover .styled-download-btn__text {
      color: transparent;
    }

    .styled-download-btn:hover .styled-download-btn__icon {
      width: 148px;
      transform: translateX(0);
    }

    .styled-download-btn:active {
      transform: translate(3px, 3px);
      box-shadow: 0px 0px var(--main-color);
    }
  `}</style>
);

// --- New Styled Download Button Component ---
const StyledDownloadButton = ({ href, download }) => {
  return (
    <a href={href} download={download} className="styled-download-btn">
      <span className="styled-download-btn__text">Download</span>
      <span className="styled-download-btn__icon">
        <svg className="svg" data-name="Layer 2" id="bdd05811-e15d-428c-bb53-8661459f9307" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z" />
            <path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z" />
            <path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z" />
        </svg>
      </span>
    </a>
  );
};

// --- The New, Improved ResumeModal Component ---
const ResumeModal = ({ isOpen, onClose }) => {
  const [isPdfLoading, setIsPdfLoading] = useState(true);
  const pdfObjectRef = useRef(null);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  // Effect to handle the loading state of the PDF object
  useEffect(() => {
    if (isOpen && pdfObjectRef.current) {
      setIsPdfLoading(true); // Reset loading state each time modal opens
      const object = pdfObjectRef.current;
      const handleLoad = () => setIsPdfLoading(false);
      object.addEventListener('load', handleLoad);
      return () => {
        object.removeEventListener('load', handleLoad);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black/80 via-neutral-900/90 to-black/80 backdrop-blur-sm p-4 modal-enter modal-enter-active"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="relative bg-neutral-900 border border-neutral-700 rounded-lg shadow-xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col modal-content-enter modal-content-enter-active"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="flex items-center justify-between p-4 border-b border-neutral-700 flex-shrink-0">
          <h3 className="text-lg font-semibold text-white">Rohith D - Resume</h3>
          <div className="flex items-center gap-4">
            <StyledDownloadButton 
              href="/pdf/Rohith_D.pdf" 
              download="Rohith_D_Resume.pdf" 
            />
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 rounded-full hover:bg-neutral-700 hover:text-white transition-colors"
              aria-label="Close resume view"
            >
              <XIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
        {/* --- Updated Content Area --- */}
        <div className="flex-grow p-8 md:p-12 bg-neutral-800/50 overflow-auto">
          <div className="mx-auto w-full max-w-3xl h-full bg-stone-50 shadow-lg shadow-inner rounded-sm relative">
            {isPdfLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-500 bg-stone-50 z-10">
                <svg className="animate-spin h-8 w-8 text-neutral-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="mt-4 text-sm">Loading Resume...</p>
              </div>
            )}
            <object
              ref={pdfObjectRef}
              data="/pdf/Rohith_D.pdf#toolbar=0&navpanes=0"
              type="application/pdf"
              className={`w-full h-full transition-opacity duration-300 ${isPdfLoading ? 'opacity-0' : 'opacity-100'}`}
              aria-label="Rohith D's Resume PDF"
            >
              <div className="flex flex-col items-center justify-center h-full p-8 text-center text-black">
                <p className="mb-4">Your browser does not support embedded PDFs.</p>
                <a
                  href="/pdf/Rohith_D.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  {/* Re-using the new button's SVG here for consistency in fallback */}
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg"><path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z" /><path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z" /><path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z" /></svg>
                  View PDF in New Tab
                </a>
              </div>
            </object>
          </div>
        </div>
        {/* --- New Footer for Document Context --- */}
        <div className="flex items-center justify-end px-6 py-3 border-t border-neutral-700 flex-shrink-0">
            <p className="text-xs text-neutral-500 font-mono">Document View | Page 1 of 1</p>
        </div>
      </div>
    </div>
  );
};


// --- The Main Resume Component (WITH MODIFICATIONS) ---
const Resume = () => {
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isPeeking, setIsPeeking] = useState(false);
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bookRef = useRef(null);

  // Effect for the one-time peek animation on scroll (unchanged)
  useEffect(() => {
    if (!bookRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedIn) {
          setTimeout(() => setIsPeeking(true), 300);
          setTimeout(() => {
            setIsPeeking(false);
            setHasAnimatedIn(true);
          }, 1500);
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
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

  // --- NEW: Handler for clicking the resume preview ---
  const handleResumeClick = () => {
    // On mobile (< 768px), open the PDF directly in a new tab.
    if (window.innerWidth < 768) {
      window.open('/pdf/Rohith_D.pdf', '_blank');
    } else {
      // On desktop, open the modal as before.
      setIsModalOpen(true);
    }
  };

  const currentDate = new Date();
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  return (
    <>
      <ComponentStyles />
      <section id="resume" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <SplitText
              text="My Resume"
              className="font-display text-4xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-100"
            />
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mt-2">Open the cover to view my professional summary.</p>
          </div>

          <div className="flex justify-center">
            <div
              ref={bookRef}
              className="group perspective w-[240px] h-[320px] md:w-[280px] md:h-[380px]"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleToggleBook}
            >
              <div className={`relative w-full h-full preserve-3d transition-transform duration-500 ${isBookOpen ? 'md:scale-105' : ''}`}>
                
                {/* --- Inside of the Book (Back Part) --- */}
                <div 
                  className="absolute w-full h-full rounded-r-lg p-2 bg-white/10 dark:bg-black/30 backdrop-blur-xl border border-white/20 shadow-inner"
                >
                  {/* UPDATED: This now uses the conditional handler */}
                  <button
                    onClick={handleResumeClick} // <-- Use the new handler here
                    className="block w-full h-full rounded-md overflow-hidden relative group/resume cursor-pointer transition-transform duration-300 hover:scale-[1.02] gpu-accelerate"
                    aria-label="View Resume" // <-- Updated aria-label for accuracy
                  >
                    <div className="absolute inset-0 shadow-[inset_10px_0px_15px_-10px_rgba(0,0,0,0.4)] dark:shadow-[inset_10px_0px_15px_-10px_rgba(0,0,0,0.8)] pointer-events-none"></div>
                    <img
                      src="/images/resume.avif"
                      alt="Preview of Rohith D's Resume"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/resume:opacity-100 transition-opacity duration-300">
                      <p className="text-white font-semibold">Click to View</p>
                    </div>
                  </button>
                </div>

                {/* --- The Cover of the Book (Front Part) --- */}
                <div 
                  className={`book-cover absolute w-full h-full rounded-lg p-6 flex flex-col justify-center items-center text-center preserve-3d
                              bg-white/20 dark:bg-black/40 backdrop-blur-lg 
                              border border-white/20 shadow-2xl
                              cover-texture bg-opacity-50 cursor-pointer
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
                      <ArrowRightIcon className="w-3.5 h-3.5" />
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

      {/* --- Render the Modal --- */}
      <ResumeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Resume;