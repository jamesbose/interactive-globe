import { useState, useEffect, useRef } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GlobeScene } from './components/GlobeScene'
import { MonitoringSection } from './components/MonitoringSection'

interface StatItem {
  value: string
  subtitle: string
  badge: string
}

interface CountryStats {
  population: StatItem
  area: StatItem
  gdp: StatItem
  timezone: StatItem
  name: string
  capital: string
  language: string
}

const STATS_DATA: Record<'usa' | 'india', CountryStats> = {
  usa: {
    name: "United States of America",
    capital: "Washington, D.C.",
    language: "English (De Facto)",
    population: {
      value: "336.8 Million",
      subtitle: "3rd largest population globally, highly urbanized and diverse.",
      badge: "High Density",
    },
    area: {
      value: "9.83M km²",
      subtitle: "4th largest sovereign landmass, spanning diverse climates.",
      badge: "Continental",
    },
    gdp: {
      value: "$27.36 Trillion",
      subtitle: "Leading nominal GDP, absolute global economic powerhouse.",
      badge: "Global Leader",
    },
    timezone: {
      value: "6 Main Zones",
      subtitle: "Spanning across UTC-5 (EST) to UTC-8 (PST) in mainland.",
      badge: "Multi-timezone",
    }
  },
  india: {
    name: "Republic of India",
    capital: "New Delhi",
    language: "Hindi & English",
    population: {
      value: "1.43 Billion",
      subtitle: "Most populous nation on Earth, young demographic profile.",
      badge: "Demographic Dividend",
    },
    area: {
      value: "3.28M km²",
      subtitle: "7th largest landmass, bounded by the Himalayas and Indian Ocean.",
      badge: "Subcontinental",
    },
    gdp: {
      value: "$3.57 Trillion",
      subtitle: "Fastest-growing major economy, 5th largest nominal GDP globally.",
      badge: "Emerging Giant",
    },
    timezone: {
      value: "1 Unified Zone",
      subtitle: "Single standard time: Indian Standard Time (UTC+5:30).",
      badge: "Unified Standard",
    }
  }
}

function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [target, setTarget] = useState<'usa' | 'india'>('usa')
  const [animate, setAnimate] = useState(true)

  // Trigger a soft fade transition on stat change
  useEffect(() => {
    setAnimate(false)
    const timeout = setTimeout(() => setAnimate(true), 150)
    return () => clearTimeout(timeout)
  }, [target])

  const stats = STATS_DATA[target]
  const isUsa = target === 'usa'

  // Dynamic Theme Colors to contrast beautifully with #062D77
  const hoverBorderColor = isUsa ? 'hover:border-[#0055D2]/50' : 'hover:border-emerald-400/50'
  const textGlow = isUsa ? 'drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]' : 'drop-shadow-[0_0_10px_rgba(52,211,153,0.2)]'

  return (
    <div 
      ref={scrollContainerRef} 
      className="relative h-screen w-full font-sans text-slate-100 bg-[#062D77] overflow-y-auto overflow-x-hidden selection:bg-[#0055D2]/30 selection:text-white scroll-smooth"
    >
      
      {/* Main Container */}
      <div className="relative z-10 flex flex-col min-h-screen justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Centered App Header & Toggle */}
        <header className="flex flex-col items-center justify-center text-center pb-6 mb-8 gap-4">
          <h1 className="text-4xl font-extrabold text-white tracking-tight select-none">
            Real World Impact
          </h1>
          
          <div className="flex justify-center w-full mt-2">
            <Tabs defaultValue="usa" value={target} onValueChange={(val) => setTarget(val as 'usa' | 'india')}>
              <TabsList className="bg-white border-none p-1 rounded-full shadow-xl h-auto flex gap-1">
                <TabsTrigger 
                  value="usa" 
                  className="rounded-full px-6 py-2.5 transition-all text-xs font-bold tracking-wider uppercase bg-transparent text-[#0055D2] data-[state=active]:bg-[#0055D2] data-[state=active]:text-white shadow-none data-[state=active]:shadow-md"
                >
                  🇺🇸 United States
                </TabsTrigger>
                <TabsTrigger 
                  value="india" 
                  className="rounded-full px-6 py-2.5 transition-all text-xs font-bold tracking-wider uppercase bg-transparent text-[#0055D2] data-[state=active]:bg-[#0055D2] data-[state=active]:text-white shadow-none data-[state=active]:shadow-md"
                >
                  🇮🇳 India
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </header>

        {/* 3-Column Layout Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-grow">
          
          {/* COLUMN 1: LEFT SIDE STATISTICS (2 Rows) */}
          <section className="lg:col-span-3 flex flex-col gap-6 order-2 lg:order-1">
            
            {/* Stat Box 1: Population */}
            <div className={`group relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 ${hoverBorderColor} rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-1 shadow-lg`}>
              <div className={`transition-all duration-300 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
                <h3 className={`text-2xl sm:text-3xl font-extrabold text-white tracking-tight ${textGlow}`}>
                  {stats.population.value}
                </h3>
                <p className="text-white/80 text-xs mt-2 font-medium leading-relaxed">
                  {stats.population.subtitle}
                </p>
              </div>
            </div>

            {/* Stat Box 2: Land Area */}
            <div className={`group relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 ${hoverBorderColor} rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-1 shadow-lg`}>
              <div className={`transition-all duration-300 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
                <h3 className={`text-2xl sm:text-3xl font-extrabold text-white tracking-tight ${textGlow}`}>
                  {stats.area.value}
                </h3>
                <p className="text-white/80 text-xs mt-2 font-medium leading-relaxed">
                  {stats.area.subtitle}
                </p>
              </div>
            </div>

          </section>

          {/* COLUMN 2: CENTER GLOBE (Completely Clean Globe) */}
          <section className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2">
            <div className="relative w-full aspect-square max-w-[480px] lg:max-w-none h-[350px] sm:h-[450px] lg:h-[500px] xl:h-[550px] overflow-hidden bg-transparent">
              <GlobeScene target={target} />
            </div>
          </section>

          {/* COLUMN 3: RIGHT SIDE STATISTICS (2 Rows) */}
          <section className="lg:col-span-3 flex flex-col gap-6 order-3">
            
            {/* Stat Box 3: GDP */}
            <div className={`group relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 ${hoverBorderColor} rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-1 shadow-lg`}>
              <div className={`transition-all duration-300 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
                <h3 className={`text-2xl sm:text-3xl font-extrabold text-white tracking-tight ${textGlow}`}>
                  {stats.gdp.value}
                </h3>
                <p className="text-white/80 text-xs mt-2 font-medium leading-relaxed">
                  {stats.gdp.subtitle}
                </p>
              </div>
            </div>

            {/* Stat Box 4: Timezones */}
            <div className={`group relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 ${hoverBorderColor} rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-1 shadow-lg`}>
              <div className={`transition-all duration-300 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
                <h3 className={`text-2xl sm:text-3xl font-extrabold text-white tracking-tight ${textGlow}`}>
                  {stats.timezone.value}
                </h3>
                <p className="text-white/80 text-xs mt-2 font-medium leading-relaxed">
                  {stats.timezone.subtitle}
                </p>
              </div>
            </div>

          </section>

        </main>

        {/* Padding spacer to align with clean design layout */}
        <div className="pb-8" />
        
      </div>

      {/* Dynamic Monitoring Transition Section */}
      <MonitoringSection scrollContainerRef={scrollContainerRef} />
    </div>
  )
}

export default App
