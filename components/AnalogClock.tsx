import React, { useEffect, useState } from 'react';

interface AnalogClockProps {
  timezone: string;
  city: string;
  size?: number;
}

const AnalogClock: React.FC<AnalogClockProps> = ({ timezone, city, size = 120 }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Get time for the specific timezone
  const dateInTimezone = new Date(time.toLocaleString('en-US', { timeZone: timezone }));
  
  const seconds = dateInTimezone.getSeconds();
  const minutes = dateInTimezone.getMinutes();
  const hours = dateInTimezone.getHours();

  const secondDegrees = ((seconds / 60) * 360) + 90;
  const minuteDegrees = ((minutes / 60) * 360) + ((seconds/60)*6) + 90;
  const hourDegrees = ((hours / 12) * 360) + ((minutes/60)*30) + 90;

  // Format digital time
  const digitalTime = dateInTimezone.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const dayName = dateInTimezone.toLocaleDateString('en-US', { weekday: 'short' });

  return (
    <div className="flex flex-col items-center">
      <div 
        className="relative rounded-full bg-white border-4 border-slate-200 shadow-inner mb-3"
        style={{ width: size, height: size }}
      >
        {/* Clock Face Markers */}
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className={`absolute w-0.5 h-2 bg-slate-400 left-1/2 origin-bottom transform -translate-x-1/2`}
            style={{ 
              top: '2px', 
              height: i % 3 === 0 ? '8px' : '4px',
              transform: `rotate(${i * 30}deg) translateY(2px)` 
            }} 
          />
        ))}
        
        {/* Numbers */}
        {[...Array(12)].map((_, i) => {
            const num = i + 1;
            const angle = (num * 30);
            const radius = size / 2 - 16; // Adjust radius for number position
            const x = Math.sin(angle * (Math.PI / 180)) * radius;
            const y = -Math.cos(angle * (Math.PI / 180)) * radius;
            
            return (
                <div 
                    key={num}
                    className="absolute text-[10px] font-bold text-slate-500"
                    style={{ 
                        transform: `translate(${x}px, ${y}px)`,
                        top: '50%',
                        left: '50%',
                        marginTop: '-6px', // Half of font-size roughly
                        marginLeft: '-3px', // Half of width roughly
                    }}
                >
                    {num}
                </div>
            );
        })}


        {/* Hands */}
        <div 
          className="absolute top-1/2 left-1/2 w-[35%] h-1 bg-slate-800 origin-left rounded-full"
          style={{ transform: `rotate(${hourDegrees - 90}deg)` }}
        />
        <div 
          className="absolute top-1/2 left-1/2 w-[45%] h-0.5 bg-slate-600 origin-left rounded-full"
          style={{ transform: `rotate(${minuteDegrees - 90}deg)` }}
        />
        <div 
          className="absolute top-1/2 left-1/2 w-[48%] h-0.5 bg-red-500 origin-left rounded-full"
          style={{ transform: `rotate(${secondDegrees - 90}deg)` }}
        />
        
        {/* Center Dot */}
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-sm" />
      </div>

      <div className="text-center">
        <div className="font-bold text-slate-900 flex items-center justify-center gap-2">
           {/* Flag placeholder - could be passed as prop */}
           {city}
        </div>
        <div className="text-xs text-slate-500 font-mono mt-0.5">
          {dayName} {digitalTime}
        </div>
      </div>
    </div>
  );
};

export default AnalogClock;
