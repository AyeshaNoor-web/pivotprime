import type { Metadata } from "next";
import { pageMetadata } from "@/content/metadata";

// Spec 2.1 renames Prime Insights to Insights. Stage one scope item 5 is "a
// simple listing of existing posts, no new editorial features". There are no
// posts yet and the spec supplies no copy for this page, so it states that
// plainly rather than inventing an editorial promise.
export const metadata: Metadata = pageMetadata("insights");

export default function InsightsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <section className="mx-auto w-full max-w-3xl px-4 pt-32 pb-24 sm:px-6 md:pt-40 lg:px-8">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Insights
        </h1>
        <p className="text-lg leading-relaxed text-neutral-600">
          Writing from the team on operations, execution and what actually moves a business. The
          first pieces are on their way.
        </p>

        {/*
          TODO(client): posts. Spec 2.3 also lists an insights signup as one of
          three things that send or receive mail, and says it "does not exist yet
          and needs building". It is out of stage one scope, which ships the
          contact form as the only backend, so no signup is rendered here rather
          than one that collects an address and does nothing with it.
        */}
      </section>
    </div>
  );
}
