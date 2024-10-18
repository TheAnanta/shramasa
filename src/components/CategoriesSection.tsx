"use client";
import { Category } from "@/types/interfaces";
import { useEffect, useState } from "react";

export default function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    fetch(
      "https://us-central1-shramasa-care.cloudfunctions.net/webApi/api/categories/get-all-categories"
    ).then(async (res) => {
      const data = await res.json();
      setCategories(data);
    });
  }, []);
  return (
    <div className="flex items-center w-full gap-12">
      <div>
        <p className="text-3xl soyuz-grotesk">Explore</p>
        <p className="w-[20ch]">
          choose from our extensive range of organic offerings
        </p>
        <a href="/explore" className="text-[#46a627] flex gap-2 mt-3">
          View all products{" "}
          <span className="material-symbols-outlined text-[#46a627]">
            arrow_forward
          </span>
        </a>
      </div>
      <div className="grow grid grid-cols-2 sm:grid-cols-3 md:flex md:justify-start md:items-center w-full gap-8 md:gap-x-6 pt-12">
        {categories.map((c) => {
          return (
            <a
              href={"/explore?categoryId=" + c.categoryId}
              key={c.categoryId}
              className="flex flex-col"
            >
              <img
                src={"/images/products/mockup.png"}
                alt="petal"
                className="w-full h-[128px] object-cover rounded-2xl"
              />
              <p className="p-1 lowercase mx-auto">{c.name}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
}
