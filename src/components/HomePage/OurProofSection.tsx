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
      "/images/products/hair-care/all-hair-care/pro-kera-ultimate-repair-shampoo.jpg",
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
    <div className="dark:bg-neutral-800 rounded-3xl py-2">
      <div className="flex flex-col text-left items-center justify-center px-16">
        <p className="text-xl font-bold">One of Top Products #1</p>
        <img
          src={
            "/images/products/hair-care/all-hair-care/pro-kera-ultimate-repair-shampoo.jpg"
          }
          className="w-24 my-6"
        />
        <a href="/explore?categoryId=hair-care" className="hover:text-[#46a627] hover:underline bg-white hover:bg-white">
          Explore Items
        </a>
      </div>
    </div>
  );
}
