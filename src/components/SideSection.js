import Image from "next/image";
import { ViewAllButton } from "./sectionHeader/SectionHeader";

export default function SideSection() {
  return (
    <div className="relative w-full h-full overflow-hidden min-h-64 border border-gray-200 dark:border-neutral-800 rounded-lg">
      {/* Background Image */}
      <Image
        src="/assets/bg.webp"
        alt="Decorative scene"
        fill
        className="object-cover object-center"
        priority={false}
      />

      {/* Overlay for better contrast in light mode */}
      <div className="absolute inset-0 bg-white/30 dark:bg-black/30 mix-blend-overlay" />

      <section className="flex gap-4 flex-col absolute bottom-10 z-10 text-gray-900 dark:text-white">
        {/* Avatars */}
        <div className="flex h-auto pl-10 items-end max-sm:px-2">
          <div className="flex border rounded-full px-2 py-1 items-end bg-white/20 dark:bg-black/20">
            <span className="w-12 h-12 max-sm:w-8 max-sm:h-8 rounded-full bg-red-500"></span>
            <span className="w-12 h-12 max-sm:w-8 max-sm:h-8 ml-[-12px] rounded-full bg-green-500"></span>
            <span className="w-12 h-12 max-sm:w-8 max-sm:h-8 ml-[-12px] rounded-full bg-blue-500"></span>
            <span className="w-12 h-12 max-sm:w-8 max-sm:h-8 ml-[-12px] rounded-full bg-yellow-500"></span>
          </div>
        </div>

        {/* Text Content */}
        <div className="pl-10 max-sm:px-2 space-y-1">
          <p className="text-lg font-semibold">Explore 1000+ resources</p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Over 1,000 articles on emerging tech trends and breakthroughs.
          </p>
        </div>

        {/* Button */}
        {/* <div className="pl-10 max-sm:px-2">
          <ViewAllButton text={"Explore Resources"} />
        </div> */}
      </section>
    </div>
  );
}
