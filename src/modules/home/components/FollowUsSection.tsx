"use client"

import React from "react";
import { InstagramEmbed } from "react-social-media-embed";
// import Banner from "/public/followus-banner.jpg"; // ensure banner image exists

export default function FollowUsSection() {
  return (
    <section className="flex flex-col px-5 py-10 sm:px-36">
      <div className="relative">
        {/* <img src={Banner.src} alt="Follow us banner" className="h-[30vh] w-full object-cover rounded-lg" /> */}
        <h2 className="absolute inset-0 flex items-center justify-center text-5xl sm:text-8xl uppercase font-title text-white p-5">
          Folge uns auf unsere Reisen
        </h2>
      </div>
      <div className="mt-8">
        <InstagramEmbed url="https://instagram.com/van7.at" className="w-full" />
      </div>
    </section>
  );
}
