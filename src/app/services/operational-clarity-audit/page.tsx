import type { Metadata } from "next";
import Service1ClarityAudit from "@/components/services/Service1ClarityAudit";

// Spec 4.1. Title and description are written for a human, not stuffed, and
// sized to the roughly 55 and 155 characters spec 4.5 asks for.
export const metadata: Metadata = {
  title: "Operational Clarity Audit | Pivot Prime",
  description: "A structured diagnosis of what is actually limiting the business, and a prioritised plan for fixing it.",
};

export default function Page() {
  return <Service1ClarityAudit />;
}
