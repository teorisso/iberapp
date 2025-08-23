import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { PersonIcon, SunIcon, ClockIcon, StarIcon, ChatBubbleIcon } from '@radix-ui/react-icons';
import corrientesRiversideImage from '@/assets/corrientes-riverside-sunset.jpg';

const Index = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedStartingPoint, setSelectedStartingPoint] = useState('');
  const [slangInput, setSlangInput] = useState('');
  const [translationResult, setTranslationResult] = useState<{
    word: string;
    translation: string;
    explanation: string;
    example: string;
  } | null>(null);

  const interests = [
    { id: 'historia', label: 'Historia' },
    { id: 'gastronomia', label: 'Gastronomía' },
    { id: 'cultura', label: 'Cultura' },
    { id: 'fotografia', label: 'Fotografía' },
    { id: 'familia', label: 'Familia' }
  ];

  const timeOptions = [
    { value: '2h', label: '2 horas' },
    { value: '4h', label: '4 horas' },
    { value: '1day', label: '1 día completo' }
  ];

  const startingPoints = [
    { value: 'plaza-cabral', label: 'Plaza Cabral' },
    { value: 'costanera', label: 'Costanera' },
    { value: 'centro-historico', label: 'Centro Histórico' },
    { value: 'puerto', label: 'Puerto de Corrientes' }
  ];

  const handleInterestChange = (interestId: string, checked: boolean) => {
    if (checked) {
      setSelectedInterests([...selectedInterests, interestId]);
    } else {
      setSelectedInterests(selectedInterests.filter(id => id !== interestId));
    }
  };

  const handleTranslate = () => {
    // Mock translation results based on input
    const mockTranslations: Record<string, any> = {
      'che': {
        word: 'Che',
        translation: 'Oye / Hey (informal greeting)',
        explanation: 'Expresión muy común en el litoral argentino para llamar la atención o saludar informalmente.',
        example: '"¡Che, vení acá!" - "¡Oye, ven acá!"'
      },
      'mitaí': {
        word: 'Mitaí',
        translation: 'Niño/a',
        explanation: 'Palabra de origen guaraní muy usada en Corrientes para referirse a los niños.',
        example: '"Los mitaí están jugando en la plaza" - "Los niños están jugando en la plaza"'
      },
      'kurepi': {
        word: 'Kurepi',
        translation: 'Cerdo',
        explanation: 'Término guaraní para referirse al cerdo, muy usado en la gastronomía local.',
        example: '"Vamos a comer kurepi asado" - "Vamos a comer cerdo asado"'
      }
    };

    const result = mockTranslations[slangInput.toLowerCase()] || {
      word: slangInput,
      translation: 'Palabra no encontrada en nuestro diccionario',
      explanation: 'Esta palabra no se encuentra en nuestra base de datos de expresiones correntinas.',
      example: 'Intenta con palabras como "che", "mitaí", "kurepi".'
    };

    setTranslationResult(result);
  };

  const handleBuildTour = () => {
    alert('¡Funcionalidad en desarrollo! Tu tour inteligente se creará pronto.');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${corrientesRiversideImage})` }}
      >
        <div className="absolute inset-0 hero-gradient opacity-20"></div>
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              NEA Culture Translator
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl mb-8 opacity-90 leading-relaxed">
              Comprende el lunfardo local y vive la cultura correntina con inteligencia artificial
            </p>
            <Button 
              onClick={handleBuildTour}
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-4 text-lg shadow-warm transition-bounce"
            >
              <StarIcon className="mr-2 h-5 w-5" />
              Construye tu tour inteligente
            </Button>
          </div>
        </div>
      </section>

      {/* Tourism Form Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 warm-gradient">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
              Personaliza tu experiencia
            </h2>
            <p className="text-lg text-muted-foreground">
              Cuéntanos qué te interesa y crearemos el tour perfecto para ti
            </p>
          </div>

          <Card className="shadow-soft animate-bounce-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PersonIcon className="h-5 w-5 text-primary" />
                Configuración del Tour
              </CardTitle>
              <CardDescription>
                Selecciona tus preferencias para crear una experiencia única
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Weather Display */}
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <SunIcon className="h-6 w-6 text-accent" />
                  <div>
                    <p className="font-semibold">Clima actual</p>
                    <p className="text-sm text-muted-foreground">Corrientes, Argentina</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">34°C</p>
                  <div className="flex gap-2">
                    <Badge variant="secondary">Soleado</Badge>
                    <Badge variant="outline">UV Alto</Badge>
                  </div>
                </div>
              </div>

              {/* Tourist Interests */}
              <div>
                <Label className="text-base font-semibold mb-4 block">
                  Intereses turísticos
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {interests.map((interest) => (
                    <div key={interest.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={interest.id}
                        checked={selectedInterests.includes(interest.id)}
                        onCheckedChange={(checked) => 
                          handleInterestChange(interest.id, checked as boolean)
                        }
                      />
                      <Label htmlFor={interest.id} className="text-sm">
                        {interest.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Available Time */}
              <div>
                <Label htmlFor="time" className="text-base font-semibold mb-4 block">
                  <ClockIcon className="inline h-4 w-4 mr-2" />
                  Tiempo disponible
                </Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona la duración" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Starting Point */}
              <div>
                <Label htmlFor="starting-point" className="text-base font-semibold mb-4 block">
                  <PersonIcon className="inline h-4 w-4 mr-2" />
                  Punto de partida
                </Label>
                <Select value={selectedStartingPoint} onValueChange={setSelectedStartingPoint}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Elige dónde comenzar" />
                  </SelectTrigger>
                  <SelectContent>
                    {startingPoints.map((point) => (
                      <SelectItem key={point.value} value={point.value}>
                        {point.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleBuildTour}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft"
                size="lg"
              >
                <StarIcon className="mr-2 h-5 w-5" />
                Generar Tour Personalizado
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Slang Translator Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
              Traductor de Lunfardo Correntino
            </h2>
            <p className="text-lg text-muted-foreground">
              Descubre el significado de las expresiones locales y su contexto cultural
            </p>
          </div>

          <Card className="shadow-soft animate-bounce-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChatBubbleIcon className="h-5 w-5 text-secondary" />
                Traductor Cultural
              </CardTitle>
              <CardDescription>
                Escribe una palabra o frase correntina para conocer su significado
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <Input
                  placeholder="Ej: che, mitaí, kurepi..."
                  value={slangInput}
                  onChange={(e) => setSlangInput(e.target.value)}
                  className="flex-1"
                  onKeyDown={(e) => e.key === 'Enter' && handleTranslate()}
                />
                <Button 
                  onClick={handleTranslate}
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  disabled={!slangInput.trim()}
                >
                  <ChatBubbleIcon className="mr-2 h-4 w-4" />
                  Traducir
                </Button>
              </div>

              {translationResult && (
                <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 animate-fade-in">
                  <CardHeader>
                    <CardTitle className="text-primary text-xl">
                      "{translationResult.word}"
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-secondary mb-2">Traducción:</h4>
                      <p className="text-foreground">{translationResult.translation}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary mb-2">Explicación cultural:</h4>
                      <p className="text-muted-foreground">{translationResult.explanation}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary mb-2">Ejemplo de uso:</h4>
                      <p className="text-foreground italic">"{translationResult.example}"</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg">
            Desarrollado por <span className="font-bold">AsyncDevs</span> en{' '}
            <span className="font-bold">HackIAthon by Devlights 2025</span> 🚀
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;