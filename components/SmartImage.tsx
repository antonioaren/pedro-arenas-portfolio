"use client";

import { useState, useEffect } from 'react';
import { getImageBackgroundClass } from '@/lib/svgUtils';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

/**
 * SmartImage component that automatically applies appropriate background
 * based on the image content (especially for SVGs)
 */
export default function SmartImage({ 
  src, 
  alt, 
  className = "", 
  containerClassName = "" 
}: SmartImageProps) {
  const [backgroundClass, setBackgroundClass] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const analyzeImage = async () => {
      try {
        const bgClass = await getImageBackgroundClass(src);
        setBackgroundClass(bgClass);
      } catch (error) {
        console.error('Failed to analyze image:', error);
        // Default to no special background on error
        setBackgroundClass('');
      } finally {
        setIsLoading(false);
      }
    };

    analyzeImage();
  }, [src]);

  return (
    <div className={`relative ${containerClassName}`}>
      {/* Background layer */}
      {!isLoading && backgroundClass && (
        <div className={`absolute inset-0 ${backgroundClass} rounded-lg`} />
      )}
      
      {/* Image */}
      <img
        src={src}
        alt={alt}
        className={`relative z-10 ${className}`}
      />
    </div>
  );
}
