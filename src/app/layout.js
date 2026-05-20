import { Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/saas/Navbar";

const font = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Pet Product Studio - generate photorealistic pet and product ad scenes",
  description: "Generate beautiful, brand-agnostic ad images featuring your pet product and pets in use.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full w-full" style={{ colorScheme: 'light' }}>
      <body className={`${font.className} h-full w-full flex flex-col antialiased bg-white`}>
        <Providers>
          <Navbar />
          <div className="flex-1 flex flex-col overflow-hidden">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
