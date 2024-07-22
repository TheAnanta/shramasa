import styles from "./hero.module.css";

export default function HeroCard({ className, children }: any) {
  return (
    <div className={`${styles.card} w-full rounded-3xl h-full ${className}`}>
      {children}
    </div>
  );
}
