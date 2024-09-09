import Hero from "@/components/Hero/Hero";
import NewSection from "@/components/NewSection";
import { FaqSection } from "@/components/HomePage/FAQSection";
import { UserReview } from "@/components/HomePage/UserReview";
import { AMASection } from "@/components/HomePage/AMASection";
import { IntroducingAarogya } from "@/components/HomePage/IntroducingAarogya";
import { LongerSocialReview } from "@/components/HomePage/LongerSocialReview";
import { SocialReview } from "@/components/HomePage/SocialReview";
import { OurProofSection } from "@/components/HomePage/OurProofSection";
import CategoriesSection from "@/components/CategoriesSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pb-24  mx-[8.25%]">
      <Hero />
      <NewSection />
      <CategoriesSection />
      <div className="w-full space-y-3 my-6">
        <table>
          <tbody>
            <tr>
              <td className="w-max">
                <div className="p-14 pb-6 shrink-0 dark:bg-neutral-800 bg-[#F2F2F2] rounded-3xl md:mr-3">
                  <p className="text-3xl md:text-5xl soyuz-grotesk md:w-[20ch]">
                    What makes us different?
                  </p>
                  <ul className="grid md:grid-cols-2 pt-10 pb-8 gap-y-3">
                    {[
                      "All Natural Products",
                      "No Chemicals",
                      "Smooth Texture",
                      "Skin glows effectively",
                      "Hair Enhanced",
                      "Made in Bharat",
                    ].map((e) => {
                      return (
                        <li key={e} className="flex items-center gap-3">
                          <span className="material-symbols-outlined">
                            check_circle
                          </span>{" "}
                          {e}
                        </li>
                      );
                    })}
                  </ul>
                  <div className="flex justify-between items-start">
                    <button className="py-2 px-6 font-semibold bg-[#46A627] text-white rounded-full h-max">
                      move on to know more
                    </button>
                    <img
                      src="/icons/arrow_down.svg"
                      className="size-12 ml-auto"
                    />
                  </div>
                </div>
              </td>
              <td className='w-full rounded-3xl bg-[url("/images/banners/organic-cosmetics.jpg")] hidden md:table-cell'></td>
            </tr>
          </tbody>
        </table>
        <div className="flex gap-3 flex-col md:flex-row">
          <img
            src="/images/banners/woman-beauty.jpg"
            className="md:w-[64%] shrink-0 h-52 object-cover rounded-2xl"
          />
          <OurProofSection />
        </div>
        <div className="gap-3 flex flex-col md:flex-row">
          <FaqSection />
          <div className="md:w-1/2 space-y-3">
            <div className="flex gap-3 w-full">
              <IntroducingAarogya />
              <AMASection />
            </div>
            <UserReview />
            <div className="h-40 flex gap-3 flex-col lg:flex-row">
              <LongerSocialReview />
              <SocialReview />
            </div>
          </div>
        </div>
      </div>
      {/* Add more sections here */}
    </main>
  );
}
