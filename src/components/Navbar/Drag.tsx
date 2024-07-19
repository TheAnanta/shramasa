"use client";
import React from "react";
import styles from "./navbar.module.css";

interface DragProps {
  toggle: () => void;
}

export default function Drag({ toggle }: DragProps) {
  return (
    <div
      className={`${styles.drag} ${styles.open} transition-all duration-200`}
    >
      <img
        src="/close.svg"
        alt="close"
        className={`${styles.close} absolute top-4 right-4`}
        onClick={toggle}
      />
      <div className="flex flex-col justify-between space-y-4">
        <img
          src="/logo.svg"
          alt=""
          className="absolute left-[34px] pb-[13.33%]"
        />
        <div className="space-y-[5.70%] flex flex-col items-start justify-center h-[60%] pt-[13.33%] pb-[41.20%]">
          <p>Hair Care</p>
          <p>Skin Care</p>
          <p>Body Care</p>
          <p>Naturals</p>
          <p>Formulations</p>
        </div>
        <div className="space-y-[5.70%]">
          <p>Blogs</p>
          <p>Contact Us</p>
        </div>
      </div>
    </div>
  );
}
