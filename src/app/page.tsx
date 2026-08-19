import Image from "next/image";
import Link from "next/link";
import { DIAGNOSTIC_ENABLED } from "@/lib/flags";
import { CONTACT_CTA, HERO_CTA, JOURNEY_CTA, WHATSAPP_CTA } from "@/content/cta";
import {
  ACCOUNTABLE,
  CLIENT_LOGOS,
  CLOSE,
  FOUNDER,
  HERO,
  HOW_WE_ARE_PAID,
  PATTERNS,
  PROOF,
  RESULTS,
} from "@/content/homepage";
import { SERVICES_EYEBROW, SERVICES_HEADING } from "@/content/services";
import ServiceCards from "@/components/ServiceCards";
import PatternsList from "@/components/PatternsList";
import CaseStudies from "@/components/CaseStudies";
import PersonaSwitcher from "@/components/PersonaSwitcher";
import ResultsGraphic from "@/components/ResultsGraphic";
import type { Metadata } from "next";
import { pageMetadata } from "@/content/metadata";

export const metadata: Metadata = pageMetadata("home");

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 3.1 Hero. REPLACE. Background is kept: spec says it works and it stays. */}
      <section className="relative flex min-h-[85vh] items-center px-4 pt-32 pb-20 sm:px-6 md:pt-40 md:pb-24 lg:px-8">
        {/* overflow-hidden contains the water-pan animation, which scales the
            image to 1.08. Without it the scaled image is wider than the
            viewport and the whole document scrolls sideways, at every
            breakpoint including desktop. */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/home-banner.jpg"
            alt=""
            fill
            aria-hidden="true"
            className="animate-water-pan object-cover"
            priority
          />
          <div className="absolute inset-0 bg-forest/65 backdrop-blur-[2px]" />
        </div>

        {/* Wider than the old max-w-5xl: the annotation on 3.1 asks for text to
            run as far across the screen as it reasonably can. */}
        <div className="relative z-10 mx-auto w-full max-w-6xl text-white">
          <h1 className="max-w-5xl text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-white">
            {HERO.heading}
          </h1>

          {/* Set noticeably larger than the paragraph beneath it. Spec 3.1:
              this sentence is doing the most work on the page. */}
          <p className="mt-8 max-w-4xl text-2xl leading-snug font-semibold text-white/95 sm:text-3xl md:text-4xl">
            {HERO.lead}
          </p>

          <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/85 md:text-lg">
            {HERO.body}
          </p>

          {/* No WhatsApp CTA here, deliberately. Spec 3.1: "Nobody gets in touch
              before they know what is on offer." The conversation CTAs appear
              further down once the visitor has seen the services and the proof. */}
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link
              href={HERO_CTA.href}
              className="inline-flex items-center justify-center rounded-full bg-neon px-8 py-4 text-xs font-bold tracking-wider text-forest uppercase shadow-lg transition-all duration-200 hover:bg-white hover:scale-105 focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-forest focus-visible:outline-none"
            >
              {HERO_CTA.label}
            </Link>

            {/* Visually secondary, and an in-page anchor rather than a
                navigation. Spec 3.1. */}
            <a
              href={HERO.secondaryHref}
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/[0.08] backdrop-blur-md px-8 py-4 text-xs font-bold tracking-wider text-white uppercase transition-all duration-200 hover:border-white/60 hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-neon focus-visible:outline-none"
            >
              {HERO.secondaryLabel}
            </a>
          </div>

          {/* Only rendered when the diagnostic is live: it names a four-minute
              assessment and an immediate score, neither of which stage one
              ships. */}
          {DIAGNOSTIC_ENABLED && (
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/75">
              {HERO.diagnosticExplainer}
            </p>
          )}
        </div>
      </section>

      {/* 3.2 Proof bar. MOVE: the logo rows sat buried inside a later section
          and belong directly under the hero. */}
      <section className="border-b border-neutral-100 bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mx-auto max-w-3xl text-center text-base font-medium text-neutral-600 md:text-lg">
            {PROOF.trusted}
          </p>
          <p className="mx-auto mt-3 max-w-3xl text-center text-sm text-neutral-500">
            {PROOF.featuredPrefix}
            {PROOF.publications.map((pub, i) => (
              <span key={pub.href}>
                <a
                  href={pub.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={pub.title}
                  className="font-semibold text-mid underline underline-offset-2 hover:text-forest"
                >
                  {pub.name}
                </a>
                {i === 0 ? " and " : "."}
              </span>
            ))}
          </p>
        </div>

        {/* Keeps scrolling on desktop and mobile, per spec 3.2: the movement
            holds attention and is one of the few animations doing a job.
            overflow-hidden clips the track so it cannot widen the document. */}
        <div className="mt-10 w-full overflow-hidden">
          <div className="flex w-max animate-[marquee_40s_linear_infinite] items-center motion-reduce:animate-none">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center space-x-12 px-6" aria-hidden={copy === 1}>
                {CLIENT_LOGOS.map((logo) => (
                  <Image
                    key={`${copy}-${logo.src}`}
                    src={logo.src}
                    alt={copy === 1 ? "" : logo.alt}
                    width={180}
                    height={80}
                    className="h-14 w-auto rounded-lg object-contain opacity-70 transition-opacity hover:opacity-100 md:h-16"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3.3 Results. NEW. Sits immediately under the proof bar, before the
          services: after "we build it" the visitor's next thought is "prove it".
          Figures are green and count up on scroll; labels and context are in the
          standard body colour. Spec 3.3. */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <header className="mb-12 max-w-3xl">
            <span className="block font-sans font-semibold text-xs tracking-[0.22em] uppercase text-mid mb-3">
              MEASURED IMPACT
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {RESULTS.heading}
            </h2>
            <p className="mt-4 text-lg text-neutral-600 md:text-xl">{RESULTS.standfirst}</p>
          </header>

          <ResultsGraphic />
        </div>
      </section>

      {/* 3.4 What do we actually do. NEW. The hero's secondary CTA anchors here. */}
      <section id="services" className="scroll-mt-28 bg-white px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <header className="mb-14 max-w-3xl">
            <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-mid uppercase">
              {SERVICES_EYEBROW}
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {SERVICES_HEADING}
            </h2>
          </header>

          <ServiceCards />
        </div>
      </section>

      {/* 3.5 The patterns. MOVED below the services: having just read what
          Pivot Prime sells, the visitor now recognises their own symptom and
          knows which service it points to. Spec 3.5. */}
      <section className="bg-white px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-neon uppercase">
            {PATTERNS.eyebrow}
          </p>
          <h2 className="mb-10 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {PATTERNS.heading}
          </h2>
          <PatternsList />
        </div>
      </section>

      {/* 3.6 One accountable party / Chapter 01: The Gap */}
      <section className="bg-forest px-4 py-24 text-white sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
        
        <div className="mx-auto max-w-6xl relative z-10">
          <span className="block font-sans font-semibold text-xs tracking-[0.22em] uppercase text-neon mb-4">
            CHAPTER 01: THE GAP &amp; EXECUTION
          </span>

          <h2 className="mb-8 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl max-w-4xl">
            {ACCOUNTABLE.heading}
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-12">
            {/* Left side: Body copy & Pull quote */}
            <div className="lg:col-span-6 space-y-6">
              {ACCOUNTABLE.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="leading-relaxed text-white/85 text-base md:text-lg">
                  {paragraph}
                </p>
              ))}

              <blockquote className="my-8 border-l-2 border-neon pl-6 text-lg md:text-xl leading-snug font-semibold text-white/95">
                {ACCOUNTABLE.pullQuote}
              </blockquote>

              <div className="pt-2">
                <Link
                  href={CONTACT_CTA.href}
                  className="inline-flex items-center justify-center rounded-full bg-neon px-8 py-4 text-xs font-bold tracking-wider text-forest uppercase transition-all hover:bg-white hover:scale-105 focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-forest focus-visible:outline-none"
                >
                  {ACCOUNTABLE.ctaLabel}
                  <span aria-hidden="true" className="ml-2 text-base leading-none">
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* Right side: 2x2 Glassmorphic Feature Grid + Stat Badge */}
            <div className="lg:col-span-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="glass-card-dark rounded-2xl p-6">
                  <span className="text-neon font-bold text-xs tracking-wider block mb-2">01</span>
                  <h3 className="text-white font-bold text-lg mb-2">Diagnose</h3>
                  <p className="text-white/75 text-xs md:text-sm leading-relaxed">
                    We look at how decisions are made, how work flows, and where accountability quietly breaks down.
                  </p>
                </div>

                <div className="glass-card-dark rounded-2xl p-6">
                  <span className="text-neon font-bold text-xs tracking-wider block mb-2">02</span>
                  <h3 className="text-white font-bold text-lg mb-2">Align</h3>
                  <p className="text-white/75 text-xs md:text-sm leading-relaxed">
                    Strategy stops living on paper. We connect it to owners, sequence, and the operating rhythm of the week.
                  </p>
                </div>

                <div className="glass-card-dark rounded-2xl p-6">
                  <span className="text-neon font-bold text-xs tracking-wider block mb-2">03</span>
                  <h3 className="text-white font-bold text-lg mb-2">Rebuild</h3>
                  <p className="text-white/75 text-xs md:text-sm leading-relaxed">
                    We remove duplicated work and legacy drag, then rebuild the process so it holds without you.
                  </p>
                </div>

                <div className="glass-card-dark rounded-2xl p-6">
                  <span className="text-neon font-bold text-xs tracking-wider block mb-2">04</span>
                  <h3 className="text-white font-bold text-lg mb-2">Embed</h3>
                  <p className="text-white/75 text-xs md:text-sm leading-relaxed">
                    We work alongside your team until the new way is the normal way, and growth becomes repeatable.
                  </p>
                </div>
              </div>

              {/* Glass Stat Badge */}
              <div className="glass-badge-dark rounded-2xl p-6 flex items-center justify-between gap-4">
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-neon tracking-tight">+40–60%</div>
                  <p className="text-xs text-white/80 font-medium mt-1">
                    reduction in duplicated work, rework and inefficiencies
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-neon/20 flex items-center justify-center text-neon shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3.7 The person behind it. NEW. Two columns on desktop with the portrait
          right; on mobile the photo comes first, per the annotation. The
          portrait has not been supplied, so this renders single-column rather
          than with stock imagery: spec 8.2 says nothing is better than stock
          here. Spec 3.7. */}
      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div
          className={`mx-auto max-w-6xl ${FOUNDER.portrait ? "grid items-center gap-12 md:grid-cols-2" : "max-w-4xl"}`}
        >
          {FOUNDER.portrait && (
            <div className="order-first md:order-last">
              <Image
                src={FOUNDER.portrait.src}
                alt={FOUNDER.portrait.alt}
                width={720}
                height={900}
                className="w-full rounded-2xl object-cover"
              />
            </div>
          )}

          <div>
            <h2 className="mb-8 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              {FOUNDER.heading}
            </h2>
            <div className="space-y-5">
              {FOUNDER.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="leading-relaxed text-neutral-600">
                  {paragraph}
                </p>
              ))}
            </div>
            <Link
              href={FOUNDER.ctaHref}
              className="mt-8 inline-flex items-center text-sm font-bold text-forest uppercase hover:text-mid"
            >
              {FOUNDER.ctaLabel}
              <span aria-hidden="true" className="ml-2 text-lg leading-none">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3.8 Case studies. KEEP. Placement is confirmed by the spec: directly
          after the founder section and before the personas, so the founder
          section establishes who is behind the work, the case studies prove it,
          and the personas then ask the visitor to place themselves. */}
      <section className="bg-white px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <CaseStudies />
        </div>
      </section>

      {/* Audiences Section / Chapter 03 — Who We Serve */}
      <section className="py-24 bg-neutral-50 px-4 sm:px-6 lg:px-8 border-t border-neutral-100">
        <div className="max-w-6xl mx-auto">
          <PersonaSwitcher />
        </div>
      </section>

      {/* 3.10 How we are paid. NEW. Built from the spec's own block. No
          percentage or formula is published, as 3.10 requires. Awaiting Iram's
          confirmation of the wording before launch, not before build. */}
      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {HOW_WE_ARE_PAID.heading}
          </h2>
          <p className="mb-8 text-xl font-semibold text-mid md:text-2xl">{HOW_WE_ARE_PAID.lead}</p>
          <div className="space-y-5">
            {HOW_WE_ARE_PAID.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="leading-relaxed text-neutral-600 md:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* 3.11 Close / Banner Card (Chapter 05 Style) */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-6xl rounded-[32px] bg-forest text-white p-10 sm:p-14 md:p-20 relative overflow-hidden border border-white/10 shadow-2xl text-center">
          <div aria-hidden="true" className="absolute inset-0 z-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

          <div className="relative z-10 mx-auto w-full max-w-4xl text-center text-white">
            <span className="block font-sans font-semibold text-xs tracking-[0.22em] uppercase text-neon mb-4">
              CHAPTER 05: GET STARTED
            </span>

            <h2 className="mb-6 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
              {CLOSE.heading}
            </h2>

            {/* Gated: the sentence promises a scored view in four minutes, which
                the contact page cannot honour. No substitute is invented, because
                the spec provides none. */}
            {DIAGNOSTIC_ENABLED && (
              <p className="mx-auto mb-10 max-w-2xl text-lg text-white/85">{CLOSE.standfirst}</p>
            )}

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mt-8">
              <Link
                href={JOURNEY_CTA.href}
                className="inline-flex items-center justify-center rounded-full bg-neon px-8 py-4 text-xs font-bold tracking-wider text-forest uppercase transition-all hover:bg-white hover:scale-105 shadow-lg focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-forest focus-visible:outline-none"
              >
                {JOURNEY_CTA.label}
              </Link>
              <a
                href={WHATSAPP_CTA.href}
                target={WHATSAPP_CTA.external ? "_blank" : undefined}
                rel={WHATSAPP_CTA.external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center justify-center rounded-full border border-white/40 backdrop-blur-md px-8 py-4 text-xs font-bold tracking-wider text-white uppercase transition-all hover:border-neon hover:text-neon hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-neon focus-visible:outline-none"
              >
                {WHATSAPP_CTA.label}
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

