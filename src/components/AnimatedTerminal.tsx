import React, { useState, useEffect, useRef } from 'react';
import { Moon } from 'lucide-react';
import { useCursor } from '../hooks/useCursor';

// --- CSS for the typing animation ---
const TerminalStyles = () => (
  <style>{`
    .typing-cursor {
      display: inline-block;
      width: 8px;
      height: 1.2em;
      background-color: #a78bfa; /* purple-400 */
      animation: blink 1s step-end infinite;
      margin-left: 4px;
      vertical-align: bottom;
    }

    @keyframes blink {
      from, to { background-color: transparent }
      50% { background-color: #a78bfa; }
    }
  `}</style>
);

// --- Array of quotes updated with the two new lines ---
const quotes = [
  "When I asked Shiva for a flower, He answered with the rain that promised a garden.",
  "Pour your soul into the effort, and release your attachment to the fruit it bears.",
  "Fate is fickle, but effort is a constant.",
  "True progress requires moving beyond the good to pursue the great.",
  "Distinctive thinking is the path to rare achievements."
];

const AnimatedTerminal = ({ isDark }) => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // --- State and Refs for Dragging ---
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const terminalRef = useRef(null);

  // --- Cursor context ---
  const { setTerminalHovered } = useCursor();

  // Effect for the real-time clock
  useEffect(() => {
    const updateClock = () => {
        const now = new Date();
        const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const dayOfWeek = now.toLocaleDateString([], { weekday: 'short' });
        const day = now.getDate();
        const month = now.toLocaleDateString([], { month: 'short' });
        setCurrentTime(`${dayOfWeek} ${month} ${day} ${formattedTime}`);
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);
  
  // --- Typing/deleting carousel animation logic ---
  useEffect(() => {
    const currentQuote = quotes[quoteIndex];
    let timer;

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(currentQuote.substring(0, typedText.length - 1));
      }, 30);
    } 
    else {
      timer = setTimeout(() => {
        setTypedText(currentQuote.substring(0, typedText.length + 1));
      }, 50);
    }

    if (!isDeleting && typedText === currentQuote) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2500);
    } 
    else if (isDeleting && typedText === '') {
      setIsDeleting(false);
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, quoteIndex]);

// --- Drag and Drop Logic ---
const handleMouseDown = (e: React.MouseEvent) => {
  // Only allow drag when clicking inside the terminal header
  if (!(e.target as HTMLElement).closest(".terminal-drag")) return;

  setIsDragging(true);
  dragOffset.current = {
    x: e.clientX - position.x,
    y: e.clientY - position.y
  };
  document.body.style.userSelect = 'none';
  e.preventDefault();
};


  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y
      });
    };
    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = '';
    };
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const isTypingFinished = typedText === quotes[quoteIndex] && !isDeleting;

  return (
    <>
      <TerminalStyles />
      <div 
        ref={terminalRef}
        className={`w-full max-w-2xl mx-auto rounded-xl overflow-hidden
                    ${isDark ? 'bg-black/30 border-white/10' : 'bg-gray-100/70 border-gray-300'}
                    backdrop-blur-xl shadow-2xl shadow-purple-500/10 relative`}
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px)`,
          zIndex: isDragging ? 1000 : 10,
          touchAction: 'none'
        }}
        onMouseEnter={() => setTerminalHovered(true)}
        onMouseLeave={() => setTerminalHovered(false)}
      >
        {/* --- Terminal Header --- */}
        <div 
            className={`terminal-drag h-9 flex items-center justify-between px-4 
                        ${isDark ? 'bg-gray-800/50 border-white/10' : 'bg-gray-200/80 border-gray-300'}
                        border-b`}
            onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Terminal</p>
          <div className="w-4 h-4">
            {!isDark && <Moon size={16} className="text-gray-600" />}
          </div>
        </div>

        {/* --- Terminal Body --- */}
        <div className="p-4 font-mono text-sm min-h-[150px]">
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Last login: {currentTime} on console</p>
          <div className="mt-4 flex gap-2">
            <span className="text-green-500 dark:text-green-400">user@machine:~$</span>
            <p className={`${isDark ? 'text-white' : 'text-gray-800'}`}>Rohith</p>
          </div>
          <div className="flex gap-2 items-start">
            <span className="text-blue-500 dark:text-blue-400">bot@gpt:~$</span>
            <p className={`${isDark ? 'text-white' : 'text-gray-800'}`}>
              {typedText}
              {!isTypingFinished && <span className="typing-cursor"></span>}
              {isTypingFinished && quoteIndex === 0 && <span className="ml-2 text-purple-400">🔱</span>}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimatedTerminal;
