import React from "react";
import Navbar from "../components/Navbar";
import HeroContent from "../components/HeroContent";
import HeroPreview from "../components/HeroPreview";

const NotesHero: React.FC = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Navbar></Navbar>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-20 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <HeroContent></HeroContent>
          <HeroPreview></HeroPreview>
        </div>
      </section>
    </div>
  );
};

export default NotesHero;
