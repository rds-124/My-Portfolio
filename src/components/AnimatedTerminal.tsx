import React, { useState, useEffect, useRef } from 'react';
import { Moon } from 'lucide-react'; // Moon icon for the light theme header

// --- 1. CSS for the typing animation ---
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


const AnimatedTerminal = ({ isDark }) => {
  const [typedText, setTypedText] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const fullText = "Perfection may not be attainable, but if we chase perfection, we can catch excellence.";

  // --- State and Refs for Dragging ---
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const terminalRef = useRef(null);

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
  
  // Effect for the typing animation
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timer = setTimeout(() => {
        setTypedText(fullText.substring(0, typedText.length + 1));
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [typedText, fullText]);

  // --- Drag and Drop Logic ---
  const handleMouseDown = (e) => {
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
      document.body.style.userSelect = 'auto';
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


  return (
    <>
      <TerminalStyles />
      <div 
        ref={terminalRef}
        // --- THEME FIX: Swapping background and border colors based on the isDark prop ---
        className={`w-full max-w-2xl mx-auto rounded-xl overflow-hidden
                   ${isDark ? 'bg-black/30 border-white/10' : 'bg-gray-100/70 border-gray-300'}
                   backdrop-blur-xl shadow-2xl shadow-purple-500/10 relative`}
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px)`,
          zIndex: isDragging ? 1000 : 10,
          touchAction: 'none'
        }}
      >
        {/* --- Terminal Header (The Drag Handle) --- */}
        <div 
            className={`h-9 flex items-center justify-between px-4 
                       ${isDark ? 'bg-gray-800/50 border-white/10' : 'bg-gray-200/80 border-gray-300'}
                       border-b cursor-grab active:cursor-grabbing`}
            onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Terminal</p>
          {/* --- THEME FIX: Show Moon icon in light mode --- */}
          <div className="w-4 h-4">
            {!isDark && <Moon size={16} className="text-gray-600" />}
          </div>
        </div>

        {/* --- Terminal Body --- */}
        <div className="p-4 font-mono text-sm min-h-[150px]">
          {/* --- THEME FIX: Adjusting text colors for light mode --- */}
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Last login: {currentTime} on console</p>
          <div className="mt-4 flex gap-2">
            <span className="text-green-500 dark:text-green-400">user@machine:~$</span>
            <p className={`${isDark ? 'text-white' : 'text-gray-800'}`}>Rohith</p>
          </div>
          <div className="flex gap-2">
            <span className="text-blue-500 dark:text-blue-400">bot@gpt:~$</span>
            <p className={`${isDark ? 'text-white' : 'text-gray-800'}`}>
              {typedText}
              {typedText.length < fullText.length && <span className="typing-cursor"></span>}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimatedTerminal;
