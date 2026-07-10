import SectionHeader from '../../sectionHeader/SectionHeader';
import Image from 'next/image';
import React from 'react';

// function StarRating() {
//   return (
//     <div className="rating-stars">
//       <svg
//         width="141"
//         height="36"
//         viewBox="0 0 141 36"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//         className="flex p-2 px-3 items-start gap-1 rounded-full border border-neutral-800 bg-neutral-900"
//       >
//         <rect x="1.16675" y="0.5" width="139" height="35" rx="17.5" fill="#141414"></rect>
//         <rect x="1.16675" y="0.5" width="139" height="35" rx="17.5" stroke="#262626"></rect>
//         <path d="M21.8041 9.47145C22.1904 8.81247 23.1431 8.81247 23.5294 9.47145L25.6902 13.157C25.8312 13.3975 26.0661 13.5682 26.3384 13.628L30.5113 14.5441C31.2574 14.7079 31.5518 15.6139 31.0445 16.185L28.207 19.3789C28.0218 19.5873 27.9321 19.8635 27.9594 20.1409L28.3776 24.3927C28.4524 25.1529 27.6817 25.7129 26.9818 25.4068L23.0674 23.6952C22.812 23.5835 22.5215 23.5835 22.2661 23.6952L18.3517 25.4068C17.6518 25.7128 16.8811 25.1529 16.9559 24.3927L17.3741 20.1409C17.4014 19.8635 17.3116 19.5873 17.1265 19.3789L14.289 16.185C13.7817 15.6139 14.0761 14.7079 14.8222 14.5441L18.9951 13.628C19.2674 13.5682 19.5023 13.3975 19.6433 13.157L21.8041 9.47145Z" fill="#FFCE22"></path>
//         <path d="M45.8041 9.47145C46.1904 8.81247 47.1431 8.81247 47.5294 9.47145L49.6902 13.157C49.8312 13.3975 50.0661 13.5682 50.3384 13.628L54.5113 14.5441C55.2574 14.7079 55.5518 15.6139 55.0445 16.185L52.207 19.3789C52.0218 19.5873 51.9321 19.8635 51.9594 20.1409L52.3776 24.3927C52.4524 25.1529 51.6817 25.7129 50.9818 25.4068L47.0674 23.6952C46.812 23.5835 46.5215 23.5835 46.2661 23.6952L42.3517 25.4068C41.6518 25.7128 40.8811 25.1529 40.9559 24.3927L41.3741 20.1409C41.4014 19.8635 41.3116 19.5873 41.1265 19.3789L38.289 16.185C37.7817 15.6139 38.0761 14.7079 38.8222 14.5441L42.9951 13.628C43.2674 13.5682 43.5023 13.3975 43.6433 13.157L45.8041 9.47145Z" fill="#FFCE22"></path>
//         <path d="M69.8043 9.47145C70.1907 8.81247 71.1433 8.81247 71.5297 9.47145L73.6904 13.157C73.8314 13.3975 74.0664 13.5682 74.3387 13.628L78.5115 14.5441C79.2577 14.7079 79.552 15.6139 79.0447 16.185L76.2072 19.3789C76.0221 19.5873 75.9323 19.8635 75.9596 20.1409L76.3779 24.3927C76.4526 25.1529 75.6819 25.7129 74.982 25.4068L71.0676 23.6952C70.8122 23.5835 70.5218 23.5835 70.2664 23.6952L66.352 25.4068C65.6521 25.7128 64.8813 25.1529 64.9561 24.3927L65.3744 20.1409C65.4016 19.8635 65.3119 19.5873 65.1267 19.3789L62.2893 16.185C61.7819 15.6139 62.0763 14.7079 62.8224 14.5441L66.9953 13.628C67.2676 13.5682 67.5026 13.3975 67.6436 13.157L69.8043 9.47145Z" fill="#FFCE22"></path>
//         <path d="M93.8043 9.47145C94.1907 8.81247 95.1433 8.81247 95.5297 9.47145L97.6904 13.157C97.8314 13.3975 98.0664 13.5682 98.3387 13.628L102.512 14.5441C103.258 14.7079 103.552 15.6139 103.045 16.185L100.207 19.3789C100.022 19.5873 99.9323 19.8635 99.9596 20.1409L100.378 24.3927C100.453 25.1529 99.6819 25.7129 98.982 25.4068L95.0676 23.6952C94.8122 23.5835 94.5218 23.5835 94.2664 23.6952L90.352 25.4068C89.6521 25.7128 88.8813 25.1529 88.9561 24.3927L89.3744 20.1409C89.4016 19.8635 89.3119 19.5873 89.1267 19.3789L86.2893 16.185C85.7819 15.6139 86.0763 14.7079 86.8224 14.5441L90.9953 13.628C91.2676 13.5682 91.5026 13.3975 91.6436 13.157L93.8043 9.47145Z" fill="#FFCE22"></path>
//         <path d="M117.804 9.47145C118.191 8.81247 119.143 8.81247 119.53 9.47145L121.69 13.157C121.831 13.3975 122.066 13.5682 122.339 13.628L126.512 14.5441C127.258 14.7079 127.552 15.6139 127.045 16.185L124.207 19.3789C124.022 19.5873 123.932 19.8635 123.96 20.1409L124.378 24.3927C124.453 25.1529 123.682 25.7129 122.982 25.4068L119.068 23.6952C118.812 23.5835 118.522 23.5835 118.266 23.6952L114.352 25.4068C113.652 25.7128 112.881 25.1529 112.956 24.3927L113.374 20.1409C113.402 19.8635 113.312 19.5873 113.127 19.3789L110.289 16.185C109.782 15.6139 110.076 14.7079 110.822 14.5441L114.995 13.628C115.268 13.5682 115.503 13.3975 115.644 13.157L117.804 9.47145Z" fill="#FFCE22"></path>
//       </svg>
//     </div>
//   );
// }


function CustomerProfile({ name, location, imageUrl, altText }) {
  return (
    <header className="flex relative gap-2.5 justify-center items-center self-stretch max-sm:flex-col max-sm:gap-4">
      <Image
        src={imageUrl}
        alt={altText}
        width={50}
        height={50}
        className="object-cover rounded-full h-[50px] w-[50px]"
      />
      <div className="flex flex-col gap-1 items-start max-sm:items-center">
        <h3 className="text-lg font-medium tracking-normal text-white max-md:text-base max-sm:text-center">
          {name}
        </h3>
        <p className="text-base tracking-normal text-stone-500 max-md:text-sm max-sm:text-center">
          {location}
        </p>
      </div>
    </header>
  );
}

function TestimonialCard({ name, location, imageUrl, altText, testimonial }) {
  return (
    <article className="flex relative flex-col gap-8 items-center px-0 py-16 flex-[1_0_0] max-md:gap-5 max-md:py-10 max-sm:gap-5 max-sm:py-8">
      <CustomerProfile
        name={name}
        location={location}
        imageUrl={imageUrl}
        altText={altText}
      />

      <div className="flex relative flex-col gap-0 items-center self-stretch">
        <StarRating />
        <blockquote className="relative gap-2.5 self-stretch px-6 pt-10 pb-6 text-base leading-6 text-center text-white rounded-xl border border-solid bg-zinc-900 border-neutral-800 flex-[1_0_0] max-md:text-sm max-sm:px-5 max-sm:pt-8 max-sm:pb-5 max-sm:text-sm max-sm:leading-5">
          {testimonial}
        </blockquote>
      </div>
    </article>
  );
}

function VerticalDivider() {
  return (
    <div className="transition-all bg-neutral-800 self-stretch w-px max-sm:w-full max-sm:h-px max-sm:self-auto" />
  );
}

function StarRating() {
  // Placeholder stars – update with real icons or logic if needed
  return (
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-yellow-400 text-lg">★</span>
      ))}
    </div>
  );
}

function ItemsContainer() {
  const testimonials = [
    {
      name: "Sarah Thompson",
      location: "San Francisco, USA",
      imageUrl: "https://placehold.co/50x50/8B5A3C/FFFFFF",
      altText: "Sarah Thompson",
      testimonial:
        "The ebooks on AI in education have been a game-changer for my research. They provide in-depth insights and case studies that are invaluable for staying updated.",
    },
    {
      name: "Raj Patel",
      location: "Mumbai, India",
      imageUrl: "https://placehold.co/50x50/D2691E/FFFFFF",
      altText: "Raj Patel",
      testimonial:
        "The whitepapers on renewable energy strategies have greatly influenced my work. They offer detailed data and analysis.",
    },
    {
      name: "Emily Adams",
      location: "London, UK",
      imageUrl: "https://placehold.co/50x50/CD853F/FFFFFF",
      altText: "Emily Adams",
      testimonial:
        "The AI in healthcare reports have been an essential resource for our hospital. They highlight the latest innovations and best practices, improving patient care.",
    },
  ];

  return (
    <>
      <SectionHeader
        badge="What Our Readers Say"
        heading="Real Words from Real Readers"
        buttonText="View All Testimonials"
      />
      <section className="flex flex-row relative gap-10 items-start self-stretch g-px py-0 border-b border-neutral-800 max-sm:flex-col max-md:gap-5 ">
        {testimonials.map((testimonial, index) => (
          <React.Fragment key={testimonial.name}>
            <TestimonialCard {...testimonial} />
            {index < testimonials.length - 1 && <VerticalDivider />}
          </React.Fragment>
        ))}
      </section>
    </>
  );
}

export default ItemsContainer;
