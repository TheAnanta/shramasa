"use client";
import { useState, useEffect } from "react";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl">
      <div
        className="flex transition-transform ease-in-out duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div className="w-full flex-shrink-0 rounded-2xl" key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-auto "
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function SlideCarousal() {
  const images = [
    "/images/products/hair-care/all-hair-care/flawless-finish-hair-removal-cream.jpg",
    "/images/products/hair-care/all-hair-care/pro-kera-ultimate-repair-shampoo.jpg",
    "/images/products/hair-care/all-hair-care/soapnut-shampoo-1.png",
  ];

  return (
    <div className="flex w-[50%] flex-col items-center justify-center rounded-2xl">
      <Carousel images={images} />
    </div>
  );
}
