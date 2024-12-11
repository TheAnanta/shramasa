"use client";
import React from "react";
import Item from "../app/explore/ExploreItem";
import CategoriesSection from "./CategoriesSection";
import CircledText from "./CircledText";
import { Product } from "@/types/interfaces";
import Loader from "./Loader";

export default function NewSection() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState<Boolean>(true);

  React.useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://us-central1-shramasa-care.cloudfunctions.net/webApi/api/products/get-all-products"
      );
      const data = await response.json();
      setLoading(false);
      setProducts(data.slice(0, 4));
    }
    getData();
  }, []);

  return (
    <div>
      {loading ? (
        <img src="/loading.gif" className="w-48" />
      ) : (
        <div className="flex flex-col items-center justify-center py-6 md:pb-0">
          <CircledText text="new" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full mx-[8.25%] gap-6 pb-6">
            {products.map((product) => (
              <Item
                key={product.productId}
                productId={product.productId}
                name={product.name}
                description={product.description}
                price={product.price[0]}
                image={product.images[0]}
                discount={product.discount}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
