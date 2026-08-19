"use client";

import { useState, useEffect, useRef } from "react";
import { WHATSAPP_URL } from "@/lib/flags";
import { WHATSAPP_CTA } from "@/content/cta";


export default function Service4TechBuilds() {
  const [qMode, setQMode] = useState<0 | 1>(0); // 0 = Automate everything, 1 = Fix the constraint first
  const laneRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const lane = laneRef.current;
    if (!lane) return;

    // Clean up previous elements
    const cleanup = () => {
      if (timerRef.current) clearInterval(timerRef.current);
      const dots = lane.querySelectorAll('.dot');
      dots.forEach(d => d.remove());
      const pile = lane.querySelectorAll('.pileup i');
      pile.forEach(p => p.classList.remove('opacity-100'));
    };

    cleanup();

    let piled = 0;
    const mode = qMode;
    const gateX = mode === 1 ? 0.92 : 0.62;
    const dur = mode === 1 ? 2600 : 3200;
    
    // Select pile elements inside the ref
    const pileNodes = lane.querySelectorAll('.pileup i');

    timerRef.current = setInterval(() => {
      const d = document.createElement("div");
      d.className = "dot absolute bottom-4 w-3 h-3 rounded-full bg-[#009f50]";
      d.style.left = "-14px";
      lane.appendChild(d);

      const start = performance.now();
      const move = (t: number) => {
        const p = Math.min((t - start) / dur, 1);
        const w = lane.clientWidth;
        const stopAt = gateX * w - 22;
        let x = p * (w + 20) - 14;

        if (mode === 0 && x > stopAt) {
          x = stopAt;
          d.style.backgroundColor = "#d9694a"; // stuck color
          if (!d.dataset.counted) {
            d.dataset.counted = "1";
            if (piled < 6 && pileNodes[piled]) {
              pileNodes[piled].classList.add("opacity-100");
              piled++;
            }
            d.remove();
            return;
          }
        }
        
        d.style.left = x + "px";
        if (p < 1) {
          requestAnimationFrame(move);
        } else {
          d.remove();
        }
      };
      
      requestAnimationFrame(move);
    }, 620);

    return cleanup;
  }, [qMode]);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <header className="bg-[#013325] text-white relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:28px_28px]" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-2xl font-sans text-white">
            Technology <span className="text-[#00d76d]">Builds.</span>
          </h1>
          <p className="text-[#bfd8cd] text-lg max-w-2xl">
            Software, automation and AI, built after the diagnosis rather than instead of it.
          </p>
          
          <div className="flex flex-wrap items-baseline gap-6 mt-8 pt-6 border-t border-white/20">
            <b className="font-sans font-bold text-2xl text-[#00d76d] tracking-tight">Scoped per engagement</b>
            <span className="text-sm text-[#8fb3a4]">Own it outright, or we maintain it</span>
          </div>
          <p className="text-[14.5px] text-[#a9c8ba] mt-4 max-w-2xl">
            Priced on the build itself, the systems it has to connect to, and whether you want us to run it afterwards.
          </p>
          <div className="mt-8">
            <a href={WHATSAPP_URL} className="inline-flex items-center px-6 py-3 font-semibold text-[15px] bg-[#00d76d] text-[#013325] rounded-full hover:bg-white hover:-translate-y-0.5 transition-all">
              {WHATSAPP_CTA.label}
            </a>
          </div>
        </div>
      </header>

      {/* Animation Section */}
      <section className="bg-[#013325] py-16 md:py-24 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <span className="block font-sans font-semibold text-[10.5px] tracking-[0.24em] uppercase text-[#00d76d]">
              The argument
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-white">
              We do not sprinkle AI over a business <span className="text-[#00d76d]">and call it transformation.</span>
            </h2>
            <p className="text-[#a9c8ba] mt-3">
              A business moves at the speed of its biggest constraint. Making everything else faster only builds a longer queue in front of it. So, before we build anything we find out where the business is actually losing time, margin or control, and then we build at that point.
            </p>
            <p className="text-[#a9c8ba] mt-3">
              That is the difference between technology that pays for itself and technology that becomes another subscription nobody opens.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 overflow-hidden">
            <div className="inline-flex bg-white/5 border border-white/10 rounded-full p-1 gap-1 mb-6">
              <button
                onClick={() => setQMode(0)}
                className={`px-4 py-2 font-semibold text-[13px] rounded-full transition-colors ${
                  qMode === 0 ? "bg-[#00d76d] text-[#013325]" : "text-[#a9c8ba] hover:text-white"
                }`}
              >
                Automate everything
              </button>
              <button
                onClick={() => setQMode(1)}
                className={`px-4 py-2 font-semibold text-[13px] rounded-full transition-colors ${
                  qMode === 1 ? "bg-[#00d76d] text-[#013325]" : "text-[#a9c8ba] hover:text-white"
                }`}
              >
                Fix the constraint first
              </button>
            </div>

            <div className="grid gap-3.5">
              <div 
                ref={laneRef} 
                className="relative bg-white/5 border border-white/10 rounded-xl h-[66px] overflow-hidden"
              >
                <span className="absolute left-3.5 top-2.5 font-sans font-semibold text-[10.5px] tracking-[0.14em] uppercase text-[#8fb3a4] z-10">
                  Work in progress
                </span>
                
                <div 
                  className="absolute top-0 bottom-0 w-[5px] bg-[#af8943] z-10 transition-all duration-500 ease-in-out"
                  style={{ left: qMode === 1 ? '92%' : '62%' }}
                >
                  <span className="absolute -top-0.5 left-[11px] font-sans font-semibold text-[10px] tracking-[0.1em] uppercase text-[#af8943] whitespace-nowrap">
                    {qMode === 1 ? 'Approvals, automated' : 'Approvals'}
                  </span>
                </div>

                <div 
                  className="pileup absolute bottom-3.5 flex gap-[3px] z-0 transition-all duration-500 ease-in-out"
                  style={{ left: qMode === 1 ? 'calc(92% - 78px)' : 'calc(62% - 78px)' }}
                >
                  {[...Array(6)].map((_, i) => (
                    <i key={i} className="w-[11px] h-[11px] rounded-full bg-[#d9694a] opacity-0 transition-opacity duration-300"></i>
                  ))}
                </div>
              </div>
            </div>
            
            <p className="text-[14px] text-[#a9c8ba] mt-6 min-h-[44px] max-w-2xl">
              Speed up everything except the bottleneck and the queue in front of it simply gets longer. The business feels busier and delivers exactly as much as it did before.
            </p>
          </div>
        </div>
      </section>

      {/* Columns Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          <div>
            <div className="font-sans font-semibold text-[10.5px] tracking-[0.2em] uppercase text-[#af8943] mb-4">
              What we build
            </div>
            <ul className="space-y-3">
              {[
                "Websites: design, build, maintenance and the digital estate around them",
                "CRM build and configuration, including migration from spreadsheets and inherited systems",
                "Workflow automation across sales, operations, finance and fulfilment",
                "Dashboards and management reporting, so decisions are made on numbers rather than instinct",
                "Integrations between the systems you already pay for and are not getting value from",
                "Internal tools and custom applications where nothing off the shelf fits",
                "AI agents and assistants, where they remove real cost rather than add a feature"
              ].map((item, i) => (
                <li key={i} className="flex gap-3 items-start text-[15.5px] text-[#0c1a15]">
                  <div className="w-[17px] h-[17px] rounded-full bg-[#009f50] flex-shrink-0 mt-1 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-sans font-semibold text-[10.5px] tracking-[0.2em] uppercase text-[#af8943] mb-4">
              How it runs
            </div>
            <p className="text-[#0c1a15] mb-3">
              We scope the build against a defined problem and agree what it has to change. We build it, test it with the people who will actually use it, and hand it over with documentation rather than a demo.
            </p>
            <p className="text-[#0c1a15] mb-5">
              If you want us to run and maintain it afterwards, we can. If you want to own it outright, you own it, including the code.
            </p>
            <div className="bg-[#fdf9f2] border-l-[3px] border-[#af8943] rounded-r-xl p-6 md:p-8">
              <h3 className="font-sans font-bold text-lg text-[#0c1a15] mb-2">Where this starts</h3>
              <p className="text-[#6b5a3c] text-[15.5px]">
                If you already know what you need built, we can start there. If you are not certain the technology is the actual constraint, start with an Operational Clarity Audit, and we will tell you honestly whether a build is the right answer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closer Section */}
      <section className="bg-[#f7f9f8] py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#02291e] text-white rounded-xl p-8 md:p-12">
            <span className="block font-sans font-semibold text-[10.5px] tracking-[0.24em] uppercase text-[#00d76d] mb-4">
              Bring us the problem
            </span>
            <h3 className="text-2xl md:text-3xl font-bold mt-3 mb-3 max-w-lg text-white">
              An app you want built, or a process that is eating your team.
            </h3>
            <p className="text-[#bfd8cd] mb-8">
              Either works. The only technology work we take on is the kind pointed at a real problem.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={WHATSAPP_URL} className="inline-flex items-center px-6 py-3 font-semibold text-[15px] bg-[#00d76d] text-[#013325] rounded-full hover:bg-white hover:-translate-y-0.5 transition-all">
                {WHATSAPP_CTA.label}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
