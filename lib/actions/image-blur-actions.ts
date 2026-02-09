'use server'

import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

interface DetectionBox {
    x: number
    y: number
    width: number
    height: number
    label: string
}

export async function detectSensitiveContent(imageUrl: string) {
    try {
        console.log('[Blur Detection] Analyzing image:', imageUrl)

        // Fetch the image
        const response = await fetch(imageUrl)
        const arrayBuffer = await response.arrayBuffer()
        const base64Image = Buffer.from(arrayBuffer).toString('base64')
        const mimeType = response.headers.get('content-type') || 'image/jpeg'

        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash',
        })

        const prompt = `Analyze this image and detect:
1. License plates (vehicle plates)
2. People/faces in the background

For each detected item, provide the bounding box coordinates in this EXACT JSON format:
{
  "detections": [
    {
      "type": "license_plate" or "person",
      "x": <normalized x coordinate 0-1>,
      "y": <normalized y coordinate 0-1>,
      "width": <normalized width 0-1>,
      "height": <normalized height 0-1>,
      "confidence": <0-1>
    }
  ]
}

IMPORTANT: 
- Coordinates must be normalized (0 to 1) relative to image dimensions
- x,y is the TOP-LEFT corner
- Only detect license plates and people
- Return valid JSON only, no extra text`

        const result = await model.generateContent([
            {
                inlineData: {
                    mimeType,
                    data: base64Image,
                },
            },
            { text: prompt },
        ])

        const text = result.response.text()
        console.log('[Blur Detection] Gemini response:', text)

        // Parse JSON from response
        const jsonMatch = text.match(/\{[\s\S]*\}/)
        if (!jsonMatch) {
            console.error('[Blur Detection] No JSON found in response')
            return { success: false, error: 'No detections found', detections: [] }
        }

        const parsed = JSON.parse(jsonMatch[0])
        const detections = parsed.detections || []

        console.log('[Blur Detection] Found detections:', detections)

        return {
            success: true,
            detections: detections.map((d: any) => ({
                x: d.x,
                y: d.y,
                width: d.width,
                height: d.height,
                type: d.type,
                confidence: d.confidence
            }))
        }
    } catch (error) {
        console.error('[Blur Detection] Error:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Detection failed',
            detections: []
        }
    }
}
