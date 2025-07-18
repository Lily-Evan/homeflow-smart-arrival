import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Smartphone, 
  Mail, 
  ArrowRight, 
  Star, 
  Users, 
  Award,
  Zap,
  Shield,
  Clock
} from "lucide-react";
import { useState } from "react";

const benefits = [
  {
    icon: Zap,
    title: "Instant Setup",
    description: "Εγκατάσταση σε 5 λεπτά"
  },
  {
    icon: Shield,
    title: "100% Ασφαλές",
    description: "Κρυπτογράφηση τελευταίας γενιάς"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Υποστήριξη όλο το 24ωρο"
  }
];

export const CTASection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/6 w-80 h-80 bg-primary rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/6 w-72 h-72 bg-accent rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary-glow rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="space-y-6 mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Star className="w-4 h-4" />
              Έτοιμος για το Μέλλον;
            </div>
            
            <h2 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="text-foreground">Κάνε το Σπίτι σου </span>
              <span className="bg-gradient-primary bg-clip-text text-transparent">Έξυπνο</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Γίνε μέλος των πρώτων που θα ζήσουν την εμπειρία του αυτόματου σπιτιού. 
              Ξεκίνα δωρεάν και ανακάλυψε πώς η τεχνολογία μπορεί να αλλάξει την καθημερινότητά σου.
            </p>
          </div>

          {/* Email signup */}
          <Card className="max-w-md mx-auto mb-12 bg-card/90 backdrop-blur-sm border-primary/20">
            <CardContent className="p-6">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Το email σου"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-background/50 border-border/50"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                    size="lg"
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Κάνε Εγγραφή Δωρεάν
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Καμία δέσμευση • Ακύρωση ανά πάσα στιγμή
                  </p>
                </form>
              ) : (
                <div className="text-center space-y-3 animate-fade-in">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                    <Star className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground">Ευχαριστούμε!</h3>
                  <p className="text-sm text-muted-foreground">
                    Θα σου στείλουμε τις πρώτες πληροφορίες σύντομα.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-gradient-accent hover:shadow-accent transition-all duration-300 text-lg px-8 py-6">
              <Smartphone className="w-5 h-5 mr-2" />
              Download App
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-primary/30 hover:border-primary">
              Δες Live Demo
            </Button>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-card/30 backdrop-blur-sm border border-border/30 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <benefit.icon className="w-5 h-5 text-primary flex-shrink-0" />
                <div className="text-left">
                  <div className="font-semibold text-sm text-foreground">{benefit.title}</div>
                  <div className="text-xs text-muted-foreground">{benefit.description}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Social proof */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="text-sm">10,000+ early adopters</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm">4.9/5 rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span className="text-sm">Winner IoT Innovation 2024</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};