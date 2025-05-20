
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { userStats } from "@/data/userStats";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import ProgressRing from "@/components/dashboard/ProgressRing";
import { workouts } from "@/data/workouts";
import StatCard from "@/components/dashboard/StatCard";
import { getUserProfile, createUserProfile, updateUserProfile, getUserGoals, createUserGoals, updateUserGoals, getWorkoutHistory, isLoggedIn, getUserId } from "@/services/userService";
import { UserProfile as UserProfileType, UserGoals } from "@/types/user";

const Profile = () => {
  const navigate = useNavigate();
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: "Jaimin Detroja",
    email: "jaimin.detroja@example.com",
    height: "175",
    weight: "70",
    birthdate: "1995-06-15",
    gender: "Male",
  });

  const [goalsForm, setGoalsForm] = useState({
    targetWeight: "65",
    workoutsPerWeek: "4",
    fitnessGoal: "Weight Loss",
    dietaryPreference: "No Restrictions",
  });

  // Load user profile from backend
  useEffect(() => {
    const loadProfile = () => {
      if (!isLoggedIn()) {
        return;
      }

      const userProfile = getUserProfile();
      if (userProfile) {
        setProfileForm({
          name: userProfile.name,
          email: userProfile.email,
          height: userProfile.height,
          weight: userProfile.weight,
          birthdate: userProfile.birthdate,
          gender: userProfile.gender
        });
      }

      const userGoals = getUserGoals();
      if (userGoals) {
        setGoalsForm({
          targetWeight: userGoals.targetWeight,
          workoutsPerWeek: userGoals.workoutsPerWeek,
          fitnessGoal: userGoals.fitnessGoal,
          dietaryPreference: userGoals.dietaryPreference
        });
      }

      setIsProfileLoaded(true);
    };

    loadProfile();
  }, []);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const userId = getUserId();
      
      if (!userId) {
        // Create a new profile if user doesn't have one
        createUserProfile({
          name: profileForm.name,
          email: profileForm.email,
          height: profileForm.height,
          weight: profileForm.weight,
          birthdate: profileForm.birthdate,
          gender: profileForm.gender
        });
      } else {
        // Update existing profile
        updateUserProfile({
          name: profileForm.name,
          email: profileForm.email,
          height: profileForm.height,
          weight: profileForm.weight,
          birthdate: profileForm.birthdate,
          gender: profileForm.gender
        });
      }
      
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    }
  };

  const handleGoalsUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const userId = getUserId();
      
      if (!userId) {
        toast.error("Please save your profile first");
        return;
      }
      
      if (!getUserGoals()) {
        // Create new goals
        createUserGoals(userId, {
          targetWeight: goalsForm.targetWeight,
          workoutsPerWeek: goalsForm.workoutsPerWeek,
          fitnessGoal: goalsForm.fitnessGoal,
          dietaryPreference: goalsForm.dietaryPreference
        });
      } else {
        // Update existing goals
        updateUserGoals({
          targetWeight: goalsForm.targetWeight,
          workoutsPerWeek: goalsForm.workoutsPerWeek,
          fitnessGoal: goalsForm.fitnessGoal,
          dietaryPreference: goalsForm.dietaryPreference
        });
      }
      
      toast.success("Goals updated successfully!");
    } catch (error) {
      toast.error("Failed to update goals");
      console.error(error);
    }
  };

  // Calculate workout completion rate
  const completionRate = Math.round((userStats.workoutsCompleted / userStats.monthlyProgress.workoutsPlanned) * 100);

  // Get workout history (we'll show sample data if no history exists)
  const workoutHistory = getWorkoutHistory();
  const recentWorkouts = workoutHistory.length > 0 
    ? workoutHistory.slice(0, 3) 
    : workouts.slice(0, 3);

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full bg-primary/10 mb-4 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-bold">{profileForm.name}</h2>
                  <p className="text-muted-foreground mb-4">{profileForm.email}</p>
                  <Button className="w-full mb-2">Edit Profile Picture</Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => navigate("/my-exercises")}
                  >
                    My Exercises
                  </Button>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Member since</span>
                    <span className="text-sm">Jan 2025</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Current streak</span>
                    <span className="text-sm">{userStats.streakDays} days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total workouts</span>
                    <span className="text-sm">{userStats.workoutsCompleted}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>My Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                      🔥
                    </div>
                    <span className="text-xs text-center">7 Day Streak</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                      💪
                    </div>
                    <span className="text-xs text-center">10 Workouts</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                      🏅
                    </div>
                    <span className="text-xs text-center">Challenge Win</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                      🥗
                    </div>
                    <span className="text-xs text-center">Nutrition Pro</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                      ⭐
                    </div>
                    <span className="text-xs text-center">Early Adopter</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                      ➕
                    </div>
                    <span className="text-xs text-center">View All</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
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
            </div>

            {/* Monthly Progress */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Monthly Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center justify-center">
                    <ProgressRing progress={completionRate} size={120} strokeWidth={10}>
                      <div className="text-center">
                        <div className="text-xl font-bold">{completionRate}%</div>
                        <div className="text-xs opacity-70">Completion</div>
                      </div>
                    </ProgressRing>
                    <p className="mt-2 text-sm text-center">
                      {userStats.workoutsCompleted} of {userStats.monthlyProgress.workoutsPlanned} workouts
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Weight Goal Progress</h3>
                    <div className="flex items-center justify-between text-sm">
                      <span>{userStats.monthlyProgress.currentWeight} kg</span>
                      <span className="text-muted-foreground">Target: {userStats.monthlyProgress.targetWeight} kg</span>
                    </div>
                    <div className="w-full h-2 bg-secondary/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{ width: `${(userStats.monthlyProgress.startWeight - userStats.monthlyProgress.currentWeight) / (userStats.monthlyProgress.startWeight - userStats.monthlyProgress.targetWeight) * 100}%` }} 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-4">Personal Bests</h3>
                    <div className="space-y-2">
                      {userStats.personalBests.slice(0, 3).map(pb => (
                        <div key={pb.id} className="flex items-center justify-between">
                          <span className="text-sm">{pb.exercise}</span>
                          <span className="text-sm font-medium">
                            {pb.value} {pb.unit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile Forms */}
            <Tabs defaultValue="account">
              <TabsList className="mb-6">
                <TabsTrigger value="account">Account Settings</TabsTrigger>
                <TabsTrigger value="goals">Goals & Preferences</TabsTrigger>
                <TabsTrigger value="history">Workout History</TabsTrigger>
              </TabsList>

              {/* Account Settings */}
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={profileForm.name}
                            onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profileForm.email}
                            onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="height">Height (cm)</Label>
                          <Input
                            id="height"
                            type="number"
                            value={profileForm.height}
                            onChange={(e) => setProfileForm({ ...profileForm, height: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="weight">Weight (kg)</Label>
                          <Input
                            id="weight"
                            type="number"
                            value={profileForm.weight}
                            onChange={(e) => setProfileForm({ ...profileForm, weight: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="birthdate">Birth Date</Label>
                          <Input
                            id="birthdate"
                            type="date"
                            value={profileForm.birthdate}
                            onChange={(e) => setProfileForm({ ...profileForm, birthdate: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="gender">Gender</Label>
                          <select 
                            id="gender"
                            value={profileForm.gender}
                            onChange={(e) => setProfileForm({ ...profileForm, gender: e.target.value })}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            <option>Male</option>
                            <option>Female</option>
                            <option>Non-binary</option>
                            <option>Prefer not to say</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button type="submit">Save Changes</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Goals & Preferences */}
              <TabsContent value="goals">
                <Card>
                  <CardHeader>
                    <CardTitle>Goals & Preferences</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleGoalsUpdate} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="targetWeight">Target Weight (kg)</Label>
                          <Input
                            id="targetWeight"
                            type="number"
                            value={goalsForm.targetWeight}
                            onChange={(e) => setGoalsForm({ ...goalsForm, targetWeight: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="workoutsPerWeek">Workouts Per Week</Label>
                          <Input
                            id="workoutsPerWeek"
                            type="number"
                            value={goalsForm.workoutsPerWeek}
                            onChange={(e) => setGoalsForm({ ...goalsForm, workoutsPerWeek: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="fitnessGoal">Primary Fitness Goal</Label>
                          <select 
                            id="fitnessGoal"
                            value={goalsForm.fitnessGoal}
                            onChange={(e) => setGoalsForm({ ...goalsForm, fitnessGoal: e.target.value })}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            <option>Weight Loss</option>
                            <option>Muscle Gain</option>
                            <option>Strength Training</option>
                            <option>Endurance</option>
                            <option>Overall Fitness</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dietaryPreference">Dietary Preference</Label>
                          <select 
                            id="dietaryPreference"
                            value={goalsForm.dietaryPreference}
                            onChange={(e) => setGoalsForm({ ...goalsForm, dietaryPreference: e.target.value })}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            <option>No Restrictions</option>
                            <option>Vegetarian</option>
                            <option>Vegan</option>
                            <option>Keto</option>
                            <option>Paleo</option>
                            <option>Gluten-Free</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button type="submit">Save Changes</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Workout History */}
              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Workouts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentWorkouts.map((workout, index) => (
                        <div key={workout.id} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                          <div className="w-16 h-16 rounded-md overflow-hidden shrink-0">
                            <img 
                              src={workout.image} 
                              alt={workout.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{workout.title}</h4>
                                <p className="text-sm text-muted-foreground">{workout.duration} min • {workout.level}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-sm">{new Date().toLocaleDateString()}</div>
                                <div className="text-xs text-muted-foreground">Completed</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="flex justify-center">
                        <Button variant="outline">View All Workouts</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
