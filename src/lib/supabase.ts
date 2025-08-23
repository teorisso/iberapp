import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Database types (extend as needed)
export interface Translation {
  id: string;
  word: string;
  user_origin: string;
  target_language: string;
  translation: string;
  explanation: string;
  example: string;
  cultural_bridge: string;
  comparison: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  origin: string;
  nea_destination: string;
  cultural_experience: string;
  interests: string[];
  created_at: string;
  updated_at: string;
}

export interface TourExperience {
  id: string;
  user_id: string;
  starting_point: string;
  duration: string;
  interests: string[];
  tour_data: any; // JSON data for the generated tour
  created_at: string;
}

// Helper functions for common operations
export const translationService = {
  // Get translation by word, prioritizing user origin and target language
  async getTranslation(word: string, userOrigin?: string, targetLanguage?: string): Promise<Translation | null> {
    let query = supabase
      .from('translations')
      .select('*')
      .ilike('word', word);

    // Priority 1: Try to find exact match with user origin and target language
    if (userOrigin && targetLanguage) {
      const { data: exactMatch } = await query
        .eq('user_origin', userOrigin.toLowerCase())
        .eq('target_language', targetLanguage)
        .single();
      
      if (exactMatch) {
        console.log(`✅ Found exact translation for ${word} (${userOrigin} -> ${targetLanguage})`);
        return exactMatch;
      }
    }

    // Priority 2: Try to find match with user origin (any language)
    if (userOrigin) {
      const { data: originMatch } = await query
        .eq('user_origin', userOrigin.toLowerCase())
        .single();
      
      if (originMatch) {
        console.log(`✅ Found origin-specific translation for ${word} (${userOrigin})`);
        return originMatch;
      }
    }

    // Priority 3: Try to find match with target language (any origin)
    if (targetLanguage) {
      const { data: langMatch } = await query
        .eq('target_language', targetLanguage)
        .single();
      
      if (langMatch) {
        console.log(`✅ Found language-specific translation for ${word} (${targetLanguage})`);
        return langMatch;
      }
    }

    // Priority 4: Fall back to default/international version
    const { data: defaultMatch, error } = await query
      .eq('user_origin', 'internacional')
      .single();
    
    if (error) {
      console.error('Error fetching translation:', error);
      return null;
    }
    
    if (defaultMatch) {
      console.log(`✅ Found default translation for ${word}`);
    }
    
    return defaultMatch;
  },

  // Search translations by partial word match
  async searchTranslations(query: string): Promise<Translation[]> {
    const { data, error } = await supabase
      .from('translations')
      .select('*')
      .ilike('word', `%${query}%`)
      .limit(10);
    
    if (error) {
      console.error('Error searching translations:', error);
      return [];
    }
    
    return data || [];
  },

  // Add new translation with user origin and target language
  async addTranslation(translation: Omit<Translation, 'id' | 'created_at' | 'updated_at'>): Promise<Translation | null> {
    // Ensure we have user_origin and target_language
    const translationData = {
      ...translation,
      user_origin: translation.user_origin || 'internacional',
      target_language: translation.target_language || 'español'
    };

    console.log('💾 Saving translation to database:', {
      word: translationData.word,
      user_origin: translationData.user_origin,
      target_language: translationData.target_language
    });

    const { data, error } = await supabase
      .from('translations')
      .insert(translationData)
      .select()
      .single();
    
    if (error) {
      console.error('Error adding translation:', error);
      return null;
    }
    
    console.log('✅ Translation saved successfully');
    return data;
  }
};

export const userService = {
  // Create or update user profile
  async upsertProfile(profile: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert(profile, { onConflict: 'email' })
      .select()
      .single();
    
    if (error) {
      console.error('Error upserting profile:', error);
      return null;
    }
    
    return data;
  },

  // Get user profile by email
  async getProfile(email: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    
    return data;
  }
};

export const tourService = {
  // Save tour experience
  async saveTourExperience(tour: Omit<TourExperience, 'id' | 'created_at'>): Promise<TourExperience | null> {
    const { data, error } = await supabase
      .from('tour_experiences')
      .insert(tour)
      .select()
      .single();
    
    if (error) {
      console.error('Error saving tour experience:', error);
      return null;
    }
    
    return data;
  },

  // Get user's tour history
  async getUserTours(userId: string): Promise<TourExperience[]> {
    const { data, error } = await supabase
      .from('tour_experiences')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching user tours:', error);
      return [];
    }
    
    return data || [];
  }
};