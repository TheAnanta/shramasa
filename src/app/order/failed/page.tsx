"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function FailedOrder(){
    const searchParams = useSearchParams();
    return (<div className="flex flex-col gap-12 my-12 mx-12 items-center justify-center">
        <div className="px-4 md:px-8 rounded-2xl md:rounded-3xl shadow-sm bg-red-50 dark:bg-neutral-900">
      <div className="h-96 flex items-center justify-center flex-col">
              <span className={"material-symbols-outlined mb-4"}>
                shopping_bag
              </span>
              <p className="text-xl font-bold">Ooops!!</p>
              <p className="md:w-[65ch] mb-4 mt-4 text-center">
                We couldn't place your order. There's seems to be something wrong.<br/>Please try again after some time.<br/><br/>
                Order ID: #{searchParams.get("id")?.split("-")[0]}
              </p>
            
              <Link className="cursor-pointer flex text-red-500" href={"/cart"}>
                        <span className="material-symbols-outlined text-red-500">
                        chevron_left
                        </span>{" "}
                        Back to cart
                      </Link>
            </div>
       </div>
    </div>)
}