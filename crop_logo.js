const { Jimp } = require('jimp');

async function main() {
    try {
        const image = await Jimp.read('d:/Emergescale/assets/logo.png');
        const width = image.width;
        const height = image.height;
        console.log(`Original logo dimensions: ${width}x${height}`);
        
        let minX = width;
        let maxX = 0;
        let minY = height;
        let maxY = 0;
        
        // Scan the image to find the bounding box of the actual logo
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const pixelHex = image.getPixelColor(x, y);
                const r = (pixelHex >> 24) & 0xff;
                const g = (pixelHex >> 16) & 0xff;
                const b = (pixelHex >> 8) & 0xff;
                
                // If it is not white (threshold: any channel under 248)
                if (r < 248 || g < 248 || b < 248) {
                    if (x < minX) minX = x;
                    if (x > maxX) maxX = x;
                    if (y < minY) minY = y;
                    if (y > maxY) maxY = y;
                }
            }
        }
        
        console.log(`Bounding box: X(${minX} to ${maxX}), Y(${minY} to ${maxY})`);
        
        // Calculate center and maximum dimension of the bounding box
        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;
        const maxDim = Math.max(maxX - minX + 1, maxY - minY + 1);
        
        // Add 10px padding for safety
        const squareSize = maxDim + 20;
        
        // Calculate new minX and minY centered
        minX = Math.max(0, Math.round(centerX - squareSize / 2));
        minY = Math.max(0, Math.round(centerY - squareSize / 2));
        
        // Adjust if they exceed image boundaries
        if (minX + squareSize > width) minX = width - squareSize;
        if (minY + squareSize > height) minY = height - squareSize;
        
        console.log(`Cropping to perfect square: ${squareSize}x${squareSize} at (${minX}, ${minY})`);
        
        image.crop({ x: minX, y: minY, w: squareSize, h: squareSize });
        await image.write('d:/Emergescale/assets/logo.png');
        console.log('Logo cropped to perfect square successfully!');
    } catch (err) {
        console.error('Error processing logo:', err);
    }
}

main();
