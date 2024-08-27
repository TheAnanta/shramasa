"use client";
import React, { useEffect, useState } from "react";
import { Order } from "@/type/interfaces";

export default function Page() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/admin/get-all-user-orders");
        const data: Order[] = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchDetails();
  }, []);

  return (
    <div className="px-36 py-8">
      <h2 className="text-4xl font-semibold mb-8 soyuz-grotesk">Your Orders</h2>
      <table className="min-w-full border-collapse border border-neutral-300">
        <thead>
          <tr className="bg-neutral-300">
            <th className="p-2 border border-neutral-300">Order ID</th>
            <th className="p-2 border border-neutral-300">User ID</th>
            <th className="p-2 border border-neutral-300">Contact</th>
            <th className="p-2 border border-neutral-300">Items</th>
            <th className="p-2 border border-neutral-300">Address</th>
            <th className="p-2 border border-neutral-300">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td className="p-2 border border-neutral-300">{order.orderId}</td>
              <td className="p-2 border border-neutral-300">{order.userId}</td>
              <td className="p-2 border border-neutral-300">
                {order.additionalInfo?.contact || "N/A"}
              </td>
              <td className="p-2 border border-neutral-300">
                {order.items.map((item, index) => (
                  <p key={index}>{item.name}</p>
                ))}
              </td>
              <td className="p-2 border border-neutral-300">{order.deliveryAddress}</td>
              <td className="p-2 border border-neutral-300">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
