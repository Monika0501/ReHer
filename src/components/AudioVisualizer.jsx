import React from 'react';

export const AudioVisualizer = ({ isActive, color = 'indigo' }) => {
  const colorClasses = {
    indigo: 'bg-indigo-600',
    rose: 'bg-rose-500',
    emerald: 'bg-emerald-500'
  };

  const bgClass = colorClasses[color] || 'bg-indigo-600';

  return (
    <div className="flex items-center justify-center gap-1 h-8 px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg">
      <div 
        className={`w-1 rounded-full ${bgClass} transition-all duration-150 ${
          isActive ? 'h-5 animate-pulse' : 'h-1.5 opacity-40'
        }`} 
      />
      <div 
        className={`w-1 rounded-full ${bgClass} transition-all duration-150 ${
          isActive ? 'h-7 animate-bounce' : 'h-2 opacity-40'
        }`}
        style={{ animationDelay: '0.1s' }}
      />
      <div 
        className={`w-1 rounded-full ${bgClass} transition-all duration-150 ${
          isActive ? 'h-4 animate-pulse' : 'h-3 opacity-40'
        }`}
        style={{ animationDelay: '0.2s' }}
      />
      <div 
        className={`w-1 rounded-full ${bgClass} transition-all duration-150 ${
          isActive ? 'h-8 animate-bounce' : 'h-2 opacity-40'
        }`}
        style={{ animationDelay: '0.15s' }}
      />
      <div 
        className={`w-1 rounded-full ${bgClass} transition-all duration-150 ${
          isActive ? 'h-6 animate-pulse' : 'h-2.5 opacity-40'
        }`}
        style={{ animationDelay: '0.3s' }}
      />
      <div 
        className={`w-1 rounded-full ${bgClass} transition-all duration-150 ${
          isActive ? 'h-3 animate-bounce' : 'h-1.5 opacity-40'
        }`}
        style={{ animationDelay: '0.25s' }}
      />
      <div 
        className={`w-1 rounded-full ${bgClass} transition-all duration-150 ${
          isActive ? 'h-5 animate-pulse' : 'h-2 opacity-40'
        }`}
        style={{ animationDelay: '0.05s' }}
      />
    </div>
  );
};
