"use client";
import { useAuthContext } from "@/app/context/AuthContext";
import Link from "next/link";
import { useState } from "react";

export function FixedCartItem(props: {
  productId: string;
  image: string;
  price: number;
  name: String;
  description: string;
  category: string;
  variant: number;
  variantName: string;
  quantity: number;
  discount: number;
}) {
  return props.quantity > 0 ? (
    <tr className="border-t">
      <td className="shink-0">
        <Link href={"/products/" + props.productId} className="flex gap-x-5">
          <img
            src={"/images/" + props.image}
            className="w-[125px] h-[125px] rounded-2xl bg-neutral-100 object-cover dark:bg-neutral-950"
          />
          <div className="flex flex-col">
            <p className="text-[0.65rem] font-medium uppercase opacity-65">
              {props.category.split("-").join(" ")}
            </p>
            <p className="text-[1.05rem] mt-2 font-semibold uppercase w-[14ch]">
              {props.name}
            </p>
            <p className="text-[0.98rem] opacity-60 mt-auto">
              {props.variantName}
            </p>
          </div>
        </Link>
      </td>
      <td>
        <div className="flex gap-x-[18px] items-center rounded-2xl bg-neutral-100/20">
          <p>{props.quantity} Nos</p>
        </div>
      </td>
      <td className="font-semibold">
        ₹{(props.price - props.discount) * props.quantity}{" "}
        <span className="line-through opacity-50 ml-2">
          ₹{props.price * props.quantity}{" "}
        </span>
      </td>
    </tr>
  ) : (
    <></>
  );
}
