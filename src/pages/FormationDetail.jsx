import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import { Clock, Users, Star, BookOpen, CheckCircle, PlayCircle, FileText } from "lucide-react";
import { useParams, Link } from "react-router-dom";

const FormationDetail = () => {
  const { id } = useParams();
  const [progress] = useState(65); // Progression simulée
  
  // Données simulées (à remplacer par de vraies données)
  const formation = {
    id: 1,
    title: "React & TypeScript Masterclass",
    description: "Maîtrisez React et TypeScript pour créer des applications web modernes et performantes. Cette formation complète vous donnera toutes les compétences nécessaires pour devenir un développeur frontend expert.",
    duration: "40 heures",
    level: "Intermédiaire",
    participants: 45,
    rating: 4.8,
    price: "299€",
    instructor: "Jean Développeur",
    tags: ["React", "TypeScript", "Frontend"],
    objectives: [
      "Maîtriser les concepts avancés de React",
      "Utiliser TypeScript pour un code plus robuste",
      "Créer des applications performantes",
      "Gérer l'état avec Redux Toolkit",
      "Tester vos composants React"
    ],
    modules: [
      {
        id: 1,
        title: "Introduction à React",
        duration: "4h",
        completed: true,
        lessons: 8
      },
      {
        id: 2,
        title: "TypeScript Fundamentals",
        duration: "6h",
        completed: true,
        lessons: 10
      },
      {
        id: 3,
        title: "Hooks Avancés",
        duration: "8h",
        completed: false,
        lessons: 12
      },
      {
        id: 4,
        title: "Gestion d'État",
        duration: "10h",
        completed: false,
        lessons: 15
      },
      {
        id: 5,
        title: "Tests et Déploiement",
        duration: "12h",
        completed: false,
        lessons: 18
      }
    ]
  };

  const completedModules = formation.modules.filter(module => module.completed).length;
  const totalModules = formation.modules.length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Badge variant="outline" className="mb-2">
                {formation.level}
              </Badge>
              <h1 className="text-3xl font-bold mb-4">{formation.title}</h1>
              <p className="text-muted-foreground mb-4">{formation.description}</p>
              
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{formation.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{formation.participants} étudiants</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{formation.rating}</span>
                </div>
              </div>
            </div>

            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="content">Contenu</TabsTrigger>
                <TabsTrigger value="objectives">Objectifs</TabsTrigger>
                <TabsTrigger value="progress">Progression</TabsTrigger>
                <TabsTrigger value="exercises">Exercices</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="space-y-4">
                <h3 className="text-xl font-semibold">Modules de formation</h3>
                {formation.modules.map((module) =>{
                    return (
                  <Card key={module.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {module.completed ? (
                          <CheckCircle className="h-5 w-5 text-success" />
                        ) : (
                          <PlayCircle className="h-5 w-5 text-muted-foreground" />
                        )}
                        <div>
                          <h4 className="font-medium">{module.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {module.lessons} leçons • {module.duration}
                          </p>
                        </div>
                      </div>
                      <Button variant={module.completed ? "secondary" : "default"} size="sm">
                        {module.completed ? "Revoir" : "Commencer"}
                      </Button>
                    </div>
                  </Card>
                )})}
              </TabsContent>
              
              <TabsContent value="objectives" className="space-y-4">
                <h3 className="text-xl font-semibold">Objectifs pédagogiques</h3>
                <ul className="space-y-2">
                  {formation.objectives.map((objective, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              
              <TabsContent value="progress" className="space-y-4">
                <h3 className="text-xl font-semibold">Votre progression</h3>
                <Card className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Progression globale</span>
                      <span className="text-sm text-muted-foreground">{progress}%</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-success">{completedModules}</div>
                        <div className="text-sm text-muted-foreground">Modules terminés</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{totalModules - completedModules}</div>
                        <div className="text-sm text-muted-foreground">Modules restants</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="exercises" className="space-y-4">
                <h3 className="text-xl font-semibold">Exercices pratiques</h3>
                <div className="grid gap-4">
                  {[1, 2, 3].map((exercise) => (
                    <Card key={exercise} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <h4 className="font-medium">Exercice {exercise}</h4>
                            <p className="text-sm text-muted-foreground">
                              Créer un composant React avec TypeScript
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Ouvrir
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-primary mb-2">{formation.price}</div>
                <Button className="w-full mb-2">
                  S'inscrire maintenant
                </Button>
                <Link to={`/formations/${id}/book`}>
                  <Button variant="outline" className="w-full">
                    Réserver une session
                  </Button>
                </Link>
              </div>
            </Card>
            
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Formateur</h3>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-semibold text-primary">JD</span>
                </div>
                <div>
                  <div className="font-medium">{formation.instructor}</div>
                  <div className="text-sm text-muted-foreground">Expert React & TypeScript</div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {formation.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormationDetail;