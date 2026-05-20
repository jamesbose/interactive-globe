import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GlobeScene } from './components/GlobeScene'

function App() {
  const [target, setTarget] = useState<'usa' | 'india'>('usa')

  return (
    <div className="relative min-h-screen font-sans text-slate-100 overflow-hidden bg-[#020617]">
      {/* 3D Scene */}
      <GlobeScene target={target} />

      {/* UI Overlay */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10 w-full max-w-sm flex justify-center">
        <Tabs defaultValue="usa" onValueChange={(val) => setTarget(val as 'usa' | 'india')}>
          <TabsList className="bg-slate-900/50 backdrop-blur-md border border-slate-700/50 p-1 rounded-full shadow-2xl">
            <TabsTrigger 
              value="usa" 
              className="rounded-full px-8 py-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white transition-all text-sm font-medium tracking-wide"
            >
              USA
            </TabsTrigger>
            <TabsTrigger 
              value="india" 
              className="rounded-full px-8 py-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white transition-all text-sm font-medium tracking-wide"
            >
              India
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
    </div>
  )
}

export default App
