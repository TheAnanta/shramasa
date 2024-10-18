"use client";
import { useAuthContext } from "@/app/context/AuthContext";
import Link from "next/link";
import { useState } from "react";

export function WishlistCard(props: {
  productId: string;
  image: string;
  price: number;
  name: String;
  category: string;
  description: string;
  variant: number;
  variantName: string;
  uid: string;
  onRemove: (productId: string) => void;
}) {
  return (
    <tr className="border-t py-4">
      <td className="shink-0">
        <Link href={"/products/" + props.productId} className="flex gap-x-5">
          <img
            src={props.image}
            className="w-[125px] h-[125px] rounded-2xl bg-gray-100 object-cover dark:bg-gray-950"
          />
          <div className="flex flex-col">
            <p className="text-[0.65rem] font-medium uppercase opacity-65">
              {props.category.split("-").join(" ")}
            </p>
            <p className="text-[1.05rem] mt-2 font-semibold uppercase w-[14ch]">
              {props.name}
            </p>
            <p className="text-[0.98rem] opacity-60 mt-2">
              {props.variantName}
            </p>
          </div>
        </Link>
      </td>

      <td className="!mr-0">
        <div
          className="p-2 size-10 bg-gray-100 dark:bg-gray-950 rounded-xl cursor-pointer"
          onClick={() => {
            // props.updateCart(props.productId, 0, props.variant, false);
            fetch(
              "https://us-central1-shramasa-care.cloudfunctions.net/webApi/api/wishlist/modify-wishlist",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  productId: props?.productId,
                  userId: props?.uid,
                }),
              }
            ).then(async (response) => {
              if (response.status == 200) {
                localStorage.setItem(
                  "wishlist",
                  JSON.stringify({
                    wishlist: [
                      ...(
                        JSON.parse(localStorage.getItem("wishlist") ?? "")[
                          "wishlist"
                        ] as any[]
                      ).filter((item) => item !== props?.productId),
                    ],
                  })
                );
                props.onRemove(props.productId);
              }
            });
          }}
        >
          <span className="size-5 material-symbols-outlined">delete</span>
        </div>
      </td>
    </tr>
  );
}
