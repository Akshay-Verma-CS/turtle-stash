import "./globals.css";

export const metadata = {
  title: "Turtle Stash | AI Agent Service Foundation",
  description:
    "A secure backend foundation for multi-provider AI agents, model routing, shared memory, safe database tools, and grounded answers."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
