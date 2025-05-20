
export interface UserStats {
  streakDays: number;
  workoutsCompleted: number;
  caloriesBurned: number;
  hoursActive: number;
  personalBests: PersonalBest[];
  weeklyActivity: WeeklyActivity[];
  monthlyProgress: MonthlyProgress;
}

export interface PersonalBest {
  id: string;
  exercise: string;
  value: number;
  unit: string;
  date: string;
}

export interface WeeklyActivity {
  day: string;
  minutes: number;
  calories: number;
}

export interface MonthlyProgress {
  startWeight: number;
  currentWeight: number;
  targetWeight: number;
  workoutsPlanned: number;
  workoutsCompleted: number;
}

export const userStats: UserStats = {
  streakDays: 12,
  workoutsCompleted: 34,
  caloriesBurned: 12450,
  hoursActive: 28,
  personalBests: [
    {
      id: "pb1",
      exercise: "Bench Press",
      value: 90,
      unit: "kg",
      date: "2025-03-15"
    },
    {
      id: "pb2",
      exercise: "5K Run",
      value: 23.5,
      unit: "minutes",
      date: "2025-04-02"
    },
    {
      id: "pb3",
      exercise: "Plank",
      value: 3.5,
      unit: "minutes",
      date: "2025-03-28"
    }
  ],
  weeklyActivity: [
    {
      day: "Mon",
      minutes: 45,
      calories: 320
    },
    {
      day: "Tue",
      minutes: 30,
      calories: 250
    },
    {
      day: "Wed",
      minutes: 60,
      calories: 450
    },
    {
      day: "Thu",
      minutes: 0,
      calories: 0
    },
    {
      day: "Fri",
      minutes: 45,
      calories: 350
    },
    {
      day: "Sat",
      minutes: 90,
      calories: 680
    },
    {
      day: "Sun",
      minutes: 30,
      calories: 220
    }
  ],
  monthlyProgress: {
    startWeight: 78,
    currentWeight: 75.5,
    targetWeight: 72,
    workoutsPlanned: 20,
    workoutsCompleted: 16
  }
};
