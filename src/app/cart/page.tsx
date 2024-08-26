"use client";
import Link from "next/link";
import React from "react";
import { CartItem } from "./components/CartItem";
import { MobileCartItem } from "./components/MobileCartItem";
import { useAuthContext } from "../context/AuthContext";
import Address from "@/components/Address";

export default function CartPage() {
  const [cart, setCart] = React.useState<any>(null);
  const [productQuantities, setProductQuantities] = React.useState<any>({});
  const user = useAuthContext();

  const updateCart = async (
    productId: string,
    quantity: number,
    variant: number,
    isIncreased: boolean
  ) => {
    fetch("http://localhost:3001/api/cart/modify-cart", {
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
                    JSON.parse(localStorage.getItem("cart") ?? "")[
                      "items"
                    ] as any[]
                  ).filter(
                    (item) =>
                      item.productId !== productId && item.variant !== variant
                  )
                : [
                    ...(
                      JSON.parse(localStorage.getItem("cart") ?? "")[
                        "items"
                      ] as any[]
                    ).filter((item) => item.productId !== productId),
                    {
                      productId: productId,
                      quantity: quantity,
                      variant: variant,
                    },
                  ],
          })
        );
        setProductQuantities({
          ...productQuantities,
          [productId]: quantity,
        });
        // setCartItemQuantity(quantity);
      } else {
        alert("Failed to update the cart. " + (await response.json())["error"]);
      }
    });
  };

  React.useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "http://localhost:3001/api/cart/get-user-cart",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ userId: user?.uid }),
        }
      );
      const cartData = await response.json();
      const quants = cartData[0].items.map((item: any) => {
        return { [item.productId]: item.quantity };
      });
      console.log(cartData);
      setCart(cartData[0]);
      setProductQuantities(Object.assign({}, ...quants));
    };
    getData();
  }, []);

  const handleRemoveItem = async (productId: string) => {
    const response = await fetch(
      "http://localhost:3001/api/cart/remove-item-from-cart",
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
    <div className="flex flex-col lg:flex-row py-8 px-[8.25%] bg-gray-50 dark:bg-gray-950 gap-4">
      <div className="grow">
        <h2 className="text-4xl font-semibold mb-8 soyuz-grotesk">Your cart</h2>
        <div className="px-4 md:px-8 rounded-2xl md:rounded-3xl shadow-sm bg-white dark:bg-gray-900">
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
                    quantity={
                      productQuantities[item.productId] || item.quantity
                    }
                    updateCart={updateCart}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={4}>Loading...</td>
                </tr>
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
                      quantity={
                        productQuantities[item.productId] || item.quantity
                      }
                      updateCart={updateCart}
                    />
                  ))}
                </tr>
              ) : cart?.outOfStockItems.length <= 0 ? (
                <></>
              ) : (
                <tr>
                  <td colSpan={4}>Loading...</td>
                </tr>
              )}
              <tr>
                <td colSpan={4}>
                  <input
                    placeholder="Enter your promo code"
                    className="border-b pb-1 text-sm dark:bg-gray-900"
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={4}>
                  <div className="w-full px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-950 flex">
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
                              item.price * productQuantities[item.productId]
                          )
                          .reduce((a: number, b: number) => a + b, 0) || 0}
                      </span>
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Address />
    </div>
  );
}
