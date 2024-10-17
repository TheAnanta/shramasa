"use client";
import Link from "next/link";
import React, { useState } from "react";
import { CartItem } from "./components/CartItem";
import { MobileCartItem } from "./components/MobileCartItem";
import { useAuthContext } from "../context/AuthContext";
import Address from "@/components/Address";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [cart, setCart] = React.useState<any>(null);
  const [isLoading, setLoader] = React.useState(true);
  const [productQuantities, setProductQuantities] = React.useState<any>({});
  const [coupon, setCoupon] = useState("");
  const router = useRouter();
  const user = useAuthContext();

  const updateCart = async (
    productId: string,
    quantity: number,
    variant: number,
    isIncreased: boolean
  ) => {
    fetch("https://shramasa-server.onrender.com/api/cart/modify-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: productId,
        userId: user?.uid,
        quantity: quantity,
        variant: variant,
      }),
    }).then(async (response) => {
      if (response.status == 200) {
        localStorage.setItem(
          "cart",
          JSON.stringify({
            items:
              quantity == 0
                ? (
                    JSON.parse(localStorage.getItem("cart") ?? `{"items": []}`)[
                      "items"
                    ] as any[]
                  ).filter(
                    (item) =>
                      item.productId !== productId && item.variant !== variant
                  )
                : [
                    ...(
                      JSON.parse(
                        localStorage.getItem("cart") ?? `{"items": []}`
                      )["items"] as any[]
                    ).filter((item) => item.productId !== productId),
                    {
                      productId: productId,
                      quantity: quantity,
                      variant: variant,
                    },
                  ],
          })
        );
        const newProductQuantities: any = {
          ...productQuantities,
          [productId]: quantity,
        };
        setProductQuantities(newProductQuantities);

        console.log(newProductQuantities);
        // setCartItemQuantity(quantity);
      } else {
        alert("Failed to update the cart. " + (await response.json())["error"]);
      }
    });
  };

  React.useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://shramasa-server.onrender.com/api/cart/get-user-cart",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ userId: user?.uid }),
        }
      );
      const cartData = await response.json();
      const quants =
        cartData[0]?.items.map((item: any) => {
          return { [item.productId]: item.quantity };
        }) ?? [];
      console.log(cartData);
      setCart(cartData[0]);
      setProductQuantities(Object.assign({}, ...quants));
      setLoader(false);
    };
    getData();
  }, []);

  const handleRemoveItem = async (productId: string) => {
    const response = await fetch(
      "https://shramasa-server.onrender.com/api/cart/remove-item-from-cart",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ userId: "user1", productId }),
      }
    );
    const cartData = await response.json();
    setCart(cartData);
  };

  return (
    <div className="flex flex-col lg:flex-row py-8 px-[8.25%] bg-neutral-50 dark:bg-neutral-950 gap-4">
      <div className="grow">
        <h2 className="text-4xl font-semibold mb-8 soyuz-grotesk">Your cart</h2>
        <div className="px-4 md:px-8 rounded-2xl md:rounded-3xl shadow-sm bg-white dark:bg-neutral-900">
          <div className="md:hidden">
            {cart != null ? (
              cart.items?.map((item: any, index: number) => (
                <MobileCartItem
                  key={item.productId}
                  isFirstItem={index === 0}
                  name={item.name}
                  description={item.description}
                  image={item.image} // Assuming the first image is used
                  category={item.category}
                  quantity={item.quantity}
                  price={item.price}
                />
              ))
            ) : (
              <div></div>
            )}
          </div>
          {(cart?.items?.length ?? 0) > 0 ? (
            <table id="cart" className="hidden md:table">
              <thead className="font-bold">
                <tr>
                  <td>Product</td>
                  <td>Quantity</td>
                  <td>Cost</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {cart ? (
                  cart.items.map((item: any) => (
                    <CartItem
                      productId={item.productId}
                      key={item.productId}
                      price={item.price}
                      name={item.name}
                      description={item.description}
                      image={item.image}
                      variantName={item.variantName}
                      variant={item.variant}
                      category={item.category}
                      discount={item.discount}
                      quantity={productQuantities[item.productId] || 0}
                      updateCart={updateCart}
                    />
                  ))
                ) : isLoading ? (
                  <tr>
                    <td colSpan={4}>Loading...</td>
                  </tr>
                ) : (
                  <></>
                )}
                {cart && cart.outOfStockItems.length > 0 ? (
                  <tr>
                    <td colSpan={4}>
                      <p>Out of stock</p>
                    </td>
                    {cart.outOfStockItems.map((item: any) => (
                      <CartItem
                        productId={item.productId}
                        key={item.productId}
                        price={item.price}
                        name={item.name}
                        description={item.description}
                        category={item.category}
                        variantName={item.variantName}
                        variant={item.variant}
                        image={item.image}
                        discount={item.discount}
                        quantity={productQuantities[item.productId] || 0}
                        updateCart={updateCart}
                      />
                    ))}
                  </tr>
                ) : cart?.outOfStockItems.length <= 0 || !isLoading ? (
                  <></>
                ) : (
                  <tr>
                    <td colSpan={4}>Loading...</td>
                  </tr>
                )}
                <tr>
                  <td colSpan={4}>
                    <input
                      value={coupon}
                      onChange={(e) => {
                        setCoupon(e.target.value);
                      }}
                      placeholder="Enter your promo code"
                      className="border-b pb-1 text-sm dark:bg-neutral-900"
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={4}>
                    <div className="w-full px-6 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-950 flex">
                      <Link className="cursor-pointer flex" href={"/explore"}>
                        <span className="material-symbols-outlined">
                          chevron_left
                        </span>{" "}
                        Back to catalog
                      </Link>
                      <p className="font-bold ml-auto">
                        Total cost:
                        <span className="text-[#46A627]">
                          {" "}
                          ₹
                          {cart?.items
                            ?.map(
                              (item: any) =>
                                (item.price - item.discount) *
                                productQuantities[item.productId]
                            )
                            .reduce((a: number, b: number) => a + b, 0) || 0}
                        </span>
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div className="h-96 flex items-center justify-center flex-col">
              <span className={"material-symbols-outlined mb-4"}>
                shopping_bag
              </span>
              <p className="text-xl font-bold">Your cart is empty</p>
              <p className="md:w-[65ch] mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
                assumenda quibusdam nesciunt voluptatem officiis laborum
                corrupti. Similique laborum dolorum adipisci dolorem? Illo
                cumque, recusandae doloribus rem excepturi unde. Esse, alias.
              </p>
              <Link
                href={"/explore"}
                className="text-[#46A627] font-bold flex items-center gap-3"
              >
                Shop now{" "}
                <span className="material-symbols-outlined text-[#46A627]">
                  arrow_forward
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
      <Address
        canReviewCart={(cart?.items?.length ?? 0) > 0}
        onReviewCart={(address, deliveryMode) => {
          router.push(
            "/cart/review?address=" +
              address +
              "&deliveryMode=" +
              deliveryMode +
              (coupon && "&coupon=" + coupon)
          );
        }}
      />
    </div>
  );
}
