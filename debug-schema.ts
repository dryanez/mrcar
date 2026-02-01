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
    console.log('Querying database schema for appraisals table...');

    // Try to get a single row to see what columns exist
    const { data, error } = await supabase
        .from('appraisals')
        .select('*')
        .limit(1);

    if (error) {
        console.error('Error:', error);
    } else if (data && data.length > 0) {
        console.log('Columns found:', Object.keys(data[0]));
    } else {
        console.log('No rows found, trying to check which "ano" column exists...');

        // Check vehicle_ano
        const { error: error1 } = await supabase.from('appraisals').select('vehicle_ano').limit(1);
        console.log('vehicle_ano exists:', !error1);
        if (error1) console.log('  Error:', error1.message);

        // Check vehicle_año
        const { error: error2 } = await supabase.from('appraisals').select('vehicle_año').limit(1);
        console.log('vehicle_año exists:', !error2);
        if (error2) console.log('  Error:', error2.message);
    }
}

main();
