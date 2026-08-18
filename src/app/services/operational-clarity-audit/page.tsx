import type { Metadata } from "next";
import { pageMetadata } from "@/content/metadata";
import Service1ClarityAudit from "@/components/services/Service1ClarityAudit";

// Spec 4.1. Title and description are written for a human, not stuffed, and
// sized to the roughly 55 and 155 characters spec 4.5 asks for.
export const metadata: Metadata = pageMetadata("clarityAudit");

export default function Page() {
  return <Service1ClarityAudit />;
}
