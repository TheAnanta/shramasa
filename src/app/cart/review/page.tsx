"use client";
import { useAuthContext } from "@/app/context/AuthContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MobileCartItem } from "../components/MobileCartItem";
import { CartItem } from "../components/CartItem";
import { FixedCartItem } from "../components/FixedCartItem";
import { useRouter, useSearchParams } from "next/navigation";
import { RadioGroup } from "material-you-react";
import Razorpay from "razorpay";

const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

const makePayment = async (
  amount: number,
  handler: (
    razorpayPaymentId: string,
    paymentStatus: string,
    paymentMethodRazorpay: string,
    paymentMethodDetails: any,
    amount: number
  ) => void
) => {
  const res = await initializeRazorpay();

  if (!res) {
    alert("Razorpay SDK Failed to load");
    return;
  }

  // Make API call to the serverless API
  const data = await fetch("/api/razorpay", {
    method: "POST",
    body: JSON.stringify({ amount: amount }),
  }).then((t) => t.json());
  console.log(data);
  var options = {
    key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
    name: "Shramasa | #Order",
    currency: data.currency,
    amount: data.amount,
    order_id: data.id,
    description:
      "Thank you for your purchasing from Shramasa. We'll reach back to you with organics soon.",
    handler: function (response: any) {
      fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_id: response.razorpay_payment_id,
        }),
      })
        .then(async (e) => await e.json())
        .then((e: any) => {
          handler(
            response.razorpay_payment_id,
            e.error == null ? "SUCCESS" : "FAILED",
            e.method == "card"
              ? e.card.type == "debit"
                ? "DEBITCARD"
                : "CREDITCARD"
              : e.method.toString().toUpperCase(),
            e.method == "card"
              ? e.card
              : e.method == "netbanking"
              ? e.bank
              : e.method == "wallet"
              ? e.wallet
              : e.vpa,
            amount
          );
        });
    },
  };

  const paymentObject = new (window as any).Razorpay(options);
  paymentObject.open();
};

export default function ReviewCartPage() {
  const searchParams = useSearchParams();
  const [cart, setCart] = React.useState<any>(null);
  const [isLoading, setLoader] = React.useState(true);
  const [coupon, setCoupon] = useState<any>(null);
  const [userAddresses, setUserAddresses] = useState<any[]>([]);
  const deliveryMode = searchParams.get("deliveryMode");
  const [minCartValue, setMinCartValue] = useState<any | null>(null);
  const userSelectedAddress = parseInt(searchParams.get("address") || "0");
  const couponId = searchParams.get("coupon");
  const user = useAuthContext();
  const [paymentMethod, setPaymentMethod] = useState("");
  const router = useRouter();

  React.useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://us-central1-shramasa-care.cloudfunctions.net/webApi/api/cart/get-user-cart",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ userId: user?.uid }),
        }
      );
      const cartData = await response.json();
      setCart(cartData[0]);
      setLoader(false);
    };
    getData();
  }, []);
  useEffect(() => {
    fetch(
      "https://us-central1-shramasa-care.cloudfunctions.net/webApi/api/address/get-all-addresses-of-user/" +
        user?.uid,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(async (e) => {
      const result = await e.json();
      setUserAddresses(result);
    });
  }, []);

  useEffect(() => {
    if (couponId && cart) {
      fetch(
        "https://us-central1-shramasa-care.cloudfunctions.net/webApi/api/coupons/validate-coupon",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            couponCode: couponId,
          }),
        }
      )
        .then(async (response) => {
          if (response.status != 200) {
            alert("Error applying coupon.");
          } else {
            const tempCoupon = (await response.json())["coupon"];
            console.log(tempCoupon);
            if (
              (cart?.items
                ?.map(
                  (item: any) => (item.price - item.discount) * item.quantity
                )
                .reduce((a: number, b: number) => a + b, 0) || 0) >
              tempCoupon.minCartValue / 1.18
            ) {
              setCoupon(tempCoupon);
            } else {
              setMinCartValue(
                tempCoupon.minCartValue / 1.18 -
                  (cart?.items
                    ?.map(
                      (item: any) =>
                        (item.price - item.discount) * item.quantity
                    )
                    .reduce((a: number, b: number) => a + b, 0) || 0)
              );
            }
          }
        })
        .catch((e) => {
          alert("Error applying coupon.");
        });
    }
  }, [couponId, cart]);

  return (
    <div className="flex flex-col lg:flex-row py-8 px-[8.25%] bg-neutral-50 dark:bg-neutral-950 gap-4">
      <div className="">
        <h2 className="text-4xl font-semibold mb-8 soyuz-grotesk">Review</h2>
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
          {
            <table id="cart" className="hidden md:table">
              <thead className="font-bold">
                <tr>
                  <td>Product</td>
                  <td>Quantity</td>
                  <td>Cost</td>
                </tr>
              </thead>
              <tbody>
                {cart ? (
                  cart.items.map((item: any) => (
                    <FixedCartItem
                      productId={item.productId}
                      key={item.productId}
                      price={item.price}
                      name={item.name}
                      description={item.description}
                      image={item.image}
                      variantName={item.variantName}
                      variant={item.variant}
                      category={item.category}
                      quantity={item.quantity}
                      discount={item.discount}
                    />
                  ))
                ) : isLoading ? (
                  <tr>
                    <td colSpan={4}>Loading...</td>
                  </tr>
                ) : (
                  <></>
                )}

                <tr>
                  <td colSpan={1}></td>
                  <td className="text-end whitespace-pre-wrap" colSpan={3}>
                    <div className="pr-6 text-sm">
                      <p className="text-[#000000]/60">
                        Taxes and others{"       "}{" "}
                        <span className="text-[#A4A4A4] opacity-100">
                          +{" "}
                          {(
                            (cart?.items
                              ?.map(
                                (item: any) =>
                                  (item.price - item.discount) * item.quantity
                              )
                              .reduce((a: number, b: number) => a + b, 0) ||
                              0) * 0.18
                          ).toFixed(2)}
                        </span>
                      </p>
                      {coupon && (
                        <p className="mt-3 text-[#000000]/60">
                          <span className="font-medium">Applied</span>:
                          {coupon.couponCode}
                          {"       "}{" "}
                          <span className="text-[#A4A4A4]">
                            -{" "}
                            {Math.min(
                              coupon.type == "PERCENTAGE"
                                ? ((cart?.items
                                    ?.map(
                                      (item: any) =>
                                        (item.price - item.discount) *
                                        item.quantity
                                    )
                                    .reduce(
                                      (a: number, b: number) => a + b,
                                      0
                                    ) || 0) *
                                    coupon.discount) /
                                    100
                                : (cart?.items
                                    ?.map(
                                      (item: any) =>
                                        (item.price - item.discount) *
                                        item.quantity
                                    )
                                    .reduce(
                                      (a: number, b: number) => a + b,
                                      0
                                    ) || 0) - coupon.discount,
                              coupon.maxDiscount
                            ).toFixed(2)}
                          </span>
                        </p>
                      )}
                      {couponId && coupon == null && minCartValue && (
                        <p className="text-red-400">
                          Add{" "}
                          <span className="font-semibold text-red-500">
                            ₹{minCartValue.toFixed(2)}
                          </span>{" "}
                          worth items to apply coupon{" "}
                          <span className="font-semibold text-red-500">
                            {couponId}
                          </span>
                          !
                        </p>
                      )}
                    </div>
                  </td>
                </tr>

                <tr>
                  <td colSpan={4}>
                    <div className="w-full px-6 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-950 flex">
                      <Link className="cursor-pointer flex" href={"/cart"}>
                        <span className="material-symbols-outlined">
                          chevron_left
                        </span>{" "}
                        Back to cart
                      </Link>
                      <p className="font-bold ml-auto">
                        Total cost:
                        <span className="text-[#46A627]">
                          {" "}
                          ₹
                          {(
                            (cart?.items
                              ?.map(
                                (item: any) =>
                                  (item.price - item.discount) * item.quantity
                              )
                              .reduce((a: number, b: number) => a + b, 0) ||
                              0) +
                            (cart?.items
                              ?.map(
                                (item: any) =>
                                  (item.price - item.discount) * item.quantity
                              )
                              .reduce((a: number, b: number) => a + b, 0) ||
                              0) *
                              0.18 -
                            (coupon &&
                              Math.min(
                                coupon.type == "PERCENTAGE"
                                  ? ((cart?.items
                                      ?.map(
                                        (item: any) =>
                                          (item.price - item.discount) *
                                          item.quantity
                                      )
                                      .reduce(
                                        (a: number, b: number) => a + b,
                                        0
                                      ) || 0) *
                                      coupon.discount) /
                                      100
                                  : (cart?.items
                                      ?.map(
                                        (item: any) =>
                                          (item.price - item.discount) *
                                          item.quantity
                                      )
                                      .reduce(
                                        (a: number, b: number) => a + b,
                                        0
                                      ) || 0) - coupon.discount,
                                coupon.maxDiscount
                              ))
                          ).toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          }
        </div>
      </div>
      <div className="grow flex flex-col gap-4">
        <div className="grow flex flex-col gap-5 px-6 py-6 rounded-3xl shadow-sm bg-white dark:bg-neutral-900">
          <p>Delivery information</p>
          {userAddresses[userSelectedAddress || 0] && (
            <div className={`shrink-0 rounded-xl text-sm w-full`}>
              <p className={`text-xl font-semibold mb-2`}>
                {userAddresses[userSelectedAddress || 0]?.name}
              </p>
              <p>
                {userAddresses[userSelectedAddress || 0]?.houseNumber},{" "}
                {userAddresses[userSelectedAddress || 0]?.floor}
              </p>
              <p>{userAddresses[userSelectedAddress || 0]?.apartment}</p>
              <p>{userAddresses[userSelectedAddress || 0]?.landmark}</p>
              <p>
                {userAddresses[userSelectedAddress || 0]?.address} -{" "}
                {userAddresses[userSelectedAddress || 0]?.pincode}
              </p>
            </div>
          )}
          <div className="flex h-[1px] bg-neutral-200"></div>
          <p>
            <span className="font-medium">Delivery Mode:</span>{" "}
            {deliveryMode == "0" ? "Express" : "Standard"}
          </p>
          <div className="flex h-[1px] bg-neutral-200"></div>
          <p className="font-bold">Payment Information</p>
          {/* <div className="space-y-3">
            <div className="flex gap-3">
              <input radioGroup="payment" type="radio" />
              <p>Cash On delivery</p>
            </div>
            <div className="flex gap-3">
              <input radioGroup="payment" type="radio" />
              <p>Pay now</p>
            </div>
          </div> */}
          <div className="radio">
            <RadioGroup
              children={["Cash On Delivery", "Pay Now"]}
              value={paymentMethod}
              onChange={(_) => {
                setPaymentMethod(_);
              }}
            />
          </div>
          <button
            onClick={async () => {
              const response = await fetch(
                "https://us-central1-shramasa-care.cloudfunctions.net/webApi/api/orders/instantiate-order",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    userId: user?.uid,
                    cartId: cart.cartId,
                    addressId:
                      userAddresses[userSelectedAddress || 0].addressId,
                    couponCode: couponId,
                    paymentMethod:
                      paymentMethod == "Cash On Delivery"
                        ? "CashOnDelivery"
                        : "Razorpay",
                  }),
                }
              );
              if (paymentMethod == "Cash On Delivery") {
                console.log(response);
                if (response.status == 201) {
                  localStorage.removeItem("cart");
                  router.push(
                    "/order/successful?id=" + (await response.json()).orderId
                  );
                } else {
                  router.push("/order/failed");
                }
                return;
              }
              makePayment(
                parseInt(
                  (
                    (cart?.items
                      ?.map(
                        (item: any) =>
                          (item.price - item.discount) * item.quantity
                      )
                      .reduce((a: number, b: number) => a + b, 0) || 0) +
                    (cart?.items
                      ?.map(
                        (item: any) =>
                          (item.price - item.discount) * item.quantity
                      )
                      .reduce((a: number, b: number) => a + b, 0) || 0) *
                      0.18 -
                    (coupon &&
                      Math.min(
                        coupon.type == "PERCENTAGE"
                          ? ((cart?.items
                              ?.map(
                                (item: any) =>
                                  (item.price - item.discount) * item.quantity
                              )
                              .reduce((a: number, b: number) => a + b, 0) ||
                              0) *
                              coupon.discount) /
                              100
                          : (cart?.items
                              ?.map(
                                (item: any) =>
                                  (item.price - item.discount) * item.quantity
                              )
                              .reduce((a: number, b: number) => a + b, 0) ||
                              0) - coupon.discount,
                        coupon.maxDiscount
                      ))
                  ).toFixed(2)
                ),
                async (
                  razorpayPaymentId: string,
                  paymentStatus: string,
                  paymentMethodRazorpay: string,
                  paymentMethodDetails: any,
                  amount: number
                ) => {
                  //TODO: create razorpay payment and update the order with the payment id
                  fetch(
                    "https://us-central1-shramasa-care.cloudfunctions.net/webApi/api/orders/add-payment-info",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        razorpayPaymentId: razorpayPaymentId,
                        paymentStatus: paymentStatus,
                        paymentMethod: paymentMethodRazorpay,
                        paymentMethodDetails: paymentMethodDetails,
                        amount: amount,
                        orderId: (await response.json()).orderId
                      }),
                    }
                  ).then(async (e) => {
                    if (e.status == 201 || e.status == 200) {
                      localStorage.removeItem("cart");
                      router.push(
                        "/order/successful?id=" +
                          (await response.json()).orderId
                      );
                    } else {
                      console.log(e);
                      router.push("/order/failed");
                    }
                  });
                }
              );
            }}
            className="py-2 px-6 bg-[#46A627] rounded-full text-white font-bold"
          >
            Place order
          </button>
        </div>
        {/* <button className="py-4 w-full bg-[#46A627] rounded-xl text-white font-bold">
          Place order
        </button> */}
      </div>
    </div>
  );
}
