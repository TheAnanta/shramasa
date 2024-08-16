import { Product } from "@/types/interfaces";
import Link from "next/link";
import React from "react";

export default function ExploreItem(props: {
  productId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  discount: number;
}) {
  return (
    <Link
      className="flex flex-col items-start justify-center gap-y-2"
      href={"/products/" + props.productId}
    >
      <img
        src={"/images" + props.image}
        alt={props.image}
        className="w-full aspect-square rounded-md object-cover"
      />
      <p className="pt-4 text-lg">{props.name}</p>
      <p className="line-clamp-2 text-sm">{props.description}</p>
      <div className="flex space-x-3 items-end">
        <p className="text-lg font-semibold">₹{props.price - props.discount}</p>
        <p className="text-[#999999] line-through text-base">₹{props.price}</p>
      </div>
    </Link>
  );
}
