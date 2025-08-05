import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CopilotKit with Agno",
  description: "My custom Next.js app with an Agno AI agent.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CopilotKit runtimeUrl="/api/copilotkit" agent="agno_agent">
          {children}
        </CopilotKit>
      </body>
    </html>
  );
}
