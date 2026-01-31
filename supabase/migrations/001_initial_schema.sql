-- MrCar Database Schema
-- Run this in your Supabase SQL Editor

-- Create appraisals table
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
  vehicle_año INTEGER NOT NULL,
  vehicle_color TEXT,
  vehicle_km INTEGER NOT NULL,
  vehicle_motor TEXT,
  vehicle_patente TEXT NOT NULL UNIQUE,
  vehicle_transmision TEXT NOT NULL CHECK (vehicle_transmision IN ('Manual', 'Automático')),
  vehicle_combustible TEXT NOT NULL CHECK (vehicle_combustible IN ('Bencina', 'Diesel', 'Eléctrico', 'Híbrido')),
  
  -- Documentation
  permiso_circulacion BOOLEAN,
  vence_permiso TEXT,
  revision_tecnica BOOLEAN,
  vence_revision TEXT,
  soap BOOLEAN,
  seguro BOOLEAN,
  num_dueños INTEGER,
  tasacion NUMERIC(12, 2),
  en_prenda BOOLEAN DEFAULT FALSE,
  
  -- Features (JSONB for flexibility)
  features JSONB DEFAULT '{
    "aireAcondicionado": false,
    "bluetooth": false,
    "calefactorAsiento": false,
    "conexionUsb": false,
    "gps": false,
    "isofix": false,
    "smartKey": false,
    "lucesLed": false,
    "mandosVolante": false,
    "sensorEstacionamiento": false,
    "sonidoPremium": false,
    "techoElectrico": false,
    "ventiladorAsiento": false,
    "carplayAndroid": false
  }'::jsonb,
  
  -- Technical
  airbags INTEGER,
  num_llaves INTEGER DEFAULT 2,
  neumaticos JSONB DEFAULT '[true, true, true, true, true]'::jsonb,
  
  -- Notes
  observaciones TEXT,
  
  -- Status
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'completed', 'archived'))
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_appraisals_patente ON appraisals(vehicle_patente);
CREATE INDEX IF NOT EXISTS idx_appraisals_created_at ON appraisals(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_appraisals_status ON appraisals(status);
CREATE INDEX IF NOT EXISTS idx_appraisals_client_rut ON appraisals(client_rut);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_appraisals_updated_at BEFORE UPDATE ON appraisals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE appraisals ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (no authentication required)
-- Adjust this based on your security requirements
CREATE POLICY "Allow all operations on appraisals" ON appraisals
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Optional: Create a view for summary statistics
CREATE OR REPLACE VIEW appraisal_stats AS
SELECT
  COUNT(*) as total_appraisals,
  COUNT(*) FILTER (WHERE status = 'draft') as pending_appraisals,
  COUNT(*) FILTER (WHERE status = 'completed') as completed_appraisals,
  COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as appraisals_last_30_days,
  COUNT(DISTINCT client_rut) as total_clients
FROM appraisals;

-- Grant access to the view
GRANT SELECT ON appraisal_stats TO anon, authenticated;

-- Optional: Create vehicle_images table for future image upload feature
CREATE TABLE IF NOT EXISTS vehicle_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  appraisal_id UUID REFERENCES appraisals(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  image_type TEXT CHECK (image_type IN ('exterior', 'interior', 'damage', 'documents')),
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_vehicle_images_appraisal_id ON vehicle_images(appraisal_id);

-- Enable RLS on vehicle_images
ALTER TABLE vehicle_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on vehicle_images" ON vehicle_images
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Insert a sample appraisal for testing (optional)
INSERT INTO appraisals (
  client_nombre,
  client_apellido,
  client_telefono,
  client_rut,
  vehicle_marca,
  vehicle_modelo,
  vehicle_año,
  vehicle_km,
  vehicle_patente,
  vehicle_transmision,
  vehicle_combustible,
  status
) VALUES (
  'Juan',
  'Pérez',
  '+56912345678',
  '12.345.678-9',
  'Toyota',
  'Corolla',
  2020,
  45000,
  'DEMO-01',
  'Automático',
  'Bencina',
  'completed'
) ON CONFLICT (vehicle_patente) DO NOTHING;

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'MrCar database schema created successfully!';
  RAISE NOTICE 'Tables created: appraisals, vehicle_images';
  RAISE NOTICE 'View created: appraisal_stats';
  RAISE NOTICE 'Sample data inserted (if not exists)';
END $$;
