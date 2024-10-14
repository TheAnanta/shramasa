"use client";
import Link from "next/link";

import styles from "./hero.module.css";
import { useState } from "react";

export function Carousel(props: { carouselItems: CarouselItem[] }) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  // useEffect(() => {
  //   setInterval(() => {
  //     setCarouselIndex(
  //       carouselIndex == props.carouselItems.length - 1 ? 0 : carouselIndex + 1
  //     );
  //   }, 3000);
  // }, [carouselIndex]);
  return (
    <div className={`${styles.carousel} rounded-3xl relative`}>
      {/* <div className=" flex justify-start h-full w-max"> */}
      {/* {props.carouselItems.map((item) => {
          return CarouselItem(item);
        })} */}
      <CarouselItem carouselItem={props.carouselItems[carouselIndex]} />
      <div className="absolute top-0 right-0 p-4 flex gap-3 flex-col">
        {props.carouselItems.map((e, index) => {
          return (
            <div
              onClick={() => setCarouselIndex(index)}
              className={`size-3 rounded-full cursor-pointer ${
                carouselIndex == index ? "bg-white" : "bg-green-500 opacity-50"
              }`}
            />
          );
        })}
      </div>
      {/* </div> */}
    </div>
  );
}

export function CarouselItem(props: { carouselItem: CarouselItem }) {
  return (
    <Link
      key={props.carouselItem.productId}
      href={`/products/${props.carouselItem.productId}`}
    >
      <img
        src={props.carouselItem.image}
        className="h-full w-full object-cover rounded-3xl"
      />
    </Link>
  );
}
