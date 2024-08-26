"use client";
import { Category } from "@/types/interfaces";
import { useEffect, useState } from "react";

export default function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    fetch("http://localhost:3001/api/categories/get-all-categories").then(
      async (res) => {
        const data = await res.json();
        setCategories(data);
      }
    );
  }, []);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:justify-between md:items-center w-full gap-8 md:gap-x-6 pt-12">
      {categories.map((c) => {
        return (
          <a href={"/explore?category="+c.categoryId} key={c.categoryId} className="flex flex-col">
            <img
              src={"/images/products/mockup.png"}
              alt="petal"
              className="w-full h-[128px] object-cover rounded-2xl"
            />
            hi there
            <p className="p-1 lowercase mx-auto">{c.name}</p>
          </a>
        );
      })}
    </div>
  );
}
