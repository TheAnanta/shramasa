import { Product } from "@/types/interfaces";
import React from "react";

export default function Item(props: {
  name: string;
  description: string;
  price: string;
}) {
  return (
    <div className="flex flex-col items-start justify-center gap-y-2">
      <img src="/images/products/mockup.png" alt="" />
      <p className="pt-4">{props.name}</p>
      <p>{props.description}</p>
      <div className="flex space-x-3 items-end">
        <p className="text-lg font-semibold">₹{props.price}</p>
        <p className="text-[#999999] line-through text-base">
          {props.price + 12}
        </p>
      </div>
    </div>
  );
}
