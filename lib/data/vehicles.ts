// Comprehensive Chilean Vehicle Database - 2024/2025
// Includes ALL brands and models sold in Chile

export interface VehicleModel {
    name: string
    versions?: string[]
}

export interface VehicleBrand {
    name: string
    models: Record<string, VehicleModel>
}

export const chileanVehicles: Record<string, VehicleBrand> = {
    // JAPANESE BRANDS
    Toyota: {
        name: 'Toyota',
        models: {
            'Hilux': { name: 'Hilux', versions: ['DX 4x2', 'DX 4x4', 'SR 4x4', 'SRV 4x4', 'Limited 4x4', 'GR-Sport'] },
            'Corolla': { name: 'Corolla', versions: ['XLi', 'XEi', 'SEG', 'Hybrid', 'Cross'] },
            'RAV4': { name: 'RAV4', versions: ['XLE', 'Limited', 'Hybrid', 'Adventure'] },
            'Yaris': { name: 'Yaris', versions: ['Core', 'XLS', 'XS', 'Sedan'] },
            'Land Cruiser': { name: 'Land Cruiser', versions: ['Prado TX', 'Prado VX', 'LC300', 'LC70'] },
            'Camry': { name: 'Camry', versions: ['LE', 'SE', 'XLE', 'Hybrid'] },
            'C-HR': { name: 'C-HR', versions: ['XLE', 'Limited'] },
            'Prius': { name: 'Prius', versions: ['Hybrid', 'Prime'] },
            'Fortuner': { name: 'Fortuner' },
            'Avanza': { name: 'Avanza' },
            'Rush': { name: 'Rush' },
            'Sienna': { name: 'Sienna' },
            'Tacoma': { name: 'Tacoma' },
            'Tundra': { name: 'Tundra' },
            '4Runner': { name: '4Runner' },
            'Highlander': { name: 'Highlander' },
            'Sequoia': { name: 'Sequoia' },
            'bZ4X': { name: 'bZ4X' },
        }
    },

    Nissan: {
        name: 'Nissan',
        models: {
            'Kicks': { name: 'Kicks', versions: ['Sense', 'Advance', 'Exclusive'] },
            'Versa': { name: 'Versa', versions: ['Sense', 'Advance', 'Exclusive'] },
            'X-Trail': { name: 'X-Trail', versions: ['Sense', 'Advance', 'Exclusive'] },
            'Frontier': { name: 'Frontier', versions: ['S', 'SE', 'Pro-4X', 'Platinum'] },
            'Sentra': { name: 'Sentra', versions: ['Sense', 'Advance', 'Exclusive'] },
            'Qashqai': { name: 'Qashqai', versions: ['Sense', 'Advance', 'Exclusive'] },
            'Pathfinder': { name: 'Pathfinder' },
            'Murano': { name: 'Murano' },
            'Altima': { name: 'Altima' },
            'Leaf': { name: 'Leaf' },
            'Navara': { name: 'Navara' },
            'Patrol': { name: 'Patrol' },
            'Armada': { name: 'Armada' },
        }
    },

    Honda: {
        name: 'Honda',
        models: {
            'HR-V': { name: 'HR-V', versions: ['LX', 'EX', 'EXL', 'Touring'] },
            'CR-V': { name: 'CR-V', versions: ['LX', 'EX', 'EXL', 'Touring', 'Hybrid'] },
            'Civic': { name: 'Civic', versions: ['LX', 'EX', 'Sport', 'Touring', 'Type R'] },
            'City': { name: 'City', versions: ['LX', 'EX'] },
            'Accord': { name: 'Accord', versions: ['LX', 'Sport', 'EX', 'Touring', 'Hybrid'] },
            'Pilot': { name: 'Pilot' },
            'Odyssey': { name: 'Odyssey' },
            'Passport': { name: 'Passport' },
            'Ridgeline': { name: 'Ridgeline' },
            'Fit': { name: 'Fit' },
            'WR-V': { name: 'WR-V' },
        }
    },

    Mazda: {
        name: 'Mazda',
        models: {
            'CX-5': { name: 'CX-5', versions: ['V', 'R', 'S', 'Signature'] },
            'CX-30': { name: 'CX-30', versions: ['V', 'R', 'S'] },
            'Mazda3': { name: 'Mazda3', versions: ['V', 'R', 'S', 'Turbo'] },
            'CX-9': { name: 'CX-9', versions: ['Sport', 'Touring', 'Signature'] },
            'BT-50': { name: 'BT-50', versions: ['XS', 'XT', 'XTR'] },
            'Mazda2': { name: 'Mazda2', versions: ['V', 'R'] },
            'CX-50': { name: 'CX-50' },
            'CX-60': { name: 'CX-60' },
            'CX-70': { name: 'CX-70' },
            'CX-90': { name: 'CX-90' },
            'MX-5': { name: 'MX-5' },
            'MX-30': { name: 'MX-30' },
        }
    },

    Mitsubishi: {
        name: 'Mitsubishi',
        models: {
            'L200': { name: 'L200', versions: ['GL', 'GLS', 'GLX', 'Triton'] },
            'ASX': { name: 'ASX', versions: ['GL', 'GLS', 'GLX'] },
            'Outlander': { name: 'Outlander', versions: ['ES', 'SE', 'SEL', 'PHEV'] },
            'Eclipse Cross': { name: 'Eclipse Cross', versions: ['ES', 'SE', 'SEL'] },
            'Montero Sport': { name: 'Montero Sport' },
            'Mirage': { name: 'Mirage' },
            'Xpander': { name: 'Xpander' },
            'Pajero': { name: 'Pajero' },
        }
    },

    Subaru: {
        name: 'Subaru',
        models: {
            'Forester': { name: 'Forester', versions: ['Base', 'Premium', 'Sport', 'Limited', 'Touring'] },
            'Outback': { name: 'Outback', versions: ['Base', 'Premium', 'Limited', 'Touring', 'XT'] },
            'XV': { name: 'XV', versions: ['Base', 'Premium', 'Limited'] },
            'Impreza': { name: 'Impreza', versions: ['Base', 'Premium', 'Sport', 'Limited'] },
            'WRX': { name: 'WRX', versions: ['Base', 'Premium', 'Limited', 'STI'] },
            'Crosstrek': { name: 'Crosstrek' },
            'Ascent': { name: 'Ascent' },
            'Legacy': { name: 'Legacy' },
            'BRZ': { name: 'BRZ' },
            'Solterra': { name: 'Solterra' },
        }
    },

    Suzuki: {
        name: 'Suzuki',
        models: {
            'Vitara': { name: 'Vitara', versions: ['GL', 'GLX', 'All Grip', 'Sport'] },
            'Swift': { name: 'Swift', versions: ['GL', 'GLX', 'Sport', 'Hybrid'] },
            'Baleno': { name: 'Baleno', versions: ['GL', 'GLX', 'Hatchback'] },
            'Jimny': { name: 'Jimny', versions: ['GA', 'JLX', 'Sierra'] },
            'S-Cross': { name: 'S-Cross', versions: ['GL', 'GLX'] },
            'Fronx': { name: 'Fronx' },
            'Ertiga': { name: 'Ertiga' },
            'Ciaz': { name: 'Ciaz' },
            'Ignis': { name: 'Ignis' },
            'XL7': { name: 'XL7' },
        }
    },

    // KOREAN BRANDS
    Hyundai: {
        name: 'Hyundai',
        models: {
            'Tucson': { name: 'Tucson', versions: ['GL', 'GLS', 'Limited', 'N Line', 'Hybrid'] },
            'Creta': { name: 'Creta', versions: ['GL', 'GLS', 'Limited', 'N Line'] },
            'Accent': { name: 'Accent', versions: ['GL', 'GLS'] },
            'Santa Fe': { name: 'Santa Fe', versions: ['GLS', 'Limited', 'Calligraphy', 'Hybrid'] },
            'Elantra': { name: 'Elantra', versions: ['GL', 'GLS', 'Limited', 'N Line', 'N'] },
            'Kona': { name: 'Kona', versions: ['GL', 'GLS', 'Limited', 'N Line', 'Electric'] },
            'Venue': { name: 'Venue', versions: ['GL', 'GLS'] },
            'Grand i10': { name: 'Grand i10', versions: ['GL', 'GLS', 'Hatchback', 'Sedan'] },
            'i20': { name: 'i20', versions: ['GL', 'GLS', 'N Line'] },
            'Palisade': { name: 'Palisade', versions: ['GLS', 'Limited', 'Calligraphy'] },
            'Staria': { name: 'Staria' },
            'Ioniq 5': { name: 'Ioniq 5' },
            'Ioniq 6': { name: 'Ioniq 6' },
            'Sonata': { name: 'Sonata' },
            'Veloster': { name: 'Veloster' },
        }
    },

    Kia: {
        name: 'Kia',
        models: {
            'Sportage': { name: 'Sportage', versions: ['LX', 'EX', 'SX', 'GT Line', 'Hybrid'] },
            'Seltos': { name: 'Seltos', versions: ['LX', 'EX', 'SX', 'GT Line'] },
            'Rio': { name: 'Rio', versions: ['LX', 'EX', 'Hatchback', 'Sedan'] },
            'Sorento': { name: 'Sorento', versions: ['LX', 'EX', 'SX', 'Hybrid'] },
            'Picanto': { name: 'Picanto', versions: ['LX', 'EX'] },
            'Soul': { name: 'Soul', versions: ['LX', 'EX', 'GT Line'] },
            'Stonic': { name: 'Stonic', versions: ['LX', 'EX'] },
            'Soluto': { name: 'Soluto', versions: ['LX', 'EX'] },
            'Morning': { name: 'Morning' },
            'Sonet': { name: 'Sonet' },
            'Carnival': { name: 'Carnival' },
            'K3': { name: 'K3' },
            'K5': { name: 'K5' },
            'K8': { name: 'K8' },
            'EV6': { name: 'EV6' },
            'EV9': { name: 'EV9' },
            'Niro': { name: 'Niro', versions: ['Hybrid', 'PHEV', 'EV'] },
            'Tasman': { name: 'Tasman' },
        }
    },

    // AMERICAN BRANDS
    Chevrolet: {
        name: 'Chevrolet',
        models: {
            'Tracker': { name: 'Tracker', versions: ['LS', 'LT', 'Premier', 'RS'] },
            'Onix': { name: 'Onix', versions: ['Joy', 'LT', 'Premier', 'RS'] },
            'Aveo': { name: 'Aveo', versions: ['LS', 'LT'] },
            'Sonic': { name: 'Sonic', versions: ['LT', 'LTZ', 'RS'] },
            'Optra': { name: 'Optra', versions: ['LS', 'LT'] },
            'Cruze': { name: 'Cruze', versions: ['LS', 'LT', 'Premier'] },
            'S10': { name: 'S10', versions: ['LS 4x2', 'LT 4x2', 'LT 4x4', 'High Country'] },
            'Captiva': { name: 'Captiva', versions: ['LS', 'LT', 'Premier'] },
            'Sail': { name: 'Sail', versions: ['LS', 'LT'] },
            'Spark': { name: 'Spark', versions: ['LS', 'LT'] },
            'Groove': { name: 'Groove', versions: ['LS', 'LT', 'Premier'] },
            'Trailblazer': { name: 'Trailblazer', versions: ['LS', 'LT', 'Premier', 'RS'] },
            'Equinox': { name: 'Equinox', versions: ['LS', 'LT', 'Premier'] },
            'Traverse': { name: 'Traverse' },
            'Tahoe': { name: 'Tahoe' },
            'Suburban': { name: 'Suburban' },
            'Silverado': { name: 'Silverado', versions: ['1500', '2500', '3500'] },
            'Colorado': { name: 'Colorado' },
            'Camaro': { name: 'Camaro' },
            'Corvette': { name: 'Corvette' },
            'Blazer': { name: 'Blazer' },
            'Bolt': { name: 'Bolt' },
        }
    },

    Ford: {
        name: 'Ford',
        models: {
            'Ranger': { name: 'Ranger', versions: ['XL', 'XLS', 'XLT', 'Limited', 'Raptor', 'Wildtrak'] },
            'Territory': { name: 'Territory', versions: ['Trend', 'Titanium'] },
            'Escape': { name: 'Escape', versions: ['S', 'SE', 'Titanium'] },
            'F-150': { name: 'F-150', versions: ['XL', 'XLT', 'Lariat', 'King Ranch', 'Raptor'] },
            'Mustang': { name: 'Mustang', versions: ['EcoBoost', 'GT', 'Mach 1', 'Shelby GT500'] },
            'Explorer': { name: 'Explorer', versions: ['Base', 'XLT', 'Limited', 'ST'] },
            'Expedition': { name: 'Expedition' },
            'Edge': { name: 'Edge' },
            'Bronco': { name: 'Bronco', versions: ['Base', 'Big Bend', 'Badlands', 'Wildtrak', 'Raptor'] },
            'Bronco Sport': { name: 'Bronco Sport' },
            'EcoSport': { name: 'EcoSport' },
            'Maverick': { name: 'Maverick' },
            'Transit': { name: 'Transit' },
            'F-250': { name: 'F-250' },
            'F-350': { name: 'F-350' },
            'Mustang Mach-E': { name: 'Mustang Mach-E' },
        }
    },

    Jeep: {
        name: 'Jeep',
        models: {
            'Compass': { name: 'Compass', versions: ['Sport', 'Longitude', 'Limited', 'Trailhawk'] },
            'Renegade': { name: 'Renegade', versions: ['Sport', 'Longitude', 'Limited', 'Trailhawk'] },
            'Wrangler': { name: 'Wrangler', versions: ['Sport', 'Sahara', 'Rubicon', 'Unlimited', '4xe'] },
            'Grand Cherokee': { name: 'Grand Cherokee', versions: ['Laredo', 'Limited', 'Overland', 'Summit', 'Trailhawk'] },
            'Cherokee': { name: 'Cherokee' },
            'Gladiator': { name: 'Gladiator', versions: ['Sport', 'Overland', 'Rubicon'] },
            'Commander': { name: 'Commander' },
            'Grand Wagoneer': { name: 'Grand Wagoneer' },
            'Wagoneer': { name: 'Wagoneer' },
        }
    },

    Dodge: {
        name: 'Dodge',
        models: {
            'Durango': { name: 'Durango', versions: ['SXT', 'GT', 'R/T', 'SRT'] },
            'Challenger': { name: 'Challenger', versions: ['SXT', 'GT', 'R/T', 'Scat Pack', 'SRT Hellcat'] },
            'Charger': { name: 'Charger', versions: ['SXT', 'GT', 'R/T', 'Scat Pack', 'SRT Hellcat'] },
            'Ram 1500': { name: 'Ram 1500', versions: ['Tradesman', 'Big Horn', 'Laramie', 'Rebel', 'Limited'] },
            'Ram 2500': { name: 'Ram 2500' },
            'Ram 3500': { name: 'Ram 3500' },
            'Journey': { name: 'Journey' },
        }
    },

    // EUROPEAN BRANDS
    Volkswagen: {
        name: 'Volkswagen',
        models: {
            'T-Cross': { name: 'T-Cross', versions: ['Trendline', 'Comfortline', 'Highline'] },
            'Tiguan': { name: 'Tiguan', versions: ['Trendline', 'Comfortline', 'Highline', 'R-Line'] },
            'Polo': { name: 'Polo', versions: ['Trendline', 'Comfortline', 'Highline', 'GTI'] },
            'Amarok': { name: 'Amarok', versions: ['Trendline', 'Comfortline', 'Highline'] },
            'Virtus': { name: 'Virtus', versions: ['Trendline', 'Comfortline', 'Highline'] },
            'Taos': { name: 'Taos' },
            'Nivus': { name: 'Nivus' },
            'Jetta': { name: 'Jetta', versions: ['Trendline', 'Comfortline', 'Highline', 'GLI'] },
            'Golf': { name: 'Golf', versions: ['Trendline', 'Comfortline', 'Highline', 'GTI', 'R'] },
            'Passat': { name: 'Passat' },
            'Arteon': { name: 'Arteon' },
            'Atlas': { name: 'Atlas' },
            'ID.4': { name: 'ID.4' },
            'ID.Buzz': { name: 'ID.Buzz' },
            'Touareg': { name: 'Touareg' },
        }
    },

    Peugeot: {
        name: 'Peugeot',
        models: {
            '208': { name: '208', versions: ['Active', 'Allure', 'GT', 'e-208'] },
            '2008': { name: '2008', versions: ['Active', 'Allure', 'GT'] },
            '3008': { name: '3008', versions: ['Active', 'Allure', 'GT'] },
            '5008': { name: '5008', versions: ['Active', 'Allure', 'GT'] },
            'Partner': { name: 'Partner', versions: ['Confort', 'Maxi'] },
            '308': { name: '308' },
            '408': { name: '408' },
            '508': { name: '508' },
            'Rifter': { name: 'Rifter' },
            'Traveller': { name: 'Traveller' },
            'Landtrek': { name: 'Landtrek' },
        }
    },

    Renault: {
        name: 'Renault',
        models: {
            'Duster': { name: 'Duster', versions: ['Zen', 'Intens', 'Iconic', 'Oroch'] },
            'Kwid': { name: 'Kwid', versions: ['Zen', 'Intens', 'Outsider'] },
            'Captur': { name: 'Captur', versions: ['Zen', 'Intens', 'Iconic'] },
            'Koleos': { name: 'Koleos', versions: ['Zen', 'Intens', 'Iconic'] },
            'Sandero': { name: 'Sandero', versions: ['Zen', 'Intens', 'Stepway'] },
            'Logan': { name: 'Logan', versions: ['Zen', 'Intens'] },
            'Alaskan': { name: 'Alaskan' },
            'Kangoo': { name: 'Kangoo' },
            'Megane': { name: 'Megane' },
            'Clio': { name: 'Clio' },
            'Talisman': { name: 'Talisman' },
            'Kadjar': { name: 'Kadjar' },
            'Arkana': { name: 'Arkana' },
        }
    },

    Citroen: {
        name: 'Citroen',
        models: {
            'C3': { name: 'C3', versions: ['Live', 'Feel', 'Shine'] },
            'C4 Cactus': { name: 'C4 Cactus', versions: ['Live', 'Feel', 'Shine'] },
            'Berlingo': { name: 'Berlingo', versions: ['Feel', 'Shine'] },
            'C5 Aircross': { name: 'C5 Aircross', versions: ['Live', 'Feel', 'Shine'] },
            'C3 Aircross': { name: 'C3 Aircross' },
            'C4': { name: 'C4' },
            'Jumpy': { name: 'Jumpy' },
            'SpaceTourer': { name: 'SpaceTourer' },
        }
    },

    Fiat: {
        name: 'Fiat',
        models: {
            'Argo': { name: 'Argo', versions: ['Drive', 'Precision', 'HGT'] },
            'Cronos': { name: 'Cronos', versions: ['Drive', 'Precision', 'HGT'] },
            'Toro': { name: 'Toro', versions: ['Freedom', 'Volcano', 'Ranch', 'Ultra'] },
            'Mobi': { name: 'Mobi', versions: ['Easy', 'Like', 'Trekking'] },
            'Pulse': { name: 'Pulse' },
            'Fastback': { name: 'Fastback' },
            'Strada': { name: 'Strada' },
            'Ducato': { name: 'Ducato' },
            '500': { name: '500', versions: ['Pop', 'Lounge', 'Sport', 'e-500'] },
            '500X': { name: '500X' },
        }
    },

    // GERMAN LUXURY
    'Mercedes-Benz': {
        name: 'Mercedes-Benz',
        models: {
            'Clase A': { name: 'Clase A', versions: ['A 200', 'A 250', 'AMG A 35', 'AMG A 45'] },
            'Clase C': { name: 'Clase C', versions: ['C 200', 'C 300', 'AMG C 43', 'AMG C 63'] },
            'Clase E': { name: 'Clase E', versions: ['E 200', 'E 300', 'E 450', 'AMG E 53', 'AMG E 63'] },
            'Clase S': { name: 'Clase S', versions: ['S 450', 'S 500', 'AMG S 63'] },
            'GLA': { name: 'GLA', versions: ['GLA 200', 'GLA 250', 'AMG GLA 35', 'AMG GLA 45'] },
            'GLB': { name: 'GLB', versions: ['GLB 200', 'GLB 250'] },
            'GLC': { name: 'GLC', versions: ['GLC 200', 'GLC 300', 'AMG GLC 43', 'AMG GLC 63'] },
            'GLE': { name: 'GLE', versions: ['GLE 350', 'GLE 450', 'AMG GLE 53', 'AMG GLE 63'] },
            'GLS': { name: 'GLS', versions: ['GLS 450', 'GLS 580', 'AMG GLS 63'] },
            'G-Class': { name: 'G-Class', versions: ['G 500', 'AMG G 63'] },
            'EQA': { name: 'EQA' },
            'EQB': { name: 'EQB' },
            'EQC': { name: 'EQC' },
            'EQE': { name: 'EQE' },
            'EQS': { name: 'EQS' },
            'Sprinter': { name: 'Sprinter' },
            'Vito': { name: 'Vito' },
            'Clase X': { name: 'Clase X' },
        }
    },

    BMW: {
        name: 'BMW',
        models: {
            'Serie 1': { name: 'Serie 1', versions: ['118i', '120i', 'M135i'] },
            'Serie 2': { name: 'Serie 2', versions: ['220i', '230i', 'M240i', 'M2'] },
            'Serie 3': { name: 'Serie 3', versions: ['320i', '330i', 'M340i', 'M3'] },
            'Serie 4': { name: 'Serie 4', versions: ['420i', '430i', 'M440i', 'M4'] },
            'Serie 5': { name: 'Serie 5', versions: ['520i', '530i', 'M550i', 'M5'] },
            'Serie 7': { name: 'Serie 7', versions: ['730i', '740i', 'M760i'] },
            'Serie 8': { name: 'Serie 8', versions: ['840i', 'M850i'] },
            'X1': { name: 'X1', versions: ['sDrive18i', 'xDrive28i'] },
            'X2': { name: 'X2', versions: ['sDrive18i', 'xDrive28i', 'M35i'] },
            'X3': { name: 'X3', versions: ['xDrive30i', 'M40i', 'M Competition'] },
            'X4': { name: 'X4', versions: ['xDrive30i', 'M40i', 'M Competition'] },
            'X5': { name: 'X5', versions: ['xDrive40i', 'xDrive50i', 'M50i', 'M Competition'] },
            'X6': { name: 'X6', versions: ['xDrive40i', 'M50i', 'M Competition'] },
            'X7': { name: 'X7', versions: ['xDrive40i', 'M50i'] },
            'iX': { name: 'iX', versions: ['xDrive40', 'xDrive50', 'M60'] },
            'i4': { name: 'i4', versions: ['eDrive40', 'M50'] },
            'i7': { name: 'i7' },
            'Z4': { name: 'Z4', versions: ['sDrive30i', 'M40i'] },
        }
    },

    Audi: {
        name: 'Audi',
        models: {
            'A1': { name: 'A1', versions: ['30 TFSI', '35 TFSI', 'S1'] },
            'A3': { name: 'A3', versions: ['35 TFSI', '40 TFSI', 'S3', 'RS3'] },
            'A4': { name: 'A4', versions: ['35 TFSI', '40 TFSI', '45 TFSI', 'S4', 'RS4'] },
            'A5': { name: 'A5', versions: ['35 TFSI', '40 TFSI', '45 TFSI', 'S5', 'RS5'] },
            'A6': { name: 'A6', versions: ['40 TFSI', '45 TFSI', '55 TFSI', 'S6', 'RS6'] },
            'A7': { name: 'A7', versions: ['45 TFSI', '55 TFSI', 'S7', 'RS7'] },
            'A8': { name: 'A8', versions: ['50 TDI', '55 TFSI', '60 TFSI', 'S8'] },
            'Q2': { name: 'Q2', versions: ['30 TFSI', '35 TFSI'] },
            'Q3': { name: 'Q3', versions: ['35 TFSI', '40 TFSI', '45 TFSI', 'RS Q3'] },
            'Q5': { name: 'Q5', versions: ['40 TFSI', '45 TFSI', 'SQ5'] },
            'Q7': { name: 'Q7', versions: ['45 TFSI', '50 TDI', '55 TFSI', 'SQ7'] },
            'Q8': { name: 'Q8', versions: ['50 TDI', '55 TFSI', 'SQ8', 'RS Q8'] },
            'e-tron': { name: 'e-tron', versions: ['50', '55'] },
            'e-tron GT': { name: 'e-tron GT', versions: ['quattro', 'RS'] },
            'Q4 e-tron': { name: 'Q4 e-tron' },
            'TT': { name: 'TT', versions: ['Coupe', 'Roadster', 'TTS', 'TT RS'] },
            'R8': { name: 'R8' },
        }
    },

    // CHINESE BRANDS
    'Great Wall': {
        name: 'Great Wall',
        models: {
            'Poer': { name: 'Poer', versions: ['Luxury', 'Elite'] },
            'Jolion': { name: 'Jolion', versions: ['Active', 'Elite', 'Ultra'] },
            'Haval H6': { name: 'Haval H6', versions: ['Active', 'Elite', 'Ultra'] },
            'Haval H9': { name: 'Haval H9' },
            'Wingle 5': { name: 'Wingle 5' },
            'Wingle 7': { name: 'Wingle 7' },
            'Ora Good Cat': { name: 'Ora Good Cat' },
            'Tank 300': { name: 'Tank 300' },
            'Tank 500': { name: 'Tank 500' },
        }
    },

    MG: {
        name: 'MG',
        models: {
            'ZS': { name: 'ZS', versions: ['Core', 'Comfort', 'Luxury', 'EV'] },
            'HS': { name: 'HS', versions: ['Core', 'Comfort', 'Trophy'] },
            'MG5': { name: 'MG5', versions: ['Comfort', 'Luxury'] },
            'RX5': { name: 'RX5', versions: ['Comfort', 'Luxury'] },
            'MG4': { name: 'MG4', versions: ['EV'] },
            'MG6': { name: 'MG6' },
            'Hector': { name: 'Hector' },
            'Gloster': { name: 'Gloster' },
            'One': { name: 'One' },
        }
    },

    Chery: {
        name: 'Chery',
        models: {
            'Tiggo 2': { name: 'Tiggo 2', versions: ['Comfort', 'Luxury'] },
            'Tiggo 3': { name: 'Tiggo 3', versions: ['Comfort', 'Luxury'] },
            'Tiggo 4': { name: 'Tiggo 4', versions: ['Comfort', 'Luxury'] },
            'Tiggo 5': { name: 'Tiggo 5', versions: ['Comfort', 'Luxury'] },
            'Tiggo 7': { name: 'Tiggo 7', versions: ['Comfort', 'Luxury', 'Pro'] },
            'Tiggo 8': { name: 'Tiggo 8', versions: ['Comfort', 'Luxury', 'Pro'] },
            'Arrizo 5': { name: 'Arrizo 5' },
            'Arrizo 6': { name: 'Arrizo 6' },
            'QQ': { name: 'QQ' },
        }
    },

    Changan: {
        name: 'Changan',
        models: {
            'CS35 Plus': { name: 'CS35 Plus', versions: ['Comfort', 'Luxury'] },
            'CS55 Plus': { name: 'CS55 Plus', versions: ['Comfort', 'Luxury'] },
            'CS75 Plus': { name: 'CS75 Plus', versions: ['Comfort', 'Luxury'] },
            'CS85 Coupe': { name: 'CS85 Coupe' },
            'Uni-K': { name: 'Uni-K' },
            'Uni-T': { name: 'Uni-T' },
            'Alsvin': { name: 'Alsvin' },
            'Hunter': { name: 'Hunter' },
        }
    },

    Geely: {
        name: 'Geely',
        models: {
            'Coolray': { name: 'Coolray', versions: ['Comfort', 'Luxury', 'Sport'] },
            'Emgrand': { name: 'Emgrand', versions: ['GL', 'GS'] },
            'Azkarra': { name: 'Azkarra' },
            'Okavango': { name: 'Okavango' },
            'Geometry C': { name: 'Geometry C' },
        }
    },

    'Omoda+Jaecoo': {
        name: 'Omoda+Jaecoo',
        models: {
            'Omoda C5': { name: 'Omoda C5', versions: ['Comfort', 'Luxury'] },
            'Omoda E5': { name: 'Omoda E5' },
            'Jaecoo 7': { name: 'Jaecoo 7' },
            'Jaecoo 8': { name: 'Jaecoo 8' },
        }
    },

    JAC: {
        name: 'JAC',
        models: {
            'S2': { name: 'S2' },
            'S3': { name: 'S3' },
            'S4': { name: 'S4' },
            'T6': { name: 'T6' },
            'T8': { name: 'T8' },
            'JS4': { name: 'JS4' },
            'E-JS1': { name: 'E-JS1' },
        }
    },

    Jetour: {
        name: 'Jetour',
        models: {
            'X70': { name: 'X70', versions: ['Comfort', 'Luxury'] },
            'X90': { name: 'X90', versions: ['Comfort', 'Luxury'] },
            'Dashing': { name: 'Dashing' },
        }
    },

    DFM: {
        name: 'DFM',
        models: {
            'Glory 580': { name: 'Glory 580' },
            'Glory 500': { name: 'Glory 500' },
            'Rich 6': { name: 'Rich 6' },
            'AX7': { name: 'AX7' },
        }
    },

    Foton: {
        name: 'Foton',
        models: {
            'Tunland': { name: 'Tunland', versions: ['Comfort', 'Luxury'] },
            'View': { name: 'View' },
            'Sauvana': { name: 'Sauvana' },
        }
    },

    BYD: {
        name: 'BYD',
        models: {
            'Atto 3': { name: 'Atto 3', versions: ['Standard', 'Extended'] },
            'Dolphin': { name: 'Dolphin' },
            'Seal': { name: 'Seal' },
            'Han': { name: 'Han' },
            'Tang': { name: 'Tang' },
            'Song Plus': { name: 'Song Plus' },
            'Yuan Plus': { name: 'Yuan Plus' },
            'Seagull': { name: 'Seagull' },
        }
    },

    // INDIAN BRANDS
    Mahindra: {
        name: 'Mahindra',
        models: {
            'Scorpio': { name: 'Scorpio', versions: ['S3', 'S5', 'S7', 'S9'] },
            'XUV500': { name: 'XUV500' },
            'XUV700': { name: 'XUV700', versions: ['MX', 'AX3', 'AX5', 'AX7'] },
            'Thar': { name: 'Thar', versions: ['AX', 'LX'] },
            'Bolero': { name: 'Bolero' },
            'KUV100': { name: 'KUV100' },
            'Marazzo': { name: 'Marazzo' },
        }
    },

    // LUXURY/PREMIUM
    Porsche: {
        name: 'Porsche',
        models: {
            '911': { name: '911', versions: ['Carrera', 'Carrera S', 'Turbo', 'GT3', 'GT3 RS'] },
            'Cayenne': { name: 'Cayenne', versions: ['Base', 'S', 'GTS', 'Turbo', 'E-Hybrid'] },
            'Macan': { name: 'Macan', versions: ['Base', 'S', 'GTS', 'Turbo'] },
            'Panamera': { name: 'Panamera', versions: ['Base', '4S', 'GTS', 'Turbo'] },
            'Taycan': { name: 'Taycan', versions: ['Base', '4S', 'Turbo', 'Turbo S'] },
            'Boxster': { name: 'Boxster', versions: ['Base', 'S', 'GTS'] },
            'Cayman': { name: 'Cayman', versions: ['Base', 'S', 'GTS', 'GT4'] },
        }
    },

    'Land Rover': {
        name: 'Land Rover',
        models: {
            'Defender': { name: 'Defender', versions: ['90', '110', '130', 'X'] },
            'Discovery': { name: 'Discovery', versions: ['S', 'SE', 'HSE'] },
            'Discovery Sport': { name: 'Discovery Sport', versions: ['S', 'SE', 'HSE'] },
            'Range Rover': { name: 'Range Rover', versions: ['SE', 'HSE', 'Autobiography'] },
            'Range Rover Sport': { name: 'Range Rover Sport', versions: ['SE', 'HSE', 'Autobiography'] },
            'Range Rover Evoque': { name: 'Range Rover Evoque', versions: ['S', 'SE', 'HSE'] },
            'Range Rover Velar': { name: 'Range Rover Velar', versions: ['S', 'SE', 'HSE'] },
        }
    },

    Volvo: {
        name: 'Volvo',
        models: {
            'XC40': { name: 'XC40', versions: ['Momentum', 'R-Design', 'Inscription', 'Recharge'] },
            'XC60': { name: 'XC60', versions: ['Momentum', 'R-Design', 'Inscription'] },
            'XC90': { name: 'XC90', versions: ['Momentum', 'R-Design', 'Inscription'] },
            'S60': { name: 'S60', versions: ['Momentum', 'R-Design', 'Inscription'] },
            'S90': { name: 'S90', versions: ['Momentum', 'R-Design', 'Inscription'] },
            'V60': { name: 'V60' },
            'V90': { name: 'V90' },
            'C40': { name: 'C40' },
            'EX30': { name: 'EX30' },
            'EX90': { name: 'EX90' },
        }
    },

    Tesla: {
        name: 'Tesla',
        models: {
            'Model 3': { name: 'Model 3', versions: ['Standard Range', 'Long Range', 'Performance'] },
            'Model Y': { name: 'Model Y', versions: ['Long Range', 'Performance'] },
            'Model S': { name: 'Model S', versions: ['Long Range', 'Plaid'] },
            'Model X': { name: 'Model X', versions: ['Long Range', 'Plaid'] },
            'Cybertruck': { name: 'Cybertruck' },
        }
    },

    Lexus: {
        name: 'Lexus',
        models: {
            'UX': { name: 'UX', versions: ['200', '250h'] },
            'NX': { name: 'NX', versions: ['250', '350', '450h+'] },
            'RX': { name: 'RX', versions: ['350', '450h', '500h'] },
            'ES': { name: 'ES', versions: ['250', '300h', '350'] },
            'IS': { name: 'IS', versions: ['300', '350', '500'] },
            'LS': { name: 'LS', versions: ['500', '500h'] },
            'LC': { name: 'LC', versions: ['500', '500h'] },
            'GX': { name: 'GX', versions: ['460', '550'] },
            'LX': { name: 'LX', versions: ['600'] },
            'RC': { name: 'RC', versions: ['300', '350', 'F'] },
        }
    },

    // OTHERS
    'Alfa Romeo': {
        name: 'Alfa Romeo',
        models: {
            'Giulia': { name: 'Giulia', versions: ['Super', 'Ti', 'Veloce', 'Quadrifoglio'] },
            'Stelvio': { name: 'Stelvio', versions: ['Super', 'Ti', 'Veloce', 'Quadrifoglio'] },
            'Tonale': { name: 'Tonale' },
        }
    },

    MINI: {
        name: 'MINI',
        models: {
            'Cooper': { name: 'Cooper', versions: ['3-Door', '5-Door', 'S', 'JCW'] },
            'Countryman': { name: 'Countryman', versions: ['Cooper', 'S', 'JCW'] },
            'Clubman': { name: 'Clubman', versions: ['Cooper', 'S', 'JCW'] },
            'Convertible': { name: 'Convertible' },
            'Electric': { name: 'Electric' },
        }
    },

    Jaguar: {
        name: 'Jaguar',
        models: {
            'E-PACE': { name: 'E-PACE', versions: ['S', 'SE', 'HSE', 'R-Dynamic'] },
            'F-PACE': { name: 'F-PACE', versions: ['S', 'SE', 'HSE', 'SVR'] },
            'I-PACE': { name: 'I-PACE', versions: ['S', 'SE', 'HSE'] },
            'XE': { name: 'XE', versions: ['S', 'SE', 'HSE'] },
            'XF': { name: 'XF', versions: ['S', 'SE', 'HSE'] },
            'F-TYPE': { name: 'F-TYPE', versions: ['P300', 'P450', 'R'] },
        }
    },

    Maserati: {
        name: 'Maserati',
        models: {
            'Ghibli': { name: 'Ghibli', versions: ['GT', 'Modena', 'Trofeo'] },
            'Quattroporte': { name: 'Quattroporte', versions: ['GT', 'Modena', 'Trofeo'] },
            'Levante': { name: 'Levante', versions: ['GT', 'Modena', 'Trofeo'] },
            'Grecale': { name: 'Grecale' },
            'MC20': { name: 'MC20' },
        }
    },

    Ferrari: {
        name: 'Ferrari',
        models: {
            'Roma': { name: 'Roma' },
            'Portofino': { name: 'Portofino' },
            'F8 Tributo': { name: 'F8 Tributo' },
            '296 GTB': { name: '296 GTB' },
            'SF90': { name: 'SF90' },
            '812': { name: '812' },
            'Purosangue': { name: 'Purosangue' },
        }
    },

    Lamborghini: {
        name: 'Lamborghini',
        models: {
            'Huracán': { name: 'Huracán', versions: ['EVO', 'STO', 'Tecnica'] },
            'Urus': { name: 'Urus', versions: ['S', 'Performante'] },
            'Aventador': { name: 'Aventador', versions: ['S', 'SVJ'] },
            'Revuelto': { name: 'Revuelto' },
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
