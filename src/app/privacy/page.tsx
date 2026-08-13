import type { Metadata } from "next";
import {
  PRIVACY_INTRO,
  PRIVACY_SECTIONS,
  PRIVACY_SIGNED_OFF,
  PRIVACY_TITLE,
} from "@/content/privacy";

// Spec 2.7. Required before the diagnostic goes live: it captures an email
// address and returns a report, which is processing of personal data under the
// UAE Personal Data Protection Law.
export const metadata: Metadata = {
  title: "Privacy policy | Pivot Prime",
  description:
    "What Pivot Prime collects, why we collect it, how long we keep it, and what you can ask us to do about it.",
  // Not indexed until the text is signed off by a UAE-qualified adviser.
  robots: PRIVACY_SIGNED_OFF ? undefined : { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <section className="mx-auto w-full max-w-3xl px-4 pt-32 pb-24 sm:px-6 md:pt-40 lg:px-8">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
          {PRIVACY_TITLE}
        </h1>

        {!PRIVACY_SIGNED_OFF && (
          // Visible on purpose. This page creates a legal obligation, and the
          // spec requires a UAE-qualified adviser to check it before launch.
          // Better that a visitor sees a draft notice than that an unreviewed
          // policy is presented as binding.
          <p
            role="note"
            className="mb-10 rounded-md border border-forest/20 bg-forest/[0.04] p-5 text-sm leading-relaxed text-neutral-700"
          >
            This policy is a working draft awaiting review by a UAE-qualified adviser. It is
            published here so the wording can be checked, and it is not yet in force.
          </p>
        )}

        <p className="mb-10 text-lg leading-relaxed text-neutral-600">{PRIVACY_INTRO}</p>

        <div className="space-y-10">
          {PRIVACY_SECTIONS.map((section) => (
            <section key={section.heading}>
              <h2 className="mb-3 text-sm font-bold tracking-[0.12em] text-forest uppercase">
                {section.heading}
              </h2>
              <p className="leading-relaxed text-neutral-600">{section.body}</p>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
