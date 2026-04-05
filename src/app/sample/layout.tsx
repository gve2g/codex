import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download a Sample Scenario | Case & Signal",
  description:
    "Download a free sample scenario from the Frontier Technologies module. Includes briefing pack, role assignments, and facilitator notes.",
};

export default function SampleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
