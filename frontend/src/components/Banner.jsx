import React from "react";
import { Button } from "@/components/ui/button";

const Banner = () => {
    return (
        <div className="w-full h-screen flex relative mt-48 md:mt-40 bg-white">
            <div className="container mx-auto px-4 relative">
                {/* Left Content */}
                <div className="w-full md:max-w-[50%] text-center md:text-left md:ml-8 mb-0 md:mb-32">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-black mb-5">
                        We Are A Leading
                        <br />
                        Real Estate <span className="text-red-500">Agency</span>
                    </h1>
                    <p className="text-gray-600 text-base md:text-lg mt-1 md:mt-4 mb-1 md:mb-6">
                        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.Nec Turpis Felis. Maecenas Vestibulum At Nulla A Molestie.
                    </p>
                    <div className="mt-8 md:mt-6">
                        <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-lg rounded-md shadow-md">
                            Explore
                        </Button>
                    </div>
                </div>
                {/* Right Image */}
                <div className="absolute left-9 -translate-x-1/2 md:translate-x-0 md:right-[-16%] md:left-auto w-[190%] md:w-[120%] h-full flex md:items-start md:justify-end md:top-[180px] z-0 -mt-48">
                    <img
                        src="/BannerImage.svg"
                        alt="House in Hand"
                        className="w-[200%] md:w-[140%] h-auto object-contain transform md:opacity-100"
                    />
                </div>
            </div>
        </div>
    );
};

export default Banner;