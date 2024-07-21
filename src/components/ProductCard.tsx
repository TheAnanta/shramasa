import React from "react";

export default function ProductCard() {
  return (
    <div>
      <img src="/cart/similar.svg" alt="" />
      <p className="text-[0.7rem] mt-4">face cream</p>
      <p className="text-sm py-[2px] font-medium">Lorem ipsum</p>
      <div className="flex items-end justify-start space-x-4 pb-6">
        <h3 className="font-medium">₹20.19</h3>{" "}
        <p className="opacity-50 line-through">₹22.35</p>
      </div>
    </div>
  );
}
