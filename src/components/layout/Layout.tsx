
import { ReactNode, useState } from "react";
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

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Simulate login
      if (email && password) {
        setIsLoggedIn(true);
        setShowAuthDialog(false);
        toast.success("Logged in successfully!");
        setEmail("");
        setPassword("");
      } else {
        toast.error("Please fill in all fields");
      }
    } else {
      // Simulate signup
      if (email && password && username) {
        setIsLoggedIn(true);
        setShowAuthDialog(false);
        toast.success("Signed up and logged in successfully!");
        setEmail("");
        setPassword("");
        setUsername("");
      } else {
        toast.error("Please fill in all fields");
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast.info("You've been logged out");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar 
        isLoggedIn={isLoggedIn} 
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
      <main className="flex-1">
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
