"use client";
import React from "react";
import { useAuthContext } from "../context/AuthContext";

export default function Page() {
  const uid = useAuthContext()?.uid;
  const [orders, setOrders] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(
        `http://localhost:3001/api/orders/get-orders/${uid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);

      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row py-8 px-[8.25%] bg-gray-50 dark:bg-gray-950 gap-4">
      <div className="">
        <h2 className="text-4xl font-semibold mb-8 soyuz-grotesk">
          Your Orders
        </h2>
        <div className="px-4 md:px-8 rounded-2xl md:rounded-3xl shadow-sm bg-white dark:bg-gray-900">
          {
            <table id="cart" className="hidden md:table">
              <thead className="font-bold">
                <tr>
                  <td>Order</td>
                  <td>Status</td>
                </tr>
              </thead>
              <tbody>
                {/* {cart && (
                  cart.items.map((item: any) => (
                    <FixedCartItem
                      productId={item.productId}
                      key={item.productId}
                      price={item.price}
                      name={item.name}
                      description={item.description}
                      image={item.image}
                      variantName={item.variantName}
                      variant={item.variant}
                      category={item.category}
                      quantity={item.quantity}
                      discount={item.discount}
                    />
                  ))
                )} */}
              </tbody>
            </table>
          }
        </div>
      </div>
      <div className="grow flex flex-col gap-4">
        {/* <button className="py-4 w-full bg-[#46A627] rounded-xl text-white font-bold">
          Place order
        </button> */}
      </div>
    </div>
  );
}
