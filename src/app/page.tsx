import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<div className="h-16" />}>
        <Navbar />
      </Suspense>
      <HeroSection />
      <ServicesSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
