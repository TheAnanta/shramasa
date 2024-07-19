"use client";
import React from "react";

interface NavbarProps {
  isOpen: boolean;
  toggle: () => void;
}

export default function Topbar({ isOpen, toggle }: NavbarProps) {
  return (
    <div className="flex justify-between items-center pt-[37px] pb-7 mx-[8.25%]">
      <div className="flex">
        <img
          src="/menu.svg"
          alt="menu"
          className="cursor-pointer"
          onClick={toggle}
        />
        <img src="/user.svg" alt="user" className="pl-[30px]" />
      </div>
      <img src="/logo.svg" alt="logo" />
      <div className="flex">
        <img src="/search.svg" alt="search" />
        <img src="/cart.svg" alt="cart" className="pl-[30px]" />
      </div>
    </div>
  );
}
