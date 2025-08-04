"use client"

import { CldImage } from "next-cloudinary"

interface CloudinaryImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  crop?: {
    type: string
    source?: boolean
  }
  sizes?: string
}

export function CloudinaryImage({
  src,
  alt,
  width,
  height,
  className = "",
  crop = { type: "auto", source: true },
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: CloudinaryImageProps) {
  // Check if src is a Cloudinary image ID or a regular URL
  const isCloudinaryId = !src.startsWith("http") && !src.startsWith("/placeholder")

  if (!isCloudinaryId) {
    // Fallback to regular img for non-Cloudinary images
    return (
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={{ objectFit: "cover" }}
      />
    )
  }

  try {
    return (
      <CldImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        crop={crop}
        className={className}
        sizes={sizes}
        quality="auto"
        format="auto"
      />
    )
  } catch (error) {
    console.error("Cloudinary image error:", error)
    // Fallback to placeholder if Cloudinary fails
    return (
      <img
        src="/placeholder.svg"
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={{ objectFit: "cover" }}
      />
    )
  }
}
