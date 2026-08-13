"use client";

import { useState } from "react";
import Service1ClarityAudit from "./Service1ClarityAudit";
import Service2FractionalLeadership from "./Service2FractionalLeadership";
import Service3BuildPlace from "./Service3BuildPlace";
import Service4TechBuilds from "./Service4TechBuilds";
import Service5MarketEntry from "./Service5MarketEntry";

export default function ServiceTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    "Clarity Audit",
    "Fractional Leadership",
    "Build and Place",
    "Technology Builds",
    "UAE Market Entry",
  ];

  return (
    <div className="w-full">
      {/* Page Switcher Nav (Sticky) */}
      <nav className="sticky top-0 z-50 bg-[#013325]/95 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 h-16 overflow-x-auto scrollbar-hide">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`whitespace-nowrap px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                activeTab === idx
                  ? "bg-[#00d76d] text-[#013325]"
                  : "bg-transparent text-[#a3c3b5] hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      {/* Active Service Content */}
      <div className="w-full">
        {activeTab === 0 && <Service1ClarityAudit />}
        {activeTab === 1 && <Service2FractionalLeadership />}
        {activeTab === 2 && <Service3BuildPlace />}
        {activeTab === 3 && <Service4TechBuilds />}
        {activeTab === 4 && <Service5MarketEntry />}
      </div>
    </div>
  );
}
