
export interface WorkoutType {
  id: string;
  title: string;
  description: string;
  duration: number;
  calories: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  image: string;
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  duration?: number;
  image?: string;
  video?: string;
  instructions: string;
}

export const workouts: WorkoutType[] = [
  {
    id: "w1",
    title: "Full Body Strength",
    description: "Build overall strength with this full body workout routine designed to target all major muscle groups.",
    duration: 45,
    calories: 350,
    level: "Intermediate",
    category: "Strength",
    image: "/placeholder.svg",
    exercises: [
      {
        id: "e1",
        name: "Push-ups",
        sets: 3,
        reps: 15,
        instructions: "Keep your body straight, lower yourself until your chest nearly touches the floor, then push back up."
      },
      {
        id: "e2",
        name: "Squats",
        sets: 3,
        reps: 20,
        instructions: "Stand with feet shoulder-width apart, lower your body as if sitting in a chair, then return to standing."
      },
      {
        id: "e3",
        name: "Lunges",
        sets: 3,
        reps: 12,
        instructions: "Step forward with one leg, lowering your hips until both knees are bent at about a 90-degree angle."
      },
      {
        id: "e4",
        name: "Plank",
        sets: 3,
        duration: 60,
        instructions: "Hold a push-up position with your body in a straight line from head to heels."
      }
    ]
  },
  {
    id: "w2",
    title: "HIIT Cardio Blast",
    description: "Intensive interval training to boost your metabolism and improve cardiovascular health.",
    duration: 30,
    calories: 400,
    level: "Advanced",
    category: "Cardio",
    image: "/placeholder.svg",
    exercises: [
      {
        id: "e5",
        name: "Jumping Jacks",
        sets: 4,
        duration: 45,
        instructions: "Jump while raising arms and separating legs to sides, then return to standing."
      },
      {
        id: "e6",
        name: "Burpees",
        sets: 4,
        reps: 10,
        instructions: "Begin in standing position, move into a squat position, kick feet back, return to squat, then jump up."
      },
      {
        id: "e7",
        name: "Mountain Climbers",
        sets: 4,
        duration: 45,
        instructions: "Start in a plank, drive knees toward chest one at a time in a running motion."
      },
      {
        id: "e8",
        name: "High Knees",
        sets: 4,
        duration: 45,
        instructions: "Run in place, lifting knees as high as possible with each step."
      }
    ]
  },
  {
    id: "w3",
    title: "Yoga Flow",
    description: "Improve flexibility, balance, and mindfulness with this calming yoga routine.",
    duration: 60,
    calories: 200,
    level: "Beginner",
    category: "Flexibility",
    image: "/placeholder.svg",
    exercises: [
      {
        id: "e9",
        name: "Downward Dog",
        sets: 1,
        duration: 60,
        instructions: "Form an inverted V with your body, hands and feet on the floor, hips raised high."
      },
      {
        id: "e10",
        name: "Warrior Pose",
        sets: 1,
        duration: 60,
        instructions: "Lunge forward with one leg, arms extended, back foot at an angle."
      },
      {
        id: "e11",
        name: "Tree Pose",
        sets: 1,
        duration: 60,
        instructions: "Stand on one leg, place the sole of other foot on inner thigh, hands in prayer position."
      },
      {
        id: "e12",
        name: "Child's Pose",
        sets: 1,
        duration: 60,
        instructions: "Kneel and sit back on heels, extend arms forward, rest forehead on mat."
      }
    ]
  }
];
