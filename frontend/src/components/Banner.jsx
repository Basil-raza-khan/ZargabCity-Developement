import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Banner = () => {
    return (
        <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{
                type: "spring",
                stiffness: 50,
                damping: 15,
                duration: 1.5
            }}
            className="w-full h-screen flex relative mt-40 bg-white"
        >
            <div className="container mx-auto px-4 relative">
                {/* Left Content */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        type: "spring",
                        bounce: 0.4
                    }}
                    className="w-full md:max-w-[50%] text-center md:text-left md:ml-8 mb-0 md:mb-32 relative z-10"
                >
                    <motion.h1 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-black mb-5"
                    >
                        We Are A Leading
                        <br />
                        Real Estate <motion.span 
                            initial={{ color: "#000" }}
                            animate={{ color: "#ef4444" }}
                            transition={{ delay: 1, duration: 0.5 }}
                            className="text-red-500"
                        >Agency</motion.span>
                    </motion.h1>
                    <motion.p 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-gray-600 text-base md:text-lg mt-1 md:mt-4 mb-1 md:mb-6"
                    >
                        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.Nec Turpis Felis. Maecenas Vestibulum At Nulla A Molestie.
                    </motion.p>
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="mt-8 md:mt-6"
                    >
                        <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-lg rounded-md shadow-md">
                            Explore
                        </Button>
                    </motion.div>
                </motion.div>
                {/* Right Image */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 1,
                        delay: 0.2
                    }}
                    className="absolute top-1/2 left-[10%] transform -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:right-[-16%] md:left-auto w-[200%] md:w-[120%] h-full flex md:items-start md:justify-end md:top-[310px] z-0"
                >
                    <img
                        src="/BannerImage.svg"
                        alt="House in Hand"
                        className="w-full md:w-[140%] h-auto object-contain transform opacity-100"
                    />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Banner;