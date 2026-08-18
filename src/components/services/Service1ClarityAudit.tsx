"use client";

import { useState } from "react";
import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/flags";
import { JOURNEY_CTA, WHATSAPP_CTA } from "@/content/cta";
import { CLARITY_AUDIT } from "@/content/services-detail";
import { CopyList, CopyProse } from "./SpecCopyBlocks";

export default function Service1ClarityAudit() {
  const [mapState, setMapState] = useState<0 | 1>(0); // 0 = Messy, 1 = Clean

  const MESSY = [
    { x: 4, y: 18, t: "Enquiry" },
    { x: 26, y: 64, t: "Quote" },
    { x: 14, y: 6, t: "Approval", dead: true },
    { x: 48, y: 34, t: "Onboard" },
    { x: 38, y: 80, t: "Rework", dead: true },
    { x: 68, y: 14, t: "Deliver" },
    { x: 82, y: 62, t: "Invoice" },
  ];
  const CLEAN = [
    { x: 2, y: 42, t: "Enquiry" },
    { x: 18, y: 42, t: "Quote" },
    { x: 34, y: 42, t: "Approval" },
    { x: 50, y: 42, t: "Onboard" },
    { x: 66, y: 42, t: "Deliver" },
    { x: 82, y: 42, t: "Invoice" },
  ];
  
  const MESSY_LINKS = [[0, 1], [1, 2], [2, 1], [1, 3], [3, 4], [4, 3], [3, 5], [5, 6], [4, 6]];
  const CLEAN_LINKS = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]];

  const set = mapState ? CLEAN : MESSY;
  const links = mapState ? CLEAN_LINKS : MESSY_LINKS;
  const maxNodes = Math.max(MESSY.length, CLEAN.length);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <header className="bg-[#013325] text-white relative overflow-hidden py-16 md:py-24">
        {/* Pattern Background */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:28px_28px]" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="block font-sans font-semibold text-[10.5px] tracking-[0.24em] uppercase text-[#00d76d] mb-4">
            Service one
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mt-4 mb-6 max-w-2xl font-sans text-white">
            Operational <span className="text-[#00d76d]">Clarity Audit.</span>
          </h1>
          <p className="text-[#bfd8cd] text-lg max-w-2xl">
            A structured diagnosis of what is actually limiting the business, and a prioritised plan for fixing it.
          </p>
          
          <div className="flex flex-wrap items-baseline gap-6 mt-8 pt-6 border-t border-white/20">
            <b className="font-sans font-bold text-2xl text-[#00d76d] tracking-tight">From AED 15,000</b>
            <span className="text-sm text-[#8fb3a4]">Typically 12 to 20 working days</span>
          </div>
          <p className="text-[14.5px] text-[#a9c8ba] mt-4 max-w-2xl">
            Scope depends on the size of the business, how many functions are in review, and how many people we interview.
          </p>
          <div className="mt-8">
            <a href={WHATSAPP_URL} className="inline-flex items-center px-6 py-3 font-semibold text-[15px] bg-[#00d76d] text-[#013325] rounded-full hover:bg-white hover:-translate-y-0.5 transition-all">
              {WHATSAPP_CTA.label}
            </a>
          </div>
        </div>
      </header>

      {/* Stage / Map Section */}
      <section className="bg-[#f7f9f8] py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <span className="block font-sans font-semibold text-[10.5px] tracking-[0.24em] uppercase text-[#009f50]">
              The deliverable, in one picture
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-[#0c1a15]">
              How the work runs today, <span className="text-[#009f50]">and what it becomes.</span>
            </h2>
            <p className="text-[#5e6f68] mt-3">
              Every audit produces an as-is versus to-be map. Press the toggle to see the difference we are looking for.
            </p>
          </div>

          <div className="bg-white border border-[#e3eae6] rounded-xl p-6 md:p-8 overflow-hidden shadow-sm">
            <div className="inline-flex bg-[#f7f9f8] border border-[#e3eae6] rounded-full p-1 gap-1 mb-6">
              <button
                onClick={() => setMapState(0)}
                className={`px-4 py-2 font-semibold text-[13px] rounded-full transition-colors ${
                  mapState === 0 ? "bg-[#013325] text-white" : "text-[#5e6f68] hover:bg-[#e3eae6]"
                }`}
              >
                As it runs today
              </button>
              <button
                onClick={() => setMapState(1)}
                className={`px-4 py-2 font-semibold text-[13px] rounded-full transition-colors ${
                  mapState === 1 ? "bg-[#013325] text-white" : "text-[#5e6f68] hover:bg-[#e3eae6]"
                }`}
              >
                After the audit
              </button>
            </div>

            <div className="relative h-[240px] md:h-[340px] w-full">
              <svg viewBox="0 0 900 240" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
                {links.map(([a, b], idx) => {
                  const A = set[a];
                  const B = set[b];
                  if (!A || !B) return null;
                  const x1 = (A.x / 100) * 900 + 37;
                  const y1 = (A.y / 100) * 240 + 17;
                  const x2 = (B.x / 100) * 900 + 37;
                  const y2 = (B.y / 100) * 240 + 17;
                  const mx = (x1 + x2) / 2;
                  const bend = mapState ? 0 : 38;
                  const warn = !mapState && a > b;

                  return (
                    <path
                      key={idx}
                      d={`M${x1},${y1} Q${mx},${(y1 + y2) / 2 - bend} ${x2},${y2}`}
                      fill="none"
                      stroke={warn ? "#e0a08c" : "#c8d9d0"}
                      strokeWidth="1.6"
                      strokeDasharray={warn ? "4 4" : "none"}
                      className="transition-all duration-700 ease-in-out"
                    />
                  );
                })}
              </svg>

              {Array.from({ length: maxNodes }).map((_, i) => {
                const s = set[i];
                if (!s) {
                  return (
                    <div
                      key={i}
                      className="absolute w-[74px] h-[34px] rounded-lg bg-[#f7f9f8] border border-[#e3eae6] flex items-center justify-center font-sans font-semibold text-[10.5px] text-[#013325] opacity-0 transition-all duration-700 ease-in-out pointer-events-none"
                      style={{ left: "90%", top: "42%", transform: "translate(-50%, -50%)" }}
                    />
                  );
                }
                const isDead = "dead" in s ? (s as { dead?: boolean }).dead : false;
                return (
                  <div
                    key={i}
                    className={`absolute w-[74px] h-[34px] rounded-lg border flex items-center justify-center font-sans font-semibold text-[10.5px] transition-all duration-700 ease-in-out z-10
                      ${isDead ? "bg-[#fdf1ee] border-[#e8c4ba] text-[#9c4f3a]" : "bg-[#f7f9f8] border-[#e3eae6] text-[#013325]"}
                    `}
                    style={{ left: `${s.x}%`, top: `${s.y}%`, transform: "translate(-50%, -50%)" }}
                  >
                    {s.t}
                  </div>
                );
              })}
            </div>
            
            {/* Both captions render, with the inactive one hidden, so neither
                half of the before-and-after is missing from the served HTML.
                Same treatment as the seat panels on the fractional page. */}
            <p className="text-[14px] text-[#5e6f68] mt-6 min-h-[44px] max-w-2xl">
              <span hidden={mapState !== 0}>
                {"Seven steps, four handoffs that double back, and two that nobody owns. This is what most businesses look like when you actually map them rather than describe them."}
              </span>
              <span hidden={mapState !== 1}>
                {"Six steps, one direction, every one owned. Same business, same people. What changed is that the work now only moves forwards, and the two steps that existed to fix earlier mistakes are gone."}
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Columns Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          <div>
            <div className="font-sans font-semibold text-[10.5px] tracking-[0.2em] uppercase text-[#af8943] mb-4">
              What we look at
            </div>
            <ul className="space-y-3">
              {[
                "The commercial model, pricing, and margin by product, client or service",
                "The P&L, cost structure, working capital and how reliably cash is collected",
                "How work actually flows day to day, and where it stalls or reverses",
                "Which decisions route through the founder, and which genuinely need to",
                "Roles, ownership and accountability, and where they are unclear",
                "Where automation would remove real cost, and where it would add a tool"
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
              What you get
            </div>
            <ul className="space-y-3">
              {[
                "An as-is versus to-be map of how work runs today and what changes",
                "A findings report with every gap ranked by risk and by effort",
                "A prioritised roadmap: what to fix now, what can wait",
                "A baseline set of measurements to judge the improvements against",
                "A costed view of what to fix internally and what needs outside capacity",
                "An executive summary written for owners and investors"
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
        </div>
      </section>

      {/* How we do it / What happens after */}
      <section className="bg-[#f7f9f8] py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
            <div>
              <div className="font-sans font-semibold text-[10.5px] tracking-[0.2em] uppercase text-[#af8943] mb-4">
                How we do it
              </div>
              <p className="text-[#0c1a15] mb-4">
                One-to-one interviews with the people doing the work, not only the leadership team. Private conversations surface what people will not say in a room.
              </p>
              <p className="text-[#0c1a15]">
                Process mapping end to end, then a facilitated workshop per function where the team walks the process on screen and stress tests it together. The findings are owned rather than imposed.
              </p>
            </div>
            <div className="bg-[#fdf9f2] border-l-[3px] border-[#af8943] rounded-r-xl p-6 md:p-8">
              <h3 className="font-sans font-bold text-lg text-[#0c1a15] mb-2">What happens after</h3>
              <p className="text-[#6b5a3c] text-[15.5px]">
                The audit ends with a decision, not a filing cabinet. Some clients take the roadmap and execute it themselves, and that is a legitimate outcome. Most ask us to run some or all of it. We will tell you plainly which of those the findings actually justify.
              </p>
            </div>
          </div>

          <div className="bg-[#02291e] text-white rounded-xl p-8 md:p-12 mt-10">
            <span className="block font-sans font-semibold text-[10.5px] tracking-[0.24em] uppercase text-[#00d76d] mb-4">
              Start here
            </span>
            <h3 className="text-2xl md:text-3xl font-bold mt-3 mb-3 max-w-lg text-white">
              Almost every engagement begins with the audit.
            </h3>
            <p className="text-[#bfd8cd] mb-8">
              We will not commit to owning outcomes in a business we have not properly diagnosed.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={WHATSAPP_URL} className="inline-flex items-center px-6 py-3 font-semibold text-[15px] bg-[#00d76d] text-[#013325] rounded-full hover:bg-white hover:-translate-y-0.5 transition-all">
                {WHATSAPP_CTA.label}
              </a>
              <Link href={JOURNEY_CTA.href} className="inline-flex items-center px-6 py-3 font-semibold text-[15px] bg-transparent text-white border border-white/30 rounded-full hover:border-white transition-colors">
                {JOURNEY_CTA.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Spec 4.1, restored. The designed page carried the headline sections but
          compressed most of the copy beneath them: the argument for the audit,
          four of the seven things it looks at, four of the six deliverables, the
          workshop method, what happens afterwards, and the standalone pricing
          and margin engagement. Copy generated directly from docs/spec.md rather
          than transcribed. See docs/PENDING-COPY.md. */}
      <section className="bg-white py-16 md:py-24">
        <div className="px-4 sm:px-6 lg:px-8">
          <CopyProse heading={CLARITY_AUDIT.whyHeading} paragraphs={CLARITY_AUDIT.why} />
        </div>
      </section>

      <section className="bg-[#f7f9f8] py-16 md:py-24">
        <div className="px-4 sm:px-6 lg:px-8 space-y-16">
          <CopyList heading={CLARITY_AUDIT.lookHeading} items={CLARITY_AUDIT.look} />
          <CopyProse heading={CLARITY_AUDIT.howHeading} paragraphs={CLARITY_AUDIT.how} />
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="px-4 sm:px-6 lg:px-8 space-y-16">
          <CopyList heading={CLARITY_AUDIT.getHeading} items={CLARITY_AUDIT.get} />
          <CopyProse heading={CLARITY_AUDIT.afterHeading} paragraphs={CLARITY_AUDIT.after} />
        </div>
      </section>

      <section className="bg-[#f7f9f8] py-16 md:py-24">
        <div className="px-4 sm:px-6 lg:px-8">
          <CopyProse heading={CLARITY_AUDIT.pricingHeading} paragraphs={CLARITY_AUDIT.pricing} />
          <p className="mx-auto mt-8 max-w-3xl text-sm leading-relaxed text-[#5e6f68]">
            {CLARITY_AUDIT.scopeLine}
          </p>
        </div>
      </section>

    </div>
  );
}
