import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  MapPin, 
  Thermometer, 
  Music, 
  Lightbulb, 
  Droplets,
  Volume2,
  Wifi,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { useState, useEffect } from "react";

interface ScenarioStep {
  time: string;
  location: string;
  distance: string;
  actions: Array<{
    icon: any;
    text: string;
    status: 'pending' | 'active' | 'completed';
  }>;
}

const scenarios: ScenarioStep[] = [
  {
    time: "17:40",
    location: "Δουλειά",
    distance: "2.5 km",
    actions: [
      { icon: MapPin, text: "Ανίχνευση τοποθεσίας", status: 'completed' },
      { icon: Clock, text: "Υπολογισμός άφιξης", status: 'active' },
    ]
  },
  {
    time: "17:43",
    location: "Στο δρόμο",
    distance: "800m",
    actions: [
      { icon: Thermometer, text: "A/C στους 25°C", status: 'active' },
      { icon: Lightbulb, text: "Προετοιμασία φωτισμού", status: 'pending' },
    ]
  },
  {
    time: "17:45",
    location: "Κοντά στο σπίτι",
    distance: "200m",
    actions: [
      { icon: Music, text: "Playlist 'Relax' ▶️", status: 'active' },
      { icon: Droplets, text: "Έναρξη μπάνιου", status: 'active' },
      { icon: Wifi, text: "Σύνδεση με WiFi", status: 'completed' },
    ]
  },
  {
    time: "17:47",
    location: "Σπίτι",
    distance: "0m",
    actions: [
      { icon: CheckCircle, text: "Καλώς ήρθες σπίτι! 🏡", status: 'completed' },
      { icon: Volume2, text: "Όλα έτοιμα για εσένα", status: 'completed' },
    ]
  }
];

export const DemoSection = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying && currentStep < scenarios.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (currentStep >= scenarios.length - 1) {
      setIsPlaying(false);
    }
  }, [currentStep, isPlaying]);

  const handlePlayDemo = () => {
    setCurrentStep(0);
    setIsPlaying(true);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-accent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-primary rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium">
            <Clock className="w-4 h-4" />
            Ζωντανό Demo
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold">
            <span className="text-foreground">Δες το </span>
            <span className="bg-gradient-accent bg-clip-text text-transparent">HomeFlow</span>
            <span className="text-foreground"> σε δράση</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Παρακολούθησε πώς το HomeFlow προετοιμάζει το σπίτι σου καθώς πλησιάζεις. 
            Κάθε βήμα είναι αυτόματο και έξυπνο.
          </p>

          <Button 
            onClick={handlePlayDemo}
            size="lg" 
            className="bg-gradient-accent hover:shadow-accent transition-all duration-300 text-lg px-8 py-6"
            disabled={isPlaying}
          >
            {isPlaying ? (
              <>
                <Clock className="w-5 h-5 mr-2 animate-spin" />
                Εκτέλεση Demo...
              </>
            ) : (
              <>
                <ArrowRight className="w-5 h-5 mr-2" />
                Ξεκίνα Demo
              </>
            )}
          </Button>
        </div>

        {/* Demo Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary-glow"></div>

            {/* Timeline steps */}
            <div className="space-y-8">
              {scenarios.map((scenario, index) => (
                <div 
                  key={index}
                  className={`relative flex items-start gap-6 transition-all duration-500 ${
                    index <= currentStep ? 'opacity-100 animate-slide-in' : 'opacity-30'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className={`relative z-10 w-8 h-8 rounded-full border-4 transition-all duration-300 ${
                    index === currentStep 
                      ? 'bg-primary border-primary shadow-glow animate-pulse' 
                      : index < currentStep
                      ? 'bg-accent border-accent'
                      : 'bg-muted border-muted'
                  }`}></div>

                  {/* Content card */}
                  <Card className={`flex-1 transition-all duration-300 ${
                    index === currentStep 
                      ? 'border-primary/50 shadow-glow bg-card' 
                      : 'border-border/30 bg-card/50'
                  }`}>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl flex items-center gap-3">
                          <Clock className="w-5 h-5 text-primary" />
                          {scenario.time}
                        </CardTitle>
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className="text-xs">
                            <MapPin className="w-3 h-3 mr-1" />
                            {scenario.location}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {scenario.distance}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-3">
                        {scenario.actions.map((action, actionIndex) => (
                          <div 
                            key={actionIndex}
                            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                              action.status === 'completed' 
                                ? 'bg-accent/20 text-accent-foreground' 
                                : action.status === 'active'
                                ? 'bg-primary/20 text-primary-foreground'
                                : 'bg-muted/50 text-muted-foreground'
                            }`}
                          >
                            <action.icon className={`w-4 h-4 ${
                              action.status === 'completed' 
                                ? 'text-accent' 
                                : action.status === 'active'
                                ? 'text-primary'
                                : 'text-muted-foreground'
                            }`} />
                            <span className="text-sm font-medium flex-1">{action.text}</span>
                            {action.status === 'completed' && (
                              <CheckCircle className="w-4 h-4 text-accent" />
                            )}
                            {action.status === 'active' && (
                              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom message */}
          {currentStep >= scenarios.length - 1 && (
            <div className="text-center mt-12 animate-fade-in">
              <Card className="inline-block p-6 bg-gradient-accent text-accent-foreground">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6" />
                  <span className="text-lg font-semibold">
                    Το σπίτι σου είναι έτοιμο! Καλώς ήρθες στο μέλλον. 🚀
                  </span>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};