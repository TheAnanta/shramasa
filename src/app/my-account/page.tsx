"use client";
import React from "react";
import { auth } from "@/lib/firebase/config";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "../context/AuthContext";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const userId = useAuthContext()?.uid;

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
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  React.useEffect(() => {
    const fetchAddresses = async () => {
      const response = await fetch(
        `http://localhost:3001/api/address/get-all-addresses-of-user/` + userId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setAddresses(data);
    };
    if (userId) {
      fetchAddresses();
    }
  }, [userId]);

  return (
    <div className="flex flex-col-reverse lg:flex-row items-start justify-between mx-[8.25%] my-12 lg:space-x-12 ">
      <div className="w-[40%]">
        <h1 className="mb-8 text-4xl font-bold">Profile</h1>
        <Link
          href={"/my-account/wishlist"}
          className="flex justify-between items-center py-8"
        >
          <span className="material-symbols-outlined text-[#7FD264]">
            person
          </span>
          <p className="text-2xl">Wishlist</p>
          <span className="material-symbols-outlined">arrow_right</span>
        </Link>
        <Link
          href={"/my-account/orders"}
          className="flex justify-between items-center py-8"
        >
          <span className="material-symbols-outlined text-[#7FD264]">
            person
          </span>
          <p className="text-2xl">Orders</p>
          <span className="material-symbols-outlined">arrow_right</span>
        </Link>
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
                router.push("/");
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
          <div className="w-full flex justify-between items-center">
            <h2 className="soyuz-grotesk text-2xl font-semibold mb-8">
              your addresses
            </h2>
            <Link href={"/my-account/addresses"} className="text-[#46A627]">
              view all
            </Link>
          </div>
          {addressses.map((address: any) => (
            <>
              <div
                key={address.id}
                className="h-40 w-full flex items-start justify-between gap-x-6"
              >
                <img
                  className="size-40 aspect-square object-cover object-right rounded-xl overflow-clip"
                  src="https://storage.googleapis.com/gweb-uniblog-publish-prod/images/google_maps_helpful_hero_1.width-1300.jpg"
                />
                <div className="grow">
                  <div className="font-bold mb-4 flex space-x-4 items-center">
                    <p className="soyuz-grotesk text-2xl">{address.name}</p>
                    {address.isDefault && (
                      <p className="py-2 px-4 bg-neutral-200 font-bold rounded-md text-[8px]">
                        Default
                      </p>
                    )}
                  </div>
                  <p>
                    {address.floor}, {address.houseNumber}
                  </p>
                  <p></p>
                  <p>{address.apartment}</p>
                  <p>{address.landmark}</p>

                  <p className="whitespace-pre-line">
                    {address.address} -{" "}
                    {address.pincode.toString().substring(4, 6)}
                  </p>
                </div>
                <div className="flex gap-x-6">
                  <div>
                    <span className="material-symbols-outlined">edit</span>
                  </div>
                  <div>
                    <span className="material-symbols-outlined">delete</span>
                  </div>
                </div>
              </div>
              <div className="w-full h-[1px] bg-neutral-200 my-6" />
            </>
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
