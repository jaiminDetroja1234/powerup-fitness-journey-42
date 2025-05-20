
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { challenges, Challenge } from "@/data/challenges";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, Users } from "lucide-react";

const Challenges = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  
  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === "all") return matchesSearch;
    if (activeFilter === "active") return matchesSearch && challenge.daysRemaining > 0;
    if (activeFilter === "completed") return matchesSearch && challenge.progress === 100;
    
    return matchesSearch;
  });

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Fitness Challenges</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center">
          <Input 
            placeholder="Search challenges..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-80"
          />
          
          <div className="flex gap-2">
            <Button 
              variant={activeFilter === "all" ? "default" : "outline"} 
              onClick={() => setActiveFilter("all")}
              size="sm"
            >
              All
            </Button>
            <Button 
              variant={activeFilter === "active" ? "default" : "outline"} 
              onClick={() => setActiveFilter("active")}
              size="sm"
            >
              Active
            </Button>
            <Button 
              variant={activeFilter === "completed" ? "default" : "outline"} 
              onClick={() => setActiveFilter("completed")}
              size="sm"
            >
              Completed
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

const ChallengeCard = ({ challenge }: { challenge: Challenge }) => {
  return (
    <Card className="h-full flex flex-col">
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={challenge.image} 
          alt={challenge.title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="pt-6 flex-grow">
        <h3 className="text-xl font-semibold mb-2">{challenge.title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{challenge.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-sm">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <span>{challenge.duration} days</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{challenge.participants.toLocaleString()} participants</span>
          </div>
        </div>
        
        {challenge.progress !== undefined && (
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span>{challenge.progress}%</span>
            </div>
            <Progress value={challenge.progress} />
          </div>
        )}
        
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="bg-primary/10">
            {challenge.daysRemaining > 0 ? `${challenge.daysRemaining} days left` : "Ended"}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button className="w-full">{challenge.progress ? "Continue Challenge" : "Join Challenge"}</Button>
      </CardFooter>
    </Card>
  );
};

export default Challenges;
