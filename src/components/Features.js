import React from "react";
import { BookOpen, Download, Globe, Zap, FolderOpen, Award } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "10,000+ Documents",
    description: "Access a massive library of notes, past papers, books, and handouts from top Pakistani universities."
  },
  {
    icon: Download,
    title: "100% Free",
    description: "No hidden costs, no subscriptions, no registration required. Download everything without limits."
  },
  {
    icon: Globe,
    title: "All Universities",
    description: "Resources from VU, AIOU, NUST, LUMS, UET, FAST, and 45+ other Pakistani institutions."
  },
  {
    icon: Zap,
    title: "Instant Access",
    description: "Download documents instantly without waiting times or approval processes."
  },
  {
    icon: FolderOpen,
    title: "Organized by Subject",
    description: "Browse materials organized by university, course, subject, and academic level for easy discovery."
  },
  {
    icon: Award,
    title: "Pakistan Focused",
    description: "Built specifically for Pakistani students. Content verified and curated by educators."
  }
];

export function Features() {
  return (
    <section className="w-full py-16 md:py-24 relative overflow-hidden bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Left Aligned */}
        <div className="mb-16">
          <span className="text-xs font-medium text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-full inline-block mb-4">
            WHY CHOOSE Techolyze
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4 leading-tight max-w-2xl">
            Everything students need
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl">
            Free educational resources designed specifically for Pakistani students
          </p>
        </div>

        {/* Features Grid - Left Aligned */}
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex gap-6 p-6 bg-white border border-neutral-200 rounded-lg hover:border-neutral-300 hover:shadow-md transition-all duration-200"
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <Icon className="h-6 w-6 text-neutral-900" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;


{/* <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
              Liquid
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                Excellence
              </span>
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto font-normal">
              Experience the pinnacle of digital craftsmanship with our macOS-inspired liquid interface
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group relative p-8 backdrop-blur-3xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 rounded-3xl border border-white/90 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:border-white/100 hover:bg-white/80 overflow-hidden hover:scale-105 group-hover:shadow-blue-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-cyan-300/15 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:  transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/60 via-blue-600/50 to-blue-700/60 backdrop-blur-xl rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 border border-white/60 shadow-2xl">
                  <BookOpen className="h-7 w-7 text-white drop-shadow-lg" />
                </div>
                <h3 className="text-2xl font-normal text-gray-900 mb-3">Curated Excellence</h3>
                <p className="text-gray-700 leading-relaxed text-base font-light">
                  Every document undergoes rigorous expert review. We prioritize quality over quantity, ensuring only the finest educational content reaches our platform.
                </p>
              </div>
            </div>

            <div className="group relative p-8 backdrop-blur-3xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 rounded-3xl border border-white/90 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:border-white/100 hover:bg-white/80 overflow-hidden hover:scale-105 group-hover:shadow-green-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 via-green-300/15 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:  transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/60 via-green-600/50 to-green-700/60 backdrop-blur-xl rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500 border border-white/60 shadow-2xl">
                  <Download className="h-7 w-7 text-white drop-shadow-lg" />
                </div>
                <h3 className="text-2xl font-normal text-gray-900 mb-3">Instant Velocity</h3>
                <p className="text-gray-700 leading-relaxed text-base font-light">
                  Lightning-fast downloads with zero registration barriers. Experience the smoothest content access with our optimized delivery system.
                </p>
              </div>
            </div>

            <div className="group relative p-8 backdrop-blur-3xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 rounded-3xl border border-white/90 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:border-white/100 hover:bg-white/80 overflow-hidden hover:scale-105 group-hover:shadow-purple-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-pink-300/15 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:  transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500/60 via-purple-600/50 to-purple-700/60 backdrop-blur-xl rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 border border-white/60 shadow-2xl">
                  <Users className="h-7 w-7 text-white drop-shadow-lg" />
                </div>
                <h3 className="text-2xl font-normal text-gray-900 mb-3">Global Network</h3>
                <p className="text-gray-700 leading-relaxed text-base font-light">
                  Connect with millions of learners worldwide. Share knowledge, collaborate on projects, and grow together in our vibrant educational ecosystem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}