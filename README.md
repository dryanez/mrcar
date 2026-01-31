# MrCar - Premium Vehicle Appraisal Platform

A modern, professional-grade vehicle appraisal application built for car dealerships. Features a beautiful UI optimized for tablets, comprehensive appraisal workflow, and real-time data synchronization.

![MrCar Dashboard](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=for-the-badge&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Ready-3ecf8e?style=for-the-badge&logo=supabase)

## ✨ Features

- 🎨 **Premium UI/UX** - Modern design with glassmorphism, smooth animations, and professional aesthetics
- 📱 **Tablet-Optimized** - Perfect for on-the-go vehicle appraisals
- 📝 **5-Step Appraisal Form** - Comprehensive workflow with progress tracking
- 🌙 **Dark Mode** - Full dark mode support
- ⚡ **Real-time Validation** - Instant feedback with React Hook Form + Zod
- 📊 **Dashboard** - Statistics and quick actions
- 🔄 **Responsive Design** - Works beautifully on all screen sizes

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account
- Git

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/mrcar-app.git
   cd mrcar-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

### Supabase Tables

Run the following SQL in your Supabase SQL Editor:

```sql
-- Create appraisals table
CREATE TABLE appraisals (
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
  vehicle_patente TEXT NOT NULL,
  vehicle_transmision TEXT NOT NULL,
  vehicle_combustible TEXT NOT NULL,
  
  -- Documentation
  permiso_circulacion BOOLEAN,
  vence_permiso TEXT,
  revision_tecnica BOOLEAN,
  vence_revision TEXT,
  soap BOOLEAN,
  seguro BOOLEAN,
  num_dueños INTEGER,
  tasacion NUMERIC,
  en_prenda BOOLEAN DEFAULT FALSE,
  
  -- Features (JSONB)
  features JSONB DEFAULT '{}'::jsonb,
  
  -- Technical
  airbags INTEGER,
  num_llaves INTEGER DEFAULT 2,
  neumaticos JSONB DEFAULT '[true, true, true, true, true]'::jsonb,
  
  -- Notes
  observaciones TEXT
);

-- Create index for faster queries
CREATE INDEX idx_appraisals_patente ON appraisals(vehicle_patente);
CREATE INDEX idx_appraisals_created_at ON appraisals(created_at DESC);

-- Enable Row Level Security (optional, for multi-user)
ALTER TABLE appraisals ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust based on your auth needs)
CREATE POLICY "Allow all operations" ON appraisals
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

## 📱 Application Structure

```
mrcar-app/
├── app/
│   ├── dashboard/          # Main dashboard
│   │   ├── appraisals/    # Appraisals list and form
│   │   └── settings/      # Settings page
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/
│   └── layout/
│       └── Sidebar.tsx    # Navigation sidebar
├── lib/
│   ├── supabase/         # Supabase clients
│   └── validations/      # Zod schemas
└── public/               # Static assets
```

## 🎯 Usage

### Creating an Appraisal

1. Navigate to the dashboard
2. Click "New Appraisal"
3. Complete the 5-step form:
   - **Step 1**: Client Information
   - **Step 2**: Vehicle Details
   - **Step 3**: Documentation & Legal Status
   - **Step 4**: Vehicle Features
   - **Step 5**: Technical Details
4. Click "Complete Appraisal" to save

### Managing Appraisals

- View all appraisals in the "Appraisals" page
- Search and filter by client name, patente, or vehicle
- Edit or delete existing appraisals

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy!

## 🔧 Configuration

### Tailwind CSS

The application uses Tailwind CSS v4 with custom design tokens defined in `app/globals.css`.

### Form Validation

Form validation schemas are defined in `lib/validations/appraisal.ts` using Zod.

## 📄 License

MIT License - feel free to use this project for your business!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, please open an issue in the GitHub repository.

---

Built with ❤️ for professional car dealerships
