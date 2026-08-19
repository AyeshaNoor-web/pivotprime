"use client";

import { useState, useEffect, useRef } from "react";
import { METRICS } from "@/content/homepage";
import CountUp from "@/components/CountUp";

export default function ResultsGraphic() {
  const [activeMetric, setActiveMetric] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeMetricsList = METRICS.filter((m) => m.figure !== null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const segments = [
    { label: "Execution", value: 53, angle: 0 },
    { label: "Waste Reduction", value: 62, angle: 72 },
    { label: "Retention", value: 16, angle: 144 },
    { label: "Profit Growth", value: 27, angle: 216 },
    { label: "Transaction Speed", value: 67, angle: 288 },
  ];

  // Silky smooth auto-timer
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % segments.length);
    }, 4000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
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

          {/* SVG Donut Graphic with Silky Rotating Glow Arc */}
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center my-2 select-none">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
              {/* Background Track with 5 Segment Dividers */}
              <circle
                cx="50"
                cy="50"
                r="38"
                className="stroke-white/15"
                strokeWidth="7"
                strokeDasharray="45 3"
                fill="transparent"
              />

              {/* Smoothly Rotating Active Neon Indicator Arc */}
              <g
                className="transition-transform duration-700 ease-out origin-center"
                style={{
                  transform: `rotate(${activeMetric * 72}deg)`,
                  transformOrigin: "50px 50px",
                }}
              >
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  className="stroke-neon drop-shadow-[0_0_12px_rgba(0,215,109,0.6)]"
                  strokeWidth="11"
                  strokeDasharray="45 194"
                  strokeLinecap="round"
                  fill="transparent"
                />
              </g>
            </svg>

            {/* Smooth Cross-Fading Center Metric Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              {activeMetricsList.map((metric, idx) => (
                <div
                  key={metric.label}
                  className={`absolute inset-0 flex flex-col items-center justify-center text-center p-6 transition-all duration-700 ease-out ${
                    activeMetric === idx
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 translate-y-2 pointer-events-none"
                  }`}
                >
                  <span className="text-4xl sm:text-5xl font-extrabold text-neon tracking-tight">
                    +{metric.figure}%
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white/90 max-w-[160px] mt-2 leading-snug">
                    {metric.label}
                  </span>
                </div>
              ))}
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

          {/* One-Line Respective Explanation Container with Absolute Cross-Fade */}
          <div className="mt-8 pt-6 border-t border-white/15 w-full relative h-12 flex items-center justify-center">
            {activeMetricsList.map((metric, idx) => (
              <p
                key={metric.label}
                className={`absolute inset-x-0 mx-auto text-sm sm:text-base text-white/90 font-medium leading-relaxed max-w-xl transition-all duration-700 ease-out ${
                  activeMetric === idx
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3 pointer-events-none"
                }`}
              >
                {metric.context}
              </p>
            ))}
          </div>
        </div>

        {/* Crawlable fallback markup ensuring figures and copy exist in static HTML */}
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
