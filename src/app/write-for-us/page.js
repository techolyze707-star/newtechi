import Link from 'next/link';
import { CheckCircle, Edit, Users, TrendingUp, Award, Mail, Send, FileText, ExternalLink } from 'lucide-react';

/**
 * Comprehensive metadata for Write for Us page - SEO optimized
 */
export const metadata = {
  title: 'Write for Us - Submit Guest Post | Contribute to Techolyze.dev',
  description: 'Write for Techolyze.dev and share your knowledge with thousands of students. Submit guest posts, educational articles, and study guides. Get a dofollow backlink and build your authority. Guest blogging opportunities for education writers.',
  keywords: 'write for us, guest post, submit article, contribute, guest blogging, education blog, submit guest post, write for us education, guest post opportunities, contributor, become a writer, submit content, guest author',
  authors: [{ name: 'Techolyze.dev' }],
  creator: 'Techolyze.dev',
  publisher: 'Techolyze.dev',
  openGraph: {
    title: 'Write for Us - Contribute to Techolyze.dev',
    description: 'Share your knowledge with students worldwide. Submit guest posts and get a dofollow backlink.',
    type: 'website',
    url: 'https://Techolyze.dev/write-for-us',
    siteName: 'Techolyze.dev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Write for Us - Techolyze.dev',
    description: 'Contribute to our educational platform and reach thousands of students.',
  },
  alternates: {
    canonical: 'https://Techolyze.dev/write-for-us'
  }
};

export default function WriteForUsPage() {
  // JSON-LD structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Write for Us - Guest Post Submission',
    description: 'Submit guest posts and educational content to Techolyze.dev. Share your knowledge with students worldwide.',
    url: 'https://Techolyze.dev/write-for-us',
    mainEntity: {
      '@type': 'Organization',
      name: 'Techolyze.dev',
      url: 'https://Techolyze.dev',
    //   sameAs: [
    //     'https://www.facebook.com/Techolyze',
    //     'https://twitter.com/Techolyze'
    //   ]
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://Techolyze.dev'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Write for Us',
          item: 'https://Techolyze.dev/write-for-us'
        }
      ]
    }
  };

  const benefits = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Reach Thousands of Students',
      description: 'Share your knowledge with our growing community of students, educators, and lifelong learners actively seeking quality educational content.'
    },
    {
      icon: <ExternalLink className="w-6 h-6" />,
      title: 'Get a Dofollow Backlink',
      description: 'Well-written articles receive one dofollow backlink to your website or social profile, boosting your SEO and online authority.'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Build Your Authority',
      description: 'Establish yourself as an expert in your field by contributing high-quality educational content to a respected platform.'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Grow Your Audience',
      description: 'Gain exposure to our engaged audience and potentially attract new followers, clients, or opportunities.'
    }
  ];

  const guidelines = [
    {
      title: 'Original Content Only',
      description: 'All submissions must be 100% original, unpublished content. We run plagiarism checks on all articles.'
    },
    {
      title: 'Educational Focus',
      description: 'Content should be educational, informative, and valuable to students or educators. Topics can include study tips, subject guides, career advice, or educational technology.'
    },
    {
      title: 'Minimum Word Count',
      description: 'Articles should be at least 1000 words with well-researched, comprehensive information.'
    },
    {
      title: 'Proper Formatting',
      description: 'Use proper headings (H2, H3), bullet points, and short paragraphs for better readability. Include relevant images if applicable.'
    },
    {
      title: 'SEO Best Practices',
      description: 'Include relevant keywords naturally, write compelling meta descriptions, and use descriptive headings.'
    },
    {
      title: 'No Promotional Content',
      description: 'Articles should focus on providing value, not promoting products or services. Subtle mentions are acceptable if relevant.'
    },
    {
      title: 'Grammar & Quality',
      description: 'Content must be well-written, grammatically correct, and professional. We edit submissions but may reject poorly written content.'
    },
    {
      title: 'Author Bio',
      description: 'Include a 2-3 sentence author bio with one dofollow link to your website or professional profile (for quality submissions only).'
    }
  ];

  const topicIdeas = [
    'Study techniques and productivity tips',
    'Subject-specific guides and tutorials',
    'Exam preparation strategies',
    'Career guidance and educational pathways',
    'Educational technology and tools',
    'Note-taking methods and organization',
    'Time management for students',
    'Online learning best practices',
    'Research and writing skills',
    'Educational psychology insights'
  ];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen bg-neutral-50">
        {/* Hero Section */}
        <section className="bg-neutral-900 text-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Write for Techolyze.dev
            </h1>
            <p className="text-xl md:text-2xl text-neutral-200 mb-8 max-w-3xl mx-auto">
              Share your knowledge, reach thousands of students, and get a valuable dofollow backlink
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#submit"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-neutral-900 font-semibold rounded-lg hover:bg-neutral-100 transition-colors"
              >
                <Send className="w-5 h-5" />
                Submit Your Article
              </a>
            </div>
          </div>
        </section>

        {/* Why Write for Us */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Why Contribute to Techolyze.dev?
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Join our community of educators and writers making a difference in students' lives
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <article key={index} className="p-6 rounded-lg border border-neutral-200 hover:border-neutral-300 hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-900">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-neutral-600">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Content Guidelines */}
        <section id="guidelines" className="py-16 md:py-20 bg-neutral-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Submission Guidelines
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Follow these guidelines to ensure your article gets published
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guidelines.map((guideline, index) => (
                <div key={index} className="flex items-start gap-4 p-6 bg-white rounded-lg border border-neutral-200">
                  <CheckCircle className="w-6 h-6 text-neutral-900 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">
                      {guideline.title}
                    </h3>
                    <p className="text-neutral-600 text-sm">
                      {guideline.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Topic Ideas */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                What Can You Write About?
              </h2>
              <p className="text-lg text-neutral-600">
                Here are some topic ideas to get you started
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topicIdeas.map((topic, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                  <div className="w-2 h-2 bg-neutral-900 rounded-full"></div>
                  <span className="text-neutral-700">{topic}</span>
                </div>
              ))}
            </div>

            <p className="text-neutral-600 text-center mt-8">
              Have a different topic in mind? Feel free to pitch your idea!
            </p>
          </div>
        </section>

        {/* Submission Process */}
        <section className="py-16 md:py-20 bg-neutral-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                How to Submit
              </h2>
              <p className="text-lg text-neutral-600">
                Follow these simple steps to get published
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    Prepare Your Article
                  </h3>
                  <p className="text-neutral-600">
                    Write your article following our guidelines. Ensure it's original, well-researched, and at least 1000 words.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    Send Your Submission
                  </h3>
                  <p className="text-neutral-600">
                    Email your article to <a href="mailto:team@Techolyze.dev" className="text-neutral-900 hover:underline font-semibold">team@Techolyze.dev</a> with the subject line "Guest Post Submission - [Your Topic]". Include your article (Google Docs link or Word document), author bio, and headshot.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    Review Process
                  </h3>
                  <p className="text-neutral-600">
                    Our editorial team will review your submission within 5-7 business days. We may suggest edits or request revisions.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    Publication & Promotion
                  </h3>
                  <p className="text-neutral-600">
                    Once approved, we'll publish your article and share it across our social media channels. You'll receive a link to share with your audience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="submit" className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-neutral-50 rounded-xl p-8 md:p-12 border border-neutral-200">
              <Edit className="w-16 h-16 text-neutral-900 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Ready to Share Your Knowledge?
              </h2>
              <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
                We're excited to feature your content! Send us your best educational article and join our community of contributors.
              </p>

              <div className="bg-white rounded-lg p-6 mb-8 text-left border border-neutral-200">
                <h3 className="font-semibold text-neutral-900 mb-4">Submission Checklist:</h3>
                <ul className="space-y-2 text-neutral-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-neutral-900 flex-shrink-0 mt-0.5" />
                    <span>1000+ words of original, well-researched content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-neutral-900 flex-shrink-0 mt-0.5" />
                    <span>Proper formatting with headings and subheadings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-neutral-900 flex-shrink-0 mt-0.5" />
                    <span>Author bio (2-3 sentences) with one link</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-neutral-900 flex-shrink-0 mt-0.5" />
                    <span>Professional headshot (optional but recommended)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-neutral-900 flex-shrink-0 mt-0.5" />
                    <span>Relevant images or graphics (if applicable)</span>
                  </li>
                </ul>
              </div>

              <a
                href="mailto:team@Techolyze.dev?subject=Guest Post Submission"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 text-white font-semibold rounded-lg hover:bg-neutral-800 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Submit Your Article
              </a>

              <p className="text-sm text-neutral-600 mt-6">
                Questions? Email us at <a href="mailto:team@Techolyze.dev" className="text-neutral-900 hover:underline">team@Techolyze.dev</a>
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-20 bg-neutral-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-12 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              <details className="group border border-neutral-200 rounded-lg p-6 bg-white hover:border-neutral-300 transition-colors">
                <summary className="font-semibold text-neutral-900 cursor-pointer list-none flex justify-between items-center">
                  <span>Do I get paid for my articles?</span>
                  <span className="text-neutral-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-neutral-600 mt-4">
                  Currently, we don't offer monetary compensation. However, you receive valuable exposure, a dofollow backlink to boost your SEO, and the opportunity to establish yourself as an authority in your field.
                </p>
              </details>

              <details className="group border border-neutral-200 rounded-lg p-6 bg-white hover:border-neutral-300 transition-colors">
                <summary className="font-semibold text-neutral-900 cursor-pointer list-none flex justify-between items-center">
                  <span>Can I include links in my article?</span>
                  <span className="text-neutral-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-neutral-600 mt-4">
                  Quality submissions receive one dofollow backlink in the author bio. Within the article, you can include relevant external links (nofollow) if they genuinely add value. We don't accept overly promotional content.
                </p>
              </details>

              <details className="group border border-neutral-200 rounded-lg p-6 bg-white hover:border-neutral-300 transition-colors">
                <summary className="font-semibold text-neutral-900 cursor-pointer list-none flex justify-between items-center">
                  <span>How long does the review process take?</span>
                  <span className="text-neutral-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-neutral-600 mt-4">
                  We typically review submissions within 5-7 business days. If your article requires revisions, the process may take longer. We'll keep you updated throughout.
                </p>
              </details>

              <details className="group border border-neutral-200 rounded-lg p-6 bg-white hover:border-neutral-300 transition-colors">
                <summary className="font-semibold text-neutral-900 cursor-pointer list-none flex justify-between items-center">
                  <span>Can I republish my article elsewhere?</span>
                  <span className="text-neutral-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-neutral-600 mt-4">
                  We require first publishing rights. Once published on Techolyze.dev, please wait at least 30 days before republishing elsewhere. When you do, please include a canonical link back to the original article.
                </p>
              </details>

              <details className="group border border-neutral-200 rounded-lg p-6 bg-white hover:border-neutral-300 transition-colors">
                <summary className="font-semibold text-neutral-900 cursor-pointer list-none flex justify-between items-center">
                  <span>What if my article is rejected?</span>
                  <span className="text-neutral-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-neutral-600 mt-4">
                  If we can't publish your submission, we'll provide constructive feedback. You're welcome to revise and resubmit, or pitch a different topic.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* Search Queries Section - SEO */}
        <section className="py-16 md:py-20 bg-white border-t border-neutral-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Find Us Through These Searches
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Looking to contribute? Here are the common search queries that lead to our guest posting opportunities.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                'write for us education',
                'write for us pakistan',
                'write for us study',
                'submit guest post education',
                'education blog write for us',
                'write for us student',
              ].map((query, index) => (
                <div key={index} className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg hover:border-neutral-300 hover:shadow-sm transition-all">
                  <span className="text-sm text-neutral-700">✍️ {query}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-neutral-600 mb-6">
                No matter how you found us, we're excited to hear from you! Click the button below to start your submission.
              </p>
              <a
                href="mailto:team@Techolyze.dev?subject=Guest Post Submission"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-neutral-900 text-white font-semibold rounded-lg hover:bg-neutral-800 transition-colors"
              >
                <Send className="w-5 h-5" />
                Start Writing Now
              </a>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 bg-neutral-50 border-t border-neutral-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-lg text-neutral-700 mb-6">
              Still have questions? We're here to help!
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-neutral-900 hover:text-neutral-700 font-semibold"
            >
              Contact Us
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
