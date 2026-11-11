import Viewfinder from "@/components/Viewfinder";
import Cursor from "@/components/Cursor";
import LensIntro from "@/components/LensIntro";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import About from "@/components/About";
import ServiceStack from "@/components/ServiceStack";
import Partners from "@/components/Partners";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Viewfinder />
      <Cursor />
      <LensIntro />
      <Nav />
      <Hero />
      <Ticker />
      <About />
      <ServiceStack />
      <Partners />
      <Process />
      <Contact />
      <Footer />
    </>
  );
}
