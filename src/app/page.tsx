import Hero from "@/components/Hero/Hero";
import NewSection from "@/components/NewSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pb-24  mx-[8.25%]">
      <Hero />
      <NewSection />
      <div className="w-full space-y-3 my-6">
        <table>
          <tbody>
            <tr>
              <td className="w-max">
                <div className="p-14 shrink-0 bg-[#F2F2F2] rounded-3xl mr-3">
                  <p className="text-3xl md:text-5xl soyuz-grotesk w-[20ch]">
                    What makes us different?
                  </p>
                  <ul className="grid grid-cols-2 pt-10 pb-8">
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Lorem ipsum dolor sit amet</li>
                  </ul>
                  <button className="py-2 px-6 font-semibold bg-[#46A627] text-white rounded-full">
                    move on to know more
                  </button>
                </div>
              </td>
              <td className='w-full rounded-3xl bg-[url("/images/banners/organic-cosmetics.jpg")]'></td>
            </tr>
          </tbody>
        </table>
        <div className="flex gap-3">
          <img
            src="/images/banners/woman-beauty.jpg"
            className="w-[64%] shrink-0 h-52 object-cover rounded-2xl"
          />
          <div className="bg-[#F2F2F2] grow rounded-3xl py-9 flex flex-col justify-between">
            <p className="text-xl font-semibold px-9">Our proof</p>
            <div className="flex overflow-x-hidden">
              <img
                src="/images/proofs/badge_one.svg"
                className="size-20 mx-[1.125rem]"
              />
              <img
                src="/images/proofs/badge_one.svg"
                className="size-20 mx-[1.125rem]"
              />
              <img
                src="/images/proofs/badge_one.svg"
                className="size-20 mx-[1.125rem]"
              />
              <img
                src="/images/proofs/badge_one.svg"
                className="size-20 mx-[1.125rem]"
              />
              <img
                src="/images/proofs/badge_one.svg"
                className="size-20 mx-[1.125rem]"
              />
            </div>
          </div>
        </div>
        <div className="space-x-3 flex">
          <div className="w-1/2 bg-[#F2F2F2] p-12 flex-col flex rounded-3xl">
            {/* FAQ */}
            <p className="text-3xl md:text-5xl soyuz-grotesk">
              Frequently Asked Questions
            </p>
            <div className="my-auto space-y-8">
              <div className="flex">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                  ultrices rutrum ante, vel volutpat mi.
                </p>
                <img className="ml-6 size-8 shrink-0" />
              </div>
              <div className="flex">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                  ultrices rutrum ante, vel volutpat mi.
                </p>
                <img className="ml-6 size-8 shrink-0" />
              </div>
              <div className="flex">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                  ultrices rutrum ante, vel volutpat mi.
                </p>
                <img className="ml-6 size-8 shrink-0" />
              </div>
              <div className="flex">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                  ultrices rutrum ante, vel volutpat mi.
                </p>
                <img className="ml-6 size-8 shrink-0" />
              </div>

              <div className="flex">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                  ultrices rutrum ante, vel volutpat mi.
                </p>
                <img className="ml-6 size-8 shrink-0" />
              </div>
              <div className="flex">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                  ultrices rutrum ante, vel volutpat mi.
                </p>
                <img className="ml-6 size-8 shrink-0" />
              </div>
            </div>
          </div>
          <div className="w-1/2 space-y-3">
            <div className="flex gap-3 w-full">
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
                    <img
                      src="/navbar/logo.svg"
                      className="h-6 w-max brightness-[130%]"
                    />
                  </div>
                </div>
              </div>
              <div className="aspect-square border-[#F2F2F2] border-2 p-8 w-1/2 flex flex-col rounded-2xl">
                <img src="/icons/arrow.svg" className="size-8" />
                <p className="text-2xl font-bold mb-2 mt-auto">#AMA</p>
                <p>choose care from Shramasa BioPr.</p>
              </div>
            </div>
            <div className="p-8 bg-[#7CD260]/30 rounded-3xl">
              <p className="text-sm w-[52ch]">
                “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                ultrices rutrum ante, vel volutpat mi. Proin sapien eros,
                ultrices a dictum et, blandit a neque. Donec bibendum est sed
                diam viverra mollis. Curabitur sed purus suscipit, facilisis
                erat vel, euismod lacus. Aliquam id libero iaculis, iaculis sem
                sit amet, consectetur nisl.”
              </p>
              <img src="/cart/star.svg" className="mt-8" />
              <p className="mt-3">Mrs. Michelangelo Muchlongername </p>
              <p>Visakhapatnam</p>
            </div>
            <div className="h-40 flex gap-3">
              <div
                style={{
                  background:
                    "linear-gradient(279deg, rgba(0, 0, 0, 0.00) 30.06%, rgba(0, 0, 0, 0.20) 96.73%), url(/images/banners/mireender-keer.jpg) lightgray 50% / cover no-repeat",
                }}
                className="w-[72%] h-full shrink-0 rounded-2xl overflow-clip p-4 flex flex-col"
              >
                <p className="text-[12px] line-clamp-3 w-[56%] text-white opacity-70">
                  “Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Fusce ultrices rutrum ante, vel volutpat mi. Proin sapien
                  eros, ultrices a dictum et, blandit a neque. Donec bibendum
                  est sed diam viverra mollis. Curabitur sed purus suscipit,
                  facilisis erat vel, euismod lacus. Aliquam id libero iaculis,
                  iaculis sem sit amet, consectetur nisl.”
                </p>
                <img className="size-5 mb-2 mt-auto" src="" />
                <p className="text-[8px] px-2 py-[8px] bg-white w-max rounded-full">
                  @mirandakeer.official
                </p>
              </div>
              <div
                className="grow h-full rounded-2xl overflow-clip flex flex-col p-4"
                style={{
                  background:
                    "linear-gradient(200deg, rgba(0, 0, 0, 0.00) 40.06%, rgba(0, 0, 0, 0.50) 96.73%), url(/images/banners/organic-cosmetics-fb.jpg) lightgray 50% / cover no-repeat",
                }}
              >
                <img className="size-5 mb-2 mt-auto" src="" />
                <p className="text-[8px] px-2 py-[8px] bg-white w-max rounded-full">
                  @cosmetics_world
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add more sections here */}
    </main>
  );
}
