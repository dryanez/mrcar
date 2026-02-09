// Spanish translations for MrCar app
export const es = {
    // Navigation & Dashboard
    dashboard: {
        welcome: '¡Bienvenido a MrCar! 👋',
        subtitle: 'Plataforma profesional de tasación de vehículos',
        newAppraisal: 'Nueva Tasación',
        totalAppraisals: 'Tasaciones Totales',
        pending: 'Pendientes',
        completed: 'Completadas',
        recentAppraisals: 'Tasaciones Recientes',
        viewAll: 'Ver todas',
        noAppraisalsYet: 'Aún no hay tasaciones',
        getStarted: 'Comienza creando tu primera tasación de vehículo',
        createFirst: 'Crear Primera Tasación',
        newAppraisalAction: 'Nueva Tasación',
        newAppraisalDesc: 'Iniciar una nueva evaluación de vehículo',
        viewAllAction: 'Ver Todas las Tasaciones',
        viewAllDesc: 'Explorar y gestionar tasaciones',
    },

    // Appraisals List
    appraisals: {
        title: 'Tasaciones',
        subtitle: 'Gestionar todas las tasaciones de vehículos',
        search: 'Buscar por nombre de cliente, patente o vehículo...',
        filter: 'Filtrar',
        noFound: 'No se encontraron tasaciones',
        patente: 'Patente',
        km: 'KM',
        tasacion: 'Tasación',
        draft: 'borrador',
        pending: 'pendiente',
        completed: 'completado',
    },

    // New Appraisal Form
    form: {
        title: 'Nueva Tasación de Vehículo',
        subtitle: 'Complete todos los pasos para crear una tasación completa',
        steps: {
            client: 'Cliente',
            vehicle: 'Vehículo',
            documentation: 'Documentación',
            features: 'Características',
            technical: 'Técnico',
        },

        // Client Info
        clientInfo: 'Información del Cliente',
        nombre: 'Nombre',
        apellido: 'Apellido',
        email: 'Email',
        telefono: 'Teléfono',
        rut: 'RUT',
        direccion: 'Dirección',
        comuna: 'Comuna',
        region: 'Región',
        selectRegion: 'Seleccionar región',
        selectComuna: 'Seleccionar comuna',

        // Vehicle Info
        vehicleInfo: 'Información del Vehículo',
        marca: 'Marca',
        modelo: 'Modelo',
        version: 'Versión',
        ano: 'Año',
        color: 'Color',
        kilometraje: 'Kilometraje',
        motor: 'Motor',
        patente: 'Patente',
        transmision: 'Transmisión',
        manual: 'Manual',
        automatico: 'Automático',
        combustible: 'Combustible',
        bencina: 'Bencina',
        diesel: 'Diesel',
        electrico: 'Eléctrico',
        hibrido: 'Híbrido',

        // Documentation
        documentationInfo: 'Documentación',
        permisoCirculacion: 'Permiso de Circulación',
        vencePermiso: 'Vence Permiso',
        revisionTecnica: 'Revisión Técnica',
        venceRevision: 'Vence Revisión',
        soap: 'SOAP',
        seguro: 'Seguro',
        numDuenos: 'Número de Dueños',
        tasacionClp: 'Tasación (CLP)',
        enPrenda: 'En Prenda',

        // Features
        featuresInfo: 'Características y Equipamiento',
        airbags: 'Número de Airbags',
        abs: 'ABS',
        airConditioning: 'Aire Acondicionado',
        sunroof: 'Techo Solar',
        parkingSensors: 'Sensores de Estacionamiento',
        camera: 'Cámara',
        bluetooth: 'Bluetooth',
        cruiseControl: 'Control de Crucero',

        // Technical
        technicalDetails: 'Detalles Técnicos',
        numeroAirbags: 'Número de Airbags',
        numeroLlaves: 'Número de Llaves',
        estadoNeumaticos: 'Estado de Neumáticos (4 + Repuesto)',
        clickToMark: 'Click para marcar como bueno/malo',
        observacionesGenerales: 'Observaciones Generales',
        observacionesPlaceholder: 'Escriba detalles del motor, carrocería, choques, etc...',

        // Navigation
        previous: 'Anterior',
        next: 'Siguiente',
        completeAppraisal: 'Completar Tasación',
        saveDraft: 'Guardar Borrador',

        // Success
        appraisalCompleted: '¡Tasación Completada! 🎉',
        successMessage: 'La tasación ha sido creada exitosamente. Ahora puedes tomar fotos del vehículo.',
        takePicturesNow: 'Tomar Fotos Ahora',
        skipForNow: 'Omitir por Ahora',
        viewAppraisal: 'Ver Tasación',
    },

    // Photo Features
    photos: {
        captureTitle: 'Capturar Fotos del Vehículo',
        captureDesc: 'Tome fotos de alta calidad del vehículo para esta tasación',
        cameraNote: '📱 Nota: La cámara se abre automáticamente en dispositivos móviles. En escritorio, puede subir fotos desde su computadora.',
        openCamera: 'Abrir Cámara',
        uploadFromGallery: 'Subir desde Galería',
        uploading: 'Subiendo...',
        uploadingCount: 'Subiendo {count} foto(s)...',
        successUpload: '¡Subido exitosamente {count} foto(s)!',

        // Gallery
        galleryTitle: 'Fotos',
        noPhotos: 'Aún no hay fotos subidas',
        addPhotos: 'Agregar Fotos',
        addMorePhotos: 'Agregar Más Fotos',
        autoBlur: 'Difuminar Contenido Sensible',
        downloadAll: 'Descargar Todas',
        deleteAll: 'Eliminar Todas',
        download: 'Descargar',
        delete: 'Eliminar',
        deleting: 'Eliminando...',
        downloading: 'Descargando...',
        blurring: 'Difuminando',

        // Auto-blur
        autoBlurConfirm: 'Esto difuminará automáticamente las patentes y personas en TODAS las {count} fotos. Las fotos originales serán reemplazadas. ¿Continuar?',
        noSensitiveContent: '¡No se detectaron patentes ni personas en ninguna foto!',
        blurSuccess: '¡Se difuminaron exitosamente {count} fotos!',
        blurError: 'Error al procesar fotos. Revise la consola para más detalles.',

        // Delete confirmations
        deletePhotoConfirm: '¿Estás seguro de que deseas eliminar esta foto?',
        deleteAllConfirm: '¿Estás seguro de que deseas eliminar TODAS las {count} fotos? ¡Esto no se puede deshacer!',
        deleteSuccess: 'Foto eliminada exitosamente',
        deleteAllSuccess: 'Se eliminaron {count} fotos',
    },

    // Appraisal Detail
    detail: {
        back: 'Volver',
        appraisalFor: 'Tasación para',
        vehicleDetails: 'Detalles del Vehículo',
        clientDetails: 'Detalles del Cliente',
        documentation: 'Documentación',
        observations: 'Observaciones',
        appraisalNotFound: 'Tasación no encontrada',
        error: 'Error',
        appraisalId: 'ID de Tasación',

        // Fields
        marca: 'Marca',
        modelo: 'Modelo',
        version: 'Versión',
        year: 'Año',
        kilometraje: 'Kilometraje',
        patente: 'Patente',
        color: 'Color',
        transmision: 'Transmisión',
        combustible: 'Combustible',
        motor: 'Motor',
        nombre: 'Nombre',
        rut: 'RUT',
        email: 'Email',
        telefono: 'Teléfono',
        region: 'Región',
        comuna: 'Comuna',
        direccion: 'Dirección',
        permisoCirculacion: 'Permiso de Circulación',
        revisionTecnica: 'Revisión Técnica',
        soap: 'SOAP',
        seguro: 'Seguro',
        enPrenda: 'En Prenda',
        numeroDuenos: 'Número de Dueños',
        tasacion: 'Tasación',
        yes: 'Sí',
        no: 'No',
    },

    // Sidebar
    sidebar: {
        dashboard: 'Panel',
        appraisals: 'Tasaciones',
        settings: 'Configuración',
    },

    // Common
    common: {
        loading: 'Cargando...',
        error: 'Error',
        success: 'Éxito',
        cancel: 'Cancelar',
        save: 'Guardar',
        edit: 'Editar',
        delete: 'Eliminar',
        confirm: 'Confirmar',
        close: 'Cerrar',
    },
}

export default es
