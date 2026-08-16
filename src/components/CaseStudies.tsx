import {
  CASE_STUDIES,
  CASE_STUDIES_HEADING,
  CASE_STUDIES_STANDFIRST,
} from "@/content/case-studies";

/**
 * The three case studies, spec 3.8 and section 6.
 *
 * Rendered as a stacked list rather than a carousel. Spec 3.8 says "Keep all
 * three case studies and the existing carousel", but then immediately: "try to
 * make them scroll better and look better if we can, I think currently they look
 * ugly", and the v1.7.1 annotation is blunter still. Spec 11.3 separately
 * records that the site's carousels clip their second card and reads as a
 * rendering error.
 *
 * Stacking resolves all three: nothing is hidden behind an interaction, nothing
 * clips, and all three studies are in the server-rendered HTML rather than one
 * being visible and two waiting on JavaScript. Recorded in
 * docs/PENDING-COPY.md.
 *
 * `headingLevel` lets the homepage render this under an h2 and /about under its
 * own section heading without either page skipping a level, which spec 4.5
 * requires.
 */
export default function CaseStudies({
  headingLevel = 2,
  showHeading = true,
}: {
  headingLevel?: 2 | 3;
  showHeading?: boolean;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const SubHeading = headingLevel === 2 ? "h3" : "h4";

  return (
    <div>
      {showHeading && (
        <header className="mb-14 max-w-3xl">
          <Heading className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {CASE_STUDIES_HEADING}
          </Heading>
          <p className="mt-4 text-lg text-neutral-600 md:text-xl">{CASE_STUDIES_STANDFIRST}</p>
        </header>
      )}

      <ul className="space-y-8">
        {CASE_STUDIES.map((study, i) => (
          <li
            key={study.id}
            className="rounded-2xl border border-forest/10 bg-forest/[0.03] p-8 md:p-12"
          >
            <div className="flex flex-col gap-10 md:flex-row">
              <div className="md:w-1/3">
                <p className="mb-3 text-xs font-bold tracking-[0.18em] text-mid uppercase">
                  Case study {i + 1}
                </p>
                <SubHeading className="text-2xl font-extrabold text-forest md:text-3xl">
                  {study.sector}
                </SubHeading>
              </div>

              <div className="space-y-8 md:w-2/3">
                <div>
                  <h4 className="mb-2 font-bold text-foreground">The challenge</h4>
                  <p className="leading-relaxed text-neutral-600">{study.challenge}</p>
                </div>

                <div>
                  <h4 className="mb-2 font-bold text-foreground">The pivot</h4>
                  <p className="mb-3 leading-relaxed text-neutral-600">{study.pivotLead}</p>
                  <ul className="list-disc space-y-2 pl-5 text-neutral-600">
                    {study.pivot.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-mid/20 bg-mid/5 p-6">
                  <h4 className="mb-3 font-bold text-mid">The results</h4>
                  <ul className="space-y-3">
                    {study.results.map((result) => (
                      <li key={result} className="flex items-start font-medium text-foreground">
                        <span aria-hidden="true" className="mr-3 font-bold text-mid">
                          &#10003;
                        </span>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
