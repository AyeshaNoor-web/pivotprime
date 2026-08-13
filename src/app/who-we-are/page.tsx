import Link from "next/link";


export default function WhoWeAre() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-16">
      
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black mb-10 tracking-tight leading-tight max-w-4xl mx-auto">
          From pressure to Prime State
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed max-w-4xl mx-auto mb-6">
          <span className="text-primary font-bold">Not traditional consultants, we are your execution partners.</span>
        </p>
        <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed max-w-4xl mx-auto mb-6">
          We have worked inside complex systems, managing targets, navigating real constraints, and carrying responsibility for results.
        </p>
        <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed max-w-4xl mx-auto mb-6">
          We have also stepped back as advisors, to question what actually drives progress when effort is high but outcomes are not changing.
        </p>
        <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed max-w-4xl mx-auto">
          Pivot Prime exists because we have lived both sides. We understand what it takes to move work forward when plans meet pressure, people, and reality.
        </p>
      </section>

      {/* Four Pillars Summary */}
      <section className="py-24 bg-gray-50 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-10">At Pivot Prime, we bring four things into every engagement</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 font-bold text-lg text-primary">• We structure problem solving</div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 font-bold text-lg text-primary">• We embed operational discipline</div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 font-bold text-lg text-primary">• We enable data tracking</div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 font-bold text-lg text-primary">• We understand human behaviour</div>
          </div>
          
          <p className="text-xl font-medium text-gray-700">
            We help unlock the version of the business that is possible when structure, people, operations, and data work together: <span className="font-bold text-black">Your Prime State.</span>
          </p>
        </div>
      </section>

      {/* Four Pillars Detail */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center"><span className="text-primary mr-3 text-3xl">•</span> We structure problem solving</h3>
            <p className="text-gray-600 leading-relaxed text-lg pl-8">
              We take problems that feel tangled and surface the full picture, making sure nothing important is missed. We help leaders see gaps, dependencies, and risks that are often overlooked when everything is treated as one big issue.
            </p>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center"><span className="text-primary mr-3 text-3xl">•</span> We embed operational discipline</h3>
            <p className="text-gray-600 leading-relaxed text-lg pl-8">
              We put structure behind execution through clear ownership, decision frameworks, and practical operating rhythms. Standard ways of working are defined so progress does not depend on individual heroics or constant follow up.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center"><span className="text-primary mr-3 text-3xl">•</span> We enable data tracking</h3>
            <p className="text-gray-600 leading-relaxed text-lg pl-8">
              We build practical dashboards based on the data and KPIs that actually matter for your business. These dashboards give leaders a reliable way to track progress, spot issues early, and make informed decisions without digging through spreadsheets.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center"><span className="text-primary mr-3 text-3xl">•</span> We understand human behavior</h3>
            <p className="text-gray-600 leading-relaxed text-lg pl-8">
              Strategies only hold when they fit the culture, capacity, and motivations of the people expected to deliver them. We work with how teams actually operate under pressure, how leaders influence action, and where resistance or fatigue shows up.
            </p>
          </div>

        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-24 bg-gray-50" id="case-studies">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-6">Case Studies</h2>
            <p className="text-xl md:text-2xl text-gray-600">Real problems, real execution, real results.</p>
          </div>

          <div className="space-y-16">
            
            {/* Case Study 1 */}
            <div className="bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row gap-12">
                <div className="md:w-1/3">
                  <div className="text-primary font-bold tracking-widest uppercase mb-4 text-sm">Case Study 1</div>
                  <h3 className="text-3xl font-extrabold mb-6">Financial Services Company</h3>
                </div>
                <div className="md:w-2/3 space-y-10">
                  <div>
                    <h4 className="text-xl font-bold mb-3">The Challenge:</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Customer onboarding and policy processing were slow and inconsistent. Teams lacked visibility into workload, cost per client, and profitability at a client and transaction level. KYC timelines were unpredictable, creating customer frustration and internal pressure. Leadership could not clearly see where time and cost were being lost.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-3">The Pivot:</h4>
                    <p className="text-gray-600 leading-relaxed mb-3">We rebuilt operations with discipline and data at the centre.</p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                      <li>Mapped end-to-end customer and transaction workflows</li>
                      <li>Reduced duplication and rework across compliance and operations</li>
                      <li>Offshored selected onboarding activities to reduce bottlenecks and cost</li>
                      <li>Built real-time dashboards tracking cost per client, transaction time, CAC, and LTV</li>
                    </ul>
                  </div>
                  <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                    <h4 className="text-xl font-bold mb-3 text-primary">The Results:</h4>
                    <ul className="space-y-3 font-medium text-black">
                      <li className="flex items-start"><span className="text-primary mr-3 font-bold text-xl">✓</span> 67% faster transaction processing per customer</li>
                      <li className="flex items-start"><span className="text-primary mr-3 font-bold text-xl">✓</span> KYC completion time reduced from an average of 10 days to 3 days</li>
                      <li className="flex items-start"><span className="text-primary mr-3 font-bold text-xl">✓</span> 25% reduction in operational waste across onboarding and processing</li>
                      <li className="flex items-start"><span className="text-primary mr-3 font-bold text-xl">✓</span> 2–3 FTE roles removed from high-cost locations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row gap-12">
                <div className="md:w-1/3">
                  <div className="text-primary font-bold tracking-widest uppercase mb-4 text-sm">Case Study 2</div>
                  <h3 className="text-3xl font-extrabold mb-6">Founder-Led Business</h3>
                </div>
                <div className="md:w-2/3 space-y-10">
                  <div>
                    <h4 className="text-xl font-bold mb-3">The Challenge:</h4>
                    <p className="text-gray-600 leading-relaxed">
                      The founder was deeply involved in every decision. While the business was growing, progress felt heavy. Most of the week was spent on admin, approvals, and rework, leaving little time for direction, partnerships, or growth initiatives. The team had skills but lacked confidence. Delegation existed in theory, but decisions still flowed back to the founder.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-3">The Pivot:</h4>
                    <p className="text-gray-600 leading-relaxed mb-3">We focused on founder load release through structure and behaviour.</p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                      <li>Translated the founder&apos;s vision into clear decision standards and success criteria.</li>
                      <li>Defined which decisions stayed with the founder and which should never escalate.</li>
                      <li>Redesigned roles around ownership and judgement, not just task delivery.</li>
                      <li>Introduced simple operating rhythms to reduce ad-hoc interruptions and constant checking.</li>
                    </ul>
                  </div>
                  <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                    <h4 className="text-xl font-bold mb-3 text-primary">The Results:</h4>
                    <ul className="space-y-3 font-medium text-black">
                      <li className="flex items-start"><span className="text-primary mr-3 font-bold text-xl">✓</span> Up to 2 days a week returned to the founder by removing admin work and decision drag</li>
                      <li className="flex items-start"><span className="text-primary mr-3 font-bold text-xl">✓</span> Fewer escalations and faster team decisions</li>
                      <li className="flex items-start"><span className="text-primary mr-3 font-bold text-xl">✓</span> Greater confidence in delegation without loss of quality or control</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Study 3 */}
            <div className="bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row gap-12">
                <div className="md:w-1/3">
                  <div className="text-primary font-bold tracking-widest uppercase mb-4 text-sm">Case Study 3</div>
                  <h3 className="text-3xl font-extrabold mb-6">Fitness & Wellness Company (UAE)</h3>
                </div>
                <div className="md:w-2/3 space-y-10">
                  <div>
                    <h4 className="text-xl font-bold mb-3">The Challenge:</h4>
                    <p className="text-gray-600 leading-relaxed">
                      The business had strong demand and a loyal core community, but member churn was rising. Leadership could not clearly see why members were leaving, and teams were focused on selling new memberships rather than retaining existing ones. Effort was high, but results were uneven.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-3">The Pivot:</h4>
                    <p className="text-gray-600 leading-relaxed mb-3">We rebuilt retention around experience, behaviour, and ownership.</p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                      <li>Identified the moments that mattered most to members, including onboarding, class atmosphere, music, and post-class follow-up.</li>
                      <li>Shifted the focus from transactions to community and identity, reinforcing progress and belonging.</li>
                      <li>Aligned team incentives to retention behaviours rather than sign-ups alone.</li>
                      <li>Introduced simple dashboards tracking attendance patterns, engagement drop-off, and early churn signals.</li>
                    </ul>
                  </div>
                  <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                    <h4 className="text-xl font-bold mb-3 text-primary">The Results:</h4>
                    <ul className="space-y-3 font-medium text-black">
                      <li className="flex items-start"><span className="text-primary mr-3 font-bold text-xl">✓</span> 13% increase in member retention</li>
                      <li className="flex items-start"><span className="text-primary mr-3 font-bold text-xl">✓</span> 17% improvement in profit margin through reduced churn and better utilisation</li>
                      <li className="flex items-start"><span className="text-primary mr-3 font-bold text-xl">✓</span> Clear visibility on why members stayed, allowing teams to act before churn occurred</li>
                    </ul>
                  </div>
                </div>
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
