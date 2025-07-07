import React from 'react';
import { motion } from 'framer-motion';

const CircularProgress = ({ progress, size = 200, strokeWidth = 8, isResting = false }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress * circumference);

  return (
    <div className="relative">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={isResting ? 
            "url(#restGradient)" : 
            "url(#workoutGradient)"
          }
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-out"
        />
        
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="workoutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          <linearGradient id="restGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Glow effect */}
      <div 
        className={`absolute inset-0 rounded-full ${
          isResting ? 'bg-blue-500/10' : 'bg-purple-500/10'
        } blur-xl`}
        style={{
          animation: isResting ? 'pulse 2s infinite' : 'none'
        }}
      />
    </div>
  );
};

export default CircularProgress;
