import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { headingFont, bodyFont } from './fonts';

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { getNavigation } from "@/prismicio";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const navigation = await getNavigation();

  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable} antialiased`}>
      <body>
        <Navbar slices={navigation.data.slices} logo={navigation.data.logo} />
          <main className="content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}