import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Cross2Icon, 
  MarginIcon, 
  ClockIcon, 
  StarIcon, 
  HeartIcon, 
  GlobeIcon, 
  HamburgerMenuIcon, 
  FileTextIcon,
  PersonIcon,
  BoxIcon,
  DownloadIcon,
  Share1Icon,
  SunIcon,
  DropdownMenuIcon,
  WidthIcon
} from '@radix-ui/react-icons';

interface CulturalExperience {
  userName: string;
  destination: string;
  duration: string;
  interests: string[];
  weatherData: {
    currentTemp: string;
    condition: string;
    humidity: string;
    windSpeed: string;
    uvIndex: string;
    feelsLike: string;
    sunrise: string;
    sunset: string;
  };
  climateBasedRecommendations: {
    indoorActivities: {
      name: string;
      reason: string;
      culturalValue: string;
      duration: string;
      bestTime: string;
      tips: string;
    }[];
    outdoorActivities: {
      name: string;
      reason: string;
      culturalValue: string;
      duration: string;
      bestTime: string;
      tips: string;
    }[];
    weatherAdaptations: {
      tip: string;
      reason: string;
      culturalNote: string;
    }[];
  };
  culturalConnections: {
    origin: string;
    similarities: string[];
    differences: string[];
    bridgeActivities: string[];
  };
  recommendations: {
    food: string[];
    language: string[];
    customs: string[];
    souvenirs: string[];
  };
}

interface CulturalExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  experience: CulturalExperience;
}

export const CulturalExperienceModal: React.FC<CulturalExperienceModalProps> = ({
  isOpen,
  onClose,
  experience
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-background rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto mx-2">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b p-4 sm:p-6 rounded-t-xl sm:rounded-t-2xl">
          <div className="flex items-start sm:items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold text-primary leading-tight">
                ¡{experience.userName}, tu experiencia está lista! ✨
              </h2>
              <p className="text-sm sm:text-lg text-muted-foreground mt-1 leading-relaxed">
                Recomendaciones personalizadas para {experience.destination} basadas en el clima actual
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0"
            >
              <Cross2Icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
          {/* Weather Info */}
          <Card className="bg-gradient-to-r from-blue-50 to-orange-50 border-blue-200">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-blue-700 text-lg sm:text-xl">
                <SunIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                Clima Actual en {experience.destination}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-700">{experience.weatherData.currentTemp}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Temperatura</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-orange-600">{experience.weatherData.condition}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Condición</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600">{experience.weatherData.humidity}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Humedad</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-purple-600">{experience.weatherData.uvIndex}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Índice UV</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-blue-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <DropdownMenuIcon className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500 flex-shrink-0" />
                    <span className="truncate">Sensación: {experience.weatherData.feelsLike}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <WidthIcon className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
                    <span className="truncate">Viento: {experience.weatherData.windSpeed}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <SunIcon className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 flex-shrink-0" />
                    <span className="truncate">Amanecer: {experience.weatherData.sunrise}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <SunIcon className="h-3 w-3 sm:h-4 sm:w-4 text-orange-500 flex-shrink-0" />
                    <span className="truncate">Atardecer: {experience.weatherData.sunset}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Destination Info */}
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <MarginIcon className="h-5 w-5" />
                Tu Destino en el NEA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{experience.destination}</h3>
                  <p className="text-muted-foreground flex items-center gap-2 mt-1">
                    <ClockIcon className="h-4 w-4" />
                    {experience.duration}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex gap-1">
                    {experience.interests.map((interest, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Climate-Based Recommendations */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-green-600 text-lg sm:text-xl">
                <StarIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                Recomendaciones Basadas en el Clima
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Actividades optimizadas para las condiciones climáticas actuales
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 space-y-6 sm:space-y-8">
              {/* Indoor Activities */}
              <div>
                <h4 className="font-semibold text-blue-600 mb-3 flex items-center gap-2 text-base sm:text-lg">
                  <StarIcon className="h-4 w-4" />
                  Actividades de Interior (Protección del Sol)
                </h4>
                <div className="space-y-3 sm:space-y-4">
                  {experience.climateBasedRecommendations.indoorActivities.map((activity, index) => (
                    <div key={index} className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
                      <div className="flex items-start justify-between mb-2 gap-2">
                        <h5 className="font-semibold text-blue-800 text-sm sm:text-base leading-tight">{activity.name}</h5>
                        <Badge variant="outline" className="text-xs bg-blue-100 flex-shrink-0">
                          {activity.duration}
                        </Badge>
                      </div>
                      <p className="text-xs sm:text-sm text-blue-700 mb-2 leading-relaxed">
                        <span className="font-medium">Por qué ahora:</span> {activity.reason}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2 leading-relaxed">
                        <span className="font-medium">Valor cultural:</span> {activity.culturalValue}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-blue-600 mb-2">
                        <ClockIcon className="h-3 w-3 flex-shrink-0" />
                        <span>Mejor horario: {activity.bestTime}</span>
                      </div>
                      <div className="bg-white p-2 sm:p-3 rounded border-l-4 border-blue-400">
                        <p className="text-xs sm:text-sm text-blue-800 leading-relaxed">
                          <span className="font-medium">💡 Tip:</span> {activity.tips}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outdoor Activities */}
              <div>
                <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2 text-base sm:text-lg">
                  <StarIcon className="h-4 w-4" />
                  Actividades de Exterior (Horarios Optimizados)
                </h4>
                <div className="space-y-3 sm:space-y-4">
                  {experience.climateBasedRecommendations.outdoorActivities.map((activity, index) => (
                    <div key={index} className="bg-green-50 p-3 sm:p-4 rounded-lg border border-green-200">
                      <div className="flex items-start justify-between mb-2 gap-2">
                        <h5 className="font-semibold text-green-800 text-sm sm:text-base leading-tight">{activity.name}</h5>
                        <Badge variant="outline" className="text-xs bg-green-100 flex-shrink-0">
                          {activity.duration}
                        </Badge>
                      </div>
                      <p className="text-xs sm:text-sm text-green-700 mb-2 leading-relaxed">
                        <span className="font-medium">Por qué este horario:</span> {activity.reason}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2 leading-relaxed">
                        <span className="font-medium">Valor cultural:</span> {activity.culturalValue}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-green-600 mb-2">
                        <ClockIcon className="h-3 w-3 flex-shrink-0" />
                        <span>Horario recomendado: {activity.bestTime}</span>
                      </div>
                      <div className="bg-white p-2 sm:p-3 rounded border-l-4 border-green-400">
                        <p className="text-xs sm:text-sm text-green-800 leading-relaxed">
                          <span className="font-medium">🌤️ Consejo climático:</span> {activity.tips}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weather Adaptations */}
              <div>
                <h4 className="font-semibold text-orange-600 mb-3 flex items-center gap-2 text-base sm:text-lg">
                  <StarIcon className="h-4 w-4" />
                  Adaptaciones al Clima Local
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {experience.climateBasedRecommendations.weatherAdaptations.map((adaptation, index) => (
                    <div key={index} className="bg-orange-50 p-3 sm:p-4 rounded-lg border border-orange-200">
                      <h5 className="font-semibold text-orange-800 text-sm mb-1 leading-tight">{adaptation.tip}</h5>
                      <p className="text-xs text-orange-700 mb-1 leading-relaxed">{adaptation.reason}</p>
                      <p className="text-xs text-muted-foreground italic leading-relaxed">{adaptation.culturalNote}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cultural Connections */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-secondary text-lg sm:text-xl">
                <GlobeIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                Puentes Culturales
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Conexiones entre tu cultura de {experience.culturalConnections.origin} y el NEA
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h4 className="font-semibold text-green-600 mb-2 flex items-center gap-2 text-sm sm:text-base">
                    <HeartIcon className="h-4 w-4" />
                    Similitudes
                  </h4>
                  <ul className="space-y-1">
                    {experience.culturalConnections.similarities.map((item, index) => (
                      <li key={index} className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2 leading-relaxed">
                        <StarIcon className="h-3 w-3 text-green-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-600 mb-2 flex items-center gap-2 text-sm sm:text-base">
                    <FileTextIcon className="h-4 w-4" />
                    Diferencias
                  </h4>
                  <ul className="space-y-1">
                    {experience.culturalConnections.differences.map((item, index) => (
                      <li key={index} className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2 leading-relaxed">
                        <GlobeIcon className="h-3 w-3 text-blue-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold text-accent mb-2 text-sm sm:text-base">Actividades Puente</h4>
                <div className="flex flex-wrap gap-2">
                  {experience.culturalConnections.bridgeActivities.map((activity, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-accent/10">
                      {activity}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <StarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                Recomendaciones Especiales
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Consejos personalizados para tu experiencia cultural
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2 flex items-center gap-2 text-sm sm:text-base">
                      <HamburgerMenuIcon className="h-4 w-4" />
                      Gastronomía Local
                    </h4>
                    <div className="space-y-1">
                      {experience.recommendations.food.map((item, index) => (
                        <p key={index} className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          • {item}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-600 mb-2 flex items-center gap-2 text-sm sm:text-base">
                      <FileTextIcon className="h-4 w-4" />
                      Expresiones Locales
                    </h4>
                    <div className="space-y-1">
                      {experience.recommendations.language.map((item, index) => (
                        <p key={index} className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          • {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-purple-600 mb-2 flex items-center gap-2 text-sm sm:text-base">
                      <PersonIcon className="h-4 w-4" />
                      Costumbres Locales
                    </h4>
                    <div className="space-y-1">
                      {experience.recommendations.customs.map((item, index) => (
                        <p key={index} className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          • {item}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-600 mb-2 flex items-center gap-2 text-sm sm:text-base">
                      <BoxIcon className="h-4 w-4" />
                      Souvenirs Culturales
                    </h4>
                    <div className="space-y-1">
                      {experience.recommendations.souvenirs.map((item, index) => (
                        <p key={index} className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          • {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button className="flex-1 bg-primary hover:bg-primary/90 py-3 sm:py-4 text-sm sm:text-base" size="lg">
              <DownloadIcon className="mr-2 h-4 w-4" />
              Descargar Experiencia
            </Button>
            <Button variant="outline" className="flex-1 py-3 sm:py-4 text-sm sm:text-base" size="lg">
              <Share1Icon className="mr-2 h-4 w-4" />
              Compartir
            </Button>
            <Button variant="ghost" onClick={onClose} className="py-3 sm:py-4 text-sm sm:text-base" size="lg">
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}; 