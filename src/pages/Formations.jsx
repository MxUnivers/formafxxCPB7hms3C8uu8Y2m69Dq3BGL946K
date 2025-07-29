import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { Clock, Users, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Formations = () => {
  const formations = [
    {
      id: 1,
      title: "React & TypeScript Masterclass",
      description: "Maîtrisez React et TypeScript pour créer des applications web modernes et performantes.",
      duration: "40 heures",
      level: "Intermédiaire",
      participants: 45,
      rating: 4.8,
      price: "299€",
      tags: ["React", "TypeScript", "Frontend"],
      image: "/placeholder.svg?height=200&width=300"
    },
    {
      id: 2,
      title: "Node.js & Express Backend",
      description: "Développez des APIs robustes et sécurisées avec Node.js et Express.",
      duration: "35 heures",
      level: "Débutant",
      participants: 32,
      rating: 4.6,
      price: "249€",
      tags: ["Node.js", "Express", "Backend"],
      image: "/placeholder.svg?height=200&width=300"
    },
    {
      id: 3,
      title: "Full Stack JavaScript",
      description: "Formation complète pour devenir développeur full stack avec JavaScript.",
      duration: "80 heures",
      level: "Avancé",
      participants: 28,
      rating: 4.9,
      price: "499€",
      tags: ["JavaScript", "Full Stack", "MongoDB"],
      image: "/placeholder.svg?height=200&width=300"
    },
    {
      id: 4,
      title: "Python pour Débutants",
      description: "Apprenez les bases de la programmation avec Python de façon simple et efficace.",
      duration: "25 heures",
      level: "Débutant",
      participants: 67,
      rating: 4.7,
      price: "199€",
      tags: ["Python", "Débutant", "Algorithmes"],
      image: "/placeholder.svg?height=200&width=300"
    }
  ];

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
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Nos Formations</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez nos formations complètes conçues pour vous faire progresser rapidement 
            dans le développement web et logiciel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formations.map((formation) => (
            <Card key={formation.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-video bg-muted rounded-t-lg mb-4 flex items-center justify-center">
                <span className="text-muted-foreground">Formation Image</span>
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge 
                    variant="outline" 
                    className={getLevelColor(formation.level)}
                  >
                    {formation.level}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{formation.rating}</span>
                  </div>
                </div>
                
                <CardTitle className="text-lg">{formation.title}</CardTitle>
                <CardDescription>
                  {formation.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {formation.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{formation.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{formation.participants} étudiants</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{formation.price}</span>
                  <Link to={`/formations/${formation.id}`}>
                    <Button>
                      En savoir plus
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
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