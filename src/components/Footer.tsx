import React from "react";

export default function Footer() {
  return (
    <div className="bg-[#F2F2F2] dark:bg-neutral-950 flex flex-col sm:flex-row items-center justify-center sm:items-start sm:justify-between px-[8.25%] py-20">
      <div className="flex flex-col justify-center items-center sm:items-start md:justify-start pb-10 sm:pb-0  font-semibold">
        <img src="/footer/footer-logo.svg" alt="" className="pb-12" />
        <p className="sm:text-justify text-center text-[#585858] dark:text-white">
          Welcome to Shramasa - A one stop solution for all your beauty needs. 
        </p>
        <p className="sm:text-justify text-center text-[#585858] dark:text-white">
          From Hair Care to Skin Care, we have it all.
        </p>
      </div>
      <div className="flex flex-col items-center sm:items-end justify-between h-8 sm:h-[20vh]">
        <img src="/footer/footer-socials.svg" alt="socials" className="pb-4" />
        <div className="flex space-x-4 font-semibold">
          <p>Terms of Use</p>
          <p>Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}
