
import React from 'react';

interface GothicTextProps {
  text: string;
}

const GothicText: React.FC<GothicTextProps> = ({ text }) => {
  return (
    <div className="relative group cursor-default">
      {/* Decorative Shadow/Glow */}
      <h1 className="gothic-font text-8xl md:text-[12rem] text-red-600 drop-shadow-[0_0_15px_rgba(139,0,0,0.8)] leading-none select-none transition-all duration-700 group-hover:text-red-500 group-hover:drop-shadow-[0_0_25px_rgba(255,0,0,0.9)]">
        {text}
      </h1>
      
      {/* Decorative lines */}
      <div className="absolute -bottom-4 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-800 to-transparent"></div>
      <div className="absolute -top-4 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-800 to-transparent"></div>
      
      {/* Blood drip effect on letters - pseudo-elements simulation */}
      <div className="absolute top-full left-1/4 w-1 h-12 bg-red-900 rounded-full animate-pulse opacity-50 blur-[1px]"></div>
      <div className="absolute top-full left-3/4 w-1 h-8 bg-red-900 rounded-full animate-pulse opacity-40 blur-[1px] delay-700"></div>
    </div>
  );
};

export default GothicText;
