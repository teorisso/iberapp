// Debug script for Gemini API in browser
import { geminiService } from '@/lib/gemini';

export async function debugGeminiAPI() {
  console.log('🔍 Starting Gemini API debug...');
  
  // Check environment variables
  console.log('🔧 Environment Variables:');
  console.log('- VITE_GEMINI_API_KEY:', import.meta.env.VITE_GEMINI_API_KEY ? 'Found ✅' : 'Missing ❌');
  console.log('- NODE_ENV:', import.meta.env.NODE_ENV);
  console.log('- DEV:', import.meta.env.DEV);
  
  // Test direct API call
  try {
    console.log('🤖 Testing Gemini API directly...');
    
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
    
    if (!API_KEY) {
      console.error('❌ No API key found');
      return false;
    }
    
    const testPrompt = `
    Responde en formato JSON exacto:
    {
      "word": "che",
      "translation": "Hola/Oye",
      "explanation": "Saludo informal del NEA",
      "example": "¡Che, cómo andás!",
      "culturalBridge": "En mi cultura/lugar de origen",
      "comparison": "Como hello en inglés"
    }
    `;
    
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: testPrompt }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });
    
    console.log('📡 Raw response status:', response.status);
    console.log('📡 Raw response ok:', response.ok);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error:', errorText);
      return false;
    }
    
    const data = await response.json();
    console.log('📝 Raw API response:', data);
    
    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.log('✅ Direct API call successful!');
      console.log('📄 Response text:', data.candidates[0].content.parts[0].text);
    } else {
      console.error('❌ Invalid response format');
      return false;
    }
    
    // Test through service
    console.log('🔧 Testing through geminiService...');
    const serviceResult = await geminiService.getEnhancedTranslation('che', 'México');
    console.log('✅ Service result:', serviceResult);
    
    return true;
    
  } catch (error) {
    console.error('❌ Debug failed:', error);
    return false;
  }
}

// Test a simple translation
export async function testSimpleTranslation() {
  try {
    console.log('🧪 Testing simple translation...');
    const result = await geminiService.getEnhancedTranslation('mate', 'Francia');
    console.log('✅ Translation result:', result);
    return result;
  } catch (error) {
    console.error('❌ Translation test failed:', error);
    throw error;
  }
}

// Make functions available globally
(window as any).debugGemini = debugGeminiAPI;
(window as any).testTranslation = testSimpleTranslation;