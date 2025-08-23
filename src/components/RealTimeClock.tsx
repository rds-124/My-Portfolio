import React, { useState, useEffect } from 'react';

const RealTimeClock = () => {
  const [currentTime, setCurrentTime] = useState({
    time: '',
    period: '',
    date: ''
  });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      
      const timeOptions: Intl.DateTimeFormatOptions = { 
        timeZone: 'Asia/Kolkata', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
      };
      const timeString = new Intl.DateTimeFormat('en-US', timeOptions).format(now);
      const timeParts = timeString.split(' ');
      const time = timeParts[0];
      const period = timeParts[1];

      const dateOptions: Intl.DateTimeFormatOptions = { 
        timeZone: 'Asia/Kolkata', 
        month: 'long', 
        day: 'numeric' 
      };
      const date = new Intl.DateTimeFormat('en-US', dateOptions).format(now);
      
      setCurrentTime({ time, period, date });
    };

    updateClock();
    const timerId = setInterval(updateClock, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    // THE FIX IS HERE: Increased margin-right from mr-4 to mr-16 to create more space.
    <div className="flex items-center gap-3 font-mono mr-16">
      
      <div className="text-right">
        {/* Slightly reduced font size for a more compact look */}
        <p className="font-medium text-purple-400 dark:text-purple-300 text-sm">Bengaluru, IN</p>
        <p className="text-xs text-purple-400 dark:text-purple-300">{currentTime.date}</p>
      </div>

      <div className="w-px h-8 bg-gray-300 dark:bg-gray-700"></div>

      <div className="flex items-end gap-1.5">
        {/* Slightly reduced font size for a more compact look */}
        <p className="text-4xl font-medium text-cyan-500 dark:text-cyan-300 leading-none">
          {currentTime.time}
        </p>
        <div className="text-xs text-cyan-600/80 dark:text-cyan-400/80 leading-tight pb-1">
          <p>{currentTime.period}</p>
        </div>
      </div>
    </div>
  );
};

export default RealTimeClock;
