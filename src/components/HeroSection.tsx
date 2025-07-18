import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, Smartphone, Wifi, Zap } from "lucide-react";
import heroImage from "@/assets/homeflow-hero.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-primary-glow rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Zap className="w-4 h-4" />
                AI-Powered Smart Home
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  HomeFlow
                </span>
                <br />
                <span className="text-foreground">
                  Το Σπίτι που Ξέρει
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Το έξυπνο app που καταλαβαίνει πότε πλησιάζεις στο σπίτι και εκτελεί αυτόματα 
                όλες τις εντολές που έχεις προγραμματίσει - χωρίς να κάνεις τίποτα.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-6">
                <Smartphone className="w-5 h-5 mr-2" />
                Ξεκίνα Τώρα
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-primary/30 hover:border-primary">
                <Home className="w-5 h-5 mr-2" />
                Δες Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Συσκευές</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">AI</div>
                <div className="text-sm text-muted-foreground">Αυτομάθηση</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-glow">24/7</div>
                <div className="text-sm text-muted-foreground">Έλεγχος</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative animate-slide-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="HomeFlow Smart Home" 
                className="w-full rounded-3xl shadow-2xl animate-glow-pulse"
              />
              
              {/* Floating Cards */}
              <Card className="absolute top-4 right-4 p-4 bg-card/90 backdrop-blur-sm border-primary/20 animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">A/C: 25°C</span>
                </div>
              </Card>
              
              <Card className="absolute bottom-8 left-4 p-4 bg-card/90 backdrop-blur-sm border-accent/20 animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Σπίτι σε 5'</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};