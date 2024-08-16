"use client";
import React from "react";
import ExporeItem from "./ExploreItem";
import styles from "./explore.module.css";
import { Product } from "@/types/interfaces";

export default function Explore() {
  const [open, setOpen] = React.useState(false);
  const [products, setProducts] = React.useState<Product[]>();

  React.useEffect(() => {
    async function getData() {
      const response = await fetch(
        "http://localhost:3001/api/products/get-all-products"
      );
      const data = await response.json();
      // console.log(data);
      setProducts(data);
    }
    getData();
  }, []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className="flex flex-col lg:flex-row items-start justify-between mx-[8.25%] pt-12">
      <button
        className="lg:hidden mb-4 px-4 py-2 rounded-full border-[#46A627] border text-black"
        onClick={toggleDrawer}
      >
        {open ? "Hide Filters" : "Show Filters"}
      </button>
      <div
        className={`${styles.drawer} pr-[4.46%] w-full lg:w-[30%] ${
          open ? "block" : "hidden"
        } lg:block`}
      >
        <div className="flex flex-col justify-between space-y-4 text-xl">
          <h2 className="text-2xl font-semibold hidden sm:flex">Filters</h2>
          <div className="flex flex-col space-y-4 lg:space-y-5 items-start justify-center lg:h-[60%] pb-12">
            <p className="pb-0">Price</p>
            <img src="/price.svg" alt="" className="pb-2" />
            <p>
              <span>+</span> Ingredient
            </p>
            <p>+ Category</p>
            <p>+ Occasion</p>
            <p>+ Formulation</p>
            <p>+ Skin Tone</p>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      {products ? (
        products.map((product: any, index: number) => {
          return (
            <div
              key={product.name}
              className="grid grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <ExporeItem
                name={product?.name}
                description={product?.description}
                price={product?.price}
              />
            </div>
          );
        })
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
