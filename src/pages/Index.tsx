import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { PersonIcon, SunIcon, ClockIcon, StarIcon, ChatBubbleIcon } from '@radix-ui/react-icons';
import { AnimatedSection } from '@/components/ui/animated-section';
import { FloatingParticles } from '@/components/ui/floating-particles';
import { CulturalExperienceModal } from '@/components/ui/cultural-experience-modal';
import { sampleCulturalExperience } from '@/data/sample-experience';
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
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
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
    // Simular generación de experiencia cultural
    setIsExperienceModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${corrientesRiversideImage})` }}
      >
        <FloatingParticles />
        <div className="absolute inset-0 hero-gradient opacity-20"></div>
        <AnimatedSection 
          animation="fade-in" 
          delay={200}
          className="relative z-10 text-center text-white px-3 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        >
          <div className="hero-entrance stagger-children">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              IberApp
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 opacity-90 leading-relaxed px-2">
              Conecta tu cultura con el NEA. Descubre lugares, traduce jergas y vive una experiencia cultural única con inteligencia artificial.
            </p>
            <Button 
              onClick={() => document.getElementById('translator-section')?.scrollIntoView({ behavior: 'smooth' })}
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-warm transition-bounce pulse-glow w-full sm:w-auto"
            >
              <ChatBubbleIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Prueba el Traductor Cultural
            </Button>
          </div>
        </AnimatedSection>
      </section>

      {/* Tourism Form Section */}
      <section className="py-12 sm:py-16 md:py-24 px-3 sm:px-6 lg:px-8 warm-gradient">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-foreground">
                Constructor de Experiencia Cultural NEA
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground px-2">
                Cuéntanos de dónde vienes y qué te interesa para crear puentes culturales únicos
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="scale-in" delay={300}>
            <Card className="shadow-soft float-animation">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <PersonIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  Configuración de Experiencia Cultural
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Comparte tu origen cultural para crear conexiones personalizadas con el NEA
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-6 sm:space-y-8">
                {/* Personal Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <Label htmlFor="name" className="text-sm sm:text-base font-semibold mb-2 block">
                      Mi nombre
                    </Label>
                    <Input
                      id="name"
                      placeholder="¿Cómo te llamas?"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-10 sm:h-11"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm sm:text-base font-semibold mb-2 block">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-10 sm:h-11"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <Label htmlFor="origin" className="text-sm sm:text-base font-semibold mb-2 block">
                      Vengo de (país/región)
                    </Label>
                    <Input
                      id="origin"
                      placeholder="Ej: Italia, México, Japón..."
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      className="h-10 sm:h-11"
                    />
                  </div>
                  <div>
                    <Label htmlFor="nea-destination" className="text-sm sm:text-base font-semibold mb-2 block">
                      Destino en NEA
                    </Label>
                    <Select value={neaDestination} onValueChange={setNeaDestination}>
                      <SelectTrigger className="h-10 sm:h-11">
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
                  <Label className="text-sm sm:text-base font-semibold mb-3 sm:mb-4 block">
                    Experiencia cultural preferida
                  </Label>
                  <Select value={culturalExperience} onValueChange={setCulturalExperience}>
                    <SelectTrigger className="h-10 sm:h-11">
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



                {/* Tourist Interests */}
                <div>
                  <Label className="text-sm sm:text-base font-semibold mb-3 sm:mb-4 block">
                    Intereses turísticos
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                    {interests.map((interest) => (
                      <div key={interest.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={interest.id}
                          checked={selectedInterests.includes(interest.id)}
                          onCheckedChange={(checked) => 
                            handleInterestChange(interest.id, checked as boolean)
                          }
                        />
                        <Label htmlFor={interest.id} className="text-xs sm:text-sm">
                          {interest.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Available Time */}
                <div>
                  <Label htmlFor="time" className="text-sm sm:text-base font-semibold mb-3 sm:mb-4 block">
                    <ClockIcon className="inline h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    Tiempo disponible
                  </Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger className="w-full h-10 sm:h-11">
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
                  <Label htmlFor="starting-point" className="text-sm sm:text-base font-semibold mb-3 sm:mb-4 block">
                    <PersonIcon className="inline h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    Punto de partida
                  </Label>
                  <Select value={selectedStartingPoint} onValueChange={setSelectedStartingPoint}>
                    <SelectTrigger className="w-full h-10 sm:h-11">
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
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft py-3 sm:py-4 text-base sm:text-lg"
                  size="lg"
                >
                  <StarIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Generar Experiencia Cultural Personalizada
                </Button>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Cultural Translator Section */}
      <section id="translator-section" className="py-12 sm:py-16 md:py-24 px-3 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-foreground">
                Traductor Cultural NEA
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground px-2">
                Descubre conexiones entre tu cultura y las expresiones del NEA
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="bounce-in" delay={300}>
            <Card className="shadow-soft">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <ChatBubbleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-secondary" />
                  Traductor Cultural con Puentes
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Escribe una palabra o frase del NEA para descubrir su significado y conexiones culturales
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Input
                    placeholder="Ej: che, mate, mitaí, sapucai..."
                    value={slangInput}
                    onChange={(e) => setSlangInput(e.target.value)}
                    className="flex-1 h-10 sm:h-11"
                    onKeyDown={(e) => e.key === 'Enter' && handleTranslate()}
                  />
                  <Button 
                    onClick={handleTranslate}
                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground py-3 sm:py-4 text-sm sm:text-base w-full sm:w-auto"
                    disabled={!slangInput.trim()}
                  >
                    <ChatBubbleIcon className="mr-2 h-4 w-4" />
                    Traducir
                  </Button>
                </div>

                {translationResult && (
                  <AnimatedSection animation="fade-in" delay={100}>
                    <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                      <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="text-primary text-lg sm:text-xl">
                          "{translationResult.word}"
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6 pt-0 space-y-3 sm:space-y-4">
                        <div>
                          <h4 className="font-semibold text-secondary mb-2 text-sm sm:text-base">Traducción:</h4>
                          <p className="text-foreground text-sm sm:text-base">{translationResult.translation}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-secondary mb-2 text-sm sm:text-base">Contexto cultural NEA:</h4>
                          <p className="text-muted-foreground text-sm sm:text-base">{translationResult.explanation}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-secondary mb-2 text-sm sm:text-base">Ejemplo de uso:</h4>
                          <p className="text-foreground italic text-sm sm:text-base">"{translationResult.example}"</p>
                        </div>
                        {translationResult.culturalBridge && (
                          <div className="border-t pt-4 mt-4">
                            <h4 className="font-semibold text-accent mb-2 flex items-center gap-2 text-sm sm:text-base">
                              <PersonIcon className="h-4 w-4" />
                              {translationResult.culturalBridge}
                            </h4>
                            <p className="text-foreground bg-accent/10 p-3 rounded-lg border-l-4 border-accent text-sm sm:text-base">
                              {translationResult.comparison}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                )}

                {/* Popular suggestions */}
                <div className="text-center">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3">Palabras populares para explorar:</p>
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
                        className="text-xs py-2 px-3"
                      >
                        {word}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <AnimatedSection animation="fade-up" delay={200}>
        <footer className="py-6 sm:py-8 px-3 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm sm:text-lg px-2">
              Desarrollado por <span className="font-bold">AsyncDevs</span> en{' '}
              <span className="font-bold">HackIAthon by Devlights 2025</span> 🚀
            </p>
          </div>
        </footer>
      </AnimatedSection>

      {/* Cultural Experience Modal */}
      <CulturalExperienceModal
        isOpen={isExperienceModalOpen}
        onClose={() => setIsExperienceModalOpen(false)}
        experience={sampleCulturalExperience}
      />
    </div>
  );
};

export default Index;