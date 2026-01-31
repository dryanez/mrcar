import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Load env
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const parts = line.split('=');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            const value = parts.slice(1).join('=').trim();
            process.env[key] = value;
        }
    });
}
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const expectedColumns = [
    'client_nombre', 'client_apellido', 'client_email', 'client_telefono', 'client_rut',
    'vehicle_marca', 'vehicle_modelo', 'vehicle_ano', 'vehicle_km', 'vehicle_patente',
    'permiso_circulacion', 'features', 'status'
];

async function main() {
    console.log('Probing columns...');
    for (const col of expectedColumns) {
        // Try to select just this column
        const { error } = await supabase.from('appraisals').select(col).limit(1);
        if (error) {
            console.log(`[MISSING] ${col}: ${error.code} - ${error.message}`);
        } else {
            console.log(`[OK] ${col}`);
        }
    }
}
main();
