"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/dibufe126/image/upload"

const pressImages = [
  // Column 1 - 3 images
  [
    `${CLOUDINARY_BASE_URL}/Screenshot_2025-11-06_at_09.47.08_atefpj`,
    `${CLOUDINARY_BASE_URL}/Screenshot_2025-11-06_at_09.48.06_jgkupf`,
    `${CLOUDINARY_BASE_URL}/Screenshot_2025-11-06_at_09.45.18_yjou4r`,
  ],
  // Column 2 - 2 images
  [
    `${CLOUDINARY_BASE_URL}/Screenshot_2025-11-06_at_09.47.28_z6o1ea`,
    `${CLOUDINARY_BASE_URL}/Screenshot_2025-11-06_at_09.49.08_orhfc2`,
  ],
  // Column 3 - 2 images
  [
    `${CLOUDINARY_BASE_URL}/Screenshot_2025-11-06_at_09.44.56_kozqqm`,
    `${CLOUDINARY_BASE_URL}/Screenshot_2025-11-06_at_09.44.06_udlxwx`,
  ],
  // Column 4 - 2 images
  [
    `${CLOUDINARY_BASE_URL}/Screenshot_2025-11-06_at_09.43.55_m8rlv1`,
    `${CLOUDINARY_BASE_URL}/Screenshot_2025-11-06_at_10.34.47_wboy5l`,
  ],
]

const Column = ({ images, y, columnIndex }: { images: string[]; y: any; columnIndex: number }) => {
  return (
    <motion.div style={{ y }} className="flex flex-col gap-4 md:gap-6 w-1/4 min-w-[150px] md:min-w-[250px] relative">
      {images.map((src, imageIndex) => {
        console.log("[v0] Loading image:", src)
        return (
          <div
            key={imageIndex}
            className="relative overflow-hidden border border-gray-800 bg-gray-900 group cursor-pointer"
            style={{
              height: imageIndex % 2 === 0 ? "300px" : "400px",
              position: "relative",
            }}
          >
            {src ? (
              <img
                src={src}
                alt={`Press ${columnIndex + 1}-${imageIndex + 1}`}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                onError={(e) => {
                  console.error("[Press Gallery] Image failed to load:", src)
                  const target = e.target as HTMLImageElement
                  target.style.display = "none"
                }}
                onLoad={() => {
                  console.log("[Press Gallery] Image loaded successfully:", src)
                }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-xs">
                No Image
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
            <div className="absolute top-4 right-4 text-xs tracking-wider bg-black bg-opacity-70 px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
              PRESS_{String(columnIndex * 3 + imageIndex + 1).padStart(2, "0")}
            </div>
          </div>
        )
      })}
    </motion.div>
  )
}

export default function PressGallery() {
  const gallery = useRef<HTMLDivElement>(null)
  const [dimension, setDimension] = useState({ width: 0, height: 0 })

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  })

  const { height } = dimension
  const y1 = useTransform(scrollYProgress, [0, 1], [0, height * 2])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3])

  useEffect(() => {
    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener("resize", resize)
    resize()

    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <section className="relative py-20 px-6 md:px-12 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <div className="text-xs tracking-widest text-gray-600 mb-2">SECTION_03</div>
          <h2 className="text-3xl md:text-5xl tracking-tight mb-4">PRESS // MEDIA</h2>
          <div className="max-w-xs mx-auto h-px bg-gray-800" />
        </div>

        <div ref={gallery} className="relative h-[175vh]">
          <div className="flex gap-4 md:gap-6 justify-center h-full">
            <div style={{ top: "-30%" }} className="relative">
              <Column images={pressImages[0]} y={y1} columnIndex={0} />
            </div>
            <div style={{ top: "-70%" }} className="relative">
              <Column images={pressImages[1]} y={y2} columnIndex={1} />
            </div>
            <div style={{ top: "-30%" }} className="relative">
              <Column images={pressImages[2]} y={y3} columnIndex={2} />
            </div>
            <div style={{ top: "-60%" }} className="relative">
              <Column images={pressImages[3]} y={y4} columnIndex={3} />
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-xs tracking-widest text-gray-600">
            FEATURED_IN: PITCHFORK // RESIDENT_ADVISOR // MIXMAG // FACT // XLR8R
          </p>
        </div>
      </div>
    </section>
  )
}
