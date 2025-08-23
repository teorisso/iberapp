// Gemini AI Service for cultural translations
import { translationService } from './supabase';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

console.log('🔧 Gemini API Key:', GEMINI_API_KEY ? 'Found' : 'Missing');

if (!GEMINI_API_KEY) {
  console.warn('GEMINI_API_KEY not found in environment variables');
}

export interface GeminiTranslationRequest {
  word: string;
  userOrigin?: string;
  culturalContext?: string;
}

export interface GeminiTranslationResponse {
  word: string;
  translation: string;
  explanation: string;
  example: string;
  culturalBridge: string;
  comparison: string;
}

class GeminiService {
  // Helper function to suggest similar words when one is not found
  private getSuggestedWords(searchWord: string): string[] {
    const availableWords = ['che', 'mate', 'mitaí', 'sapucai', 'aguante'];
    
    // Simple similarity based on first letters or common patterns
    const firstLetter = searchWord.toLowerCase().charAt(0);
    const suggested = availableWords.filter(word => 
      word.toLowerCase().charAt(0) === firstLetter
    );
    
    // If no matches by first letter, return random popular words
    if (suggested.length === 0) {
      return ['che', 'mate', 'mitaí'];
    }
    
    return suggested.length > 3 ? suggested.slice(0, 3) : suggested;
  }

  private async callGeminiAPI(prompt: string): Promise<string> {
    if (!GEMINI_API_KEY) {
      throw new Error('Gemini API key not configured');
    }

    console.log('🤖 Calling Gemini API...');
    console.log('🔑 API Key exists:', !!GEMINI_API_KEY);

    try {
      const requestBody = {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.9,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      };

      console.log('📤 Request body:', JSON.stringify(requestBody, null, 2));

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);
      console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Gemini API error response:', errorText);
        
        let errorDetails;
        try {
          errorDetails = JSON.parse(errorText);
        } catch {
          errorDetails = { message: errorText };
        }

        // Handle specific error types
        if (response.status === 429) {
          console.warn('⚠️ Rate limit hit, but this might be temporary or due to concurrent requests');
        } else if (response.status === 400) {
          console.warn('⚠️ Bad request - checking prompt format');
        } else if (response.status === 403) {
          console.warn('⚠️ API key might be invalid or restricted');
        }

        throw new Error(`Gemini API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      console.log('📝 Gemini API response:', data);
      
      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        console.error('❌ Invalid response format:', data);
        throw new Error('Invalid response format from Gemini API');
      }

      console.log('✅ Gemini API call successful');
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('❌ Gemini API call failed:', error);
      throw error;
    }
  }

  async translateWithCulturalContext(request: GeminiTranslationRequest): Promise<GeminiTranslationResponse> {
    const { word, userOrigin = "internacional", culturalContext = "" } = request;

    const prompt = `
    Eres un experto en cultura del NEA (Noreste Argentino) especializado en traducciones culturales.

    Analiza la palabra/expresión: "${word}"
    Usuario viene de: ${userOrigin}
    Contexto adicional: ${culturalContext}

    Proporciona una respuesta en formato JSON exacto con estas claves:

    {
      "word": "${word}",
      "translation": "Traducción clara y concisa",
      "explanation": "Explicación del contexto cultural del NEA, su origen y uso actual",
      "example": "Ejemplo práctico de uso en una oración típica del NEA",
      "culturalBridge": "En mi cultura/lugar de origen (${userOrigin})",
      "comparison": "Comparación específica con expresiones similares de ${userOrigin} o culturas mundiales, mostrando similitudes y diferencias culturales. Usa formato: Como X en [país] (contexto) • Como Y en [país] (contexto) • Diferente a Z porque [razón]"
    }

    IMPORTANTE:
    - Responde SOLO en formato JSON válido
    - Si no conoces la palabra, indica "Palabra no encontrada" en translation
    - Enfócate en aspectos culturales únicos del NEA
    - Incluye referencias guaraníes si aplica
    - Haz comparaciones específicas con la cultura de origen del usuario
    `;

    try {
      const response = await this.callGeminiAPI(prompt);
      
      // Try to parse JSON response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in Gemini response');
      }

      const parsedResponse = JSON.parse(jsonMatch[0]);
      
      // Validate required fields
      const requiredFields = ['word', 'translation', 'explanation', 'example', 'culturalBridge', 'comparison'];
      for (const field of requiredFields) {
        if (!parsedResponse[field]) {
          throw new Error(`Missing required field: ${field}`);
        }
      }

      return parsedResponse as GeminiTranslationResponse;

    } catch (error) {
      console.error('Error calling Gemini API:', error);
      
      // Return fallback response
      return {
        word,
        translation: 'No se pudo procesar la traducción',
        explanation: 'Error al conectar con el servicio de traducción cultural.',
        example: 'Intenta de nuevo en unos momentos.',
        culturalBridge: `En mi cultura/lugar de origen (${userOrigin})`,
        comparison: 'No disponible temporalmente. Verifica tu conexión a internet.'
      };
    }
  }

  async getEnhancedTranslation(
    word: string, 
    userOrigin?: string, 
    culturalContext?: string
  ): Promise<GeminiTranslationResponse> {
    try {
      // First, try to get from Supabase database
      const dbTranslation = await translationService.getTranslation(word);
      
      if (dbTranslation) {
        console.log('✅ Found translation in database, trying to enhance with Gemini...');
        
        // If found in database, try to enhance with user-specific cultural bridge
        if (userOrigin && userOrigin !== "internacional") {
          try {
            // Use Gemini to create personalized cultural bridge
            const enhancedResponse = await this.translateWithCulturalContext({
              word,
              userOrigin,
              culturalContext: `Traducción base: ${dbTranslation.translation}. ${dbTranslation.explanation}`
            });
            
            return {
              ...enhancedResponse,
              translation: dbTranslation.translation,
              explanation: dbTranslation.explanation,
              example: dbTranslation.example
            };
          } catch (geminiError) {
            console.warn('⚠️ Gemini not available, using database version with personalized bridge');
            // Fallback: Return database version with enhanced personalized cultural bridge
            return {
              word: dbTranslation.word,
              translation: dbTranslation.translation,
              explanation: dbTranslation.explanation,
              example: dbTranslation.example,
              culturalBridge: `En mi cultura/lugar de origen (${userOrigin})`,
              comparison: `Al igual que las expresiones culturales en ${userOrigin}, "${dbTranslation.word}" del NEA muestra cómo el lenguaje conecta comunidades. ${dbTranslation.comparison}`
            };
          }
        }
        
        // Return database version with standard format
        return {
          word: dbTranslation.word,
          translation: dbTranslation.translation,
          explanation: dbTranslation.explanation,
          example: dbTranslation.example,
          culturalBridge: dbTranslation.cultural_bridge || "En mi cultura/lugar de origen",
          comparison: dbTranslation.comparison
        };
      }
      
      console.log('⚠️ Word not found in database, trying Gemini...');
      
      // If not in database, try Gemini to generate new translation
      try {
        const geminiResponse = await this.translateWithCulturalContext({
          word,
          userOrigin,
          culturalContext
        });

        // Try to save to database for future use
        try {
          await translationService.addTranslation({
            word: geminiResponse.word,
            translation: geminiResponse.translation,
            explanation: geminiResponse.explanation,
            example: geminiResponse.example,
            cultural_bridge: geminiResponse.culturalBridge,
            comparison: geminiResponse.comparison
          });
          console.log('✅ Saved new translation to database');
        } catch (saveError) {
          console.warn('Could not save translation to database:', saveError);
        }

        return geminiResponse;
      } catch (geminiError) {
        console.warn('⚠️ Gemini not available, returning fallback response');
        
        // Final fallback: Return a helpful message suggesting available words
        const suggestedWords = this.getSuggestedWords(word);
        return {
          word,
          translation: 'Palabra no encontrada en nuestra base de datos',
          explanation: `La palabra "${word}" no está disponible en nuestra base de datos del NEA. Puede ser que no sea una expresión típica de la región, que esté mal escrita, o que aún no la hayamos agregado a nuestra colección.`,
          example: `Prueba con estas palabras del NEA: ${suggestedWords.map(w => `"${w}"`).join(', ')}`,
          culturalBridge: userOrigin ? `En mi cultura/lugar de origen (${userOrigin})` : "En mi cultura/lugar de origen",
          comparison: `Cada palabra del NEA tiene conexiones culturales únicas. Las palabras ${suggestedWords.join(', ')} están disponibles y muestran puentes culturales fascinantes con diferentes regiones del mundo.`
        };
      }

    } catch (error) {
      console.error('Error in getEnhancedTranslation:', error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();