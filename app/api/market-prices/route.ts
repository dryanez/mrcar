import { NextRequest, NextResponse } from 'next/server'
import { searchMarketPricesWithAI, getEstimatedPrices } from '@/lib/utils/scraper'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const marca = searchParams.get('marca')
        const modelo = searchParams.get('modelo')
        const ano = searchParams.get('ano')

        // Validate parameters
        if (!marca || !modelo || !ano) {
            return NextResponse.json(
                { error: 'Missing required parameters: marca, modelo, ano' },
                { status: 400 }
            )
        }

        const year = parseInt(ano, 10)
        if (isNaN(year)) {
            return NextResponse.json(
                { error: 'Invalid year parameter' },
                { status: 400 }
            )
        }

        // Try to use AI to search for prices
        let priceData
        try {
            priceData = await searchMarketPricesWithAI(marca, modelo, year)
        } catch (aiError) {
            console.log('AI search failed, using estimated prices:', aiError)
            priceData = getEstimatedPrices(marca, modelo, year)
        }

        // If AI search returned no listings, use estimated prices
        if (priceData.listings.length === 0) {
            console.log('No listings from AI, using estimated prices')
            priceData = getEstimatedPrices(marca, modelo, year)
        }

        return NextResponse.json(priceData)
    } catch (error) {
        console.error('Error in market-prices API:', error)
        return NextResponse.json(
            { error: 'Failed to fetch market prices' },
            { status: 500 }
        )
    }
}
