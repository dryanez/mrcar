# Form Fields Addition - Ready to Implement

## ✅ Database Migration: COMPLETE
All 30 columns added to `appraisals` table

## ✅ Schema Validation: COMPLETE  
Zod schema updated with all 30 fields

## ⏳ Form UI: NEXT STEP

### Fields to Add by Section:

#### **Step 1 - Client Info** (3 new fields)
```typescript
// After clientRut, add:
<FormInput label="Contacto" {...register('contactNombre')} />
<FormInput label="Teléfono Contacto" {...register('contactTelefono')} />

// At end of step, add:
<FormTextArea label="Observaciones (OBS)" {...register('observaciones')} rows={3} />
```

#### **Step 2 - Vehicle Details** (4 new fields)
```typescript
// After vehiclePatente, add:
<FormInput label="Dígito Verificador" {...register('digitoPatente')} maxLength={1} />

// After vehicleColor, add:
<FormInput label="Tipo de Auto" {...register('vehicleBodyType')} placeholder="Sedán, SUV, Hatchback..." />

<FormSelect label="Tracción" {...register('traccion')}>
  <option value="">Seleccionar...</option>
  <option value="4x2">4x2</option>
  <option value="4x4">4x4</option>
  <option value="AWD">AWD</option>
</FormSelect>

<FormInput label="Línea de Asientos" type="number" {...register('lineaAsientos')} placeholder="5, 7, etc." />
```

#### **Step 3 - Documentation** (14 new fields)
```typescript
// After permisoCirculacion checkbox, already has:
// ✅ permisoVence (exists)

// NEW: Add after permisoVence:
<FormInput label="Comuna (Permiso)" {...register('permisoComuna')} />

// After revisionTecnica checkbox, already has:
// ✅ revisionVence (exists)

// NEW: Add after SOAP checkbox:
<FormInput label="Compañía SOAP" {...register('soapCompania')} />

// NEW: Add after Seguro checkbox:
<FormInput label="Compañía Seguro" {...register('seguroCompania')} />

// NEW: Add new section:
<FormInput label="Mantenciones" {...register('mantenciones')} placeholder="Registro de mantenciones..." />

<FormInput label="Número de Dueños" type="number" {...register('numDueños')} />

<FormInput label="Código SII" {...register('codigoSii')} />

// NEW: Pricing section:
<FormInput label="Precio Publicado" type="number" {...register('precioPublicado')} />

<FormInput label="Precio Sugerido" type="number" {...register('precioSugerido')} />

<FormInput label="Comisión" type="number" {...register('comision')} />

// NEW: Legal checkboxes:
<Checkbox label="En Remate" {...register('enRemate')} />
// (enPrenda already exists)
```

#### **Step 5 - Technical** (1 new field)
```typescript
// At end of step, add:
<FormInput label="Quién Tomó Fotos" {...register('quienTomoFotos')} />
```

---

## Default Values to Add

```typescript
defaultValues: {
  // ... existing fields ...
  
  // NEW: Client/Contact
  contactNombre: '',
  contactTelefono: '',
  observaciones: '',
  
  // NEW: Vehicle
  digitoPatente: '',
  vehicleBodyType: '',
  traccion: '',
  lineaAsientos: undefined,
  
  // NEW: Documentation
  permisoComuna: '',
  soapCompania: '',
  seguroCompania: '',
  mantenciones: '',
  numDueños: undefined,
  codigoSii: '',
  
  // NEW: Pricing
  precioPublicado: undefined,
  precioSugerido: undefined,
  comision: undefined,
  
  // NEW: Legal
  enRemate: false,
  
  // NEW: Admin
  quienTomoFotos: '',
}
```

---

## Status

- [x] Database columns added
- [x] Zod validation schema updated  
- [ ] Form UI inputs (READY TO ADD)
- [ ] appraisal-actions.ts mapping
- [ ] PDF generator fields

**Next:** Add all form inputs to the UI!
