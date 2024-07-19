import HeroCard from "./hero-card";
import styles from "./hero.module.css";

export default function Hero() {
  return (
    <div className={`${styles.hero} flex flex-col w-full gap-3`}>
      <div className={`${styles.carousel} rounded-3xl`}></div>
      <div className="grow gap-3 flex flex-col">
        <div className="h-[64%] relative">
          <HeroCard>
            <p>Hello</p>
          </HeroCard>
          <img src="" className="absolute" />
        </div>
        <div className="flex gap-3 grow">
          <HeroCard></HeroCard>
          <HeroCard></HeroCard>
        </div>
      </div>
    </div>
  );
}
