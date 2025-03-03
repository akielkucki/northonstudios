import Image from "next/image";
import Header from "@/components/partials/Header";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import ClientsBanner from "@/components/ClientsBanner";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/partials/Footer";
import Trusted from "@/components/trusted";
import VideoCard from "@/components/videocard";

const navItems = [
    { id: 'HOME', label: 'HOME' },
    { id: 'ABOUT', label: 'ABOUT US' },
    { id: 'SERVICES', label: 'SERVICES' },
    { id: 'PROJECTS', label: 'PROJECTS' },
    { id: 'TESTIMONIALS', label: 'TESTIMONIALS' }
];
export default function Home() {
  return (
    <>

        <Header id={"home"}/>
        <VideoCard/>
        <Trusted />
      <AboutUs id="about" />
      <Services id="services" />
      <ClientsBanner id="client-banner" />
      <Projects id="projects" />
      <Testimonials id="testimonials" />
      <Contact id="contact" />
        <Footer />
    </>
  );
}
