"use client";
import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SectionHeader = ({ badge, heading, buttonText }) => {
  return (
    <section className="flex gap-52 items-center py-12 w-full border border-neutral-200 dark:bg-zinc-900 dark:border-neutral-800 max-md:gap-24 max-sm:flex-col max-sm:gap-10 max-sm:py-4">
      <div className="flex flex-col g-px flex-1 gap-4 justify-center items-start max-sm:w-full">
        {badge && <Badge>{badge}</Badge>}

        <div className="flex justify-between items-center w-full gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            {heading && (
              <p className="text-5xl tracking-tighter leading-[57.2px] text-zinc-900 dark:text-white max-md:text-4xl max-sm:text-3xl">
                {heading}
              </p>
            )}
          </div>

          {buttonText && (
            <div className="max-sm:w-full">
              <ViewAllButton text={buttonText} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export const ViewAllButton = ({ text }) => {
  const router = useRouter();
  return (
    <button
      className="flex gap-1 items-center px-5 py-3.5 rounded-lg border bg-white border-neutral-200 text-zinc-800 hover:bg-neutral-100 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-400 max-sm:justify-center max-sm:w-full"
      onClick={() => router.push("/ai/p/1")}
    >
      <span className="text-sm tracking-tight leading-5">{text}</span>
      <Image
        src="/assets/arrow-up-right.svg"
        alt="arrow icon"
        width={15}
        height={15}
        className="ml-2"
      />
    </button>
  );
};

export const Badge = ({ children }) => {
  return (
    <div className="gap-2.5 px-2 py-1 text-base tracking-tight leading-6 text-zinc-800 bg-zinc-400 rounded dark:text-white dark:bg-zinc-800 max-sm:text-sm max-sm:tracking-tight">
      {children}
    </div>
  );
};

export default SectionHeader;
