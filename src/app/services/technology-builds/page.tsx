import type { Metadata } from "next";
import Service4TechBuilds from "@/components/services/Service4TechBuilds";

// Spec 4.4. Title and description are written for a human, not stuffed, and
// sized to the roughly 55 and 155 characters spec 4.5 asks for.
export const metadata: Metadata = {
  title: "Technology Builds | Pivot Prime",
  description: "Software, automation and AI, built after the diagnosis rather than instead of it.",
};

export default function Page() {
  return <Service4TechBuilds />;
}
