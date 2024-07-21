"use client";
import ProductCard from "@/components/ProductCard";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ProductPage({ params }: any) {
  const data = [
    {
      id: "soapnut-shampoo",
      name: "soapnut shampoo",
    },
    {
      id: "abc",
      name: "abc",
    },
  ];
  const product = data.filter((e) => e.id == params.id)[0];
  return (
    <div className="px-[8.25%] pb-12">
      <div
        className="mt-[20px] space-x-[2.77%] flex
    lg:flex-row items-center lg:items-start justify-center flex-col"
      >
        <img
          src="/images/products/hair-shampoo-banner.png"
          alt="product_image"
          className="rounded-xl pb-12 lg:pb-0 object-cover md:w-[80%] md:aspect-[0.85]"
        />
        <div className="flex flex-col items-start justify-start lg:w-1/2 xl:w-auto">
          <div className="flex pt-4 pb-4 gap-x-2 justify-between items-start w-full">
            <div>
              <h3 className="text-xl font-medium opacity-50 leading-4">
                hair care
              </h3>
              <h2 className="text-4xl font-bold">{product.name}</h2>
            </div>
            <div className="flex flex-col items-end">
              <img src="/cart/star.svg" alt="star" className="w-20" />
              <p className="text-sm font-semibold text-end">
                4.5 <span className="opacity-60">(200K)</span>
              </p>
            </div>
          </div>
          <p className="font-light line-clamp-[8] mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
            <br />
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
          </p>
          <h2 className="font-semibold py-3">Ingredients</h2>
          <div className="pl-5 flex items-start justify-start space-x-12 pb-6">
            <ul className="list-decimal">
              <li>Lorem</li>
              <li>Ispsum</li>
              <li>Creame</li>
              <li>Leaf Extracts</li>
            </ul>
            <div>
              <p className="font-extralight">20mg</p>
              <p className="font-extralight">10mg</p>
              <p className="font-extralight">5g</p>
              <p className="font-extralight">12g</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-[unset] items-end justify-between w-full pt-8">
            <div className="flex items-end justify-start space-x-6">
              <h3 className="font-semibold text-5xl">₹20.19</h3>{" "}
              <p className="text-[#999999] line-through text-2xl">₹22.35</p>
            </div>
            <div
              className="flex items-start
            gap-3"
            >
              <button className="py-2 px-6 font-semibold bg-[#46A627] text-white rounded-full">
                Add to cart
              </button>

              <img src="/cart/save.svg" alt="addtocart" className="size-10" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-center lg:items-start lg:justify-start lg:space-x-16 pt-8 md:pt-20">
        <div className="lg:w-1/2 pb-8 md:pb-20 lg:pb-0 shrink-0">
          <h2 className="font-semibold text-2xl">How to use?</h2>
          <p className="pt-4 pb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
          </p>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/BHACKCNDMW8?si=knO3UqTIR4QGQW8s"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="rounded-2xl w-full"
          ></iframe>
        </div>
        <div className="w-[1.5px] h-[70vh] bg-neutral-200 lg:flex hidden"></div>
        <div>
          <div className="flex gap-4 items-end">
            <div>
              <p className="text-sm my-2">Your review</p>
              <img src="/cart/star.svg" alt="star" className="w-32 pb-2 pt-2" />
              <textarea
                className="border rounded-xl w-full"
                cols={40}
                rows={4}
              />
            </div>
          </div>
          <h3 className="font-semibold text-xl mt-4">Similar Catalogue</h3>
          <div className="flex space-x-4 pt-6">
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </div>
    </div>
  );
}
