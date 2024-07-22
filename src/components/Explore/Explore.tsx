"use client";
import React from "react";
import Item from "../Item";
import styles from "./explore.module.css";

export default function Explore() {
  const [open, setOpen] = React.useState(false);

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
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </div>
  );
}
