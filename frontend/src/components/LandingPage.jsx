import React from 'react';
import { Button } from "@/components/ui/button";
import AnimatedComponent from './animations/AnimatedComponent';

const LandingPage = () => {
  return (
    <AnimatedComponent>
      <div className="w-full bg-white min-h-screen relative z-10">
        <div className="w-screen relative left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] h-0.5 bg-red-600 md:mt-[-50px]" />
        <div className="container mx-auto px-4 py-8 md:py-12 mt-28">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <div className="w-5 h-5 relative overflow-hidden">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-full h-full text-red-600 transform rotate-45"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
                <span className="text-sm font-medium uppercase tracking-wider">Features and Benefits</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
                We Offer Secure Plot Booking For{' '}
                <span className="text-red-600">Property Builders.</span>
              </h2>
              <p className="text-gray-600 mb-8">
                Our agents will guide you through the entire booking process.
              </p>
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Get Started
              </Button>
            </div>

            {/* Right Content - Single Large Image */}
            <div className="w-full md:w-1/2 relative md:mt-20 mt-14">
              <img 
                src="/landingpageimage.png" 
                alt="Property View" 
                className="w-full h-auto md:mb-20 rounded-lg shadow-xl transform transition-transform hover:scale-105 object-cover"
                style={{maxHeight: "80vh"}} /* Limit height on larger screens */
              />
            </div>
          </div>
        </div>
      </div>
    </AnimatedComponent>
  );
};

export default LandingPage;
