import React from 'react';
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <div className="w-full bg-white min-h-screen relative z-10 "> {/* Changed to min-h-screen for better responsiveness */}
      <div className="w-full h-0.5 bg-red-600 mb-6"/>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-20 py-8 md:py-12 mt-28"> {/* Adjusted padding for better mobile view */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <span className="text-sm font-medium uppercase tracking-wider">Features and Benefits</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
              We Offer Secure Plot Booking For{' '}
              <span className="text-red-600">Property Builders.</span>
            </h2>
            <p className="text-gray-600 mb-6">
              Our agents will guide you through the entire booking process.
            </p>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Get Started
            </Button>
          </div>

          {/* Right Content - Single Large Image */}
          <div className="w-full md:w-1/2 relative">
            <img 
              src="/landingpageimage.png" 
              alt="Property View" 
              className="w-full h-auto rounded-lg shadow-xl transform transition-transform hover:scale-105 object-cover"
              style={{maxHeight: "80vh"}} /* Limit height on larger screens */
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
