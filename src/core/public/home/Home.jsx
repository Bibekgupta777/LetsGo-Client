import React from "react";
import Navbar from "../../../components/Navbar";
import HeroSection from "./HeroSection";

const Home = () => {
  return (
    <>
      <div className="min-h-screen mx-auto max-w-[1300px] mt-2">
        <Navbar/>
        <HeroSection />
      </div>
    </>
  );
};

export default Home;
