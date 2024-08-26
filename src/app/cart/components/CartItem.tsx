"use client";
import { useAuthContext } from "@/app/context/AuthContext";
import Link from "next/link";
import { useState } from "react";

export function CartItem(props: {
  productId: string;
  image: string;
  price: number;
  name: String;
  description: string;
  category: string;
  variant: number;
  variantName: string;
  quantity: number;
  updateCart: (
    productId: string,
    quantity: number,
    variant: number,
    isIncreased: boolean
  ) => void;
}) {
  return props.quantity > 0 ? (
    <tr className="border-t">
      <td className="shink-0">
        <Link href={"/products/" + props.productId} className="flex gap-x-5">
          <img
            src={"/images/" + props.image}
            className="w-[125px] h-[125px] rounded-2xl bg-gray-100 object-cover dark:bg-gray-950"
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
        <div className="flex gap-x-[18px] items-center rounded-2xl bg-gray-100/20">
          <div
            className="size-10 p-2 aspect-square flex items-center justify-center cursor-pointer"
            onClick={() => {
              // Decrement quantity
              props.updateCart(
                props.productId,
                props.quantity - 1,
                props.variant,
                false
              );
            }}
          >
            <p>-</p>
          </div>
          <p>{props.quantity}</p>
          <div
            className="size-10 p-2 aspect-square flex items-center justify-center cursor-pointer"
            onClick={() => {
              // Increment quantity
              props.updateCart(
                props.productId,
                props.quantity + 1,
                props.variant,
                true
              );
            }}
          >
            <p className="">+</p>
          </div>
        </div>
      </td>
      <td className="font-semibold">₹{props.price * props.quantity}</td>
      <td className="!mr-0">
        <div
          className="p-2 size-10 bg-gray-100 dark:bg-gray-950 rounded-xl cursor-pointer"
          onClick={() => {
            props.updateCart(props.productId, 0, props.variant, false);
          }}
        >
          <span className="size-5 material-symbols-outlined">delete</span>
        </div>
      </td>
    </tr>
  ) : (
    <></>
  );
}
