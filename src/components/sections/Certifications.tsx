import React, { useState, useEffect, useRef } from 'react';

// --- Placeholder Components (to make this file self-contained) ---

const LinkIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path>
    </svg>
);

const XIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const SplitText = ({ text, className }) => {
  return <h2 className={className}>{text}</h2>;
};

// --- Data ---
const certificationsData = [
  {
    title: "Google Advanced Data Analytics Certificate",
    meta: "In Progress (Started August 2025)",
    link: null, // No link for in-progress cert
    logo: "/images/google.svg",
  },
  {
    title: "Deloitte Australia Data Analytics Job Simulation",
    meta: "June 2025",
    link: "/pdf/deloitte.pdf", // Example PDF path
    logo: "/images/deloitte.svg",
  },
  {
    title: "Cisco Certified Support Technician Cybersecurity",
    meta: "February 2025",
    link: "/pdf/cisco.pdf", // Example PDF path
    logo: "/images/cisco.svg",
  },
];


// --- Component Styles (Includes Modal and Button styles) ---
const ComponentStyles = () => (
  <style>{`
    /* Styles for modal animation */
    .modal-enter { opacity: 0; }
    .modal-enter-active { opacity: 1; transition: opacity 300ms; }
    .modal-exit { opacity: 1; }
    .modal-exit-active { opacity: 0; transition: opacity 300ms; }
    .modal-content-enter { transform: scale(0.9) translateY(20px); }
    .modal-content-enter-active { transform: scale(1) translateY(0); transition: transform 300ms; }
    .modal-content-exit { transform: scale(1) translateY(0); }
    .modal-content-exit-active { transform: scale(0.9) translateY(20px); transition: transform 300ms; }

    /* GPU Acceleration for smooth animations */
    .gpu-accelerate { will-change: transform; transform: translateZ(0); }

    /* Styles for the custom download button */
    .styled-download-btn {
      --main-focus: #2d8cf0;
      --font-color: #f5f5f5;
      --bg-color-sub: #222;
      --bg-color: #323232;
      --main-color: #f5f5f5;
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
      text-decoration: none;
      transition: transform 0.3s, box-shadow 0.3s, background-color 0.3s;
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
    .styled-download-btn .svg { width: 20px; fill: var(--main-color); }
    .styled-download-btn:hover { background: var(--bg-color); }
    .styled-download-btn:hover .styled-download-btn__text { color: transparent; }
    .styled-download-btn:hover .styled-download-btn__icon { width: 148px; transform: translateX(0); }
    .styled-download-btn:active { transform: translate(3px, 3px); box-shadow: 0px 0px var(--main-color); }
  `}</style>
);


// --- Reusable Styled Download Button Component ---
const StyledDownloadButton = ({ href, download }) => (
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

// --- Reusable PDF Viewer Modal Component ---
const PdfViewerModal = ({ certification, isOpen, onClose }) => {
  const [isPdfLoading, setIsPdfLoading] = useState(true);
  // ** THE FIX - Part 1: Using state to hold the DOM node, populated by a callback ref. **
  const [pdfNode, setPdfNode] = useState(null);

  useEffect(() => {
    const handleEsc = (event) => event.key === 'Escape' && onClose();
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  // ** THE FIX - Part 2: This effect ONLY runs when the pdfNode is mounted or unmounted. **
  // This completely avoids the race condition.
  useEffect(() => {
    // If the node is not set or has been removed, do nothing.
    if (pdfNode === null) {
      return;
    }
    
    const handleLoad = () => {
      setIsPdfLoading(false);
    };

    setIsPdfLoading(true);
    pdfNode.addEventListener('load', handleLoad);

    // This cleanup function runs when the pdfNode changes (i.e., when the component re-renders with a different cert)
    // or when the component unmounts.
    return () => {
      pdfNode.removeEventListener('load', handleLoad);
    };
  }, [pdfNode]); // The key change is this dependency array.

  if (!isOpen || !certification) return null;

  const { title, link, logo } = certification;
  const downloadFilename = `${title.replace(/\s+/g, '_')}_Certificate.pdf`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black/80 via-neutral-900/90 to-black/80 backdrop-blur-sm p-4 modal-enter modal-enter-active" onClick={onClose} role="dialog" aria-modal="true">
      <div className="relative bg-neutral-900 border border-neutral-700 rounded-lg shadow-xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col modal-content-enter modal-content-enter-active" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-x-4 gap-y-3 p-4 border-b border-neutral-700 flex-shrink-0">
            <div className="flex items-center gap-3 pr-4">
                <img src={logo} alt={`${title} Logo`} className="w-6 h-6 flex-shrink-0"/>
                <h3 className="text-base sm:text-lg font-semibold text-white text-center sm:text-left">{title}</h3>
            </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <StyledDownloadButton href={link} download={downloadFilename} />
            <button onClick={onClose} className="p-2 text-neutral-400 rounded-full hover:bg-neutral-700 hover:text-white transition-colors" aria-label="Close modal"><XIcon className="w-6 h-6" /></button>
          </div>
        </div>
        <div className="flex-grow p-4 sm:p-8 md:p-12 bg-neutral-800/50 overflow-auto">
          <div className="mx-auto w-full max-w-3xl h-full bg-stone-50 shadow-lg shadow-inner rounded-sm relative">
            {isPdfLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-500 bg-stone-50 z-10">
                <svg className="animate-spin h-8 w-8 text-neutral-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <p className="mt-4 text-sm">Loading Certificate...</p>
              </div>
            )}
            {/* ** THE FIX - Part 3: Using a callback ref to update the state ** */}
            <object ref={setPdfNode} data={`${link}#toolbar=0&navpanes=0`} type="application/pdf" className={`w-full h-full transition-opacity duration-300 ${isPdfLoading ? 'opacity-0' : 'opacity-100'}`} aria-label={`${title} PDF`}>
              <div className="flex flex-col items-center justify-center h-full p-8 text-center text-black">
                <p className="mb-4">Browser does not support embedded PDFs.</p>
                <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">View Certificate</a>
              </div>
            </object>
          </div>
        </div>
        <div className="flex items-center justify-end px-6 py-3 border-t border-neutral-700 flex-shrink-0">
            <p className="text-xs text-neutral-500 font-mono">Document View</p>
        </div>
      </div>
    </div>
  );
};


// --- Individual Certification Card Component ---
const CertificationCard = ({ certification, onViewClick }) => {
  const { title, meta, link, logo } = certification;
  const [showButton, setShowButton] = useState(false);
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current || !link) return;
    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !hasAnimatedIn) {
          setTimeout(() => setShowButton(true), 300);
          setTimeout(() => {
            setShowButton(false);
            setHasAnimatedIn(true);
          }, 2300);
          observer.disconnect();
        }
      }, { threshold: 0.7 });
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [hasAnimatedIn, link]);

  const cardContent = (
    <>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-black/5 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center ring-1 ring-black/10 dark:ring-white/20 text-foreground">
          <img src={logo} alt={`${title} Logo`} className="w-8 h-8 object-contain" />
        </div>
        <div className="flex-grow">
          <h3 className="text-base font-bold text-gray-800 dark:text-white">{title}</h3>
          <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">{meta}</p>
        </div>
      </div>
      {link && (
        <div className={`absolute bottom-6 left-6 right-6 inline-flex items-center justify-center gap-2 
                        bg-gray-700/80 backdrop-blur-sm text-white font-semibold py-2.5 px-4 rounded-lg 
                        transition-all duration-500 pointer-events-none
                        ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                        ${!hasAnimatedIn ? '' : 'group-hover:opacity-100 group-hover:translate-y-0'}`}>
          <LinkIcon size={16} />
          Verify Credential
        </div>
      )}
    </>
  );

  if (!link) {
      return <article className="group relative h-full flex flex-col rounded-2xl p-6 text-gray-800 dark:text-white overflow-hidden bg-white/10 dark:bg-black/30 backdrop-blur-xl border border-white/20 shadow-lg">{cardContent}</article>
  }
  
  return (
    <button
      ref={cardRef}
      onClick={() => onViewClick(certification)}
      className="group relative h-full w-full flex flex-col rounded-2xl p-6 text-gray-800 dark:text-white overflow-hidden
                 bg-white/10 dark:bg-black/30 backdrop-blur-xl 
                 border border-white/20 
                 shadow-lg hover:shadow-2xl text-left
                 transition-all duration-300 hover:scale-[1.03]"
    >
      {cardContent}
    </button>
  );
};


// --- Main Certifications Component ---
const Certifications = () => {
  const [activeCertification, setActiveCertification] = useState(null);

  return (
    <>
      <ComponentStyles />
      <section id="certifications" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <SplitText
              text="Certifications"
              className="font-display text-4xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-100"
            />
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mt-2">My professional credentials and qualifications.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificationsData.map((c) => (
              <CertificationCard 
                key={c.title} 
                certification={c} 
                onViewClick={setActiveCertification} 
              />
            ))}
          </div>
        </div>
      </section>

      <PdfViewerModal
        isOpen={!!activeCertification}
        onClose={() => setActiveCertification(null)}
        certification={activeCertification}
      />
    </>
  );
};

export default Certifications;

