
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Dummy data for meal plans
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
      { id: "1", name: "Breakfast", description: "Protein smoothie with oats", calories: 450 },
      { id: "2", name: "Lunch", description: "Grilled chicken salad with quinoa", calories: 650 },
      { id: "3", name: "Snack", description: "Greek yogurt with berries", calories: 250 },
      { id: "4", name: "Dinner", description: "Salmon with steamed vegetables", calories: 750 },
      { id: "5", name: "Night Snack", description: "Protein shake with almond milk", calories: 400 }
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
      { id: "1", name: "Breakfast", description: "Avocado and eggs", calories: 350 },
      { id: "2", name: "Lunch", description: "Tuna salad with olive oil", calories: 500 },
      { id: "3", name: "Snack", description: "Almonds and cheese", calories: 200 },
      { id: "4", name: "Dinner", description: "Grilled steak with vegetables", calories: 600 },
      { id: "5", name: "Night Snack", description: "Cottage cheese with berries", calories: 150 }
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
      { id: "1", name: "Breakfast", description: "Tofu scramble with vegetables", calories: 380 },
      { id: "2", name: "Lunch", description: "Quinoa bowl with roasted vegetables", calories: 550 },
      { id: "3", name: "Snack", description: "Hummus with carrot sticks", calories: 220 },
      { id: "4", name: "Dinner", description: "Lentil curry with brown rice", calories: 650 },
      { id: "5", name: "Night Snack", description: "Mixed nuts and dried fruits", calories: 200 }
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
      { id: "1", name: "Breakfast", description: "Oatmeal with banana and protein powder", calories: 550 },
      { id: "2", name: "Lunch", description: "Whole grain pasta with chicken", calories: 800 },
      { id: "3", name: "Snack", description: "Protein bar and fruit", calories: 300 },
      { id: "4", name: "Dinner", description: "Sweet potato with turkey and vegetables", calories: 750 },
      { id: "5", name: "Night Snack", description: "Casein protein shake with peanut butter", calories: 400 }
    ]
  }
];

// Dummy data for recipes
const recipes = [
  {
    id: 1,
    title: "High-Protein Pancakes",
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1565299543923-37dd37887442?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGFuY2FrZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    calories: 350,
    protein: 30,
    prepTime: 15,
    ingredients: ["Oats", "Egg whites", "Banana", "Protein powder", "Milk"],
    difficulty: "Beginner",
    description: "A delicious stack of protein-packed pancakes perfect for post-workout recovery."
  },
  {
    id: 2,
    title: "Mediterranean Quinoa Bowl",
    category: "Lunch",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aGVhbHRoeSUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    calories: 450,
    protein: 15,
    prepTime: 20,
    ingredients: ["Quinoa", "Cucumbers", "Cherry tomatoes", "Feta cheese", "Olive oil", "Lemon juice"],
    difficulty: "Beginner",
    description: "A nutrient-dense bowl featuring quinoa, fresh vegetables, and Mediterranean flavors."
  },
  {
    id: 3,
    title: "Grilled Chicken & Sweet Potato",
    category: "Dinner",
    image: "https://images.unsplash.com/photo-1599420186946-7b6fb14d211f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpY2tlbiUyMGRpbm5lcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    calories: 520,
    protein: 42,
    prepTime: 30,
    ingredients: ["Chicken breast", "Sweet potato", "Broccoli", "Olive oil", "Herbs and spices"],
    difficulty: "Intermediate",
    description: "A balanced dinner with lean protein, complex carbs, and fiber-rich vegetables."
  },
  {
    id: 4,
    title: "Post-Workout Smoothie",
    category: "Snack",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7d3be3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21vb3RoaWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    calories: 280,
    protein: 25,
    prepTime: 5,
    ingredients: ["Whey protein", "Banana", "Almond milk", "Peanut butter", "Ice"],
    difficulty: "Beginner",
    description: "Quick and easy recovery smoothie that's perfect after an intense workout."
  },
  {
    id: 5,
    title: "Salmon & Roasted Vegetables",
    category: "Dinner",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FsbW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    calories: 480,
    protein: 35,
    prepTime: 25,
    ingredients: ["Salmon fillet", "Asparagus", "Bell peppers", "Lemon", "Herbs", "Olive oil"],
    difficulty: "Intermediate",
    description: "Omega-3 rich salmon paired with colorful roasted vegetables for a nutrient-dense dinner."
  },
  {
    id: 6,
    title: "Vegan Lentil Soup",
    category: "Lunch",
    image: "https://images.unsplash.com/photo-1604152135912-04a022e23696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGVudGlsJTIwc291cHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    calories: 320,
    protein: 18,
    prepTime: 40,
    ingredients: ["Red lentils", "Carrots", "Celery", "Onion", "Vegetable broth", "Spices"],
    difficulty: "Beginner",
    description: "A hearty plant-based soup packed with protein and fiber from lentils and vegetables."
  }
];

const Nutrition = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("meal-plans");

  // Filter meal plans
  const filteredMealPlans = mealPlans.filter(plan => {
    const matchesSearch = plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plan.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || plan.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Filter recipes
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || recipe.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-powerDark text-white py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Personalized Nutrition</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Discover meal plans and recipes tailored to your fitness goals, dietary preferences, and lifestyle.
          </p>
        </div>
      </section>
      
      {/* Tabs & Filters */}
      <section className="py-8 border-b">
        <div className="container">
          <Tabs defaultValue="meal-plans" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <TabsList>
                <TabsTrigger value="meal-plans">Meal Plans</TabsTrigger>
                <TabsTrigger value="recipes">Recipes</TabsTrigger>
                <TabsTrigger value="my-plans">My Plans</TabsTrigger>
              </TabsList>
              
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search..."
                    className="pl-10 w-full md:w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">All Categories</SelectItem>
                      {activeTab === "meal-plans" ? (
                        <>
                          <SelectItem value="Weight Loss">Weight Loss</SelectItem>
                          <SelectItem value="Muscle Building">Muscle Building</SelectItem>
                          <SelectItem value="Vegan">Vegan</SelectItem>
                          <SelectItem value="Sports Nutrition">Sports Nutrition</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="Breakfast">Breakfast</SelectItem>
                          <SelectItem value="Lunch">Lunch</SelectItem>
                          <SelectItem value="Dinner">Dinner</SelectItem>
                          <SelectItem value="Snack">Snack</SelectItem>
                        </>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" onClick={() => {
                  setSearchQuery("");
                  setCategoryFilter("all");
                }}>
                  Reset
                </Button>
              </div>
            </div>
            
            {/* Meal Plans Tab */}
            <TabsContent value="meal-plans" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMealPlans.length > 0 ? (
                  filteredMealPlans.map(plan => (
                    <Card key={plan.id}>
                      <div className="relative h-48 w-full overflow-hidden">
                        <img 
                          src={plan.image} 
                          alt={plan.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 text-xs rounded">
                          {plan.difficulty}
                        </div>
                      </div>
                      <CardContent className="pt-6">
                        <div className="mb-3">
                          <span className="text-xs font-medium bg-secondary/30 px-2 py-1 rounded">
                            {plan.category}
                          </span>
                          <span className="text-xs font-medium bg-secondary/30 px-2 py-1 rounded ml-2">
                            {plan.calories} cal/day
                          </span>
                          <span className="text-xs font-medium bg-secondary/30 px-2 py-1 rounded ml-2">
                            {plan.duration} days
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{plan.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                        <Link to={`/nutrition/meal-plans/${plan.id}`}>
                          <Button className="w-full">View Plan</Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <h3 className="text-xl font-medium mb-2">No meal plans found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or search for something else
                    </p>
                    <Button variant="outline" onClick={() => {
                      setSearchQuery("");
                      setCategoryFilter("all");
                    }}>
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Recipes Tab */}
            <TabsContent value="recipes" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.length > 0 ? (
                  filteredRecipes.map(recipe => (
                    <Card key={recipe.id}>
                      <div className="relative h-48 w-full overflow-hidden">
                        <img 
                          src={recipe.image} 
                          alt={recipe.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 text-xs rounded">
                          {recipe.prepTime} min
                        </div>
                      </div>
                      <CardContent className="pt-6">
                        <div className="mb-3">
                          <span className="text-xs font-medium bg-secondary/30 px-2 py-1 rounded">
                            {recipe.category}
                          </span>
                          <span className="text-xs font-medium bg-secondary/30 px-2 py-1 rounded ml-2">
                            {recipe.calories} cal
                          </span>
                          <span className="text-xs font-medium bg-secondary/30 px-2 py-1 rounded ml-2">
                            {recipe.protein}g protein
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{recipe.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4">{recipe.description}</p>
                        <Button className="w-full">View Recipe</Button>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <h3 className="text-xl font-medium mb-2">No recipes found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or search for something else
                    </p>
                    <Button variant="outline" onClick={() => {
                      setSearchQuery("");
                      setCategoryFilter("all");
                    }}>
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* My Plans Tab */}
            <TabsContent value="my-plans" className="mt-6">
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No Custom Plans Yet</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Create your own personalized meal plan based on your dietary preferences, restrictions, and fitness goals.
                </p>
                <Button>Create Custom Plan</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* AI Nutrition Assistant Banner */}
      <section className="bg-secondary/30 py-12 mt-8">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-3/5">
              <h2 className="text-2xl font-bold mb-4">AI Nutrition Assistant</h2>
              <p className="text-lg mb-6">
                Get personalized meal recommendations, analyze your food intake, and receive nutritional guidance tailored to your fitness goals.
              </p>
              <Button size="lg">Chat with AI Assistant</Button>
            </div>
            <div className="md:w-2/5">
              <img 
                src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhlYWx0aHklMjBmb29kfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" 
                alt="AI Nutrition Assistant"
                className="rounded-lg w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Nutrition;
