
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, User } from "lucide-react";
import { toast } from "sonner";

// Sample meal plan data structure
interface MealItem {
  id: string;
  name: string;
  description: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  image?: string;
}

interface MealPlan {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  calories: number;
  duration: number;
  image: string;
  meals: MealItem[];
}

// Sample meal plans data (will be filtered based on route param)
const mealPlans = [
  {
    id: "1",
    title: "High Protein Meal Plan",
    category: "Muscle Building",
    difficulty: "Intermediate",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVhbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    description: "Perfect for those looking to build lean muscle mass with high-protein meals.",
    calories: 2500,
    duration: 7,
    meals: [
      { id: "1", name: "Breakfast", description: "Protein smoothie with oats", calories: 450, protein: 35, carbs: 40, fat: 12, image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" },
      { id: "2", name: "Lunch", description: "Grilled chicken salad with quinoa", calories: 650, protein: 45, carbs: 50, fat: 20, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" },
      { id: "3", name: "Snack", description: "Greek yogurt with berries", calories: 250, protein: 20, carbs: 15, fat: 8, image: "https://images.unsplash.com/photo-1488477304112-4944851de03d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" },
      { id: "4", name: "Dinner", description: "Salmon with steamed vegetables", calories: 750, protein: 50, carbs: 30, fat: 40, image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" },
      { id: "5", name: "Night Snack", description: "Protein shake with almond milk", calories: 400, protein: 30, carbs: 10, fat: 15, image: "https://images.unsplash.com/photo-1579722821273-0f6c1ddde163?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" }
    ]
  },
  {
    id: "2",
    title: "Low Carb Diet",
    category: "Weight Loss",
    difficulty: "Beginner",
    image: "https://images.unsplash.com/photo-1560684352-8497838a2229?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVhbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    description: "Designed for effective weight loss by reducing carbohydrate intake.",
    calories: 1800,
    duration: 14,
    meals: [
      { id: "1", name: "Breakfast", description: "Avocado and eggs", calories: 350, protein: 20, carbs: 10, fat: 25, image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" },
      { id: "2", name: "Lunch", description: "Tuna salad with olive oil", calories: 500, protein: 35, carbs: 15, fat: 30, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" },
      { id: "3", name: "Snack", description: "Almonds and cheese", calories: 200, protein: 10, carbs: 5, fat: 15, image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" },
      { id: "4", name: "Dinner", description: "Grilled steak with vegetables", calories: 600, protein: 40, carbs: 20, fat: 35, image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" },
      { id: "5", name: "Night Snack", description: "Cottage cheese with berries", calories: 150, protein: 15, carbs: 10, fat: 5, image: "https://images.unsplash.com/photo-1488477304112-4944851de03d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" }
    ]
  },
  {
    id: "3",
    title: "Plant-Based Plan",
    category: "Vegan",
    difficulty: "Intermediate",
    image: "https://images.unsplash.com/photo-1546548970-71785318a17b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGhlYWx0aHklMjBtZWFsfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    description: "Nutrient-rich vegan meal plan focused on whole foods and plant protein.",
    calories: 2000,
    duration: 7,
    meals: [
      { id: "1", name: "Breakfast", description: "Tofu scramble with vegetables", calories: 380, protein: 25, carbs: 30, fat: 18, image: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" },
      { id: "2", name: "Lunch", description: "Quinoa bowl with roasted vegetables", calories: 550, protein: 20, carbs: 70, fat: 15, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" },
      { id: "3", name: "Snack", description: "Hummus with carrot sticks", calories: 220, protein: 8, carbs: 25, fat: 10, image: "https://images.unsplash.com/photo-1604413191066-4dd20bedf486?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" },
      { id: "4", name: "Dinner", description: "Lentil curry with brown rice", calories: 650, protein: 25, carbs: 90, fat: 12, image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" },
      { id: "5", name: "Night Snack", description: "Mixed nuts and dried fruits", calories: 200, protein: 6, carbs: 20, fat: 14, image: "https://images.unsplash.com/photo-1599598177991-ec67b5c37318?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" }
    ]
  },
  {
    id: "4",
    title: "Athletic Performance",
    category: "Sports Nutrition",
    difficulty: "Advanced",
    image: "https://images.unsplash.com/photo-1547496502-affa22d38842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhlYWx0aHklMjBtZWFsfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    description: "Optimized for athletes with complex carbs and protein for performance and recovery.",
    calories: 3000,
    duration: 14,
    meals: [
      { id: "1", name: "Breakfast", description: "Oatmeal with banana and protein powder", calories: 550, protein: 35, carbs: 80, fat: 10, image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" },
      { id: "2", name: "Lunch", description: "Whole grain pasta with chicken", calories: 800, protein: 50, carbs: 100, fat: 15, image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" },
      { id: "3", name: "Snack", description: "Protein bar and fruit", calories: 300, protein: 20, carbs: 30, fat: 10, image: "https://images.unsplash.com/photo-1471943311424-646960669fbc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" },
      { id: "4", name: "Dinner", description: "Sweet potato with turkey and vegetables", calories: 750, protein: 45, carbs: 80, fat: 20, image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" },
      { id: "5", name: "Night Snack", description: "Casein protein shake with peanut butter", calories: 400, protein: 35, carbs: 15, fat: 18, image: "https://images.unsplash.com/photo-1579722821273-0f6c1ddde163?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" }
    ]
  }
];

const MealPlanDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to fetch meal plan by ID
    setIsLoading(true);
    setTimeout(() => {
      const plan = mealPlans.find(plan => plan.id === id);
      if (plan) {
        setMealPlan(plan);
      }
      setIsLoading(false);
    }, 500);
  }, [id]);
  
  const handleSavePlan = () => {
    toast.success("Meal plan saved to your profile!");
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!mealPlan) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Meal Plan Not Found</h2>
          <p className="mb-8">The meal plan you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/nutrition")}>
            Back to Nutrition
          </Button>
        </div>
      </Layout>
    );
  }
  
  const totalMacros = mealPlan.meals.reduce(
    (acc, meal) => {
      acc.protein += meal.protein || 0;
      acc.carbs += meal.carbs || 0;
      acc.fat += meal.fat || 0;
      return acc;
    }, 
    { protein: 0, carbs: 0, fat: 0 }
  );

  return (
    <Layout>
      {/* Hero Section with Meal Plan Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={mealPlan.image} 
            alt={mealPlan.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container">
            <div className="flex items-center mb-2">
              <Badge variant="secondary" className="mr-2">{mealPlan.category}</Badge>
              <Badge>{mealPlan.difficulty}</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{mealPlan.title}</h1>
            <div className="flex flex-wrap gap-4 text-white/90 text-sm">
              <div className="flex items-center">
                <CalendarDays className="mr-1 h-4 w-4" />
                <span>{mealPlan.duration} days</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                <span>{mealPlan.meals.length} meals per day</span>
              </div>
              <div className="flex items-center">
                <User className="mr-1 h-4 w-4" />
                <span>{mealPlan.calories} calories</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container pt-8 pb-16">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="meals">Daily Meals</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition Info</TabsTrigger>
            </TabsList>
            <Button onClick={handleSavePlan}>Save Plan</Button>
          </div>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">About this Plan</h2>
              <p className="text-lg">{mealPlan.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">Daily Calories</h3>
                    <div className="text-3xl font-bold text-primary">{mealPlan.calories}</div>
                    <p className="text-muted-foreground text-sm mt-1">calories per day</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">Duration</h3>
                    <div className="text-3xl font-bold text-primary">{mealPlan.duration}</div>
                    <p className="text-muted-foreground text-sm mt-1">days</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">Meals Per Day</h3>
                    <div className="text-3xl font-bold text-primary">{mealPlan.meals.length}</div>
                    <p className="text-muted-foreground text-sm mt-1">balanced meals</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">What You'll Need</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Basic kitchen equipment (pots, pans, knives)</li>
                  <li>Food storage containers for meal prep</li>
                  <li>Blender for smoothies and protein shakes</li>
                  <li>Food scale for precise measurements</li>
                  <li>Approximately 2-3 hours for weekly meal prep</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          {/* Meals Tab */}
          <TabsContent value="meals" className="space-y-6">
            <div className="space-y-8">
              <h2 className="text-2xl font-bold">Daily Meal Plan</h2>
              {mealPlan.meals.map((meal) => (
                <Card key={meal.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 h-48 md:h-auto">
                      {meal.image && (
                        <img 
                          src={meal.image} 
                          alt={meal.name} 
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <CardContent className="md:w-3/4 p-6">
                      <div className="flex flex-col md:flex-row justify-between mb-2">
                        <h3 className="text-xl font-bold">{meal.name}</h3>
                        <div className="text-primary font-medium">{meal.calories} calories</div>
                      </div>
                      <p className="text-muted-foreground mb-4">{meal.description}</p>
                      
                      <div className="flex flex-wrap gap-6">
                        {meal.protein && (
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Protein</div>
                            <div className="font-semibold">{meal.protein}g</div>
                          </div>
                        )}
                        {meal.carbs && (
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Carbs</div>
                            <div className="font-semibold">{meal.carbs}g</div>
                          </div>
                        )}
                        {meal.fat && (
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Fat</div>
                            <div className="font-semibold">{meal.fat}g</div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Nutrition Tab */}
          <TabsContent value="nutrition" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Nutrition Information</h2>
              <p className="mb-8">
                This meal plan provides a balanced distribution of macronutrients to support your fitness goals.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-4">Daily Protein</h3>
                    <div className="text-3xl font-bold text-primary">{Math.round(totalMacros.protein)}g</div>
                    <Progress value={totalMacros.protein / (totalMacros.protein + totalMacros.carbs + totalMacros.fat) * 100} className="h-2 mt-2" />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-4">Daily Carbohydrates</h3>
                    <div className="text-3xl font-bold text-primary">{Math.round(totalMacros.carbs)}g</div>
                    <Progress value={totalMacros.carbs / (totalMacros.protein + totalMacros.carbs + totalMacros.fat) * 100} className="h-2 mt-2" />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-4">Daily Fat</h3>
                    <div className="text-3xl font-bold text-primary">{Math.round(totalMacros.fat)}g</div>
                    <Progress value={totalMacros.fat / (totalMacros.protein + totalMacros.carbs + totalMacros.fat) * 100} className="h-2 mt-2" />
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mt-8">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Macronutrient Distribution</h3>
                  <div className="flex justify-around text-center">
                    <div>
                      <div className="text-lg font-bold text-primary">
                        {Math.round(totalMacros.protein * 4 / mealPlan.calories * 100)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Protein</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-primary">
                        {Math.round(totalMacros.carbs * 4 / mealPlan.calories * 100)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Carbs</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-primary">
                        {Math.round(totalMacros.fat * 9 / mealPlan.calories * 100)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Fat</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MealPlanDetail;
