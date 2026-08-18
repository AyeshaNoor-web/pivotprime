import Image from "next/image";
import Link from "next/link";
import FadeUp from "@/components/FadeUp";
import CountUp from "@/components/CountUp";
import { DIAGNOSTIC_ENABLED } from "@/lib/flags";
import { CONTACT_CTA, HERO_CTA, JOURNEY_CTA, WHATSAPP_CTA } from "@/content/cta";
import {
  ACCOUNTABLE,
  CLIENT_LOGOS,
  CLOSE,
  FOUNDER,
  HERO,
  HOW_WE_ARE_PAID,
  METRICS,
  PATTERNS,
  PROOF,
  RESULTS,
} from "@/content/homepage";
import { SERVICES_EYEBROW, SERVICES_HEADING } from "@/content/services";
import ServiceCards from "@/components/ServiceCards";
import PatternsList from "@/components/PatternsList";
import CaseStudies from "@/components/CaseStudies";
import type { Metadata } from "next";
import { pageMetadata } from "@/content/metadata";

export const metadata: Metadata = pageMetadata("home");

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 3.1 Hero. REPLACE. Background is kept: spec says it works and it stays. */}
      <section className="relative flex min-h-[85vh] items-center px-4 pt-32 pb-24 sm:px-6 md:pt-48 md:pb-32 lg:px-8">
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
          <div className="absolute inset-0 bg-forest/50" />
        </div>

        {/* Wider than the old max-w-5xl: the annotation on 3.1 asks for text to
            run as far across the screen as it reasonably can. */}
        <div className="relative z-10 mx-auto w-full max-w-6xl text-white">
          <h1 className="mb-6 max-w-5xl text-4xl leading-tight font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {HERO.heading}
          </h1>

          {/* Set noticeably larger than the paragraph beneath it. Spec 3.1:
              this sentence is doing the most work on the page. */}
          <p className="mb-6 max-w-4xl text-2xl leading-snug font-semibold sm:text-3xl md:text-4xl">
            {HERO.lead}
          </p>

          <p className="mb-10 max-w-3xl text-base leading-relaxed text-white/85 md:text-lg">
            {HERO.body}
          </p>

          {/* No WhatsApp CTA here, deliberately. Spec 3.1: "Nobody gets in touch
              before they know what is on offer." The conversation CTAs appear
              further down once the visitor has seen the services and the proof. */}
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link
              href={HERO_CTA.href}
              className="inline-flex items-center justify-center rounded-md bg-primary px-7 py-4 text-sm font-bold tracking-wide text-white uppercase shadow-lg transition-colors hover:bg-neon/90 focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-forest focus-visible:outline-none"
            >
              {HERO_CTA.label}
            </Link>

            {/* Visually secondary, and an in-page anchor rather than a
                navigation. Spec 3.1. */}
            <a
              href={HERO.secondaryHref}
              className="inline-flex items-center justify-center rounded-md border border-white/40 px-7 py-4 text-sm font-bold tracking-wide text-white uppercase transition-colors hover:border-white focus-visible:ring-2 focus-visible:ring-neon focus-visible:outline-none"
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
      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <header className="mb-16 max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {RESULTS.heading}
            </h2>
            <p className="mt-4 text-lg text-neutral-600 md:text-xl">{RESULTS.standfirst}</p>
          </header>

          {/* Cards with no figure are filtered out rather than shown with a
              placeholder. Spec 3.3 on metric 6: "Do not launch this card with a
              placeholder." The copy is written and the card appears the moment
              the number lands. */}
          <ul className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {METRICS.filter((m) => m.figure !== null).map((metric) => (
              <li key={metric.label} className="min-w-0 [&>*]:max-w-full">
                <FadeUp>
                <div className="mb-3 text-5xl font-bold text-mid md:text-6xl">
                  <CountUp end={metric.figure as number} />
                  {metric.suffix}
                </div>
                <h3 className="mb-2 font-bold text-foreground">{metric.label}</h3>
                <p className="leading-relaxed text-neutral-600">{metric.context}</p>
                </FadeUp>
              </li>
            ))}
          </ul>
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

      {/* 3.6 One accountable party. NEW. Full width, dark green. Makes the
          argument for placing people rather than recommending, which is what
          separates Pivot Prime from an advisory firm and from a solo fractional
          operator. Spec 3.6. */}
      <section className="bg-forest px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
            {ACCOUNTABLE.heading}
          </h2>
          <div className="space-y-5">
            {ACCOUNTABLE.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="leading-relaxed text-white/85 md:text-lg">
                {paragraph}
              </p>
            ))}
          </div>

          <blockquote className="mt-12 border-l-2 border-neon pl-6 text-xl leading-snug font-semibold text-white md:text-2xl lg:text-3xl">
            {ACCOUNTABLE.pullQuote}
          </blockquote>

          <div className="mt-10">
            <Link
              href={CONTACT_CTA.href}
              className="inline-flex items-center justify-center rounded-md bg-neon px-7 py-4 text-sm font-bold tracking-wide text-forest uppercase transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-forest focus-visible:outline-none"
            >
              {ACCOUNTABLE.ctaLabel}
            </Link>
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

      {/* Audiences Section */}
      <section className="py-24 bg-forest text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            You don’t have to figure it all<br />out alone
          </h2>
          <h3 className="text-3xl md:text-4xl font-medium text-neon mb-12 max-w-2xl mx-auto leading-tight">
            We are your operations, growth and execution partner.
          </h3>
          <p className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-10 max-w-3xl mx-auto">
            Whether you’re building, scaling, or holding everything together, we work with people who lead from the front and carry the pressure every day.
          </p>
          <p className="text-xl md:text-2xl text-white font-medium mb-16">
            These are the leaders we support.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 text-left">
            <Link href="/for-founders" className="bg-white/5 border border-white/[0.14] rounded-xl p-8 flex items-center hover:bg-white/[0.08] transition-colors group">
              <div className="mr-6">
                <Image src="/founder.svg" alt="" aria-hidden="true" width={40} height={40} className="w-10 h-10 group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-xl font-bold text-neon">
                You’re a Founder and<br />everything still depends<br />on you.
              </p>
            </Link>

            <Link href="/for-smes" className="bg-white/5 border border-white/[0.14] rounded-xl p-8 flex items-center hover:bg-white/[0.08] transition-colors group">
              <div className="mr-6">
                <Image src="/SME.svg" alt="" aria-hidden="true" width={40} height={40} className="w-10 h-10 group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-xl font-bold text-neon">
                You’re running an SME<br />that is growing but not<br />settled.
              </p>
            </Link>
            
            <Link href="/for-corporate-leaders" className="bg-white/5 border border-white/[0.14] rounded-xl p-8 flex items-center hover:bg-white/[0.08] transition-colors group">
              <div className="mr-6">
                <Image src="/Strategy.svg" alt="" aria-hidden="true" width={40} height={40} className="w-10 h-10 group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-xl font-bold text-neon">
                You’re a Corporate Leader<br />expected to deliver change<br />without any real support.
              </p>
            </Link>
            
            <Link href="/for-pl-owners" className="bg-white/5 border border-white/[0.14] rounded-xl p-8 flex items-center hover:bg-white/[0.08] transition-colors group">
              <div className="mr-6">
                <Image src="/growth.svg" alt="" aria-hidden="true" width={40} height={40} className="w-10 h-10 group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-xl font-bold text-neon">
                You’re a Corporate Owner<br />responsible for aligning<br />execution at scale.
              </p>
            </Link>
          </div>
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

      {/* 3.11 Close. REPLACE. The existing background is kept, per the spec. */}
      <section className="relative flex min-h-[60vh] items-center overflow-hidden bg-black px-4 py-32 sm:px-6 lg:px-8">
        <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/Group-1577708851-min.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 z-0 bg-forest/70" />

        <div className="relative z-10 mx-auto w-full max-w-4xl text-center text-white">
          <h2 className="mb-6 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
            {CLOSE.heading}
          </h2>

          {/* Gated: the sentence promises a scored view in four minutes, which
              the contact page cannot honour. No substitute is invented, because
              the spec provides none. */}
          {DIAGNOSTIC_ENABLED && (
            <p className="mx-auto mb-10 max-w-2xl text-lg text-white/85">{CLOSE.standfirst}</p>
          )}

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={JOURNEY_CTA.href}
              className="inline-flex items-center justify-center rounded-md bg-neon px-7 py-4 text-sm font-bold tracking-wide text-forest uppercase transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-forest focus-visible:outline-none"
            >
              {JOURNEY_CTA.label}
            </Link>
            <a
              href={WHATSAPP_CTA.href}
              target={WHATSAPP_CTA.external ? "_blank" : undefined}
              rel={WHATSAPP_CTA.external ? "noopener noreferrer" : undefined}
              className="inline-flex items-center justify-center rounded-md border border-white/50 px-7 py-4 text-sm font-bold tracking-wide text-white uppercase transition-colors hover:border-white focus-visible:ring-2 focus-visible:ring-neon focus-visible:outline-none"
            >
              {WHATSAPP_CTA.label}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
