import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Users, Landmark, Cpu, Code2, Globe } from 'lucide-react';

export const metadata = {
  title: 'About Techolyze | Global AI & Technology Insights',
  description: 'Learn about Techolyze, our editorial review board, technical vetting guidelines, and mission to deliver global insights on Artificial Intelligence, software architecture, and emerging tech.',
  keywords: [
    'about techolyze',
    'AI tech blog',
    'artificial intelligence analysis',
    'software engineering articles',
    'emerging tech insights'
  ]
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#171717] text-white pt-24 pb-16">
      {/* Breadcrumbs / Back */}
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-yellow-400 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </nav>

      {/* Hero Header Section */}
      <header className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse" />
          <span className="text-xs font-bold tracking-wider uppercase text-yellow-400">
            About Techolyze
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight max-w-4xl">
          Decoding the Future of Technology and Artificial Intelligence
        </h1>
        <p className="text-lg text-zinc-400 max-w-3xl leading-relaxed font-light">
          Techolyze is a global technology publication. We deliver deep-dive software tutorials,
          AI model analyses, developer guides, and independent commentary on the innovations shaping our digital future.
        </p>
      </header>

      {/* Statistics Section (E-E-A-T Authoritativeness Signals) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 text-center">
            <p className="text-4xl font-extrabold text-yellow-400 mb-2">500+</p>
            <p className="text-sm text-zinc-400 uppercase tracking-wider font-semibold">Technical Articles</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 text-center">
            <p className="text-4xl font-extrabold text-yellow-400 mb-2">100k+</p>
            <p className="text-sm text-zinc-400 uppercase tracking-wider font-semibold">Monthly Readers</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 text-center">
            <p className="text-4xl font-extrabold text-yellow-400 mb-2">120+</p>
            <p className="text-sm text-zinc-400 uppercase tracking-wider font-semibold">Countries Reached</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 text-center">
            <p className="text-4xl font-extrabold text-yellow-400 mb-2">100%</p>
            <p className="text-sm text-zinc-400 uppercase tracking-wider font-semibold">Independent & Ad-Free</p>
          </div>
        </div>
      </section>

      {/* Editorial Vetting & Code Reproducibility (E-E-A-T Expertise Signals) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 border-t border-zinc-800/60 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Mission Description */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Our Mission: Elevating Developer Knowledge
            </h2>
            <p className="text-zinc-300 leading-relaxed font-light">
              In an era of rapid AI integration and shifting software architectures, finding reliable,
              well-vetted technical information is increasingly difficult. Many resources are shallow or
              skewed by corporate sponsorship.
            </p>
            <p className="text-zinc-300 leading-relaxed font-light">
              Techolyze was created to build a repository of clear, actionable technical insights.
              We explore the mechanics of Large Language Models, high-performance web engineering,
              biotechnology, devops, and cloud structures with an emphasis on developer clarity and depth.
            </p>
          </div>

          {/* E-E-A-T Vetting Process */}
          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-8 space-y-6">
            <div className="flex items-center gap-3 text-yellow-400">
              <ShieldCheck className="h-6 w-6" />
              <h3 className="text-xl font-bold">Our Technical Review Process</h3>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed font-light">
              We focus on building Google-vetted Trustworthiness through rigorous review:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0 mt-2" />
                <span className="text-sm text-zinc-300 font-light">
                  <strong>Practical Experience:</strong> Our analysis and articles are written by industry practitioners, data scientists, and engineers who share first-hand implementation details.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0 mt-2" />
                <span className="text-sm text-zinc-300 font-light">
                  <strong>Code Reproducibility:</strong> Every tutorial code block and command-line execution walkthrough is tested and verified by our editorial board before publication.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0 mt-2" />
                <span className="text-sm text-zinc-300 font-light">
                  <strong>Objective Integrity:</strong> We do not host sponsored reviews or commercial vendor promotion. Our assessments of libraries, models, and frameworks are strictly objective.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Core Topics Covered */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 border-t border-zinc-800/60 pt-16">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center tracking-tight">
          Areas of Coverage
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Artificial Intelligence */}
          <div className="bg-zinc-900/30 border border-zinc-800/60 p-6 rounded-2xl flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-zinc-800/60 border border-zinc-700 flex items-center justify-center text-yellow-400">
              <Cpu className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Artificial Intelligence</h3>
            <p className="text-sm text-zinc-400 leading-relaxed font-light">
              Deep dives into Large Language Model (LLM) architectures, vector search, transformers, neural networks, and agentic workflows.
            </p>
          </div>

          {/* Software Engineering */}
          <div className="bg-zinc-900/30 border border-zinc-800/60 p-6 rounded-2xl flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-zinc-800/60 border border-zinc-700 flex items-center justify-center text-yellow-400">
              <Code2 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Software Architecture</h3>
            <p className="text-sm text-zinc-400 leading-relaxed font-light">
              Analysis of systems scalability, backend infrastructure, advanced frontend designs, API security, and database design strategies.
            </p>
          </div>

          {/* Global Tech Trends */}
          <div className="bg-zinc-900/30 border border-zinc-800/60 p-6 rounded-2xl flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-zinc-800/60 border border-zinc-700 flex items-center justify-center text-yellow-400">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Global Tech Trends</h3>
            <p className="text-sm text-zinc-400 leading-relaxed font-light">
              Macro coverage of cybersecurity, robotics, biotech, quantum computing, and open-source licensing changes.
            </p>
          </div>
        </div>
      </section>

      {/* Corporate Profile / Trust Transparency Section */}
      {/* <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-zinc-800/60 pt-16">
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-8 md:p-10">
          <h2 className="text-2xl font-bold text-white mb-6">Transparency Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-zinc-800/80">
                <span className="text-zinc-400">Platform Name</span>
                <span className="font-semibold text-white">Techolyze Publication</span>
              </div>
              <div className="flex justify-between py-2 border-b border-zinc-800/80">
                <span className="text-zinc-400">Core Content Focus</span>
                <span className="font-semibold text-white">AI, ML, and Advanced Software Engineering</span>
              </div>
              <div className="flex justify-between py-2 border-b border-zinc-800/80">
                <span className="text-zinc-400">Primary Objective</span>
                <span className="font-semibold text-white">Independent Vetted Tech Analyses</span>
              </div>
            </div>
            <div className="space-y-4 font-light text-zinc-400">
              <p className="leading-relaxed">
                Techolyze is run by a global collective of software developers, research analysts, and tech editors. 
                Our platform does not accept paid guest posts or affiliate-biased reporting.
              </p>
              <p className="leading-relaxed">
                For corrections, press inquiries, or author pitches, please refer to the contact details provided in the contact portal.
              </p>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
