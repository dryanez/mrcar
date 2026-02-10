# Adding 30 Missing Fields - Implementation Plan

## Fields to Add (Organized by Section)

### **Client/Contact Section (Step 1)**
- [x] clientNombre (exists)
- [x] clientApellido (exists)  
- [x] clientEmail (exists)
- [x] clientTelefono (exists)
- [x] clientRut (exists)
- [x] clientDireccion (exists)
- [x] clientComuna (exists)
- [ ] **contactNombre** (NEW)
- [ ] **contactTelefono** (NEW)
- [ ] **observaciones** (NEW)

### **Vehicle Details Section (Step 2)**
- [x] vehicleMarca (exists)
- [x] vehicleModelo (exists)
- [x] vehicleVersion (exists)
- [x] vehicleAño (exists)
- [x] vehicleColor (exists)
- [x] vehicleKm (exists)
- [x] vehicleMotor (exists)
- [x] vehiclePatente (exists)
- [x] vehicleTransmision (exists)
- [x] vehicleCombustible (exists)
- [ ] **vehicleBodyType** (NEW - Tipo de Auto)
- [ ] **digitoPatente** (NEW)
- [ ] **traccion** (NEW - 4x2, 4x4, AWD)
- [ ] **lineaAsientos** (NEW - 5, 7, etc.)

### **Documentation Section (Step 3)**
- [x] permisoCirculacion (exists)
- [ ] **permisoVence** (NEW - date)
- [ ] **permisoComuna** (NEW)
- [x] revisionTecnica (exists)
- [ ] **revisionVence** (NEW - date)
- [x] soap (exists)
- [ ] **soapCompania** (NEW)
- [x] seguro (exists)
- [ ] **seguroCompania** (NEW)
- [ ] **mantenciones** (NEW - text)
- [ ] **numDueños** (NEW - number)
- [ ] **codigoSii** (NEW)

### **Pricing Section (Step 3 or 4)**
- [x] tasacion (exists)
- [ ] **precioPublicado** (NEW)
- [ ] **precioSugerido** (NEW)
- [ ] **comision** (NEW)

### **Legal/Status (Step 3)**
- [x] enPrenda (exists)
- [ ] **enRemate** (NEW)

### **Features Section (Step 4)**
All already exist in features object ✓

### **Additional Admin (Step 5)**
- [ ] **quienTomoFotos** (NEW - person who took photos)

---

## Implementation Steps

### Step 1: Update Default Values
Add all new fields to the defaultValues in useForm

### Step 2: Update Form UI - Client Section
Add contactNombre, contactTelefono, observaciones to Step 1

### Step 3: Update Form UI - Vehicle Section  
Add digitoPatente, vehicleBodyType, traccion, lineaAsientos to Step 2

### Step 4: Update Form UI - Documentation Section
Add all date/company fields to Step 3

### Step 5: Update Form UI - Pricing Section
Add pricing fields (maybe new step or in documentation)

### Step 6: Update Form UI - Admin Section
Add quienTomoFotos to Step 5

### Step 7: Update appraisal-actions.ts
Map all new fields when creating/updating appraisals

### Step 8: Update PDF Generator
Include all new fields in generated PDF

### Step 9: Test
- Create new appraisal with all fields
- Verify database save
- Download PDF
- Check all fields present

---

## UI Location Decisions

**Step 1 - Client Info:**
- All client fields
- contactNombre, contactTelefono
- observaciones (OBS) - text area

**Step 2 - Vehicle Details:**
- All vehicle fields
- digitoPatente
- vehicleBodyType
- traccion (dropdown: 4x2, 4x4, AWD)
- lineaAsientos (number input)

**Step 3 - Documentation:**
- All documentation checkboxes
- Add expiry dates next to each
- Add company fields
- Add mantenciones, numDueños, codigoSii
- Add pricing: precioPublicado, precioSugerido, comision
- Add enRemate checkbox

**Step 4 - Features:**
- Keep existing features (all present)

**Step 5 - Technical:**
- Keep existing
- Add quienTomoFotos at bottom

---

Ready to implement! 🚀
