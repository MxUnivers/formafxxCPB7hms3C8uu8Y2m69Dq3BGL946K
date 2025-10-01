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
      <section className="relative px-4 py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
        
        <div className="container relative z-10 mx-auto text-center">
          <h1 className="mb-6 text-5xl font-bold text-transparent md:text-6xl bg-gradient-to-r from-primary to-accent bg-clip-text">
            Formez-vous au Développement
          </h1>
          <p className="max-w-2xl mx-auto mb-8 text-xl text-muted-foreground">
            Rejoignez notre plateforme de formation et développez vos compétences en programmation 
            avec des cours pratiques et des exercices adaptés à votre niveau.
          </p>
          
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/formations">
              <Button variant="hero" size="lg" className="w-full sm:w-auto">
                Découvrir les Formations
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/calendar">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Calendar className="w-5 h-5 mr-2" />
                Voir le Calendrier
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 bg-card/50">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Pourquoi Choisir FormationPro ?</h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Une plateforme moderne conçue pour optimiser votre apprentissage et votre progression
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10">
                    <feature.icon className="w-6 h-6 text-primary" />
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
      <section className="px-4 py-16">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Ce que disent nos étudiants</h2>
          </div>
          
          <div className="grid max-w-4xl grid-cols-1 gap-6 mx-auto md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="transition-shadow hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="mb-4 italic text-muted-foreground">"{testimonial.content}"</p>
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
      <section className="px-4 py-16 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground">
            Prêt à commencer votre formation ?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-primary-foreground/80">
            Rejoignez des centaines d'étudiants qui ont déjà transformé leur carrière grâce à nos formations
          </p>
          <Link to="/student">
            <Button variant="secondary" size="lg">
              Créer mon compte étudiant
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;