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
  const [name, setName] = useState('');
  const [origin, setOrigin] = useState('');
  const [neaDestination, setNeaDestination] = useState('');
  const [email, setEmail] = useState('');
  const [culturalExperience, setCulturalExperience] = useState('');
  const [translationResult, setTranslationResult] = useState<{
    word: string;
    translation: string;
    explanation: string;
    example: string;
    culturalBridge: string;
    comparison: string;
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
    { value: '1day', label: '1 día completo' },
    { value: '2+days', label: '2+ días' }
  ];

  const neaDestinations = [
    { value: 'corrientes', label: 'Corrientes' },
    { value: 'resistencia', label: 'Resistencia' },
    { value: 'posadas', label: 'Posadas' },
    { value: 'formosa', label: 'Formosa' }
  ];

  const culturalExperiences = [
    { value: 'similar', label: 'Similar a mi cultura' },
    { value: 'different', label: 'Completamente diferente' },
    { value: 'mixed', label: 'Experiencia mixta' }
  ];

  const startingPoints = [
    { value: 'plaza-cabral', label: 'Plaza Cabral' },
    { value: 'costanera', label: 'Costanera' },
    { value: 'centro-historico', label: 'Centro Histórico' },
    { value: 'puerto', label: 'Puerto' }
  ];

  const handleInterestChange = (interestId: string, checked: boolean) => {
    if (checked) {
      setSelectedInterests([...selectedInterests, interestId]);
    } else {
      setSelectedInterests(selectedInterests.filter(id => id !== interestId));
    }
  };

  const handleTranslate = () => {
    // Enhanced mock translation results with cultural bridges
    const mockTranslations: Record<string, any> = {
      'che': {
        word: 'Che',
        translation: 'Oye / Hey (saludo informal)',
        explanation: 'Expresión muy común en el NEA para llamar la atención o saludar informalmente. Crea familiaridad instantánea.',
        example: '"¡Che, vamos a la costanera a tomar unos mates!"',
        culturalBridge: 'En mi cultura/lugar de origen',
        comparison: 'Como "ciao" en Italia (saludo casual y amigable) • Como "tío" en España (forma familiar de dirigirse) • Como "güey" en México (tratamiento entre amigos)'
      },
      'mate': {
        word: 'Mate',
        translation: 'Ceremonia de té tradicional',
        explanation: 'Ritual social sagrado en el NEA que representa compartir, comunidad y conexión. Es más que una bebida.',
        example: '"¿Querés tomar unos mates? Es nuestra forma de hacer nuevos amigos"',
        culturalBridge: 'En mi cultura/lugar de origen',
        comparison: 'Como la ceremonia del té en Japón (ritual de conexión y respeto) • Como el té compartido en Marruecos (gesto de hospitalidad) • Más comunitario que el afternoon tea británico (todos comparten el mismo recipiente)'
      },
      'mitaí': {
        word: 'Mitaí',
        translation: 'Niño/a (idioma guaraní)',
        explanation: 'Palabra guaraní que muestra la herencia indígena viva en el NEA. Se usa cotidianamente mezclando idiomas.',
        example: '"Los mitaí están jugando en la plaza, hablando guaraní y español"',
        culturalBridge: 'En mi cultura/lugar de origen',
        comparison: 'Como "wawa" en quechua en Perú (idioma indígena en uso diario) • Similar a palabras gaélicas en inglés irlandés (preservación cultural) • Diferente a países donde se suprimieron idiomas originarios'
      },
      'sapucai': {
        word: 'Sapucai',
        translation: 'Grito de alegría y celebración guaraní',
        explanation: 'Expresión indígena que sobrevivió la colonización, usada en música folclórica y celebraciones del NEA.',
        example: '"¡Sapucai! se escucha en cada festival de chamamé"',
        culturalBridge: 'En mi cultura/lugar de origen',
        comparison: 'Como "sláinte!" en Irlanda (grito celebratorio con significado cultural profundo) • Como "¡órale!" en México (expresión de alegría) • Similar a gritos de guerra escoceses (conecta con orgullo ancestral)'
      }
    };

    const result = mockTranslations[slangInput.toLowerCase()] || {
      word: slangInput,
      translation: 'Palabra no encontrada en nuestro diccionario',
      explanation: 'Esta palabra no se encuentra en nuestra base de datos de expresiones del NEA.',
      example: 'Intenta con palabras como "che", "mate", "mitaí", "sapucai".',
      culturalBridge: '',
      comparison: 'Explora más términos para descubrir conexiones culturales fascinantes.'
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
              Conecta tu cultura con el NEA. Descubre, traduce y vive una experiencia cultural única con inteligencia artificial
            </p>
            <Button 
              onClick={() => document.getElementById('translator-section')?.scrollIntoView({ behavior: 'smooth' })}
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-4 text-lg shadow-warm transition-bounce"
            >
              <ChatBubbleIcon className="mr-2 h-5 w-5" />
              Prueba el Traductor Cultural
            </Button>
          </div>
        </div>
      </section>

      {/* Tourism Form Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 warm-gradient">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
              Constructor de Experiencia Cultural NEA
            </h2>
            <p className="text-lg text-muted-foreground">
              Cuéntanos de dónde vienes y qué te interesa para crear puentes culturales únicos
            </p>
          </div>

          <Card className="shadow-soft animate-bounce-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PersonIcon className="h-5 w-5 text-primary" />
                Configuración de Experiencia Cultural
              </CardTitle>
              <CardDescription>
                Comparte tu origen cultural para crear conexiones personalizadas con el NEA
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-base font-semibold mb-2 block">
                    Mi nombre
                  </Label>
                  <Input
                    id="name"
                    placeholder="¿Cómo te llamas?"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-base font-semibold mb-2 block">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="origin" className="text-base font-semibold mb-2 block">
                    Vengo de (país/región)
                  </Label>
                  <Input
                    id="origin"
                    placeholder="Ej: Italia, México, Japón..."
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="nea-destination" className="text-base font-semibold mb-2 block">
                    Destino en NEA
                  </Label>
                  <Select value={neaDestination} onValueChange={setNeaDestination}>
                    <SelectTrigger>
                      <SelectValue placeholder="Elige tu destino" />
                    </SelectTrigger>
                    <SelectContent>
                      {neaDestinations.map((destination) => (
                        <SelectItem key={destination.value} value={destination.value}>
                          {destination.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Cultural Experience Preference */}
              <div>
                <Label className="text-base font-semibold mb-4 block">
                  Experiencia cultural preferida
                </Label>
                <Select value={culturalExperience} onValueChange={setCulturalExperience}>
                  <SelectTrigger>
                    <SelectValue placeholder="¿Qué tipo de experiencia buscas?" />
                  </SelectTrigger>
                  <SelectContent>
                    {culturalExperiences.map((experience) => (
                      <SelectItem key={experience.value} value={experience.value}>
                        {experience.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Weather Display */}
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <SunIcon className="h-6 w-6 text-accent" />
                  <div>
                    <p className="font-semibold">Clima actual</p>
                    <p className="text-sm text-muted-foreground">NEA, Argentina</p>
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
                Generar Experiencia Cultural Personalizada
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Cultural Translator Section */}
      <section id="translator-section" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
              Traductor Cultural NEA
            </h2>
            <p className="text-lg text-muted-foreground">
              Descubre conexiones entre tu cultura y las expresiones del NEA
            </p>
          </div>

          <Card className="shadow-soft animate-bounce-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChatBubbleIcon className="h-5 w-5 text-secondary" />
                Traductor Cultural con Puentes
              </CardTitle>
              <CardDescription>
                Escribe una palabra o frase del NEA para descubrir su significado y conexiones culturales
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <Input
                  placeholder="Ej: che, mate, mitaí, sapucai..."
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
                      <h4 className="font-semibold text-secondary mb-2">Contexto cultural NEA:</h4>
                      <p className="text-muted-foreground">{translationResult.explanation}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary mb-2">Ejemplo de uso:</h4>
                      <p className="text-foreground italic">"{translationResult.example}"</p>
                    </div>
                    {translationResult.culturalBridge && (
                      <div className="border-t pt-4 mt-4">
                        <h4 className="font-semibold text-accent mb-2 flex items-center gap-2">
                          <PersonIcon className="h-4 w-4" />
                          {translationResult.culturalBridge}
                        </h4>
                        <p className="text-foreground bg-accent/10 p-3 rounded-lg border-l-4 border-accent">
                          {translationResult.comparison}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Popular suggestions */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-3">Palabras populares para explorar:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['che', 'mate', 'mitaí', 'sapucai'].map((word) => (
                    <Button
                      key={word}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSlangInput(word);
                        handleTranslate();
                      }}
                      className="text-xs"
                    >
                      {word}
                    </Button>
                  ))}
                </div>
              </div>
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