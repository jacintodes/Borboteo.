
import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

const Editor: React.FC = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSourceImage(reader.result as string);
        setResultImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!sourceImage || !prompt) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = sourceImage.split(',')[1];
      const mimeType = sourceImage.split(';')[0].split(':')[1];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: mimeType,
              },
            },
            {
              text: `${prompt}. Haz que el estilo sea gótico, oscuro y elegante, con toques carmesí si es posible.`,
            },
          ],
        },
      });

      let foundImage = false;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setResultImage(`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`);
            foundImage = true;
            break;
          }
        }
      }

      if (!foundImage) {
        setError("El modelo no generó una imagen. Prueba con otro prompt.");
      }
    } catch (err) {
      console.error(err);
      setError("Error al procesar la imagen. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-red-950/20 border border-red-900/40 p-8 rounded-lg backdrop-blur-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        {/* Source Image */}
        <div className="flex flex-col gap-4">
          <label className="medieval-font text-red-500 text-xl">Imagen Original</label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square bg-black/40 border-2 border-dashed border-red-900/30 rounded-lg flex items-center justify-center cursor-pointer hover:border-red-600 transition-colors overflow-hidden group"
          >
            {sourceImage ? (
              <img src={sourceImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Source" />
            ) : (
              <div className="text-center p-6">
                <span className="text-5xl block mb-2 opacity-50">🩸</span>
                <p className="medieval-font text-red-800">Cargar Imagen para Sacrificar</p>
              </div>
            )}
          </div>
          <input 
            type="file" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*"
          />
        </div>

        {/* Result Image */}
        <div className="flex flex-col gap-4">
          <label className="medieval-font text-red-500 text-xl">Resultado Oscuro</label>
          <div className="aspect-square bg-black/40 border-2 border-red-900/30 rounded-lg flex items-center justify-center overflow-hidden relative">
            {loading && (
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-10">
                <div className="w-12 h-12 border-4 border-red-900 border-t-red-600 rounded-full animate-spin mb-4"></div>
                <p className="elegant-font text-red-500 animate-pulse text-xs tracking-widest">INVOCANDO SOMBRAS...</p>
              </div>
            )}
            {resultImage ? (
              <img src={resultImage} className="w-full h-full object-cover" alt="Result" />
            ) : (
              <p className="medieval-font text-red-900/40 italic">La transformación aguarda...</p>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-xl mx-auto space-y-6">
        <textarea 
          placeholder="Escribe tu deseo gótico (ej: 'Añade una corona de espinas', 'Haz que llore sangre'...)"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full bg-black/60 border border-red-900/50 p-4 rounded-md text-red-400 medieval-font focus:outline-none focus:border-red-500 placeholder:text-red-900/50 min-h-[100px]"
        />
        
        <button 
          onClick={handleEdit}
          disabled={loading || !sourceImage || !prompt}
          className={`w-full py-4 elegant-font text-xl tracking-[0.2em] rounded-md transition-all duration-500 border border-red-900/50
            ${loading || !sourceImage || !prompt 
              ? 'bg-red-950/20 text-red-900/40 cursor-not-allowed' 
              : 'bg-red-900/40 text-red-100 hover:bg-red-800/60 hover:text-white hover:shadow-[0_0_20px_rgba(139,0,0,0.5)]'
            }`}
        >
          {loading ? "PROCESANDO..." : "TRANSFORMAR"}
        </button>
        
        {error && (
          <p className="text-red-600 medieval-font text-center mt-4 animate-bounce">
            ⚠️ {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Editor;
