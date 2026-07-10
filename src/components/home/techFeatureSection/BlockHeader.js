export default function BlockHeader({ heading, description }) {
    return (
        <div className="flex flex-col gap-4 items-start max-md:w-[400px] max-sm:w-full">
            <h1 className="w-full text-4xl font-semibold tracking-tighter text-white leading-[60px] max-md:text-3xl max-md:tracking-tighter max-sm:text-2xl max-sm:tracking-tighter">
                {heading}
            </h1>
            <p className="w-full text-lg tracking-tight leading-7 text-neutral-400 max-md:text-base max-md:tracking-tight max-sm:text-sm max-sm:tracking-tight">
                {description}
            </p>
        </div>
    );
}