import { supabase, translationService } from '@/lib/supabase';
import { geminiService } from '@/lib/gemini';

// Test Supabase connection and basic functionality
export async function testSupabaseConnection() {
  try {
    console.log('🧪 Testing Supabase connection...');
    
    // Test 1: Basic connection
    const { data, error } = await supabase.from('translations').select('count', { count: 'exact' });
    
    if (error) {
      console.error('❌ Connection failed:', error.message);
      console.log('🔧 Make sure you ran the schema.sql in your Supabase SQL Editor');
      return false;
    }
    
    console.log('✅ Connection successful!');
    console.log(`📊 Found ${data?.[0]?.count || 0} translations in database`);
    
    // Test 2: Try to fetch a specific translation
    const translation = await translationService.getTranslation('che');
    
    if (translation) {
      console.log('✅ Translation service working!');
      console.log('🔍 Found translation:', translation.word, '->', translation.translation);
    } else {
      console.log('⚠️ No translation found for "che" - run schema.sql to populate data');
    }
    
    // Test 3: Search functionality
    const searchResults = await translationService.searchTranslations('ma');
    console.log(`🔍 Search results for "ma": ${searchResults.length} matches`);
    
    return true;
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    return false;
  }
}

// Test Gemini AI integration
export async function testGeminiIntegration() {
  try {
    console.log('🤖 Testing Gemini AI integration...');
    
    const testWord = 'che';
    const testOrigin = 'México';
    
    console.log(`🔄 Translating "${testWord}" with origin: ${testOrigin}`);
    
    const result = await geminiService.getEnhancedTranslation(testWord, testOrigin);
    
    console.log('✅ Gemini translation successful!');
    console.log('📝 Result:', {
      word: result.word,
      translation: result.translation,
      explanation: result.explanation.substring(0, 100) + '...',
      culturalBridge: result.culturalBridge,
      comparison: result.comparison.substring(0, 150) + '...'
    });
    
    return true;
    
  } catch (error) {
    console.error('❌ Gemini test failed:', error);
    console.log('🔧 Check your VITE_GEMINI_API_KEY in .env file');
    return false;
  }
}

// Test complete integration
export async function testCompleteIntegration() {
  console.log('🚀 Testing complete IberApp integration...\n');
  
  const supabaseOk = await testSupabaseConnection();
  console.log('\n');
  
  const geminiOk = await testGeminiIntegration();
  console.log('\n');
  
  if (supabaseOk && geminiOk) {
    console.log('🎉 All systems working! IberApp is ready to go!');
  } else {
    console.log('⚠️ Some systems need attention. Check the logs above.');
  }
  
  return supabaseOk && geminiOk;
}

// Test functions available from browser console
(window as any).testSupabase = testSupabaseConnection;
(window as any).testGemini = testGeminiIntegration;
(window as any).testIberApp = testCompleteIntegration;