import StatisticsSection from "../../components/home/StatisticsSection";
import StatsSection from "../../components/home/StatsSection";
import FutureTechSection from "../../components/home/techFeatureSection/FutureTechSection";
import ItemsContainer from "../../components/home/testimonial/Testimonial";
import SideSection from "../../components/SideSection";

export default function Page() {
  return (
 <div className="bg-white dark:bg-zinc-950 text-gray-900 dark:text-white ">
  <main className="flex relative max-lg:flex-col items-stretch gap-6 g-px">
    <header className="flex flex-col gap-8 flex-[2] max-w-[60%] pt-24 max-lg:max-w-full max-md:pt-20 max-sm:pt-16 max-sm:gap-5 ">
      <p className="text-zinc-500 dark:text-zinc-400 text-3xl tracking-tight leading-9 max-md:text-2xl max-sm:text-xl">
        Your Journey to Tomorrow Begins Here
      </p>
      <div className="flex flex-col gap-5 w-full pb-6 pr-4">
        <h1 className="text-[3.8rem] leading-[84px] tracking-tight font-bold max-lg:text-6xl max-md:text-5xl max-sm:text-3xl">
          Explore the Frontiers of Artificial Intelligence
        </h1>
        <p className="text-zinc-400 dark:text-zinc-300 text-lg leading-7 max-md:text-base max-sm:text-sm">
          Welcome to the epicenter of AI innovation. <span className="text-yellow-500">FutureTech AI News</span> is your passport
          to a world where machines think, learn, and reshape the future.
        </p>
      </div>
      <StatisticsSection />
    </header>

    <aside className="border border-gray-200 dark:border-neutral-800 flex-1 w-full min-h-64 rounded-xl p-4 bg-white dark:bg-neutral-900">
      <SideSection />
    </aside>
  </main>

  <StatsSection />
  <FutureTechSection />
  <ItemsContainer />
</div>

  );
}
