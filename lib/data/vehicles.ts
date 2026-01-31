// Chilean Vehicle Database
// Based on 2023-2024 market data

export interface VehicleModel {
    name: string
    versions?: string[]
}

export interface VehicleBrand {
    name: string
    models: Record<string, VehicleModel>
}

export const chileanVehicles: Record<string, VehicleBrand> = {
    Toyota: {
        name: 'Toyota',
        models: {
            'Hilux': {
                name: 'Hilux',
                versions: ['DX 4x2', 'DX 4x4', 'SR 4x4', 'SRV 4x4', 'Limited 4x4']
            },
            'Corolla': {
                name: 'Corolla',
                versions: ['XLi', 'XEi', 'SEG', 'Hybrid']
            },
            'RAV4': {
                name: 'RAV4',
                versions: ['XLE', 'Limited', 'Hybrid']
            },
            'Yaris': {
                name: 'Yaris',
                versions: ['Core', 'XLS', 'XS']
            },
            'Land Cruiser': {
                name: 'Land Cruiser',
                versions: ['Prado', 'LC300']
            },
            'Camry': { name: 'Camry' },
            'C-HR': { name: 'C-HR' },
            'Prius': { name: 'Prius' },
        }
    },
    Chevrolet: {
        name: 'Chevrolet',
        models: {
            'Tracker': {
                name: 'Tracker',
                versions: ['LS', 'LT', 'Premier', 'RS']
            },
            'Onix': {
                name: 'Onix',
                versions: ['Joy', 'LT', 'Premier', 'RS']
            },
            'Cruze': {
                name: 'Cruze',
                versions: ['LS', 'LT', 'Premier']
            },
            'S10': {
                name: 'S10',
                versions: ['LS 4x2', 'LT 4x2', 'LT 4x4', 'High Country']
            },
            'Captiva': { name: 'Captiva' },
            'Sail': { name: 'Sail' },
            'Spark': { name: 'Spark' },
        }
    },
    Hyundai: {
        name: 'Hyundai',
        models: {
            'Tucson': {
                name: 'Tucson',
                versions: ['GL', 'GLS', 'Limited', 'N Line']
            },
            'Creta': {
                name: 'Creta',
                versions: ['GL', 'GLS', 'Limited']
            },
            'Accent': {
                name: 'Accent',
                versions: ['GL', 'GLS']
            },
            'Santa Fe': {
                name: 'Santa Fe',
                versions: ['GLS', 'Limited']
            },
            'Elantra': { name: 'Elantra' },
            'Kona': { name: 'Kona' },
            'Venue': { name: 'Venue' },
        }
    },
    Kia: {
        name: 'Kia',
        models: {
            'Sportage': {
                name: 'Sportage',
                versions: ['LX', 'EX', 'SX', 'GT Line']
            },
            'Seltos': {
                name: 'Seltos',
                versions: ['LX', 'EX', 'SX']
            },
            'Rio': {
                name: 'Rio',
                versions: ['LX', 'EX']
            },
            'Sorento': {
                name: 'Sorento',
                versions: ['LX', 'EX', 'SX']
            },
            'Picanto': { name: 'Picanto' },
            'Soul': { name: 'Soul' },
            'Stonic': { name: 'Stonic' },
        }
    },
    Suzuki: {
        name: 'Suzuki',
        models: {
            'Vitara': {
                name: 'Vitara',
                versions: ['GL', 'GLX', 'All Grip']
            },
            'Swift': {
                name: 'Swift',
                versions: ['GL', 'GLX', 'Sport']
            },
            'Baleno': { name: 'Baleno' },
            'Jimny': { name: 'Jimny' },
            'S-Cross': { name: 'S-Cross' },
        }
    },
    Nissan: {
        name: 'Nissan',
        models: {
            'Kicks': {
                name: 'Kicks',
                versions: ['Sense', 'Advance', 'Exclusive']
            },
            'Versa': {
                name: 'Versa',
                versions: ['Sense', 'Advance', 'Exclusive']
            },
            'X-Trail': {
                name: 'X-Trail',
                versions: ['Sense', 'Advance', 'Exclusive']
            },
            'Frontier': {
                name: 'Frontier',
                versions: ['S', 'SE', 'Pro-4X']
            },
            'Sentra': { name: 'Sentra' },
            'Qashqai': { name: 'Qashqai' },
        }
    },
    Peugeot: {
        name: 'Peugeot',
        models: {
            '208': {
                name: '208',
                versions: ['Active', 'Allure', 'GT']
            },
            '2008': {
                name: '2008',
                versions: ['Active', 'Allure', 'GT']
            },
            '3008': {
                name: '3008',
                versions: ['Active', 'Allure', 'GT']
            },
            '5008': { name: '5008' },
            'Partner': { name: 'Partner' },
        }
    },
    Ford: {
        name: 'Ford',
        models: {
            'Ranger': {
                name: 'Ranger',
                versions: ['XL', 'XLS', 'XLT', 'Limited', 'Raptor']
            },
            'Territory': {
                name: 'Territory',
                versions: ['Trend', 'Titanium']
            },
            'Escape': {
                name: 'Escape',
                versions: ['S', 'SE', 'Titanium']
            },
            'F-150': { name: 'F-150' },
            'Mustang': { name: 'Mustang' },
        }
    },
    Mitsubishi: {
        name: 'Mitsubishi',
        models: {
            'L200': {
                name: 'L200',
                versions: ['GL', 'GLS', 'GLX']
            },
            'ASX': {
                name: 'ASX',
                versions: ['GL', 'GLS']
            },
            'Outlander': { name: 'Outlander' },
            'Eclipse Cross': { name: 'Eclipse Cross' },
        }
    },
    MG: {
        name: 'MG',
        models: {
            'ZS': {
                name: 'ZS',
                versions: ['Core', 'Comfort', 'Luxury']
            },
            'HS': {
                name: 'HS',
                versions: ['Core', 'Comfort', 'Trophy']
            },
            'MG5': { name: 'MG5' },
            'RX5': { name: 'RX5' },
        }
    },
    Mazda: {
        name: 'Mazda',
        models: {
            'CX-5': {
                name: 'CX-5',
                versions: ['V', 'R', 'S']
            },
            'CX-30': {
                name: 'CX-30',
                versions: ['V', 'R', 'S']
            },
            'Mazda3': {
                name: 'Mazda3',
                versions: ['V', 'R', 'S']
            },
            'CX-9': { name: 'CX-9' },
            'BT-50': { name: 'BT-50' },
        }
    },
    Honda: {
        name: 'Honda',
        models: {
            'HR-V': {
                name: 'HR-V',
                versions: ['LX', 'EX', 'EXL']
            },
            'CR-V': {
                name: 'CR-V',
                versions: ['LX', 'EX', 'EXL']
            },
            'Civic': {
                name: 'Civic',
                versions: ['LX', 'EX', 'Sport']
            },
            'City': { name: 'City' },
        }
    },
    Volkswagen: {
        name: 'Volkswagen',
        models: {
            'T-Cross': {
                name: 'T-Cross',
                versions: ['Trendline', 'Comfortline', 'Highline']
            },
            'Tiguan': {
                name: 'Tiguan',
                versions: ['Trendline', 'Comfortline', 'Highline']
            },
            'Polo': { name: 'Polo' },
            'Amarok': { name: 'Amarok' },
            'Virtus': { name: 'Virtus' },
        }
    },
    Renault: {
        name: 'Renault',
        models: {
            'Duster': {
                name: 'Duster',
                versions: ['Zen', 'Intens', 'Iconic']
            },
            'Kwid': {
                name: 'Kwid',
                versions: ['Zen', 'Intens']
            },
            'Captur': { name: 'Captur' },
            'Koleos': { name: 'Koleos' },
            'Sandero': { name: 'Sandero' },
        }
    },
    Citroen: {
        name: 'Citroen',
        models: {
            'C3': { name: 'C3' },
            'C4 Cactus': { name: 'C4 Cactus' },
            'Berlingo': { name: 'Berlingo' },
        }
    },
    Subaru: {
        name: 'Subaru',
        models: {
            'Forester': { name: 'Forester' },
            'Outback': { name: 'Outback' },
            'XV': { name: 'XV' },
            'Impreza': { name: 'Impreza' },
        }
    },
    Jeep: {
        name: 'Jeep',
        models: {
            'Compass': {
                name: 'Compass',
                versions: ['Sport', 'Longitude', 'Limited', 'Trailhawk']
            },
            'Renegade': {
                name: 'Renegade',
                versions: ['Sport', 'Longitude', 'Limited']
            },
            'Wrangler': { name: 'Wrangler' },
            'Grand Cherokee': { name: 'Grand Cherokee' },
        }
    },
    Fiat: {
        name: 'Fiat',
        models: {
            'Argo': { name: 'Argo' },
            'Cronos': { name: 'Cronos' },
            'Toro': { name: 'Toro' },
            'Mobi': { name: 'Mobi' },
        }
    },
    'Mercedes-Benz': {
        name: 'Mercedes-Benz',
        models: {
            'Clase A': { name: 'Clase A' },
            'Clase C': { name: 'Clase C' },
            'Clase E': { name: 'Clase E' },
            'GLA': { name: 'GLA' },
            'GLC': { name: 'GLC' },
            'GLE': { name: 'GLE' },
        }
    },
    BMW: {
        name: 'BMW',
        models: {
            'Serie 1': { name: 'Serie 1' },
            'Serie 3': { name: 'Serie 3' },
            'Serie 5': { name: 'Serie 5' },
            'X1': { name: 'X1' },
            'X3': { name: 'X3' },
            'X5': { name: 'X5' },
        }
    },
    Audi: {
        name: 'Audi',
        models: {
            'A3': { name: 'A3' },
            'A4': { name: 'A4' },
            'Q3': { name: 'Q3' },
            'Q5': { name: 'Q5' },
        }
    },
}

// Helper functions
export const getBrands = (): string[] => {
    return Object.keys(chileanVehicles).sort()
}

export const getModels = (brand: string): string[] => {
    if (!chileanVehicles[brand]) return []
    return Object.keys(chileanVehicles[brand].models).sort()
}

export const getVersions = (brand: string, model: string): string[] => {
    if (!chileanVehicles[brand] || !chileanVehicles[brand].models[model]) return []
    return chileanVehicles[brand].models[model].versions || []
}
