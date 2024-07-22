export function CartItem() {
  return (
    <tr className="border-t">
      <td className="shink-0">
        <div className="flex gap-x-5">
          <img
            src="/images/products/hair-shampoo-banner.png"
            className="w-[125px] h-[125px] rounded-2xl bg-gray-100 object-cover dark:bg-gray-950"
          />
          <div className="flex flex-col">
            <p className="text-[0.65rem] font-medium uppercase opacity-65">
              Product name
            </p>
            <p className="text-[1.05rem] mt-2 font-semibold uppercase w-[14ch]">
              face creame for skin care
            </p>
            <p className="text-[0.98rem] opacity-60 mt-auto">200 ml</p>
          </div>
        </div>
      </td>
      <td>
        <div className="flex gap-x-[18px] items-center rounded-2xl bg-gray-50 dark:bg-gray-950/30">
          <div className="p-2 bg-gray-100 dark:bg-gray-950">
            <img src="/icons/minus.svg" className="size-4" />
          </div>
          <p>1</p>
          <div className="p-2 bg-gray-100 dark:bg-gray-950">
            <img src="/icons/plus.svg" className="size-4" />
          </div>
        </div>
      </td>
      <td className="font-semibold">₹100.00 </td>
      <td className="!mr-0">
        <div className="p-2 bg-gray-100 dark:bg-gray-950">
          <img src="/icons/delete.svg" className="size-6" />
        </div>
      </td>
    </tr>
  );
}
