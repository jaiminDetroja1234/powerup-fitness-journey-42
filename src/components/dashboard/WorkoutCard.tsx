
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WorkoutType } from "@/data/workouts";
import { Link } from "react-router-dom";

interface WorkoutCardProps {
  workout: WorkoutType;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  return (
    <Card className="workout-card hover:scale-[1.02] transition-all duration-200 h-full flex flex-col">
      <div className="overflow-hidden rounded-t-xl h-40">
        <img
          src={workout.image}
          alt={workout.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      
      <CardHeader className="pt-4 pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-secondary text-secondary-foreground">
            {workout.category}
          </Badge>
          <Badge variant={workout.level === "Beginner" ? "secondary" : 
                          workout.level === "Intermediate" ? "outline" : "default"}
            className="ml-2">
            {workout.level}
          </Badge>
        </div>
        <CardTitle className="text-lg mt-2">{workout.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="pb-2 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2">{workout.description}</p>
        
        <div className="flex items-center justify-between mt-4 text-sm">
          <div className="flex items-center">
            <span className="font-medium">{workout.duration}</span>
            <span className="text-muted-foreground ml-1">min</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">{workout.calories}</span>
            <span className="text-muted-foreground ml-1">cal</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">{workout.exercises.length}</span>
            <span className="text-muted-foreground ml-1">exercises</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button asChild className="w-full" variant="default">
          <Link to={`/workouts/${workout.id}`}>Start Workout</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkoutCard;
