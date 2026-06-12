import "./globals.css";

export const metadata = {
  title: "Turtle Stash | Shared Memory for AI Agents",
  description:
    "A shared memory and routing layer for AI agents that need persistent context, grounded answers, safer tools, and lower model costs."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
