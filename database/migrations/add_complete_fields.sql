-- Add all missing fields from PDF template to appraisals table
-- This ensures 100% match with the PDF Ficha template

-- Documentation fields (from top section)
ALTER TABLE appraisals ADD COLUMN IF NOT EXISTS observations TEXT;
ALTER TABLE appraisals ADD COLUMN IF NOT EXISTS permiso_vence TEXT;
ALTER TABLE appraisals ADD COLUMN IF NOT EXISTS revision_vence TEXT;
ALTER TABLE appraisals ADD COLUMN IF NOT EXISTS soap_compania TEXT;
ALTER TABLE appraisals ADD COLUMN IF NOT EXISTS seguro_compania TEXT;
ALTER TABLE appraisals ADD COLUMN IF NOT EXISTS permiso_comuna TEXT;
ALTER TABLE appraisals ADD COLUMN IF NOT EXISTS mantenciones TEXT;
ALTER TABLE appraisals ADD COLUMN IF NOT EXISTS duenos INTEGER;
ALTER TABLE appraisals ADD COLUMN IF NOT EXISTS codigo_sii TEXT;

-- Pricing fields
ALTER TABLE appraisals ADD COLUMN IF NOT EXISTS precio_publicado NUMERIC(12,2);
ALTER TABLE appraisals ADD COLUMN IF NOT EXISTS precio_sugerido NUMERIC(12,2);
ALTER TABLE appraisals ADD COLUMN IF NOT EXISTS digito_patente TEXT;

-- Vehicle features (boolean checkboxes)
ALTER TABLE appraisals ADD COLUMN IF NOT EXISTS calefactor_asiento BOOLEAN DEFAULT false;
ALTER TABLE appraisals ADD COLUMN IF NOT EXISTS conexion_usb BOOLEAN DEFAULT false;
ALTER TABLE appraisals ADD COLUMN IF NOT EXISTS gps BOOLEAN DEFAULT false;
ALTER TABLE appraisals ADD COLUMN IF NOT EXISTS isofix BOOLEAN DEFAULT false;
ALTER TABLE appraisals ADD COLUMN IF NOT EXISTS smart_key BOOLEAN DEFAULT false;
ALTER TABLE appraisals ADD COLUMN IF NOT EXISTS luces_led BOOLEAN DEFAULT false;
ALTER TABLE appraisals ADD COLUMN IF NOT EXISTS mandos_volante BOOLEAN DEFAULT false;
ALTER TABLE appraisals ADD COLUMN IF NOT EXISTS sensor_estacionamiento BOOLEAN DEFAULT false;
ALTER TABLE appraisals ADD COLUMN IF NOT EXISTS sonido_premium BOOLEAN DEFAULT false;
ALTER TABLE appraisals ADD COLUMN IF NOT EXISTS techo_electrico BOOLEAN DEFAULT false;
ALTER TABLE appraisals ADD COLUMN IF NOT EXISTS ventilador_asiento BOOLEAN DEFAULT false;
ALTER TABLE appraisals ADD COLUMN IF NOT EXISTS carplay_android BOOLEAN DEFAULT false;

-- Additional fields
ALTER TABLE appraisals ADD COLUMN IF NOT EXISTS traccion TEXT;
ALTER TABLE appraisals ADD COLUMN IF NOT EXISTS linea_asientos TEXT;
ALTER TABLE appraisals ADD COLUMN IF NOT EXISTS remate BOOLEAN DEFAULT false;
ALTER TABLE appraisals ADD COLUMN IF NOT EXISTS prenda BOOLEAN DEFAULT false;
ALTER TABLE appraisals ADD COLUMN IF NOT EXISTS comision NUMERIC(12,2);
ALTER TABLE appraisals ADD COLUMN IF NOT EXISTS quien_tomo_fotos TEXT;

-- Add comments for clarity
COMMENT ON COLUMN appraisals.observations IS 'General observations about the vehicle or appraisal';
COMMENT ON COLUMN appraisals.permiso_vence IS 'Circulation permit expiry date';
COMMENT ON COLUMN appraisals.revision_vence IS 'Technical review expiry date';
COMMENT ON COLUMN appraisals.duenos IS 'Number of previous owners';
COMMENT ON COLUMN appraisals.codigo_sii IS 'SII tax code';
COMMENT ON COLUMN appraisals.precio_publicado IS 'Published/asking price';
COMMENT ON COLUMN appraisals.precio_sugerido IS 'Suggested price for purchase';
COMMENT ON COLUMN appraisals.digito_patente IS 'Patent verification digit';
COMMENT ON COLUMN appraisals.quien_tomo_fotos IS 'Person who took the photos';
