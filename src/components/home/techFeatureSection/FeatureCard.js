function FeatureCard({ title, description }) {
  return (
    <article className="flex flex-col flex-1 gap-5 items-start p-8 rounded-xl border bg-zinc-900 border-neutral-800 max-md:p-6 max-sm:p-5">
      <h3 className="w-full text-2xl font-medium tracking-tighter leading-9 text-neutral-400 max-md:text-xl max-md:tracking-tight max-sm:text-lg max-sm:tracking-tight">
        {title}
      </h3>
      <p className="w-full text-lg tracking-tight leading-7 text-white max-md:text-base max-md:tracking-tight max-sm:text-sm max-sm:tracking-tight">
        {description}
      </p>
    </article>
  );
}

export default FeatureCard;
