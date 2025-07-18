import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Thermometer, 
  Lightbulb, 
  Droplets, 
  Car, 
  Wifi, 
  MapPin,
  Clock,
  Zap,
  Music,
  Shield,
  Power,
  TrendingUp,
  Battery,
  Settings
} from "lucide-react";
import { useState, useEffect } from "react";

interface Device {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'active';
  value?: string | number;
  unit?: string;
  icon: any;
  isOn: boolean;
  automation?: boolean;
}

const initialDevices: Device[] = [
  { id: '1', name: 'Κλιματιστικό Σαλόνι', type: 'climate', status: 'active', value: 25, unit: '°C', icon: Thermometer, isOn: true, automation: true },
  { id: '2', name: 'Φώτα Υπνοδωμάτιο', type: 'lighting', status: 'online', value: 80, unit: '%', icon: Lightbulb, isOn: false, automation: true },
  { id: '3', name: 'Θερμοσίφωνας', type: 'water', status: 'active', value: 45, unit: '°C', icon: Droplets, isOn: true, automation: false },
  { id: '4', name: 'Ρολά Σαλόνι', type: 'blinds', status: 'online', value: 'Κλειστά', icon: Car, isOn: false, automation: true },
  { id: '5', name: 'Ηχοσύστημα', type: 'audio', status: 'active', value: 'Relax Playlist', icon: Music, isOn: true, automation: true },
  { id: '6', name: 'Σύστημα Ασφαλείας', type: 'security', status: 'online', value: 'Ενεργό', icon: Shield, isOn: true, automation: false }
];

export const Dashboard = () => {
  const [devices, setDevices] = useState<Device[]>(initialDevices);
  const [currentLocation, setCurrentLocation] = useState("Στο σπίτι");
  const [arrivalTime, setArrivalTime] = useState<string>("");
  const [isAway, setIsAway] = useState(false);

  // Simulate location changes
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hour = now.getHours();
      
      if (hour >= 9 && hour <= 17) {
        setCurrentLocation("Δουλειά");
        setIsAway(true);
        setArrivalTime("18:30");
      } else {
        setCurrentLocation("Στο σπίτι");
        setIsAway(false);
        setArrivalTime("");
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const toggleDevice = (deviceId: string) => {
    setDevices(prev => prev.map(device => 
      device.id === deviceId 
        ? { ...device, isOn: !device.isOn, status: !device.isOn ? 'active' : 'online' }
        : device
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-accent';
      case 'online': return 'text-primary';
      case 'offline': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge className="bg-accent/20 text-accent">Ενεργό</Badge>;
      case 'online': return <Badge variant="outline">Σε αναμονή</Badge>;
      case 'offline': return <Badge variant="destructive">Εκτός λειτουργίας</Badge>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Έλεγχος και παρακολούθηση του έξυπνου σπιτιού σου</p>
          </div>
          <div className="flex items-center gap-4">
            <Card className="bg-card/50 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-semibold">{currentLocation}</div>
                    {arrivalTime && (
                      <div className="text-sm text-muted-foreground">Άφιξη: {arrivalTime}</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-primary text-primary-foreground">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Power className="w-5 h-5" />
                <div>
                  <div className="text-2xl font-bold">{devices.filter(d => d.isOn).length}</div>
                  <div className="text-sm opacity-90">Ενεργές Συσκευές</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-accent text-accent-foreground">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5" />
                <div>
                  <div className="text-2xl font-bold">2.4</div>
                  <div className="text-sm opacity-90">kWh Σήμερα</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-2xl font-bold text-foreground">85%</div>
                  <div className="text-sm text-muted-foreground">Αποδοτικότητα</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Battery className="w-5 h-5 text-accent" />
                <div>
                  <div className="text-2xl font-bold text-foreground">€3.2</div>
                  <div className="text-sm text-muted-foreground">Κόστος Σήμερα</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Device Control */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Συσκευές</h2>
            <Button variant="outline" className="gap-2">
              <Settings className="w-4 h-4" />
              Ρυθμίσεις
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devices.map((device) => (
              <Card 
                key={device.id} 
                className={`transition-all duration-300 hover:shadow-accent cursor-pointer ${
                  device.isOn ? 'border-primary/50 bg-card' : 'border-border/30 bg-card/50'
                }`}
                onClick={() => toggleDevice(device.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-primary p-2 ${
                        device.isOn ? 'shadow-glow' : 'opacity-50'
                      }`}>
                        <device.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{device.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          {getStatusBadge(device.status)}
                          {device.automation && (
                            <Badge variant="secondary" className="text-xs">AUTO</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <Switch 
                      checked={device.isOn}
                      onChange={() => toggleDevice(device.id)}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold text-foreground">
                      {device.value} {device.unit}
                    </div>
                    <div className="flex items-center gap-1">
                      <Wifi className={`w-4 h-4 ${getStatusColor(device.status)}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Automation Status */}
        {isAway && (
          <Card className="border-accent/50 bg-accent/10 animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-accent mb-1">Αυτόματη Λειτουργία Ενεργή</h3>
                  <p className="text-sm text-muted-foreground">
                    Το σπίτι θα προετοιμαστεί αυτόματα για την επιστροφή σου στις {arrivalTime}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Ρύθμιση
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};