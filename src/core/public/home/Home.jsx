import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import Search from "../search/Search";
import HeroSection from "./HeroSection";

const Home = () => {
  return (
    <>
      <div className="min-h-screen mx-auto max-w-[1300px] mt-2">
        <Navbar />
        <HeroSection />
        <div id="search-section">
          <Search />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;