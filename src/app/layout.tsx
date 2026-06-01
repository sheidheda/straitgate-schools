import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";
import { getGeneral } from "@/lib/content";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Straitgate Schools",
    template: "%s | Straitgate Schools",
  },
  description:
    "Straitgate Schools — nurturing academic excellence with Christ-centered values across multiple campuses in Lagos and Ogun State, Nigeria.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const general = getGeneral();

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" async defer />
      </head>
      <body className="min-h-full flex flex-col">
        <LayoutShell general={general}>
          {children}
        </LayoutShell>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.netlifyIdentity) {
                window.netlifyIdentity.init({
                  APIUrl: "https://ephemeral-crepe-e6f2b7.netlify.app/.netlify/identity"
                });
                window.netlifyIdentity.on("init", function(user) {
                  if (!user) {
                    window.netlifyIdentity.on("login", function() {
                      document.location.href = "/admin/";
                    });
                  }
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
