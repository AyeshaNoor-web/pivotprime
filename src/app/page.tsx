import Image from "next/image";
import Link from "next/link";
import FadeUp from "@/components/FadeUp";
import CountUp from "@/components/CountUp";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 px-4 sm:px-6 lg:px-8 flex items-center min-h-[85vh]">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/home-banner.jpg" 
            alt="Hero background" 
            fill 
            className="object-cover animate-water-pan"
            priority 
          />
          <div className="absolute inset-0 bg-forest/50" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto w-full text-white">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 leading-tight max-w-4xl font-sans">
            For businesses ready to operate in their prime state.
          </h1>
          <p className="text-2xl md:text-3xl mb-12 font-medium">
            Your operations, execution & growth partner
          </p>
          <a href="https://wa.me/971524401075" className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold tracking-wide uppercase text-white bg-primary hover:bg-primary-dark transition-colors rounded-md shadow-lg group">
            GET IN TOUCH <span className="ml-2 font-normal text-xl leading-none group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-24 bg-white text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-4 tracking-tight">
            We don’t just understand your challenges.
          </h2>
          <h3 className="text-3xl md:text-4xl font-medium text-mid mb-12">
            We fix what’s really holding your business back
          </h3>
          <p className="text-lg md:text-xl text-black font-medium leading-relaxed max-w-3xl mx-auto">
            Even the best-run businesses hit hidden bottlenecks in operations, culture, and execution. At Pivot Prime, we work alongside you to diagnose what’s slowing the business down, then help you fix it, properly.
          </p>
        </div>
      </section>

      {/* Patterns Section */}
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-extrabold text-black mb-12 tracking-tight">
            These are the patterns we<br />see before growth stalls.
          </h2>
          <div className="text-xl md:text-2xl leading-relaxed space-y-4">
            <p>
              <span className="text-primary font-bold">Everything still depends on the founder</span> <span className="text-gray-400 mx-2">•</span> <span className="text-gray-400 italic font-light">Profit margins are thin, or disappearing</span> <span className="text-gray-400 mx-2">•</span>
            </p>
            <p>
              <span className="text-gray-600 font-light">We have a strategy, but execution all over the place</span> <span className="text-gray-400 mx-2">•</span> <span className="text-black font-bold">Revenue is stuck, year on year</span> <span className="text-gray-400 mx-2">•</span>
            </p>
            <p>
              <span className="text-gray-400 italic font-light">We want to scale, but don&apos;t know how</span> <span className="text-gray-400 mx-2">•</span> <span className="text-gray-400 italic font-light">Operations feel messy and inefficient</span> <span className="text-gray-400 mx-2">•</span>
            </p>
            <p>
              <span className="text-primary font-bold">Legacy processes drain time and money</span> <span className="text-gray-400 mx-2">•</span> <span className="text-gray-600 font-light">The team is stretched, misaligned or burned out</span> <span className="text-gray-400 mx-2">•</span>
            </p>
            <p>
              <span className="text-black font-bold">We keep losing customers</span> <span className="text-gray-400 mx-2">•</span>
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-20 tracking-tight">
          This is what we have delivered for our clients
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-20 gap-x-8">
          <FadeUp delay={100} className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-4">~<CountUp end={2} /> days</div>
            <div className="text-base text-gray-500 font-medium px-4">freed for founders and<br />leaders, per week</div>
          </FadeUp>
          <FadeUp delay={200} className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-4">+<CountUp end={40} />-<CountUp end={60} />%</div>
            <div className="text-base text-gray-500 font-medium px-4">reduction in<br />duplicated work,<br />rework, and<br />inefficiencies.</div>
          </FadeUp>
          <FadeUp delay={300} className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-4">+<CountUp end={20} />-<CountUp end={35} />%</div>
            <div className="text-base text-gray-500 font-medium px-4">revenue growth</div>
          </FadeUp>
          <FadeUp delay={400} className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-4">+<CountUp end={10} />-<CountUp end={15} />%</div>
            <div className="text-base text-gray-500 font-medium px-4">increase in customer<br />retention</div>
          </FadeUp>
          
          <FadeUp delay={500} className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-4"><CountUp end={30} />-<CountUp end={50} />%</div>
            <div className="text-base text-gray-500 font-medium px-4">faster execution<br />across teams</div>
          </FadeUp>
          <FadeUp delay={600} className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-4"><CountUp end={2} />-<CountUp end={4} />x</div>
            <div className="text-base text-gray-500 font-medium px-4">higher quality leads</div>
          </FadeUp>
          <FadeUp delay={700} className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-4"><CountUp end={43} />%</div>
            <div className="text-base text-gray-500 font-medium px-4">fewer mis-hires and<br />faster confidence in<br />new hires</div>
          </FadeUp>
          <FadeUp delay={800} className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-4 leading-tight">Aligned &<br />Accountable</div>
            <div className="text-base text-gray-500 font-medium px-4">Team Culture</div>
          </FadeUp>
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
        
        {/* Logos Marquee */}
        <div className="w-full mt-12 overflow-hidden bg-black py-10 border-y border-white/[0.14]">
          <div className="w-max flex items-center animate-[marquee_40s_linear_infinite]">
            {/* We render the sequence of logos twice to create the seamless infinite scroll effect */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center space-x-12 px-6">
                <Image src="/logos/logo-text-block-2.jpg" alt="logo-text-block-2" width={180} height={80} className="h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
                <Image src="/logos/clogo3a.jpg" alt="clogo3a" width={180} height={80} className="h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
                <Image src="/logos/Frame-17.jpg" alt="Frame 17" width={180} height={80} className="h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
                <Image src="/logos/insurancehub-with-bg-white.jpg" alt="insurancehub" width={180} height={80} className="h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
                <Image src="/logos/stydio-with-bg.jpg" alt="stydio" width={180} height={80} className="h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
                <Image src="/logos/instagram.jpg" alt="instagram" width={180} height={80} className="h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
                <Image src="/logos/man-cave-with-bg.jpg" alt="man cave" width={180} height={80} className="h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
                <Image src="/logos/bop-foundation-with-bg-white.jpg" alt="bop foundation" width={180} height={80} className="h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
                <Image src="/logos/nivishe.jpg" alt="nivishe" width={180} height={80} className="h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
              </div>
            ))}
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
          <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 text-xs font-bold tracking-wider uppercase text-white bg-primary hover:bg-primary-dark transition-colors rounded shadow-lg group">
            BOOK DISCOVERY CALL <span className="ml-2 font-normal text-lg leading-none group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
