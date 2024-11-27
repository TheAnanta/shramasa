"use client";

import React, { Children, useState } from "react";

export default function Error({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-10 flex items-center flex-col justify-center bg-black bg-opacity-50"
      role="alert"
    >
      <div className="relative text bg-white p-6 rounded-xl shadow-md w-[420px] flex items-center flex-col justify-center">
        <button
          className="absolute text-xl font-bold top-2 right-2 text-neutral-500 hover:text-neutral-700 pr-2"
          onClick={() => setIsVisible(false)}
          aria-label="Dismiss"
        >
          ✕
        </button>
        <a href="/login" className="px-8 py-3 transition-all
        hover:px-6 hover:text-black font-medium hover:rounded-xl
         duration-200 text-white rounded-lg bg-[#46a627]">Login</a>
        <p className="text-neutral-700 mt-2 text-2xl font-bold">{children}</p>
      </div>
    </div>
  );
}
