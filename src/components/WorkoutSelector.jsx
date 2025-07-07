import React from 'react';
import { motion } from 'framer-motion';
import { X, Clock, Zap, Target, Flame } from 'lucide-react';

const WorkoutSelector = ({ workouts, onSelect, onClose }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-400/20';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/20';
      case 'Advanced': return 'text-red-400 bg-red-400/20';
      default: return 'text-blue-400 bg-blue-400/20';
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return Target;
      case 'Intermediate': return Zap;
      case 'Advanced': return Flame;
      default: return Target;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass rounded-3xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Choose Your Workout</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="glass-dark rounded-full p-2 text-white hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="grid gap-4">
          {workouts.map((workout, index) => {
            const DifficultyIcon = getDifficultyIcon(workout.difficulty);
            const totalDuration = workout.exercises.reduce(
              (total, ex) => total + ex.duration + ex.rest, 0
            );

            return (
              <motion.div
                key={workout.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(workout)}
                className="glass-dark rounded-2xl p-4 cursor-pointer hover:bg-white/10 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {workout.name}
                    </h3>
                    <p className="text-white/70 text-sm">
                      {workout.description}
                    </p>
                  </div>
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(workout.difficulty)}`}>
                    <DifficultyIcon className="w-3 h-3" />
                    <span>{workout.difficulty}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-white/60">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{Math.round(totalDuration / 60)} min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="w-4 h-4" />
                      <span>{workout.exercises.length} exercises</span>
                    </div>
                  </div>
                  <div className="text-purple-300 font-medium">
                    ~{Math.round(workout.exercises.length * 12)} cal
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {workout.exercises.slice(0, 3).map((exercise, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-white/10 rounded-lg text-xs text-white/80"
                    >
                      {exercise.name}
                    </span>
                  ))}
                  {workout.exercises.length > 3 && (
                    <span className="px-2 py-1 bg-white/10 rounded-lg text-xs text-white/60">
                      +{workout.exercises.length - 3} more
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WorkoutSelector;
