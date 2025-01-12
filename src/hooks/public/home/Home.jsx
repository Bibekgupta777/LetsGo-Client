import React from "react";
import Navbar from "../../../components/Navbar";
import HeroSection from "./HeroSection";
import Search from "../search/Search";
import Footer from "../../../components/Footer";

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
