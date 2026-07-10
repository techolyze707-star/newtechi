import BlockHeader from './BlockHeader';
import FeatureCard from './FeatureCard';
import Image from 'next/image';

function FutureTechnologyBlog() {
  const features = [
    {
      title: 'Quantity',
      description: 'Over 1,000 articles on emerging tech trends and breakthroughs.',
    },
    {
      title: 'Variety',
      description: 'Articles cover fields like AI, robotics, biotechnology, and more.',
    },
    {
      title: 'Frequency',
      description: 'Fresh content added daily to keep you up to date.',
    },
    {
      title: 'Authoritative',
      description: 'Written by our team of tech experts and industry professionals.',
    },
  ];

  return (
    <section className="flex items-start w-full g-px py-16 max-lg:flex-col max-lg:gap-10">
      {/* Left Panel */}
      <div className="w-[36%] pr-[60px] border-r border-neutral-200 dark:border-neutral-800 flex flex-col gap-8 justify-center items-start max-lg:w-full max-lg:pr-0 max-lg:border-r-0">
        <Image src="/assets/f-blog.svg" width={50} height={50} alt="futureBlog" />
        <BlockHeader
          heading="Future Technology Blog"
          description="Stay informed with our blog section dedicated to future technology."
          headingClassName="text-gray-900 dark:text-white"
          descriptionClassName="text-gray-700 dark:text-gray-300"
        />
      </div>

      {/* Right Grid */}
      <div className="w-[90%] pl-[60px] pr-0 grid grid-cols-2 gap-4 max-md:grid-cols-1 max-lg:w-full max-lg:pl-0">
        {features.map((feature, idx) => (
          <FeatureCard
            key={idx}
            title={feature.title}
            description={feature.description}
            cardClassName="bg-white dark:bg-neutral-900 text-gray-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            titleClassName="text-gray-900 dark:text-white"
            descriptionClassName="text-gray-700 dark:text-gray-300"
          />
        ))}
      </div>
    </section>
  );
}

export default FutureTechnologyBlog;
