import Hero from "@/components/Hero/Hero";
import NewSection from "@/components/NewSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pb-8 pb-24  mx-[8.25%]">
      <Hero />
      <NewSection />
    </main>
  );
}
