import Viewfinder from "@/components/Viewfinder";
import Cursor from "@/components/Cursor";
import LensIntro from "@/components/LensIntro";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import About from "@/components/About";
import ServiceStack from "@/components/ServiceStack";
import Process from "@/components/Process";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Viewfinder />
      <Cursor />
      <LensIntro />
      <nav>
        <a href="#top">ATF / Media House</a>
        <div className="links">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>
      <Hero />
      <Ticker />
      <About />
      <ServiceStack />
      <Process />
      <Contact />
      <footer>
        <div className="wrap">
          <span>ATF Media House</span>
          <span>Against the Frame</span>
        </div>
      </footer>
    </>
  );
}
