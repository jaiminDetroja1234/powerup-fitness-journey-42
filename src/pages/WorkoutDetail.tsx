
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { workouts } from "@/data/workouts";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const WorkoutDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeExerciseIndex, setActiveExerciseIndex] = useState<number | null>(null);
  
  const workout = workouts.find(w => w.id === id);
  
  if (!workout) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Workout Not Found</h2>
          <p className="mb-6">The workout you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/workouts">Browse Workouts</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  const startWorkout = () => {
    setActiveExerciseIndex(0);
    toast.success("Workout started! Follow along with the exercises.");
  };
  
  const nextExercise = () => {
    if (activeExerciseIndex !== null && activeExerciseIndex < workout.exercises.length - 1) {
      setActiveExerciseIndex(activeExerciseIndex + 1);
      toast("Next exercise", {
        description: workout.exercises[activeExerciseIndex + 1].name
      });
    } else if (activeExerciseIndex === workout.exercises.length - 1) {
      // Workout complete
      setActiveExerciseIndex(null);
      toast.success("Congratulations! Workout completed.", {
        description: "Great job completing your workout session!"
      });
    }
  };
  
  const completeWorkout = () => {
    toast.success("Workout completed successfully!", {
      description: "You've burned approximately " + workout.calories + " calories."
    });
    navigate("/");
  };
  
  return (
    <Layout>
      {/* Top info section */}
      <section className={`bg-powerDark text-white py-12 ${activeExerciseIndex !== null ? 'pb-6' : ''}`}>
        <div className="container">
          <div className="flex items-center gap-2 mb-2">
            <Link to="/workouts" className="text-white/70 hover:text-white transition-colors">
              Workouts
            </Link>
            <span className="text-white/50">→</span>
            <span>{workout.title}</span>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-2/3">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                  {workout.category}
                </Badge>
                <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                  {workout.level}
                </Badge>
                <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                  {workout.duration} min
                </Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{workout.title}</h1>
              <p className="text-lg text-white/80 mb-6">{workout.description}</p>
              
              {activeExerciseIndex === null ? (
                <Button size="lg" onClick={startWorkout}>Start Workout</Button>
              ) : (
                <div className="flex gap-3">
                  <Button variant="secondary" onClick={() => setActiveExerciseIndex(null)}>
                    Pause Workout
                  </Button>
                  <Button onClick={nextExercise}>
                    {activeExerciseIndex < workout.exercises.length - 1 ? "Next Exercise" : "Finish Workout"}
                  </Button>
                </div>
              )}
            </div>
            
            <div className="md:w-1/3 flex flex-col gap-4">
              <Card className="bg-white/5 border-white/10 text-white">
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-white/60 text-sm">Exercises</p>
                      <p className="text-xl font-semibold">{workout.exercises.length}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Duration</p>
                      <p className="text-xl font-semibold">{workout.duration} min</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Calories</p>
                      <p className="text-xl font-semibold">{workout.calories}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Level</p>
                      <p className="text-xl font-semibold">{workout.level}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Workout in progress */}
      {activeExerciseIndex !== null && (
        <section className="bg-powerDark text-white pb-12 pt-4">
          <div className="container">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 flex justify-center items-center">
                  <div className="bg-white/10 rounded-lg h-48 w-full flex items-center justify-center">
                    <p className="text-lg">[Exercise Visual]</p>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold mb-2">
                    {workout.exercises[activeExerciseIndex].name}
                  </h3>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-white/60 text-sm">Sets</p>
                      <p className="text-xl font-semibold">{workout.exercises[activeExerciseIndex].sets}</p>
                    </div>
                    {workout.exercises[activeExerciseIndex].reps && (
                      <div>
                        <p className="text-white/60 text-sm">Reps</p>
                        <p className="text-xl font-semibold">{workout.exercises[activeExerciseIndex].reps}</p>
                      </div>
                    )}
                    {workout.exercises[activeExerciseIndex].duration && (
                      <div>
                        <p className="text-white/60 text-sm">Duration</p>
                        <p className="text-xl font-semibold">{workout.exercises[activeExerciseIndex].duration}s</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-white/5 rounded p-4 mb-6">
                    <p className="text-sm">{workout.exercises[activeExerciseIndex].instructions}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-white/60">Exercise </span>
                      <span className="text-sm font-medium">
                        {activeExerciseIndex + 1} of {workout.exercises.length}
                      </span>
                    </div>
                    <Button onClick={nextExercise}>
                      {activeExerciseIndex < workout.exercises.length - 1 ? "Complete & Next" : "Finish Workout"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Exercises list */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6">Exercises</h2>
          
          <Accordion type="single" collapsible className="mb-8">
            {workout.exercises.map((exercise, index) => (
              <AccordionItem key={exercise.id} value={exercise.id}>
                <AccordionTrigger className="py-4">
                  <div className="flex items-center">
                    <span className="font-medium">{index + 1}. {exercise.name}</span>
                    <Badge variant="outline" className="ml-3">
                      {exercise.reps ? `${exercise.sets} × ${exercise.reps}` : 
                       `${exercise.sets} × ${exercise.duration}s`}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2 pb-4">
                    <p>{exercise.instructions}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          {activeExerciseIndex === null && (
            <Button size="lg" onClick={startWorkout}>Start Workout</Button>
          )}
        </div>
      </section>
      
      {/* Similar Workouts */}
      <section className="py-12 bg-secondary/30">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workouts
              .filter(w => w.id !== workout.id && w.category === workout.category)
              .slice(0, 3)
              .map(similarWorkout => (
                <Card key={similarWorkout.id} className="overflow-hidden">
                  <div className="h-40 bg-muted">
                    <img 
                      src={similarWorkout.image} 
                      alt={similarWorkout.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex gap-2 mb-2">
                      <Badge variant="outline">{similarWorkout.category}</Badge>
                      <Badge variant="outline">{similarWorkout.level}</Badge>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{similarWorkout.title}</h3>
                    <div className="flex items-center justify-between text-sm">
                      <span>{similarWorkout.duration} min</span>
                      <span>{similarWorkout.calories} cal</span>
                      <Button variant="link" size="sm" asChild className="p-0">
                        <Link to={`/workouts/${similarWorkout.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </section>
      
      {/* Complete workout section */}
      <section className="py-12 bg-powerPurple text-white">
        <div className="container text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to crush this workout?</h2>
          <p className="text-lg opacity-90 mb-6 max-w-xl mx-auto">
            Track your progress, burn calories, and reach your fitness goals with this {workout.duration}-minute workout.
          </p>
          
          {activeExerciseIndex === null ? (
            <Button size="lg" variant="secondary" onClick={startWorkout}>
              Start Now
            </Button>
          ) : (
            <Button size="lg" variant="secondary" onClick={completeWorkout}>
              Complete Workout
            </Button>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default WorkoutDetail;
