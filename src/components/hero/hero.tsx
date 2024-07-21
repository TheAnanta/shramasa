import HeroCard from "./hero-card";
import styles from "./hero.module.css";
import Link from "next/link";

export default function Hero() {
  return (
    <div className={`${styles.hero} flex flex-col w-full gap-3`}>
      <div className={`${styles.carousel} rounded-3xl`}>
        <Link href="/cart">
          <img
            src="/images/products/hair-shampoo-banner.png"
            className="h-full w-full object-cover rounded-3xl"
          />
        </Link>
      </div>
      <div className="grow gap-3 flex flex-col">
        <div className="h-[64%] shrink-0 relative">
          <HeroCard className={`${styles.organic}`}>
            <div className="h-full flex flex-col justify-between">
              <h1 className={`${styles.soyuzgrotesk} text-3xl md:text-6xl`}>
                Completely <span>bio-</span>
              </h1>
              <h1 className={`${styles.soyuzgrotesk} text-3xl md:text-6xl`}>
                Organic
              </h1>
              <div>
                <p className="w-[28ch] mb-6 md:text-base text-sm">
                  choose care from Shramasa BioPr. Organic and Biotherm.
                </p>
                <button className="px-6 py-3 bg-[#46A627] rounded-full text-sm text-white">
                  move on to know more
                </button>
              </div>
            </div>
          </HeroCard>
          <img
            src="/images/leaves-right.png"
            className="absolute -bottom-4 h-[15vh] md:h-[25vh] -right-4"
          />
        </div>
        <div className="flex gap-3 grow h-full">
          <HeroCard className={"flex flex-col !py-4"}>
            <div>
              <img
                src="/icons/arrow_down.svg"
                className="size-8 md:hidden ml-auto -rotate-90"
              />
              <img
                src="/images/products/mockup.png"
                className="h-[12vh] object-contain md:h-[15vh] mix-blend-multiply"
              />
              <div className="flex justify-between items-end">
                <p className="md:w-[15ch] text-sm">
                  choose care for your purified face FACE 48H
                </p>
                <img
                  src="/icons/arrow_down.svg"
                  className="size-12 hidden md:flex"
                />
              </div>
            </div>
          </HeroCard>
          <HeroCard className={"flex flex-col !py-4"}>
            <div>
              <img
                src="/icons/arrow_down.svg"
                className="size-8 md:hidden ml-auto -rotate-90"
              />
              <img
                src="/images/products/mockup-two.png"
                className="h-[12vh] object-contain md:h-[14.5vh] mix-blend-multiply"
              />
              <div className="flex justify-between items-end">
                <p className="md:w-[15ch] text-sm">
                  choose care for your shiny, silky hair HAIR 48H
                </p>
                <img
                  src="/icons/arrow_down.svg"
                  className="size-12 hidden md:flex"
                />
              </div>
            </div>
          </HeroCard>
        </div>
      </div>
    </div>
  );
}
