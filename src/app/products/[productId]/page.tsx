"use client";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/interfaces";
import React from "react";

export default function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  console.log(params.productId);
  const [readMore, setReadMore] = React.useState(false);
  const [product, setProduct] = React.useState<Product>();
  const [userRatingStar, setUserRatingStar] = React.useState(0);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/products/get-product-by-id?productId=" +
            params.productId,
          {
            // Update with the correct endpoint
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }

        const data = await response.json();
        console.log(data);

        setProduct(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    getData();
  }, [params.productId]); // Add params.id as a dependency
  return (
    <div className="px-[8.25%] pb-12">
      <div
        className="mt-[20px] space-x-[2.77%] flex
    lg:flex-row items-center lg:items-start justify-center flex-col"
      >
        <img
          src="/images/products/hair-shampoo-banner.png"
          alt="product_image"
          className="rounded-xl pb-12 lg:pb-0 object-cover md:aspect-[0.85]"
        />
        <div className="flex flex-col items-start justify-start lg:w-1/2 xl:w-auto">
          <div className="flex pt-4 pb-4 gap-x-2 justify-between items-start w-full">
            <div>
              <h3 className="text-xl font-medium opacity-50 leading-4">
                hair care
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
                <span className="opacity-60">({product?.reviews.length})</span>
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
              {product?.ingredients.map((ingredient) => {
                return <li>{ingredient.name}</li>;
              })}
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
          <div className="flex flex-col md:flex-row gap-4 md:gap-[unset] items-end justify-between w-full pt-8">
            <div className="flex items-end justify-start space-x-6">
              <h3 className="font-semibold text-5xl">₹{product?.price}</h3>{" "}
              <p className="text-[#999999] line-through text-2xl">
                ₹ {product?.price!! - (product?.discount ?? 0)}
              </p>
            </div>
            <div
              className="flex items-start
            gap-3"
            >
              <button className="py-2 px-6 font-semibold bg-[#46A627] text-white rounded-full">
                Add to cart
              </button>

              <img src="/cart/save.svg" alt="addtocart" className="size-10" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-center lg:items-start lg:justify-start lg:space-x-16 pt-8 md:pt-20">
        <div className="lg:w-1/2 pb-8 md:pb-20 lg:pb-0 shrink-0">
          <h2 className="font-semibold text-2xl">How to use?</h2>
          <p className="pt-4 pb-8 whitespace-pre-line">{product?.howToUse}</p>
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
          <div className="flex gap-4 items-end">
            <form>
              <p className="text-sm my-2">Your review</p>
              {(product?.reviews?.filter((review) => review.userId === "user")
                .length ?? 0) > 0 ? (
                <div className="flex gap-2">
                  {Array(
                    parseInt(
                      product?.reviews?.filter(
                        (review) => review.userId === "user"
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
                          (review) => review.userId === "user"
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
              <textarea
                className="border rounded-xl w-full mt-3"
                cols={40}
                rows={4}
                value={
                  product?.reviews?.filter(
                    (review) => review.userId === "user"
                  )[0]?.review
                }
                name="review"
              />
              <button
                formAction={async (formData) => {
                  const body = {
                    productId: params.productId,
                    //TODO UPDATE USERID AND NAME
                    review: {
                      userId: "user",
                      name: "lakshit",
                      rating: userRatingStar,
                      review: formData.get("review"),
                    },
                  };

                  const response = await fetch(
                    "http://localhost:3001/api/products/publish-product-review",
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(body),
                    }
                  );
                }}
                className="py-2 px-6 font-semibold bg-[#46A627] text-white rounded-full mt-3"
              >
                Submit
              </button>
            </form>
          </div>
          <h3 className="font-semibold text-xl mt-4">Similar Catalogue</h3>
          <div className="flex space-x-4 pt-6">
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </div>
    </div>
  );
}
