
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ProgressRing from "@/components/dashboard/ProgressRing";
import StatCard from "@/components/dashboard/StatCard";
import WorkoutCard from "@/components/dashboard/WorkoutCard";
import ChallengeCard from "@/components/dashboard/ChallengeCard";
import ActivityChart from "@/components/dashboard/ActivityChart";
import { workouts } from "@/data/workouts";
import { challenges } from "@/data/challenges";
import { userStats } from "@/data/userStats";
import { Link } from "react-router-dom";

const Index = () => {
  const featuredWorkouts = workouts.slice(0, 3);
  const activeChallenge = challenges.find(c => c.progress !== undefined);
  const recommendedChallenges = challenges.filter(c => c.progress === undefined).slice(0, 2);
  
  // Calculate progress for weight loss goal
  const weightProgress = Math.round(((userStats.monthlyProgress.startWeight - userStats.monthlyProgress.currentWeight) / 
    (userStats.monthlyProgress.startWeight - userStats.monthlyProgress.targetWeight)) * 100);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Transform Your Fitness Journey with AI
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-6">
                Personalized workouts, adaptive meal plans, and community challenges 
                powered by artificial intelligence.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link to="/workouts">Start Workout</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10" asChild>
                  <Link to="/nutrition">Meal Plans</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="relative w-60 h-60 animate-float">
                <ProgressRing progress={85} size={240} strokeWidth={12} className="text-white">
                  <div className="text-center">
                    <div className="text-4xl font-bold">85%</div>
                    <div className="text-sm opacity-90">AI Accuracy</div>
                  </div>
                </ProgressRing>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Overview */}
      <section className="py-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              title="Streak"
              value={userStats.streakDays}
              description="days in a row"
            />
            <StatCard
              title="Workouts"
              value={userStats.workoutsCompleted}
              description="sessions completed"
            />
            <StatCard
              title="Calories"
              value={userStats.caloriesBurned.toLocaleString()}
              description="total burned"
            />
            <StatCard
              title="Active Time"
              value={userStats.hoursActive}
              description="hours this month"
            />
          </div>
        </div>
      </section>
      
      {/* Activity & Goals */}
      <section className="py-8 bg-secondary/30">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Activity Chart */}
            <div className="md:w-2/3">
              <ActivityChart data={userStats.weeklyActivity} />
            </div>
            
            {/* Goals */}
            <div className="md:w-1/3">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Monthly Goals</h3>
                  
                  <div className="space-y-6">
                    {/* Weight Goal */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Weight Goal</span>
                        <span className="text-sm text-muted-foreground">
                          {userStats.monthlyProgress.currentWeight} / {userStats.monthlyProgress.targetWeight} kg
                        </span>
                      </div>
                      <div className="relative pt-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-green-200 text-green-800">
                              {weightProgress}%
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-muted">
                          <div
                            style={{ width: `${weightProgress}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Workout Goal */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Workout Goal</span>
                        <span className="text-sm text-muted-foreground">
                          {userStats.monthlyProgress.workoutsCompleted} / {userStats.monthlyProgress.workoutsPlanned} sessions
                        </span>
                      </div>
                      <div className="relative pt-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-blue-200 text-blue-800">
                              {Math.round((userStats.monthlyProgress.workoutsCompleted / userStats.monthlyProgress.workoutsPlanned) * 100)}%
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-muted">
                          <div
                            style={{ width: `${(userStats.monthlyProgress.workoutsCompleted / userStats.monthlyProgress.workoutsPlanned) * 100}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <h4 className="font-medium mb-3">Personal Bests</h4>
                  <div className="space-y-2">
                    {userStats.personalBests.map(pb => (
                      <div key={pb.id} className="flex items-center justify-between">
                        <span className="text-sm">{pb.exercise}</span>
                        <span className="text-sm font-medium">
                          {pb.value} {pb.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Recommended Workouts */}
      <section className="py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Recommended Workouts</h2>
            <Button variant="outline" asChild>
              <Link to="/workouts">View All</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredWorkouts.map(workout => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Challenges */}
      <section className="py-12 bg-secondary/30">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Challenges</h2>
            <Button variant="outline" asChild>
              <Link to="/challenges">View All</Link>
            </Button>
          </div>
          
          {activeChallenge && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Active Challenge</h3>
              <ChallengeCard challenge={activeChallenge} />
            </div>
          )}
          
          <h3 className="text-lg font-semibold mb-4">Recommended Challenges</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedChallenges.map(challenge => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-12">Powered by AI Technology</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-center mb-2">Adaptive Workouts</h3>
                <p className="text-center text-muted-foreground">
                  AI-powered workouts that adapt to your fitness level, goals, and available equipment.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-center mb-2">Personalized Nutrition</h3>
                <p className="text-center text-muted-foreground">
                  Custom meal plans based on your dietary preferences, restrictions, and fitness goals.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-center mb-2">Community Challenges</h3>
                <p className="text-center text-muted-foreground">
                  Join challenges with friends and the global community to stay motivated and accountable.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="hero-gradient text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Fitness Journey?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have achieved their fitness goals with POWER-UP 365's AI-driven approach.
          </p>
          <Button size="lg" variant="default" className="bg-white text-primary hover:bg-white/90">
            Get Started Today
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
