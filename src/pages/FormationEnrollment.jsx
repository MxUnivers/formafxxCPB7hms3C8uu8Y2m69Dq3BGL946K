import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Navigation from "@/components/Navigation";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Users, Euro } from "lucide-react";

const FormationEnrollment = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    experience: "",
    motivation: "",
    specialNeeds: "",
    newsletter: false,
    terms: false
  });

  // Données simulées de la formation
  const formation = {
    title: "React & TypeScript Masterclass",
    price: "299€",
    duration: "40 heures",
    startDate: "15 Mars 2024",
    maxParticipants: 20,
    currentParticipants: 12
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.terms) {
      alert("Veuillez accepter les conditions générales");
      return;
    }
    // Logique d'inscription
    console.log("Inscription à la formation:", formData);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link to={`/formations/${id}`} className="inline-flex items-center text-primary hover:underline mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux détails
            </Link>
            <h1 className="text-3xl font-bold mb-2">Inscription à la formation</h1>
            <p className="text-muted-foreground">
              Complétez ce formulaire pour vous inscrire à la formation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulaire d'inscription */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Informations personnelles */}
                <Card>
                  <CardHeader>
                    <CardTitle>Informations personnelles</CardTitle>
                    <CardDescription>
                      Vos informations de contact
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input
                          id="firstName"
                          placeholder="Jean"
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input
                          id="lastName"
                          placeholder="Dupont"
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="jean.dupont@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+33 6 12 34 56 78"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Informations professionnelles */}
                <Card>
                  <CardHeader>
                    <CardTitle>Informations professionnelles</CardTitle>
                    <CardDescription>
                      Votre contexte professionnel (optionnel)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Entreprise</Label>
                        <Input
                          id="company"
                          placeholder="Nom de votre entreprise"
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="position">Poste</Label>
                        <Input
                          id="position"
                          placeholder="Votre poste actuel"
                          value={formData.position}
                          onChange={(e) => setFormData({...formData, position: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="experience">Niveau d'expérience</Label>
                      <Select value={formData.experience} onValueChange={(value) => setFormData({...formData, experience: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez votre niveau" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="debutant">Débutant (0-1 an)</SelectItem>
                          <SelectItem value="junior">Junior (1-3 ans)</SelectItem>
                          <SelectItem value="intermediaire">Intermédiaire (3-5 ans)</SelectItem>
                          <SelectItem value="senior">Senior (5+ ans)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Motivation et besoins */}
                <Card>
                  <CardHeader>
                    <CardTitle>Motivation et besoins spécifiques</CardTitle>
                    <CardDescription>
                      Aidez-nous à personnaliser votre expérience
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="motivation">Pourquoi souhaitez-vous suivre cette formation ?</Label>
                      <Textarea
                        id="motivation"
                        placeholder="Décrivez vos objectifs et motivations..."
                        value={formData.motivation}
                        onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                        rows={4}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="specialNeeds">Besoins spécifiques ou contraintes</Label>
                      <Textarea
                        id="specialNeeds"
                        placeholder="Accessibilité, horaires préférés, contraintes techniques..."
                        value={formData.specialNeeds}
                        onChange={(e) => setFormData({...formData, specialNeeds: e.target.value})}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Conditions */}
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newsletter"
                        checked={formData.newsletter}
                        onCheckedChange={(checked) => setFormData({...formData, newsletter: checked})}
                      />
                      <Label htmlFor="newsletter" className="text-sm">
                        Je souhaite recevoir des informations sur les nouvelles formations
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.terms}
                        onCheckedChange={(checked) => setFormData({...formData, terms: checked})}
                        required
                      />
                      <Label htmlFor="terms" className="text-sm">
                        J'accepte les{" "}
                        <Link to="/terms" className="text-primary hover:underline">
                          conditions générales
                        </Link>{" "}
                        et la{" "}
                        <Link to="/privacy" className="text-primary hover:underline">
                          politique de confidentialité
                        </Link>
                        *
                      </Label>
                    </div>
                  </CardContent>
                </Card>

                <Button type="submit" className="w-full" size="lg">
                  Procéder au paiement
                </Button>
              </form>
            </div>

            {/* Récapitulatif */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Récapitulatif</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="font-medium">{formation.title}</h3>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Euro className="h-4 w-4 text-muted-foreground" />
                        <span>Prix</span>
                      </div>
                      <span className="font-medium">{formation.price}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Durée</span>
                      </div>
                      <span>{formation.duration}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Début</span>
                      </div>
                      <span>{formation.startDate}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>Places</span>
                      </div>
                      <span>{formation.currentParticipants}/{formation.maxParticipants}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-success/20 bg-success/5">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success mb-2">
                      {formation.maxParticipants - formation.currentParticipants}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      places restantes
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormationEnrollment;