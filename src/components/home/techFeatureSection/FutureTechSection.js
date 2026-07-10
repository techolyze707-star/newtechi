import FutureTechnologyBlog from "./FutureTechnologyBlog";
import ResearchInsightsSection from "./ResearchInsightsSection";
import SectionHeader from "../../sectionHeader/SectionHeader";
export default function FutureTechSection() {
    return (
        <>
            <SectionHeader badge={"Unlock the Power of"} heading={"FutureTech Features"} />
            <FutureTechnologyBlog />
            <div className="w-full h-[1px] bg-neutral-800 " />
            <ResearchInsightsSection />
        </>


    );
}