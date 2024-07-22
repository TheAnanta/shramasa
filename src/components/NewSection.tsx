import React from "react";

export default function NewSection() {
  return (
    <div className="flex flex-col items-center justify-center py-6">
      <img
        src="/newSection/new.png"
        alt="new.png"
        className="w-48 object-cover py-6"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full mx-[8.25%] gap-6 pb-6">
        <div className="flex flex-col items-start justify-center gap-y-2">
          <img src="/newSection/product.svg" alt="" />
          <p className="pt-4">face cream</p>
          <p>Lorem ipsum dolor amet sit contest</p>
          <div className="flex space-x-3 items-end">
            <p className="text-lg font-semibold">₹20.19 </p>
            <p className="text-[#999999] line-through text-base">₹22.35</p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-center gap-y-2">
          <img src="/newSection/product.svg" alt="" />
          <p className="pt-4">face cream</p>
          <p>Lorem ipsum dolor amet sit contest</p>
          <div className="flex space-x-3 items-end">
            <p className="text-lg font-semibold">₹20.19 </p>
            <p className="text-[#999999] line-through text-base">₹22.35</p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-center gap-y-2">
          <img src="/newSection/product.svg" alt="" />
          <p className="pt-4">face cream</p>
          <p>Lorem ipsum dolor amet sit contest</p>
          <div className="flex space-x-3 items-end">
            <p className="text-lg font-semibold">₹20.19 </p>
            <p className="text-[#999999] line-through text-base">₹22.35</p>
          </div>
        </div>
      </div>

      {/* New Section Below */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:justify-between md:items-center w-full gap-8 md:gap-x-6 pt-12">
        <div>
          <img
            src="/newSection/petal.svg"
            alt="petal"
            className="w-full h-auto object-cover"
          />
          <p className="p-1">hair care</p>
        </div>
        <div>
          <img
            src="/newSection/petal.svg"
            alt="petal"
            className="w-full h-auto object-cover"
          />
          <p className="p-1">hair care</p>
        </div>
        <div>
          <img
            src="/newSection/petal.svg"
            alt="petal"
            className="w-full h-auto object-cover"
          />
          <p className="p-1">hair care</p>
        </div>
        <div>
          <img
            src="/newSection/petal.svg"
            alt="petal"
            className="w-full h-auto object-cover"
          />
          <p className="p-1">hair care</p>
        </div>
        <div>
          <img
            src="/newSection/petal.svg"
            alt="petal"
            className="w-full h-auto object-cover"
          />
          <p className="p-1">hair care</p>
        </div>
        <div>
          <img
            src="/newSection/petal.svg"
            alt="petal"
            className="w-full h-auto object-cover"
          />
          <p className="p-1">hair care</p>
        </div>
      </div>
    </div>
  );
}
