"use client";

import { useState } from "react";
import FadeUp from "@/components/FadeUp";
import CountUp from "@/components/CountUp";
import { METRICS } from "@/content/homepage";

export default function ResultsGraphic() {
  const [activeMetric, setActiveMetric] = useState(0);
  const activeMetricsList = METRICS.filter((m) => m.figure !== null);

  // Data for chart segments
  const segments = [
    { label: "Execution", value: 53 },
    { label: "Waste Reduction", value: 62 },
    { label: "Retention", value: 16 },
    { label: "Profit Growth", value: 27 },
    { label: "Transaction Speed", value: 67 },
  ];

  return (
    <div className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Visual Interactive Donut / Gauge Graphic (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 sm:p-8 rounded-[28px] bg-forest text-white shadow-xl border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          
          <div className="relative z-10 w-full flex flex-col items-center">
            <span className="text-[11px] font-sans font-bold tracking-[0.22em] uppercase text-neon mb-4">
              PERFORMANCE OVERVIEW
            </span>

            {/* SVG Ring Visualizer */}
            <div className="relative w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center my-2">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  className="stroke-white/10"
                  strokeWidth="8"
                  fill="transparent"
                />
                {/* 5 Distinct Colored Donut Segments */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  className="stroke-neon transition-all duration-500 cursor-pointer"
                  strokeWidth={activeMetric === 0 ? "11" : "8"}
                  strokeDasharray="47 192"
                  strokeDashoffset="0"
                  fill="transparent"
                  onClick={() => setActiveMetric(0)}
                />
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  className="stroke-mid transition-all duration-500 cursor-pointer"
                  strokeWidth={activeMetric === 1 ? "11" : "8"}
                  strokeDasharray="47 192"
                  strokeDashoffset="-48"
                  fill="transparent"
                  onClick={() => setActiveMetric(1)}
                />
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  className="stroke-white/60 transition-all duration-500 cursor-pointer"
                  strokeWidth={activeMetric === 2 ? "11" : "8"}
                  strokeDasharray="47 192"
                  strokeDashoffset="-96"
                  fill="transparent"
                  onClick={() => setActiveMetric(2)}
                />
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  className="stroke-neon/80 transition-all duration-500 cursor-pointer"
                  strokeWidth={activeMetric === 3 ? "11" : "8"}
                  strokeDasharray="47 192"
                  strokeDashoffset="-144"
                  fill="transparent"
                  onClick={() => setActiveMetric(3)}
                />
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  className="stroke-mid/80 transition-all duration-500 cursor-pointer"
                  strokeWidth={activeMetric === 4 ? "11" : "8"}
                  strokeDasharray="47 192"
                  strokeDashoffset="-192"
                  fill="transparent"
                  onClick={() => setActiveMetric(4)}
                />
              </svg>

              {/* Center Active Stat Counter */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <span className="text-3xl sm:text-4xl font-extrabold text-neon tracking-tight">
                  +{activeMetricsList[activeMetric]?.figure || 53}%
                </span>
                <span className="text-[11px] font-semibold text-white/80 max-w-[130px] line-clamp-2 mt-1 leading-tight">
                  {activeMetricsList[activeMetric]?.label}
                </span>
              </div>
            </div>

            {/* Interactive Segment Buttons */}
            <div className="flex flex-wrap justify-center gap-1.5 mt-4 w-full">
              {segments.map((seg, idx) => (
                <button
                  key={seg.label}
                  type="button"
                  onClick={() => setActiveMetric(idx)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all duration-200 ${
                    activeMetric === idx
                      ? "bg-neon text-forest shadow-md scale-105"
                      : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {seg.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Compact Dashboard Grid (7 cols) */}
        <div className="lg:col-span-7">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {activeMetricsList.map((metric, i) => (
              <li
                key={metric.label}
                onClick={() => setActiveMetric(i)}
                className={`frosted-card-light rounded-2xl p-5 sm:p-6 transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:shadow-lg ${
                  activeMetric === i
                    ? "border-mid shadow-md bg-forest/[0.04] ring-1 ring-mid/30"
                    : "hover:border-mid/30"
                }`}
              >
                <FadeUp>
                  <div className="flex items-baseline justify-between mb-2">
                    <div className="text-3xl sm:text-4xl font-extrabold text-mid tracking-tight">
                      <CountUp end={metric.figure as number} />
                      {metric.suffix}
                    </div>
                    <span className="text-[10px] font-bold tracking-wider text-forest/40 uppercase">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-forest mb-1 leading-snug">
                    {metric.label}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed">
                    {metric.context}
                  </p>
                </FadeUp>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
