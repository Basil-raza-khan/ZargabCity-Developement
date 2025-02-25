import React from 'react';
import { Button } from "@/components/ui/button";

const FooterSection = ({ title, content }) => {
  return (
    <div className="p-4">
      <h3 className="text-red-600 text-2xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-300/80 leading-relaxed">{content}</p>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] text-white w-screen relative left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] pb-12 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contact Section */}
          <FooterSection
            title="Contact"
            content="Find out all the ways to enjoy luxury residential life around the world. A. SeeStrasse 21, Zurich, CH M. +0 2256 035 34434"
          />

          {/* FAQs Section */}
          <FooterSection
            title="FAQs"
            content="How long does the process take? How long does the process take? How long does the process take? How long does the process take?"
          />

          {/* Useful Links Section */}
          <FooterSection
            title="Useful Links"
            content="Property Video Tour Blog Terms of services"
          />

          {/* Enquire Form Section */}
          <div className="p-4">
            <h3 className="text-red-600 text-2xl font-semibold mb-4">Enquire</h3>
            <form className="space-y-4">
              {/* Full Name Input */}
              <div className="border-b border-white/80">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full bg-transparent text-gray-300/80 py-2 px-1.5 focus:outline-none"
                />
              </div>

              {/* Email Input */}
              <div className="border-b border-white/80">
                <input
                  type="email"
                  placeholder="E-Mail ID"
                  className="w-full bg-transparent text-gray-300/80 py-2 px-1.5 focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit"
                className="border border-white/80 text-gray-300/80 px-8 py-2 hover:bg-white/10 transition-colors"
              >
                submit
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright Text */}
        <div className="text-center mt-16">
          <p className="text-white text-sm">All Rights For This Website Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
