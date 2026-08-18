import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/content/metadata";

export const metadata: Metadata = pageMetadata("forFounders");


export default function ForFounders() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-16">
      
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black mb-10 tracking-tight leading-tight max-w-4xl mx-auto">
          You’ve created something real.
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed max-w-4xl mx-auto">
          It works, but behind the scenes, everything still depends on you. Decisions funnel back to your desk, growth feels harder than it should and stepping away feels risky.
        </p>
      </section>

      {/* Detail Sections */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section 1 */}
          <div className="bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100 mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">A business that doesn&apos;t depend on you</h2>
            <h3 className="text-xl text-primary font-bold mb-8">Through an Operational Clarity Audit. From AED 15,000.</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  We look at how your business actually runs today. We review your commercial model, P&L, marketing and sales, operations, and how decisions and work really flow. We speak with you and, where useful, selected team members.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  The focus is simple: understanding where progress still depends on you, where things slow down, and what needs to change first.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 flex flex-col justify-center">
                <p className="text-primary font-bold text-lg mb-4">This is a 12-14 hour piece of analysis.</p>
                <p className="text-black font-medium">Most founders start here. It gives clarity before any hiring or operational changes are made.</p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100 mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">People you can trust to carry the work</h2>
            <h3 className="text-xl text-primary font-bold mb-8">Through hiring support, role design and Build and Place.</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Once it’s clear where the pressure sits, we help you put the right structure around people. This is about creating roles with real ownership, clear judgement, and defined outcomes.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  We support role design, hiring strategy, and assessments, including behavioural and practical tools that reduce the risk of mishires. We can support or run interviews with you, depending on what you need.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  The result is people who can carry work properly, make decisions, and reduce how much comes back to you.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 flex flex-col justify-center">
                <p className="text-primary font-bold text-lg mb-4">Role clarity and hiring direction are typically established in 1–2 weeks, depending on scope.</p>
                <p className="text-black font-medium">Founders usually come here after the diagnostic, when it’s clear what needs to be taken off their plate.</p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100 mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Growth without more chaos</h2>
            <h3 className="text-xl text-primary font-bold mb-8">Through a Fractional COO retainer. Scoped per engagement.</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  As the business grows, what once worked often starts to strain. We review how work flows day to day, where friction builds, and where effort is being duplicated or wasted.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  We help reset workflows, priorities, and standards. This can include process design, automation opportunities, and documenting how critical work should run so execution becomes more predictable as volume increases.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  The aim is simple: growth stops creating more mess, and momentum continues without constant intervention.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 flex flex-col justify-center">
                <p className="text-primary font-bold text-lg mb-4">This typically runs over 30 to 90 days.</p>
                <p className="text-black font-medium">This typically follows hiring or growth pressure, when the business needs to stabilise at a new level.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Spec 5 routing block: each persona page points at the service the
          findings actually justify. */}
      <section className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto mb-4 max-w-4xl rounded-xl border border-forest/10 bg-forest/[0.04] p-8 text-center">
          <p className="mb-6 text-lg leading-relaxed text-neutral-700">
            Most founders start with the audit, because it is the cheapest way to find out whether the problem is the process, the people, or the founder.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/services/operational-clarity-audit" className="inline-flex items-center justify-center rounded-md bg-primary px-7 py-3.5 text-sm font-bold tracking-wide text-white uppercase transition-colors hover:bg-mid/90">
              See what the audit covers
              <span aria-hidden="true" className="ml-2 text-lg leading-none">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-forest text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/contact" className="inline-flex items-center justify-center px-10 py-5 font-bold tracking-wide uppercase text-white bg-primary hover:bg-neon/90 transition-colors rounded-md shadow-xl text-lg group">
            Book your first conversation <span className="ml-3 font-normal text-2xl leading-none group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
