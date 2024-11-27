"use client";
import { CartItem } from "@/app/cart/components/CartItem";
import { useAuthContext } from "@/app/context/AuthContext";
import { WishlistCard } from "@/components/WishlistCard";
import { useEffect, useState } from "react";

export default function Page() {
  const userId = useAuthContext()?.uid;
  const [wishlist, setWishlist] = useState<any>([]);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    fetch(
      "https://us-central1-shramasa-care.cloudfunctions.net/webApi/api/wishlist/get-user-wishlist/" +
        userId
    ).then(async (request) => {
      if (request.status === 200) {
        const pr = (await request.json())
          .map((item: any) => item.items)
          .filter((e: string) => e.length > 0)
          .map(async (e: string) => {
            if (e === "") return;
            try {
              const response = await fetch(
                "https://us-central1-shramasa-care.cloudfunctions.net/webApi/api/products/get-product-by-id?productId=" +
                  e,
                {
                  method: "GET",
                  headers: { "Content-Type": "application/json" },
                }
              );

              if (!response.ok) {
                throw new Error("Failed to fetch product data");
              }

              const data = await response.json();
              return data;
            } catch (error) {
              console.error("Error fetching product data:", error);
            }
          });
        const prData = await Promise.all(pr);
        setWishlist(prData);
      } else {
        alert("Error: " + (await request.json()).error);
      }
      setLoading(false); // Update loading state when fetch is done
    });
  }, []);

  return (
    <div className="px-28">
      <h2 className="text-4xl soyuz-grotesk">Wishlist</h2>
      {loading ? ( // Show loading spinner if loading is true
        <div className="h-[40vh] flex flex-col items-center justify-center">
          <div className="loader"></div>
          <h2 className="text-2xl py-4">Loading your wishlist...</h2>
        </div>
      ) : (
        <div className="flex flex-col gap-4 my-4">
          {wishlist.map((item: any) => (
            <WishlistCard
              productId={item?.productId}
              uid={userId || ""}
              key={item?.productId}
              price={item?.price}
              name={item?.name}
              category={item?.category}
              description={item?.description}
              image={item?.images[0]}
              variantName={item?.variants[0]}
              variant={item?.variants[0]}
              onRemove={(productId: string) => {
                setWishlist(
                  wishlist.filter((item: any) => item.productId !== productId)
                );
              }}
            />
          ))}
          {wishlist.length === 0 && (
            <div className="h-[40vh] flex flex-col items-center justify-center">
              <h2 className="text-2xl py-8 px-8 bg-neutral-100 text-center w-max rounded-xl">
                <span className="material-symbols-outlined">shopping_cart</span>
                <br />
                No items in wishlist
              </h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
