"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { ChevronDown, ExternalLink, Mail, Instagram, Twitter, Github, Linkedin } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import PressGallery from "@/components/press-gallery"
import SmoothScroll from "@/components/smooth-scroll"

const CLOUDINARY_CLOUD_NAME = "dibufe126"
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}`

const Noise = ({
  patternSize = 250,
  patternScaleX = 1,
  patternScaleY = 1,
  patternRefreshInterval = 2,
  patternAlpha = 15,
}) => {
  const grainRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = grainRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let frame = 0
    let animationId: number
    const canvasSize = 1024

    const resize = () => {
      if (!canvas) return
      canvas.width = canvasSize
      canvas.height = canvasSize

      canvas.style.width = "100vw"
      canvas.style.height = "100vh"
    }

    const drawGrain = () => {
      const imageData = ctx.createImageData(canvasSize, canvasSize)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255
        data[i] = value
        data[i + 1] = value
        data[i + 2] = value
        data[i + 3] = patternAlpha
      }

      ctx.putImageData(imageData, 0, 0)
    }

    const loop = () => {
      if (frame % patternRefreshInterval === 0) {
        drawGrain()
      }
      frame++
      animationId = window.requestAnimationFrame(loop)
    }

    window.addEventListener("resize", resize)
    resize()
    loop()

    return () => {
      window.removeEventListener("resize", resize)
      window.cancelAnimationFrame(animationId)
    }
  }, [patternSize, patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha])

  return (
    <canvas
      ref={grainRef}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        imageRendering: "pixelated",
      }}
    />
  )
}

export default function Home() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [sphereRotation, setSphereRotation] = useState({ x: 0, y: 0 })
  const [autoRotate, setAutoRotate] = useState(true)
  const [hoveredLetter, setHoveredLetter] = useState<string | null>(null)
  const sphereRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const previousMousePosition = useRef({ x: 0, y: 0 })
  const projectRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const rotatingTexts = ["DIGITAL_ARTIST", "CREATIVE_CODER", "ELECTRONIC_MUSICIAN", "GENERATIVE_ART", "AUDIO_VISUAL"]

  const projects = [
    {
      id: "001",
      code: "PRJ_001",
      title: "SCENES",
      category: "AUDIO_VISUAL",
      year: "2024",
      image: `${CLOUDINARY_BASE_URL}/image/upload/q_auto,f_auto/SCENES_dzxose`,
      video: `${CLOUDINARY_BASE_URL}/video/upload/q_auto,f_auto/real_friends.mp4`,
      description:
        "An immersive audio-visual experience exploring fragmented memories and digital landscapes through generative visuals and electronic soundscapes.",
      tech: ["TOUCHDESIGNER", "ABLETON", "GLSL"],
      link: "https://soundoffractures.com/scenes",
      bgColor: "bg-amber-900",
      additionalImages: [
        `${CLOUDINARY_BASE_URL}/image/upload/q_auto,f_auto/SCENES_dzxose`,
        `${CLOUDINARY_BASE_URL}/image/upload/q_auto,f_auto/SCENES_dzxose`,
      ],
    },
    {
      id: "002",
      code: "PRJ_002",
      title: "I_WANNA_GET_BACK",
      category: "MUSIC_VIDEO",
      year: "2024",
      image: `${CLOUDINARY_BASE_URL}/image/upload/q_auto,f_auto/Untitled_design_8_rs4rce`,
      video: `${CLOUDINARY_BASE_URL}/video/upload/q_auto,f_auto/real_friends.mp4`,
      description:
        "A nostalgic journey through corrupted digital memories, exploring themes of loss and longing in the digital age.",
      tech: ["PREMIERE", "AFTER_EFFECTS", "ANALOG_GLITCH"],
      link: "https://soundoffractures.com/i-wanna-get-back",
      bgColor: "bg-blue-900",
      additionalImages: [
        `${CLOUDINARY_BASE_URL}/image/upload/q_auto,f_auto/Untitled_design_8_rs4rce`,
        `${CLOUDINARY_BASE_URL}/image/upload/q_auto,f_auto/Untitled_design_8_rs4rce`,
      ],
    },
    {
      id: "003",
      code: "PRJ_003",
      title: "REAL_FRIENDS_ARCHIVE",
      category: "INTERACTIVE",
      year: "2023",
      image: `${CLOUDINARY_BASE_URL}/image/upload/q_auto,f_auto/Screenshot_2025-11-06_at_09.54.51_m0kiiy`,
      video: `${CLOUDINARY_BASE_URL}/video/upload/q_auto,f_auto/real_friends.mp4`,
      description:
        "An interactive archive exploring digital relationships and authentic connections in virtual spaces.",
      tech: ["REACT", "THREE.JS", "WEB_AUDIO_API"],
      link: "https://soundoffractures.com/real-friends-archive",
      bgColor: "bg-slate-800",
      additionalImages: [
        `${CLOUDINARY_BASE_URL}/image/upload/q_auto,f_auto/Screenshot_2025-11-06_at_09.54.51_m0kiiy`,
        `${CLOUDINARY_BASE_URL}/image/upload/q_auto,f_auto/Screenshot_2025-11-06_at_09.54.51_m0kiiy`,
      ],
    },
    {
      id: "004",
      code: "PRJ_004",
      title: "NETWORK_ARCHIVES",
      category: "DATA_ART",
      year: "2023",
      image: `${CLOUDINARY_BASE_URL}/image/upload/q_auto,f_auto/Network_Archives_zqsdzt`,
      video: `${CLOUDINARY_BASE_URL}/video/upload/q_auto,f_auto/real_friends.mp4`,
      description:
        "Data visualization of lost digital networks and forgotten online communities, preserved as interactive art.",
      tech: ["D3.JS", "NODE.JS", "WEBSOCKETS"],
      link: "https://soundoffractures.com/network-archives",
      bgColor: "bg-emerald-900",
      additionalImages: [
        `${CLOUDINARY_BASE_URL}/image/upload/q_auto,f_auto/Network_Archives_zqsdzt`,
        `${CLOUDINARY_BASE_URL}/image/upload/q_auto,f_auto/Network_Archives_zqsdzt`,
      ],
    },
    {
      id: "005",
      code: "PRJ_005",
      title: "SCENES_ZUNE",
      category: "NOSTALGIA_TECH",
      year: "2023",
      image: `${CLOUDINARY_BASE_URL}/image/upload/q_auto,f_auto/SCENES_Archive_yppge4`,
      video: `${CLOUDINARY_BASE_URL}/video/upload/q_auto,f_auto/real_friends.mp4`,
      description:
        "Reimagining Microsoft Zune's aesthetic as an audio-visual performance platform for contemporary electronic music.",
      tech: ["MAX_MSP", "JITTER", "ZUNE_SDK"],
      link: "https://soundoffractures.com/scenes-zune",
      bgColor: "bg-purple-900",
      additionalImages: [
        `${CLOUDINARY_BASE_URL}/image/upload/q_auto,f_auto/SCENES_Archive_yppge4`,
        `${CLOUDINARY_BASE_URL}/image/upload/q_auto,f_auto/SCENES_Archive_yppge4`,
      ],
    },
    {
      id: "006",
      code: "PRJ_006",
      title: "SCENES_PROMPTS",
      category: "AI_COLLABORATION",
      year: "2024",
      image: `${CLOUDINARY_BASE_URL}/image/upload/q_auto,f_auto/SCENES-_Prompts_to_Reflect_iksoxs`,
      video: `${CLOUDINARY_BASE_URL}/video/upload/q_auto,f_auto/real_friends.mp4`,
      description:
        "AI-assisted reflections on memory, identity, and digital consciousness through prompted visual narratives.",
      tech: ["STABLE_DIFFUSION", "GPT", "P5.JS"],
      link: "https://soundoffractures.com/scenes-prompts",
      bgColor: "bg-rose-900",
      additionalImages: [
        `${CLOUDINARY_BASE_URL}/image/upload/q_auto,f_auto/SCENES-_Prompts_to_Reflect_iksoxs`,
        `${CLOUDINARY_BASE_URL}/image/upload/q_auto,f_auto/SCENES-_Prompts_to_Reflect_iksoxs`,
      ],
    },
  ]

  // Project section component with parallax effect
  const ProjectSection = ({ project, index, projects, onProjectClick, selectedProject }: { project: any; index: number; projects: any[]; onProjectClick: (project: any) => void; selectedProject: any }) => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start end", "end start"],
    })

    // Parallax transforms for different images - different speeds create depth
    const mainImageY = useTransform(scrollYProgress, [0, 1], [0, -100])
    const additionalImageY1 = useTransform(scrollYProgress, [0, 1], [0, -60])
    const additionalImageY2 = useTransform(scrollYProgress, [0, 1], [0, -80])

    return (
      <div
        ref={(el) => {
          projectRefs.current[project.id] = el
          sectionRef.current = el
        }}
        className={`min-h-screen border-t border-gray-900 ${
          selectedProject?.id === project.id ? "bg-gray-950" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <div className="sticky top-20">
                <div className="text-xs tracking-widest text-gray-600 mb-2">{project.code}</div>
                <h2 className="text-2xl md:text-4xl tracking-tight mb-4">{project.title}</h2>
                <div className="text-xs tracking-widest text-gray-600 mb-6">
                  {project.category} // {project.year}
                </div>

                <p className="text-sm leading-relaxed mb-8 text-gray-400">{project.description}</p>

                <div className="mb-8">
                  <div className="text-xs tracking-widest text-gray-600 mb-3">TECH_STACK</div>
                  <div className="space-y-1">
                    {project.tech.map((tech: string) => (
                      <div key={tech} className="text-xs tracking-wider">
                        <span className="text-green-500">$</span> {tech}
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={project.link}
                  className="inline-flex items-center text-xs tracking-widest hover:text-green-500 transition-colors"
                >
                  VIEW_PROJECT <ExternalLink className="ml-2" size={14} />
                </a>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="relative h-[60vh] mb-8 overflow-hidden border border-gray-900">
                <motion.img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  style={{ y: mainImageY }}
                />
                <div className="absolute top-4 right-4 text-xs tracking-wider bg-black bg-opacity-70 px-3 py-1 z-10">
                  IMG_001
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.additionalImages.map((img: string, imgIndex: number) => {
                  const imageY = imgIndex % 2 === 0 ? additionalImageY1 : additionalImageY2
                  return (
                    <div key={imgIndex} className="relative h-64 overflow-hidden border border-gray-900">
                      <motion.img
                        src={img || "/placeholder.svg"}
                        alt={`${project.title} ${imgIndex + 2}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        style={{ y: imageY }}
                      />
                      <div className="absolute top-4 right-4 text-xs tracking-wider bg-black bg-opacity-70 px-3 py-1 z-10">
                        IMG_{String(imgIndex + 2).padStart(3, "0")}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-16 pt-8 border-t border-gray-900">
            <button
              onClick={() => {
                const prevIndex = index === 0 ? projects.length - 1 : index - 1
                onProjectClick(projects[prevIndex])
              }}
              className="text-xs tracking-widest hover:text-green-500 transition-colors cursor-pointer"
            >
              ← PREV_PROJECT
            </button>

            <div className="text-xs tracking-wider text-gray-600">
              {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </div>

            <button
              onClick={() => {
                const nextIndex = (index + 1) % projects.length
                onProjectClick(projects[nextIndex])
              }}
              className="text-xs tracking-widest hover:text-green-500 transition-colors cursor-pointer"
            >
              NEXT_PROJECT →
            </button>
          </div>
        </div>
      </div>
    )
  }

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000)
  }, [])

  useEffect(() => {
    if (autoRotate && !isDragging.current) {
      const interval = setInterval(() => {
        setSphereRotation((prev) => ({
          x: prev.x,
          y: prev.y + 0.5,
        }))
      }, 30)
      return () => clearInterval(interval)
    }
  }, [autoRotate])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      if (isDragging.current) {
        const deltaX = e.clientX - previousMousePosition.current.x
        const deltaY = e.clientY - previousMousePosition.current.y

        setSphereRotation((prev) => ({
          x: prev.x + deltaY * 0.5,
          y: prev.y + deltaX * 0.5,
        }))

        previousMousePosition.current = { x: e.clientX, y: e.clientY }
      }
    }

    const handleMouseUp = () => {
      isDragging.current = false
      setAutoRotate(true)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    previousMousePosition.current = { x: e.clientX, y: e.clientY }
    setAutoRotate(false)
  }

  const calculateSpherePosition = (index: number, total: number) => {
    const phi = Math.acos(-1 + (2 * index) / total)
    const theta = Math.sqrt(total * Math.PI) * phi

    const x = Math.cos(theta) * Math.sin(phi) * 250
    const y = Math.sin(theta) * Math.sin(phi) * 250
    const z = Math.cos(phi) * 250

    const rotX = (sphereRotation.x * Math.PI) / 180
    const rotY = (sphereRotation.y * Math.PI) / 180

    const x1 = x * Math.cos(rotY) - z * Math.sin(rotY)
    const z1 = x * Math.sin(rotY) + z * Math.cos(rotY)

    const y1 = y * Math.cos(rotX) - z1 * Math.sin(rotX)
    const z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX)

    return { x: x1, y: y1, z: z2 }
  }

  const handleProjectClick = (project: any) => {
    setSelectedProject(project)
    setTimeout(() => {
      projectRefs.current[project.id]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }, 100)
  }

  const renderAnimatedTitle = (text: string) => {
    return text.split("").map((letter, index) => {
      if (letter === " ") {
        return <span key={index}>&nbsp;</span>
      }
      return (
        <span
          key={index}
          className={`inline-block transition-all duration-200 cursor-pointer ${
            hoveredLetter === `${text}-${index}` ? "transform -translate-y-2 text-green-500" : ""
          }`}
          onMouseEnter={() => setHoveredLetter(`${text}-${index}`)}
          onMouseLeave={() => setHoveredLetter(null)}
        >
          {letter}
        </span>
      )
    })
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-green-500 font-mono text-sm">
          <div className="mb-2">INITIALIZING_SYSTEM...</div>
          <div className="flex space-x-1">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-4 bg-green-500 opacity-20 animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-gray-300 font-mono overflow-x-hidden cursor-crosshair">
      <SmoothScroll />

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 50,
          opacity: 0.15,
          mixBlendMode: "screen",
        }}
      >
        <Noise patternSize={250} patternScaleX={1} patternScaleY={1} patternRefreshInterval={2} patternAlpha={60} />
      </div>

      <header className="fixed top-0 left-0 right-0 z-30 p-6 md:p-8 mix-blend-difference">
        <nav className="flex justify-between items-center">
          <div className="text-xs tracking-widest">
            <span className="text-green-500">TERMINAL_27://</span>SOF
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative w-8 h-8 flex flex-col justify-center items-center group"
          >
            <span
              className={`block w-6 h-px bg-gray-300 transform transition-all ${isMenuOpen ? "rotate-45 translate-y-1" : ""}`}
            />
            <span className={`block w-6 h-px bg-gray-300 mt-1.5 transition-all ${isMenuOpen ? "opacity-0" : ""}`} />
            <span
              className={`block w-6 h-px bg-gray-300 mt-1.5 transform transition-all ${isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
            />
          </button>
        </nav>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black z-40 flex items-center justify-center">
          <div className="text-center">
            <div className="space-y-6">
              {["WORKS", "ABOUT", "CONTACT", "ARCHIVE"].map((item, index) => (
                <div
                  key={item}
                  className="text-2xl md:text-4xl lg:text-7xl tracking-widest hover:text-green-500 transition-colors cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video className="absolute top-0 left-0 w-full h-full object-cover z-0" autoPlay loop muted playsInline>
          <source
            src="https://res.cloudinary.com/dibufe126/video/upload/q_auto,f_auto,w_1920/real_friends.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-black/30 z-10" />

        <div className="relative z-20 text-center px-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-2 text-white drop-shadow-lg">
            {renderAnimatedTitle("SOUND OF FRACTURES")}
          </h1>

          <div className="h-12 md:h-16 flex items-center justify-center mb-12 perspective-1000">
            <div
              className="relative preserve-3d"
              style={{
                transformStyle: "preserve-3d",
                animation: "rotateY 15s linear infinite",
                width: "300px",
                height: "48px",
              }}
            >
              {rotatingTexts.map((text, index) => {
                const angle = (360 / rotatingTexts.length) * index
                const translateZ = 120

                return (
                  <div
                    key={index}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(${translateZ}px)`,
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <p className="text-sm md:text-lg tracking-widest font-light text-green-400 drop-shadow-lg">
                      <span className="inline-block animate-pulse">{">"}</span> {text}
                      <span className="animate-pulse">_</span>
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex items-center justify-center space-x-8 text-xs tracking-widest">
            <span className="hover:text-green-400 transition-colors cursor-pointer text-white drop-shadow">
              ENTER_VOID
            </span>
            <span className="text-gray-400">//</span>
            <span className="hover:text-green-400 transition-colors cursor-pointer text-white drop-shadow">
              VIEW_ARCHIVE
            </span>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-300 animate-bounce z-20">
          <ChevronDown size={20} />
        </div>

        <div className="absolute bottom-8 left-8 text-xs tracking-wider text-gray-400 z-20">
          <div>X: {String(mousePosition.x).padStart(4, "0")}</div>
          <div>Y: {String(mousePosition.y).padStart(4, "0")}</div>
        </div>

        <div className="absolute bottom-8 right-8 text-xs tracking-wider text-gray-400 z-20">
          <div>
            SYS_STATUS: <span className="text-green-400">ONLINE</span>
          </div>
          <div>FPS: 60.00</div>
        </div>
      </section>

      <section className="relative min-h-screen py-20 px-6 md:px-12 flex items-center justify-center bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-16 text-center relative z-10">
            <div className="text-xs tracking-widest text-gray-600 mb-2">SECTION_01</div>
            <h2 className="text-3xl md:text-5xl tracking-tight mb-4">SELECTED_WORKS</h2>
            <div className="max-w-xs mx-auto h-px bg-gray-800" />
          </div>

          <div
            className="relative h-[600px] flex items-center justify-center cursor-move"
            onMouseDown={handleMouseDown}
            ref={sphereRef}
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <div className="text-center">
                <div className="text-xs text-gray-600 tracking-wider mb-2">DRAG_TO_ROTATE</div>
                <div className="text-xs text-gray-600 tracking-wider">CLICK_TO_EXPLORE</div>
              </div>
            </div>

            {selectedProject && (
              <div className="absolute top-0 right-0 text-xs text-green-500 tracking-wider z-10">
                VIEWING: {selectedProject.code}
              </div>
            )}

            <div className="relative preserve-3d" style={{ transformStyle: "preserve-3d" }}>
              {projects.map((project, index) => {
                const position = calculateSpherePosition(index, projects.length)
                const scale = (position.z + 300) / 600
                const opacity = (position.z + 300) / 600
                const isSelected = selectedProject?.id === project.id

                return (
                  <div
                    key={project.id}
                    className="absolute transform-gpu transition-all duration-200"
                    style={{
                      transform: `translate3d(${position.x}px, ${position.y}px, ${position.z}px) scale(${scale})`,
                      opacity: opacity * 0.9 + 0.1,
                      zIndex: Math.floor(position.z + 300),
                    }}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleProjectClick(project)
                    }}
                  >
                    <div
                      className={`relative group cursor-pointer transition-all ${
                        hoveredProject === project.id || isSelected ? "scale-110" : ""
                      }`}
                    >
                      <div
                        className={`relative w-32 h-32 md:w-40 md:h-40 overflow-hidden border ${
                          isSelected ? "border-green-500" : "border-gray-800"
                        } bg-black`}
                      >
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className={`w-full h-full object-cover transition-all duration-300 ${
                            hoveredProject === project.id || isSelected ? "scale-110 filter-none" : "grayscale"
                          }`}
                        />

                        {(hoveredProject === project.id || isSelected) && (
                          <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-xs text-green-500 tracking-wider mb-1">{project.code}</div>
                              <div className="text-xs tracking-wider">{project.title}</div>
                              <ChevronDown className="mx-auto mt-2" size={16} />
                            </div>
                          </div>
                        )}
                      </div>

                      <div
                        className={`absolute -top-2 -left-2 text-xs font-bold ${
                          isSelected ? "text-green-500" : "text-gray-600"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="absolute bottom-0 right-0 text-xs text-gray-600 tracking-wider">
              ROTATION: X:{Math.round(sphereRotation.x)}° Y:{Math.round(sphereRotation.y)}°
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        {projects.map((project, index) => (
          <ProjectSection
            key={project.id}
            project={project}
            index={index}
            projects={projects}
            selectedProject={selectedProject}
            onProjectClick={handleProjectClick}
          />
        ))}
      </section>

      <PressGallery />

      <footer className="relative border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-xs tracking-widest text-gray-600 mb-4">CONTACT</div>
              <div className="space-y-2 text-xs">
                <div className="hover:text-green-500 transition-colors cursor-pointer">
                  <Mail className="inline mr-2" size={12} />
                  hello@soundoffractures.com
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs tracking-widest text-gray-600 mb-4">SOCIAL</div>
              <div className="flex space-x-4">
                <Instagram className="hover:text-green-500 transition-colors cursor-pointer" size={16} />
                <Twitter className="hover:text-green-500 transition-colors cursor-pointer" size={16} />
                <Github className="hover:text-green-500 transition-colors cursor-pointer" size={16} />
                <Linkedin className="hover:text-green-500 transition-colors cursor-pointer" size={16} />
              </div>
            </div>

            <div>
              <div className="text-xs tracking-widest text-gray-600 mb-4">STATUS</div>
              <div className="text-xs">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                ACCEPTING_COMMISSIONS
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-900 text-xs text-gray-600">
            <div>© 2025 SOUND_OF_FRACTURES // ALL_RIGHTS_RESERVED</div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        @keyframes rotateY {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
      `}</style>
    </div>
  )
}
