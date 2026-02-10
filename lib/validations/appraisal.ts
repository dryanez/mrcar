import { z } from 'zod'

export const appraisalSchema = z.object({
    // Client Info
    clientNombre: z.string().min(1, 'Nombre is required'),
    clientApellido: z.string().min(1, 'Apellido is required'),
    clientEmail: z.string().email('Invalid email').optional().or(z.literal('')),
    clientTelefono: z.string().min(1, 'Teléfono is required'),
    clientRut: z.string().min(1, 'RUT is required'),
    clientDireccion: z.string().optional(),
    clientComuna: z.string().optional(),
    clientRegion: z.string().optional(),

    // Contact Info
    contactNombre: z.string().optional(),
    contactTelefono: z.string().optional(),

    // Vehicle Info
    vehicleMarca: z.string().min(1, 'Marca is required'),
    vehicleModelo: z.string().min(1, 'Modelo is required'),
    vehicleVersion: z.string().optional(),
    vehicleAño: z.number().min(1900).max(new Date().getFullYear() + 1),
    vehicleColor: z.string().optional(),
    vehicleKm: z.number().min(0),
    vehicleMotor: z.string().optional(),
    vehiclePatente: z.string().min(1, 'Patente is required'),
    vehicleTransmision: z.enum(['Manual', 'Automático']),
    vehicleCombustible: z.enum(['Bencina', 'Diesel', 'Eléctrico', 'Híbrido']),
    vehicleBodyType: z.string().optional(),

    // NEW: Additional vehicle details
    digitoPatente: z.string().optional(),
    traccion: z.string().optional(),
    lineaAsientos: z.string().optional(),

    // Documentation
    permisoCirculacion: z.boolean().nullable(),
    permisoVence: z.string().optional(),
    permisoComuna: z.string().optional(),

    revisionTecnica: z.boolean().nullable(),
    revisionVence: z.string().optional(),

    soap: z.boolean().nullable(),
    soapCompania: z.string().optional(),

    seguro: z.boolean().nullable(),
    seguroCompania: z.string().optional(),

    mantenciones: z.string().optional(),
    numDueños: z.number().min(0).optional(),
    codigoSii: z.string().optional(),

    // Pricing
    tasacion: z.number().min(0).optional(),
    precioPublicado: z.number().min(0).optional(),
    precioSugerido: z.number().min(0).optional(),
    comision: z.number().min(0).optional(),

    // Legal
    enPrenda: z.boolean().default(false),
    enRemate: z.boolean().default(false),

    // Features (all boolean checkboxes)
    features: z.object({
        aireAcondicionado: z.boolean().default(false),
        bluetooth: z.boolean().default(false),
        calefactorAsiento: z.boolean().default(false),
        conexionUsb: z.boolean().default(false),
        gps: z.boolean().default(false),
        isofix: z.boolean().default(false),
        smartKey: z.boolean().default(false),
        lucesLed: z.boolean().default(false),
        mandosVolante: z.boolean().default(false),
        sensorEstacionamiento: z.boolean().default(false),
        sonidoPremium: z.boolean().default(false),
        techoElectrico: z.boolean().default(false),
        ventiladorAsiento: z.boolean().default(false),
        carplayAndroid: z.boolean().default(false),
    }),

    // Technical
    airbags: z.number().min(0).optional(),
    numLlaves: z.number().min(0).default(2),
    neumaticos: z.array(z.boolean()).length(5).optional(),

    // Notes & Admin
    observaciones: z.string().optional(),
    quienTomoFotos: z.string().optional(),
})

export type AppraisalFormData = z.infer<typeof appraisalSchema>
