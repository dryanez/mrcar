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

    // Documentation
    permisoCirculacion: z.boolean().nullable(),
    vencePermiso: z.string().optional(),
    revisionTecnica: z.boolean().nullable(),
    venceRevision: z.string().optional(),
    soap: z.boolean().nullable(),
    seguro: z.boolean().nullable(),
    numDueños: z.number().min(0).optional(),
    tasacion: z.number().min(0).optional(),
    enPrenda: z.boolean(),

    // Features
    features: z.object({
        aireAcondicionado: z.boolean(),
        bluetooth: z.boolean(),
        calefactorAsiento: z.boolean(),
        conexionUsb: z.boolean(),
        gps: z.boolean(),
        isofix: z.boolean(),
        smartKey: z.boolean(),
        lucesLed: z.boolean(),
        mandosVolante: z.boolean(),
        sensorEstacionamiento: z.boolean(),
        sonidoPremium: z.boolean(),
        techoElectrico: z.boolean(),
        ventiladorAsiento: z.boolean(),
        carplayAndroid: z.boolean(),
    }),

    // Technical
    airbags: z.number().min(0).optional(),
    numLlaves: z.number().min(0).default(2),
    neumaticos: z.array(z.boolean()).length(5),

    // Notes
    observaciones: z.string().optional(),
})

export type AppraisalFormData = z.infer<typeof appraisalSchema>
