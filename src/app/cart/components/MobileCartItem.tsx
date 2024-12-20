export function MobileCartItem(props: {
  isFirstItem: boolean;
  image: string;
  price: number;
  name: String;
  description: string;
  category: string;
  quantity: string;
}) {
  return (
    <div
      className={`flex-col flex gap-1 py-5 ${
        props.isFirstItem ? `` : `border-t`
      }`}
    >
      <div className="flex gap-x-5">
        <img
          src={props.image}
          className="w-[125px] h-[125px] rounded-2xl bg-neutral-100 dark:bg-neutral-950 object-cover"
        />
        <div className="flex flex-col">
          <p className="text-[0.65rem] font-medium uppercase opacity-65"></p>
          <p className="text-[1.05rem] mt-2 font-semibold uppercase w-[14ch]">
            {props.description}
          </p>
          <p className="text-[0.98rem] opacity-60">200 ml</p>
          <p className="font-semibold">₹{props.price} </p>
        </div>
      </div>
      <div className="ml-auto">
        <div className="flex gap-4 pt-2">
          <div className="flex gap-x-[18px] items-center rounded-2xl bg-neutral-50 dark:bg-neutral-950/50">
            <div className="p-2 bg-neutral-100 dark:bg-neutral-950">
              <img src="/icons/minus.svg" className="size-4" />
            </div>
            <p>{props.quantity}</p>
            <div className="p-2 bg-neutral-100 dark:bg-neutral-950">
              <img src="/icons/plus.svg" className="size-4" />
            </div>
          </div>
          <div className="p-2 bg-neutral-100 dark:bg-neutral-950">
            <img src="/icons/delete.svg" className="size-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
