-- IberApp Database Schema for Supabase
-- Run these commands in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Translations table for NEA cultural expressions
CREATE TABLE translations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    word VARCHAR(100) NOT NULL UNIQUE,
    translation TEXT NOT NULL,
    explanation TEXT NOT NULL,
    example TEXT NOT NULL,
    cultural_bridge TEXT,
    comparison TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User profiles table
CREATE TABLE user_profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    origin VARCHAR(100),
    nea_destination VARCHAR(50),
    cultural_experience VARCHAR(50),
    interests TEXT[], -- Array of interests
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tour experiences table
CREATE TABLE tour_experiences (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    starting_point VARCHAR(100),
    duration VARCHAR(20),
    interests TEXT[],
    tour_data JSONB, -- Flexible JSON data for generated tours
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_translations_word ON translations(word);
CREATE INDEX idx_user_profiles_email ON user_profiles(email);
CREATE INDEX idx_tour_experiences_user_id ON tour_experiences(user_id);
CREATE INDEX idx_tour_experiences_created_at ON tour_experiences(created_at DESC);

-- Insert initial NEA translations
INSERT INTO translations (word, translation, explanation, example, cultural_bridge, comparison) VALUES
('che', 
 'Oye / Hey (saludo informal)', 
 'Expresión muy común en el NEA para llamar la atención o saludar informalmente. Crea familiaridad instantánea.',
 '¡Che, vamos a la costanera a tomar unos mates!',
 'En mi cultura/lugar de origen',
 'Como "ciao" en Italia (saludo casual y amigable) • Como "tío" en España (forma familiar de dirigirse) • Como "güey" en México (tratamiento entre amigos)'
),

('mate', 
 'Ceremonia de té tradicional', 
 'Ritual social sagrado en el NEA que representa compartir, comunidad y conexión. Es más que una bebida.',
 '¿Querés tomar unos mates? Es nuestra forma de hacer nuevos amigos',
 'En mi cultura/lugar de origen',
 'Como la ceremonia del té en Japón (ritual de conexión y respeto) • Como el té compartido en Marruecos (gesto de hospitalidad) • Más comunitario que el afternoon tea británico (todos comparten el mismo recipiente)'
),

('mitaí', 
 'Niño/a (idioma guaraní)', 
 'Palabra guaraní que muestra la herencia indígena viva en el NEA. Se usa cotidianamente mezclando idiomas.',
 'Los mitaí están jugando en la plaza, hablando guaraní y español',
 'En mi cultura/lugar de origen',
 'Como "wawa" en quechua en Perú (idioma indígena en uso diario) • Similar a palabras gaélicas en inglés irlandés (preservación cultural) • Diferente a países donde se suprimieron idiomas originarios'
),

('sapucai', 
 'Grito de alegría y celebración guaraní', 
 'Expresión indígena que sobrevivió la colonización, usada en música folclórica y celebraciones del NEA.',
 '¡Sapucai! se escucha en cada festival de chamamé',
 'En mi cultura/lugar de origen',
 'Como "sláinte!" en Irlanda (grito celebratorio con significado cultural profundo) • Como "¡órale!" en México (expresión de alegría) • Similar a gritos de guerra escoceses (conecta con orgullo ancestral)'
),

('aguante', 
 'Resistencia, aguantar', 
 'Expresión que denota fortaleza emocional y física. Muy usada en el contexto cultural del NEA.',
 'Aguante el calor del verano norteño',
 'En mi cultura/lugar de origen',
 'Como "resilience" en inglés (capacidad de resistir adversidades) • Como "gaman" en japonés (resistir con paciencia) • Similar a "saudade" portuguesa (sentimiento profundo arraigado)'
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_translations_updated_at 
    BEFORE UPDATE ON translations 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at 
    BEFORE UPDATE ON user_profiles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tour_experiences ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to translations
CREATE POLICY "Translations are viewable by everyone" ON translations
    FOR SELECT USING (true);

-- Create policies for user profiles (allow public access for demo)
CREATE POLICY "Public can view profiles" ON user_profiles
    FOR SELECT USING (true);

CREATE POLICY "Public can insert profiles" ON user_profiles
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can update profiles" ON user_profiles
    FOR UPDATE USING (true);

-- Create policies for tour experiences (users can only see their own)
CREATE POLICY "Users can view their own tours" ON tour_experiences
    FOR SELECT USING (
        user_id IN (
            SELECT id FROM user_profiles WHERE email = auth.email()
        )
    );

CREATE POLICY "Users can insert their own tours" ON tour_experiences
    FOR INSERT WITH CHECK (
        user_id IN (
            SELECT id FROM user_profiles WHERE email = auth.email()
        )
    );