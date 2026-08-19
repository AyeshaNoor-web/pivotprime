"use client";

import { useState, useEffect } from "react";
import CountUp from "@/components/CountUp";
import { METRICS } from "@/content/homepage";

export default function ResultsGraphic() {
  const [activeMetric, setActiveMetric] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeMetricsList = METRICS.filter((m) => m.figure !== null);

  const segments = [
    { label: "Execution", value: 53, offset: "0" },
    { label: "Waste Reduction", value: 62, offset: "-48" },
    { label: "Retention", value: 16, offset: "-96" },
    { label: "Profit Growth", value: 27, offset: "-144" },
    { label: "Transaction Speed", value: 67, offset: "-192" },
  ];

  // Auto-shift through segments every 3.5s unless hovered/interacted
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % segments.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused, segments.length]);

  return (
    <div className="mx-auto max-w-2xl">
      {/* Centered Donut & Metric Showcase Card */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="rounded-[32px] bg-forest text-white p-8 sm:p-12 text-center shadow-2xl border border-white/10 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[11px] font-sans font-bold tracking-[0.24em] uppercase text-neon">
              PERFORMANCE OVERVIEW
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
          </div>

          {/* SVG Donut Graphic */}
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center my-2">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
              {/* Background Base Ring */}
              <circle
                cx="50"
                cy="50"
                r="38"
                className="stroke-white/10"
                strokeWidth="8"
                fill="transparent"
              />
              {/* 5 Interactive & Auto-Rotating Donut Segments */}
              {segments.map((seg, idx) => (
                <circle
                  key={seg.label}
                  cx="50"
                  cy="50"
                  r="38"
                  className={`transition-all duration-500 cursor-pointer ${
                    activeMetric === idx
                      ? "stroke-neon stroke-[12px] opacity-100"
                      : idx === 2
                        ? "stroke-white/40 stroke-[8px] opacity-70 hover:stroke-white/80 hover:opacity-100"
                        : "stroke-mid stroke-[8px] opacity-70 hover:stroke-neon hover:opacity-100"
                  }`}
                  strokeDasharray="47 192"
                  strokeDashoffset={seg.offset}
                  fill="transparent"
                  onClick={() => {
                    setActiveMetric(idx);
                    setIsPaused(true);
                  }}
                />
              ))}
            </svg>

            {/* Center Focal Metric */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <span className="text-4xl sm:text-5xl font-extrabold text-neon tracking-tight">
                +<CountUp end={activeMetricsList[activeMetric]?.figure as number} />%
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white/90 max-w-[150px] mt-1.5 leading-snug">
                {activeMetricsList[activeMetric]?.label}
              </span>
            </div>
          </div>

          {/* Pill Selector Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mt-8 max-w-lg">
            {segments.map((seg, idx) => (
              <button
                key={seg.label}
                type="button"
                onClick={() => {
                  setActiveMetric(idx);
                  setIsPaused(true);
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                  activeMetric === idx
                    ? "bg-neon text-forest shadow-lg scale-105 font-bold"
                    : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
                }`}
              >
                {seg.label}
              </button>
            ))}
          </div>

          {/* One-Line Respective Explanation Container */}
          <div className="mt-8 pt-6 border-t border-white/15 w-full min-h-[48px] flex items-center justify-center">
            {activeMetricsList.map((metric, idx) => (
              <p
                key={metric.label}
                className={`text-sm sm:text-base text-white/90 font-medium leading-relaxed max-w-xl transition-all duration-500 ${
                  activeMetric === idx ? "block animate-fade-in" : "hidden"
                }`}
              >
                {metric.context}
              </p>
            ))}
          </div>
        </div>

        {/* Crawlable fallback markup to ensure all 5 figures & contexts exist in static HTML */}
        <ul className="sr-only">
          {activeMetricsList.map((metric) => (
            <li key={metric.label}>
              <span>
                &gt;<CountUp end={metric.figure as number} />&lt;
              </span>
              <span>{metric.label}</span>
              <span>{metric.context}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
