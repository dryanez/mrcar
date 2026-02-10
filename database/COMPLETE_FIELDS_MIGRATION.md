# Complete Fields Migration

## Adding 30 Missing Fields to Match PDF Template

### 🎯 Run This SQL in Supabase:

Go to: https://yufszwebosekijdgjgtb.supabase.co
Click: SQL Editor → New Query
Copy the entire content from `migrations/add_complete_fields.sql`

Or run this quick version:

```sql
-- Documentation fields
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

-- Vehicle features
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
```

## Fields Added (30 Total):

### Documentation (9):
- observations
- permiso_vence
- revision_vence
- soap_compania
- seguro_compania
- permiso_comuna
- mantenciones
- duenos
- codigo_sii

### Pricing (3):
- precio_publicado
- precio_sugerido
- digito_patente

### Features (12):
- calefactor_asiento
- conexion_usb
- gps
- isofix
- smart_key
- luces_led
- mandos_volante
- sensor_estacionamiento
- sonido_premium
- techo_electrico
- ventilador_asiento
- carplay_android

### Additional (6):
- traccion
- linea_asientos
- remate
- prenda
- comision
- quien_tomo_fotos

Run this migration NOW before the app update deploys! 🚀
