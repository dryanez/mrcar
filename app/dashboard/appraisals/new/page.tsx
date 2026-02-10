'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, type FieldErrors } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { appraisalSchema, type AppraisalFormData } from '@/lib/validations/appraisal'
import { getBrands, getModels, getVersions } from '@/lib/data/vehicles'
import { getRegions, getComunas } from '@/lib/data/geo-chile'
import PriceSuggestions from '@/components/PriceSuggestions'
import PhotoCapture from '@/components/PhotoCapture'
import {
    User,
    Car,
    FileText,
    Settings,
    Key,
    CheckCircle2,
    Save,
    Printer,
    ArrowLeft,
    ArrowRight,
    Disc
} from 'lucide-react'

const STEPS = [
    { id: 1, name: 'Client Info', icon: User },
    { id: 2, name: 'Vehicle Details', icon: Car },
    { id: 3, name: 'Documentation', icon: FileText },
    { id: 4, name: 'Features', icon: Settings },
    { id: 5, name: 'Technical', icon: Key },
]

export default function NewAppraisalPage() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(1)
    const [saving, setSaving] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<AppraisalFormData>({
        resolver: zodResolver(appraisalSchema) as any,
        defaultValues: {
            clientNombre: '',
            clientApellido: '',
            clientTelefono: '',
            clientRut: '',
            clientEmail: '',

            clientRegion: '',
            clientComuna: '',
            clientDireccion: '',
            vehicleMarca: '',
            vehicleModelo: '',
            vehicleVersion: '',
            vehicleAño: new Date().getFullYear(),
            vehicleKm: 0,
            vehicleMotor: '',
            vehiclePatente: '',
            vehicleColor: '',
            vehicleTransmision: 'Manual',
            vehicleCombustible: 'Bencina',
            enPrenda: false,
            numLlaves: 2,
            permisoCirculacion: null,
            revisionTecnica: null,
            soap: null,
            seguro: null,
            neumaticos: [true, true, true, true, true],
            features: {
                aireAcondicionado: false,
                bluetooth: false,
                calefactorAsiento: false,
                conexionUsb: false,
                gps: false,
                isofix: false,
                smartKey: false,
                lucesLed: false,
                mandosVolante: false,
                sensorEstacionamiento: false,
                sonidoPremium: false,
                techoElectrico: false,
                ventiladorAsiento: false,
                carplayAndroid: false,
            },
        },
    })

    const neumaticos = watch('neumaticos')
    const enPrenda = watch('enPrenda')
    const permisoCirculacion = watch('permisoCirculacion')
    const revisionTecnica = watch('revisionTecnica')

    // Watch vehicle details for price suggestions
    const vehicleMarca = watch('vehicleMarca')
    const vehicleModelo = watch('vehicleModelo')
    const vehicleAño = watch('vehicleAño')

    const [showPhotoCapture, setShowPhotoCapture] = useState(false)
    const [completedAppraisalId, setCompletedAppraisalId] = useState<string | null>(null)

    // Debug logging
    console.log('>>> RENDER: currentStep =', currentStep, 'showPhotoCapture =', showPhotoCapture, 'completedAppraisalId =', completedAppraisalId)

    const onSubmit = async (data: AppraisalFormData) => {
        console.log('>>> onSubmit called! Current step:', currentStep)
        console.log('>>> Form data:', data)
        console.trace('>>> Call stack:')

        setSaving(true)
        try {
            const { createAppraisal } = await import('@/lib/actions/appraisal-actions')
            const result = await createAppraisal(data)

            console.log('>>> Server result:', result)
            if (!result.success) {
                console.error('>>> Server error:', result.error)
                // Show detailed error to user
                alert(`Failed to save appraisal:\n\n${result.error}\n\nPlease screenshot this message and send it.`)
                return
            }

            // Set success state instead of immediate redirect
            setCompletedAppraisalId(result.data.id)
            setShowPhotoCapture(true)
        } catch (error) {
            console.error('Error saving appraisal:', error)
            alert('Error saving appraisal. Please try again.')
        } finally {
            setSaving(false)
        }
    }

    const onInvalid = (errors: FieldErrors<AppraisalFormData>) => {
        console.error('Validation errors:', JSON.stringify(errors, null, 2))
        const errorKeys = Object.keys(errors)

        // Map error keys to steps
        if (errorKeys.some(key => key.startsWith('client'))) {
            setCurrentStep(1)
        } else if (errorKeys.some(key => key.startsWith('vehicle'))) {
            setCurrentStep(2)
        } else if (['permisoCirculacion', 'revisionTecnica', 'soap', 'seguro', 'enPrenda', 'tasacion', 'numDueños'].some(key => errorKeys.includes(key))) {
            setCurrentStep(3)
        } else if (errorKeys.some(key => key.startsWith('features'))) {
            setCurrentStep(4)
        } else {
            setCurrentStep(5)
        }

        alert(`Please correct the following errors:\n${errorKeys.join('\n')}`)
    }

    const nextStep = (e?: React.MouseEvent) => {
        e?.preventDefault()
        e?.stopPropagation()
        console.log('>>> nextStep called, current:', currentStep, 'going to:', currentStep + 1)
        if (currentStep < STEPS.length) {
            setCurrentStep(currentStep + 1)
        }
    }

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const toggleNeumatico = (index: number) => {
        const newNeumaticos = [...(neumaticos || [false, false, false, false, false])]
        newNeumaticos[index] = !newNeumaticos[index]
        setValue('neumaticos', newNeumaticos)
    }

    // Success screen after form submission
    if (showPhotoCapture && completedAppraisalId) {
        console.log('>>> SHOWING SUCCESS SCREEN')
        return (
            <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
                {/* Success Header */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 rounded-2xl p-8 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <CheckCircle2 className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Appraisal Completed!
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        The appraisal has been saved successfully.
                    </p>
                </div>

                {/* Photo Capture Card */}
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
                    <PhotoCapture
                        appraisalId={completedAppraisalId}
                        onComplete={() => router.push('/dashboard/appraisals')}
                    />

                    {/* Skip Button */}
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                        <button
                            onClick={() => router.push('/dashboard/appraisals')}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            Skip for Now
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        New Vehicle Appraisal
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Complete the form to create a new appraisal
                    </p>
                </div>
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                </button>
            </div>

            {/* Progress Steps */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                <div className="flex items-center justify-between">
                    {STEPS.map((step, index) => {
                        const Icon = step.icon
                        const isActive = currentStep === step.id
                        const isCompleted = currentStep > step.id

                        return (
                            <div key={step.id} className="flex items-center flex-1">
                                <div className="flex flex-col items-center flex-1">
                                    <div
                                        className={`
                      w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                      ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-110' : ''}
                      ${isCompleted ? 'bg-green-600 text-white' : ''}
                      ${!isActive && !isCompleted ? 'bg-gray-200 dark:bg-gray-800 text-gray-400' : ''}
                    `}
                                    >
                                        {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                                    </div>
                                    <span className={`
                    text-sm font-medium mt-2 hidden md:block
                    ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}
                    ${isCompleted ? 'text-green-600 dark:text-green-400' : ''}
                    ${!isActive && !isCompleted ? 'text-gray-400' : ''}
                  `}>
                                        {step.name}
                                    </span>
                                </div>
                                {index < STEPS.length - 1 && (
                                    <div className={`
                    h-1 flex-1 mx-2 rounded transition-colors
                    ${currentStep > step.id ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-800'}
                  `} />
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit(onSubmit, onInvalid)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
                        e.preventDefault()
                    }
                }}
            >
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
                    {/* Step 1: Client Info */}
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Client Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput
                                    label="Nombre *"
                                    {...register('clientNombre')}
                                    error={errors.clientNombre?.message}
                                />
                                <FormInput
                                    label="Apellido *"
                                    {...register('clientApellido')}
                                    error={errors.clientApellido?.message}
                                />
                                <FormInput
                                    label="Email"
                                    type="email"
                                    {...register('clientEmail')}
                                    error={errors.clientEmail?.message}
                                />
                                <FormInput
                                    label="Teléfono *"
                                    {...register('clientTelefono')}
                                    error={errors.clientTelefono?.message}
                                />
                                <FormInput
                                    label="RUT *"
                                    placeholder="12.345.678-9"
                                    {...register('clientRut')}
                                    error={errors.clientRut?.message}
                                />
                                <FormSelect
                                    label="Región"
                                    {...register('clientRegion')}
                                    options={getRegions()}
                                    error={errors.clientRegion?.message}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                        setValue('clientRegion', e.target.value)
                                        setValue('clientComuna', '')
                                    }}
                                />
                                <FormSelect
                                    label="Comuna"
                                    {...register('clientComuna')}
                                    options={watch('clientRegion') ? getComunas(watch('clientRegion') || '') : []}
                                    error={errors.clientComuna?.message}
                                    disabled={!watch('clientRegion')}
                                />
                                <div className="md:col-span-2">
                                    <FormInput
                                        label="Dirección"
                                        placeholder="Calle y número"
                                        {...register('clientDireccion')}
                                        error={errors.clientDireccion?.message}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Vehicle Details */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Vehicle Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormSelect
                                    label="Marca *"
                                    {...register('vehicleMarca')}
                                    options={getBrands()}
                                    error={errors.vehicleMarca?.message}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                        setValue('vehicleMarca', e.target.value)
                                        setValue('vehicleModelo', '')
                                        setValue('vehicleVersion', '')
                                    }}
                                />
                                <FormSelect
                                    label="Modelo *"
                                    {...register('vehicleModelo')}
                                    options={watch('vehicleMarca') ? getModels(watch('vehicleMarca')) : []}
                                    error={errors.vehicleModelo?.message}
                                    disabled={!watch('vehicleMarca')}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                        setValue('vehicleModelo', e.target.value)
                                        setValue('vehicleVersion', '')
                                    }}
                                />
                                <FormSelect
                                    label="Versión"
                                    {...register('vehicleVersion')}
                                    options={watch('vehicleMarca') && watch('vehicleModelo')
                                        ? getVersions(watch('vehicleMarca'), watch('vehicleModelo'))
                                        : []
                                    }
                                    error={errors.vehicleVersion?.message}
                                    disabled={!watch('vehicleModelo')}
                                    allowCustom={true}
                                />
                                <FormInput
                                    label="Año *"
                                    type="number"
                                    {...register('vehicleAño', { valueAsNumber: true })}
                                    error={errors.vehicleAño?.message}
                                />
                                <FormInput
                                    label="Kilometraje *"
                                    type="number"
                                    {...register('vehicleKm', { valueAsNumber: true })}
                                    error={errors.vehicleKm?.message}
                                />
                                <FormInput
                                    label="Patente *"
                                    {...register('vehiclePatente')}
                                    error={errors.vehiclePatente?.message}
                                />
                                <FormInput
                                    label="Motor (cc)"
                                    {...register('vehicleMotor')}
                                    error={errors.vehicleMotor?.message}
                                />
                                <FormInput
                                    label="Color"
                                    {...register('vehicleColor')}
                                    error={errors.vehicleColor?.message}
                                />
                                <FormSelect
                                    label="Transmisión *"
                                    {...register('vehicleTransmision')}
                                    options={['Manual', 'Automático']}
                                    error={errors.vehicleTransmision?.message}
                                />
                                <FormSelect
                                    label="Combustible *"
                                    {...register('vehicleCombustible')}
                                    options={['Bencina', 'Diesel', 'Eléctrico', 'Híbrido']}
                                    error={errors.vehicleCombustible?.message}
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 3: Documentation */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Documentation & Legal Status
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl space-y-4">
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Permiso de Circulación
                                    </label>
                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setValue('permisoCirculacion', true)}
                                            className={`flex-1 py-3 rounded-lg border-2 font-medium transition-all ${permisoCirculacion === true
                                                ? 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-400'
                                                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                                                }`}
                                        >
                                            Sí
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setValue('permisoCirculacion', false)}
                                            className={`flex-1 py-3 rounded-lg border-2 font-medium transition-all ${permisoCirculacion === false
                                                ? 'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-400'
                                                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                                                }`}
                                        >
                                            No
                                        </button>
                                    </div>
                                    <FormInput
                                        label="Vencimiento"
                                        type="month"
                                        {...register('permisoVence')}
                                    />
                                </div>

                                <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl space-y-4">
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Revisión Técnica
                                    </label>
                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setValue('revisionTecnica', true)}
                                            className={`flex-1 py-3 rounded-lg border-2 font-medium transition-all ${revisionTecnica === true
                                                ? 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-400'
                                                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                                                }`}
                                        >
                                            Sí
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setValue('revisionTecnica', false)}
                                            className={`flex-1 py-3 rounded-lg border-2 font-medium transition-all ${revisionTecnica === false
                                                ? 'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-400'
                                                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                                                }`}
                                        >
                                            No
                                        </button>
                                    </div>
                                    <FormInput
                                        label="Vencimiento"
                                        type="month"
                                        {...register('revisionVence')}
                                    />
                                </div>

                                <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl space-y-4">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            {...register('enPrenda')}
                                            className="w-6 h-6 rounded accent-red-600"
                                        />
                                        <span className={`font-bold text-lg ${enPrenda ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                            ¿ESTÁ EN PRENDA?
                                        </span>
                                    </label>
                                    {enPrenda && (
                                        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                            <p className="text-sm text-red-700 dark:text-red-400">
                                                ⚠️ Este vehículo tiene restricciones legales
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <FormInput
                                    label="Número de Dueños"
                                    type="number"
                                    {...register('numDueños', { valueAsNumber: true })}
                                />

                                {/* Price Suggestions */}
                                <div className="md:col-span-2">
                                    {vehicleMarca && vehicleModelo && vehicleAño && (
                                        <PriceSuggestions
                                            marca={vehicleMarca}
                                            modelo={vehicleModelo}
                                            ano={vehicleAño}
                                            onSelectPrice={(price) => setValue('tasacion', price)}
                                        />
                                    )}
                                </div>

                                <FormInput
                                    label="Tasación (CLP)"
                                    type="number"
                                    {...register('tasacion', {
                                        setValueAs: (v) => v === "" ? undefined : Number(v)
                                    })}
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 4: Features */}
                    {currentStep === 4 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Vehicle Features
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {Object.keys(watch('features')).map((feature) => (
                                    <label
                                        key={feature}
                                        className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-white dark:hover:bg-gray-800 transition-all"
                                    >
                                        <input
                                            type="checkbox"
                                            {...register(`features.${feature as keyof AppraisalFormData['features']}`)}
                                            className="w-5 h-5 rounded accent-blue-600"
                                        />
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200 capitalize">
                                            {feature.replace(/([A-Z])/g, ' $1').trim()}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 5: Technical */}
                    {currentStep === 5 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Technical Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput
                                    label="Número de Airbags"
                                    type="number"
                                    {...register('airbags', {
                                        setValueAs: (v) => v === "" ? undefined : Number(v)
                                    })}
                                />
                                <FormInput
                                    label="Número de Llaves"
                                    type="number"
                                    {...register('numLlaves', { valueAsNumber: true })}
                                />

                                <div className="md:col-span-2 space-y-4">
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Estado de Neumáticos (4 + Repuesto)
                                    </label>
                                    <div className="flex gap-4">
                                        {neumaticos.map((status, idx) => (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={() => toggleNeumatico(idx)}
                                                className={`
                          w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all transform hover:scale-110
                          ${status
                                                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30'
                                                        : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-400'
                                                    }
                        `}
                                            >
                                                <Disc className="w-8 h-8" />
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Click para marcar como bueno/malo
                                    </p>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Observaciones Generales
                                    </label>
                                    <textarea
                                        {...register('observaciones')}
                                        rows={6}
                                        className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400"
                                        placeholder="Escriba detalles del motor, carrocería, choques, etc..."
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-6">
                    <button
                        type="button"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Previous
                    </button>

                    <div className="flex gap-3">

                        {currentStep < STEPS.length ? (
                            <button
                                type="button"
                                onClick={(e) => nextStep(e)}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 transition-all"
                            >
                                Next
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg shadow-lg shadow-green-500/30 transition-all disabled:opacity-50"
                            >
                                {saving ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 className="w-5 h-5" />
                                        Complete Appraisal
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    )
}

// Form Input Component
const FormInput = ({ label, error, ...props }: any) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label}
        </label>
        <input
            {...props}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
)

// Form Select Component
const FormSelect = ({ label, options, error, disabled, allowCustom, onChange, ...props }: any) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label}
        </label>
        <select
            {...props}
            onChange={onChange}
            disabled={disabled}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <option value="">Seleccionar...</option>
            {options.map((option: string) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
            {allowCustom && <option value="__custom__">Otro (escribir manualmente)</option>}
        </select>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
)
