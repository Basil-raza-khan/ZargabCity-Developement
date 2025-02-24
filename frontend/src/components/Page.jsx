import React from 'react';
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from 'lucide-react';

const ContactCard = ({ icon: Icon, title, description, buttonText }) => {
  return (
    <div className="flex flex-col items-center space-y-5">
      {/* Icon Circle */}
      <div className="w-12 h-12 rounded-full bg-red-100 border-4 border-red-50 flex items-center justify-center">
        <Icon className="w-6 h-6 text-red-600" />
      </div>

      {/* Content */}
      <div className="text-center space-y-2">
        <h3 className="text-gray-900 text-lg font-semibold">{title}</h3>
        <p className="text-gray-800 text-sm">{description}</p>
      </div>

      {/* Button */}
      <Button variant="link" className="text-red-600 hover:text-red-700">
        {buttonText}
      </Button>
    </div>
  );
};

const ContactSection = () => {
  return (
    <div className="w-full bg-white py-16 mt-6">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          {/* Contact Us with Arrow */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 relative">
              <svg
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                className="w-full h-full text-red-600 transform rotate-45"
                strokeWidth="3"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
            <span className="text-gray-800 text-base font-medium uppercase">Contact Us</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get in Touch with Us
          </h2>
          <p className="text-gray-600 max-w-2xl">
            We're here to help and answer any question you might have
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <ContactCard
            icon={Mail}
            title="Email Us"
            description="Our friendly team is here to help"
            buttonText="hi@yourdomain.com"
          />
          <ContactCard
            icon={MapPin}
            title="Office"
            description="Come say hello at our office"
            buttonText="View on Google maps"
          />
          <ContactCard
            icon={Phone}
            title="Phone"
            description="Mon-Fri from 9am to 5pm"
            buttonText="+1 (555) 000-0000"
          />
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Other sections */}
      <ContactSection />
    </div>
  );
};

export default Page;

