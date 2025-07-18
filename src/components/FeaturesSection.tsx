import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MapPin, 
  Thermometer, 
  Music, 
  Bath, 
  Car, 
  Smartphone,
  Brain,
  Shield,
  Clock,
  Zap,
  Wifi,
  Home
} from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Γεωγραφική Ανίχνευση",
    description: "Καταλαβαίνει πότε πλησιάζεις στο σπίτι μέσω GPS και Wi-Fi proximity",
    color: "text-primary",
    delay: "0s"
  },
  {
    icon: Thermometer,
    title: "Κλιματικός Έλεγχος",
    description: "Ενεργοποιεί A/C ή θέρμανση όταν είσαι στα 500μ από το σπίτι",
    color: "text-accent",
    delay: "0.1s"
  },
  {
    icon: Music,
    title: "Αυτόματο Ambience",
    description: "Παίζει μουσική, ανοίγει φώτα και δημιουργεί την ατμόσφαιρα που θες",
    color: "text-primary-glow",
    delay: "0.2s"
  },
  {
    icon: Bath,
    title: "Wellness Automation",
    description: "Γεμίζει την μπανιέρα, κλείνει ρολά για την τέλεια στιγμή χαλάρωσης",
    color: "text-accent",
    delay: "0.3s"
  },
  {
    icon: Car,
    title: "Smart Departure",
    description: "Όταν φεύγεις: πλυντήριο, ρομπότ καθαρισμού, σβήσιμο φώτων",
    color: "text-primary",
    delay: "0.4s"
  },
  {
    icon: Brain,
    title: "AI Αυτομάθηση",
    description: "Μαθαίνει τις συνήθειές σου και προσαρμόζεται σε ώρες και εποχές",
    color: "text-primary-glow",
    delay: "0.5s"
  }
];

const integrations = [
  { name: "Google Home", icon: Home },
  { name: "Amazon Alexa", icon: Smartphone },
  { name: "Samsung SmartThings", icon: Wifi },
  { name: "Apple HomeKit", icon: Shield }
];

export const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <Zap className="w-4 h-4" />
            Κύριες Λειτουργίες
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold">
            <span className="text-foreground">Έξυπνο Σπίτι που </span>
            <span className="bg-gradient-primary bg-clip-text text-transparent">Σκέφτεται</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Το HomeFlow συνδυάζει AI τεχνολογία με συσκευές smart home για να δημιουργήσει 
            την τέλεια εμπειρία σπιτιού που προβλέπει τις ανάγκες σου.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-accent transition-all duration-300 animate-fade-in"
              style={{ animationDelay: feature.delay }}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-xl bg-gradient-primary p-3 mb-4 shadow-glow`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Integrations */}
        <div className="text-center space-y-8">
          <h3 className="text-2xl font-bold text-foreground">
            Συμβατό με όλες τις πλατφόρμες
          </h3>
          
          <div className="flex flex-wrap justify-center items-center gap-8">
            {integrations.map((integration, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 bg-muted/30 px-6 py-4 rounded-xl hover:bg-muted/50 transition-colors animate-slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <integration.icon className="w-6 h-6 text-primary" />
                <span className="font-medium">{integration.name}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12">
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">Αξιοπιστία</div>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <div className="text-4xl font-bold text-accent mb-2">&lt;1s</div>
              <div className="text-muted-foreground">Απόκριση</div>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="text-4xl font-bold text-primary-glow mb-2">500+</div>
              <div className="text-muted-foreground">Συσκευές</div>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.9s' }}>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Υποστήριξη</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};