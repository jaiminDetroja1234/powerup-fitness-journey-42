
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Menu, Home, Calendar, Settings, Search, X } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-sm border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="hidden md:inline-block text-transparent bg-clip-text bg-gradient-to-r from-powerPurple to-powerBlue">POWER-UP</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-powerBlue to-powerGreen">365</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6 ml-6">
            <Link to="/" className="text-foreground/80 hover:text-primary transition-colors">Home</Link>
            <Link to="/workouts" className="text-foreground/80 hover:text-primary transition-colors">Workouts</Link>
            <Link to="/nutrition" className="text-foreground/80 hover:text-primary transition-colors">Nutrition</Link>
            <Link to="/challenges" className="text-foreground/80 hover:text-primary transition-colors">Challenges</Link>
            <Link to="/community" className="text-foreground/80 hover:text-primary transition-colors">Community</Link>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/profile" className="flex w-full">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/settings" className="flex w-full">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background pt-4 md:hidden">
          <div className="container flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 py-3 border-b" onClick={toggleMobileMenu}>
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link to="/workouts" className="flex items-center gap-2 py-3 border-b" onClick={toggleMobileMenu}>
              <Calendar className="h-5 w-5" />
              <span>Workouts</span>
            </Link>
            <Link to="/nutrition" className="flex items-center gap-2 py-3 border-b" onClick={toggleMobileMenu}>
              <Calendar className="h-5 w-5" />
              <span>Nutrition</span>
            </Link>
            <Link to="/challenges" className="flex items-center gap-2 py-3 border-b" onClick={toggleMobileMenu}>
              <Calendar className="h-5 w-5" />
              <span>Challenges</span>
            </Link>
            <Link to="/community" className="flex items-center gap-2 py-3 border-b" onClick={toggleMobileMenu}>
              <Calendar className="h-5 w-5" />
              <span>Community</span>
            </Link>
            <Link to="/profile" className="flex items-center gap-2 py-3 border-b" onClick={toggleMobileMenu}>
              <Avatar className="h-5 w-5">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span>Profile</span>
            </Link>
            <Link to="/settings" className="flex items-center gap-2 py-3 border-b" onClick={toggleMobileMenu}>
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
            <Button variant="outline" className="mt-4">Logout</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
