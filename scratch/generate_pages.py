import os

pages = {
    'what-we-do': 'What We Do',
    'for-founders': 'For Founders',
    'for-smes': 'For SMEs',
    'for-corporate-leaders': 'For Corporate Leaders',
    'for-corporate-owners': 'For Corporate Owners',
    'who-we-are': 'Who We Are',
    'our-blog': 'Prime Insights',
    'contact': 'Contact Us'
}

template = """import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col min-h-[70vh]">
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed font-light">
            This is a placeholder for the {title} page content. We are currently migrating content to the new Next.js platform.
          </p>
          <Link href="/" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-primary hover:bg-primary-dark transition-colors rounded-full shadow-lg">
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
"""

for path, title in pages.items():
    with open(f'src/app/{path}/page.tsx', 'w', encoding='utf-8') as f:
        f.write(template.replace('{title}', title))
