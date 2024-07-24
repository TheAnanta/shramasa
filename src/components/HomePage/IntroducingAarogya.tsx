export function IntroducingAarogya() {
  return (
    <div className="aspect-square w-1/2 relative">
      <div
        style={{
          background:
            'linear-gradient(217deg, rgba(0, 0, 0, 0.00) 41.04%, rgba(0, 0, 0, 0.50) 70.08%), url("/images/banners/introducing-aarogya.jpg") lightgray 50% / cover no-repeat',
        }}
        className="w-full h-full rounded-2xl"
      />
      <div className="absolute bottom-0 p-3 px-5">
        <p className="!text-white">Introducing</p>
        <p className="font-bold text-2xl !text-white">
          Aarogya
          <br />
          Tatineni
        </p>
        <div className="flex items-center">
          <p className="!text-white">for</p>
          <img src="/navbar/logo.svg" className="h-6 w-max brightness-[130%]" />
        </div>
      </div>
    </div>
  );
}
