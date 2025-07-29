import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { BookOpen, Users, Calendar, Award, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "./../assets/react.svg";
// import heroImage from "./ /hero-education.jpg";

const Index = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Formations Complètes",
      description: "Accédez à des formations de qualité créées par des experts développeurs"
    },
    {
      icon: Users,
      title: "Suivi Personnalisé",
      description: "Bénéficiez d'un accompagnement individuel tout au long de votre apprentissage"
    },
    {
      icon: Calendar,
      title: "Planning Flexible",
      description: "Consultez le calendrier et choisissez vos créneaux de formation"
    },
    {
      icon: Award,
      title: "Certificats",
      description: "Obtenez des certificats reconnus pour valider vos compétences"
    }
  ];

  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Développeuse Frontend",
      content: "Les formations m'ont permis de maîtriser React en quelques semaines seulement !",
      rating: 5
    },
    {
      name: "Pierre Martin",
      role: "Développeur Backend",
      content: "Une approche pratique et efficace. Les exercices sont parfaitement adaptés.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
        
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Formez-vous au Développement
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Rejoignez notre plateforme de formation et développez vos compétences en programmation 
            avec des cours pratiques et des exercices adaptés à votre niveau.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/formations">
              <Button variant="hero" size="lg" className="w-full sm:w-auto">
                Découvrir les Formations
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/calendar">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Calendar className="mr-2 h-5 w-5" />
                Voir le Calendrier
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Pourquoi Choisir FormationPro ?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Une plateforme moderne conçue pour optimiser votre apprentissage et votre progression
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ce que disent nos étudiants</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Prêt à commencer votre formation ?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Rejoignez des centaines d'étudiants qui ont déjà transformé leur carrière grâce à nos formations
          </p>
          <Link to="/student">
            <Button variant="secondary" size="lg">
              Créer mon compte étudiant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;