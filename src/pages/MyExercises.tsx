
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { getCustomExercises, deleteCustomExercise, isLoggedIn } from "@/services/userService";
import { CustomExercise } from "@/types/user";
import ExerciseForm from "@/components/exercises/ExerciseForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Trash, Edit } from "lucide-react";

const MyExercises = () => {
  const [exercises, setExercises] = useState<CustomExercise[]>([]);
  const [editingExercise, setEditingExercise] = useState<CustomExercise | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // Load exercises
  const loadExercises = () => {
    if (!isLoggedIn()) {
      toast.error("Please log in to view your exercises");
      return;
    }
    
    const userExercises = getCustomExercises();
    setExercises(userExercises);
  };

  useEffect(() => {
    loadExercises();
  }, []);

  // Filter exercises
  const filteredExercises = exercises.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ex.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === "all") return matchesSearch;
    return matchesSearch && ex.category.toLowerCase() === activeFilter.toLowerCase();
  });

  // Handle exercise deletion
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this exercise?")) {
      deleteCustomExercise(id);
      loadExercises();
    }
  };

  // Handle exercise edit
  const handleEdit = (exercise: CustomExercise) => {
    setEditingExercise(exercise);
    setShowForm(true);
  };

  // Handle form success
  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingExercise(null);
    loadExercises();
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold">My Exercises</h1>
          <Button onClick={() => { setEditingExercise(null); setShowForm(true); }}>
            Add New Exercise
          </Button>
        </div>

        {/* Exercise Form Dialog */}
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="max-w-3xl">
            <ExerciseForm
              exercise={editingExercise || undefined}
              onSuccess={handleFormSuccess}
              onCancel={() => setShowForm(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center">
          <Input 
            placeholder="Search exercises..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-80"
          />
          
          <Tabs defaultValue="all" value={activeFilter} onValueChange={setActiveFilter}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="strength">Strength</TabsTrigger>
              <TabsTrigger value="cardio">Cardio</TabsTrigger>
              <TabsTrigger value="flexibility">Flexibility</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Exercises List */}
        {exercises.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">You haven't created any exercises yet.</p>
            <Button onClick={() => setShowForm(true)} className="mt-4">
              Create Your First Exercise
            </Button>
          </div>
        ) : filteredExercises.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No exercises match your filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExercises.map((exercise) => (
              <Card key={exercise.id} className="overflow-hidden flex flex-col">
                {exercise.image && (
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={exercise.image} 
                      alt={exercise.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{exercise.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-2">{exercise.description}</p>
                  <div className="grid grid-cols-3 gap-2 text-sm mb-4">
                    <div>
                      <p className="font-semibold">Sets</p>
                      <p>{exercise.sets}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Reps</p>
                      <p>{exercise.reps}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Category</p>
                      <p>{exercise.category}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(exercise)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(exercise.id)}>
                    <Trash className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyExercises;
