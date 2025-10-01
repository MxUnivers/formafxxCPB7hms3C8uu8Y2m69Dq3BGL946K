import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Settings, User, LogIn } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { isAdmin, isSudent, isSupport } from "../lib/authUtils";
import appRoutes from "../routes/appRoutes";
import { getAndCheckLocalStorage } from "../lib/localvalueFunction";
import { localStorageKeys } from "../lib/localvalue";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="border-b shadow-sm bg-card border-border">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-foreground">Formation</span>
            </Link>
            
            <div className="hidden space-x-6 md:flex">
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
                <BookOpen className="w-4 h-4" />
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
                <Calendar className="w-4 h-4" />
                <span>Calendrier</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {
          (isSudent) &&
           <Link to={`${appRoutes[9].path}`}>
              <Button variant="outline" size="sm" className="items-center hidden space-x-1 md:flex">
                <User className="w-4 h-4" />
                <span>Espace Étudiant</span>
              </Button>
            </Link>
            }
            
           
            {
                        (isAdmin || isInstructor || isSupport ) &&
                         <Link to={`${appRoutes[10].path}`}>
              <Button variant="outline" size="sm" className="items-center hidden space-x-1 md:flex">
                <Settings className="w-4 h-4" />
                <span>Administration</span>
              </Button>
            </Link>
            }
           
            
            {
              (!getAndCheckLocalStorage(localStorageKeys.userId))&&(
                <Button size="sm" className="bg-primary hover:bg-primary/90">
              <LogIn className="w-4 h-4 mr-1" />
              <span>Connexion</span>
            </Button>
              )
            }
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;