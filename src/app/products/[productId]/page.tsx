"use client";
import { useAuthContext } from "@/app/context/AuthContext";
import ProductCard from "@/components/ProductCard";
import toast from "react-hot-toast";
import { Product } from "@/types/interfaces";
import React, { useState } from "react";
import Catalogue from "./Catalogue";
import Error from "@/components/Error";
import { useRouter } from "next/navigation";
export default function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  console.log(params.productId);
  const [readMore, setReadMore] = React.useState(false);
  const [product, setProduct] = React.useState<Product>();
  const [userRatingStar, setUserRatingStar] = React.useState(0);
  const [cartItem, setCartItem] = React.useState(0);
  const [isWishlisted, setIsWishlisted] = React.useState(true);
  const user = useAuthContext();
  const [loading, setLoading] = useState<Boolean>(false);
  const [selectedVariant, setSelectedVariant] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const router = useRouter();
  const updateCart = async (
    quantity: number,
    variant: number,
    isIncreased: boolean
  ) => {
    try {
      const response = await fetch(
        "https://us-central1-shramasa-care.cloudfunctions.net/webApi/api/cart/modify-cart",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: product?.productId,
            userId: user?.uid,
            quantity: quantity,
            variant: variant,
          }),
        }
      );
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
                      item.productId !== product?.productId &&
                      item.variant !== variant
                  )
                : [
                    ...(
                      JSON.parse(localStorage.getItem("cart") ?? "")[
                        "items"
                      ] as any[]
                    ).filter((item) => item.productId !== product?.productId),
                    {
                      productId: product?.productId,
                      quantity: quantity,
                      variant: variant,
                    },
                  ],
          })
        );
        setCartItem(quantity);
      } else if (response.status === 400) {
        setErrorMessage("Please login to modify your cart.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to update cart. Check your connection.");
    }
  };

  React.useEffect(() => {
    const wishlistItems = JSON.parse(
      localStorage.getItem("wishlist") ?? `{"wishlist": []}`
    )["wishlist"];
    const cartItems = JSON.parse(
      localStorage.getItem("cart") ?? `{"items": []}`
    )["items"];
    setCartItem(
      cartItems.filter(
        (item: any) =>
          item.productId === params.productId &&
          item.variant === selectedVariant
      ).length > 0
        ? cartItems.filter(
            (item: any) =>
              item.productId === params.productId &&
              item.variant === selectedVariant
          )[0]["quantity"]
        : 0
    );
    setIsWishlisted(wishlistItems.includes(params.productId));
  }, [params.productId, selectedVariant]);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          "https://us-central1-shramasa-care.cloudfunctions.net/webApi/api/products/get-product-by-id?productId=" +
            params.productId,
          {
            // Update with the correct endpoint
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) {
          alert("Failed to fetch product data");
          return;
        }

        const data = await response.json();
        console.log(data);
        setLoading(false);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    getData();
  }, [params.productId]); // Add params.id as a dependency
  return (
    <>
      {errorMessage && <Error>{errorMessage}</Error>}

      <div className="px-[8.25%] pb-12">
        <div
          className="mt-[20px] space-x-[2.77%] flex
    lg:flex-row items-center lg:items-start justify-center flex-col"
        >
          {" "}
          {!loading ? (
            <img
              src={product?.images[0]}
              alt="product_image"
              className="rounded-xl w-[600px] pb-12 lg:pb-0 object-cover md:aspect-[0.85]"
            />
          ) : (
            <div className="w-screen h-screen flex justify-center items-center">
              <img src="/loading.gif" className="w-1/4" />
            </div>
          )}
          <div className="flex flex-col items-start justify-start lg:w-1/2 xl:w-auto">
            <div className="flex pt-4 pb-4 gap-x-2 justify-between items-start w-full">
              <div>
                <h3 className="text-xl font-medium opacity-50 leading-4">
                  {product?.category.name}
                </h3>
                <h2 className="text-4xl font-bold">{product?.name}</h2>
              </div>
              <div className="flex flex-col items-end">
                {/* <img src="/cart/star.svg" alt="star" className="w-20" /> */}
                <div className="flex gap-2">
                  {Array(parseInt(product?.rating.toString() ?? "0"))
                    .fill(0)
                    .map((_, index) => (
                      <span className="material-symbols-outlined w-4">
                        <span className="filled">kid_star</span>
                      </span>
                    ))}
                  {Array(5 - parseInt(product?.rating.toString() ?? "0"))
                    .fill(0)
                    .map((_, index) => (
                      <span className="material-symbols-outlined w-4">
                        kid_star
                      </span>
                    ))}
                </div>
                <p className="text-sm font-semibold text-end">
                  {product?.rating}{" "}
                  <span className="opacity-60">
                    ({product?.reviews.length})
                  </span>
                </p>
              </div>
            </div>
            <p>
              <span
                className={`font-light ${
                  readMore ? "" : "line-clamp-[8]"
                } mt-4 whitespace-pre-line`}
              >
                {product?.description}
              </span>{" "}
              <span
                className="text-green-700 font-bold cursor-pointer"
                onClick={() => setReadMore(!readMore)}
              >
                {readMore ? "Read less" : "Read more"}
              </span>
            </p>
            <h2 className="font-semibold py-3">Ingredients</h2>
            <div className="pl-5 flex items-start justify-start space-x-12 pb-6">
              <ul className="list-decimal">
                {product?.ingredients.slice(0, 5).map((ingredient) => {
                  return <li>{ingredient.name}</li>;
                })}
                <li>...</li>
              </ul>
              <div>
                {product?.ingredients.map((ingredient) => {
                  return (
                    <li className="list-none opacity-50">
                      {ingredient.quantity}
                    </li>
                  );
                })}
              </div>
            </div>
            <div>
              {(product?.variants ?? []).map((variant, index) => {
                return (
                  <button
                    onClick={() => {
                      setSelectedVariant(index);
                    }}
                    className={`px-5 py-1 mx-2 my-2 rounded-full inline-flex ${
                      selectedVariant == index
                        ? "bg-[#46A627] py-[6px] px-[22px]"
                        : "outline"
                    }`}
                  >
                    {variant}
                  </button>
                );
              })}
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-[unset] items-end justify-between w-full pt-8">
              <div className="flex items-end justify-start space-x-6">
                <h3 className="font-semibold text-5xl">
                  ₹
                  {product?.price[selectedVariant]!! - (product?.discount ?? 0)}
                </h3>
                <p className="text-[#999999] line-through text-2xl">
                  ₹{product?.price[selectedVariant]}
                </p>
              </div>
              <div
                className="flex items-start
            gap-3"
              >
                {cartItem <= 0 ? (
                  <button
                    className="py-2 px-6 font-semibold bg-[#46A627] text-white rounded-full"
                    onClick={() => {
                      fetch(
                        "https://us-central1-shramasa-care.cloudfunctions.net/webApi/api/cart/add-product-to-cart",
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            productId: product?.productId,
                            userId: user?.uid,
                            variant: selectedVariant,
                          }),
                        }
                      ).then(async (response) => {
                        if (response.status == 200) {
                          localStorage.setItem(
                            "cart",
                            JSON.stringify({
                              items: [
                                ...(JSON.parse(
                                  localStorage.getItem("cart") ?? `{"items":[]}`
                                )["items"] as any[]),
                                {
                                  productId: product?.productId,
                                  quantity: 1,
                                  variant: selectedVariant,
                                },
                              ],
                            })
                          );
                          toast.success("Add Product to the cart");
                          setCartItem(1);
                        } else {
                          alert(
                            "Failed to add to cart. " +
                              (await response.json())["error"]
                          );
                        }
                      });
                    }}
                  >
                    Add to cart
                  </button>
                ) : (
                  <div className="flex gap-4 items-center">
                    <div
                      className="size-10 border rounded-lg flex py-auto justify-center items-center cursor-pointer hover:bg-green-100/20"
                      onClick={() => {
                        updateCart(cartItem + 1, selectedVariant, true);
                      }}
                    >
                      <p>+</p>
                    </div>
                    <div>{cartItem}</div>
                    <div
                      className="size-10 border rounded-lg flex py-auto justify-center items-center cursor-pointer hover:bg-green-100/20"
                      onClick={() => {
                        updateCart(cartItem - 1, selectedVariant, false);
                      }}
                    >
                      <p>-</p>
                    </div>
                  </div>
                )}
                <button
                  className="py-2 px-6 font-semibold bg-[#4285F4] text-white rounded-full"
                  onClick={() => {
                    fetch(
                      "https://us-central1-shramasa-care.cloudfunctions.net/webApi/api/cart/add-product-to-cart",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          productId: product?.productId,
                          userId: user?.uid,
                          variant: selectedVariant,
                        }),
                      }
                    ).then(async (response) => {
                      if (response.status == 200) {
                        localStorage.setItem(
                          "cart",
                          JSON.stringify({
                            items: [
                              ...(JSON.parse(
                                localStorage.getItem("cart") ?? `{"items":[]}`
                              )["items"] as any[]),
                              {
                                productId: product?.productId,
                                quantity: 1,
                                variant: selectedVariant,
                              },
                            ],
                          })
                        );
                        setCartItem(1);
                        toast.success("Proceed to Checkout...");
                        router.push("/cart");
                      } else {
                        alert(
                          "Failed to add to cart. " +
                            (await response.json())["error"]
                        );
                      }
                    });
                  }}
                >
                  Buy Now
                </button>
                <div
                  className="size-10 flex items-center justify-center border rounded-xl cursor-pointer"
                  onClick={() => {
                    fetch(
                      "https://us-central1-shramasa-care.cloudfunctions.net/webApi/api/wishlist/modify-wishlist",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          productId: product?.productId,
                          userId: user?.uid,
                        }),
                      }
                    ).then(async (response) => {
                      if (response.status == 200) {
                        localStorage.setItem(
                          "wishlist",
                          JSON.stringify({
                            wishlist: isWishlisted
                              ? [
                                  ...(
                                    JSON.parse(
                                      localStorage.getItem("wishlist") ?? ""
                                    )["wishlist"] as any[]
                                  ).filter(
                                    (item) => item !== product?.productId
                                  ),
                                ]
                              : [
                                  ...(JSON.parse(
                                    localStorage.getItem("wishlist") ??
                                      `{"wishlist": []}`
                                  )["wishlist"] as any[]),
                                  product?.productId,
                                ],
                          })
                        );
                        setIsWishlisted(!isWishlisted);
                      } else {
                        alert(
                          "Failed to add to wishlist. " +
                            (await response.json())["error"]
                        );
                      }
                    });
                  }}
                >
                  {!isWishlisted ? (
                    <span className="material-symbols-outlined dark:text-white">
                      bookmark
                    </span>
                  ) : (
                    <span className="material-symbols-outlined dark:text-white">
                      <span className="filled">bookmark</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center lg:items-start lg:justify-start lg:space-x-16 pt-8 md:pt-20">
          <div className="lg:w-1/2 pb-8 md:pb-20 lg:pb-0 shrink-0">
            <h2 className="font-semibold text-2xl">How to use?</h2>
            <p className="pt-4 pb-8 whitespace-pre-line">
              {product?.howToUse.split(/\s(?=\d\.)/).join("\n")}
            </p>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${
                product?.videoLink.split("?v=")[1]
              }`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              className="rounded-2xl w-full"
            ></iframe>
          </div>
          <div className="w-[1.5px] h-[70vh] bg-neutral-200 lg:flex hidden"></div>
          <div>
            {user != null && (
              <div className="flex gap-4 items-end">
                <form>
                  <p className="text-sm my-2">Your review</p>
                  {(product?.reviews?.filter(
                    (review) => review.userId === user.uid
                  ).length ?? 0) > 0 ? (
                    <div className="flex gap-2">
                      {Array(
                        parseInt(
                          product?.reviews?.filter(
                            (review) => review.userId === user.uid
                          )[0]?.rating ?? "0"
                        )
                      )
                        .fill(0)
                        .map((_, index) => (
                          <span className="material-symbols-outlined w-4">
                            <span className="filled">kid_star</span>
                          </span>
                        ))}
                      {Array(
                        5 -
                          parseInt(
                            product?.reviews?.filter(
                              (review) => review.userId === user.uid
                            )[0]?.rating ?? "0"
                          )
                      )
                        .fill(0)
                        .map((_, index) => (
                          <span className="material-symbols-outlined w-4">
                            kid_star
                          </span>
                        ))}
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      {Array(userRatingStar)
                        .fill(0)
                        .map((_, index) => (
                          <span
                            className="material-symbols-outlined w-4 cursor-pointer"
                            onClick={() => {
                              setUserRatingStar(index + 1);
                            }}
                          >
                            <span className="filled">kid_star</span>
                          </span>
                        ))}
                      {Array(5 - userRatingStar)
                        .fill(0)
                        .map((_, index) => (
                          <span
                            className="material-symbols-outlined w-4 cursor-pointer"
                            onClick={() => {
                              setUserRatingStar(index + 1 + userRatingStar);
                            }}
                          >
                            kid_star
                          </span>
                        ))}
                    </div>
                  )}
                  {product?.reviews?.filter(
                    (review) => review.userId === user.uid
                  ).length === 0 ? (
                    <>
                      <textarea
                        title="review"
                        className="border rounded-xl w-full mt-3 p-4"
                        cols={40}
                        placeholder="Write your review for the product..."
                        rows={4}
                        disabled={
                          (product?.reviews?.filter(
                            (review) => review.userId === user.uid
                          ).length || 0) > 0
                        }
                        name="review"
                      />
                      <button
                        formAction={async (formData) => {
                          const body = {
                            productId: params.productId,
                            review: {
                              userId: user.uid,
                              name: user.displayName ?? "Anonymous User",
                              rating: userRatingStar,
                              review: formData.get("review"),
                            },
                          };

                          const response = await fetch(
                            "https://us-central1-shramasa-care.cloudfunctions.net/webApi/api/products/publish-product-review",
                            {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify(body),
                            }
                          );
                          if (response.status == 200) {
                            toast.success("Review submitted successfully");
                          } else {
                            alert("Failed to submit review. ");
                            // (await response.json())["message"]?.toString() ?? "");
                          }
                        }}
                        className="py-2 px-6 font-semibold bg-[#46A627] text-white rounded-full mt-3"
                      >
                        Submit
                      </button>
                    </>
                  ) : (
                    <div></div>
                  )}
                </form>
              </div>
            )}
            <h3 className="font-semibold text-xl mt-4">Reviews</h3>
            <div className="my-4">
              {product?.reviews.slice(0, 5).map((e) => {
                return (
                  <div className="flex gap-4 py-4 border-b">
                    <p className="bg-[#46A627] aspect-square rounded-full size-8 flex items-center justify-center text-white">
                      {e.name.slice(0, 1).toUpperCase()}
                    </p>
                    <div>
                      <div className="flex gap-1 items-start">
                        {Array(parseInt(e.rating ?? "0"))
                          .fill(0)
                          .map((_, index) => (
                            <span
                              className="material-symbols-outlined"
                              style={{
                                fontSize: "16px",
                              }}
                            >
                              <span className="filled">kid_star</span>
                            </span>
                          ))}
                        {Array(5 - parseInt(e?.rating ?? "0"))
                          .fill(0)
                          .map((_, index) => (
                            <span
                              style={{
                                fontSize: "16px",
                              }}
                              className="material-symbols-outlined"
                            >
                              kid_star
                            </span>
                          ))}
                      </div>
                      <p className="font-medium mt-1">{e.name}</p>
                      <p className="text-sm opacity-60">{e.review}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <h3 className="font-semibold text-xl mt-4">Similar Catalogue</h3>
            <div className="flex space-x-4 pt-6">
              {/* <ProductCard />
            <ProductCard /> */}
              <Catalogue categoryId={product?.category.categoryId!} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
