import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Square, SkipForward, Volume2 } from 'lucide-react';
import CircularProgress from './CircularProgress';

const TimerInterface = ({ timer, workout }) => {
  const currentExercise = workout.exercises[timer.currentExerciseIndex];
  const isResting = timer.isResting;
  const progress = timer.progress;

  // Notification for exercise transitions
  useEffect(() => {
    if (timer.timeLeft === 3 && timer.timeLeft > 0) {
      if ('Notification' in window && Notification.permission === 'granted') {
        const message = isResting ? 'Get ready for next exercise!' : 'Almost done!';
        new Notification('⏰ Timer Alert', {
          body: message,
          icon: '/vite.svg'
        });
      }
    }
  }, [timer.timeLeft, isResting]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getMotivationalMessage = () => {
    if (isResting) {
      return "Take a deep breath and prepare for the next exercise";
    }
    
    if (timer.timeLeft <= 5) {
      return "Push through! You've got this! 💪";
    }
    
    if (timer.timeLeft <= 15) {
      return "Keep going strong! Almost there! 🔥";
    }
    
    return currentExercise?.instruction || "Stay focused and maintain good form";
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-8">
      {/* Workout Progress */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-4 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-white/80 text-sm font-medium">Workout Progress</span>
          <span className="text-white text-sm font-bold">
            {timer.currentExerciseIndex + 1} / {workout.exercises.length}
          </span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <motion.div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ 
              width: `${((timer.currentExerciseIndex + progress) / workout.exercises.length) * 100}%` 
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Main Timer */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative"
      >
        <div className={`timer-glow ${isResting ? 'breathing-animation' : ''}`}>
          <CircularProgress
            progress={progress}
            size={280}
            strokeWidth={8}
            isResting={isResting}
          />
        </div>
        
        {/* Timer Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${timer.currentExerciseIndex}-${isResting}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center"
            >
              <div className={`text-6xl font-bold mb-2 ${
                isResting ? 'text-blue-300' : 'text-white'
              }`}>
                {formatTime(timer.timeLeft)}
              </div>
              <div className={`text-lg font-semibold mb-1 ${
                isResting ? 'text-blue-200' : 'text-purple-200'
              }`}>
                {isResting ? 'Rest Time' : currentExercise?.name}
              </div>
              <div className="text-sm text-white/60">
                {isResting ? 'Prepare for next exercise' : currentExercise?.type}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Motivational Message */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass rounded-2xl p-4 w-full max-w-md text-center"
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={getMotivationalMessage()}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-white/90 text-sm leading-relaxed"
          >
            {getMotivationalMessage()}
          </motion.p>
        </AnimatePresence>
      </motion.div>

      {/* Control Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={timer.reset}
          className="glass-dark rounded-full p-4 text-white hover:bg-white/20 transition-colors"
        >
          <Square className="w-6 h-6" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={timer.isRunning ? timer.pause : timer.start}
          className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-6 text-white shadow-lg hover:shadow-xl transition-shadow"
        >
          {timer.isRunning ? (
            <Pause className="w-8 h-8" />
          ) : (
            <Play className="w-8 h-8 ml-1" />
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={timer.skip}
          className="glass-dark rounded-full p-4 text-white hover:bg-white/20 transition-colors"
        >
          <SkipForward className="w-6 h-6" />
        </motion.button>
      </motion.div>

      {/* Exercise Preview */}
      {!isResting && timer.currentExerciseIndex < workout.exercises.length - 1 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass rounded-xl p-3 w-full max-w-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-white/60 text-xs">Next Exercise:</span>
            <span className="text-white text-sm font-medium">
              {workout.exercises[timer.currentExerciseIndex + 1]?.name}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TimerInterface;
