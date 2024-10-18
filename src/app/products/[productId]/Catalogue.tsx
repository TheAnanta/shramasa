"use client";
import { useState, useEffect } from "react";

export default function Catalogue({ categoryId }: { categoryId: string }) {
  const [products, setProducts] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://us-central1-shramasa-care.cloudfunctions.net/webApi/api/products/get-similar-catalogue",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ categoryId }),
        }
      );
      const products = await response.json();
      setProducts(products);
    };

    fetchData();
  }, []);
  return (
    <div>
      <div>
        {products &&
          products.map((product: any) => {
            <div>
              <img src="/cart/similar.svg" alt="" />
              <p className="text-[0.7rem] mt-4">{product.name}</p>
              <p className="text-sm py-[2px] font-medium">
                {product.description}
              </p>
              <div className="flex items-end justify-start space-x-4 pb-6">
                <h3 className="font-medium">₹{product.price}</h3>{" "}
                <p className="opacity-50 line-through">₹{product.price + 10}</p>
              </div>
            </div>;
          })}
      </div>
    </div>
  );
}
