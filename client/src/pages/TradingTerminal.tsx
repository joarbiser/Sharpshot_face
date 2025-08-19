import React from "react";

export default function TradingTerminal() {
  return (
    <div className="min-h-screen relative">
      {/* Glass Background System */}
      <div className="backdrop fixed inset-0 z-0">
        <div className="circle-green"></div>
        <div className="circle-gold"></div>
        <div className="circle-neutral"></div>
      </div>
      
      {/* Centered Logo */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-8">
        <div className="text-center">
          <img 
            src="/logo-gold.png" 
            alt="Sharp Shot" 
            className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] object-contain mx-auto"
            style={{ opacity: '0.9' }}
          />
          
          <div className="mt-8 text-center">
            <h2 className="text-muted text-2xl md:text-3xl lg:text-4xl font-light mb-4">
              Advanced Trading Terminal
            </h2>
            <p className="text-muted/60 text-lg md:text-xl">
              Coming Soon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}