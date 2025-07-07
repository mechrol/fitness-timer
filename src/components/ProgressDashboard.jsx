import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Trophy, 
  Flame, 
  Clock, 
  Target, 
  TrendingUp,
  Award,
  Zap
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';

const ProgressDashboard = ({ stats, weeklyProgress }) => {
  const achievements = [
    { 
      id: 1, 
      title: 'First Workout', 
      description: 'Complete your first workout session',
      icon: Target,
      unlocked: stats.totalWorkouts > 0,
      color: 'from-green-500 to-emerald-600'
    },
    { 
      id: 2, 
      title: 'Consistency King', 
      description: 'Complete 7 workouts',
      icon: Calendar,
      unlocked: stats.totalWorkouts >= 7,
      color: 'from-blue-500 to-cyan-600'
    },
    { 
      id: 3, 
      title: 'Calorie Crusher', 
      description: 'Burn 1000+ calories total',
      icon: Flame,
      unlocked: stats.totalCalories >= 1000,
      color: 'from-red-500 to-orange-600'
    },
    { 
      id: 4, 
      title: 'Time Master', 
      description: 'Complete 10+ hours of workouts',
      icon: Clock,
      unlocked: stats.totalMinutes >= 600,
      color: 'from-purple-500 to-pink-600'
    },
    { 
      id: 5, 
      title: 'Workout Warrior', 
      description: 'Complete 20 workouts',
      icon: Trophy,
      unlocked: stats.totalWorkouts >= 20,
      color: 'from-yellow-500 to-amber-600'
    },
    { 
      id: 6, 
      title: 'Lightning Fast', 
      description: 'Complete 50 exercises',
      icon: Zap,
      unlocked: stats.totalExercises >= 50,
      color: 'from-indigo-500 to-purple-600'
    }
  ];

  const StatCard = ({ icon: Icon, title, value, subtitle, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <TrendingUp className="w-5 h-5 text-green-400" />
      </div>
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-white">{value}</h3>
        <p className="text-white/80 font-medium">{title}</p>
        {subtitle && <p className="text-white/60 text-sm">{subtitle}</p>}
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6 h-full overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-white mb-2">Your Progress</h2>
        <p className="text-white/70">Track your fitness journey and achievements</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={Trophy}
          title="Workouts"
          value={stats.totalWorkouts}
          subtitle="Sessions completed"
          color="from-blue-500 to-purple-600"
        />
        <StatCard
          icon={Flame}
          title="Calories"
          value={stats.totalCalories}
          subtitle="Total burned"
          color="from-red-500 to-orange-600"
        />
        <StatCard
          icon={Clock}
          title="Minutes"
          value={stats.totalMinutes}
          subtitle="Time exercising"
          color="from-green-500 to-emerald-600"
        />
        <StatCard
          icon={Target}
          title="Exercises"
          value={stats.totalExercises}
          subtitle="Completed"
          color="from-purple-500 to-pink-600"
        />
      </div>

      {/* Weekly Progress Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4">Weekly Activity</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyProgress}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
              />
              <Bar 
                dataKey="workouts" 
                fill="url(#barGradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`glass-dark rounded-xl p-4 ${
                  achievement.unlocked ? 'ring-2 ring-green-500/50' : 'opacity-60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${achievement.color} flex items-center justify-center ${
                    !achievement.unlocked ? 'grayscale' : ''
                  }`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-white">{achievement.title}</h4>
                      {achievement.unlocked && (
                        <Award className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                    <p className="text-white/70 text-sm">{achievement.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Recent Activity */}
      {stats.recentWorkouts && stats.recentWorkouts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Recent Workouts</h3>
          <div className="space-y-3">
            {stats.recentWorkouts.slice(0, 5).map((workout, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-dark rounded-xl p-3 flex items-center justify-between"
              >
                <div>
                  <h4 className="font-medium text-white">{workout.workoutName}</h4>
                  <p className="text-white/60 text-sm">
                    {new Date(workout.date).toLocaleDateString()} • {Math.round(workout.duration / 60)} min
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-purple-300 font-medium">{workout.caloriesBurned} cal</p>
                  <p className="text-white/60 text-sm">{workout.exercisesCompleted} exercises</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProgressDashboard;
