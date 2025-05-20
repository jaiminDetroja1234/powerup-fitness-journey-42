
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ChallengeCard from "@/components/dashboard/ChallengeCard";
import { challenges } from "@/data/challenges";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Challenges = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filter challenges based on search and filters
  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDifficulty = difficultyFilter === "all" || challenge.difficulty === difficultyFilter;
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "active" && challenge.progress !== undefined) ||
                         (statusFilter === "available" && challenge.progress === undefined);
    
    return matchesSearch && matchesDifficulty && matchesStatus;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-powerDark text-white py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Community Challenges</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Join fitness challenges with the global POWER-UP community. Compete, earn rewards, and stay motivated together.
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
                placeholder="Search challenges..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Challenges</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={() => {
              setSearchQuery("");
              setDifficultyFilter("all");
              setStatusFilter("all");
            }}>
              Reset Filters
            </Button>
          </div>
        </div>
      </section>
      
      {/* Active Challenges Section */}
      <section className="py-8">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6">Active Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {filteredChallenges.filter(c => c.progress !== undefined).length > 0 ? (
              filteredChallenges
                .filter(c => c.progress !== undefined)
                .map(challenge => (
                  <ChallengeCard key={challenge.id} challenge={challenge} />
                ))
            ) : (
              <div className="col-span-full text-center py-8 bg-muted/30 rounded-lg">
                <h3 className="text-lg font-medium mb-2">No active challenges</h3>
                <p className="text-muted-foreground mb-4">Join a challenge to see it here</p>
              </div>
            )}
          </div>
          
          <Separator className="my-8" />
          
          <h2 className="text-2xl font-bold mb-6">Available Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.filter(c => c.progress === undefined).length > 0 ? (
              filteredChallenges
                .filter(c => c.progress === undefined)
                .map(challenge => (
                  <ChallengeCard key={challenge.id} challenge={challenge} />
                ))
            ) : (
              <div className="col-span-full text-center py-8 bg-muted/30 rounded-lg">
                <h3 className="text-lg font-medium mb-2">No challenges found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters</p>
                <Button variant="outline" onClick={() => {
                  setSearchQuery("");
                  setDifficultyFilter("all");
                  setStatusFilter("all");
                }}>
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Create Challenge Section */}
      <section className="bg-secondary/30 py-12">
        <div className="container text-center">
          <h2 className="text-2xl font-bold mb-4">Create Your Own Challenge</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Want to motivate your friends or training group? Create a custom challenge and invite others to join.
          </p>
          <Button>Create Challenge</Button>
        </div>
      </section>
    </Layout>
  );
};

export default Challenges;
