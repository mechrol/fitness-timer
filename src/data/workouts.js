export const workoutPresets = [
  {
    id: 'hiit-beginner',
    name: 'HIIT for Beginners',
    description: 'High-intensity interval training perfect for getting started',
    difficulty: 'Beginner',
    exercises: [
      {
        name: 'Jumping Jacks',
        type: 'Cardio',
        duration: 30,
        rest: 15,
        instruction: 'Jump while spreading legs and raising arms overhead, then return to starting position'
      },
      {
        name: 'Bodyweight Squats',
        type: 'Strength',
        duration: 30,
        rest: 15,
        instruction: 'Lower your body by bending knees, keep chest up and weight on heels'
      },
      {
        name: 'Push-ups (Modified)',
        type: 'Strength',
        duration: 30,
        rest: 15,
        instruction: 'Start on knees, lower chest to ground and push back up'
      },
      {
        name: 'High Knees',
        type: 'Cardio',
        duration: 30,
        rest: 15,
        instruction: 'Run in place bringing knees up to waist level'
      },
      {
        name: 'Plank Hold',
        type: 'Strength',
        duration: 20,
        rest: 20,
        instruction: 'Hold a straight line from head to heels, engage your core'
      },
      {
        name: 'Butt Kicks',
        type: 'Cardio',
        duration: 30,
        rest: 15,
        instruction: 'Run in place kicking heels up towards your glutes'
      },
      {
        name: 'Wall Sit',
        type: 'Strength',
        duration: 25,
        rest: 15,
        instruction: 'Slide down wall until thighs are parallel to floor, hold position'
      },
      {
        name: 'Mountain Climbers',
        type: 'Cardio',
        duration: 30,
        rest: 30,
        instruction: 'In plank position, alternate bringing knees to chest quickly'
      }
    ]
  },
  {
    id: 'tabata-intense',
    name: 'Tabata Intensity',
    description: '4-minute high-intensity Tabata protocol for maximum results',
    difficulty: 'Advanced',
    exercises: [
      {
        name: 'Burpees',
        type: 'HIIT',
        duration: 20,
        rest: 10,
        instruction: 'Drop to squat, jump back to plank, do push-up, jump forward, jump up'
      },
      {
        name: 'Jump Squats',
        type: 'HIIT',
        duration: 20,
        rest: 10,
        instruction: 'Squat down then explode up jumping as high as possible'
      },
      {
        name: 'Burpees',
        type: 'HIIT',
        duration: 20,
        rest: 10,
        instruction: 'Drop to squat, jump back to plank, do push-up, jump forward, jump up'
      },
      {
        name: 'Jump Squats',
        type: 'HIIT',
        duration: 20,
        rest: 10,
        instruction: 'Squat down then explode up jumping as high as possible'
      },
      {
        name: 'Burpees',
        type: 'HIIT',
        duration: 20,
        rest: 10,
        instruction: 'Drop to squat, jump back to plank, do push-up, jump forward, jump up'
      },
      {
        name: 'Jump Squats',
        type: 'HIIT',
        duration: 20,
        rest: 10,
        instruction: 'Squat down then explode up jumping as high as possible'
      },
      {
        name: 'Burpees',
        type: 'HIIT',
        duration: 20,
        rest: 10,
        instruction: 'Drop to squat, jump back to plank, do push-up, jump forward, jump up'
      },
      {
        name: 'Jump Squats',
        type: 'HIIT',
        duration: 20,
        rest: 60,
        instruction: 'Squat down then explode up jumping as high as possible'
      }
    ]
  },
  {
    id: 'strength-circuit',
    name: 'Strength Circuit',
    description: 'Build muscle and strength with this comprehensive circuit',
    difficulty: 'Intermediate',
    exercises: [
      {
        name: 'Push-ups',
        type: 'Strength',
        duration: 45,
        rest: 15,
        instruction: 'Lower chest to ground, push back up maintaining straight body line'
      },
      {
        name: 'Squats',
        type: 'Strength',
        duration: 45,
        rest: 15,
        instruction: 'Lower until thighs parallel to floor, drive through heels to stand'
      },
      {
        name: 'Pike Push-ups',
        type: 'Strength',
        duration: 30,
        rest: 20,
        instruction: 'In downward dog position, lower head towards hands, push back up'
      },
      {
        name: 'Lunges',
        type: 'Strength',
        duration: 45,
        rest: 15,
        instruction: 'Step forward, lower back knee towards ground, alternate legs'
      },
      {
        name: 'Tricep Dips',
        type: 'Strength',
        duration: 30,
        rest: 20,
        instruction: 'Using chair or bench, lower body by bending arms, push back up'
      },
      {
        name: 'Single-leg Glute Bridges',
        type: 'Strength',
        duration: 30,
        rest: 15,
        instruction: 'Lie on back, lift one leg, bridge up with other leg, alternate'
      },
      {
        name: 'Plank to Downward Dog',
        type: 'Strength',
        duration: 40,
        rest: 20,
        instruction: 'From plank, lift hips up to downward dog, return to plank'
      },
      {
        name: 'Calf Raises',
        type: 'Strength',
        duration: 45,
        rest: 30,
        instruction: 'Rise up on toes, hold briefly, lower slowly with control'
      }
    ]
  },
  {
    id: 'cardio-blast',
    name: 'Cardio Blast',
    description: 'Get your heart pumping with this energizing cardio workout',
    difficulty: 'Intermediate',
    exercises: [
      {
        name: 'Jumping Jacks',
        type: 'Cardio',
        duration: 40,
        rest: 20,
        instruction: 'Jump spreading legs while raising arms, return to start'
      },
      {
        name: 'High Knees',
        type: 'Cardio',
        duration: 30,
        rest: 15,
        instruction: 'Run in place bringing knees up high and fast'
      },
      {
        name: 'Butt Kicks',
        type: 'Cardio',
        duration: 30,
        rest: 15,
        instruction: 'Run in place kicking heels up to glutes'
      },
      {
        name: 'Star Jumps',
        type: 'Cardio',
        duration: 35,
        rest: 15,
        instruction: 'Jump spreading arms and legs wide, land softly'
      },
      {
        name: 'Speed Skaters',
        type: 'Cardio',
        duration: 40,
        rest: 20,
        instruction: 'Leap side to side like a speed skater, swing arms'
      },
      {
        name: 'Boxer Shuffle',
        type: 'Cardio',
        duration: 30,
        rest: 15,
        instruction: 'Quick feet shuffle while throwing light punches'
      },
      {
        name: 'Jump Rope (Imaginary)',
        type: 'Cardio',
        duration: 45,
        rest: 15,
        instruction: 'Jump as if using a rope, stay light on feet'
      },
      {
        name: 'Cross Country Skiers',
        type: 'Cardio',
        duration: 40,
        rest: 30,
        instruction: 'Jump switching legs forward/back while swinging arms'
      }
    ]
  },
  {
    id: 'flexibility-flow',
    name: 'Flexibility Flow',
    description: 'Improve flexibility and mobility with gentle stretching',
    difficulty: 'Beginner',
    exercises: [
      {
        name: 'Cat-Cow Stretch',
        type: 'Flexibility',
        duration: 45,
        rest: 10,
        instruction: 'On hands and knees, arch and round your back slowly'
      },
      {
        name: 'Child\'s Pose',
        type: 'Flexibility',
        duration: 30,
        rest: 10,
        instruction: 'Sit back on heels, stretch arms forward, relax'
      },
      {
        name: 'Downward Dog',
        type: 'Flexibility',
        duration: 40,
        rest: 15,
        instruction: 'Hands and feet on ground, lift hips up, stretch calves'
      },
      {
        name: 'Hip Circles',
        type: 'Flexibility',
        duration: 30,
        rest: 10,
        instruction: 'Hands on hips, make large circles with your hips'
      },
      {
        name: 'Arm Circles',
        type: 'Flexibility',
        duration: 30,
        rest: 10,
        instruction: 'Extend arms, make small then large circles'
      },
      {
        name: 'Seated Spinal Twist',
        type: 'Flexibility',
        duration: 30,
        rest: 10,
        instruction: 'Sit cross-legged, twist gently to each side'
      },
      {
        name: 'Standing Forward Fold',
        type: 'Flexibility',
        duration: 35,
        rest: 15,
        instruction: 'Bend forward from hips, let arms hang, sway gently'
      },
      {
        name: 'Shoulder Rolls',
        type: 'Flexibility',
        duration: 30,
        rest: 20,
        instruction: 'Roll shoulders backward in large, slow circles'
      }
    ]
  },
  {
    id: 'core-crusher',
    name: 'Core Crusher',
    description: 'Strengthen your core with targeted abdominal exercises',
    difficulty: 'Intermediate',
    exercises: [
      {
        name: 'Plank Hold',
        type: 'Strength',
        duration: 45,
        rest: 15,
        instruction: 'Hold straight line from head to heels, engage core'
      },
      {
        name: 'Bicycle Crunches',
        type: 'Strength',
        duration: 40,
        rest: 20,
        instruction: 'Alternate bringing elbow to opposite knee'
      },
      {
        name: 'Russian Twists',
        type: 'Strength',
        duration: 35,
        rest: 15,
        instruction: 'Sit with feet up, twist torso side to side'
      },
      {
        name: 'Dead Bug',
        type: 'Strength',
        duration: 40,
        rest: 20,
        instruction: 'Lie on back, extend opposite arm and leg slowly'
      },
      {
        name: 'Side Plank (Right)',
        type: 'Strength',
        duration: 25,
        rest: 10,
        instruction: 'Hold side plank on right side, keep body straight'
      },
      {
        name: 'Side Plank (Left)',
        type: 'Strength',
        duration: 25,
        rest: 15,
        instruction: 'Hold side plank on left side, keep body straight'
      },
      {
        name: 'Mountain Climbers',
        type: 'Strength',
        duration: 35,
        rest: 15,
        instruction: 'In plank, alternate bringing knees to chest quickly'
      },
      {
        name: 'Hollow Body Hold',
        type: 'Strength',
        duration: 30,
        rest: 30,
        instruction: 'Lie on back, lift shoulders and legs, hold hollow position'
      }
    ]
  }
];
