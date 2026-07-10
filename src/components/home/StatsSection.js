import Image from "next/image";
import React from "react";

export const Separator = () => {
  return (
    <div className="w-px self-stretch mx-8 max-sm:mx-0 bg-neutral-200 dark:bg-neutral-800 max-sm:w-full max-sm:h-px max-sm:self-auto" />
  );
};

const StatsSection = () => {
  const statsData = [
    {
      iconType: "/assets/news.svg",
      title: "Latest News Updates",
      subtitle: "Stay Current",
      description: "Over 1,000 articles published monthly",
      href: "/news",
    },
    {
      iconType: "/assets/expert.svg",
      title: "Expert Contributors",
      subtitle: "Trusted Insights",
      description: "50+ renowned AI experts on our team",
      href: "/experts",
    },
    {
      iconType: "/assets/global.svg",
      title: "Global Readership",
      subtitle: "Worldwide Impact",
      description: "2 million monthly readers",
      href: "/global",
    },
  ];

  return (
    <section className="border-t border-neutral-200 dark:border-neutral-800">
      <section className="flex relative items-start g-px w-full max-sm:flex-col">
        {statsData.map((stat, index) => (
          <React.Fragment key={index}>
            <StatCard
              iconType={stat.iconType}
              title={stat.title}
              subtitle={stat.subtitle}
              description={stat.description}
            />
            {index < statsData.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </section>
    </section>
  );
};

export default StatsSection;

const StatCard = ({ iconType, title, subtitle, description }) => {
  const ArrowButton = ({ onClick, className = "" }) => (
    <button
      onClick={onClick}
      className={`flex relative gap-2.5 items-start p-3.5 bg-yellow-400 rounded-[100px] max-sm:p-3 ${className} hover:bg-yellow-500 transition`}
      aria-label="Learn more"
    >
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[24px] max-sm:w-[20px] h-[24px] max-sm:h-[20px] relative"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.58325 4.25L19.8333 4.25C20.0322 4.25 20.2229 4.32902 20.3636 4.46967C20.5042 4.61032 20.5833 4.80109 20.5833 5V16.25C20.5833 16.6642 20.2475 17 19.8333 17C19.419 17 19.0833 16.6642 19.0833 16.25V6.81066L5.36358 20.5303C5.07069 20.8232 4.59582 20.8232 4.30292 20.5303C4.01003 20.2374 4.01003 19.7626 4.30292 19.4697L18.0226 5.75L8.58325 5.75C8.16904 5.75 7.83325 5.41421 7.83325 5C7.83325 4.58579 8.16904 4.25 8.58325 4.25Z"
          fill="#141414"
        />
      </svg>
    </button>
  );

  return (
    <article className="flex relative flex-col flex-1 gap-8 justify-center py-12 max-md:py-8 max-sm:gap-5 max-sm:py-8">
      <div className="flex relative flex-col gap-8 w-full max-sm:gap-5">
        <div>
          <Image
            src={iconType}
            width={50}
            height={50}
            alt="icon"
            className="w-[50px] max-sm:w-[40px] h-[50px] max-sm:h-[40px] relative"
          />
        </div>
        <div className="flex relative gap-5 items-center w-full max-sm:gap-4">
          <div className="flex relative flex-col flex-1 gap-1 items-start">
            <h3 className="relative w-full text-xl tracking-tight leading-8 text-gray-900 dark:text-white max-md:text-lg max-sm:text-base max-sm:tracking-tight">
              {title}
            </h3>
            <p className="relative w-full text-lg tracking-tight leading-7 text-gray-600 dark:text-zinc-500 max-md:text-base max-sm:text-sm max-sm:tracking-tight">
              {subtitle}
            </p>
          </div>
          <ArrowButton />
        </div>
      </div>
      <p className="relative w-full text-xl tracking-tight leading-8 text-gray-700 dark:text-gray-300 max-md:text-lg max-sm:text-base max-sm:tracking-tight">
        {description}
      </p>
    </article>
  );
};
