import Header from "@/components/partials/Header";
import VideoCard from "@/components/videocard";
import Trusted from "@/components/trusted";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import ClientsBanner from "@/components/ClientsBanner";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/partials/Footer";


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
