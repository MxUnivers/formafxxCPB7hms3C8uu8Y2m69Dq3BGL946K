import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import { BookOpen, PlayCircle, CheckCircle, Clock, Award, TrendingUp } from "lucide-react";

const StudentDashboard = () => {
  const studentData = {
    name: "Marie Dubois",
    email: "marie.dubois@email.com",
    totalCourses: 3,
    completedCourses: 1,
    totalHours: 45,
    completedHours: 25
  };

  const enrolledCourses = [
    {
      id: 1,
      title: "React & TypeScript Masterclass",
      progress: 85,
      totalLessons: 15,
      completedLessons: 13,
      nextLesson: "Hooks personnalisés",
      status: "En cours",
      dueDate: "2024-02-20"
    },
    {
      id: 2,
      title: "Node.js & Express Backend",
      progress: 45,
      totalLessons: 12,
      completedLessons: 5,
      nextLesson: "Middleware Express",
      status: "En cours",
      dueDate: "2024-03-15"
    },
    {
      id: 3,
      title: "Python pour Débutants",
      progress: 100,
      totalLessons: 10,
      completedLessons: 10,
      nextLesson: "Formation terminée",
      status: "Terminé",
      dueDate: "2024-01-30"
    }
  ];

  const upcomingExercises = [
    {
      id: 1,
      title: "Créer un composant React personnalisé",
      course: "React & TypeScript Masterclass",
      dueDate: "2024-02-16",
      difficulty: "Intermédiaire",
      estimatedTime: "2 heures"
    },
    {
      id: 2,
      title: "API REST avec Express",
      course: "Node.js & Express Backend",
      dueDate: "2024-02-18",
      difficulty: "Débutant",
      estimatedTime: "3 heures"
    }
  ];

  const achievements = [
    {
      title: "Premier cours terminé",
      description: "Félicitations ! Vous avez terminé votre première formation",
      icon: Award,
      earned: true
    },
    {
      title: "Étudiant assidu",
      description: "Connecté 7 jours consécutifs",
      icon: TrendingUp,
      earned: true
    },
    {
      title: "Expert React",
      description: "Maîtrisez tous les concepts avancés de React",
      icon: BookOpen,
      earned: false
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Bonjour, {studentData.name} !</h1>
          <p className="text-muted-foreground">Continuez votre apprentissage là où vous vous êtes arrêté</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Formations inscrites</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentData.totalCourses}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Formations terminées</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentData.completedCourses}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Heures d'apprentissage</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentData.completedHours}h</div>
              <p className="text-xs text-muted-foreground">sur {studentData.totalHours}h</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux de completion</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round((studentData.completedHours / studentData.totalHours) * 100)}%
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Courses */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Mes Formations</h2>
            <div className="space-y-4">
              {enrolledCourses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <CardDescription>
                          {course.completedLessons}/{course.totalLessons} leçons terminées
                        </CardDescription>
                      </div>
                      <Badge 
                        variant={course.status === "Terminé" ? "default" : "secondary"}
                        className={course.status === "Terminé" ? "bg-success text-success-foreground" : ""}
                      >
                        {course.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progression</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="w-full" />
                      </div>
                      
                      {course.status !== "Terminé" && (
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium">Prochaine leçon:</p>
                            <p className="text-sm text-muted-foreground">{course.nextLesson}</p>
                          </div>
                          <Button size="sm">
                            <PlayCircle className="mr-2 h-4 w-4" />
                            Continuer
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Exercises */}
            <Card>
              <CardHeader>
                <CardTitle>Exercices à venir</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingExercises.map((exercise) => (
                  <div key={exercise.id} className="border-l-4 border-primary pl-4">
                    <h4 className="font-medium">{exercise.title}</h4>
                    <p className="text-sm text-muted-foreground">{exercise.course}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge 
                        variant="outline" 
                        className={getDifficultyColor(exercise.difficulty)}
                      >
                        {exercise.difficulty}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{exercise.estimatedTime}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Échéance: {new Date(exercise.dueDate).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Mes réussites</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start space-x-3 p-3 rounded-lg ${
                      achievement.earned ? 'bg-success/10' : 'bg-muted/30'
                    }`}
                  >
                    <achievement.icon 
                      className={`h-5 w-5 mt-0.5 ${
                        achievement.earned ? 'text-success' : 'text-muted-foreground'
                      }`} 
                    />
                    <div>
                      <p className={`font-medium text-sm ${
                        achievement.earned ? 'text-success' : 'text-muted-foreground'
                      }`}>
                        {achievement.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;