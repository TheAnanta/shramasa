"use client";
import { ChangeEvent, useState } from "react";
import styles from "./address.module.css";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function Address() {
  const [formData, setFormData] = useState({
    userId: "050wBNZ2VFSBK4sMKTGzkh2c9cK2",
    houseNumber: "",
    floor: "",
    apartment: "",
    landmark: "",
    address: "",
    pincode: 0,
    name: "",
    phoneNumber: "",
    deliveryType: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
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
            userId: "050wBNZ2VFSBK4sMKTGzkh2c9cK2",
            houseNumber: formData.houseNumber,
            floor: formData.floor,
            apartment: formData.apartment,
            landmark: formData.landmark,
            address: formData.address,
            pincode: formData.pincode,
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
  };

  return (
    <form onSubmit={handleSubmit} className={styles.addressContainer}>
      <h3 className={styles.header}>Your details</h3>
      <input
        name="name"
        placeholder="Enter your name"
        className={styles.inputField}
        value={formData.name}
        onChange={handleInputChange}
      />
      <input
        name="phoneNumber"
        placeholder="Enter phone number"
        className={styles.inputField}
        value={formData.phoneNumber}
        onChange={handleInputChange}
      />
      <div className={styles.deliveryOption}>
        <input
          title="Express Delivery"
          type="radio"
          name="deliveryType"
          value="express"
          checked={formData.deliveryType === "express"}
          onChange={handleInputChange}
        />
        <p>Express Delivery</p>
      </div>
      <div className={styles.deliveryOption}>
        <input
          title="Standard Delivery"
          type="radio"
          name="deliveryType"
          value="standard"
          checked={formData.deliveryType === "standard"}
          onChange={handleInputChange}
        />
        <p>Standard Delivery</p>
      </div>
      <div className="flex gap-x-2 text-sm">
        <input
          name="houseNumber"
          placeholder="Home"
          className={styles.smallInput}
          value={formData.houseNumber}
          onChange={handleInputChange}
        />
        <input
          name="landmark"
          placeholder="Approach"
          className={styles.smallInput}
          value={formData.landmark}
          onChange={handleInputChange}
        />
        <input
          name="floor"
          placeholder="Floor"
          className={styles.smallInput}
          value={formData.floor}
          onChange={handleInputChange}
        />
        <input
          name="apartment"
          placeholder="Apartment"
          className={styles.smallInput}
          value={formData.apartment}
          onChange={handleInputChange}
        />
      </div>
      <input
        name="address"
        placeholder="Enter shipping address"
        className={styles.inputField}
        value={formData.address}
        onChange={handleInputChange}
      />
      <input
        name="pincode"
        placeholder="Enter pincode"
        className={styles.inputField}
        value={formData.pincode}
        onChange={handleInputChange}
      />
      <button type="submit" className={styles.reviewButton}>
        Add Address
      </button>
      <Link href="/cart/review" className="mt-auto mb-4">
        <button className={styles.reviewButton}>Review your cart</button>
      </Link>
    </form>
  );
}
