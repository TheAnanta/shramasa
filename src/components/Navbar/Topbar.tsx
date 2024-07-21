"use client";
import React from "react";

export default function Topbar({ isOpen, toggle }: NavbarProps) {
  return (
    <div className="flex justify-between items-center pt-[37px] pb-7 mx-[8.25%]">
      <div className="flex">
        <img
          src="/navbar/menu.svg"
          alt="menu"
          className="cursor-pointer"
          onClick={toggle}
        />
        <img src="/navbar/user.svg" alt="user" className="pl-[30px]" />
      </div>
      <img src="/navbar/logo.svg" alt="logo" />
      <div className="flex">
        <img src="/navbar/search.svg" alt="search" />
        <img src="/navbar/cart.svg" alt="cart" className="pl-[30px]" />
      </div>
    </div>
  );
}
