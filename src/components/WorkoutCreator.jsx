import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Trash2, Clock } from 'lucide-react';

const WorkoutCreator = ({ onSave, onClose }) => {
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDescription, setWorkoutDescription] = useState('');
  const [difficulty, setDifficulty] = useState('Beginner');
  const [exercises, setExercises] = useState([
    { name: '', type: 'Strength', duration: 30, rest: 10, instruction: '' }
  ]);

  const exerciseTypes = ['Strength', 'Cardio', 'Flexibility', 'Balance', 'HIIT'];
  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

  const addExercise = () => {
    setExercises([...exercises, {
      name: '',
      type: 'Strength',
      duration: 30,
      rest: 10,
      instruction: ''
    }]);
  };

  const removeExercise = (index) => {
    if (exercises.length > 1) {
      setExercises(exercises.filter((_, i) => i !== index));
    }
  };

  const updateExercise = (index, field, value) => {
    const updated = exercises.map((exercise, i) => 
      i === index ? { ...exercise, [field]: value } : exercise
    );
    setExercises(updated);
  };

  const handleSave = () => {
    if (!workoutName.trim() || exercises.some(ex => !ex.name.trim())) {
      alert('Please fill in all required fields');
      return;
    }

    const workout = {
      id: Date.now().toString(),
      name: workoutName,
      description: workoutDescription,
      difficulty,
      exercises: exercises.map(ex => ({
        ...ex,
        duration: parseInt(ex.duration),
        rest: parseInt(ex.rest)
      }))
    };

    onSave(workout);
  };

  const totalDuration = exercises.reduce((total, ex) => 
    total + parseInt(ex.duration || 0) + parseInt(ex.rest || 0), 0
  );

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
        className="glass rounded-3xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Create Custom Workout</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="glass-dark rounded-full p-2 text-white hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Workout Details */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Workout Name *
            </label>
            <input
              type="text"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              className="w-full glass-dark rounded-xl p-3 text-white placeholder-white/50 border-0 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter workout name"
            />
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Difficulty Level
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full glass-dark rounded-xl p-3 text-white border-0 focus:ring-2 focus:ring-blue-500"
            >
              {difficulties.map(diff => (
                <option key={diff} value={diff} className="bg-gray-800">
                  {diff}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-white/80 text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            value={workoutDescription}
            onChange={(e) => setWorkoutDescription(e.target.value)}
            className="w-full glass-dark rounded-xl p-3 text-white placeholder-white/50 border-0 focus:ring-2 focus:ring-blue-500 h-20 resize-none"
            placeholder="Describe your workout..."
          />
        </div>

        {/* Workout Summary */}
        <div className="glass-dark rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4 text-white/70">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{Math.round(totalDuration / 60)} min total</span>
              </div>
              <span>{exercises.length} exercises</span>
            </div>
            <div className="text-purple-300 font-medium">
              ~{Math.round(exercises.length * 12)} cal
            </div>
          </div>
        </div>

        {/* Exercises */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Exercises</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addExercise}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl px-4 py-2 text-white text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              <span>Add Exercise</span>
            </motion.button>
          </div>

          {exercises.map((exercise, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-dark rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-medium">Exercise {index + 1}</h4>
                {exercises.length > 1 && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeExercise(index)}
                    className="text-red-400 hover:text-red-300 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-white/70 text-sm mb-1">Name *</label>
                  <input
                    type="text"
                    value={exercise.name}
                    onChange={(e) => updateExercise(index, 'name', e.target.value)}
                    className="w-full bg-white/10 rounded-lg p-2 text-white placeholder-white/50 text-sm border-0 focus:ring-1 focus:ring-blue-500"
                    placeholder="Exercise name"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-1">Type</label>
                  <select
                    value={exercise.type}
                    onChange={(e) => updateExercise(index, 'type', e.target.value)}
                    className="w-full bg-white/10 rounded-lg p-2 text-white text-sm border-0 focus:ring-1 focus:ring-blue-500"
                  >
                    {exerciseTypes.map(type => (
                      <option key={type} value={type} className="bg-gray-800">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-white/70 text-sm mb-1">Duration (seconds)</label>
                  <input
                    type="number"
                    value={exercise.duration}
                    onChange={(e) => updateExercise(index, 'duration', e.target.value)}
                    className="w-full bg-white/10 rounded-lg p-2 text-white text-sm border-0 focus:ring-1 focus:ring-blue-500"
                    min="5"
                    max="300"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-1">Rest (seconds)</label>
                  <input
                    type="number"
                    value={exercise.rest}
                    onChange={(e) => updateExercise(index, 'rest', e.target.value)}
                    className="w-full bg-white/10 rounded-lg p-2 text-white text-sm border-0 focus:ring-1 focus:ring-blue-500"
                    min="0"
                    max="120"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-1">Instructions</label>
                <textarea
                  value={exercise.instruction}
                  onChange={(e) => updateExercise(index, 'instruction', e.target.value)}
                  className="w-full bg-white/10 rounded-lg p-2 text-white placeholder-white/50 text-sm border-0 focus:ring-1 focus:ring-blue-500 h-16 resize-none"
                  placeholder="Exercise instructions..."
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-6 py-3 glass-dark rounded-xl text-white hover:bg-white/20 transition-colors"
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-shadow"
          >
            Create Workout
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WorkoutCreator;
