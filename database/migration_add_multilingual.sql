-- Migration script to add multilingual support to existing translations table
-- Run this in your Supabase SQL Editor if you already have data

-- Step 1: Add new columns to existing translations table
ALTER TABLE translations 
ADD COLUMN IF NOT EXISTS user_origin VARCHAR(100) DEFAULT 'internacional',
ADD COLUMN IF NOT EXISTS target_language VARCHAR(50) DEFAULT 'español';

-- Step 2: Drop the old unique constraint on word
ALTER TABLE translations DROP CONSTRAINT IF EXISTS translations_word_key;

-- Step 3: Add new unique constraint for word+origin+language combination
ALTER TABLE translations 
ADD CONSTRAINT translations_word_origin_lang_unique 
UNIQUE (word, user_origin, target_language);

-- Step 4: Update existing records to have proper values
UPDATE translations 
SET user_origin = 'internacional', 
    target_language = 'español' 
WHERE user_origin IS NULL OR target_language IS NULL;

-- Step 5: Create new indexes for better performance
CREATE INDEX IF NOT EXISTS idx_translations_word_origin ON translations(word, user_origin);
CREATE INDEX IF NOT EXISTS idx_translations_word_origin_lang ON translations(word, user_origin, target_language);
CREATE INDEX IF NOT EXISTS idx_translations_user_origin ON translations(user_origin);
CREATE INDEX IF NOT EXISTS idx_translations_target_language ON translations(target_language);

-- Step 6: Add policy for inserting new translations
DROP POLICY IF EXISTS "Public can insert translations" ON translations;
CREATE POLICY "Public can insert translations" ON translations
    FOR INSERT WITH CHECK (true);

-- Step 7: Insert sample translations in different languages (if they don't exist)
INSERT INTO translations (word, user_origin, target_language, translation, explanation, example, cultural_bridge, comparison) 
VALUES 
('che', 'italia', 'italiano',
 'ehi / ciao (saluto informale)', 
 'Espressione molto comune nel NEA per attirare l''attenzione o salutare informalmente. Crea familiarità istantanea.',
 '"Ehi, andiamo alla costanera a bere del mate!" - un saluto amichevole del NEA',
 'Nella mia cultura/luogo di origine (Italia)',
 'Come "ciao" in Italia (saluto casual e amichevole) • Simile a "ehi" per creare familiarità • Diverso dal formale "salve" perché più intimo'
),

('mate', 'brasil', 'portugués',
 'chimarrão / chá da amizade', 
 'Ritual social sagrado no NEA que representa compartilhar, comunidade e conexão. É mais que uma bebida.',
 '"Quer tomar um mate?" - é nossa forma de fazer novos amigos no NEA',
 'Na minha cultura/local de origem (Brasil)',
 'Como o cafezinho brasileiro (momento social) • Similar ao chimarrão gaúcho mas com tradição guarani • Mais comunitário porque todos compartilham o mesmo recipiente'
),

('che', 'estados unidos', 'inglés',
 'hey / yo (informal greeting)', 
 'Very common expression in NEA to get attention or greet informally. Creates instant familiarity.',
 '"Hey, let''s go to the riverside to drink some mate!" - friendly NEA greeting',
 'In my culture/place of origin (United States)',
 'Like "hey" in the US (casual friendly greeting) • Similar to "yo" for creating familiarity • Different from formal "hello" because it''s more intimate and community-oriented'
)
ON CONFLICT (word, user_origin, target_language) DO NOTHING;

-- Step 8: Verify the migration
SELECT 
    word, 
    user_origin, 
    target_language, 
    translation,
    created_at
FROM translations 
ORDER BY word, user_origin, target_language;

-- Display statistics
SELECT 
    target_language,
    user_origin,
    COUNT(*) as translation_count
FROM translations 
GROUP BY target_language, user_origin
ORDER BY target_language, user_origin;
