
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
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
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
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
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
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
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
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    progress: 33
  }
];
