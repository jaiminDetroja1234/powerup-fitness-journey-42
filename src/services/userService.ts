
import { UserProfile, UserGoals, CustomExercise, WorkoutHistory } from "../types/user";
import { toast } from "sonner";

// Helper function to generate unique IDs
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// User Profile Management
export const getUserProfile = (): UserProfile | null => {
  const profileJson = localStorage.getItem('userProfile');
  return profileJson ? JSON.parse(profileJson) : null;
};

export const createUserProfile = (profileData: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>): UserProfile => {
  const timestamp = new Date().toISOString();
  const newProfile: UserProfile = {
    id: generateId(),
    ...profileData,
    createdAt: timestamp,
    updatedAt: timestamp
  };
  
  localStorage.setItem('userProfile', JSON.stringify(newProfile));
  return newProfile;
};

export const updateUserProfile = (profileData: Partial<UserProfile>): UserProfile | null => {
  const currentProfile = getUserProfile();
  if (!currentProfile) return null;
  
  const updatedProfile = {
    ...currentProfile,
    ...profileData,
    updatedAt: new Date().toISOString()
  };
  
  localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
  return updatedProfile;
};

// User Goals Management
export const getUserGoals = (): UserGoals | null => {
  const goalsJson = localStorage.getItem('userGoals');
  return goalsJson ? JSON.parse(goalsJson) : null;
};

export const createUserGoals = (userId: string, goalsData: Omit<UserGoals, 'userId' | 'updatedAt'>): UserGoals => {
  const timestamp = new Date().toISOString();
  const newGoals: UserGoals = {
    userId,
    ...goalsData,
    updatedAt: timestamp
  };
  
  localStorage.setItem('userGoals', JSON.stringify(newGoals));
  return newGoals;
};

export const updateUserGoals = (goalsData: Partial<UserGoals>): UserGoals | null => {
  const currentGoals = getUserGoals();
  if (!currentGoals) return null;
  
  const updatedGoals = {
    ...currentGoals,
    ...goalsData,
    updatedAt: new Date().toISOString()
  };
  
  localStorage.setItem('userGoals', JSON.stringify(updatedGoals));
  return updatedGoals;
};

// Custom Exercises Management
export const getCustomExercises = (): CustomExercise[] => {
  const exercisesJson = localStorage.getItem('customExercises');
  return exercisesJson ? JSON.parse(exercisesJson) : [];
};

export const createCustomExercise = (userId: string, exerciseData: Omit<CustomExercise, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): CustomExercise => {
  const timestamp = new Date().toISOString();
  const newExercise: CustomExercise = {
    id: generateId(),
    userId,
    ...exerciseData,
    createdAt: timestamp,
    updatedAt: timestamp
  };
  
  const exercises = getCustomExercises();
  exercises.push(newExercise);
  
  localStorage.setItem('customExercises', JSON.stringify(exercises));
  toast.success("Exercise created successfully");
  return newExercise;
};

export const updateCustomExercise = (exerciseId: string, exerciseData: Partial<CustomExercise>): CustomExercise | null => {
  const exercises = getCustomExercises();
  const index = exercises.findIndex(ex => ex.id === exerciseId);
  
  if (index === -1) return null;
  
  exercises[index] = {
    ...exercises[index],
    ...exerciseData,
    updatedAt: new Date().toISOString()
  };
  
  localStorage.setItem('customExercises', JSON.stringify(exercises));
  toast.success("Exercise updated successfully");
  return exercises[index];
};

export const deleteCustomExercise = (exerciseId: string): boolean => {
  const exercises = getCustomExercises();
  const filteredExercises = exercises.filter(ex => ex.id !== exerciseId);
  
  if (filteredExercises.length === exercises.length) return false;
  
  localStorage.setItem('customExercises', JSON.stringify(filteredExercises));
  toast.success("Exercise deleted successfully");
  return true;
};

// Workout History Management
export const getWorkoutHistory = (): WorkoutHistory[] => {
  const historyJson = localStorage.getItem('workoutHistory');
  return historyJson ? JSON.parse(historyJson) : [];
};

export const addWorkoutToHistory = (workoutData: Omit<WorkoutHistory, 'id'>): WorkoutHistory => {
  const newWorkoutHistory: WorkoutHistory = {
    id: generateId(),
    ...workoutData
  };
  
  const history = getWorkoutHistory();
  history.push(newWorkoutHistory);
  
  localStorage.setItem('workoutHistory', JSON.stringify(history));
  return newWorkoutHistory;
};

// Authentication Helpers
export const isLoggedIn = (): boolean => {
  return localStorage.getItem('userProfile') !== null;
};

export const getUserId = (): string | null => {
  const profile = getUserProfile();
  return profile ? profile.id : null;
};
