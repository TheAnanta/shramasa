import React from "react";
import Item from "../app/explore/ExploreItem";
import CategoriesSection from "./CategoriesSection";
import CircledText from "./CircledText";

export default function NewSection() {
  return (
    <div className="flex flex-col items-center justify-center py-6 md:pb-0">
      <CircledText text="new" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full mx-[8.25%] gap-6 pb-6">
        <Item
          productId={"soapnut-shampoo"}
          name={"Soapnut Shampoo"}
          image={"/products/hair-care/all-hair-care/soapnut-shampoo-1.png"}
          price={50}
          discount={10}
          description={"A basic soapnut shampoo"}
        />
        <Item
          productId={"soapnut-shampoo"}
          name={"Soapnut Shampoo"}
          image={"/products/hair-care/all-hair-care/soapnut-shampoo-1.png"}
          price={50}
          discount={10}
          description={"A basic soapnut shampoo"}
        />
        <Item
          productId={"soapnut-shampoo"}
          name={"Soapnut Shampoo"}
          image={"/products/hair-care/all-hair-care/soapnut-shampoo-1.png"}
          price={50}
          discount={10}
          description={"A basic soapnut shampoo"}
        />
        <Item
          productId={"soapnut-shampoo"}
          name={"Soapnut Shampoo"}
          image={"/products/hair-care/all-hair-care/soapnut-shampoo-1.png"}
          price={50}
          discount={10}
          description={"A basic soapnut shampoo"}
        />
        {/* <Item />
        <Item /> */}
      </div>
    </div>
  );
}
