"use client";
import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";

// Also install this npm i --save-dev @types/react-lottie
import Lottie from "react-lottie";

import { cn } from "@/lib/utils";

import dynamic from "next/dynamic";

// Import other components that might also cause SSR issues dynamically if needed
import { BackgroundGradientAnimation } from "./GradientBg";

const GridGlobe = dynamic(
  () => import("./GridGlobe").then((mod) => mod.default),
  { ssr: false }
);

import animationData from "@/data/confetti.json";
import MagicButton from "../MagicButton";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        // change gap-4 to gap-8, change grid-cols-3 to grid-cols-5, remove md:auto-rows-[18rem], add responsive code
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  id,
  className,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  id: number;
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const [copy, setCopy] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("contact@jsmastery.pro");
    setCopy(true);
  };

  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4",
        className
      )}
      style={{
        //   add these two
        //   you can generate the color from here https://cssgradient.io/
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      {/* add img tage for the bento background */}
      <div className={`${id === 6 && "flex justify-center"} h-full`}>
        <div className="w-full h-full absolute">
          {img && (
            <img
              src={img}
              alt={img}
              className={cn(imgClassName, "object-cover object-center ")}
            />
          )}
        </div>
        <div
          className={`absolute right-0 bottom-0 ${id === 5 && "w-full opacity-80"}`}
        >
          {spareImg && (
            <img
              src={spareImg}
              alt={spareImg}
              //   animate this filter to show at the top of the bento card
              className="object-cover object-center w-full h-full"
            />
          )}
        </div>
        {id === 6 && (
          // add order-5 for the globe to go last
          <BackgroundGradientAnimation>
            <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
              {/* remove this one */}
              {/* <canvas id="gradient-canvas" className="w-full h-full" /> */}
            </div>
          </BackgroundGradientAnimation>
        )}

        <div
          className={cn(
            titleClassName,
            "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10"
          )}
        >
          {/* change the color of the globe */} 
          {id === 2 && <GridGlobe />}

          {/* Tech stack */} 
          {id === 3 && (
            <div className="flex gap-1 lg:gap-5 w-fit absolute -right-3 lg:-right-2">
              <div className="flex flex-col gap-3 md:gap-3 text-sm lg:text-base py-4 lg:py-8 font-bold opacity-50 lg:opacity-100 uppercase">
                Next.js
                Tailwind CSS
                JavaScript
              </div>
              <div className="flex flex-col gap-3 md:gap-3 text-sm lg:text-base py-4 lg:py-8 font-bold opacity-50 lg:opacity-100 uppercase">
                TypeScript
                Framer Motion
                Three.js
              </div>
            </div>
          )}

          {id === 6 && (
            <div className="mt-5 relative">
              {/* button for copy the email */} 
              <div
                className={`absolute -bottom-5 right-0 ${
                  copy ? "block" : "block"
                }`}
              >
                <Lottie options={{
                  loop: copy,
                  autoplay: copy,
                  animationData,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }} height={200} width={400} />
              </div>

              <MagicButton
                title={copy ? "Email is Copied!" : "Copy my email address"}
                icon={<IoCopyOutline />}
                position="left"
                handleClick={handleCopy}
                otherClasses="!bg-[#161A31] !font-bold !text-sm lg:!text-base"
              />
            </div>
          )}

          <div className="font-sans font-extralight text-[#c1c2d3] text-sm md:text-xs lg:text-base z-10">
            {description}
          </div>

          <div className="font-sans text-lg lg:text-3xl max-w-96 font-bold z-10">
            {title}
          </div>
        </div>
      </div>
    </div>
  );
};
