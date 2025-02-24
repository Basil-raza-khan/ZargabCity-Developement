import React from 'react';
import { Button } from "@/components/ui/button";

const Text = () => {
  return (
    <div className="w-full bg-white relative z-10">
        <div className="w-full h-0.5 bg-red-600 mb-12"/>
      {/* Dream Home Section */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-20">
        <div className="flex flex-col items-center space-y-4 max-w-[600px] mx-auto mb-10">
          {/* Arrow and Dream Home text */}
          <div className="flex items-center space-x-3 ">
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
            <span className="text-gray-800 text-base font-medium ">Dream Home</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl text-center text-gray-900 leading-tight">
            If you're Looking For Your <span className='text-red-600'>Dream</span>  Home
          </h2>
        </div>

        {/* Blog Post Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 p-2rounded-lg">
          {/* Card 1 */}
          <BlogCard
            image="/CardImage.svg"
            category="DESIGN"
            title="Creating Perfect Home Interior Design"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore."
            avatar="/avatar-1.jpg"
            author="John Doe"
            role="Interior Designer"
          />

          {/* Card 2 */}
          <BlogCard
            image="/CardImage.svg"
            category="ARCHITECTURE"
            title="Modern Architecture and Design"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore."
            avatar="/avatar-2.jpg"
            author="Jane Smith"
            role="Architect"
          />

          {/* Card 3 */}
          <BlogCard
            image="/CardImage.svg"
            category="LIFESTYLE"
            title="Living in a Smart Home"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore."
            avatar="/avatar-3.jpg"
            author="Mike Johnson"
            role="Tech Expert"
          />
        </div>
      </div>
    </div>
  );
};

// Blog Card Component
const BlogCard = ({ image, category, title, description, avatar, author, role }) => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border-2 border-gray-300 hover:shadow-slate-600 hover:rounded-xl rounded-lg">
      {/* Image */}
      <div className="p-4 pb-0">
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover rounded-xl" 
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <p className="text-red-600 text-xs font-medium mb-2">{category}</p>

        {/* Title and Arrow */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-gray-900 text-lg font-semibold flex-1 pr-3">{title}</h3>
          <svg
            className="w-5 h-5 text-gray-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 17L17 7M7 7h10v10"
            />
          </svg>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        {/* Author */}
        <div className="flex items-center">
          <img
            src={avatar}
            alt={author}
            className="w-10 h-10 rounded-full mr-2"
          />
          <div>
            <p className="text-gray-900 text-sm font-medium">{author}</p>
            <p className="text-gray-500 text-xs">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Text;
