import React from "react";
import { Button } from "@/components/ui/button";

const Banner = () => {
    return (
        <div className="w-full h-screen flex bg-white overflow-hidden mt-2 relative">
            <div className="w-full max-w-[1400px] px-14 md:px-22 flex flex-col-reverse md:flex-row items-center justify-between pt-10 md:pt-28">

                {/* Left Content */}
                <div className="w-full md:max-w-[50%] text-center md:text-left md:ml-8 mb-10 md:mb-32">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight text-black">
                        We Are A Leading
                        <br />
                        Real Estate <span className="text-red-500">Agency</span>
                    </h1>
                    <p className="text-gray-600 text-base md:text-lg mt-4">
                        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.Nec Turpis Felis. Maecenas Vestibulum At Nulla A Molestie.
                    </p>
                    <div className="mt-6 md:mb-1 mb-12">
                        <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-lg rounded-md shadow-md">
                            Explore
                        </Button>
                    </div>
                </div>

                {/* Right Content - Image */}
                <div className="absolute left-9 -translate-x-1/2 md:translate-x-0 md:right-[-8%] md:left-auto p-2 w-[220%] mb-40 md:w-[105%] h-full flex md:items-start md:justify-end md:top-[80px] z-0">
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
