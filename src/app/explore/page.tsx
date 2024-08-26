"use client";
import React from "react";
import ExploreItem from "./ExploreItem";
import styles from "./explore.module.css";
import { Product } from "@/types/interfaces";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Explore() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const [open, setOpen] = React.useState(false);
  const [categories, setCategories] = React.useState<any>([]);
  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    async function getData() {
      const response = await fetch(
        "http://localhost:3001/api/products/get-all-products"
      );
      const data = await response.json();
      setProducts([...data, ...data, ...data, ...data]);
    }
    getData();
  }, []);

  React.useEffect(() => {
    async function getAllCategories() {
      const response = await fetch(
        "http://localhost:3001/api/categories/get-all-categories"
      );
      const categories = await response.json();
      setCategories(categories);
    }

    getAllCategories();
  }, [categoryId, products]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className="flex flex-col lg:flex-row items-start justify-between mx-[8.25%] pb-12">
      <button
        className="lg:hidden mb-4 px-4 py-2 rounded-full border-[#46A627] border text-black"
        onClick={toggleDrawer}
      >
        {open ? "Hide Filters" : "Show Filters"}
      </button>
      
      {/* Category Filter */}
      <div
        className={`${styles.drawer} pr-4 w-full max-w-56 grow-0 shrink-0 ${
          open ? "block" : "hidden"
        } lg:block`}
      >
        <div className="flex flex-col justify-between space-y-4 text-xl">
          <h2 className="text-2xl font-semibold hidden sm:flex">Filters</h2>
          <div className="flex flex-col space-y-4 lg:space-y-5 items-start justify-center lg:h-[60%] pb-12">
            <div>
              <label htmlFor="categoryFilter" className="block mb-2 text-[#46A627] font-bold">
                Category
              </label>
              <ul>
                {categories.map((category: any) => {
                  return (
                    <li key={category.categoryId} className="my-3">
                      <Link href={"/explore?categoryId=" + category.categoryId} className={`${category.categoryId === categoryId ? "text-[#46A627]" : "" }`}>
                        {category.categoryId === categoryId ? "" : "+ " }{category.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      {products.length > 0 ? (
        <div className="pl-8 border-l-[1px] w-full">
          <h2 className="text-2xl font-semibold">Explore</h2>
          <p>Our wide range of products of over {products.length}+ products</p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {products
              .filter(
                (filteredProduct) =>
                  filteredProduct.category.categoryId === categoryId
              )
              .map((product: Product, index: number) => (
                <ExploreItem
                  key={index}
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
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
