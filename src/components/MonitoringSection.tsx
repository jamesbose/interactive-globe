"use client";

import React, { useRef, useState, useEffect } from 'react'
import { ArrowLeft, Bell, Heart, Clipboard, Plus, Search, Laptop, Activity } from 'lucide-react'

interface MonitoringSectionProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>
}

export function MonitoringSection({ scrollContainerRef }: MonitoringSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isResolved, setIsResolved] = useState(false)

  // Track scroll progress within the sticky section wrapper
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !scrollContainerRef.current) return
      
      const container = scrollContainerRef.current
      const wrapper = containerRef.current
      
      const containerScrollTop = container.scrollTop
      const wrapperOffsetTop = wrapper.offsetTop
      const wrapperHeight = wrapper.offsetHeight
      const containerHeight = container.clientHeight
      
      // Calculate start and end scroll boundaries
      const startScroll = wrapperOffsetTop
      const endScroll = wrapperOffsetTop + wrapperHeight - containerHeight
      
      if (containerScrollTop <= startScroll) {
        setIsResolved(false)
      } else if (containerScrollTop >= endScroll) {
        setIsResolved(true)
      } else {
        const progress = (containerScrollTop - startScroll) / (endScroll - startScroll)
        
        // Threshold to switch active view state
        if (progress > 0.45) {
          setIsResolved(true)
        } else {
          setIsResolved(false)
        }
      }
    }

    // Attach scroll listener to the specific outer scroll container of the app
    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener('scroll', handleScroll)
      }
    }
  }, [scrollContainerRef])

  // Click handler to transition to the "With Dozee" state
  const handleResolveClick = () => {
    if (!scrollContainerRef.current || !containerRef.current) return
    const container = scrollContainerRef.current
    const wrapper = containerRef.current
    const containerHeight = container.clientHeight
    const targetScroll = wrapper.offsetTop + wrapper.offsetHeight - containerHeight
    
    container.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    })
    setIsResolved(true)
  }

  // Click handler to transition back to the "The Monitoring Gap" state
  const handleBackClick = () => {
    if (!scrollContainerRef.current || !containerRef.current) return
    const container = scrollContainerRef.current
    const wrapper = containerRef.current
    const targetScroll = wrapper.offsetTop
    
    container.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    })
    setIsResolved(false)
  }

  // Use boolean triggered class states to handle CSS transition cross-fade when scroll pins
  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[180vh] bg-transparent"
    >
      {/* Sticky container matching screen height */}
      <div className="sticky top-0 h-screen w-full overflow-hidden transition-colors duration-1000 ease-out-expo flex items-center justify-center">
        
        {/* ========================================================================= */}
        {/* VIEW 1: THE MONITORING GAP                                                 */}
        {/* ========================================================================= */}
        <div 
          className={`absolute inset-0 w-full h-full flex flex-col justify-between py-12 px-6 sm:px-12 bg-[#062D77] transition-all duration-700 ease-in-out ${
            isResolved ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 z-10 scale-100'
          }`}
        >
          {/* Concentric dotted background radar rings */}
          <div className="absolute inset-0 overflow-hidden flex items-center justify-center pointer-events-none">
            <svg className="w-[120%] h-[120%] opacity-[0.07] text-white animate-spin-slow" viewBox="0 0 1000 1000" fill="none">
              <circle cx="500" cy="500" r="150" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 10" strokeLinecap="round" />
              <circle cx="500" cy="500" r="280" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 12" strokeLinecap="round" />
              <circle cx="500" cy="500" r="420" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 14" strokeLinecap="round" />
              <circle cx="500" cy="500" r="560" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 16" strokeLinecap="round" />
            </svg>
          </div>

          {/* Top Title & Interactive Button */}
          <div className="relative z-10 text-center flex flex-col items-center gap-4">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight select-none">
              The Monitoring Gap
            </h2>
            <button 
              onClick={handleResolveClick}
              className="mt-2 bg-white text-[#0055D2] px-8 py-3 rounded-full font-bold text-sm sm:text-base hover:bg-slate-100 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_30px_-5px_rgba(0,85,210,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Check How Dozee Can Resolve It
            </button>
          </div>

          {/* Main Grid: Card & The Results */}
          <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-center my-auto">
            
            {/* Left Card: Graph */}
            <div className="lg:col-span-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-full">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white/60 font-bold uppercase tracking-wider text-xs sm:text-sm">Risk</span>
              </div>
              
              {/* SVG Graphic Risk Chart */}
              <div className="relative w-full h-[220px] sm:h-[260px] bg-slate-900/20 rounded-xl overflow-hidden p-2">
                <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="50" y1="180" x2="480" y2="180" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <line x1="50" y1="20" x2="50" y2="180" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  
                  {/* Safe Range Horizontal Line */}
                  <line x1="50" y1="120" x2="480" y2="120" stroke="#F97316" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
                  <text x="410" y="135" fill="rgba(255,255,255,0.4)" fontSize="9" fontWeight="bold" letterSpacing="0.05em">Safe Range</text>

                  {/* Danger Zone Shading (gradient red) */}
                  <defs>
                    <linearGradient id="dangerGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#EF4444" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="curveGlow" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="50%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#EF4444" />
                    </linearGradient>
                  </defs>
                  <rect x="50" y="20" width="430" height="100" fill="url(#dangerGradient)" />

                  {/* Dotted White Risk Line (Path matching screenshots) */}
                  <path 
                    d="M 70,140 C 110,140 130,50 150,50 C 170,50 190,110 210,110 C 230,110 240,160 260,160 C 280,160 300,110 320,110 C 330,110 340,140 350,140 C 370,140 380,65 410,65 C 430,65 430,115 440,115"
                    fill="none"
                    stroke="url(#curveGlow)"
                    strokeWidth="3.5"
                    strokeDasharray="5 5"
                    className="drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                  />

                  {/* Pulsating Indicator Circles for Spot Checks (Green) */}
                  {/* 6 AM Spot Check */}
                  <circle cx="70" cy="140" r="10" fill="rgba(16,185,129,0.2)" className="animate-pulse" />
                  <circle cx="70" cy="140" r="6" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
                  
                  {/* 12 PM Spot Check */}
                  <circle cx="210" cy="110" r="10" fill="rgba(16,185,129,0.2)" className="animate-pulse" />
                  <circle cx="210" cy="110" r="6" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
                  
                  {/* 6 PM Spot Check */}
                  <circle cx="350" cy="140" r="10" fill="rgba(16,185,129,0.2)" className="animate-pulse" />
                  <circle cx="350" cy="140" r="6" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />

                  {/* 10 PM Code Blue (Red Indicator Ring) */}
                  <circle cx="440" cy="115" r="15" fill="none" stroke="#EF4444" strokeWidth="3" className="animate-ping" />
                  <circle cx="440" cy="115" r="9" fill="#0055D2" stroke="#EF4444" strokeWidth="3.5" />
                  <circle cx="440" cy="115" r="3" fill="#FFFFFF" />
                  
                  {/* Code Blue Label */}
                  <text x="420" y="142" fill="#EF4444" fontSize="10" fontWeight="900" className="animate-pulse">Code Blue</text>

                  {/* Time Labels on X-axis */}
                  <text x="60" y="195" fill="rgba(255,255,255,0.6)" fontSize="9" fontWeight="bold">6 AM</text>
                  <text x="200" y="195" fill="rgba(255,255,255,0.6)" fontSize="9" fontWeight="bold">12 PM</text>
                  <text x="340" y="195" fill="rgba(255,255,255,0.6)" fontSize="9" fontWeight="bold">6 PM</text>
                  <text x="425" y="195" fill="rgba(255,255,255,0.6)" fontSize="9" fontWeight="bold">10 PM</text>
                </svg>
              </div>
            </div>

            {/* Right Card: The Results List */}
            <div className="lg:col-span-4 flex flex-col justify-center items-start lg:pl-6 text-left">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#00E5A3] tracking-tight mb-6">
                The Results:
              </h3>
              <ul className="space-y-4 text-white text-base sm:text-lg font-medium leading-snug">
                {[
                  "Readmissions & Code Blues",
                  "Falls & Pressure Ulcers",
                  "ER Transfers",
                  "Adds to Completely Avoidable Cost",
                  "Disability & Loss of Lives"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-[#EF4444] text-xs sm:text-sm mt-1.5 flex-shrink-0">▶</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom Row: 3 Core Challenges */}
          <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-t border-white/10 pt-8 mt-4">
            
            {/* Challenge 1 */}
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-md">
                <div className="relative flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                  <span className="absolute w-4 h-0.5 bg-red-500 rotate-12" />
                </div>
              </div>
              <h4 className="text-white text-base sm:text-lg font-semibold tracking-wide">
                Vitals Check Every 4-6 Hours
              </h4>
            </div>

            {/* Challenge 2 */}
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-md">
                <div className="relative flex items-center justify-center">
                  <Clipboard className="w-6 h-6 text-white" />
                  <span className="absolute text-[8px] font-black text-red-500 bottom-1">✕</span>
                </div>
              </div>
              <h4 className="text-white text-base sm:text-lg font-semibold tracking-wide">
                Manual Spot Checks
              </h4>
            </div>

            {/* Challenge 3 */}
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-md">
                <div className="relative flex items-center justify-center">
                  <Plus className="w-6 h-6 text-red-500 animate-pulse" />
                </div>
              </div>
              <h4 className="text-white text-base sm:text-lg font-semibold tracking-wide">
                Reactive Escalations
              </h4>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 2: WITH DOZEE                                                         */}
        {/* ========================================================================= */}
        <div 
          className={`absolute inset-0 w-full h-full flex flex-col justify-between py-12 px-6 sm:px-12 bg-gradient-to-br from-[#EAF2FF] via-[#F4F8FF] to-white transition-all duration-700 ease-in-out ${
            isResolved ? 'opacity-100 z-10 scale-100' : 'opacity-0 pointer-events-none scale-105'
          }`}
        >
          {/* Top-Left Back Navigation */}
          <button 
            onClick={handleBackClick}
            className="absolute top-10 left-6 sm:left-12 text-[#0055D2] hover:text-[#062D77] font-semibold text-sm sm:text-base flex items-center gap-2 transition-colors cursor-pointer group z-20"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            <span>Go back</span>
          </button>

          {/* Concentric dotted background radar rings (light variant) */}
          <div className="absolute inset-0 overflow-hidden flex items-center justify-center pointer-events-none">
            <svg className="w-[120%] h-[120%] opacity-[0.05] text-[#0055D2] animate-spin-slow" viewBox="0 0 1000 1000" fill="none">
              <circle cx="500" cy="500" r="150" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 10" strokeLinecap="round" />
              <circle cx="500" cy="500" r="280" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 12" strokeLinecap="round" />
              <circle cx="500" cy="500" r="420" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 14" strokeLinecap="round" />
              <circle cx="500" cy="500" r="560" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 16" strokeLinecap="round" />
            </svg>
          </div>

          {/* Top Title & Interactive Button */}
          <div className="relative z-10 text-center flex flex-col items-center gap-4">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#062D77] tracking-tight select-none">
              With Dozee
            </h2>
            <button 
              className="mt-2 bg-[#0055D2] text-white px-8 py-3 rounded-full font-bold text-sm sm:text-base hover:bg-[#0044B0] shadow-[0_10px_25px_-5px_rgba(0,85,210,0.3)] hover:shadow-[0_15px_35px_-5px_rgba(0,85,210,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Schedule a Demo
            </button>
          </div>

          {/* Main Grid: Pod, Card & The Results */}
          <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-center my-auto">
            
            {/* Left: 3D Floating White Dozee Pod (Column span 3) */}
            <div className="lg:col-span-3 flex justify-center items-center">
              <div className="relative w-44 h-44 rounded-full bg-gradient-to-tr from-slate-200 via-white to-white flex items-center justify-center shadow-[0_20px_50px_rgba(0,85,210,0.15),_0_0_40px_rgba(0,85,210,0.1)] border border-white transform hover:scale-105 transition-transform duration-500 ease-out-expo">
                {/* Inner shadow overlay for 3D curved sphere look */}
                <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-white/80 via-transparent to-black/10 pointer-events-none" />
                
                {/* Embedded Dozee Logo Branding */}
                <div className="flex flex-col items-center justify-center select-none">
                  <div className="w-12 h-12 rounded-full bg-[#0055D2] flex items-center justify-center shadow-inner">
                    <span className="text-white font-extrabold text-2xl font-sans italic translate-y-[-1px]">d</span>
                  </div>
                  <span className="text-[#0055D2] font-black text-xs tracking-[0.25em] mt-1.5 uppercase">dozee</span>
                </div>

                {/* Soft pulse ring surrounding the pod */}
                <div className="absolute inset-0 rounded-full border-2 border-[#0055D2]/25 animate-ping-slow pointer-events-none" />
              </div>
            </div>

            {/* Center Card: Stabilized Graph (Column span 6) */}
            <div className="lg:col-span-6 bg-gradient-to-br from-[#0052CC] to-[#002D77] rounded-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,82,204,0.25)] border border-white/10 w-full text-white">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white/60 font-bold uppercase tracking-wider text-xs sm:text-sm">Risk</span>
              </div>
              
              {/* SVG Graphic Stabilized Chart */}
              <div className="relative w-full h-[220px] sm:h-[260px] bg-black/10 rounded-xl overflow-hidden p-2">
                <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="50" y1="180" x2="480" y2="180" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <line x1="50" y1="20" x2="50" y2="180" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  
                  {/* Safe Range Line */}
                  <line x1="50" y1="120" x2="480" y2="120" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                  <text x="410" y="135" fill="rgba(255,255,255,0.4)" fontSize="9" fontWeight="bold" letterSpacing="0.05em">Safe Range</text>

                  {/* Faint Dotted Background Reference (The Gap Curve) */}
                  <path 
                    d="M 70,140 C 110,140 130,50 150,50 C 170,50 190,110 210,110 C 230,110 240,160 260,160 C 280,160 300,110 320,110 C 330,110 340,140 350,140 C 370,140 380,65 410,65 C 430,65 430,115 440,115"
                    fill="none"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />

                  {/* Continuous Stabilized Cyan Line */}
                  <path 
                    d="M 70,140 C 110,140 130,85 150,85 C 170,85 190,110 210,110 C 230,110 250,130 270,130 C 290,130 310,110 330,110 C 340,110 350,118 360,118 C 380,118 410,105 440,105"
                    fill="none"
                    stroke="#00E5A3"
                    strokeWidth="3.5"
                    className="drop-shadow-[0_0_8px_rgba(0,229,163,0.5)] animate-draw"
                  />

                  {/* Early Warning Vertical Line Indicator */}
                  <line x1="150" y1="180" x2="150" y2="85" stroke="#F59E0B" strokeWidth="2" className="animate-pulse" />
                  
                  {/* Orange bell icon container at (150, 85) */}
                  <circle cx="150" cy="85" r="14" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" className="animate-pulse shadow-md" />
                  <g transform="translate(143, 78) scale(0.6)">
                    <Bell className="w-[24px] h-[24px] text-white" />
                  </g>
                  <text x="172" y="88" fill="#F59E0B" fontSize="10" fontWeight="900" letterSpacing="0.05em">Early Warning</text>

                  {/* Orange spot checks along the curve */}
                  <circle cx="70" cy="140" r="5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1.5" />
                  <circle cx="210" cy="110" r="5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1.5" />
                  <circle cx="270" cy="130" r="5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1.5" />
                  <circle cx="330" cy="110" r="5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1.5" />
                  <circle cx="360" cy="118" r="5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1.5" />
                  <circle cx="440" cy="105" r="5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1.5" />

                  {/* Time Labels on X-axis */}
                  <text x="60" y="195" fill="rgba(255,255,255,0.6)" fontSize="9" fontWeight="bold">6 AM</text>
                  <text x="200" y="195" fill="rgba(255,255,255,0.6)" fontSize="9" fontWeight="bold">12 PM</text>
                  <text x="340" y="195" fill="rgba(255,255,255,0.6)" fontSize="9" fontWeight="bold">6 PM</text>
                  <text x="425" y="195" fill="rgba(255,255,255,0.6)" fontSize="9" fontWeight="bold">10 PM</text>
                </svg>
              </div>
            </div>

            {/* Right: The Results List (Column span 3) */}
            <div className="lg:col-span-3 flex flex-col justify-center items-start lg:pl-6 text-left">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#062D77] tracking-tight mb-6">
                The Results:
              </h3>
              <ul className="space-y-4 text-slate-700 text-base sm:text-lg font-semibold leading-snug">
                {[
                  "Proactive Care",
                  "Improved Outcomes",
                  "Cost Saving"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-[#00E5A3] text-xs sm:text-sm mt-1.5 flex-shrink-0">▶</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom Row: 3 Dozee Continuous Care Pillars */}
          <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-t border-[#0055D2]/10 pt-8 mt-4">
            
            {/* Pillar 1 */}
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#0055D2]/5 via-[#0055D2]/10 to-transparent border border-[#0055D2]/15 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <Activity className="w-6 h-6 text-[#0055D2] animate-pulse" />
              </div>
              <h4 className="text-[#062D77] text-base sm:text-lg font-semibold tracking-wide">
                Continuous Monitoring
              </h4>
            </div>

            {/* Pillar 2 */}
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#0055D2]/5 via-[#0055D2]/10 to-transparent border border-[#0055D2]/15 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <Laptop className="w-6 h-6 text-[#0055D2]" />
              </div>
              <h4 className="text-[#062D77] text-base sm:text-lg font-semibold tracking-wide">
                Continuous Analysis
              </h4>
            </div>

            {/* Pillar 3 */}
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#0055D2]/5 via-[#0055D2]/10 to-transparent border border-[#0055D2]/15 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <Search className="w-6 h-6 text-[#0055D2]" />
              </div>
              <h4 className="text-[#062D77] text-base sm:text-lg font-semibold tracking-wide">
                Continuous Triaging
              </h4>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
