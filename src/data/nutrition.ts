
export interface MealPlan {
  id: string;
  title: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  image: string;
  meals: Meal[];
}

export interface Meal {
  id: string;
  name: string;
  type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  recipe?: string;
  image?: string;
}

export const mealPlans: MealPlan[] = [
  {
    id: "mp1",
    title: "Weight Loss Plan",
    description: "A balanced, calorie-controlled meal plan designed to support healthy weight loss.",
    calories: 1800,
    protein: 120,
    carbs: 180,
    fat: 60,
    image: "/placeholder.svg",
    meals: [
      {
        id: "m1",
        name: "Greek Yogurt with Berries",
        type: "Breakfast",
        calories: 280,
        protein: 20,
        carbs: 30,
        fat: 8,
        image: "/placeholder.svg"
      },
      {
        id: "m2",
        name: "Grilled Chicken Salad",
        type: "Lunch",
        calories: 420,
        protein: 35,
        carbs: 25,
        fat: 18,
        image: "/placeholder.svg"
      },
      {
        id: "m3",
        name: "Salmon with Roasted Vegetables",
        type: "Dinner",
        calories: 520,
        protein: 40,
        carbs: 30,
        fat: 22,
        image: "/placeholder.svg"
      },
      {
        id: "m4",
        name: "Protein Smoothie",
        type: "Snack",
        calories: 200,
        protein: 15,
        carbs: 20,
        fat: 3,
        image: "/placeholder.svg"
      }
    ]
  },
  {
    id: "mp2",
    title: "Muscle Building Plan",
    description: "High-protein meal plan designed to support muscle growth and recovery.",
    calories: 2800,
    protein: 200,
    carbs: 300,
    fat: 80,
    image: "/placeholder.svg",
    meals: [
      {
        id: "m5",
        name: "Protein Oatmeal with Banana",
        type: "Breakfast",
        calories: 450,
        protein: 30,
        carbs: 60,
        fat: 10,
        image: "/placeholder.svg"
      },
      {
        id: "m6",
        name: "Turkey & Avocado Wrap",
        type: "Lunch",
        calories: 580,
        protein: 40,
        carbs: 45,
        fat: 25,
        image: "/placeholder.svg"
      },
      {
        id: "m7",
        name: "Steak with Sweet Potato",
        type: "Dinner",
        calories: 680,
        protein: 50,
        carbs: 50,
        fat: 30,
        image: "/placeholder.svg"
      },
      {
        id: "m8",
        name: "Protein Shake with Almonds",
        type: "Snack",
        calories: 350,
        protein: 30,
        carbs: 20,
        fat: 15,
        image: "/placeholder.svg"
      }
    ]
  },
  {
    id: "mp3",
    title: "Vegan Plan",
    description: "Plant-based meal plan rich in protein and nutrients for vegan fitness enthusiasts.",
    calories: 2200,
    protein: 100,
    carbs: 280,
    fat: 70,
    image: "/placeholder.svg",
    meals: [
      {
        id: "m9",
        name: "Tofu Scramble with Vegetables",
        type: "Breakfast",
        calories: 380,
        protein: 22,
        carbs: 35,
        fat: 15,
        image: "/placeholder.svg"
      },
      {
        id: "m10",
        name: "Quinoa Bowl with Chickpeas",
        type: "Lunch",
        calories: 520,
        protein: 25,
        carbs: 70,
        fat: 18,
        image: "/placeholder.svg"
      },
      {
        id: "m11",
        name: "Lentil Pasta with Vegetables",
        type: "Dinner",
        calories: 580,
        protein: 30,
        carbs: 80,
        fat: 15,
        image: "/placeholder.svg"
      },
      {
        id: "m12",
        name: "Almond Butter with Apple",
        type: "Snack",
        calories: 280,
        protein: 8,
        carbs: 30,
        fat: 15,
        image: "/placeholder.svg"
      }
    ]
  }
];
