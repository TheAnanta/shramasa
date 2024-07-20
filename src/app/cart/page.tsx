import React from "react";

export default function Cart() {
  return (
    <div className="mx-[8.25%] mt-[44px] space-x-[2.77%] flex
    lg:flex-row items-center lg:items-start justify-center flex-col">
      <img src="/cart/product_image.svg" alt="product_image" 
      className="rounded-xl pb-12 lg:pb-0 object-cover w-[60%] xl:w-auto"/>
      <div className="flex flex-col items-start justify-start lg:w-1/2 xl:w-auto">
        <h1 className="text-[50px] font-semibold pb-[18.33px] mt-[-18px]">Face Creame</h1>
        <img src="/cart/star.svg" alt="star" className="w-20 pb-[23.46px]" />
        <p className="pb-[23.46px] font-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
        </p>
        <p className="pb-[23.46px] font-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
        </p>
        <h2 className="font-semibold text-[20px] pb-7">Ingredients</h2>
        <div className="pl-5 flex items-start justify-start space-x-12 pb-[33px]">
          <ul className="list-disc">
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
        <div className="flex items-end justify-start space-x-6 pb-6">
          <h3 className="font-bold text-6xl">₹20.19</h3>{" "}
          <p className="font-semibold text-[#999999] line-through text-2xl">
            ₹22.35
          </p>
        </div>
        <div className="flex items-end space-x-6">
          <button className="w-[240px] py-[14px] px-[66.66px] bg-[#46A627] text-white rounded-full">
            Buy Now
          </button>
          <img src="/cart/addtocart.svg" alt="addtocart" />
          <img src="/cart/save.svg" alt="addtocart" />
        </div>
      </div>
    </div>
  );
}
