import Link from "next/link";


export default function ForCorporateLeaders() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-16">
      
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black mb-10 tracking-tight leading-tight max-w-4xl mx-auto">
          You’re carrying delivery, risk, and outcomes
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed max-w-4xl mx-auto mb-6">
          often without enough people or budget to do it properly.
        </p>
        <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed max-w-4xl mx-auto">
          You’re expected to make things work across functions, vendors, and priorities, while keeping the organisation steady and your own credibility intact.
        </p>
      </section>

      {/* Detail Sections */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section 1 */}
          <div className="bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100 mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Execution support without headcount</h2>
            <h3 className="text-xl text-primary font-bold mb-8">Through embedded execution support.</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <p className="text-gray-600 leading-relaxed mb-6 font-medium">
                  This is for leaders who need real delivery, not another steering committee.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  We operate as an extension of your function, helping you plan, coordinate, and deliver work across teams and vendors, without adding permanent headcount or disrupting the organisation.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Support can include project management, operational coordination, vendor oversight, documentation, and day-to-day execution support during high-pressure periods such as launches, integrations, audits, or regulatory change.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 flex flex-col justify-center">
                <p className="text-primary font-bold text-lg mb-4">We can provide execution support for anywhere from 4 weeks to 6 months+.</p>
                <p className="text-black font-medium">Most leaders start here when delivery pressure is high and internal bandwidth is stretched.</p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100 mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">On-demand specialist bench</h2>
            <h3 className="text-xl text-primary font-bold mb-8">Through a plug-in partner network.</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <p className="text-gray-600 leading-relaxed mb-6 font-medium">
                  You don’t need to hire for everything, but you do need access to people who know what they’re doing.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  We give you access to a vetted bench of specialists across operations, HR, compliance, legal, data, automation, and transformation support, who work as one coordinated team, not disconnected vendors.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  This allows you to bring in the right capability for one month, three months, or a defined piece of work, without long approval cycles or permanent cost.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 flex flex-col justify-center">
                <p className="text-primary font-bold text-lg mb-4">Typical engagements to use our partner bench are flexible and based on need.</p>
                <p className="text-black font-medium">Often used when workload spikes or specialist input is required fast.</p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100 mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Executive Sounding Board + Critical Comms Support</h2>
            <h3 className="text-xl text-primary font-bold mb-8">Through confidential decision and communication support.</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <p className="text-gray-600 leading-relaxed mb-6 font-medium">
                  This is for leaders who carry responsibility without cover.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  We act as a confidential sounding board to help you pressure-test decisions, structure thinking, and sharpen how you communicate with senior stakeholders, regulators, and boards.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  This is decision support for people who can’t afford mistakes.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 flex flex-col justify-center">
                <p className="text-primary font-bold text-lg mb-4">The typical engagement is monthly or ad hoc.</p>
                <p className="text-black font-medium">Often used alongside execution support, when visibility and stakes are high.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-forest text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/contact" className="inline-flex items-center justify-center px-10 py-5 font-bold tracking-wide uppercase text-white bg-primary hover:bg-neon/90 transition-colors rounded-md shadow-xl text-lg group">
            BOOK YOUR FIRST CONVERSATION <span className="ml-3 font-normal text-2xl leading-none group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
