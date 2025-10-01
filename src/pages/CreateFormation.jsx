// pages/admin/CreateFormation.jsx

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { Plus, X, Image as ImageIcon } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { handleImageUploadCloudOnly } from "../actions/uploads/UploadeFile";
import { createFormation } from "../actions/request/FormationAction";

// Utilitaires

const CreateFormation = () => {
  const  disptach  = useDispatch();
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "", // Quill → HTML
    duration: "",
    level: "",
    price: "",
    category: "",
    technologies: [],
    instructor: { name: "", expertise: "" },
    objectives: [""],
    tags: []
  });


   // --- Fonction pour gérer les objectifs ---
  const addObjective = () => {
    setFormData(prev => ({
      ...prev,
      objectives: [...prev.objectives, ""]
    }));
  };

  const removeObjective = (index) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives.filter((_, i) => i !== index)
    }));
  };


  // --- Gestion des tags ---
  const addTag = () => {
    const trimmed = newTag.trim();
    if (trimmed && !formData.tags.includes(trimmed)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, trimmed]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const [newTag, setNewTag] = useState("");
  const [modules, setModules] = useState([
    { title: "", description: "", isPaid: false, order: 1, lessons: [] }
  ]);

  // === VALIDATION DES CHAMPS ===
  const validateField = (value, minLength, maxLength, fieldName) => {
    if (value.length < minLength) {
      toast.error(`${fieldName} doit faire au moins ${minLength} caractères.`);
      return false;
    }
    if (value.length > maxLength) {
      toast.error(`${fieldName} ne peut pas dépasser ${maxLength} caractères.`);
      return false;
    }
    return true;
  };

  // === GESTION DE L'IMAGE ===
  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = await handleImageUploadCloudOnly(file);
    if (url) setThumbnail(url);
  };

  // === MODULES / LEÇONS / EXERCICES ===
  const addModule = () => {
    setModules(prev => [
      ...prev,
      { title: "", description: "", isPaid: false, order: prev.length + 1, lessons: [] }
    ]);
  };

  const removeModule = (index) => {
    setModules(prev => prev.filter((_, i) => i !== index));
  };

  const addLesson = (moduleIndex) => {
    const newModules = [...modules];
    if (!newModules[moduleIndex].lessons) newModules[moduleIndex].lessons = [];
    newModules[moduleIndex].lessons.push({
      title: "",
      description: "",
      videos: [],
      images: [],
      duration: "",
      order: newModules[moduleIndex].lessons.length + 1,
      exercises: []
    });
    setModules(newModules);
  };

  const removeLesson = (moduleIndex, lessonIndex) => {
    const newModules = [...modules];
    newModules[moduleIndex].lessons.splice(lessonIndex, 1);
    setModules(newModules);
  };

  const addExercise = (moduleIndex, lessonIndex) => {
    const newModules = [...modules];
    if (!newModules[moduleIndex].lessons[lessonIndex].exercises)
      newModules[moduleIndex].lessons[lessonIndex].exercises = [];

    newModules[moduleIndex].lessons[lessonIndex].exercises.push({
      title: "",
      description: "",
      type: "Séance pratique",
      solution: "",
      difficulty: "Moyen"
    });
    setModules(newModules);
  };

  const removeExercise = (moduleIndex, lessonIndex, exerciseIndex) => {
    const newModules = [...modules];
    newModules[moduleIndex].lessons[lessonIndex].exercises.splice(exerciseIndex, 1);
    setModules(newModules);
  };

  

  // === SOUMISSION FINALE ===
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation basique
    if (!validateField(formData.title, 5, 100, "Titre")) return;
    if (!validateField(formData.description, 20, 2000, "Description")) return;
    if (!thumbnail) {
      toast.error("Veuillez ajouter une image de couverture.");
      return;
    }

    const payload = {
      title: formData.title.trim(),
      description: formData.description,
      category: formData.category,
      level: formData.level,
      duration: Number(formData.duration),
      price: Number(formData.price),
      technologies: formData.tags,
      instructor: {
        name: formData.instructor.name.trim() || "Formateur",
        expertise: formData.instructor.expertise.trim() || "Non spécifiée"
      },
      image: thumbnail,
      modules: modules.map((mod, idx) => ({
        title: mod.title.trim(),
        description: mod.description,
        isPaid: !!mod.isPaid,
        order: idx + 1,
        lessons: (mod.lessons || []).map((lesson, lIdx) => ({
          title: lesson.title.trim(),
          description: lesson.description,
          videos: lesson.videos || [],
          images: lesson.images || [],
          duration: lesson.duration ? Number(lesson.duration) : undefined,
          order: lIdx + 1,
          exercises: (lesson.exercises || []).map(ex => ({
            title: ex.title.trim(),
            description: ex.description,
            type: ex.type,
            solution: ex.solution,
            difficulty: ex.difficulty,
            estimatedTime: ex.estimatedTime ? Number(ex.estimatedTime) : undefined
          }))
        }))
      }))
    };

    try {
      setLoading(true);
      disptach(createFormation(payload)) // Action Redux
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container max-w-6xl px-4 py-8 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Créer une nouvelle formation</h1>
          <p className="text-muted-foreground">Remplissez les informations pour créer votre formation</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Informations générales */}
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
              <CardDescription>Les informations de base de votre formation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre de la formation</Label>
                  <Input
                    id="title"
                    placeholder="React & TypeScript Masterclass"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    maxLength={100}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Catégorie</Label>
                  <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                    <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frontend">Frontend</SelectItem>
                      <SelectItem value="backend">Backend</SelectItem>
                      <SelectItem value="fullstack">Full Stack</SelectItem>
                      <SelectItem value="mobile">Mobile</SelectItem>
                      <SelectItem value="devops">DevOps</SelectItem>
                      <SelectItem value="data">Data Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <ReactQuill
                  theme="snow"
                  value={formData.description}
                  onChange={(content) => setFormData({ ...formData, description: content })}
                  placeholder="Décrivez votre formation..."
                  style={{ height: '200px', marginBottom: '30px' }}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Durée (heures)</Label>
                  <Input
                    type="number"
                    placeholder="40"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Niveau</Label>
                  <Select value={formData.level} onValueChange={(v) => setFormData({ ...formData, level: v })}>
                    <SelectTrigger><SelectValue placeholder="Niveau" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Débutant">Débutant</SelectItem>
                      <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
                      <SelectItem value="Avancé">Avancé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Prix (€)</Label>
                  <Input
                    type="number"
                    placeholder="299"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Image de couverture */}
              <div className="space-y-2">
                <Label>Image de couverture</Label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                  {thumbnail && (
                    <img src={thumbnail} alt="Aperçu" className="object-cover w-20 h-20 rounded" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Objectifs */}
          <Card>
            <CardHeader>
              <CardTitle>Objectifs pédagogiques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.objectives.map((obj, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    placeholder="Ex: Comprendre les hooks"
                    value={obj}
                    onChange={(e) => {
                      const newObjs = [...formData.objectives];
                      newObjs[idx] = e.target.value;
                      setFormData({ ...formData, objectives: newObjs });
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeObjective(idx)}
                    disabled={formData.objectives.length === 1}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addObjective}>
                <Plus className="w-4 h-4 mr-2" /> Ajouter un objectif
              </Button>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Technologies / Mots-clés</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Ajouter une technologie"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag}>Ajouter</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, i) => (
                  <Badge key={i} variant="secondary" onClick={() => removeTag(tag)}>
                    {tag} <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Modules imbriqués */}
          <Card>
            <CardHeader>
              <CardTitle>Structure de la formation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {modules.map((mod, modIdx) => (
                <div key={modIdx} className="p-5 space-y-4 border rounded-lg bg-muted/30">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Module {modIdx + 1}</h4>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeModule(modIdx)}
                      disabled={modules.length === 1}
                    >
                      Supprimer
                    </Button>
                  </div>

                  <Input
                    placeholder="Titre du module"
                    value={mod.title}
                    onChange={(e) => {
                      const newMods = [...modules];
                      newMods[modIdx].title = e.target.value;
                      setModules(newMods);
                    }}
                  />

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={mod.isPaid}
                      onChange={(e) => {
                        const newMods = [...modules];
                        newMods[modIdx].isPaid = e.target.checked;
                        setModules(newMods);
                      }}
                    />
                    <Label>Module payant</Label>
                  </div>

                  <ReactQuill
                    theme="snow"
                    value={mod.description}
                    onChange={(content) => {
                      const newMods = [...modules];
                      newMods[modIdx].description = content;
                      setModules(newMods);
                    }}
                    placeholder="Description du module"
                    style={{ height: '100px', marginBottom: '30px' }}
                  />

                  {/* Leçons */}
                  <div className="mt-4 space-y-4">
                    <Button type="button" variant="outline" size="sm" onClick={() => addLesson(modIdx)}>
                      <Plus className="w-4 h-4 mr-1" /> Ajouter une leçon
                    </Button>

                    {(mod.lessons || []).map((lesson, lessonIdx) => (
                      <div key={lessonIdx} className="p-4 border rounded bg-card">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Leçon {lessonIdx + 1}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeLesson(modIdx, lessonIdx)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>

                        <Input
                          placeholder="Titre de la leçon"
                          value={lesson.title}
                          onChange={(e) => {
                            const newMods = [...modules];
                            newMods[modIdx].lessons[lessonIdx].title = e.target.value;
                            setModules(newMods);
                          }}
                        />

                        <ReactQuill
                          theme="snow"
                          value={lesson.description}
                          onChange={(content) => {
                            const newMods = [...modules];
                            newMods[modIdx].lessons[lessonIdx].description = content;
                            setModules(newMods);
                          }}
                          placeholder="Contenu de la leçon"
                          style={{ height: '100px', marginBottom: '30px' }}
                        />

                        {/* Exercices */}
                        <div className="mt-3">
                          <Button
                            type="button"
                            variant="outline"
                            size="xs"
                            onClick={() => addExercise(modIdx, lessonIdx)}
                          >
                            <Plus className="w-3 h-3 mr-1" /> Ajouter un exercice
                          </Button>

                          {(lesson.exercises || []).map((ex, exIdx) => (
                            <div key={exIdx} className="p-3 mt-2 text-sm border rounded bg-background">
                              <Input
                                placeholder="Titre de l'exercice"
                                value={ex.title}
                                onChange={(e) => {
                                  const newMods = [...modules];
                                  newMods[modIdx].lessons[lessonIdx].exercises[exIdx].title = e.target.value;
                                  setModules(newMods);
                                }}
                              />
                              <ReactQuill
                                theme="snow"
                                value={ex.description}
                                onChange={(content) => {
                                  const newMods = [...modules];
                                  newMods[modIdx].lessons[lessonIdx].exercises[exIdx].description = content;
                                  setModules(newMods);
                                }}
                                placeholder="Énoncé"
                                style={{ height: '80px', marginBottom: '10px' }}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeExercise(modIdx, lessonIdx, exIdx)}
                              >
                                Supprimer
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <Button type="button" variant="outline" onClick={addModule}>
                <Plus className="w-4 h-4 mr-2" /> Ajouter un module
              </Button>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline">Enregistrer comme brouillon</Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Publication..." : "Publier la formation"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFormation;