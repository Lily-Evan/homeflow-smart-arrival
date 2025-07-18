import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { 
  Thermometer, 
  Lightbulb, 
  Droplets, 
  Car, 
  Music,
  Shield,
  Wifi,
  Power,
  Settings,
  Plus,
  MoreVertical,
  TrendingUp,
  Activity
} from "lucide-react";
import { useState } from "react";

interface Device {
  id: string;
  name: string;
  room: string;
  type: string;
  status: 'online' | 'offline' | 'active';
  isOn: boolean;
  value: number;
  maxValue: number;
  unit: string;
  icon: any;
  capabilities: string[];
}

const initialDevices: Device[] = [
  {
    id: '1',
    name: 'Κλιματιστικό',
    room: 'Σαλόνι',
    type: 'climate',
    status: 'active',
    isOn: true,
    value: 25,
    maxValue: 35,
    unit: '°C',
    icon: Thermometer,
    capabilities: ['temperature', 'fan_speed', 'mode']
  },
  {
    id: '2',
    name: 'Φώτα Οροφής',
    room: 'Υπνοδωμάτιο',
    type: 'lighting',
    status: 'online',
    isOn: false,
    value: 80,
    maxValue: 100,
    unit: '%',
    icon: Lightbulb,
    capabilities: ['brightness', 'color', 'dimming']
  },
  {
    id: '3',
    name: 'Θερμοσίφωνας',
    room: 'Μπάνιο',
    type: 'water',
    status: 'active',
    isOn: true,
    value: 45,
    maxValue: 60,
    unit: '°C',
    icon: Droplets,
    capabilities: ['temperature', 'schedule']
  },
  {
    id: '4',
    name: 'Ρολά',
    room: 'Σαλόνι',
    type: 'blinds',
    status: 'online',
    isOn: false,
    value: 0,
    maxValue: 100,
    unit: '%',
    icon: Car,
    capabilities: ['position', 'tilt', 'schedule']
  },
  {
    id: '5',
    name: 'Sonos One',
    room: 'Κουζίνα',
    type: 'audio',
    status: 'active',
    isOn: true,
    value: 65,
    maxValue: 100,
    unit: '%',
    icon: Music,
    capabilities: ['volume', 'playlist', 'equalizer']
  },
  {
    id: '6',
    name: 'Ring Doorbell',
    room: 'Είσοδος',
    type: 'security',
    status: 'online',
    isOn: true,
    value: 100,
    maxValue: 100,
    unit: '%',
    icon: Shield,
    capabilities: ['motion_detection', 'recording', 'live_view']
  }
];

export const DevicesPage = () => {
  const [devices, setDevices] = useState<Device[]>(initialDevices);
  const [selectedRoom, setSelectedRoom] = useState<string>('Όλα');

  const rooms = ['Όλα', ...Array.from(new Set(devices.map(d => d.room)))];

  const filteredDevices = selectedRoom === 'Όλα' 
    ? devices 
    : devices.filter(d => d.room === selectedRoom);

  const toggleDevice = (deviceId: string) => {
    setDevices(prev => prev.map(device => 
      device.id === deviceId 
        ? { 
            ...device, 
            isOn: !device.isOn, 
            status: !device.isOn ? 'active' : 'online' 
          }
        : device
    ));
  };

  const updateDeviceValue = (deviceId: string, newValue: number[]) => {
    setDevices(prev => prev.map(device => 
      device.id === deviceId 
        ? { ...device, value: newValue[0] }
        : device
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-accent border-accent/50';
      case 'online': return 'text-primary border-primary/50';
      case 'offline': return 'text-muted-foreground border-muted/50';
      default: return 'text-muted-foreground border-muted/50';
    }
  };

  const getDeviceIcon = (type: string, isOn: boolean) => {
    const baseClasses = `w-6 h-6 transition-all duration-200 ${
      isOn ? 'text-primary-foreground' : 'text-muted-foreground'
    }`;
    return baseClasses;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Συσκευές</h1>
            <p className="text-muted-foreground">
              Χειρισμός και έλεγχος όλων των έξυπνων συσκευών του σπιτιού
            </p>
          </div>
          <Button className="bg-gradient-primary hover:shadow-glow gap-2">
            <Plus className="w-4 h-4" />
            Προσθήκη Συσκευής
          </Button>
        </div>

        {/* Room Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {rooms.map((room) => (
            <Button
              key={room}
              variant={selectedRoom === room ? "default" : "outline"}
              onClick={() => setSelectedRoom(room)}
              className={`whitespace-nowrap ${
                selectedRoom === room 
                  ? 'bg-gradient-primary text-primary-foreground shadow-glow' 
                  : ''
              }`}
            >
              {room}
            </Button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Power className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {devices.filter(d => d.isOn).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Ενεργές</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Wifi className="w-5 h-5 text-accent" />
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {devices.filter(d => d.status === 'online' || d.status === 'active').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Συνδεδεμένες</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-2xl font-bold text-foreground">98%</div>
                  <div className="text-sm text-muted-foreground">Αξιοπιστία</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-accent" />
                <div>
                  <div className="text-2xl font-bold text-foreground">156</div>
                  <div className="text-sm text-muted-foreground">Εντολές Σήμερα</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Devices Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDevices.map((device) => (
            <Card 
              key={device.id} 
              className={`transition-all duration-300 hover:shadow-accent border-2 ${
                device.isOn ? getStatusColor(device.status) : 'border-border/30'
              }`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl p-3 transition-all duration-200 ${
                      device.isOn 
                        ? 'bg-gradient-primary shadow-glow' 
                        : 'bg-muted'
                    }`}>
                      <device.icon className={getDeviceIcon(device.type, device.isOn)} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{device.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {device.room}
                        </Badge>
                        <div className={`w-2 h-2 rounded-full ${
                          device.status === 'active' ? 'bg-accent animate-pulse' :
                          device.status === 'online' ? 'bg-primary' : 'bg-muted-foreground'
                        }`}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={device.isOn}
                      onCheckedChange={() => toggleDevice(device.id)}
                    />
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Current Value Display */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Τρέχουσα Τιμή:</span>
                  <span className="text-2xl font-bold text-foreground">
                    {device.value}{device.unit}
                  </span>
                </div>

                {/* Control Slider */}
                {device.isOn && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Ρύθμιση {device.type === 'lighting' ? 'Φωτεινότητας' : 
                               device.type === 'climate' ? 'Θερμοκρασίας' :
                               device.type === 'audio' ? 'Έντασης' : 'Τιμής'}
                    </label>
                    <Slider
                      value={[device.value]}
                      onValueChange={(value) => updateDeviceValue(device.id, value)}
                      max={device.maxValue}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0{device.unit}</span>
                      <span>{device.maxValue}{device.unit}</span>
                    </div>
                  </div>
                )}

                {/* Device Capabilities */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Δυνατότητες:</label>
                  <div className="flex flex-wrap gap-1">
                    {device.capabilities.map((capability, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {capability.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Settings className="w-3 h-3 mr-1" />
                    Ρυθμίσεις
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Activity className="w-3 h-3 mr-1" />
                    Ιστορικό
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredDevices.length === 0 && (
          <Card className="text-center p-8">
            <CardContent>
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                  <Power className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">Δεν βρέθηκαν συσκευές</h3>
                <p className="text-muted-foreground">
                  Δεν υπάρχουν συσκευές στο δωμάτιο "{selectedRoom}".
                </p>
                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Προσθήκη Συσκευής
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};