-- Script para corregir las políticas de Row Level Security en Supabase
-- Ejecuta este script en tu Supabase SQL Editor

-- 1. Eliminar políticas existentes problemáticas
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;

-- 2. Crear nuevas políticas que permitan acceso público (para desarrollo/demo)
CREATE POLICY "Public can view profiles" ON user_profiles
    FOR SELECT USING (true);

CREATE POLICY "Public can insert profiles" ON user_profiles
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can update profiles" ON user_profiles
    FOR UPDATE USING (true);

-- 3. Verificar que las traducciones sean públicamente accesibles
DROP POLICY IF EXISTS "Translations are viewable by everyone" ON translations;
CREATE POLICY "Public can view translations" ON translations
    FOR SELECT USING (true);

-- 4. Permitir insertar nuevas traducciones desde la app
CREATE POLICY "Public can insert translations" ON translations
    FOR INSERT WITH CHECK (true);

-- 5. Verificar el estado de las tablas
SELECT 
    schemaname,
    tablename,
    rowsecurity,
    (SELECT count(*) FROM pg_policies WHERE tablename = t.tablename) as policy_count
FROM pg_tables t 
WHERE schemaname = 'public' 
    AND tablename IN ('translations', 'user_profiles', 'tour_experiences');

-- 6. Mostrar las políticas actuales
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'public' 
    AND tablename IN ('translations', 'user_profiles', 'tour_experiences');
