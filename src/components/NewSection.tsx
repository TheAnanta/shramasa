import React from "react";
import Item from "./Item";

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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:justify-between md:items-center w-full gap-8 md:gap-x-6 pt-12">
        <div>
          <img
            src="/newSection/petal.svg"
            alt="petal"
            className="w-full h-auto object-cover"
          />
          <p className="p-1">hair care</p>
        </div>
        <div>
          <img
            src="/newSection/petal.svg"
            alt="petal"
            className="w-full h-auto object-cover"
          />
          <p className="p-1">hair care</p>
        </div>
        <div>
          <img
            src="/newSection/petal.svg"
            alt="petal"
            className="w-full h-auto object-cover"
          />
          <p className="p-1">hair care</p>
        </div>
        <div>
          <img
            src="/newSection/petal.svg"
            alt="petal"
            className="w-full h-auto object-cover"
          />
          <p className="p-1">hair care</p>
        </div>
        <div>
          <img
            src="/newSection/petal.svg"
            alt="petal"
            className="w-full h-auto object-cover"
          />
          <p className="p-1">hair care</p>
        </div>
        <div>
          <img
            src="/newSection/petal.svg"
            alt="petal"
            className="w-full h-auto object-cover"
          />
          <p className="p-1">hair care</p>
        </div>
      </div>
    </div>
  );
}
