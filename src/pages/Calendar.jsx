import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { Calendar as CalendarIcon, Clock, MapPin, Users } from "lucide-react";

const Calendar = () => {
  const upcomingSessions = [
    {
      id: 1,
      title: "React Hooks Avancés",
      formation: "React & TypeScript Masterclass",
      date: "2024-02-15",
      time: "14:00 - 17:00",
      instructor: "Jean Dupont",
      location: "En ligne",
      participants: 15,
      maxParticipants: 20,
      type: "Cours",
      status: "available"
    },
    {
      id: 2,
      title: "Projet pratique : API REST",
      formation: "Node.js & Express Backend",
      date: "2024-02-16",
      time: "09:00 - 12:00",
      instructor: "Marie Martin",
      location: "En ligne",
      participants: 12,
      maxParticipants: 15,
      type: "Atelier",
      status: "available"
    },
    {
      id: 3,
      title: "Session de Questions/Réponses",
      formation: "Python pour Débutants",
      date: "2024-02-17",
      time: "18:00 - 19:30",
      instructor: "Pierre Dubois",
      location: "En ligne",
      participants: 20,
      maxParticipants: 20,
      type: "Q&A",
      status: "full"
    },
    {
      id: 4,
      title: "Architecture Frontend",
      formation: "Full Stack JavaScript",
      date: "2024-02-18",
      time: "10:00 - 13:00",
      instructor: "Sophie Laurent",
      location: "En ligne",
      participants: 8,
      maxParticipants: 12,
      type: "Cours",
      status: "available"
    }
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case "Cours": return "bg-primary/10 text-primary border-primary/20";
      case "Atelier": return "bg-secondary/10 text-secondary border-secondary/20";
      case "Q&A": return "bg-accent/10 text-accent border-accent/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "available": return "bg-success/10 text-success border-success/20";
      case "full": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Calendrier des Formations</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Consultez le planning des sessions à venir et réservez votre place
          </p>
        </div>

        <div className="grid gap-6">
          {upcomingSessions.map((session) => (
            <Card key={session.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge 
                        variant="outline" 
                        className={getTypeColor(session.type)}
                      >
                        {session.type}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={getStatusColor(session.status)}
                      >
                        {session.status === "available" ? "Places disponibles" : "Complet"}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{session.title}</CardTitle>
                    <CardDescription className="text-primary font-medium">
                      {session.formation}
                    </CardDescription>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <Button 
                      disabled={session.status === "full"}
                      className="w-full sm:w-auto"
                    >
                      {session.status === "available" ? "Réserver" : "Liste d'attente"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDate(session.date)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{session.time}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{session.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{session.participants}/{session.maxParticipants} participants</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Formateur :</span> {session.instructor}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Besoin d'aide ?</CardTitle>
              <CardDescription>
                Contactez notre équipe pour organiser une session personnalisée
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Contacter l'équipe
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calendar;