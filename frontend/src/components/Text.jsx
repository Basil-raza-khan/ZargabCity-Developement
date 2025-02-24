import React from 'react';
import { Button } from "@/components/ui/button";
import { BsCupHot } from "react-icons/bs";
import { LiaBedSolid } from "react-icons/lia";
import { GiBathtub } from "react-icons/gi";
import { PiGarageDuotone } from "react-icons/pi";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"; // Import ShadCN Carousel

const Text = () => {
    return (
        <div className="w-full bg-white relative z-10">
            <div className="container mx-auto px-4 py-16">
                {/* Red line divider */}
                <div className="w-screen relative left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] h-0.5 bg-red-600 mb-14" />

                {/* Dream Home Section */}
                <div className="max-w-[1200px] mx-auto px-4 md:px-20">
                    <div className="flex flex-col items-center space-y-4 max-w-[600px] mx-auto mb-10">
                        {/* Arrow and Dream Home text */}
                        <div className="flex items-center space-x-3">
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
                            <span className="text-gray-800 text-base font-medium">Dream Home</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl text-center text-gray-900 leading-tight">
                            If you're Looking For Your <span className='text-red-600'>Dream</span> Home
                        </h2>
                    </div>

                    {/* Blog Post Carousel */}
                    <Carousel className="w-full">
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {blogData.map((blog, index) => (
                                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                                    <BlogCard {...blog} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>

                {/* Red Divider */}
                <div className="w-screen relative left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] h-0.5 bg-red-600 my-20 " />
                {/* About Section */}
                <div className="w-screen relative left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] h-1 bg-red-600" />
                <div className="w-screen relative left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] bg-black py-20">
                    <div className="max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-2">
                        <div className="flex-1">
                            <img src="/MainImage.svg" alt="Main Logo" className="md:w-[50%] w-[48%] max-w-[410px] ml-24" />
                        </div>
                        <div className="flex-1 text-white">
                            <div className="flex items-center space-x-2">
                                <div className="w-5 h-5 relative overflow-hidden mb-8">
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
                                <span className="text-white text-3xl md:text-2xl mb-8">About Zarghab City</span>
                            </div>
                            <p className="text-gray-300 mb-12 pr-8 text-left">
                            A property description is made up of 2 parts: key features and property description. The key features section is your opportunity to tell potential tenants about the key selling points of your property, in a bullet point format. The property description section allows you to go in to more depth.
                            </p>

                            {/* Icons */}
                            <div className="grid grid-cols-2 gap-4 mb-10"> 
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-300 flex justify-center items-center gap-3">
                                        <LiaBedSolid className='text-red-600 w-8 h-8' /> Beds
                                    </span>
                                    <h3>2</h3>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-300 flex justify-center items-center gap-3">
                                        <GiBathtub className='text-red-600 w-8 h-8'/> Baths
                                    </span>
                                </div>
                                <div className="h-0.5 bg-white col-span-2 my-2"/>
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-300 flex justify-center items-center gap-3">
                                        <BsCupHot className='text-red-600 w-8 h-8' /> Kitchen
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-300 flex justify-center items-center gap-3">
                                        <PiGarageDuotone className='text-red-600 w-8 h-8'/>Garages
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-screen relative left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] h-1 bg-red-600" />
            </div>
        </div>
    );
};

// Sample blog data for mapping
const blogData = [
    {
        image: "/CardImage.svg",
        category: "ARCHITECTURE",
        title: "Modern Architecture and Design",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        avatar: "/avatar-2.jpg",
        author: "Jane Smith",
        role: "Architect",
    },
    {
        image: "/CardImage.svg",
        category: "ARCHITECTURE",
        title: "Modern Architecture and Design",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        avatar: "/avatar-2.jpg",
        author: "Jane Smith",
        role: "Architect",
    },
    {
        image: "/CardImage.svg",
        category: "LIFESTYLE",
        title: "Living in a Smart Home",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        avatar: "/avatar-3.jpg",
        author: "Mike Johnson",
        role: "Tech Expert",
    },
    {
        image: "/CardImage.svg",
        category: "LIFESTYLE",
        title: "Living in a Smart Home",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        avatar: "/avatar-3.jpg",
        author: "Mike Johnson",
        role: "Tech Expert",
    },
    {
        image: "/CardImage.svg",
        category: "LIFESTYLE",
        title: "Living in a Smart Home",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        avatar: "/avatar-3.jpg",
        author: "Mike Johnson",
        role: "Tech Expert",
    },
];

// Blog Card Component
const BlogCard = ({ image, category, title, description, avatar, author, role }) => {
    return (
        <div className="h-full bg-white shadow-md hover:shadow-xl hover:shadow-slate-400 transition-shadow duration-300 border border-gray-200 rounded-lg  hover:rounded-xl overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
                <img src={image} alt={title} className="w-full h-48 object-cover" />
            </div>
            <div className="p-5 ">
                <p className="text-red-600 text-sm font-medium uppercase tracking-wider mb-2">{category}</p>
                <h3 className="text-gray-900 text-xl font-semibold mb-3 line-clamp-2">{title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
                <div className="flex items-center mt-auto ">
                    <img src={avatar} alt={author} className="w-10 h-10 rounded-full mr-3" />
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
