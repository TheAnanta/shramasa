"use client";

import { useState } from "react";

export function FaqSection() {
  const [expanded, setExpandedIndex] = useState(-1);
  return (
    <div className="md:w-1/2 dark:bg-neutral-800 bg-[#F2F2F2] p-12 flex-col flex rounded-3xl">
      {/* FAQ */}
      <p className="text-3xl md:text-5xl soyuz-grotesk">
        Frequently Asked Questions
      </p>
      <div className="my-auto space-y-8 mt-8">
        <div className="flex items-start justify-between">
          <p className={expanded == 0 ? 'font-bold' : ''}>What are the benefits of using sulfate-free shampoo?</p>
          <span onClick={() => setExpandedIndex(expanded == 0 ? -1 : 0)} className="material-symbols-outlined cursor-pointer">{expanded != 0 ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}</span>
        </div>
        {expanded == 0 && <p>Sulfate-free shampoos are gentler on hair, as they don’t strip natural oils. 🌿 They help keep hair hydrated, reduce color fading, and are less irritating for sensitive scalps. 💧 Perfect for dry, curly, or color-treated hair! 💆‍♀️</p>}
        <div className="flex items-start justify-between">
          <p className={expanded == 1 ? 'font-bold' : ''}>How often should I use a hair mask?</p>
          <span onClick={() => setExpandedIndex(expanded == 1 ? -1 : 1)} className="material-symbols-outlined cursor-pointer">{expanded != 1 ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}</span>
        </div>
        {expanded == 1 && <p>For dry or damaged hair, use a mask once a week. 🧴 Healthy hair benefits from a mask every 2-3 weeks. If you have oily hair, go for once a month. Curly hair? Weekly masks keep moisture locked in! 💆‍♂️</p>}
        <div className="flex">
          <p className={expanded == 2 ? 'font-bold' : ''}>
            What is the diff items-start justify-betweenerence between conditioner and leave-in conditioner?
          </p>
          <span onClick={() => setExpandedIndex(expanded == 2 ? -1 : 2)} className="material-symbols-outlined">{expanded != 2 ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}</span>
        </div>
        {expanded == 2 && <p>Conditioner is rinsed out after shampooing and restores moisture. 💧 Leave-in conditioner stays in the hair for ongoing hydration and frizz control throughout the day. 🌟 Both help with detangling, but leave-in gives extra protection.</p>}
        <div className="flex items-start justify-between">
          <p className={expanded == 3 ? 'font-bold' : ''}>Can I use hair oil on all hair types?</p>
          <span onClick={() => setExpandedIndex(expanded == 3 ? -1 : 3)} className="material-symbols-outlined cursor-pointer">{expanded != 3 ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}</span>
        </div>

        {expanded == 3 && <p>Yes! ✨ Choose lightweight oils (like argan or jojoba) for fine hair, and heavier oils (like coconut or castor) for thick or coarse hair. Curly hair loves oil for moisture and definition. Just apply sparingly! 💧</p>}
        <div className="flex items-start justify-between">
          <p className={expanded == 4 ? 'font-bold' : ''}>How can I prevent hair frizz?</p>
          <span onClick={() => setExpandedIndex(expanded == 4 ? -1 : 4)} className="material-symbols-outlined cursor-pointer">{expanded != 4 ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}</span>
        </div>
        {expanded == 4 && <p>Keep hair moisturized with hydrating products. 💦 Avoid heat damage, use anti-frizz serums, and try a silk pillowcase 🛏️. Don’t over-wash—2-3 times a week is ideal for most hair types. ✨</p>}
        <div className="flex items-start justify-between">
          <p className={expanded == 5 ? 'font-bold' : ''}>Is it bad to wash my hair every day?</p>
          <span onClick={() => setExpandedIndex(expanded == 5 ? -1 : 5)} className="material-symbols-outlined cursor-pointer">{expanded != 5 ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}</span>
        </div>
        {expanded == 5 && <p>Washing daily can strip moisture, especially for dry or curly hair. 🚫 Fine or oily hair might need daily washing, but try to cut back to avoid over-drying. Dry shampoo can help in between washes! 🌸</p>}
      </div>
    </div>
  );
}
