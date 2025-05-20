
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-powerPurple to-powerBlue">404</h1>
        <p className="text-xl text-foreground mb-6">Oops! This page is taking a rest day.</p>
        <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Button asChild size="lg">
          <Link to="/">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
