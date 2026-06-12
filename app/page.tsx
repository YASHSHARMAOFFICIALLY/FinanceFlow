import React from "react";
import Navbar from "../components/landing/navbar"
import Hero from "../components/landing/hero"
import Features from "../components/landing/feature"
import Testimonials from "../components/landing/testimonel"
import CTA from "../components/landing/cta"
import FinanceTools from "../components/landing/financetool"
import Footer from "../components/landing/footer"


export default function App() {
  return (
    <div className="bg-white dark:bg-[#0A0A0A] min-h-screen font-sans antialiased">
      <Navbar />
      <main>
      <Hero/>
        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-[#F0F0F0] dark:bg-[#222]" />
        </div>
        <Features />
        <FinanceTools />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
 