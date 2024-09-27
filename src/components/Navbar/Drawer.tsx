"use client";
import React from "react";
import styles from "./navbar.module.css";

export default function Drawer({ isOpen, toggle }: NavbarProps) {
  return (
    <div
      className={`${styles.drawer} ${
        isOpen ? `${styles.open}` : `${styles.closed}`
      }`}
    >
      <img
        src="/navbar/close.svg"
        alt="close"
        className={`${styles.close} absolute top-4 right-4`}
        onClick={toggle}
      />
      <div className="flex flex-col justify-between space-y-4">
        <img
          src="/navbar/logo.svg"
          alt=""
          className="absolute pointer-events-none left-[34px] pb-[13.33%]"
        />
        <div className="drawer-list space-y-[5.70%] flex flex-col items-start justify-center h-[60%] pt-[13.33%] pb-[41.20%]">
          <a href={`/explore?categoryId=hair-care`}>Hair Care</a>
          <a href={`/explore?categoryId=skin-care`}>Skin Care</a>
          <a href={`/explore?categoryId=body-care`}>Body Care</a>
          <a href={`/explore?categoryId=naturals`}>Naturals</a>
          <a href={`/explore?categoryId=formulations`}>Formulations</a>
        </div>
        <div className="flex flex-col items-start justify-start space-y-[5.70%]">
          <a href="/blogs">Blogs</a>
          <a href="/contact-us">Contact Us</a>
        </div>
      </div>
    </div>
  );
}
