import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Pilot Workshop | Case & Signal",
  description:
    "Book a facilitated pilot workshop to experience Case & Signal before committing to a license.",
};

export default function BookPilotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
