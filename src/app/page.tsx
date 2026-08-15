import Image from "next/image";
import Link from "next/link";
import FadeUp from "@/components/FadeUp";
import CountUp from "@/components/CountUp";
import { DIAGNOSTIC_ENABLED } from "@/lib/flags";
import { HERO_CTA } from "@/content/cta";
import { CLIENT_LOGOS, HERO, METRICS, PROOF, RESULTS } from "@/content/homepage";
import { SERVICES_EYEBROW, SERVICES_HEADING } from "@/content/services";
import ServiceCards from "@/components/ServiceCards";

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
                <Image src="/founder.svg" alt="Founder" width={40} height={40} className="w-10 h-10 group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-xl font-bold text-neon">
                You’re a Founder and<br />everything still depends<br />on you.
              </p>
            </Link>

            <Link href="/for-smes" className="bg-white/5 border border-white/[0.14] rounded-xl p-8 flex items-center hover:bg-white/[0.08] transition-colors group">
              <div className="mr-6">
                <Image src="/SME.svg" alt="SME" width={40} height={40} className="w-10 h-10 group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-xl font-bold text-neon">
                You’re running an SME<br />that is growing but not<br />settled.
              </p>
            </Link>
            
            <Link href="/for-corporate-leaders" className="bg-white/5 border border-white/[0.14] rounded-xl p-8 flex items-center hover:bg-white/[0.08] transition-colors group">
              <div className="mr-6">
                <Image src="/Strategy.svg" alt="Corporate Leader" width={40} height={40} className="w-10 h-10 group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-xl font-bold text-neon">
                You’re a Corporate Leader<br />expected to deliver change<br />without any real support.
              </p>
            </Link>
            
            <Link href="/for-pl-owners" className="bg-white/5 border border-white/[0.14] rounded-xl p-8 flex items-center hover:bg-white/[0.08] transition-colors group">
              <div className="mr-6">
                <Image src="/growth.svg" alt="Corporate Owner" width={40} height={40} className="w-10 h-10 group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-xl font-bold text-neon">
                You’re a Corporate Owner<br />responsible for aligning<br />execution at scale.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Sat in the System Section */}
      <section className="py-24 bg-black text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
            We&apos;ve sat in the system.
          </h2>
          <h3 className="text-3xl md:text-4xl font-medium text-primary mb-12">
            Now we help reshape it.
          </h3>
          <div className="space-y-6 text-lg md:text-xl text-white font-medium max-w-3xl mx-auto">
            <p>
              We&apos;ve worked inside some of the world&apos;s largest organisations and we&apos;ve also sat across the table from them.
            </p>
            <p>
              We know what strategy looks like on paper and we know what actually happens when it meets people, processes, and pressure.
            </p>
            <p>
              Today, we work with ambitious businesses at different stages.
            </p>
            <p>
              Our role is simple. We help you cut through complexity, align strategy with execution, and build operations that actually support growth.
            </p>
          </div>
        </div>
        
      </section>

      {/* Break Through Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 text-center bg-black min-h-[60vh] flex items-center">
        {/* Background faces image from the live site */}
        <div className="absolute inset-0 z-0" style={{ backgroundImage: 'url("/Group-1577708851-min.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        
        {/* Dark overlay to make text readable */}
        <div className="absolute inset-0 z-0 bg-black/20" />
        
        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight leading-tight">
            We help leaders and teams<br />break through for good.
          </h2>
          <h3 className="text-2xl md:text-3xl font-medium text-primary mb-12">
            When strategy and execution finally line up, growth follows.
          </h3>
          <div className="space-y-6 text-lg md:text-xl text-white font-medium max-w-3xl mx-auto mb-12">
            <p>
              At Pivot Prime, we focus on what actually gets in the way. We look at how decisions are made, how work flows, and where accountability breaks down.
            </p>
            <p>
              Then we work alongside you to fix it properly, so growth becomes stable, repeatable, and sustainable.
            </p>
          </div>
          <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 text-xs font-bold tracking-wider uppercase text-white bg-primary hover:bg-neon/90 transition-colors rounded shadow-lg group">
            Book discovery call <span className="ml-2 font-normal text-lg leading-none group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
