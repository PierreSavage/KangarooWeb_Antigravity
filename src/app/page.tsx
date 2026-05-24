import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-transparent">
      {/* Premium Shrinking Navbar */}
      <Navbar />
      
      {/* Interactive Hero + 3D Canvas */}
      <Hero />
      
      {/* Filterable selected work grid */}
      <Portfolio />
      
      {/* About statistics counter section */}
      <About />
      
      {/* Infinite testimonials/brand logo marquee */}
      <Testimonials />
      
      {/* Glowing cyber contact form */}
      <Contact />
      
      {/* Waving particle 3D grid footer */}
      <Footer />
    </div>
  );
}
