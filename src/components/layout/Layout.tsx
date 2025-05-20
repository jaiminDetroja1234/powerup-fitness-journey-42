
import { ReactNode, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { getUserProfile, createUserProfile, isLoggedIn } from "@/services/userService";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  // Check login status on component mount
  useEffect(() => {
    setIsUserLoggedIn(isLoggedIn());
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Simulate login with localStorage
      if (email && password) {
        // Check if profile exists with this email
        const userProfile = getUserProfile();
        
        if (!userProfile || userProfile.email !== email) {
          toast.error("Invalid email or password");
          return;
        }
        
        // In a real app, we'd verify the password hash here
        setIsUserLoggedIn(true);
        setShowAuthDialog(false);
        toast.success("Logged in successfully!");
        setEmail("");
        setPassword("");
        
        // Redirect to profile page
        setTimeout(() => navigate("/profile"), 500);
      } else {
        toast.error("Please fill in all fields");
      }
    } else {
      // Simulate signup
      if (email && password && username) {
        // Create user profile
        createUserProfile({
          name: username,
          email: email,
          height: "170",
          weight: "70",
          birthdate: "1990-01-01",
          gender: "Not specified",
        });
        
        setIsUserLoggedIn(true);
        setShowAuthDialog(false);
        toast.success("Signed up and logged in successfully!");
        setEmail("");
        setPassword("");
        setUsername("");
        
        // Redirect to profile page
        setTimeout(() => navigate("/profile"), 500);
      } else {
        toast.error("Please fill in all fields");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userProfile');
    localStorage.removeItem('userGoals');
    setIsUserLoggedIn(false);
    toast.info("You've been logged out");
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar 
        isLoggedIn={isUserLoggedIn} 
        onLoginClick={() => {
          setIsLogin(true);
          setShowAuthDialog(true);
        }}
        onSignupClick={() => {
          setIsLogin(false);
          setShowAuthDialog(true);
        }}
        onLogoutClick={handleLogout}
      />
      <main className="flex-1 pt-16"> {/* Added pt-16 for padding top */}
        {children}
      </main>
      <Footer />

      {/* Auth Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isLogin ? "Login" : "Sign Up"}</DialogTitle>
            <DialogDescription>
              {isLogin 
                ? "Enter your credentials to access your account" 
                : "Create an account to start your fitness journey"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAuth}>
            {!isLogin && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
            )}
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{isLogin ? "Login" : "Sign Up"}</Button>
            </DialogFooter>
          </form>
          <div className="text-center mt-4">
            {isLogin ? (
              <p>
                Don't have an account?{" "}
                <Button 
                  variant="link" 
                  className="p-0" 
                  onClick={() => setIsLogin(false)}
                >
                  Sign up
                </Button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <Button 
                  variant="link" 
                  className="p-0" 
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </Button>
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Layout;
