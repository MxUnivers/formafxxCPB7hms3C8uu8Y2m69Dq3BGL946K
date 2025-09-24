import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { Plus, X } from "lucide-react";

const CreateFormation = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    level: "",
    price: "",
    category: "",
    maxParticipants: "",
    objectives: [""],
    prerequisites: [""],
    tags: []
  });

  const [newTag, setNewTag] = useState("");
  const [modules, setModules] = useState([
    { title: "", description: "", duration: "", lessons: [] }
  ]);

  const addObjective = () => {
    setFormData({...formData, objectives: [...formData.objectives, ""]});
  };

  const removeObjective = (index) => {
    const newObjectives = formData.objectives.filter((_, i) => i !== index);
    setFormData({...formData, objectives: newObjectives});
  };

  // const addPrerequisite = () => {
  //   setFormData({...formData, prerequisites: [...formData.prerequisites, ""]});
  // };
  
  // const removePrerequisite = (index) => {
  //   const newPrerequisites = formData.prerequisites.filter((_, i) => i !== index);
  //   setFormData({...formData, prerequisites: newPrerequisites});
  // };

  const addTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData({...formData, tags: [...formData.tags, newTag]});
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({...formData, tags: formData.tags.filter(tag => tag !== tagToRemove)});
  };

  const addModule = () => {
    setModules([...modules, { title: "", description: "", duration: "", lessons: [] }]);
  };

  const removeModule = (index) => {
    setModules(modules.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de création de formation
    console.log("Nouvelle formation:", { ...formData, modules });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container px-4 py-8 mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold">Créer une nouvelle formation</h1>
            <p className="text-muted-foreground">
              Remplissez les informations pour créer votre formation
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informations générales */}
            <Card>
              <CardHeader>
                <CardTitle>Informations générales</CardTitle>
                <CardDescription>
                  Les informations de base de votre formation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titre de la formation</Label>
                    <Input
                      id="title"
                      placeholder="Ex: React & TypeScript Masterclass"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="frontend">Développement Frontend</SelectItem>
                        <SelectItem value="backend">Développement Backend</SelectItem>
                        <SelectItem value="fullstack">Full Stack</SelectItem>
                        <SelectItem value="mobile">Développement Mobile</SelectItem>
                        <SelectItem value="devops">DevOps</SelectItem>
                        <SelectItem value="data">Data Science</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Décrivez votre formation..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Durée (heures)</Label>
                    <Input
                      id="duration"
                      type="number"
                      placeholder="40"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="level">Niveau</Label>
                    <Select value={formData.level} onValueChange={(value) => setFormData({...formData, level: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Niveau" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="debutant">Débutant</SelectItem>
                        <SelectItem value="intermediaire">Intermédiaire</SelectItem>
                        <SelectItem value="avance">Avancé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Prix (€)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="299"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxParticipants">Nombre maximum de participants</Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    placeholder="20"
                    value={formData.maxParticipants}
                    onChange={(e) => setFormData({...formData, maxParticipants: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Objectifs */}
            <Card>
              <CardHeader>
                <CardTitle>Objectifs pédagogiques</CardTitle>
                <CardDescription>
                  Définissez les objectifs d'apprentissage de votre formation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.objectives.map((objective, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Objectif d'apprentissage"
                      value={objective}
                      onChange={(e) => {
                        const newObjectives = [...formData.objectives];
                        newObjectives[index] = e.target.value;
                        setFormData({...formData, objectives: newObjectives});
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeObjective(index)}
                      disabled={formData.objectives.length === 1}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addObjective}>
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un objectif
                </Button>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
                <CardDescription>
                  Ajoutez des mots-clés pour faciliter la recherche
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ajouter un tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag}>
                    Ajouter
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                      {tag} <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Modules */}
            <Card>
              <CardHeader>
                <CardTitle>Modules de formation</CardTitle>
                <CardDescription>
                  Structurez votre formation en modules
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {modules.map((module, index) => (
                  <div key={index} className="p-4 space-y-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Module {index + 1}</h4>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeModule(index)}
                        disabled={modules.length === 1}
                      >
                        Supprimer
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <Input
                        placeholder="Titre du module"
                        value={module.title}
                        onChange={(e) => {
                          const newModules = [...modules];
                          newModules[index].title = e.target.value;
                          setModules(newModules);
                        }}
                      />
                      <Input
                        placeholder="Durée (ex: 4h)"
                        value={module.duration}
                        onChange={(e) => {
                          const newModules = [...modules];
                          newModules[index].duration = e.target.value;
                          setModules(newModules);
                        }}
                      />
                    </div>
                    <Textarea
                      placeholder="Description du module"
                      value={module.description}
                      onChange={(e) => {
                        const newModules = [...modules];
                        newModules[index].description = e.target.value;
                        setModules(newModules);
                      }}
                      rows={3}
                    />
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addModule}>
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un module
                </Button>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline">
                Enregistrer comme brouillon
              </Button>
              <Button type="submit">
                Publier la formation
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateFormation;