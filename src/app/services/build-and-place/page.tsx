import type { Metadata } from "next";
import { pageMetadata } from "@/content/metadata";
import Service3BuildPlace from "@/components/services/Service3BuildPlace";

// Spec 4.3. Title and description are written for a human, not stuffed, and
// sized to the roughly 55 and 155 characters spec 4.5 asks for.
export const metadata: Metadata = pageMetadata("buildAndPlace");

export default function Page() {
  return <Service3BuildPlace />;
}
