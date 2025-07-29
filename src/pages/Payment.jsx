import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/Navigation";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Shield, CheckCircle } from "lucide-react";

const Payment = () => {
  const { id } = useParams();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    billingAddress: "",
    city: "",
    postalCode: "",
    country: "FR"
  });

  // Données simulées
  const orderSummary = {
    formation: "React & TypeScript Masterclass",
    price: 299,
    vat: 59.8,
    total: 358.8,
    student: {
      name: "Jean Dupont",
      email: "jean.dupont@email.com"
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de paiement
    console.log("Paiement:", paymentData);
    // Redirection vers page de confirmation
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link to={`/formations/${id}/enroll`} className="inline-flex items-center text-primary hover:underline mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l'inscription
            </Link>
            <h1 className="text-3xl font-bold mb-2">Finaliser votre inscription</h1>
            <p className="text-muted-foreground">
              Complétez votre paiement pour confirmer votre inscription
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulaire de paiement */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Méthode de paiement */}
                <Card>
                  <CardHeader>
                    <CardTitle>Méthode de paiement</CardTitle>
                    <CardDescription>
                      Choisissez votre mode de paiement préféré
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card 
                        className={`cursor-pointer border-2 ${paymentMethod === 'card' ? 'border-primary' : 'border-muted'}`}
                        onClick={() => setPaymentMethod('card')}
                      >
                        <CardContent className="p-4 text-center">
                          <CreditCard className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <div className="font-medium">Carte bancaire</div>
                          <div className="text-sm text-muted-foreground">Visa, Mastercard</div>
                        </CardContent>
                      </Card>
                      
                      <Card 
                        className={`cursor-pointer border-2 ${paymentMethod === 'transfer' ? 'border-primary' : 'border-muted'}`}
                        onClick={() => setPaymentMethod('transfer')}
                      >
                        <CardContent className="p-4 text-center">
                          <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <div className="font-medium">Virement bancaire</div>
                          <div className="text-sm text-muted-foreground">SEPA</div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>

                {/* Informations de carte (si carte sélectionnée) */}
                {paymentMethod === 'card' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Informations de carte</CardTitle>
                      <CardDescription>
                        Vos données sont sécurisées et cryptées
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Numéro de carte</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={paymentData.cardNumber}
                          onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Date d'expiration</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/AA"
                            value={paymentData.expiryDate}
                            onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={paymentData.cvv}
                            onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Nom sur la carte</Label>
                        <Input
                          id="cardName"
                          placeholder="Jean Dupont"
                          value={paymentData.cardName}
                          onChange={(e) => setPaymentData({...paymentData, cardName: e.target.value})}
                          required
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Adresse de facturation */}
                <Card>
                  <CardHeader>
                    <CardTitle>Adresse de facturation</CardTitle>
                    <CardDescription>
                      Adresse pour la facture
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="billingAddress">Adresse</Label>
                      <Input
                        id="billingAddress"
                        placeholder="123 Rue de la Formation"
                        value={paymentData.billingAddress}
                        onChange={(e) => setPaymentData({...paymentData, billingAddress: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">Ville</Label>
                        <Input
                          id="city"
                          placeholder="Paris"
                          value={paymentData.city}
                          onChange={(e) => setPaymentData({...paymentData, city: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Code postal</Label>
                        <Input
                          id="postalCode"
                          placeholder="75001"
                          value={paymentData.postalCode}
                          onChange={(e) => setPaymentData({...paymentData, postalCode: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Pays</Label>
                        <Select value={paymentData.country} onValueChange={(value) => setPaymentData({...paymentData, country: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="FR">France</SelectItem>
                            <SelectItem value="BE">Belgique</SelectItem>
                            <SelectItem value="CH">Suisse</SelectItem>
                            <SelectItem value="CA">Canada</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button type="submit" className="w-full" size="lg">
                  <Shield className="h-4 w-4 mr-2" />
                  Confirmer le paiement
                </Button>
              </form>
            </div>

            {/* Récapitulatif de commande */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Récapitulatif de commande</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">{orderSummary.formation}</h3>
                    <p className="text-sm text-muted-foreground">
                      Étudiant: {orderSummary.student.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Email: {orderSummary.student.email}
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Formation</span>
                      <span>{orderSummary.price}€</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>TVA (20%)</span>
                      <span>{orderSummary.vat}€</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{orderSummary.total}€</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-muted bg-muted/20">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium mb-1">Paiement sécurisé</div>
                      <div className="text-muted-foreground">
                        Vos données sont protégées par un cryptage SSL 256 bits
                      </div>
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

export default Payment;