interface BlurRegion {
    x: number
    y: number
    width: number
    height: number
}

export async function blurImageRegions(
    imageUrl: string,
    regions: BlurRegion[]
): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = 'anonymous'

        img.onload = () => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')

            if (!ctx) {
                reject(new Error('Failed to get canvas context'))
                return
            }

            canvas.width = img.width
            canvas.height = img.height

            // Draw original image
            ctx.drawImage(img, 0, 0)

            // Apply blur to each region
            regions.forEach(region => {
                const x = region.x * img.width
                const y = region.y * img.height
                const width = region.width * img.width
                const height = region.height * img.height

                // Get the region data
                const imageData = ctx.getImageData(x, y, width, height)

                // Apply pixelation effect (more efficient than blur)
                const pixelSize = 20
                for (let py = 0; py < height; py += pixelSize) {
                    for (let px = 0; px < width; px += pixelSize) {
                        const i = (py * width + px) * 4
                        const r = imageData.data[i]
                        const g = imageData.data[i + 1]
                        const b = imageData.data[i + 2]

                        // Fill the pixelated block
                        for (let dy = 0; dy < pixelSize && py + dy < height; dy++) {
                            for (let dx = 0; dx < pixelSize && px + dx < width; dx++) {
                                const idx = ((py + dy) * width + (px + dx)) * 4
                                imageData.data[idx] = r
                                imageData.data[idx + 1] = g
                                imageData.data[idx + 2] = b
                            }
                        }
                    }
                }

                // Put the blurred region back
                ctx.putImageData(imageData, x, y)

                // Optional: Add border to show blurred area
                ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)'
                ctx.lineWidth = 2
                ctx.strokeRect(x, y, width, height)
            })

            // Convert to blob
            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(blob)
                } else {
                    reject(new Error('Failed to create blob'))
                }
            }, 'image/jpeg', 0.95)
        }

        img.onerror = () => {
            reject(new Error('Failed to load image'))
        }

        img.src = imageUrl
    })
}
