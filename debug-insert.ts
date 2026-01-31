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

async function main() {
    try {
        console.log('Testing INSERT operation...');

        const testData = {
            client_nombre: 'Debug',
            client_apellido: 'Tester',
            client_telefono: '+123456789',
            client_rut: '12345678-9',
            vehicle_marca: 'Toyota',
            vehicle_modelo: 'Corolla',
            vehicle_ano: 2020,
            vehicle_km: 15000,
            vehicle_patente: `TST-${Date.now()}`, // Unique
            vehicle_transmision: 'Automático',
            vehicle_combustible: 'Bencina',
            status: 'draft'
        };

        const { data, error } = await supabase
            .from('appraisals')
            .insert(testData)
            .select()
            .single();

        if (error) {
            console.error('INSERT FAILED:', error);
        } else {
            console.log('INSERT SUCCESS! New ID:', data.id);
            // Verify we can read it back
            const { data: readBack, error: readError } = await supabase
                .from('appraisals')
                .select('*')
                .eq('id', data.id)
                .single();

            if (readError) console.error('Reading back failed:', readError);
            else console.log('Read back verification passed.');
        }

    } catch (e) { console.error(e); }
}
main();
