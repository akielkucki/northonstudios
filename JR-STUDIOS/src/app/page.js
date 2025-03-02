import Image from "next/image";
import Header from "@/components/partials/Header";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import ClientsBanner from "@/components/ClientsBanner";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Brands from "@/components/ui/brands";
import Footer from "@/components/partials/Footer";

export default function Home() {
  return (
    <>


        <Header />
        <Brands/>
      <AboutUs id="about-us" />
      <Services id="services" />
      <ClientsBanner id="client-banner" />
      <Projects id="projects" />
      <Testimonials id="testimonials" />
      <Contact />
        <Footer />
    </>
  );
}
