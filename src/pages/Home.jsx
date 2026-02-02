// import { AccordionCustom } from "../components/home/AccordionCustom";
import Footer from "../components/Footer";
// import BrandList from "../components/home/BrandList";
// import HeroSection from "../components/home/HeroSection";
import { StickyNavbar } from "../components/navbars/StickyNavbar";
// import FeaturedCars from "./FeaturedCars";
// import { useGetRecentCarQuery } from "../services/carAPI";
import HomeSection from "../components/home/HomeSection";
import AboutUs from "./AboutUs";

import StartSection from "../ui/StartSection";
import SearchByBody from "../components/home/SearchByBody";
import Testimonials from "../ui/Testimonials";
import FeatureSection from "./FeaturedCars";
import CarFilterForm from "./user/CarFilterForm ";

const Home = () => {
  // const { data, error } = useFilterCarQuery();
  // const { data, error } = useGetRecentCarQuery();



  return (
    <div>
      <StickyNavbar />
  
      {/* Section A & B wrapper */}
      <div className="relative w-full">
        {/* Component A: HomeSection */}
        <HomeSection />
  
        {/* Component C: CarFilterForm */}
        <div className="w-full px-4 md:px-8
      md:absolute md:top-[550px] md:left-1/2 md:transform md:-translate-x-1/2 md:z-50">
          <CarFilterForm/>
        </div>
        
  
        {/* Spacer to make room for the overlapping form */}
       <div className="hidden md:block h-[200px]"></div>
  
        {/* Component B: FeaturedCars */}
        <FeatureSection/>
      </div>
  
      {/* Other sections below */}
      <AboutUs />
      <StartSection />
      <SearchByBody />
      <Testimonials />
      <Footer />
    </div>
  );
}
export default Home;
