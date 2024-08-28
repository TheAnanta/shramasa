"use client";
import React, { useEffect, useState } from "react";
import { Order } from "@/type/interfaces";
import OrdersTable from "@/components/OrdersTable";
import Link from "next/link";

export default function Page() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/admin/get-all-user-orders"
        );
        const data: Order[] = await response.json();
        setOrders([...data]);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchDetails();
  }, []);

  return <OrdersTable orders={orders} />;
}
