
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import WorkoutCard from "@/components/dashboard/WorkoutCard";
import { workouts } from "@/data/workouts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Workouts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [levelFilter, setLevelFilter] = useState<string>("all");

  // Extract unique categories and levels for filters
  const categories = ["all", ...new Set(workouts.map(workout => workout.category))];
  const levels = ["all", "Beginner", "Intermediate", "Advanced"];

  // Filter workouts based on search and filters
  const filteredWorkouts = workouts.filter(workout => {
    const matchesSearch = workout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workout.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || workout.category === categoryFilter;
    const matchesLevel = levelFilter === "all" || workout.level === levelFilter;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-powerDark text-white py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover Workouts</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Browse our collection of AI-powered workouts designed to fit your fitness level and goals.
            Filter by category, difficulty, or search for specific exercises.
          </p>
        </div>
      </section>
      
      {/* Filters Section */}
      <section className="py-8 border-b">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search workouts..."
                className="pl-10"
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
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {levels.map(level => (
                    <SelectItem key={level} value={level}>
                      {level === "all" ? "All Levels" : level}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={() => {
              setSearchQuery("");
              setCategoryFilter("all");
              setLevelFilter("all");
            }}>
              Reset Filters
            </Button>
          </div>
        </div>
      </section>
      
      {/* Workouts Grid */}
      <section className="py-12">
        <div className="container">
          {filteredWorkouts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkouts.map(workout => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No workouts found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your filters or search query</p>
              <Button variant="outline" onClick={() => {
                setSearchQuery("");
                setCategoryFilter("all");
                setLevelFilter("all");
              }}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-secondary/30 py-12">
        <div className="container text-center">
          <h2 className="text-2xl font-bold mb-4">Don't see what you're looking for?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Let our AI create a personalized workout plan based on your fitness level, goals, and available equipment.
          </p>
          <Button>Generate Custom Workout</Button>
        </div>
      </section>
    </Layout>
  );
};

export default Workouts;
