import Link from "next/link";
import { CartItem } from "./components/CartItem";
import { MobileCartItem } from "./components/MobileCartItem";

export default function CartPage() {
  return (
    <div className="flex flex-col lg:flex-row py-8 px-[8.25%] bg-gray-50 dark:bg-gray-950 gap-4">
      <div className="grow">
        <h2 className="text-4xl font-semibold mb-8 soyuz-grotesk">Your cart</h2>
        <div className="px-4 md:px-8 rounded-2xl md:rounded-3xl shadow-sm bg-white dark:bg-gray-900">
          <div className="md:hidden">
            <MobileCartItem isFirstItem={true} />
            <MobileCartItem />
            <MobileCartItem />
          </div>
          <table id="cart" className="hidden md:table">
            <thead className="font-bold">
              <td>Product</td>
              <td>Quantity</td>
              <td>Cost</td>
              <td></td>
            </thead>
            <tbody>
              <CartItem />
              <CartItem />
              <tr>
                <input
                  placeholder="Enter your promo code"
                  className="border-b pb-1 text-sm dark:bg-gray-900"
                />
              </tr>
              <tr>
                <td colSpan={4}>
                  <div className="w-full px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-950 flex">
                    <div className="size-4"></div>
                    <p className="text-[#46A627]">Back to catalog</p>
                    <p className="font-bold ml-auto">
                      Total cost:
                      <span className="text-[#46A627]"> $ 18.86</span>
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="lg:w-1/4 flex flex-col items-center gap-5 px-6 py-4 rounded-3xl shadow-sm bg-white  dark:bg-gray-900">
        <h3 className="text-2xl font-medium mb-2">Your details</h3>
        <input
          placeholder="Enter your name"
          className="border-b pb-1 w-full text-base dark:bg-gray-900"
        />
        <input
          placeholder="Enter phone number"
          className="border-b pb-1 w-full text-base dark:bg-gray-900"
        />
        <div className="w-full flex gap-x-3 dark:bg-gray-900">
          <input type="radio" />
          <p>Express Delivery</p>
        </div>
        <div className="w-full flex gap-x-3 dark:bg-gray-900">
          <input type="radio" />
          <p>Standard Delivery</p>
        </div>
        <div className="flex gap-x-2 text-sm">
          <input
            placeholder="Home"
            className="border-b pb-1 w-full dark:bg-gray-900"
          />
          <input
            placeholder="Approach"
            className="border-b pb-1 w-full dark:bg-gray-900"
          />
          <input
            placeholder="Floor"
            className="border-b pb-1 w-full dark:bg-gray-900"
          />
          <input
            placeholder="Apartment"
            className="border-b pb-1 w-full dark:bg-gray-900"
          />
        </div>
        <input
          placeholder="Enter shipping address"
          className="border-b pb-1 w-full dark:bg-gray-900"
        />
        <Link href={"/cart/review"} className="mt-auto mb-4 ">
          <button className="py-2 px-7 font-semibold bg-[#46A627] text-[0.95rem] text-white rounded-full">
            Review your cart
          </button>
        </Link>
      </div>
    </div>
  );
}
