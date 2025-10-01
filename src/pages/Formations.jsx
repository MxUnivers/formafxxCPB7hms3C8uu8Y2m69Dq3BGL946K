import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { Clock, Users, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchFormations } from "../actions/request/FormationAction";

const Formations = () => {
  const dispatch  =  useDispatch();
  const {formations, loadingFormations} =  useSelector((state)=>state.formations)

  useEffect(() => {
  dispatch(fetchFormations());
  }, [dispatch]);


  const getLevelColor = (level) => {
    switch (level) {
      case "Débutant": return "bg-success/10 text-success border-success/20";
      case "Intermédiaire": return "bg-accent/10 text-accent border-accent/20";
      case "Avancé": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container px-4 py-8 mx-auto">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">Nos Formations</h1>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
            Découvrez nos formations complètes conçues pour vous faire progresser rapidement 
            dans le développement web et logiciel.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {formations && formations.length > 0 && formations.map((formation) => (
            <Card key={formation.id} className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="flex items-center justify-center mb-4 rounded-t-lg aspect-video bg-muted">
                <span className="text-muted-foreground">Formation Image</span>
              </div>
              
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge 
                    variant="outline" 
                    className={getLevelColor(formation.level)}
                  >
                    {formation.level}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">{formation.rating}</span>
                  </div>
                </div>
                
                <CardTitle className="text-lg">{formation.title}</CardTitle>
                <CardDescription dangerouslySetInnerHTML={{ __html: formation.description }} />

              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  { formation && formation.tags && formation.tags.length >0 && formation.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{formation.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{formation.participants} étudiants</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{formation.price}</span>
                  <Link to={`/formations/${formation.id}`}>
                    <Button>
                      En savoir plus
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4 text-muted-foreground">
            Vous ne trouvez pas la formation qui vous correspond ?
          </p>
          <Button variant="outline" size="lg">
            Demander une formation personnalisée
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Formations;