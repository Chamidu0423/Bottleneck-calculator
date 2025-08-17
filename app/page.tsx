"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Cpu, Monitor, Computer, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

const hardwareData = {
  cpus: [
    // Intel 13th Gen
    { id: "i3-13100f", name: "Intel Core i3-13100F", score: 65, cores: 4, threads: 8, price: 110 },
    { id: "i5-13400f", name: "Intel Core i5-13400F", score: 88, cores: 10, threads: 16, price: 200 },
    { id: "i5-13500", name: "Intel Core i5-13500", score: 90, cores: 14, threads: 20, price: 250 },
    { id: "i5-13600k", name: "Intel Core i5-13600K", score: 92, cores: 14, threads: 20, price: 320 },
    { id: "i7-13700f", name: "Intel Core i7-13700F", score: 96, cores: 16, threads: 24, price: 380 },
    { id: "i7-13700k", name: "Intel Core i7-13700K", score: 98, cores: 16, threads: 24, price: 420 },
    { id: "i9-13900f", name: "Intel Core i9-13900F", score: 100, cores: 24, threads: 32, price: 580 },
    { id: "i9-13900k", name: "Intel Core i9-13900K", score: 102, cores: 24, threads: 32, price: 650 },

    // Intel 12th Gen
    { id: "i3-12100f", name: "Intel Core i3-12100F", score: 62, cores: 4, threads: 8, price: 90 },
    { id: "i5-12400f", name: "Intel Core i5-12400F", score: 85, cores: 6, threads: 12, price: 150 },
    { id: "i5-12600k", name: "Intel Core i5-12600K", score: 89, cores: 10, threads: 16, price: 280 },
    { id: "i7-12700k", name: "Intel Core i7-12700K", score: 95, cores: 12, threads: 20, price: 350 },
    { id: "i9-12900k", name: "Intel Core i9-12900K", score: 100, cores: 16, threads: 24, price: 550 },

    // AMD Ryzen 7000 Series
    { id: "r5-7600", name: "AMD Ryzen 5 7600", score: 86, cores: 6, threads: 12, price: 230 },
    { id: "r5-7600x", name: "AMD Ryzen 5 7600X", score: 88, cores: 6, threads: 12, price: 300 },
    { id: "r7-7700", name: "AMD Ryzen 7 7700", score: 94, cores: 8, threads: 16, price: 330 },
    { id: "r7-7700x", name: "AMD Ryzen 7 7700X", score: 96, cores: 8, threads: 16, price: 400 },
    { id: "r7-7800x3d", name: "AMD Ryzen 7 7800X3D", score: 105, cores: 8, threads: 16, price: 450 },
    { id: "r9-7900x", name: "AMD Ryzen 9 7900X", score: 98, cores: 12, threads: 24, price: 550 },
    { id: "r9-7950x", name: "AMD Ryzen 9 7950X", score: 103, cores: 16, threads: 32, price: 700 },

    // AMD Ryzen 5000 Series
    { id: "r5-5500", name: "AMD Ryzen 5 5500", score: 75, cores: 6, threads: 12, price: 160 },
    { id: "r5-5600", name: "AMD Ryzen 5 5600", score: 80, cores: 6, threads: 12, price: 180 },
    { id: "r5-5600x", name: "AMD Ryzen 5 5600X", score: 82, cores: 6, threads: 12, price: 200 },
    { id: "r7-5700x", name: "AMD Ryzen 7 5700X", score: 90, cores: 8, threads: 16, price: 300 },
    { id: "r7-5800x", name: "AMD Ryzen 7 5800X", score: 92, cores: 8, threads: 16, price: 350 },
    { id: "r7-5800x3d", name: "AMD Ryzen 7 5800X3D", score: 98, cores: 8, threads: 16, price: 400 },
    { id: "r9-5900x", name: "AMD Ryzen 9 5900X", score: 96, cores: 12, threads: 24, price: 450 },
    { id: "r9-5950x", name: "AMD Ryzen 9 5950X", score: 100, cores: 16, threads: 32, price: 650 },
  ],
  gpus: [
    // NVIDIA RTX 40 Series
    { id: "rtx-4060", name: "NVIDIA RTX 4060", score: 75, vram: 8, price: 300 },
    { id: "rtx-4060-ti", name: "NVIDIA RTX 4060 Ti", score: 80, vram: 16, price: 400 },
    { id: "rtx-4070", name: "NVIDIA RTX 4070", score: 90, vram: 12, price: 600 },
    { id: "rtx-4070-super", name: "NVIDIA RTX 4070 Super", score: 93, vram: 12, price: 650 },
    { id: "rtx-4070-ti", name: "NVIDIA RTX 4070 Ti", score: 95, vram: 12, price: 800 },
    { id: "rtx-4070-ti-super", name: "NVIDIA RTX 4070 Ti Super", score: 97, vram: 16, price: 850 },
    { id: "rtx-4080", name: "NVIDIA RTX 4080", score: 98, vram: 16, price: 1200 },
    { id: "rtx-4080-super", name: "NVIDIA RTX 4080 Super", score: 100, vram: 16, price: 1000 },
    { id: "rtx-4090", name: "NVIDIA RTX 4090", score: 110, vram: 24, price: 1600 },

    // NVIDIA RTX 30 Series
    { id: "rtx-3050", name: "NVIDIA RTX 3050", score: 60, vram: 8, price: 250 },
    { id: "rtx-3060", name: "NVIDIA RTX 3060", score: 70, vram: 12, price: 300 },
    { id: "rtx-3060-ti", name: "NVIDIA RTX 3060 Ti", score: 78, vram: 8, price: 400 },
    { id: "rtx-3070", name: "NVIDIA RTX 3070", score: 85, vram: 8, price: 500 },
    { id: "rtx-3070-ti", name: "NVIDIA RTX 3070 Ti", score: 87, vram: 8, price: 600 },
    { id: "rtx-3080", name: "NVIDIA RTX 3080", score: 92, vram: 10, price: 700 },
    { id: "rtx-3080-ti", name: "NVIDIA RTX 3080 Ti", score: 95, vram: 12, price: 1200 },
    { id: "rtx-3090", name: "NVIDIA RTX 3090", score: 100, vram: 24, price: 1500 },
    { id: "rtx-3090-ti", name: "NVIDIA RTX 3090 Ti", score: 102, vram: 24, price: 2000 },

    // AMD RX 7000 Series
    { id: "rx-7600", name: "AMD RX 7600", score: 72, vram: 8, price: 270 },
    { id: "rx-7600-xt", name: "AMD RX 7600 XT", score: 76, vram: 16, price: 330 },
    { id: "rx-7700-xt", name: "AMD RX 7700 XT", score: 82, vram: 12, price: 450 },
    { id: "rx-7800-xt", name: "AMD RX 7800 XT", score: 88, vram: 16, price: 500 },
    { id: "rx-7900-gre", name: "AMD RX 7900 GRE", score: 92, vram: 16, price: 550 },
    { id: "rx-7900-xt", name: "AMD RX 7900 XT", score: 95, vram: 20, price: 900 },
    { id: "rx-7900-xtx", name: "AMD RX 7900 XTX", score: 100, vram: 24, price: 1000 },

    // AMD RX 6000 Series
    { id: "rx-6500-xt", name: "AMD RX 6500 XT", score: 55, vram: 4, price: 200 },
    { id: "rx-6600", name: "AMD RX 6600", score: 68, vram: 8, price: 230 },
    { id: "rx-6600-xt", name: "AMD RX 6600 XT", score: 72, vram: 8, price: 280 },
    { id: "rx-6650-xt", name: "AMD RX 6650 XT", score: 74, vram: 8, price: 300 },
    { id: "rx-6700-xt", name: "AMD RX 6700 XT", score: 80, vram: 12, price: 380 },
    { id: "rx-6750-xt", name: "AMD RX 6750 XT", score: 82, vram: 12, price: 420 },
    { id: "rx-6800", name: "AMD RX 6800", score: 85, vram: 16, price: 580 },
    { id: "rx-6800-xt", name: "AMD RX 6800 XT", score: 88, vram: 16, price: 650 },
    { id: "rx-6900-xt", name: "AMD RX 6900 XT", score: 92, vram: 16, price: 1000 },
    { id: "rx-6950-xt", name: "AMD RX 6950 XT", score: 94, vram: 16, price: 1100 },

    // Intel Arc
    { id: "arc-a380", name: "Intel Arc A380", score: 50, vram: 6, price: 140 },
    { id: "arc-a750", name: "Intel Arc A750", score: 65, vram: 8, price: 250 },
    { id: "arc-a770", name: "Intel Arc A770", score: 70, vram: 16, price: 330 },
  ],
  ram: [
    // DDR4 Memory
    { id: "ddr4-8gb-2400", name: "8GB DDR4-2400", score: 50, capacity: 8, speed: 2400, price: 30 },
    { id: "ddr4-8gb-2666", name: "8GB DDR4-2666", score: 55, capacity: 8, speed: 2666, price: 35 },
    { id: "ddr4-8gb-3200", name: "8GB DDR4-3200", score: 60, capacity: 8, speed: 3200, price: 40 },
    { id: "ddr4-16gb-2400", name: "16GB DDR4-2400", score: 65, capacity: 16, speed: 2400, price: 55 },
    { id: "ddr4-16gb-2666", name: "16GB DDR4-2666", score: 68, capacity: 16, speed: 2666, price: 60 },
    { id: "ddr4-16gb-3000", name: "16GB DDR4-3000", score: 70, capacity: 16, speed: 3000, price: 65 },
    { id: "ddr4-16gb-3200", name: "16GB DDR4-3200", score: 72, capacity: 16, speed: 3200, price: 70 },
    { id: "ddr4-16gb-3600", name: "16GB DDR4-3600", score: 75, capacity: 16, speed: 3600, price: 80 },
    { id: "ddr4-16gb-4000", name: "16GB DDR4-4000", score: 78, capacity: 16, speed: 4000, price: 100 },
    { id: "ddr4-32gb-2400", name: "32GB DDR4-2400", score: 80, capacity: 32, speed: 2400, price: 110 },
    { id: "ddr4-32gb-2666", name: "32GB DDR4-2666", score: 82, capacity: 32, speed: 2666, price: 115 },
    { id: "ddr4-32gb-3000", name: "32GB DDR4-3000", score: 84, capacity: 32, speed: 3000, price: 120 },
    { id: "ddr4-32gb-3200", name: "32GB DDR4-3200", score: 85, capacity: 32, speed: 3200, price: 125 },
    { id: "ddr4-32gb-3600", name: "32GB DDR4-3600", score: 88, capacity: 32, speed: 3600, price: 140 },
    { id: "ddr4-32gb-4000", name: "32GB DDR4-4000", score: 90, capacity: 32, speed: 4000, price: 180 },
    { id: "ddr4-64gb-3200", name: "64GB DDR4-3200", score: 95, capacity: 64, speed: 3200, price: 250 },
    { id: "ddr4-64gb-3600", name: "64GB DDR4-3600", score: 97, capacity: 64, speed: 3600, price: 280 },

    // DDR5 Memory
    { id: "ddr5-8gb-4800", name: "8GB DDR5-4800", score: 70, capacity: 8, speed: 4800, price: 50 },
    { id: "ddr5-8gb-5200", name: "8GB DDR5-5200", score: 72, capacity: 8, speed: 5200, price: 55 },
    { id: "ddr5-8gb-5600", name: "8GB DDR5-5600", score: 75, capacity: 8, speed: 5600, price: 60 },
    { id: "ddr5-16gb-4800", name: "16GB DDR5-4800", score: 85, capacity: 16, speed: 4800, price: 90 },
    { id: "ddr5-16gb-5200", name: "16GB DDR5-5200", score: 87, capacity: 16, speed: 5200, price: 95 },
    { id: "ddr5-16gb-5600", name: "16GB DDR5-5600", score: 90, capacity: 16, speed: 5600, price: 100 },
    { id: "ddr5-16gb-6000", name: "16GB DDR5-6000", score: 92, capacity: 16, speed: 6000, price: 110 },
    { id: "ddr5-16gb-6400", name: "16GB DDR5-6400", score: 94, capacity: 16, speed: 6400, price: 130 },
    { id: "ddr5-16gb-7200", name: "16GB DDR5-7200", score: 96, capacity: 16, speed: 7200, price: 160 },
    { id: "ddr5-32gb-4800", name: "32GB DDR5-4800", score: 95, capacity: 32, speed: 4800, price: 180 },
    { id: "ddr5-32gb-5200", name: "32GB DDR5-5200", score: 97, capacity: 32, speed: 5200, price: 190 },
    { id: "ddr5-32gb-5600", name: "32GB DDR5-5600", score: 98, capacity: 32, speed: 5600, price: 200 },
    { id: "ddr5-32gb-6000", name: "32GB DDR5-6000", score: 100, capacity: 32, speed: 6000, price: 220 },
    { id: "ddr5-32gb-6400", name: "32GB DDR5-6400", score: 102, capacity: 32, speed: 6400, price: 250 },
    { id: "ddr5-32gb-7200", name: "32GB DDR5-7200", score: 105, capacity: 32, speed: 7200, price: 300 },
    { id: "ddr5-64gb-4800", name: "64GB DDR5-4800", score: 105, capacity: 64, speed: 4800, price: 360 },
    { id: "ddr5-64gb-5600", name: "64GB DDR5-5600", score: 108, capacity: 64, speed: 5600, price: 400 },
    { id: "ddr5-64gb-6000", name: "64GB DDR5-6400", score: 110, capacity: 64, speed: 6000, price: 440 },
    { id: "ddr5-128gb-4800", name: "128GB DDR5-4800", score: 115, capacity: 128, speed: 4800, price: 720 },
  ],
}

interface SelectedComponents {
  cpu: string
  gpu: string
  ram: string
}

interface BottleneckResult {
  cpuBottleneck: number
  gpuBottleneck: number
  ramBottleneck: number
  overallScore: number
  recommendations: string[]
}

const SpeedMeter = ({ value, size = 200 }: { value: number; size?: number }) => {
  const radius = size / 2 - 20
  const startAngle = -Math.PI * 0.8 // Start at 80% of PI for more curve
  const endAngle = Math.PI * 0.8 // End at 80% of PI for more curve
  const totalAngle = endAngle - startAngle
  const valueAngle = startAngle + (value / 100) * totalAngle

  const getPathData = (angle: number) => {
    const x = size / 2 + radius * Math.cos(angle)
    const y = size / 2 + 20 + radius * Math.sin(angle)
    return { x, y }
  }

  const startPoint = getPathData(startAngle)
  const endPoint = getPathData(endAngle)
  const valuePoint = getPathData(valueAngle)

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size / 2 + 60 }}>
      <svg width={size} height={size / 2 + 60} className="transform">
        <defs>
          <linearGradient id="speedMeterGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="33%" stopColor="#f97316" />
            <stop offset="66%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {/* Background arc with more curve */}
        <path
          d={`M ${startPoint.x} ${startPoint.y} A ${radius} ${radius} 0 1 1 ${endPoint.x} ${endPoint.y}`}
          fill="none"
          stroke="url(#backgroundGradient)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Progress arc with more curve */}
        <path
          d={`M ${startPoint.x} ${startPoint.y} A ${radius} ${radius} 0 ${value > 50 ? 1 : 0} 1 ${valuePoint.x} ${valuePoint.y}`}
          fill="none"
          stroke="url(#speedMeterGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {/* Center value */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-4xl font-thin font-[family-name:var(--font-montserrat)] text-primary">{value}%</div>
        <div className="text-sm text-muted-foreground mt-1">
          {value >= 85 ? "Excellent" : value >= 70 ? "Good" : value >= 50 ? "Fair" : "Poor"}
        </div>
      </div>
      {/* Scale markers with more curve */}
      {[0, 25, 50, 75, 100].map((mark) => {
        const angle = startAngle + (mark / 100) * totalAngle
        const x1 = size / 2 + (radius - 15) * Math.cos(angle)
        const y1 = size / 2 + 20 + (radius - 15) * Math.sin(angle)
        const x2 = size / 2 + (radius + 8) * Math.cos(angle)
        const y2 = size / 2 + 20 + (radius + 8) * Math.sin(angle)

        return (
          <svg key={mark} width={size} height={size / 2 + 60} className="absolute top-0 left-0">
            <defs>
              <linearGradient id={`markerGradient-${mark}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.8" />
                <stop offset="100%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={`url(#markerGradient-${mark})`} strokeWidth="3" />
            <text
              x={size / 2 + (radius + 20) * Math.cos(angle)}
              y={size / 2 + 20 + (radius + 20) * Math.sin(angle)}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-sm fill-muted-foreground font-medium"
            >
              {mark}
            </text>
          </svg>
        )
      })}
    </div>
  )
}

const AnimatedButton = ({
  onClick,
  disabled,
  children,
}: { onClick: () => void; disabled: boolean; children: React.ReactNode }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="font-inherit text-lg hover:bg-violet-900 text-white py-3 px-4 pl-4 flex items-center border-none rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed w-full justify-center group bg-violet-600"
    >
      <div className="svg-wrapper-1">
        <div className="svg-wrapper group-hover:animate-[fly-1_0.6s_ease-in-out_infinite_alternate]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="block transform-origin-center transition-transform duration-300 ease-in-out group-hover:translate-x-5 group-hover:rotate-45 group-hover:scale-110"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path
              fill="currentColor"
              d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
            ></path>
          </svg>
        </div>
      </div>
      <span className="block ml-1 transition-all duration-300 ease-in-out group-hover:translate-x-20">{children}</span>
      <style jsx>{`
        @keyframes fly-1 {
          from {
            transform: translateY(0.1em);
          }
          to {
            transform: translateY(-0.1em);
          }
        }
      `}</style>
    </button>
  )
}

export default function BottleneckCalculator() {
  const [selectedComponents, setSelectedComponents] = useState<SelectedComponents>({
    cpu: "",
    gpu: "",
    ram: "",
  })
  const [result, setResult] = useState<BottleneckResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const calculateBottleneck = () => {
    if (!selectedComponents.cpu || !selectedComponents.gpu || !selectedComponents.ram) return

    setIsCalculating(true)

    // Simulate API call delay
    setTimeout(() => {
      const cpu = hardwareData.cpus.find((c) => c.id === selectedComponents.cpu)!
      const gpu = hardwareData.gpus.find((g) => g.id === selectedComponents.gpu)!
      const ram = hardwareData.ram.find((r) => r.id === selectedComponents.ram)!

      // Calculate bottleneck percentages based on component balance
      const cpuGpuDiff = Math.abs(cpu.score - gpu.score)
      const cpuBottleneck = cpuGpuDiff > 15 && cpu.score < gpu.score ? cpuGpuDiff : 0
      const gpuBottleneck = cpuGpuDiff > 15 && gpu.score < cpu.score ? cpuGpuDiff : 0

      // RAM bottleneck based on capacity and speed relative to other components
      const avgComponentScore = (cpu.score + gpu.score) / 2
      const ramBottleneck = ram.score < avgComponentScore - 10 ? avgComponentScore - ram.score : 0

      const overallScore = Math.max(0, 100 - Math.max(cpuBottleneck, gpuBottleneck, ramBottleneck))

      const recommendations: string[] = []
      if (cpuBottleneck > 10)
        recommendations.push(`CPU bottleneck detected. Consider upgrading to a more powerful processor.`)
      if (gpuBottleneck > 10)
        recommendations.push(`GPU bottleneck detected. Your CPU is overpowered for this graphics card.`)
      if (ramBottleneck > 10) recommendations.push(`RAM bottleneck detected. Consider faster or more memory.`)
      if (overallScore > 85) recommendations.push(`Excellent balance! This configuration should perform very well.`)

      setResult({
        cpuBottleneck,
        gpuBottleneck,
        ramBottleneck,
        overallScore,
        recommendations,
      })
      setIsCalculating(false)
    }, 1500)
  }

  const getBottleneckColor = (percentage: number) => {
    if (percentage < 5) return "text-green-600"
    if (percentage < 15) return "text-yellow-600"
    return "text-red-600"
  }

  const getBottleneckIcon = (percentage: number) => {
    if (percentage < 5) return <CheckCircle className="h-4 w-4 text-green-600" />
    if (percentage < 15) return <AlertTriangle className="h-4 w-4 text-yellow-600" />
    return <XCircle className="h-4 w-4 text-red-600" />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Computer className="h-8 w-8 text-violet-500" />
            <div>
              <h1 className="text-3xl font-[family-name:var(--font-montserrat)] text-foreground font-thin">
                PC Bottleneck Calculator
              </h1>
              <p className="text-muted-foreground">Professional tool for PC builders and gamers</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Hardware Selection */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-[family-name:var(--font-montserrat)]">
                  <Cpu className="h-5 w-5" />
                  Select Your Components
                </CardTitle>
                <CardDescription>Choose your CPU, GPU, and RAM to analyze potential bottlenecks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* CPU Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Processor (CPU)</label>
                  <Select
                    value={selectedComponents.cpu}
                    onValueChange={(value) => setSelectedComponents((prev) => ({ ...prev, cpu: value }))}
                  >
                    <SelectTrigger className="border-violet-300 hover:border-violet-500 focus:border-violet-600">
                      <SelectValue placeholder="Select CPU" />
                    </SelectTrigger>
                    <SelectContent>
                      {hardwareData.cpus.map((cpu) => (
                        <SelectItem key={cpu.id} value={cpu.id} className="hover:bg-violet-50 focus:bg-violet-100">
                          <div className="flex justify-between items-center w-full">
                            <span>{cpu.name}</span>
                            <Badge variant="outline" className="ml-2 border-purple-500 text-purple-600">
                              {cpu.cores}C/{cpu.threads}T
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* GPU Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Graphics Card (GPU)</label>
                  <Select
                    value={selectedComponents.gpu}
                    onValueChange={(value) => setSelectedComponents((prev) => ({ ...prev, gpu: value }))}
                  >
                    <SelectTrigger className="border-violet-300 hover:border-violet-500 focus:border-violet-600">
                      <SelectValue placeholder="Select GPU" />
                    </SelectTrigger>
                    <SelectContent>
                      {hardwareData.gpus.map((gpu) => (
                        <SelectItem key={gpu.id} value={gpu.id} className="hover:bg-violet-50 focus:bg-violet-100">
                          <div className="flex justify-between items-center w-full">
                            <span>{gpu.name}</span>
                            <Badge variant="outline" className="ml-2 border-purple-500 text-purple-600">
                              {gpu.vram}GB VRAM
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* RAM Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Memory (RAM)</label>
                  <Select
                    value={selectedComponents.ram}
                    onValueChange={(value) => setSelectedComponents((prev) => ({ ...prev, ram: value }))}
                  >
                    <SelectTrigger className="border-violet-300 hover:border-violet-500 focus:border-violet-600">
                      <SelectValue placeholder="Select RAM" />
                    </SelectTrigger>
                    <SelectContent>
                      {hardwareData.ram.map((ram) => (
                        <SelectItem key={ram.id} value={ram.id} className="hover:bg-violet-50 focus:bg-violet-100">
                          <div className="flex justify-between items-center w-full">
                            <span>{ram.name}</span>
                            <Badge variant="outline" className="ml-2 border-purple-500 text-purple-600">
                              {ram.speed}MHz
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <AnimatedButton
                  onClick={calculateBottleneck}
                  disabled={
                    !selectedComponents.cpu || !selectedComponents.gpu || !selectedComponents.ram || isCalculating
                  }
                >
                  {isCalculating ? "Analyzing..." : "Calculate Bottleneck"}
                </AnimatedButton>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {result && (
              <>
                {/* Overall Score */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-[family-name:var(--font-montserrat)]">
                      Overall Performance Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center">
                      <SpeedMeter value={result.overallScore} size={280} />
                    </div>
                  </CardContent>
                </Card>

                {/* Bottleneck Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-[family-name:var(--font-montserrat)]">Bottleneck Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2">
                          {getBottleneckIcon(result.cpuBottleneck)}
                          <span className="font-medium">CPU Bottleneck</span>
                        </div>
                        <span className={`font-semibold ${getBottleneckColor(result.cpuBottleneck)}`}>
                          {result.cpuBottleneck.toFixed(1)}%
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2">
                          {getBottleneckIcon(result.gpuBottleneck)}
                          <span className="font-medium">GPU Bottleneck</span>
                        </div>
                        <span className={`font-semibold ${getBottleneckColor(result.gpuBottleneck)}`}>
                          {result.gpuBottleneck.toFixed(1)}%
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2">
                          {getBottleneckIcon(result.ramBottleneck)}
                          <span className="font-medium">RAM Bottleneck</span>
                        </div>
                        <span className={`font-semibold ${getBottleneckColor(result.ramBottleneck)}`}>
                          {result.ramBottleneck.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                {result.recommendations.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-[family-name:var(--font-montserrat)]">Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {result.recommendations.map((rec, index) => (
                        <Alert key={index}>
                          <AlertDescription>{rec}</AlertDescription>
                        </Alert>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </>
            )}

            {!result && (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  <Monitor className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select your components and click "Calculate Bottleneck" to see the analysis</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
