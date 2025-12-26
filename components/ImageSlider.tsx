
import React, { useRef } from 'react';

const SAMPLE_IMAGES = [
  {
    url: "https://picsum.photos/id/65/800/1000",
    title: "El Retrato del Silencio",
    desc: "Un joven capturado en el umbral de la eternidad."
  },
  {
    url: "https://picsum.photos/id/1043/800/1000",
    title: "Cera y Sombras",
    desc: "La luz que se consume en lágrimas de vela."
  },
  {
    url: "https://picsum.photos/id/1014/800/1000",
    title: "El Susurro de la Noche",
    desc: "Donde el cielo se tiñe de carmesí profundo."
  }
];

const ImageSlider: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative group">
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-8 pb-12 snap-x no-scrollbar scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {SAMPLE_IMAGES.map((img, idx) => (
          <div 
            key={idx}
            className="flex-shrink-0 w-80 md:w-[450px] snap-center group/card"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-red-900/50 shadow-2xl shadow-red-950/50 transition-transform duration-500 group-hover/card:scale-[1.02]">
              <img 
                src={img.url} 
                alt={img.title}
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-1000 brightness-75 hover:brightness-100"
              />
              {/* Overlay Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
              
              {/* Image Info */}
              <div className="absolute bottom-0 left-0 p-6 text-left">
                <h3 className="elegant-font text-2xl text-red-500 mb-2">{img.title}</h3>
                <p className="medieval-font text-red-100/70 text-sm leading-relaxed translate-y-4 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-500">
                  {img.desc}
                </p>
              </div>
              
              {/* Blood stains on corners */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[url('https://www.transparenttextures.com/patterns/blood.png')] opacity-30 pointer-events-none rotate-180"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[url('https://www.transparenttextures.com/patterns/blood.png')] opacity-30 pointer-events-none"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation cues */}
      <div className="flex justify-center gap-4 mt-8">
        <div className="w-12 h-1 bg-red-900 rounded-full overflow-hidden">
          <div className="w-full h-full bg-red-500 animate-[shimmer_2s_infinite]"></div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ImageSlider;
