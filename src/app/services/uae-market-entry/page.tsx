import type { Metadata } from "next";
import Service5MarketEntry from "@/components/services/Service5MarketEntry";

// Spec 4.5. Title and description are written for a human, not stuffed, and
// sized to the roughly 55 and 155 characters spec 4.5 asks for.
export const metadata: Metadata = {
  title: "UAE Market Entry | Pivot Prime",
  description: "From licence to a functioning, properly priced operation.",
};

export default function Page() {
  return <Service5MarketEntry />;
}
