/**
 * Utility functions for analyzing SVG colors and determining appropriate backgrounds
 */

// Common dark colors that indicate the SVG needs a light background
const DARK_COLORS = [
  '#000000', '#000', 'black',
  '#004932', // Udima green
  '#006A4E', // CAMC dark green
  '#009597', // CAMC teal
  '#ED1B2F', // CAMC red
];

// Colors that can work on both light and dark backgrounds
const NEUTRAL_COLORS = [
  '#9CBD39', // CAMC light green
  '#6F6E6E', // Gray
];

/**
 * Checks if a hex color is considered dark
 * @param color - Hex color string
 * @returns boolean indicating if color is dark
 */
function isColorDark(color: string): boolean {
  // Remove # if present
  const hex = color.replace('#', '');
  
  // Handle 3-digit hex
  const fullHex = hex.length === 3 
    ? hex.split('').map(char => char + char).join('')
    : hex;
  
  // Convert to RGB
  const r = parseInt(fullHex.substr(0, 2), 16);
  const g = parseInt(fullHex.substr(2, 2), 16);
  const b = parseInt(fullHex.substr(4, 2), 16);
  
  // Calculate luminance (0.299*R + 0.587*G + 0.114*B)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
  
  // Consider colors with luminance < 128 as dark
  return luminance < 128;
}

/**
 * Analyzes SVG content to determine if it contains predominantly dark colors
 * @param svgUrl - URL or path to the SVG file
 * @returns Promise<boolean> - true if SVG is dark and needs light background
 */
export async function analyzeProjectImage(imagePath: string): Promise<boolean> {
  try {
    // If it's not an SVG, return false (use default background)
    if (!imagePath.endsWith('.svg')) {
      return false;
    }

    // Check against known dark color patterns for project images
    // Based on the project images we've seen:
    
    // Udima - dark green
    if (imagePath.includes('udima')) {
      return true;
    }
    
    // Agorapay - black
    if (imagePath.includes('agorapay')) {
      return true;
    }
    
    // CAMC - mixed but has dark elements
    if (imagePath.includes('camc')) {
      return true;
    }
    
    // Buscorepuestos - appears to be an image embedded in SVG
    if (imagePath.includes('buscorepuestos')) {
      return false; // Keep current background for image content
    }
    
    // Dollar - has white text/symbols, works well with current gradient
    if (imagePath.includes('dollar')) {
      return false;
    }
    
    // For unknown SVGs, try to fetch and analyze
    if (typeof window !== 'undefined') {
      try {
        const response = await fetch(imagePath);
        const svgContent = await response.text();
        
        // Look for fill attributes with dark colors
        const fillMatches = svgContent.match(/fill="([^"]+)"/g) || [];
        let darkColorCount = 0;
        let totalColorCount = 0;
        
        fillMatches.forEach(match => {
          const color = match.match(/fill="([^"]+)"/)?.[1];
          if (color && color !== 'none' && color !== 'transparent') {
            totalColorCount++;
            
            // Check if it's a known dark color
            if (DARK_COLORS.includes(color.toLowerCase())) {
              darkColorCount++;
            }
            // Check if it's a hex color and calculate if it's dark
            else if (color.startsWith('#') && isColorDark(color)) {
              darkColorCount++;
            }
            // Check for RGB values (basic check)
            else if (color.startsWith('rgb')) {
              // Simple heuristic: if it contains low values, it's likely dark
              if (color.includes('0,') || color.includes('0)') || color.includes(' 0')) {
                darkColorCount++;
              }
            }
          }
        });
        
        // If more than 50% of colors are dark, return true
        return totalColorCount > 0 && (darkColorCount / totalColorCount) > 0.5;
      } catch (error) {
        console.warn('Failed to analyze SVG:', error);
      }
    }
    
    // Default fallback
    return false;
  } catch (error) {
    console.error('Error analyzing project image:', error);
    return false;
  }
}

/**
 * Get appropriate background class based on image analysis
 * @param imagePath - Path to the image
 * @returns Promise<string> - CSS class names for background
 */
export async function getImageBackgroundClass(imagePath: string): Promise<string> {
  const needsLightBackground = await analyzeProjectImage(imagePath);
  
  if (needsLightBackground) {
    return 'bg-white/90';
  }
  
  // Keep the current gradient background for light images
  return '';
}
