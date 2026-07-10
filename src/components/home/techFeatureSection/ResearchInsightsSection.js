import Image from "next/image";
import FeatureCard from "./FeatureCard";
import BlockHeader from "./BlockHeader";

function ResearchInsightsSection() {
  const features = [
    {
      title: "Depth",
      description: "500+ research articles for in-depth understanding.",
    },
    {
      title: "Graphics",
      description: "Visual aids and infographics to enhance comprehension.",
    },
    {
      title: "Trends",
      description: "Explore emerging trends in future technology research.",
    },
    {
      title: "Contributors",
      description: "Contributions from tech researchers and academics.",
    },
  ];

  return (
    <section className="flex items-start w-full g-px py-16 max-lg:flex-col max-lg:gap-10">
      {/* Left Column (40%) */}
      <div className="w-[36%] pr-[60px] border-r border-neutral-800 flex flex-col gap-8 justify-center items-start max-lg:w-full max-lg:pr-0 max-lg:border-r-0">
        <Image src="/assets/r-blog.svg" width={50} height={50} alt="futureBlog" />
        <BlockHeader
          heading="Research Insights Blogs"
          description="Dive deep into future technology concepts with our research section."
        />
      </div>

      {/* Right Column (60%) */}
      <div className="w-[90%] pl-[60px] pr-[0px] grid grid-cols-2 gap-4 max-md:grid-cols-1 max-lg:w-full max-lg:pl-0">
        {features.map((feature, idx) => (
          <FeatureCard
            key={idx}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}

export default ResearchInsightsSection;
