'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, DollarSign, ExternalLink, Loader2, Car } from 'lucide-react'

interface PriceSuggestionsProps {
    marca: string
    modelo: string
    ano: number
    onSelectPrice: (price: number) => void
}

interface PriceOption {
    label: string
    value: number
    description: string
    icon: typeof TrendingUp
    color: string
}

export default function PriceSuggestions({ marca, modelo, ano, onSelectPrice }: PriceSuggestionsProps) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [priceData, setPriceData] = useState<any>(null)

    useEffect(() => {
        if (!marca || !modelo || !ano) {
            setPriceData(null)
            return
        }

        const fetchPrices = async () => {
            setLoading(true)
            setError(null)

            try {
                const params = new URLSearchParams({
                    marca,
                    modelo,
                    ano: String(ano),
                })

                const response = await fetch(`/api/market-prices?${params.toString()}`)

                if (!response.ok) {
                    throw new Error('Failed to fetch prices')
                }

                const data = await response.json()
                setPriceData(data)
            } catch (err) {
                console.error('Error fetching market prices:', err)
                setError('No se pudieron obtener los precios del mercado')
            } finally {
                setLoading(false)
            }
        }

        // Debounce the fetch
        const timer = setTimeout(fetchPrices, 500)
        return () => clearTimeout(timer)
    }, [marca, modelo, ano])

    if (!marca || !modelo || !ano) {
        return null
    }

    if (loading) {
        return (
            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                <div className="flex items-center gap-3">
                    <Loader2 className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-spin" />
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                        Buscando precios en el mercado...
                    </p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
                <p className="text-sm text-yellow-700 dark:text-yellow-300">{error}</p>
            </div>
        )
    }

    if (!priceData || (priceData.average === 0 && priceData.highest === 0)) {
        return null
    }

    const priceOptions: PriceOption[] = [
        {
            label: 'Precio Promedio',
            value: priceData.average,
            description: 'Valor promedio del mercado',
            icon: DollarSign,
            color: 'blue',
        },
        {
            label: '30% Descuento',
            value: priceData.discounted,
            description: 'Tasación conservadora',
            icon: TrendingDown,
            color: 'green',
        },
        {
            label: 'Precio Máximo',
            value: priceData.highest,
            description: 'Valor más alto encontrado',
            icon: TrendingUp,
            color: 'purple',
        },
    ]

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 0,
        }).format(price)
    }

    const colorClasses = {
        blue: {
            bg: 'bg-blue-50 dark:bg-blue-900/20',
            border: 'border-blue-200 dark:border-blue-700',
            hover: 'hover:bg-blue-100 dark:hover:bg-blue-900/30',
            text: 'text-blue-700 dark:text-blue-300',
            icon: 'text-blue-600 dark:text-blue-400',
        },
        green: {
            bg: 'bg-green-50 dark:bg-green-900/20',
            border: 'border-green-200 dark:border-green-700',
            hover: 'hover:bg-green-100 dark:hover:bg-green-900/30',
            text: 'text-green-700 dark:text-green-300',
            icon: 'text-green-600 dark:text-green-400',
        },
        purple: {
            bg: 'bg-purple-50 dark:bg-purple-900/20',
            border: 'border-purple-200 dark:border-purple-700',
            hover: 'hover:bg-purple-100 dark:hover:bg-purple-900/30',
            text: 'text-purple-700 dark:text-purple-300',
            icon: 'text-purple-600 dark:text-purple-400',
        },
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    💡 Sugerencias de Precio
                </h3>
                {priceData.searchUrl && (
                    <a
                        href={priceData.searchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        Ver anuncios
                        <ExternalLink className="w-3 h-3" />
                    </a>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {priceOptions.map((option) => {
                    const Icon = option.icon
                    const colors = colorClasses[option.color as keyof typeof colorClasses]

                    return (
                        <button
                            key={option.label}
                            type="button"
                            onClick={() => onSelectPrice(option.value)}
                            className={`p-4 ${colors.bg} border-2 ${colors.border} rounded-xl ${colors.hover} transition-all transform hover:scale-105 text-left`}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                    <Icon className={`w-5 h-5 ${colors.icon}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                        {option.label}
                                    </p>
                                    <p className={`text-lg font-bold ${colors.text} truncate`}>
                                        {formatPrice(option.value)}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        {option.description}
                                    </p>
                                </div>
                            </div>
                        </button>
                    )
                })}
            </div>

            {priceData.listings && priceData.listings.length > 0 && (
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    Basado en {priceData.listings.length} anuncio{priceData.listings.length !== 1 ? 's' : ''} similar{priceData.listings.length !== 1 ? 'es' : ''}
                </p>
            )}

            {/* Car Listings */}
            {priceData.listings && priceData.listings.length > 0 && (
                <div className="mt-6 space-y-3">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Anuncios Encontrados
                    </h4>
                    <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto pr-2">
                        {priceData.listings.map((listing: any, index: number) => (
                            <a
                                key={index}
                                href={listing.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex gap-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all group"
                            >
                                {/* Car Image */}
                                <div className="w-24 h-24 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Car className="w-12 h-12 text-gray-400" />
                                    </div>
                                </div>

                                {/* Car Details */}
                                <div className="flex-1 min-w-0">
                                    <h5 className="font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {listing.title}
                                    </h5>
                                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-gray-600 dark:text-gray-400">
                                        <span>Año {listing.year}</span>
                                        {listing.km > 0 && (
                                            <span>{listing.km.toLocaleString()} km</span>
                                        )}
                                    </div>
                                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-2">
                                        {formatPrice(listing.price)}
                                    </p>
                                </div>

                                {/* External link icon */}
                                <div className="flex-shrink-0 flex items-center">
                                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
