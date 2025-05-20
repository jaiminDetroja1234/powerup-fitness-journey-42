
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  height: string;
  weight: string;
  birthdate: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserGoals {
  userId: string;
  targetWeight: string;
  workoutsPerWeek: string;
  fitnessGoal: string;
  dietaryPreference: string;
  updatedAt: string;
}

export interface CustomExercise {
  id: string;
  userId: string;
  name: string;
  description: string;
  sets: number;
  reps: number;
  duration?: number;
  image?: string;
  video?: string;
  instructions: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkoutHistory {
  id: string;
  userId: string;
  workoutId: string;
  title: string;
  duration: number;
  calories: number;
  completed: boolean;
  date: string;
}
