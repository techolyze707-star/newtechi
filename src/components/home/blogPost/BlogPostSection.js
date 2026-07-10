import { BlogPostCard } from "../../ai/FeaturedCard";
import SectionHeader from "../../sectionHeader/SectionHeader";
import React from "react";
export default function BlogPostSection() {
    return (
        <div>
            <SectionHeader badge={"A Knowledge Treasure Trove"} heading={"Explore FutureTech's In-Depth Blog Posts"} buttonText={"View All Blogs"} />
            <div className="p-6 bg-black min-h-screen text-white">
                {blogData.map((data, i) => (
                    <BlogPostCard key={i} {...data} />
                ))}
            </div>
        </div>
    );
}


const blogData = [
    {
        id: 1,
        authorImage: "https://randomuser.me/api/portraits/men/1.jpg",
        authorName: "Alice Quantum",
        authorSpecialty: "Quantum Physics",
        date: "May 31, 2026",
        title: "Quantum Supremacy Achieved",
        description: "Google claims to reach quantum supremacy with Sycamore processor.",
        likes: "15k",
        comments: "40",
        shares: "10",
    },
    {
        id: 2,
        authorImage: "https://randomuser.me/api/portraits/women/2.jpg",
        authorName: "Bob Techie",
        authorSpecialty: "AI & ML",
        date: "May 20, 2026",
        title: "AI in 2026: What’s Next?",
        description: "From GPT-5 to autonomous agents, AI is evolving rapidly this year.",
        likes: "28k",
        comments: "78",
        shares: "33",
    },
    {
        id: 3,
        authorImage: "https://randomuser.me/api/portraits/men/3.jpg",
        authorName: "Clara Innovate",
        authorSpecialty: "Biotech",
        date: "May 15, 2026",
        title: "CRISPR Breakthroughs",
        description: "Editing the human genome safely is now closer than ever.",
        likes: "9.5k",
        comments: "20",
        shares: "12",
    },
];
