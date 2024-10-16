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
      key={props.productId}
      className="flex flex-col items-start justify-center gap-y-2"
      href={"/products/" + props.productId}
    >
      <img
        src={props.image}
        alt={props.image}
        className="w-full aspect-[1.2] rounded-md object-cover bg-[#F2F2F2] border"
      />
      <p className="pt-2 text-lg">{props.name}</p>
      <p className="line-clamp-2 text-sm opacity-60">{props.description}</p>
      <div className="flex space-x-3 items-end">
        <p className="text-lg font-semibold">₹{props.price - props.discount}</p>
        <p className="text-[#999999] line-through text-base">₹{props.price}</p>
      </div>
    </Link>
  );
}
