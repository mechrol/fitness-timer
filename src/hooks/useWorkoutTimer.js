import { useState, useEffect, useRef, useCallback } from 'react';

export const useWorkoutTimer = (workout) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(workout.exercises[0]?.duration || 0);
  const [isRunning, setIsRunning] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  const currentExercise = workout.exercises[currentExerciseIndex];
  const totalTime = isResting ? currentExercise?.rest || 0 : currentExercise?.duration || 0;
  const progress = totalTime > 0 ? (totalTime - timeLeft) / totalTime : 0;

  const reset = useCallback(() => {
    setCurrentExerciseIndex(0);
    setTimeLeft(workout.exercises[0]?.duration || 0);
    setIsRunning(false);
    setIsResting(false);
    setIsCompleted(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [workout]);

  const start = useCallback(() => {
    setIsRunning(true);
    startTimeRef.current = Date.now();
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const skip = useCallback(() => {
    if (isResting) {
      // Skip rest, move to next exercise
      if (currentExerciseIndex < workout.exercises.length - 1) {
        setCurrentExerciseIndex(prev => prev + 1);
        setTimeLeft(workout.exercises[currentExerciseIndex + 1]?.duration || 0);
        setIsResting(false);
      } else {
        setIsCompleted(true);
        setIsRunning(false);
      }
    } else {
      // Skip exercise, move to rest
      if (currentExercise?.rest > 0) {
        setTimeLeft(currentExercise.rest);
        setIsResting(true);
      } else {
        // No rest, move to next exercise
        if (currentExerciseIndex < workout.exercises.length - 1) {
          setCurrentExerciseIndex(prev => prev + 1);
          setTimeLeft(workout.exercises[currentExerciseIndex + 1]?.duration || 0);
        } else {
          setIsCompleted(true);
          setIsRunning(false);
        }
      }
    }
  }, [isResting, currentExerciseIndex, workout.exercises, currentExercise]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Time's up for current phase
            if (isResting) {
              // Rest is over, move to next exercise
              if (currentExerciseIndex < workout.exercises.length - 1) {
                setCurrentExerciseIndex(prevIndex => prevIndex + 1);
                setIsResting(false);
                return workout.exercises[currentExerciseIndex + 1]?.duration || 0;
              } else {
                // Workout completed
                setIsCompleted(true);
                setIsRunning(false);
                return 0;
              }
            } else {
              // Exercise is over, move to rest
              if (currentExercise?.rest > 0) {
                setIsResting(true);
                return currentExercise.rest;
              } else {
                // No rest, move to next exercise
                if (currentExerciseIndex < workout.exercises.length - 1) {
                  setCurrentExerciseIndex(prevIndex => prevIndex + 1);
                  return workout.exercises[currentExerciseIndex + 1]?.duration || 0;
                } else {
                  // Workout completed
                  setIsCompleted(true);
                  setIsRunning(false);
                  return 0;
                }
              }
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, isResting, currentExerciseIndex, workout.exercises, currentExercise]);

  // Reset when workout changes
  useEffect(() => {
    reset();
  }, [workout, reset]);

  return {
    currentExerciseIndex,
    timeLeft,
    isRunning,
    isResting,
    isCompleted,
    progress,
    start,
    pause,
    reset,
    skip
  };
};
