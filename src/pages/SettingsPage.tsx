import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Clock, 
  Thermometer, 
  Lightbulb, 
  Shield,
  Bell,
  User,
  Wifi,
  Smartphone,
  Settings,
  Plus,
  Edit,
  Trash2,
  Calendar
} from "lucide-react";
import { useState } from "react";

interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  actions: string[];
  isActive: boolean;
  schedule?: string;
}

interface LocationSetting {
  id: string;
  name: string;
  address: string;
  radius: number;
  isHome: boolean;
}

const initialRules: AutomationRule[] = [
  {
    id: '1',
    name: 'Καλώς ήρθες σπίτι',
    trigger: 'Όταν φτάνω σπίτι',
    actions: ['Άνοιγμα φώτων σαλονιού', 'A/C στους 25°C', 'Μουσική Relax'],
    isActive: true
  },
  {
    id: '2',
    name: 'Αναχώρηση από σπίτι',
    trigger: 'Όταν φεύγω από σπίτι',
    actions: ['Κλείσιμο όλων των φώτων', 'A/C σε εξοικονόμηση', 'Σύστημα ασφαλείας ON'],
    isActive: true
  },
  {
    id: '3',
    name: 'Καληνύχτα',
    trigger: 'Καθημερινά στις 23:00',
    actions: ['Κλείσιμο φώτων', 'Κλείσιμο ρολών', 'Θερμοσίφωνας OFF'],
    isActive: true,
    schedule: '23:00'
  },
  {
    id: '4',
    name: 'Πρωινό ξύπνημα',
    trigger: 'Καθημερινά στις 07:30',
    actions: ['Άνοιγμα ρολών', 'Θερμοσίφωνας ON', 'Μουσική Energizing'],
    isActive: false,
    schedule: '07:30'
  }
];

const locations: LocationSetting[] = [
  {
    id: '1',
    name: 'Σπίτι',
    address: 'Λεωφ. Αθηνών 123, Αθήνα',
    radius: 100,
    isHome: true
  },
  {
    id: '2',
    name: 'Δουλειά',
    address: 'Πλ. Συντάγματος 5, Αθήνα',
    radius: 50,
    isHome: false
  }
];

export const SettingsPage = () => {
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>(initialRules);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationAccess, setLocationAccess] = useState(true);
  const [voiceControl, setVoiceControl] = useState(true);

  const toggleRule = (ruleId: string) => {
    setAutomationRules(prev => prev.map(rule => 
      rule.id === ruleId 
        ? { ...rule, isActive: !rule.isActive }
        : rule
    ));
  };

  const deleteRule = (ruleId: string) => {
    setAutomationRules(prev => prev.filter(rule => rule.id !== ruleId));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Ρυθμίσεις</h1>
          <p className="text-muted-foreground">
            Παραμετροποίηση αυτοματισμών και προτιμήσεων του HomeFlow
          </p>
        </div>

        <Tabs defaultValue="automation" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="automation">Αυτοματισμοί</TabsTrigger>
            <TabsTrigger value="location">Τοποθεσίες</TabsTrigger>
            <TabsTrigger value="notifications">Ειδοποιήσεις</TabsTrigger>
            <TabsTrigger value="account">Λογαριασμός</TabsTrigger>
          </TabsList>

          {/* Automation Rules */}
          <TabsContent value="automation" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Κανόνες Αυτοματισμού</h2>
              <Button className="bg-gradient-primary hover:shadow-glow gap-2">
                <Plus className="w-4 h-4" />
                Νέος Κανόνας
              </Button>
            </div>

            <div className="space-y-4">
              {automationRules.map((rule) => (
                <Card key={rule.id} className={`transition-all duration-200 ${
                  rule.isActive ? 'border-primary/50' : 'border-border/30 opacity-70'
                }`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          rule.isActive ? 'bg-accent animate-pulse' : 'bg-muted'
                        }`}></div>
                        <div>
                          <CardTitle className="text-lg">{rule.name}</CardTitle>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            {rule.schedule ? (
                              <>
                                <Calendar className="w-4 h-4" />
                                {rule.trigger}
                              </>
                            ) : (
                              <>
                                <MapPin className="w-4 h-4" />
                                {rule.trigger}
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={rule.isActive}
                          onCheckedChange={() => toggleRule(rule.id)}
                        />
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => deleteRule(rule.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Ενέργειες:</Label>
                      <div className="flex flex-wrap gap-2">
                        {rule.actions.map((action, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {action}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Location Settings */}
          <TabsContent value="location" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Τοποθεσίες</h2>
              <Button variant="outline" className="gap-2">
                <Plus className="w-4 h-4" />
                Προσθήκη Τοποθεσίας
              </Button>
            </div>

            <div className="space-y-4">
              {locations.map((location) => (
                <Card key={location.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          location.isHome ? 'bg-gradient-primary' : 'bg-muted'
                        }`}>
                          <MapPin className={`w-6 h-6 ${
                            location.isHome ? 'text-primary-foreground' : 'text-muted-foreground'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg flex items-center gap-2">
                            {location.name}
                            {location.isHome && (
                              <Badge className="bg-accent/20 text-accent">Κύρια</Badge>
                            )}
                          </h3>
                          <p className="text-sm text-muted-foreground">{location.address}</p>
                          <p className="text-xs text-muted-foreground">
                            Ακτίνα ανίχνευσης: {location.radius}μ
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Ρυθμίσεις Τοποθεσίας
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Πρόσβαση στην Τοποθεσία</Label>
                    <p className="text-sm text-muted-foreground">
                      Επιτρέπει στο app να παρακολουθεί την τοποθεσία σας
                    </p>
                  </div>
                  <Switch 
                    checked={locationAccess}
                    onCheckedChange={setLocationAccess}
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Ακτίνα Ανίχνευσης Σπιτιού (μέτρα)</Label>
                  <Input type="number" defaultValue="100" min="10" max="500" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <h2 className="text-2xl font-bold">Ειδοποιήσεις</h2>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Ρυθμίσεις Ειδοποιήσεων
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Ενεργοποίηση Ειδοποιήσεων</Label>
                    <p className="text-sm text-muted-foreground">
                      Λάβετε ειδοποιήσεις για αυτοματισμούς και συσκευές
                    </p>
                  </div>
                  <Switch 
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Αυτοματισμοί</Label>
                      <p className="text-sm text-muted-foreground">
                        Ειδοποιήσεις όταν εκτελούνται αυτοματισμοί
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Συσκευές</Label>
                      <p className="text-sm text-muted-foreground">
                        Ειδοποιήσεις για αλλαγές στις συσκευές
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Ασφάλεια</Label>
                      <p className="text-sm text-muted-foreground">
                        Ειδοποιήσεις ασφαλείας και alerts
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Ενεργειακή Κατανάλωση</Label>
                      <p className="text-sm text-muted-foreground">
                        Εβδομαδιαίες αναφορές κατανάλωσης
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Settings */}
          <TabsContent value="account" className="space-y-6">
            <h2 className="text-2xl font-bold">Λογαριασμός</h2>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Προφίλ Χρήστη
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Όνομα</Label>
                  <Input defaultValue="Παναγιώτα" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue="panagiota@example.com" />
                </div>
                <div className="space-y-2">
                  <Label>Τηλέφωνο</Label>
                  <Input defaultValue="+30 69x xxx xxxx" />
                </div>
                <Button className="bg-gradient-primary">
                  Αποθήκευση Αλλαγών
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Προτιμήσεις
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Φωνητικός Έλεγχος</Label>
                    <p className="text-sm text-muted-foreground">
                      Ενεργοποίηση φωνητικών εντολών
                    </p>
                  </div>
                  <Switch 
                    checked={voiceControl}
                    onCheckedChange={setVoiceControl}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Σκοτεινό Θέμα</Label>
                    <p className="text-sm text-muted-foreground">
                      Αυτόματη αλλαγή θέματος βάσει ώρας
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Γλώσσα</Label>
                  <select className="w-full p-2 border border-border rounded-md bg-background">
                    <option value="el">Ελληνικά</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <Shield className="w-5 h-5" />
                  Ζώνη Κινδύνου
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">
                  Επαναφορά Εργοστασιακών Ρυθμίσεων
                </Button>
                <Button variant="destructive" className="w-full">
                  Διαγραφή Λογαριασμού
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};