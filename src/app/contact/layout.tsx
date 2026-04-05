import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Case & Signal",
  description:
    "Get in touch with Case & Signal. Inquire about licensing, pilot sessions, facilitator training, or general questions.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
