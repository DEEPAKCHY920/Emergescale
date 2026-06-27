const { Jimp } = require('jimp');

async function main() {
    try {
        const image = await Jimp.read('d:/Emergescale/assets/laptop_mockup.png');
        const width = image.width;
        const height = image.height;
        console.log(`Image dimensions: ${width}x${height}`);
        
        // Sample the background color from the top-left corner (0, 0)
        const bgHex = image.getPixelColor(0, 0);
        const bgR = (bgHex >> 24) & 0xff;
        const bgG = (bgHex >> 16) & 0xff;
        const bgB = (bgHex >> 8) & 0xff;
        console.log(`Background color sampled at (0,0): RGB(${bgR}, ${bgG}, ${bgB})`);
        
        // We will make pixels close to the background color transparent
        const threshold = 18; // color distance threshold
        
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const pixelHex = image.getPixelColor(x, y);
                const r = (pixelHex >> 24) & 0xff;
                const g = (pixelHex >> 16) & 0xff;
                const b = (pixelHex >> 8) & 0xff;
                const a = pixelHex & 0xff;
                
                // Calculate Euclidean distance in RGB color space
                const dist = Math.sqrt(
                    Math.pow(r - bgR, 2) +
                    Math.pow(g - bgG, 2) +
                    Math.pow(b - bgB, 2)
                );
                
                if (dist < threshold) {
                    // Set pixel to transparent (red=bgR, green=bgG, blue=bgB, alpha=0)
                    // We can fade the alpha near the edge for a smoother look
                    let newAlpha = 0;
                    if (dist > threshold - 5) {
                        // Anti-aliasing edge blend
                        const ratio = (dist - (threshold - 5)) / 5;
                        newAlpha = Math.round(ratio * a);
                    }
                    
                    const newHex = (((bgR << 24) | (bgG << 16) | (bgB << 8) | newAlpha) >>> 0);
                    image.setPixelColor(newHex, x, y);
                }
            }
        }
        
        await image.write('d:/Emergescale/assets/laptop_mockup.png');
        console.log('Background transparency applied successfully!');
    } catch (err) {
        console.error('Error processing image:', err);
    }
}

main();
