import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import Journey from "@/components/Journey";
import Work from "@/components/Work";
import Projects from "@/components/Projects";
import Capabilities from "@/components/Capabilities";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Statement />
        <Journey />
        <Work />
        <Projects />
        <Capabilities />
        <CTA />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
