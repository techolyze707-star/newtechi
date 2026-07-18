import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | Techolyze",
  description: "Read the Techolyze Terms & Conditions for using our blog.",
};

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#171717] text-white pt-24 pb-16">
      {/* Breadcrumbs / Back */}
      <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8" aria-label="Back">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-yellow-400 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="prose prose-invert max-w-none prose-yellow prose-headings:text-white prose-p:text-zinc-300 prose-li:text-zinc-300">
          <h1>Terms & Conditions</h1>
          <p className="text-zinc-400 text-sm"><strong>Effective Date:</strong> September 01, 2026</p>

          <p className="text-lg leading-relaxed">
            Welcome to <strong>Techolyze</strong>. By accessing or using our
            website, you agree to comply with and be bound by the following
            Terms & Conditions. Please read them carefully before using our site.
          </p>

          <h2>1. Use of Content</h2>
          <p>
            All content on this website, including articles, images, and other
            materials, is owned by <strong>Techolyze</strong> unless otherwise
            stated. You may not copy, reproduce, republish, or redistribute any
            content without prior written permission.
          </p>

          <h2>2. User Conduct</h2>
          <p>
            If comments or user submissions are enabled, you agree not to post
            offensive, abusive, defamatory, spam, or illegal material. We reserve
            the right to remove such content without notice.
          </p>

          <h2>3. External Links</h2>
          <p>
            Our site may contain links to third-party websites. We do not control
            and are not responsible for the content, privacy policies, or practices
            of external sites.
          </p>

          <h2>4. Disclaimer</h2>
          <p>
            The information provided on <strong>Techolyze</strong> is for
            educational and informational purposes only. We do not provide
            professional or legal advice. Use of this site is at your own risk.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            <strong>Techolyze</strong> shall not be held liable for any damages,
            losses, or issues arising from the use or inability to use our
            website, including reliance on any information provided.
          </p>

          <h2>6. Changes to Terms</h2>
          <p>
            We reserve the right to update or modify these Terms & Conditions at
            any time. Continued use of our website means you accept any changes.
          </p>

          <h2>7. Governing Law</h2>
          <p>
            These Terms & Conditions shall be governed by and construed in
            accordance with the laws of Pakistan.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about these Terms & Conditions, please contact us at:
          </p>
          <p className="flex items-center gap-2">
            <span>📧</span>
            <a href="mailto:hello@techolyze.com" className="text-yellow-400 hover:underline">hello@techolyze.com</a>
          </p>
        </article>
      </div>
    </div>
  );
}
