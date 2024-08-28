"use client";
import React, { useEffect, useState } from "react";
import { Order } from "@/type/interfaces";
import OrdersTable from "@/components/OrdersTable";
import Link from "next/link";

export default function Page() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    // const fetchDetails = async () => {
    //   try {
    //     const response = await fetch(
    //       "http://localhost:3001/api/categories/get-all-categories"
    //     );
    //     const data = await response.json();
    //     setCategories(data);
    //   } catch (error) {
    //     console.error("Error fetching orders:", error);
    //   }
    // };
    // fetchDetails();
  }, []);

  return <div>Coming soon.</div>;
}
