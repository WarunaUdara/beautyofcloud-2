import React from 'react';

export default function VFXTestPage() {
  return (
    <div className="relative min-h-screen w-full bg-[#030303] flex items-center justify-center overflow-hidden">
      {/* Background elements for premium feel */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Glassmorphism Container */}
      <div className="relative z-10 w-full max-w-4xl aspect-square md:aspect-video rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden flex items-center justify-center p-8">
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-20px) translateX(10px); }
          }
          @keyframes float-reverse {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(20px) translateX(-10px); }
          }
          @keyframes line-glow {
            0%, 100% { stroke-dashoffset: 0; opacity: 0.3; }
            50% { opacity: 0.6; }
          }
          .node-aws {
            fill: #FF9900;
            filter: drop-shadow(0 0 8px rgba(255, 153, 0, 0.6));
          }
          .node-gcp {
            fill: #4285F4;
            filter: drop-shadow(0 0 8px rgba(66, 133, 244, 0.6));
          }
          .node-neutral {
            fill: white;
            filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.4));
          }
          .line-glow {
            filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.2));
            animation: line-pulse 4s ease-in-out infinite;
          }
          @keyframes line-pulse {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.5; }
          }
        `}} />

        <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="streamAWS" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF9900" stopOpacity="1"></stop>
              <stop offset="100%" stopColor="#FF9900" stopOpacity="0"></stop>
            </linearGradient>
            <linearGradient id="streamGCP" x1="1" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#4285F4" stopOpacity="1"></stop>
              <stop offset="100%" stopColor="#4285F4" stopOpacity="0"></stop>
            </linearGradient>
          </defs>

          {/* Connecting "Creation of Adam" Streaming Lines */}
          <g opacity="0.3">
            <path d="M 200 400 Q 400 200 600 400" stroke="url(#streamAWS)" strokeWidth="2" className="line-glow"></path>
            <path d="M 600 400 Q 400 600 200 400" stroke="url(#streamGCP)" strokeWidth="2" className="line-glow" style={{ animationDuration: '7s', animationDirection: 'reverse' }}></path>
            <path d="M 100 200 C 300 100 500 700 700 600" stroke="white" strokeWidth="1" className="line-glow" strokeDasharray="10 20"></path>
            
            {/* Internal Network */}
            <line x1="250" y1="250" x2="350" y2="450" stroke="rgba(255,255,255,0.1)" strokeWidth="1"></line>
            <line x1="350" y1="450" x2="550" y2="350" stroke="rgba(255,255,255,0.1)" strokeWidth="1"></line>
            <line x1="550" y1="350" x2="650" y2="550" stroke="rgba(255,255,255,0.1)" strokeWidth="1"></line>
            <line x1="350" y1="450" x2="650" y2="550" stroke="rgba(255,255,255,0.1)" strokeWidth="1"></line>
          </g>
          
          {/* Nodes (Floating UI elements) */}
          {/* AWS Cluster */}
          <g style={{ animation: 'float 6s ease-in-out infinite' }}>
            <circle cx="200" cy="400" r="12" className="node-aws"></circle>
            <circle cx="250" cy="250" r="6" className="node-aws" opacity="0.6"></circle>
            <circle cx="350" cy="450" r="8" className="node-aws"></circle>
            {/* Floating Data tag */}
            <rect x="130" y="360" width="80" height="24" rx="4" fill="rgba(255,153,0,0.1)" stroke="rgba(255,153,0,0.3)"></rect>
            <text x="170" y="376" fill="#FF9900" fontFamily="var(--font-geist-sans)" fontSize="10" textAnchor="middle" letterSpacing="1">us-east-1</text>
          </g>

          {/* GCP Cluster */}
          <g style={{ animation: 'float-reverse 8s ease-in-out infinite' }}>
            <circle cx="600" cy="400" r="14" className="node-gcp"></circle>
            <circle cx="550" cy="350" r="7" className="node-gcp" opacity="0.6"></circle>
            <circle cx="650" cy="550" r="9" className="node-gcp"></circle>
            {/* Floating Data tag */}
            <rect x="620" y="350" width="80" height="24" rx="4" fill="rgba(66,133,244,0.1)" stroke="rgba(66,133,244,0.3)"></rect>
            <text x="660" y="366" fill="#4285F4" fontFamily="var(--font-geist-sans)" fontSize="10" textAnchor="middle" letterSpacing="1">us-central1</text>
          </g>

          {/* User Nodes (White) */}
          <g style={{ animation: 'float 5s ease-in-out infinite' }}>
            <circle cx="100" cy="200" r="4" className="node-neutral"></circle>
            <circle cx="700" cy="600" r="5" className="node-neutral"></circle>
          </g>
        </svg>
      </div>

      {/* Label */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-sm font-light tracking-[0.2em] uppercase">
        VFX Interaction Test
      </div>
    </div>
  );
}
