"use client";
import { ChangeEvent, useState, useEffect, FormEvent } from "react";
import styles from "./address.module.css";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { auth } from "@/lib/firebase/config";
import { useAuthContext } from "@/app/context/AuthContext";

export default function Address(props: {
  canReviewCart: boolean;
  onReviewCart: (address: number, deliveryMode: number) => void;
}) {
  const userId = useAuthContext()?.uid;
  const [userAddresses, setUserAddresses] = useState<any[]>([]);
  const [deliveryMode, setDeliverMode] = useState(0);
  const [userSelectedAddress, setUserSelectedAddress] = useState(0);
  useEffect(() => {
    fetch(
      "http://localhost:3001/api/address/get-all-addresses-of-user/" + userId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(async (e) => {
      const result = await e.json();
      setUserAddresses(result);
      setUserSelectedAddress(
        result.indexOf(result.find((e: any) => e.isDefault))
      );
    });
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: any = new FormData(e.target as HTMLFormElement);
    console.log(e.target);
    console.log(formData.get("houseNumber")?.toString());
    const name = formData.get("name")?.toString();
    const houseNumber = formData.get("houseNumber")?.toString();
    const floor = formData.get("floor")?.toString();
    const apartment = formData.get("apartment")?.toString();
    const landmark = formData.get("landmark")?.toString();
    const address = formData.get("address")?.toString();
    const phoneNumber = formData.get("address")?.toString();
    const pincode = formData.get("pincode")?.toString();

    if (houseNumber != null && houseNumber != undefined && houseNumber != "") {
      try {
        const response = await fetch(
          "http://localhost:3001/api/address/create-address",
          {
            // Adjust this URL as needed
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name,
              userId: auth.currentUser?.uid,
              houseNumber: houseNumber,
              floor: floor,
              apartment: apartment,
              landmark: landmark,
              address: address,
              phoneNumber: phoneNumber,
              pincode: pincode,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to add address");
        }

        const result = await response.json();
        toast.success("Address added successfully");
        console.log("Address added successfully:", result);
      } catch (error) {
        toast.error("Error adding address");
        console.log("Error adding address:", error);
      }
    }
    console.log(props.canReviewCart);
    props.canReviewCart
      ? props.onReviewCart(
          userSelectedAddress == -1
            ? userAddresses.length
            : userSelectedAddress,
          deliveryMode
        )
      : alert("Add items first.");
  };

  return (
    <form
      name="addressForm"
      id="addressForm"
      onChange={(e) => {
        if ((e.target as any)?.form != null) {
          setUserSelectedAddress(-1);
        }
      }}
      onSubmit={handleSubmit}
      className={styles.addressContainer}
    >
      <h3 className={styles.header}>Your details</h3>
      <div className="flex overflow-scroll gap-x-4 w-full">
        {userAddresses.map((e, index) => {
          const isSelected = userSelectedAddress == index;
          return (
            <div
              onClick={() => {
                setUserSelectedAddress(index);
                (
                  document?.getElementById("addressForm") as HTMLFormElement
                )?.reset();
              }}
              className={`cursor-pointer shrink-0 rounded-xl p-4 text-sm flex ${
                userSelectedAddress == index
                  ? "bg-[#46A627] text-white"
                  : "border"
              }`}
            >
              <div>
                <p
                  className={`text-xl font-semibold mb-2 ${
                    isSelected ? "text-white" : ""
                  }`}
                >
                  {e.name}
                </p>
                <p className={isSelected ? "text-white" : ""}>
                  {e.houseNumber}, {e.floor}
                </p>
                <p className={isSelected ? "text-white" : ""}>{e.apartment}</p>
                <p className={isSelected ? "text-white" : ""}>{e.landmark}</p>
                <p className={isSelected ? "text-white" : ""}>
                  {e.address} - {e.pincode}
                </p>
              </div>
              <span
                className={`material-symbols-outlined ${
                  isSelected ? "text-white" : ""
                }`}
              >
                edit
              </span>
            </div>
          );
        })}
      </div>
      {userAddresses.length > 0 && (
        <div className="w-full flex px-3 items-center">
          <div className="flex grow h-[1px] bg-neutral-200"></div>
          <p className="text-sm shrink-0 px-2">or, Add an address</p>
          <div className="flex grow h-[1px] bg-neutral-200"></div>
        </div>
      )}
      <input
        name="name"
        placeholder="What's this place?"
        className={styles.inputField}
      />
      <input
        name="phoneNumber"
        placeholder="Enter phone number"
        className={styles.inputField}
      />
      <div className="flex gap-x-2 text-sm">
        <input
          name="houseNumber"
          placeholder="Home"
          className={styles.smallInput}
        />
        <input
          name="landmark"
          placeholder="Approach"
          className={styles.smallInput}
        />
        <input name="floor" placeholder="Floor" className={styles.smallInput} />
        <input
          name="apartment"
          placeholder="Apartment"
          className={styles.smallInput}
        />
      </div>
      <input
        name="address"
        placeholder="Enter shipping address"
        className={styles.inputField}
      />
      <input
        name="pincode"
        placeholder="Enter pincode"
        className={styles.inputField}
      />
      <div className="w-full flex px-3 items-center">
        <div className="flex grow h-[1px] bg-neutral-200"></div>
        <p className="text-sm shrink-0 px-2">Choose a delivery type</p>
        <div className="flex grow h-[1px] bg-neutral-200"></div>
      </div>
      <div className={styles.deliveryOption}>
        <input
          title="Express Delivery"
          type="radio"
          form={"fakeForm"}
          checked={deliveryMode == 0}
          onChange={(e) => setDeliverMode(0)}
        />
        <p>Express Delivery</p>
      </div>
      <div className={styles.deliveryOption}>
        <input
          title="Standard Delivery"
          form={"fakeForm"}
          type="radio"
          checked={deliveryMode == 1}
          onChange={(e) => setDeliverMode(1)}
        />
        <p>Standard Delivery</p>
      </div>

      <button
        disabled={!props.canReviewCart}
        className={`${styles.reviewButton} mt-auto mb-4 disabled:bg-neutral-400`}
      >
        Review your cart
      </button>
    </form>
  );
}
