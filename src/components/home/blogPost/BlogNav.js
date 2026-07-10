"use client";
import React, { useState } from "react";

const filters = [
  "All",
  "Quantum Computing",
  "AI Ethics",
  "Space Exploration",
  "Biotechnology",
  "Renewable Energy",
];

export default function BlogNav() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <nav className="container mx-auto w-full overflow-x-auto py-4 scrollbar-hide scroll-smooth">
      <ul className="flex gap-2 md:gap-4 ">
        {filters.map((filter) => (
          <li key={filter}>
            <button
              onClick={() => setActiveFilter(filter)}
              className={`whitespace-nowrap px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200
                ${
                  activeFilter === filter
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-neutral-400 border-neutral-700 hover:text-white hover:border-neutral-500"
                }
              `}
            >
              {filter}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
