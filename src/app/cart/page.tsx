import { CartItem } from "./components/CartItem";

export default function CartPage() {
  return (
    <div className="flex flex-col lg:flex-row py-8 px-[8.25%] bg-gray-50 gap-x-4">
      <div className="grow">
        <h2 className="text-4xl font-semibold mb-8 soyuz-grotesk">Your cart</h2>
        <div className="px-8 py-4 rounded-3xl shadow-sm bg-white">
          <table>
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
                  className="border-b pb-1 text-sm"
                />
              </tr>
              <tr>
                <td colSpan={4}>
                  <div className="w-full px-6 py-3 rounded-xl bg-gray-100 flex">
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
      <div className="lg:w-1/4 flex flex-col items-center gap-5 px-6 py-4 rounded-3xl shadow-sm bg-white">
        <h3 className="text-2xl font-medium mb-2">Your details</h3>
        <input
          placeholder="Enter your name"
          className="border-b pb-1 w-full  text-base"
        />
        <input
          placeholder="Enter phone number"
          className="border-b pb-1 w-full text-base"
        />
        <div className="w-full flex gap-x-3">
          <input type="radio" />
          <p>Express Delivery</p>
        </div>
        <div className="w-full flex gap-x-3">
          <input type="radio" />
          <p>Standard Delivery</p>
        </div>
        <div className="flex gap-x-2 text-sm">
          <input placeholder="Home" className="border-b pb-1 w-full" />
          <input placeholder="Approach" className="border-b pb-1 w-full" />
          <input placeholder="Floor" className="border-b pb-1 w-full" />
          <input placeholder="Apartment" className="border-b pb-1 w-full" />
        </div>
        <input
          placeholder="Enter shipping address"
          className="border-b pb-1 w-full"
        />
      </div>
    </div>
  );
}
