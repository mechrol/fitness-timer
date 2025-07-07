import { useState, useEffect } from 'react';

const STORAGE_KEY = 'fitness-timer-history';

export const useWorkoutHistory = () => {
  const [workoutHistory, setWorkoutHistory] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setWorkoutHistory(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading workout history:', error);
        setWorkoutHistory([]);
      }
    }
  }, []);

  const saveToStorage = (history) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Error saving workout history:', error);
    }
  };

  const addWorkoutSession = (session) => {
    const newHistory = [session, ...workoutHistory];
    setWorkoutHistory(newHistory);
    saveToStorage(newHistory);
  };

  const getWorkoutStats = () => {
    const totalWorkouts = workoutHistory.length;
    const totalCalories = workoutHistory.reduce((sum, session) => sum + session.caloriesBurned, 0);
    const totalMinutes = workoutHistory.reduce((sum, session) => sum + Math.round(session.duration / 60), 0);
    const totalExercises = workoutHistory.reduce((sum, session) => sum + session.exercisesCompleted, 0);
    
    return {
      totalWorkouts,
      totalCalories,
      totalMinutes,
      totalExercises,
      recentWorkouts: workoutHistory.slice(0, 10)
    };
  };

  const getWeeklyProgress = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weeklyData = days.map(day => ({ day, workouts: 0, calories: 0 }));
    
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    workoutHistory.forEach(session => {
      const sessionDate = new Date(session.date);
      if (sessionDate >= oneWeekAgo) {
        const dayIndex = (sessionDate.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0
        if (dayIndex >= 0 && dayIndex < 7) {
          weeklyData[dayIndex].workouts += 1;
          weeklyData[dayIndex].calories += session.caloriesBurned;
        }
      }
    });
    
    return weeklyData;
  };

  const clearHistory = () => {
    setWorkoutHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    workoutHistory,
    addWorkoutSession,
    getWorkoutStats,
    getWeeklyProgress,
    clearHistory
  };
};
