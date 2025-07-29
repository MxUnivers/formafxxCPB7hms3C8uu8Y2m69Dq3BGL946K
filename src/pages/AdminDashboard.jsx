import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import { Plus, Edit, Trash2, Users, BookOpen, Calendar, TrendingUp, Eye } from "lucide-react";

const AdminDashboard = () => {
  const stats = {
    totalStudents: 142,
    activeCourses: 8,
    totalRevenue: 12450,
    completionRate: 87
  };

  const courses = [
    {
      id: 1,
      title: "React & TypeScript Masterclass",
      students: 45,
      status: "Actif",
      price: "299€",
      createdDate: "2024-01-15",
      completionRate: 78
    },
    {
      id: 2,
      title: "Node.js & Express Backend",
      students: 32,
      status: "Actif",
      price: "249€",
      createdDate: "2024-01-20",
      completionRate: 65
    },
    {
      id: 3,
      title: "Python pour Débutants",
      students: 67,
      status: "Actif",
      price: "199€",
      createdDate: "2024-01-10",
      completionRate: 92
    }
  ];

  const recentStudents = [
    {
      name: "Marie Dubois",
      email: "marie.dubois@email.com",
      course: "React & TypeScript",
      enrolledDate: "2024-02-10",
      progress: 85
    },
    {
      name: "Pierre Martin",
      email: "pierre.martin@email.com",
      course: "Node.js Backend",
      enrolledDate: "2024-02-09",
      progress: 23
    },
    {
      name: "Sophie Laurent",
      email: "sophie.laurent@email.com",
      course: "Python Débutant",
      enrolledDate: "2024-02-08",
      progress: 67
    }
  ];

  const AddCourseDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle Formation
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Créer une nouvelle formation</DialogTitle>
          <DialogDescription>
            Remplissez les informations ci-dessous pour créer une nouvelle formation.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Titre de la formation</Label>
            <Input id="title" placeholder="Ex: React Avancé..." />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Description détaillée de la formation..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="price">Prix (€)</Label>
              <Input id="price" type="number" placeholder="299" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="duration">Durée (heures)</Label>
              <Input id="duration" type="number" placeholder="40" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="level">Niveau</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un niveau" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Débutant</SelectItem>
                <SelectItem value="intermediate">Intermédiaire</SelectItem>
                <SelectItem value="advanced">Avancé</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline">Annuler</Button>
          <Button>Créer la formation</Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Administration</h1>
            <p className="text-muted-foreground">Gérez vos formations et suivez les performances</p>
          </div>
          <AddCourseDialog />
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Étudiants totaux</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">+12% ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Formations actives</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeCourses}</div>
              <p className="text-xs text-muted-foreground">+2 nouvelles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenus totaux</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRevenue}€</div>
              <p className="text-xs text-muted-foreground">+8% ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux de completion</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completionRate}%</div>
              <p className="text-xs text-muted-foreground">+3% ce mois</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Courses Management */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Mes Formations</h2>
            </div>
            <div className="space-y-4">
              {courses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <CardDescription>
                          Créé le {new Date(course.createdDate).toLocaleDateString('fr-FR')}
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          Voir
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-1" />
                          Modifier
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Étudiants</p>
                        <p className="font-medium">{course.students}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Prix</p>
                        <p className="font-medium">{course.price}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Completion</p>
                        <p className="font-medium">{course.completionRate}%</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Badge variant="secondary">{course.status}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Students */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Étudiants récents</h2>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Inscriptions récentes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentStudents.map((student, index) => (
                  <div key={index} className="border-b border-border pb-3 last:border-b-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                        <p className="text-sm text-primary">{student.course}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm">
                        <span>Progression</span>
                        <span>{student.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 mt-1">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Inscrit le {new Date(student.enrolledDate).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter un exercice
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Planifier une session
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Voir tous les étudiants
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;