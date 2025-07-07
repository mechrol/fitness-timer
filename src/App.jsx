import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Square, 
  Settings, 
  Trophy, 
  Calendar,
  Plus,
  Timer,
  Zap,
  Target,
  Award,
  TrendingUp
} from 'lucide-react';
import TimerInterface from './components/TimerInterface';
import WorkoutSelector from './components/WorkoutSelector';
import ProgressDashboard from './components/ProgressDashboard';
import WorkoutCreator from './components/WorkoutCreator';
import { useWorkoutTimer } from './hooks/useWorkoutTimer';
import { useWorkoutHistory } from './hooks/useWorkoutHistory';
import { workoutPresets } from './data/workouts';

function App() {
  const [currentView, setCurrentView] = useState('timer');
  const [selectedWorkout, setSelectedWorkout] = useState(workoutPresets[0]);
  const [showWorkoutSelector, setShowWorkoutSelector] = useState(false);
  const [showWorkoutCreator, setShowWorkoutCreator] = useState(false);
  
  const timer = useWorkoutTimer(selectedWorkout);
  const { addWorkoutSession, getWorkoutStats, getWeeklyProgress } = useWorkoutHistory();

  useEffect(() => {
    if (timer.isCompleted && timer.currentExerciseIndex === selectedWorkout.exercises.length - 1) {
      // Workout completed
      addWorkoutSession({
        workoutName: selectedWorkout.name,
        duration: selectedWorkout.exercises.reduce((total, ex) => total + ex.duration + ex.rest, 0),
        exercisesCompleted: selectedWorkout.exercises.length,
        caloriesBurned: Math.round(selectedWorkout.exercises.length * 12), // Rough estimation
        date: new Date().toISOString()
      });
      
      // Show completion notification
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('🎉 Workout Complete!', {
          body: `Great job! You've completed ${selectedWorkout.name}`,
          icon: '/vite.svg'
        });
      }
    }
  }, [timer.isCompleted, timer.currentExerciseIndex, selectedWorkout, addWorkoutSession]);

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const handleWorkoutSelect = (workout) => {
    setSelectedWorkout(workout);
    setShowWorkoutSelector(false);
    timer.reset();
  };

  const handleCustomWorkoutCreate = (workout) => {
    setSelectedWorkout(workout);
    setShowWorkoutCreator(false);
    timer.reset();
  };

  const navigationItems = [
    { id: 'timer', label: 'Timer', icon: Timer },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'workouts', label: 'Workouts', icon: Target },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-green-400 to-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass rounded-b-3xl mx-4 mt-4 p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">FitTimer Pro</h1>
                <p className="text-blue-200 text-sm">Your Ultimate Workout Companion</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowWorkoutSelector(true)}
                className="glass-dark rounded-xl p-3 text-white hover:bg-white/20 transition-colors"
              >
                <Target className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowWorkoutCreator(true)}
                className="glass-dark rounded-xl p-3 text-white hover:bg-white/20 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-hidden">
          <AnimatePresence mode="wait">
            {currentView === 'timer' && (
              <motion.div
                key="timer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full"
              >
                <TimerInterface 
                  timer={timer} 
                  workout={selectedWorkout}
                />
              </motion.div>
            )}
            
            {currentView === 'progress' && (
              <motion.div
                key="progress"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full"
              >
                <ProgressDashboard 
                  stats={getWorkoutStats()}
                  weeklyProgress={getWeeklyProgress()}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Bottom Navigation */}
        <motion.nav 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass rounded-t-3xl mx-4 mb-4 p-4"
        >
          <div className="flex justify-around">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentView(item.id)}
                  className={`flex flex-col items-center space-y-1 p-3 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg' 
                      : 'text-blue-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-medium">{item.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.nav>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showWorkoutSelector && (
          <WorkoutSelector
            workouts={workoutPresets}
            onSelect={handleWorkoutSelect}
            onClose={() => setShowWorkoutSelector(false)}
          />
        )}
        
        {showWorkoutCreator && (
          <WorkoutCreator
            onSave={handleCustomWorkoutCreate}
            onClose={() => setShowWorkoutCreator(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
