const NewsHero = () => {
  return (
    <section className="flex items-center py-16 text-white transition-colors">
      <div className="w-full flex flex-col md:flex-row gap-12">
        <header className="flex-1">
          <h1 className="text-[4rem] max-lg:text-[2.4rem] leading-[1.4] max-md:text-[1.8rem] font-bold g-px">
            The Future of Tech: Stay <br />
            <div className="flex py-8 max-sm:flex-col max-md:py-0">
              {/* Main word */}
              <p className="text-[3.4rem] max-md:text-[1.7rem] max-lg:text-[2.2rem] font-bold text-yellow-400">
                Ahead
              </p>

              {/* Sub description */}
              <p className="text-zinc-400 text-lg leading-7 py-2 pl-16 max-md:pl-6 max-sm:pl-0 max-sm:py-4 max-md:text-base font-normal">
                Dive into deep-dive tutorials, industry analysis, and breaking 
                tech insights. From cutting-edge development trends to tomorrow&apos;s 
                software architectures, we decode the innovations shaping our digital world.
              </p>
            </div>
          </h1>
        </header>
      </div>
    </section>
  );
};

export default NewsHero;