
export interface Challenge {
  id: string;
  title: string;
  description: string;
  duration: number;
  participants: number;
  daysRemaining: number;
  prize: string;
  image: string;
  progress?: number;
}

export const challenges: Challenge[] = [
  {
    id: "c1",
    title: "30-Day Push-up Challenge",
    description: "Complete 100 push-ups every day for 30 days to build upper body strength.",
    duration: 30,
    participants: 1245,
    daysRemaining: 18,
    prize: "Exclusive Badge & Leaderboard Recognition",
    image: "/placeholder.svg",
    progress: 40
  },
  {
    id: "c2",
    title: "10K Steps Daily",
    description: "Walk at least 10,000 steps every day for two weeks to improve cardiovascular health.",
    duration: 14,
    participants: 3578,
    daysRemaining: 7,
    prize: "Premium Workout Plan Access",
    image: "/placeholder.svg",
    progress: 50
  },
  {
    id: "c3",
    title: "Weight Loss Challenge",
    description: "Lose 5% of your body weight in 8 weeks through consistent exercise and nutrition.",
    duration: 56,
    participants: 876,
    daysRemaining: 32,
    prize: "$100 Gift Card & 3 Months Premium",
    image: "/placeholder.svg",
    progress: 43
  },
  {
    id: "c4",
    title: "Hydration Challenge",
    description: "Drink 3 liters of water daily for 21 days to improve overall health and energy levels.",
    duration: 21,
    participants: 2134,
    daysRemaining: 14,
    prize: "Wellness Package & Digital Badge",
    image: "/placeholder.svg",
    progress: 33
  }
];
