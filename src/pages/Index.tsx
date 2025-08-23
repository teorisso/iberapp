import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { PersonIcon, SunIcon, ClockIcon, StarIcon, ChatBubbleIcon, ReloadIcon } from '@radix-ui/react-icons';
import { AnimatedSection } from '@/components/ui/animated-section';
import { FloatingParticles } from '@/components/ui/floating-particles';
import { geminiService, type GeminiTranslationResponse } from '@/lib/gemini';
import { userService, supabase } from '@/lib/supabase';
import neaRiversideImage from '@/assets/corrientes-riverside-sunset.jpg';

const Index = () => {
  const [slangInput, setSlangInput] = useState('');
  const [name, setName] = useState('');
  const [origin, setOrigin] = useState('');
  const [translatorOrigin, setTranslatorOrigin] = useState('');
  const [neaDestination, setNeaDestination] = useState('');
  const [translationResult, setTranslationResult] = useState<GeminiTranslationResponse | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [culturalExperience, setCulturalExperience] = useState<any>(null);
  const [isGeneratingExperience, setIsGeneratingExperience] = useState(false);

  const neaDestinations = [
    { value: 'corrientes', label: 'Corrientes' },
    { value: 'resistencia', label: 'Resistencia' },
    { value: 'posadas', label: 'Posadas' },
    { value: 'formosa', label: 'Formosa' }
  ];

  const handleTranslate = async () => {
    if (!slangInput.trim()) return;
    
    setIsTranslating(true);
    setTranslationResult(null);
    
    try {
      const result = await geminiService.getEnhancedTranslation(
        slangInput.trim(),
        translatorOrigin || undefined,
        culturalExperience || undefined
      );
      
      setTranslationResult(result);
    } catch (error) {
      console.error('Translation error:', error);
      
      // Fallback error translation
      setTranslationResult({
        word: slangInput,
        translation: 'Error al procesar la traducción',
        explanation: 'Hubo un problema al conectar con el servicio de traducción. Verifica tu conexión a internet.',
        example: 'Intenta de nuevo en unos momentos.',
        culturalBridge: 'En mi cultura/lugar de origen',
        comparison: 'Servicio temporalmente no disponible.'
      });
    } finally {
      setIsTranslating(false);
    }
  };

  const handleBuildTour = async () => {
    if (!name.trim() || !origin.trim() || !neaDestination) {
      alert('Por favor completa todos los campos para generar tu experiencia cultural.');
      return;
    }

    setIsGeneratingExperience(true);
    setCulturalExperience(null);

    try {
      console.log('🤖 Generating cultural experience with Gemini...');
      
      // ONE single call to Gemini for cultural experience
      const experience = await geminiService.generateCulturalExperience({
        name: name.trim(),
        origin: origin.trim(),
        destination: neaDestination
      });
      
      setCulturalExperience(experience);
      
      // Save to Supabase in background (don't block UI)
      try {
        await userService.upsertProfile({
          name: name.trim(),
          email: `${name.trim().toLowerCase().replace(/\s+/g, '')}@temp-user.com`,
          origin: origin.trim(),
          nea_destination: neaDestination,
          cultural_experience: 'mixed',
          interests: []
        });
      } catch (saveError) {
        console.warn('Profile save failed, but experience was generated:', saveError);
      }
      
    } catch (error) {
      console.error('Error generating cultural experience:', error);
      alert(`Error al generar tu experiencia cultural. Por favor intenta de nuevo en unos momentos.`);
    } finally {
      setIsGeneratingExperience(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${neaRiversideImage})` }}
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
              Traduce jergas del NEA con puentes culturales personalizados. Descubre conexiones únicas entre tu cultura y el Noreste Argentino.
            </p>
                         <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
               <Button 
                 onClick={() => document.getElementById('translator-section')?.scrollIntoView({ behavior: 'smooth' })}
                 size="lg" 
                 className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-warm transition-bounce pulse-glow w-full sm:w-auto"
               >
                 <ChatBubbleIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                 Traductor Cultural
               </Button>
               <Button 
                 onClick={() => document.getElementById('experience-section')?.scrollIntoView({ behavior: 'smooth' })}
                 size="lg" 
                 variant="outline"
                 className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto"
               >
                 <StarIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                 Experiencia Cultural
               </Button>
             </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Cultural Translator Section - MAIN FEATURE */}
      <section id="translator-section" className="py-12 sm:py-16 md:py-24 px-3 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-foreground">
                🌍 Traductor Cultural NEA
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground px-2">
                <strong>Funcionalidad Principal:</strong> Traduce jergas del NEA completamente a tu idioma con conexiones culturales personalizadas usando IA
              </p>
              <div className="mt-4 flex justify-center">
                <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-1 text-sm">
                  ✨ Potenciado por Inteligencia Artificial
                </Badge>
              </div>
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
                <div>
                  <Label htmlFor="translator-origin" className="text-sm sm:text-base font-semibold mb-2 block">
                    ¿De dónde vienes?
                  </Label>
                  <Input
                    id="translator-origin"
                    placeholder="Ej: China, Italia, México, Brasil, España, Francia..."
                    value={translatorOrigin}
                    onChange={(e) => setTranslatorOrigin(e.target.value)}
                    className="h-10 sm:h-11"
                  />
                                     <p className="text-xs text-muted-foreground mt-1">
                     TODA la respuesta estará traducida a tu idioma: palabra, explicación, ejemplo y comparaciones culturales
                   </p>
                   {translatorOrigin && (
                     <div className="mt-2">
                       <Badge variant="outline" className="text-xs">
                         {(() => {
                           const countryLanguageMap: { [key: string]: string } = {
                             'españa': '🇪🇸 Español',
                             'mexico': '🇲🇽 Español',
                             'brasil': '🇧🇷 Portugués',
                             'italia': '🇮🇹 Italiano',
                             'francia': '🇫🇷 Francés',
                             'alemania': '🇩🇪 Alemán',
                             'inglaterra': '🇬🇧 Inglés',
                             'estados unidos': '🇺🇸 Inglés',
                             'china': '🇨🇳 Chino',
                             'japon': '🇯🇵 Japonés',
                             'corea': '🇰🇷 Coreano',
                             'rusia': '🇷🇺 Ruso',
                             'portugal': '🇵🇹 Portugués'
                           };
                           const originKey = translatorOrigin.toLowerCase().trim();
                           return countryLanguageMap[originKey] || '🌍 Español (default)';
                         })()}
                       </Badge>
                     </div>
                   )}
                </div>

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
                    disabled={!slangInput.trim() || isTranslating}
                  >
                    {isTranslating ? (
                      <>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Traduciendo...
                      </>
                    ) : (
                      <>
                        <ChatBubbleIcon className="mr-2 h-4 w-4" />
                        Traducir con IA
                      </>
                    )}
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
                              {translatorOrigin && <Badge variant="outline" className="ml-2">{translatorOrigin}</Badge>}
                            </h4>
                            <p className="text-foreground bg-accent/10 p-3 rounded-lg border-l-4 border-accent text-sm sm:text-base">
                              {translationResult.comparison}
                            </p>
                          </div>
                        )}
                        
                        {/* Show interactive suggestions if word was not found */}
                        {translationResult.translation === 'Palabra no encontrada en nuestra base de datos' && (
                          <div className="border-t pt-4 mt-4">
                            <h4 className="font-semibold text-orange-600 mb-3">💡 Palabras sugeridas del NEA:</h4>
                            <div className="flex flex-wrap gap-2">
                              {['che', 'mate', 'mitaí', 'sapucai', 'aguante'].map((suggestedWord) => (
                                <Button
                                  key={suggestedWord}
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setSlangInput(suggestedWord);
                                    handleTranslate();
                                  }}
                                  className="text-xs bg-orange-50 hover:bg-orange-100 border-orange-200"
                                  disabled={isTranslating}
                                >
                                  🔍 {suggestedWord}
                                </Button>
                              ))}
                            </div>
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
                    {['che', 'mate', 'mitaí', 'sapucai', 'aguante'].map((word) => (
                      <Button
                        key={word}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSlangInput(word);
                          handleTranslate();
                        }}
                        className="text-xs py-2 px-3 hover:bg-primary/10 hover:text-primary"
                        disabled={isTranslating}
                      >
                        {word}
                      </Button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    ✨ Estas palabras están disponibles en nuestra base de datos
                  </p>
                </div>

              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Cultural Experience Builder Section */}
      <section id="experience-section" className="py-12 sm:py-16 md:py-24 px-3 sm:px-6 lg:px-8 warm-gradient">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-foreground">
                🗺️ Constructor de Experiencia Cultural NEA
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground px-2">
                La IA creará actividades personalizadas basadas en tu origen cultural y destino elegido
              </p>
              <div className="mt-4 flex justify-center">
                <Badge variant="secondary" className="px-4 py-1 text-sm">
                  🎯 Funcionalidad Complementaria
                </Badge>
              </div>
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
                  Solo necesitamos 3 datos esenciales para generar tu experiencia perfecta
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-6 sm:space-y-8">
                {/* Essential Information Only */}
                <div>
                  <Label htmlFor="name" className="text-sm sm:text-base font-semibold mb-2 block">
                    Tu nombre
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
                  <Label htmlFor="origin" className="text-sm sm:text-base font-semibold mb-2 block">
                    ¿De dónde vienes?
                  </Label>
                  <Input
                    id="origin"
                    placeholder="Ej: Italia, México, Brasil, España, Francia..."
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="h-10 sm:h-11"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    La IA personalizará actividades según tu trasfondo cultural
                  </p>
                </div>

                <div>
                  <Label htmlFor="nea-destination" className="text-sm sm:text-base font-semibold mb-2 block">
                    ¿Qué ciudad del NEA quieres visitar?
                  </Label>
                  <Select value={neaDestination} onValueChange={setNeaDestination}>
                    <SelectTrigger className="h-10 sm:h-11">
                      <SelectValue placeholder="Selecciona tu destino" />
                    </SelectTrigger>
                    <SelectContent>
                      {neaDestinations.map((destination) => (
                        <SelectItem key={destination.value} value={destination.value}>
                          {destination.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Cada ciudad tiene actividades únicas que conectaremos con tu cultura
                  </p>
                </div>

                <div className="bg-accent/10 p-4 rounded-lg border-l-4 border-accent">
                  <h4 className="font-semibold text-accent mb-2 flex items-center gap-2">
                    <StarIcon className="h-4 w-4" />
                    ¿Qué obtienes?
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Actividades que conecten tu cultura con el NEA</li>
                    <li>• Lugares auténticos recomendados por IA</li>
                    <li>• Experiencias adaptadas a tu trasfondo cultural</li>
                  </ul>
                </div>

                <Button 
                  onClick={handleBuildTour}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft py-3 sm:py-4 text-base sm:text-lg"
                  size="lg"
                  disabled={!name.trim() || !origin.trim() || !neaDestination || isGeneratingExperience}
                >
                  {isGeneratingExperience ? (
                    <>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Generando Experiencia con IA...
                    </>
                  ) : (
                    <>
                      <StarIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Generar Experiencia Cultural con IA
                    </>
                  )}
                </Button>

                {/* Cultural Experience Result */}
                {culturalExperience && (
                  <AnimatedSection animation="fade-in" delay={100}>
                    <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 mt-6">
                      <CardHeader>
                        <CardTitle className="text-primary text-lg sm:text-xl">
                          🌍 Tu Experiencia Cultural Personalizada
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-accent/10 p-4 rounded-lg border-l-4 border-accent">
                          <p className="font-medium text-accent">{culturalExperience.greeting}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-secondary mb-2">🔗 Conexión Cultural:</h4>
                          <p className="text-sm text-muted-foreground">{culturalExperience.culturalConnection}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-secondary mb-2">🎯 Actividades Recomendadas:</h4>
                          <ul className="space-y-1">
                            {culturalExperience.recommendedActivities?.map((activity: string, index: number) => (
                              <li key={index} className="text-sm text-foreground flex items-start gap-2">
                                <span className="text-accent">•</span>
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-secondary mb-2">✨ Experiencias Únicas:</h4>
                          <ul className="space-y-1">
                            {culturalExperience.uniqueExperiences?.map((experience: string, index: number) => (
                              <li key={index} className="text-sm text-foreground flex items-start gap-2">
                                <span className="text-accent">•</span>
                                {experience}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-secondary mb-2">🌉 Puentes Culturales:</h4>
                          <ul className="space-y-1">
                            {culturalExperience.culturalBridges?.map((bridge: string, index: number) => (
                              <li key={index} className="text-sm text-foreground flex items-start gap-2">
                                <span className="text-accent">•</span>
                                {bridge}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-secondary mb-2">💡 Consejos Prácticos:</h4>
                          <ul className="space-y-1">
                            {culturalExperience.practicalTips?.map((tip: string, index: number) => (
                              <li key={index} className="text-sm text-foreground flex items-start gap-2">
                                <span className="text-accent">•</span>
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                )}
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
    </div>
  );
};

export default Index;