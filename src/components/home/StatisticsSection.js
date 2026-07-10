import React from "react";

function StatisticsSection() {
  const statistics = [
    { value: "300", suffix: "+", description: "Resources available" },
    { value: "12k", suffix: "+", description: "Total Downloads" },
    { value: "10k", suffix: "+", description: "Active Users" }
  ];

  const Separator = () => (
    <div className="w-px self-stretch mx-8 max-sm:mx-0 bg-gray-300 dark:bg-neutral-800" />
  );

  return (
    <section className="border-t border-gray-300 dark:border-neutral-800">
      <section className="flex relative items-start w-full">
        {statistics.map((stat, index) => (
          <React.Fragment key={index}>
            <StatisticItem
              value={stat.value}
              suffix={stat.suffix}
              description={stat.description}
            />
            {index < statistics.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </section>
    </section>
  );
}

export default StatisticsSection;

function StatisticItem({ value, suffix, description }) {
  return (
    <div className="flex relative flex-col flex-1 justify-center gap-2.5 items-start py-6 min-h-[130px] md:py-4 sm:py-2">
      <div className="relative w-full font-bold leading-tight tracking-tight text-[2rem] max-sm:text-[1.5rem]">
        <span className="text-gray-900 dark:text-white">{value}</span>
        <span className="text-yellow-500">{suffix}</span>
      </div>

      <p className="relative w-full text-gray-500 dark:text-neutral-400 text-[1rem] leading-relaxed tracking-tight max-sm:text-[0.8rem]">
        {description}
      </p>
    </div>
  );
}
