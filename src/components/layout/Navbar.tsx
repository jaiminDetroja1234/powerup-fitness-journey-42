import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";

interface NavbarProps {
  isLoggedIn?: boolean;
  onLoginClick?: () => void;
  onSignupClick?: () => void;
  onLogoutClick?: () => void;
}

const Navbar = ({ 
  isLoggedIn, 
  onLoginClick, 
  onSignupClick, 
  onLogoutClick
}: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const links = [
    { name: "Home", href: "/" },
    { name: "Workouts", href: "/workouts" },
    { name: "Challenges", href: "/challenges" },
    { name: "Nutrition", href: "/nutrition" },
  ];

  return (
    <header className="border-b bg-background fixed w-full z-50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex gap-6 items-center">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold">POWER-UP 365</span>
          </Link>

          {!isMobile && (
            <nav className="hidden md:flex gap-6">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          {!isMobile ? (
            isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link to="/profile">
                  <Button variant="ghost" size="sm">My Profile</Button>
                </Link>
                <Button variant="outline" size="sm" onClick={onLogoutClick}>Logout</Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={onLoginClick}>Login</Button>
                <Button size="sm" onClick={onSignupClick}>Sign Up</Button>
              </>
            )
          ) : (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-[1.2rem] w-[1.2rem]" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4 mt-8">
                  {links.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="text-lg font-medium transition-colors hover:text-primary"
                      onClick={() => setOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="h-px bg-border my-4" />
                  {isLoggedIn ? (
                    <>
                      <Link
                        to="/profile"
                        className="text-lg font-medium transition-colors hover:text-primary"
                        onClick={() => setOpen(false)}
                      >
                        My Profile
                      </Link>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          onLogoutClick?.();
                          setOpen(false);
                        }}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={() => {
                          onLoginClick?.();
                          setOpen(false);
                        }}
                      >
                        Login
                      </Button>
                      <Button 
                        className="w-full" 
                        onClick={() => {
                          onSignupClick?.();
                          setOpen(false);
                        }}
                      >
                        Sign Up
                      </Button>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
