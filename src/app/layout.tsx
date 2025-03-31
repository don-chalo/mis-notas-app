import "@/styles/globals.css";

import type { Metadata } from "next";
import { Toaster } from "sonner";

import { ThemeProvider } from "@/providers/ThemeProvider";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Mis Notas"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <div className="flex min-h-screen w-full flex-col">
            <Header />
            <main className="flex flex-1 flex-col px-4 pt-10 xl:px-8">
              {children}
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
