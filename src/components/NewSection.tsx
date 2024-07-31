import React from "react";
import Item from "./Item";
import CategoriesSection from "./CategoriesSection";

export default function NewSection() {
  return (
    <div className="flex flex-col items-center justify-center py-6">
      <img
        src="/newSection/new.png"
        alt="new.png"
        className="w-48 object-cover py-6"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full mx-[8.25%] gap-6 pb-6">
        <Item />
        <Item />
        <Item />
      </div>

      {/* New Section Below */}
      <CategoriesSection />
    </div>
  );
}
