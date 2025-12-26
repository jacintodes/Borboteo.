
import React, { useState, useEffect } from 'react';
import BloodRain from './components/BloodRain';
import GothicText from './components/GothicText';
import ImageSlider from './components/ImageSlider';
import Editor from './components/Editor';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'view' | 'edit'>('view');

  return (
    <div className="relative min-h-screen bg-black text-red-900 flex flex-col items-center select-none overflow-x-hidden">
      {/* Falling Blood Animation */}
      <BloodRain />

      {/* Hero Section */}
      <header className="relative z-10 w-full py-20 flex flex-col items-center justify-center text-center px-4">
        <GothicText text="BORBOTEO" />
        <p className="elegant-font text-red-700 text-lg md:text-2xl mt-4 opacity-80 tracking-widest animate-pulse">
          SANGRE Y SOMBRAS EN EL CIELO
        </p>
      </header>

      {/* Navigation */}
      <nav className="relative z-20 flex gap-8 mb-12">
        <button 
          onClick={() => setActiveTab('view')}
          className={`elegant-font text-xl md:text-2xl transition-all duration-500 hover:text-red-500 border-b-2 ${activeTab === 'view' ? 'border-red-600 text-red-500' : 'border-transparent text-red-900'}`}
        >
          GALERÍA
        </button>
        <button 
          onClick={() => setActiveTab('edit')}
          className={`elegant-font text-xl md:text-2xl transition-all duration-500 hover:text-red-500 border-b-2 ${activeTab === 'edit' ? 'border-red-600 text-red-500' : 'border-transparent text-red-900'}`}
        >
          TRANSFORMAR
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-6xl px-4 pb-32">
        {activeTab === 'view' ? (
          <section className="animate-in fade-in duration-1000">
            <div className="mb-12 text-center">
              <h2 className="medieval-font text-3xl text-red-600 mb-6">Memorias Carmesí</h2>
              <p className="medieval-font text-red-800/60 max-w-2xl mx-auto italic">
                Desliza a través del vacío, donde la carne y la cera se funden bajo el llanto del cielo.
              </p>
            </div>
            <ImageSlider />
          </section>
        ) : (
          <section className="animate-in slide-in-from-bottom-8 duration-700">
            <Editor />
          </section>
        )}
      </main>

      {/* Footer Decoration */}
      <footer className="fixed bottom-0 w-full h-24 bg-gradient-to-t from-red-950/40 to-transparent pointer-events-none z-0"></footer>
      
      <style>{`
        @keyframes drip {
          0% { transform: translateY(-20px) scaleY(1); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(110vh) scaleY(1.5); opacity: 0.2; }
        }
        .blood-drip {
          animation: drip linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
