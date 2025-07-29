import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar as CalendarIcon, Clock, Users, MapPin, Video } from "lucide-react";

const BookingCalendar = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSession, setSelectedSession] = useState("");

  // Données simulées des sessions disponibles
  const sessions = [
    {
      id: "1",
      date: "2024-03-15",
      time: "09:00-17:00",
      type: "Présentiel",
      location: "Paris - République",
      spots: 8,
      maxSpots: 15,
      price: "299€"
    },
    {
      id: "2", 
      date: "2024-03-22",
      time: "09:00-17:00",
      type: "Distanciel",
      location: "En ligne (Zoom)",
      spots: 12,
      maxSpots: 20,
      price: "249€"
    },
    {
      id: "3",
      date: "2024-04-05",
      time: "14:00-18:00",
      type: "Présentiel",
      location: "Lyon - Part-Dieu",
      spots: 5,
      maxSpots: 12,
      price: "299€"
    },
    {
      id: "4",
      date: "2024-04-12",
      time: "09:00-17:00",
      type: "Distanciel",
      location: "En ligne (Teams)",
      spots: 18,
      maxSpots: 25,
      price: "249€"
    }
  ];

  const formation = {
    title: "React & TypeScript Masterclass",
    duration: "40 heures"
  };

  const handleBooking = () => {
    if (!selectedSession) {
      alert("Veuillez sélectionner une session");
      return;
    }
    // Redirection vers inscription avec session sélectionnée
    console.log("Réservation session:", selectedSession);
  };

  const getSessionsByDate = (date) => {
    return sessions.filter(session => {
      const sessionDate = new Date(session.date);
      return sessionDate.toDateString() === date.toDateString();
    });
  };

  const availableDates = sessions.map(session => new Date(session.date));

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Link to={`/formations/${id}`} className="inline-flex items-center text-primary hover:underline mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux détails
            </Link>
            <h1 className="text-3xl font-bold mb-2">Réserver une session</h1>
            <p className="text-muted-foreground">
              Choisissez la date et l'heure qui vous conviennent pour {formation.title}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendrier */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    Sélectionner une date
                  </CardTitle>
                  <CardDescription>
                    Les dates disponibles sont mises en évidence
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border-0"
                    modifiers={{
                      available: availableDates
                    }}
                    modifiersStyles={{
                      available: { 
                        backgroundColor: 'hsl(var(--primary))',
                        color: 'hsl(var(--primary-foreground))',
                        fontWeight: 'bold'
                      }
                    }}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Sessions disponibles */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Sessions disponibles</CardTitle>
                  <CardDescription>
                    {selectedDate 
                      ? `Sessions du ${selectedDate.toLocaleDateString('fr-FR')}`
                      : "Sélectionnez une date pour voir les sessions disponibles"
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedDate ? (
                    <div className="space-y-4">
                      {getSessionsByDate(selectedDate).length > 0 ? (
                        getSessionsByDate(selectedDate).map((session) => (
                          <Card 
                            key={session.id} 
                            className={`cursor-pointer transition-colors ${
                              selectedSession === session.id 
                                ? 'border-primary bg-primary/5' 
                                : 'hover:border-primary/50'
                            }`}
                            onClick={() => setSelectedSession(session.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-3">
                                <div className="space-y-1">
                                  <div className="flex items-center space-x-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">{session.time}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    {session.type === "Présentiel" ? (
                                      <MapPin className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                      <Video className="h-4 w-4 text-muted-foreground" />
                                    )}
                                    <span className="text-sm text-muted-foreground">
                                      {session.location}
                                    </span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-bold text-lg text-primary">
                                    {session.price}
                                  </div>
                                  <Badge 
                                    variant={session.type === "Présentiel" ? "default" : "secondary"}
                                    className="mt-1"
                                  >
                                    {session.type}
                                  </Badge>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <Users className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">
                                    {session.spots} places disponibles sur {session.maxSpots}
                                  </span>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {Math.round((session.spots / session.maxSpots) * 100)}% disponible
                                </div>
                              </div>
                              
                              {session.spots < 5 && (
                                <div className="mt-2">
                                  <Badge variant="destructive" className="text-xs">
                                    Places limitées !
                                  </Badge>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>Aucune session disponible pour cette date</p>
                          <p className="text-sm">Sélectionnez une autre date ou contactez-nous</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Sélectionnez une date dans le calendrier</p>
                      <p className="text-sm">pour voir les sessions disponibles</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Actions */}
              {selectedSession && (
                <div className="mt-6 flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Session sélectionnée: {sessions.find(s => s.id === selectedSession)?.date} - {sessions.find(s => s.id === selectedSession)?.time}
                  </div>
                  <div className="space-x-4">
                    <Button variant="outline" onClick={() => setSelectedSession("")}>
                      Annuler
                    </Button>
                    <Link to={`/formations/${id}/enroll?session=${selectedSession}`}>
                      <Button onClick={handleBooking}>
                        Réserver cette session
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Informations complémentaires */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations pratiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Durée totale:</span>
                  <span className="font-medium">{formation.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span>Support de cours:</span>
                  <span className="font-medium">Inclus</span>
                </div>
                <div className="flex justify-between">
                  <span>Certificat:</span>
                  <span className="font-medium">Oui</span>
                </div>
                <div className="flex justify-between">
                  <span>Suivi post-formation:</span>
                  <span className="font-medium">3 mois</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conditions d'annulation</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>• Annulation gratuite jusqu'à 15 jours avant</p>
                <p>• 50% de remboursement entre 15 et 7 jours</p>
                <p>• Report possible jusqu'à 48h avant</p>
                <p>• Aucun remboursement moins de 7 jours avant</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;