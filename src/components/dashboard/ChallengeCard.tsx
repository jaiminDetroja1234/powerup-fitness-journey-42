
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Challenge } from "@/data/challenges";
import { Link } from "react-router-dom";

interface ChallengeCardProps {
  challenge: Challenge;
}

const ChallengeCard = ({ challenge }: ChallengeCardProps) => {
  return (
    <Card className="workout-card hover:scale-[1.02] transition-all duration-200 h-full flex flex-col">
      <div className="overflow-hidden rounded-t-xl h-40">
        <img
          src={challenge.image || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"}
          alt={challenge.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      
      <CardHeader className="pt-4 pb-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            {challenge.participants.toLocaleString()} participants
          </span>
          <span className="text-sm font-medium text-orange-500">
            {challenge.daysRemaining} days left
          </span>
        </div>
        <CardTitle className="text-lg mt-2">{challenge.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="pb-2 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2">{challenge.description}</p>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>{challenge.progress || 0}%</span>
          </div>
          <Progress value={challenge.progress || 0} className="h-2" />
        </div>
        
        <div className="mt-4">
          <span className="text-xs font-medium">Prize:</span>
          <p className="text-sm font-medium">{challenge.prize}</p>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button asChild className="w-full" variant={challenge.progress ? "outline" : "default"}>
          <Link to={`/challenges/${challenge.id}`}>
            {challenge.progress ? "Continue Challenge" : "Join Challenge"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChallengeCard;
