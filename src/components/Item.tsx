import React from "react";

export default function Item() {
  return (
    <div className="flex flex-col items-start justify-center gap-y-2">
      <img
        src="/newSection/product.svg"
        alt=""
        className="w-full aspect-[1.54]"
      />
      <p className="pt-4">face cream</p>
      <p>Lorem ipsum dolor amet sit contest</p>
      <div className="flex space-x-3 items-end">
        <p className="text-lg font-semibold">₹20.19 </p>
        <p className="text-[#999999] line-through text-base">₹22.35</p>
      </div>
    </div>
  );
}
