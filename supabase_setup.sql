-- MrCar Database Setup
-- Copy and paste this into Supabase SQL Editor

CREATE TABLE IF NOT EXISTS appraisals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  -- Client Info
  client_nombre TEXT NOT NULL,
  client_apellido TEXT NOT NULL,
  client_email TEXT,
  client_telefono TEXT NOT NULL,
  client_rut TEXT NOT NULL,
  client_direccion TEXT,
  client_comuna TEXT,
  
  -- Vehicle Info
  vehicle_marca TEXT NOT NULL,
  vehicle_modelo TEXT NOT NULL,
  vehicle_version TEXT,
  vehicle_ano INTEGER NOT NULL,
  vehicle_color TEXT,
  vehicle_km INTEGER NOT NULL,
  vehicle_motor TEXT,
  vehicle_patente TEXT NOT NULL UNIQUE,
  vehicle_transmision TEXT NOT NULL,
  vehicle_combustible TEXT NOT NULL,
  
  -- Documentation
  permiso_circulacion BOOLEAN,
  vence_permiso TEXT,
  revision_tecnica BOOLEAN,
  vence_revision TEXT,
  soap BOOLEAN,
  seguro BOOLEAN,
  num_duenos INTEGER,
  tasacion NUMERIC(12, 2),
  en_prenda BOOLEAN DEFAULT FALSE,
  
  -- Features
  features JSONB DEFAULT '{}'::jsonb,
  
  -- Technical
  airbags INTEGER,
  num_llaves INTEGER DEFAULT 2,
  neumaticos JSONB DEFAULT '[true, true, true, true, true]'::jsonb,
  observaciones TEXT,
  
  -- Status
  status TEXT DEFAULT 'draft'
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_appraisals_patente ON appraisals(vehicle_patente);
CREATE INDEX IF NOT EXISTS idx_appraisals_created_at ON appraisals(created_at DESC);

-- Enable RLS
ALTER TABLE appraisals ENABLE ROW LEVEL SECURITY;

-- Allow all operations (no auth required)
CREATE POLICY "Allow all operations" ON appraisals FOR ALL USING (true) WITH CHECK (true);
