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
    <div className="flex flex-col items-center w-full gap-8 px-4 py-12">
      {/* Big Title Section */}
      <div className="text-center max-w-3xl">
        <h1 className="text-6xl md:text-8xl font-bold soyuz-grotesk">Shramasa</h1>
        <p className="text-lg mt-4 text-neutral-600">
          From rejuvenating hair oils to nourishing skin treatments, each
          product is designed with the modern woman in mind—someone who values
          quality, safety, and sustainability.
        </p>
        <div className="inline-block">
          <a
            href="/about"
            className="mt-6 flex items-center justify-center
          gap-2 px-8 py-3 bg-[#46a627] text-white rounded-full text-lg font-medium shadow-md hover:bg-[#3b8d1f] transition"
          >
            Explore
            <span className="material-symbols-outlined text-white">
              arrow_forward
            </span>
          </a>
        </div>
      </div>

      {/* Centered Heading */}
      <div className="text-center">
        <p className="text-2xl mt-2">
          Choose from our extensive range of organic offerings
        </p>
      </div>

      {/* Two Full-Width Cards */}
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6">
        {categories.slice(0, 2).map((c) => (
          <a
            href={"/explore?categoryId=" + c.categoryId}
            key={c.categoryId}
            className="w-full max-w-xl bg-white shadow-lg rounded-full overflow-hidden hover:transition transition duration-300"
          >
            <img
              src={"/images/banners/organic-cosmetics.jpg"}
              alt={c.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <p className="text-xl font-medium">{c.name}</p>
              <p className="text-sm text-neutral-500 mt-2">
                Explore products in the {c.name} category.
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
