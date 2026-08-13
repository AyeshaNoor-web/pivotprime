import type { Metadata } from "next";
import Service2FractionalLeadership from "@/components/services/Service2FractionalLeadership";

// Spec 4.2. Title and description are written for a human, not stuffed, and
// sized to the roughly 55 and 155 characters spec 4.5 asks for.
export const metadata: Metadata = {
  title: "Fractional Leadership | Pivot Prime",
  description: "Senior leadership for a season, not a lifetime.",
};

export default function Page() {
  return <Service2FractionalLeadership />;
}
