"use client";
import React from "react";
import Link from "next/link";
import { useAuthContext } from "@/app/context/AuthContext";

export default function Topbar({ toggle }: NavbarProps) {
  const user = useAuthContext();
  return (
    <div className="flex justify-between items-center pt-[37px] pb-7 mx-[8.25%]">
      <div className="flex">
        <img
          src="/navbar/menu.svg"
          alt="menu"
          className="cursor-pointer"
          onClick={toggle}
        />
        <Link href={user === null ? "/login" : "/my-account"}>
          <img src="/navbar/user.svg" alt="user" className="pl-[30px]" />
        </Link>
      </div>
      <Link href="/">
        <img src="/navbar/logo.svg" alt="logo" />
      </Link>
      <div className="flex">
        <img src="/navbar/search.svg" alt="search" />

        <Link href={"/cart"}>
          <img src="/navbar/cart.svg" alt="cart" className="pl-[30px]" />
        </Link>
      </div>
    </div>
  );
}
