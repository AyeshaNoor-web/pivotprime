import type { Metadata } from "next";
import { pageMetadata } from "@/content/metadata";
import EnquiryForm from "@/components/EnquiryForm";
import { WHATSAPP_URL } from "@/lib/flags";

export const metadata: Metadata = pageMetadata("contact");

export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const params = await searchParams;
  const sent = params.sent === "1";
  const error = params.error ?? null;

  return (
    <div className="flex flex-col min-h-screen pt-28 pb-20 bg-neutral-50/60">
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-12 md:py-16 w-full">
        {/* Main Frosted Card Container */}
        <div className="frosted-card-light rounded-[32px] p-8 sm:p-12 md:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Chapter header & Discovery call pitch */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full">
              <div>
                <span className="block font-sans font-semibold text-xs tracking-[0.22em] uppercase text-mid mb-3">
                  CHAPTER 05: START HERE
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-forest tracking-tight leading-tight mb-5">
                  Tell us what’s slowing you down.
                </h1>
                <p className="text-base sm:text-lg text-neutral-600 leading-relaxed mb-8">
                  Three fields, thirty seconds. We reply with a first read on your bottleneck and a time
                  for a 30-minute discovery call, with no pitch deck.
                </p>
              </div>

              {/* Direct channels & fallbacks */}
              <div className="pt-6 border-t border-neutral-200/80 space-y-4 mt-6">
                <p className="text-xs font-semibold text-neutral-500">
                  Prefer to talk now?{" "}
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-forest underline underline-offset-2 hover:text-mid transition-colors"
                  >
                    WhatsApp us on +971 52 440 1075
                  </a>
                </p>
                <p className="text-xs font-semibold text-neutral-500">
                  Or email directly:{" "}
                  <a
                    href="mailto:hello@pivotprime.ae"
                    className="font-bold text-forest underline underline-offset-2 hover:text-mid transition-colors"
                  >
                    hello@pivotprime.ae
                  </a>
                </p>
              </div>
            </div>

            {/* Right Column: Enquiry Form */}
            <div className="lg:col-span-6">
              <EnquiryForm initialStatus={sent ? "sent" : null} initialError={error} />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
