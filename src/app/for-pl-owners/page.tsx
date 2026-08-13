import Link from "next/link";


export default function ForCorporateOwners() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-16">
      
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black mb-10 tracking-tight leading-tight max-w-4xl mx-auto">
          You are responsible for the whole system.
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed max-w-4xl mx-auto mb-6">
          Performance, risk, and long-term direction all sit with you. You’re running a complex organisation with multiple products, senior leaders, regulators, boards, and markets to answer to.
        </p>
        <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed max-w-4xl mx-auto">
          The business is stable, but progress is slow, change is expensive, and every initiative competes with ten others. Growth exists, but momentum is harder to create. Execution happens, but not always in the direction you intend.
        </p>
      </section>

      {/* Detail Sections */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-black">What We Offer</h2>
          </div>

          {/* Section 1 */}
          <div className="bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100 mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Competitive Focus & Advantage Reset</h2>
            <h3 className="text-xl text-primary font-bold mb-8">Through a deep dive diagnostic.</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <p className="text-gray-600 leading-relaxed mb-6 font-medium">
                  This is about understanding why you’re not moving faster than the market.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  We look at where capital, leadership attention, and effort are spread too thin, where growth is capped by internal friction, and where competitors are quietly out-executing you.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  This work surfaces where margin and growth are leaking, which initiatives are noise versus advantage and what must change to outperform peers, not just keep pace.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  The outcome is a small number of moves that materially shift trajectory, not a long list of initiatives.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 flex flex-col justify-center">
                <p className="text-primary font-bold text-lg mb-4">This is a 2 to 12 week reset, depending on scope and complexity.</p>
                <p className="text-black font-medium">Most CEOs start here when growth plateaus, regulation shifts, or competitive pressure increases.</p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100 mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Executive Leverage & Strategy Carry-Through</h2>
            <h3 className="text-xl text-primary font-bold mb-8">Through fractional Chief of Staff support.</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <p className="text-gray-600 leading-relaxed mb-6 font-medium">
                  Most corporate strategies fail quietly, not loudly. They get approved, socialised, and then diluted across layers of the organisation.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  We operate as a Chief of Staff or executive extension to ensure the decisions that matter actually land, across functions, regions, and senior teams.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  This includes translating strategic intent into executable priorities, managing cross-functional dependencies and politics, keeping momentum when priorities collide and giving you real visibility on what is moving and what is stuck.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  This is how strategy survives scale.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 flex flex-col justify-center">
                <p className="text-primary font-bold text-lg mb-4">Engaged on a flexible basis, typically over 3–6 months.</p>
                <p className="text-black font-medium">Typically engaged after priorities are reset, when execution needs senior-level coordination, follow-through, and momentum.</p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100 mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Scaled Execution & Intelligent Modernisation</h2>
            <h3 className="text-xl text-primary font-bold mb-8">Through targeted operational and AI enablement.</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <p className="text-gray-600 leading-relaxed mb-6 font-medium">
                  Large organisations slow down in invisible ways. Processes calcify, systems are under-used, and teams compensate instead of fixing root causes.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  We help remove friction that limits speed and scale, using smarter operating design, automation, and selective AI adoption.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  This is not transformation theatre. It is targeted change that improves execution velocity, cost discipline, and decision quality without destabilising the organisation.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 flex flex-col justify-center">
                <p className="text-primary font-bold text-lg mb-4">Typically delivered over 3–9 months, depending on the scope of change.</p>
                <p className="text-black font-medium">Usually engaged once direction is set, to modernise how work actually gets done.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#093524] text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/contact" className="inline-flex items-center justify-center px-10 py-5 font-bold tracking-wide uppercase text-white bg-primary hover:bg-primary-dark transition-colors rounded-md shadow-xl text-lg group">
            BOOK YOUR FIRST CONVERSATION <span className="ml-3 font-normal text-2xl leading-none group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
