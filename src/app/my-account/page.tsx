"use client";
import React from "react";
import { auth } from "@/lib/firebase/config";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const [user, setUser] = React.useState<any>();
  const [addressses, setAddresses] = React.useState<any>([
    {
      houseNumber: "",
      floor: "",
      apartment: "",
      landmark: "",
      address: "",
      pincode: 0,
    },
  ]);

  React.useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`http://localhost:3001/api/users/get-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
        }),
      });
      const data = await response.json();
      setUser(data);
    };
    fetchUser();
  }, [userId]);

  React.useEffect(() => {
    const fetchAddresses = async () => {
      const response = await fetch(
        `http://localhost:3001/api/address/get-all-addresses-of-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
          }),
        }
      );
      const data = await response.json();
      setAddresses(data);
    };
    fetchAddresses();
  }, [userId]);

  return (
    <div className="flex flex-col-reverse md:flex-row items-start justify-between mx-[8.25%] my-12 md:space-x-12 ">
      <div className="w-full">
        <h1 className="mb-8 text-4xl font-bold">Profile</h1>
        <div className="flex justify-between items-center py-8">
          <span className="material-symbols-outlined text-[#7FD264]">
            person
          </span>
          <p className="text-2xl">List Item</p>
          <span className="material-symbols-outlined">arrow_right</span>
        </div>
        <div className="flex justify-between items-center py-8">
          <span className="material-symbols-outlined text-[#7FD264]">
            person
          </span>
          <p className="text-2xl">List Item</p>
          <span className="material-symbols-outlined">arrow_right</span>
        </div>
        <div className="flex justify-between items-center py-8">
          <span className="material-symbols-outlined text-[#7FD264]">
            person
          </span>
          <p className="text-2xl">List Item</p>
          <span className="material-symbols-outlined">arrow_right</span>
        </div>
        <div className="flex justify-between items-center py-8">
          <span className="material-symbols-outlined text-[#7FD264]">
            person
          </span>
          <p className="text-2xl">List Item</p>
          <span className="material-symbols-outlined">arrow_right</span>
        </div>
        <div className="flex justify-between items-center py-8">
          <span className="material-symbols-outlined text-[#7FD264]">
            person
          </span>
          <p className="text-2xl">List Item</p>
          <span className="material-symbols-outlined">arrow_right</span>
        </div>
      </div>
      <div className="w-full h-fit">
        <div className="bg-[#7FD264] rounded-[28.38px] px-12 py-8 flex justify-between sm:flex-row flex-col-reverse">
          <div>
            <p className="text-4xl text-white soyuz-grotesk">{user?.name}</p>
            <p className="text-lg font-medium text-white">{user?.email}</p>
            <p className="text-white">{user?.phone}</p>
            <button
              onClick={function () {
                auth.signOut();
              }}
              className="text-black bg-white py-2 px-7 rounded-xl uppercase font-semibold mt-2"
            >
              Sign Out
            </button>
          </div>
          <div>
            <img
              src="https://github.com/ManasMalla.png"
              alt=""
              className="border-[16px] border-[#56AB3A] rounded-full w-36 h-36 object-cover sm:mb-0 mb-4"
            />
          </div>
        </div>
        <div className="my-8 sm:my-12">
          <h2 className="soyuz-grotesk text-2xl font-semibold">
            Your Addresses
          </h2>
          {addressses.map((address: any) => (
            <div key={address.id} className="rounded-[28.38px] p-8 my-4 w-full flex items-start justify-between">
              <div>
                <span className="material-symbols-outlined w-full">home</span>
              </div>
              <div>
                <div className="font-bold mb-4 flex space-x-4 items-center justify-center">
                  <p>Home</p>
                  <p className="py-2 px-4 bg-neutral-200 rounded-xl">Default</p>
                </div>
                <p className="text-lg font-semibold">House {address.houseNumber}</p>
                <p className="text-lg font-semibold">Floor {address.floor}</p>
                <p className="text-lg font-semibold">Apartment {address.apartment}</p>
                <p className="text-lg font-semibold">Landmark: {address.landmark}</p>
                <p className="text-lg font-semibold">{address.address}</p>
                <p className="text-lg font-semibold">PINCODE- {address.pincode}</p>
              </div>
              <button className="text-black bg-white py-2 px-7 rounded-xl uppercase font-semibold mt-2">
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// <div className="mx-[8.25%] h-screen">
//   <h1>My Account page</h1>
//   <button
//     className="text-green-100 bg-red-600 rounded-full py-2 px-6"
//     onClick={() => {
//       auth.signOut();
//     }}
//   >
//     Sign out
//   </button>
//   <div>
//     <h2>General Details</h2>
//     <p>Name: {user?.name}</p>
//     <p>Email: {user?.email}</p>
//     <p>Phone: {user?.phone}</p>
//   </div>
//   <div>
//     <h2>Address</h2>
//     {addressses.map((address: any) => (
//       <div key={address.id}>
//         <p>House Number: {address.houseNumber}</p>
//         <p>Floor: {address.floor}</p>
//         <p>Apartment: {address.apartment}</p>
//         <p>Landmark: {address.landmark}</p>
//         <p>Address: {address.address}</p>
//         <p>Pincode: {address.pincode}</p>
//       </div>
//     ))}
//   </div>
// </div>
