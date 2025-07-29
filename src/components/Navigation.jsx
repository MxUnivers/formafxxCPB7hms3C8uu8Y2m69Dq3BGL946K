import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Settings, User, LogIn } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-foreground">FormationPro</span>
            </Link>
            
            <div className="hidden md:flex space-x-6">
              <Link 
                to="/" 
                className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                  isActive('/') 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <span>Accueil</span>
              </Link>
              
              <Link 
                to="/formations" 
                className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                  isActive('/formations') 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <BookOpen className="h-4 w-4" />
                <span>Formations</span>
              </Link>
              
              <Link 
                to="/calendar" 
                className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                  isActive('/calendar') 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Calendar className="h-4 w-4" />
                <span>Calendrier</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/student">
              <Button variant="outline" size="sm" className="hidden md:flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>Espace Étudiant</span>
              </Button>
            </Link>
            
            <Link to="/admin">
              <Button variant="outline" size="sm" className="hidden md:flex items-center space-x-1">
                <Settings className="h-4 w-4" />
                <span>Administration</span>
              </Button>
            </Link>
            
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <LogIn className="h-4 w-4 mr-1" />
              <span>Connexion</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;