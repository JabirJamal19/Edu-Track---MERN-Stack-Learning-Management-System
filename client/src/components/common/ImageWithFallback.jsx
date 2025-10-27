import { useState } from 'react'
import { Image as ImageIcon } from 'lucide-react'

const ImageWithFallback = ({ 
  src, 
  alt, 
  className = '', 
  fallbackSrc = null,
  objectFit = 'cover'
}) => {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleError = () => {
    setImageError(true)
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  if (imageError && !fallbackSrc) {
    return (
      <div className={`${className} bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center`}>
        <ImageIcon className="w-12 h-12 text-primary-400" />
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded"></div>
      )}
      <img
        src={imageError && fallbackSrc ? fallbackSrc : src}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        style={{ objectFit }}
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  )
}

export default ImageWithFallback
