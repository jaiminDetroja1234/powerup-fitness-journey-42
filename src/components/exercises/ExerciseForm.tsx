
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createCustomExercise, updateCustomExercise, getUserId } from "@/services/userService";
import { CustomExercise } from "@/types/user";
import { toast } from "sonner";

interface ExerciseFormProps {
  exercise?: CustomExercise;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({ exercise, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: exercise?.name || "",
    description: exercise?.description || "",
    sets: exercise?.sets || 3,
    reps: exercise?.reps || 10,
    duration: exercise?.duration || 0,
    instructions: exercise?.instructions || "",
    category: exercise?.category || "Strength",
    image: exercise?.image || ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const userId = getUserId();
    if (!userId) {
      toast.error("You must be logged in to create exercises");
      return;
    }

    try {
      if (exercise) {
        // Update existing exercise
        updateCustomExercise(exercise.id, formData);
      } else {
        // Create new exercise
        createCustomExercise(userId, formData);
      }
      
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error("Failed to save exercise");
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{exercise ? "Edit Exercise" : "Create Exercise"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Exercise Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="Strength">Strength</option>
              <option value="Cardio">Cardio</option>
              <option value="Flexibility">Flexibility</option>
              <option value="Balance">Balance</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sets">Sets</Label>
              <Input
                id="sets"
                type="number"
                min="1"
                value={formData.sets}
                onChange={(e) => setFormData({ ...formData, sets: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reps">Reps</Label>
              <Input
                id="reps"
                type="number"
                min="1"
                value={formData.reps}
                onChange={(e) => setFormData({ ...formData, reps: parseInt(e.target.value) })}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (seconds, optional)</Label>
            <Input
              id="duration"
              type="number"
              min="0"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Short Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="instructions">Instructions</Label>
            <Textarea
              id="instructions"
              rows={4}
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Image URL (optional)</Label>
            <Input
              id="image"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
            {formData.image && (
              <div className="mt-2 aspect-video w-full max-w-md overflow-hidden rounded-md">
                <img 
                  src={formData.image} 
                  alt="Exercise preview" 
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="submit">{exercise ? "Update Exercise" : "Create Exercise"}</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ExerciseForm;
