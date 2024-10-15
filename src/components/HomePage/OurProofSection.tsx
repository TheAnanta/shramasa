"use client";
import { useEffect, useState, useRef } from "react";

export function OurProofSection() {
  const [images, setImages] = useState<string[]>([
    "/images/proofs/badge_one.svg",
    "/images/proofs/badge_one.svg",
    "/images/proofs/badge_one.svg",
    "/images/proofs/badge_one.svg",
    "/images/proofs/badge_one.svg",
  ]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollSpeed = 2; // Adjust this value for scroll speed

  // Function to add more images
  const loadMoreImages = () => {
    setImages((prevImages) => [
      ...prevImages,
      "/images/proofs/badge_one.svg",
      "/images/proofs/badge_one.svg",
      "/images/proofs/badge_one.svg",
      "/images/proofs/badge_one.svg",
      "/images/proofs/badge_one.svg",
    ]);
  };

  // Auto-scroll logic
  const autoScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;

      // If we've scrolled to the end, load more images
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        loadMoreImages();
      }

      // Auto-scroll incrementally
      scrollContainerRef.current.scrollLeft += scrollSpeed;
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    // Set up interval for auto-scrolling
    const scrollInterval = setInterval(() => {
      autoScroll();
    }, 20); // Adjust the interval time for smoother/slower scrolling

    // Clean up interval on component unmount
    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="dark:bg-neutral-800 bg-[#F2F2F2] grow rounded-3xl py-9 flex flex-col justify-between">
      <p className="text-xl font-semibold px-9">Our proof</p>
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            className="size-20 mx-[1.125rem]"
            alt={`badge ${index}`}
          />
        ))}
      </div>
    </div>
  );
}
