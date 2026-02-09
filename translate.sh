#!/bin/bash
# Translate MrCar app to Spanish

# Array of files to translate
FILES=(
  "app/dashboard/page.tsx"
  "app/dashboard/appraisals/page.tsx"
  "app/dashboard/appraisals/new/page.tsx"
  "app/dashboard/appraisals/[id]/page.tsx"
  "components/PhotoGallery.tsx"
  "components/PhotoCapture.tsx"
  "components/layout/Sidebar.tsx"
)

# Translation map (English => Spanish)
declare -A TRANSLATIONS=(
  # Dashboard
  ["Welcome to MrCar!"]="¡Bienvenido a MrCar!"
  ["Professional vehicle appraisal platform"]="Plataforma profesional de tasación de vehículos"
  ["New Appraisal"]="Nueva Tasación"
  ["Total Appraisals"]="Tasaciones Totales"
  ["Pending"]="Pendientes"
  ["Completed"]="Completadas"
  ["Recent Appraisals"]="Tasaciones Recientes"
  ["View all"]="Ver todas"
  ["No appraisals yet"]="Aún no hay tasaciones"
  ["Get started by creating your first vehicle appraisal"]="Comienza creando tu primera tasación de vehículo"
  ["Create First Appraisal"]="Crear Primera Tasación"
  ["Start a new vehicle evaluation"]="Iniciar una nueva evaluación de vehículo"
  ["Browse and manage appraisals"]="Explorar y gestionar tasaciones"
  ["View All Appraisals"]="Ver Todas las Tasaciones"
  
  # Appraisals List
  ["Appraisals"]="Tasaciones"
  ["Manage all vehicle appraisals"]="Gestionar todas las tasaciones de vehículos"
  ["Search by client name, patente, or vehicle..."]="Buscar por nombre de cliente, patente o vehículo..."
  ["Filter"]="Filtrar"
  ["No appraisals found"]="No se encontraron tasaciones"
  ["Create your first appraisal to get started"]="Crea tu primera tasación para comenzar"
  ["Patente:"]="Patente:"
  ["KM:"]="KM:"
  ["Tasación:"]="Tasación:"
  ["draft"]="borrador"
  ["pending"]="pendiente"
  ["completed"]="completado"
  
  # Photos
  ["Capture Vehicle Photos"]="Capturar Fotos del Vehículo"
  ["Take high-quality photos of the vehicle for this appraisal"]="Tome fotos de alta calidad del vehículo para esta tasación"
  ["📱 Note: Camera opens automatically on mobile devices. On desktop, you can upload photos from your computer."]="📱 Nota: La cámara se abre automáticamente en dispositivos móviles. En escritorio, puede subir fotos desde su computadora."
  ["Open Camera"]="Abrir Cámara"
  ["Upload from Gallery"]="Subir desde Galería"
  ["Uploading..."]="Subiendo..."
  ["Successfully uploaded"]="Subido exitosamente"
  ["photo"]="foto"
  ["photos"]="fotos"
  ["Photos"]="Fotos"
  ["No photos uploaded yet"]="Aún no hay fotos subidas"
  ["Add Photos"]="Agregar Fotos"
 ["Add More Photos"]="Agregar Más Fotos"
  ["Auto-Blur Sensitive Content"]="Difuminar Contenido Sensible"
  ["Download All"]="Descargar Todas"
  ["Delete All"]="Eliminar Todas"
  ["Download"]="Descargar"
  ["Delete"]="Eliminar"
  ["Deleting..."]="Eliminando..."
  ["Downloading..."]="Descargando..."
  ["Blurring"]="Difuminando"
  
  # Common
  ["Back"]="Volver"
  ["Loading..."]="Cargando..."
  ["Error"]="Error"
  ["Success"]="Éxito"
  ["Cancel"]="Cancelar"
  ["Save"]="Guardar"
  ["Edit"]="Editar"
  ["Close"]="Cerrar"
  ["Yes"]="Sí"
  ["No"]="No"
  
  # Detail page
  ["Appraisal for"]="Tasación para"
  ["Vehicle Details"]="Detalles del Vehículo"
  ["Client Details"]="Detalles del Cliente"
  ["Documentation"]="Documentación"
  ["Observations"]="Observaciones"
  ["Appraisal not found"]="Tasación no encontrada"
  
  # Sidebar
  ["Dashboard"]="Panel"
  ["Settings"]="Configuración"
)

echo "Translating MrCar app to Spanish..."

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "Processing: $file"
    for english in "${!TRANSLATIONS[@]}"; do
      spanish="${TRANSLATIONS[$english]}"
      # Use sed with proper escaping
      sed -i.bak "s|${english}|${spanish}|g" "$file"
    done
    # Remove backup files
    rm -f "${file}.bak"
  else
    echo "File not found: $file"
  fi
done

echo "Translation complete!"
