import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Reflect First",
  description:
    "Get in touch with Reflect First. Inquire about licensing, pilot sessions, certification, or general questions.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
