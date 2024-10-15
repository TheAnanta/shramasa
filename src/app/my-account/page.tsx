"use client";
import React, { useState } from "react";
import { auth } from "@/lib/firebase/config";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "../context/AuthContext";
import Link from "next/link";
import toast from "react-hot-toast";
import styles from "../../components/address.module.css";

export default function Page() {
  const router = useRouter();
  const userId = useAuthContext()?.uid;

  const [showAddressSheet, showEditAddressSheet] = useState(-1);
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
    <>
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
              {/* <Link href={"/my-account/addresses"} className="text-[#46A627]">
              view all
            </Link> */}
            </div>
            {addressses.length <= 0 && (
              <div className="w-full border shadow-md p-8 rounded-xl flex flex-col justify-center items-center">
                <span className="material-symbols-outlined">sentiment_sad</span>
                <p className="text-xl mt-4">No addressess yet.</p>
                <p className="text-sm opacity-50">
                  Place an order through your cart to add address.
                </p>
              </div>
            )}
            {addressses.map((address: any, addressIndex: number) => (
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
                    <p>{address.phoneNumber}</p>
                    <p className="whitespace-pre-line">
                      {address.address} -{" "}
                      {address.pincode.toString().substring(4, 6)}
                    </p>
                  </div>
                  <div className="flex gap-x-6">
                    <div>
                      <span
                        onClick={() => {
                          showEditAddressSheet(addressIndex);
                          // fetch(
                          //   "http://localhost:3001/api/address/delete-address-by-id",
                          //   {
                          //     body: JSON.stringify({
                          //       addressId: address.id,
                          //     }),
                          //     method: "DELETE",
                          //   }
                          // ).then(async (response) => {
                          //   console.log(response);
                          //   const message = await response.json();
                          //   alert(message);
                          // });
                        }}
                        className="material-symbols-outlined cursor-pointer"
                      >
                        edit
                      </span>
                    </div>
                    <div>
                      <span
                        onClick={() => {
                          console.log(address.addressId);
                          fetch(
                            "http://localhost:3001/api/address/delete-address-by-id",
                            {
                              body: JSON.stringify({
                                addressId: address.addressId,
                              }),
                              headers: {
                                "Content-Type": "application/json",
                              },
                              method: "DELETE",
                            }
                          ).then(async (response) => {
                            const result = await response.json();
                            if (response.status == 200) {
                              toast.success("Deleted address");
                              router.push("/my-account");
                            } else {
                              toast.error("Couldn't delete address.");
                            }
                          });
                        }}
                        className="material-symbols-outlined cursor-pointer"
                      >
                        delete
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full h-[1px] bg-neutral-200 my-6" />
              </>
            ))}
          </div>
        </div>
      </div>
      {showAddressSheet != -1 && (
        <div className="absolute z-40 top-0 left-0 w-full h-full bg-black/60 backdrop-blur-sm flex flex-col justify-end items-center">
          <div className="w-full max-w-[500px] rounded-t-xl p-8 bg-white">
            <div className="flex w-full justify-between">
              <p className="material-symbols-outlined opacity-50 mb-2">edit</p>
              <p
                onClick={() => {
                  showEditAddressSheet(-1);
                }}
                className="cursor-pointer material-symbols-outlined opacity-50 mb-2"
              >
                close
              </p>
            </div>
            <p className="text-xl font-bold">Update Address</p>
            <form
              name="addressForm"
              id="addressForm"
              onSubmit={async (e) => {
                e.preventDefault();
                const formData: any = new FormData(e.target as HTMLFormElement);
                console.log(e.target);
                console.log(formData.get("houseNumber")?.toString());
                const name = formData.get("name")?.toString();
                const houseNumber = formData.get("houseNumber")?.toString();
                const floor = formData.get("floor")?.toString();
                const apartment = formData.get("apartment")?.toString();
                const landmark = formData.get("landmark")?.toString();
                const address2 = formData.get("address")?.toString();
                const phoneNumber = formData.get("phoneNumber")?.toString();
                const pincode = formData.get("pincode")?.toString();

                if (
                  houseNumber != null &&
                  houseNumber != undefined &&
                  houseNumber != ""
                ) {
                  try {
                    const response = await fetch(
                      "http://localhost:3001/api/address/update-address-by-id",
                      {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          addressId: addressses[showAddressSheet].addressId,
                          name: name,
                          userId: auth.currentUser?.uid,
                          houseNumber: houseNumber,
                          floor: floor,
                          apartment: apartment,
                          landmark: landmark,
                          address: address2,
                          phoneNumber: phoneNumber,
                          pincode: pincode,
                        }),
                      }
                    );

                    if (!response.ok) {
                      throw new Error("Failed to add address");
                    }
                    showEditAddressSheet(-1);

                    const result = await response.json();
                    toast.success("Address updated successfully");
                    console.log("Address updated successfully:", result);
                  } catch (error) {
                    toast.error("Error updating address");
                    console.log("Error updating address:", error);
                  }
                }
              }}
              className={"w-full gap-6 flex flex-col"}
            >
              <h3 className={styles.header}>Your details</h3>

              <input
                name="name"
                placeholder="What's this place?"
                defaultValue={addressses[showAddressSheet].name}
                className={styles.inputField}
              />
              <input
                name="phoneNumber"
                placeholder="Enter phone number"
                defaultValue={addressses[showAddressSheet].phoneNumber}
                className={styles.inputField}
              />
              <div className="flex gap-x-2 text-sm">
                <input
                  name="houseNumber"
                  placeholder="Home"
                  defaultValue={addressses[showAddressSheet].houseNumber}
                  className={styles.smallInput}
                />
                <input
                  name="landmark"
                  placeholder="Approach"
                  className={styles.smallInput}
                  defaultValue={addressses[showAddressSheet].landmark}
                />
                <input
                  name="floor"
                  placeholder="Floor"
                  className={styles.smallInput}
                  defaultValue={addressses[showAddressSheet].floor}
                />
                <input
                  name="apartment"
                  placeholder="Apartment"
                  className={styles.smallInput}
                  defaultValue={addressses[showAddressSheet].apartment}
                />
              </div>
              <input
                name="address"
                placeholder="Enter shipping address"
                defaultValue={addressses[showAddressSheet].address}
                className={styles.inputField}
              />
              <input
                name="pincode"
                placeholder="Enter pincode"
                className={styles.inputField}
                defaultValue={addressses[showAddressSheet].pincode}
              />
              <button
                className={`${styles.reviewButton} mt-auto mb-4 disabled:bg-neutral-400`}
              >
                Edit Address
              </button>
            </form>
          </div>
        </div>
      )}
    </>
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
