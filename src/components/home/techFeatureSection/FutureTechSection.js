import FutureTechnologyBlog from "./FutureTechnologyBlog";
import ResearchInsightsSection from "./ResearchInsightsSection";
import SectionHeader from "../../sectionHeader/SectionHeader";
export default function FutureTechSection() {
    return (
        <>
            <FutureTechnologyBlog />
            <div className="w-full h-[1px] bg-neutral-800 " />
            <ResearchInsightsSection />
        </>


    );
}