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
  // Get translation by word
  async getTranslation(word: string): Promise<Translation | null> {
    const { data, error } = await supabase
      .from('translations')
      .select('*')
      .ilike('word', word)
      .single();
    
    if (error) {
      console.error('Error fetching translation:', error);
      return null;
    }
    
    return data;
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

  // Add new translation
  async addTranslation(translation: Omit<Translation, 'id' | 'created_at' | 'updated_at'>): Promise<Translation | null> {
    const { data, error } = await supabase
      .from('translations')
      .insert(translation)
      .select()
      .single();
    
    if (error) {
      console.error('Error adding translation:', error);
      return null;
    }
    
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