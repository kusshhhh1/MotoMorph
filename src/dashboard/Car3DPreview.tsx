import React from 'react';

const Car3DPreview: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-black rounded-2xl border border-[#007BFF]/30 shadow-2xl p-8 text-center max-w-md mx-auto">
        {/* Animated Spinner */}
        <div className="mb-6">
          <div className="inline-block w-8 h-8 border-2 border-[#007BFF] border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        {/* Main Text */}
        <div className="space-y-3">
          <h3 className="text-[#007BFF] text-xl font-bold">
            🔧 Real-Time 3D Preview In Progress...
          </h3>
          <p className="text-white/80 text-sm leading-relaxed">
            Your custom car preview will appear here soon!
          </p>
        </div>
        
        {/* Animated Dots */}
        <div className="mt-6 flex justify-center space-x-1">
          <div className="w-2 h-2 bg-[#007BFF] rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-[#007BFF] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-[#007BFF] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Car3DPreview;