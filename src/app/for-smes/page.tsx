import Link from "next/link";


export default function ForSMEs() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-16">
      
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black mb-10 tracking-tight leading-tight max-w-4xl mx-auto">
          Revenue is increasing, but margins are uneven.
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed max-w-4xl mx-auto">
          Some months feel strong, others feel tighter than they should. Cash flow needs attention, costs creep quietly, and performance depends too much on who is chasing what. You’re past early chaos, but not yet operating with the consistency, visibility, or control that scale demands.
        </p>
      </section>

      {/* Detail Sections */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section 1 */}
          <div className="bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100 mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Predictable profit and cash flow</h2>
            <h3 className="text-xl text-primary font-bold mb-8">Through a profit and operations audit.</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  We review how money actually moves through the business today. That includes revenue drivers, pricing logic, margin by product or client, cost structure, working capital, and how reliably cash is collected.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  We look at where profit is leaking, where effort is not converting into margin, and where growth is creating pressure instead of strength. This often includes reviewing receivables, cost creep, pricing consistency, and operational drag that is quietly eroding results.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  The outcome is clarity on what is really driving performance month to month, what needs tightening first, and where predictability can be restored.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 flex flex-col justify-center">
                <p className="text-primary font-bold text-lg mb-4">This is a 15-20 day analysis.</p>
                <p className="text-black font-medium">This is where most SME&apos;s start. It creates a clear baseline before structural or operational changes are made.</p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100 mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Pricing that makes sense</h2>
            <h3 className="text-xl text-primary font-bold mb-8">Through pricing and margin architecture.</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  As SMEs grow, pricing often lags behind reality. Products, clients, and services evolve, but prices stay flat, inconsistent, or driven by instinct rather than evidence.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  We analyse your pricing across clients, products, and contracts, looking at contribution margin, delivery effort, variability, and risk. This includes identifying where work creep exists, where clients are underpriced, and where value is being given away unintentionally.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  We help you design pricing logic that matches how your business actually operates. That may include tiered pricing, client segmentation, minimum fees, usage-based elements, or clearer rules around discounting and scope.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  The result is pricing you can defend, margins you can predict, and growth that increases profit instead of diluting it.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 flex flex-col justify-center">
                <p className="text-primary font-bold text-lg mb-4">This is typically a 2–4 week engagement.</p>
                <p className="text-black font-medium">Most SMEs come here after the profit and cash flow review, once it’s clear where margin instability is coming from.</p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100 mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Operations that can scale</h2>
            <h3 className="text-xl text-primary font-bold mb-8">Through an operational reset.</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  What worked at a smaller size often starts to strain as volume increases. Processes become inconsistent, work is duplicated, priorities compete, and execution becomes noisy.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  We review how work actually flows across teams, where friction builds, and where effort is being wasted. We reset workflows, clarify priorities, define standards, and document how critical processes should run.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  This can include process redesign, automation opportunities, and creating operating rhythm so execution becomes more predictable as complexity increases.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  The aim is simple: growth stops creating chaos, and momentum continues without constant firefighting.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 flex flex-col justify-center">
                <p className="text-primary font-bold text-lg mb-4">Typically runs over 30–90 days, depending on scope.</p>
                <p className="text-black font-medium">This typically follows growth or hiring pressure, when the business needs to stabilise at a new level.</p>
              </div>
            </div>
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
