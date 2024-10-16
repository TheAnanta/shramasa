export function FaqSection() {
  return (
    <div className="md:w-1/2 dark:bg-neutral-800 bg-[#F2F2F2] p-12 flex-col flex rounded-3xl">
      {/* FAQ */}
      <p className="text-3xl md:text-5xl soyuz-grotesk">
        Frequently Asked Questions
      </p>
      <div className="my-auto space-y-8 mt-8">
        <div className="flex items-start justify-between">
          <p>What are the benefits of using sulfate-free shampoo?</p>
          <span className="material-symbols-outlined">keyboard_arrow_down</span>
        </div>
        <div className="flex items-start justify-between">
          <p>How often should I use a hair mask?</p>
          <span className="material-symbols-outlined">keyboard_arrow_down</span>
        </div>
        <div className="flex">
          <p>
            What is the diff items-start justify-betweenerence between conditioner and leave-in conditioner?
          </p>
          <span className="material-symbols-outlined">keyboard_arrow_down</span>
        </div>
        <div className="flex items-start justify-between">
          <p>Can I use hair oil on all hair types?</p>
          <span className="material-symbols-outlined">keyboard_arrow_down</span>
        </div>

        <div className="flex items-start justify-between">
          <p>How can I prevent hair frizz?</p>
          <span className="material-symbols-outlined">keyboard_arrow_down</span>
        </div>
        <div className="flex items-start justify-between">
          <p>Is it bad to wash my hair every day?</p>
          <span className="material-symbols-outlined">keyboard_arrow_down</span>
        </div>
      </div>
    </div>
  );
}
