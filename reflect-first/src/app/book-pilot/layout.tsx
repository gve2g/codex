import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Pilot Session | Reflect First",
  description:
    "Book a facilitated pilot session to experience Reflect First before committing to a license.",
};

export default function BookPilotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
