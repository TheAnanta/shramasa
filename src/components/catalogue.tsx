import React from "react";

export default function Catalogue() {
  return (
    <div>
      <img src="/cart/similar.svg" alt="" />
      <h1>face cream</h1>
      <h2>Lorem ipsum</h2>
      <div className="flex items-end justify-start space-x-6 pb-6">
        <h3 className="font-bold text-xl">₹20.19</h3>{" "}
        <p className="font-semibold text-[#999999] line-through text-lg">
          ₹22.35
        </p>
      </div>
    </div>
  );
}
