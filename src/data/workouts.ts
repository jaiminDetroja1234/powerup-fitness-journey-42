
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
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    exercises: [
      {
        id: "e1",
        name: "Push-ups",
        sets: 3,
        reps: 15,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        instructions: "Keep your body straight, lower yourself until your chest nearly touches the floor, then push back up."
      },
      {
        id: "e2",
        name: "Squats",
        sets: 3,
        reps: 20,
        image: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        instructions: "Stand with feet shoulder-width apart, lower your body as if sitting in a chair, then return to standing."
      },
      {
        id: "e3",
        name: "Lunges",
        sets: 3,
        reps: 12,
        image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        instructions: "Step forward with one leg, lowering your hips until both knees are bent at about a 90-degree angle."
      },
      {
        id: "e4",
        name: "Plank",
        sets: 3,
        reps: 1,
        duration: 60,
        image: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1517130038641-a774d04afb3c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    exercises: [
      {
        id: "e5",
        name: "Jumping Jacks",
        sets: 4,
        reps: 20,
        duration: 45,
        image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        instructions: "Jump while raising arms and separating legs to sides, then return to standing."
      },
      {
        id: "e6",
        name: "Burpees",
        sets: 4,
        reps: 10,
        image: "https://images.unsplash.com/photo-1571019613576-2b22c76fd955?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        instructions: "Begin in standing position, move into a squat position, kick feet back, return to squat, then jump up."
      },
      {
        id: "e7",
        name: "Mountain Climbers",
        sets: 4,
        reps: 30,
        duration: 45,
        image: "https://images.unsplash.com/photo-1598971639058-a4806d4bf25c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        instructions: "Start in a plank, drive knees toward chest one at a time in a running motion."
      },
      {
        id: "e8",
        name: "High Knees",
        sets: 4,
        reps: 30,
        duration: 45,
        image: "https://images.unsplash.com/photo-1598266663439-2056e6900339?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    exercises: [
      {
        id: "e9",
        name: "Downward Dog",
        sets: 1,
        reps: 1,
        duration: 60,
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        instructions: "Form an inverted V with your body, hands and feet on the floor, hips raised high."
      },
      {
        id: "e10",
        name: "Warrior Pose",
        sets: 1,
        reps: 1,
        duration: 60,
        image: "https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        instructions: "Lunge forward with one leg, arms extended, back foot at an angle."
      },
      {
        id: "e11",
        name: "Tree Pose",
        sets: 1,
        reps: 1,
        duration: 60,
        image: "https://images.unsplash.com/photo-1508341421810-36b8fc06075b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        instructions: "Stand on one leg, place the sole of other foot on inner thigh, hands in prayer position."
      },
      {
        id: "e12",
        name: "Child's Pose",
        sets: 1,
        reps: 1,
        duration: 60,
        image: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        instructions: "Kneel and sit back on heels, extend arms forward, rest forehead on mat."
      }
    ]
  }
];
