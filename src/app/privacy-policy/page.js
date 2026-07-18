import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Techolyze",
  description: "Read the Techolyze Privacy Policy to understand how we handle your data.",
};

export default function PrivacyPolicy() {
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
          <h1>Privacy Policy</h1>
          <p className="text-zinc-400 text-sm"><strong>Effective Date:</strong> September 01, 2026</p>

          <p className="text-lg leading-relaxed">
            At <strong>Techolyze</strong>, we respect your privacy and are committed
            to protecting the information you share with us. This Privacy Policy
            explains what data we collect, how we use it, and your rights.
          </p>

          <h2>1. Information We Collect</h2>
          <ul>
            <li><strong>Analytics Data:</strong> Information such as IP address, browser type, and pages visited via tools like Google Analytics.</li>
            <li><strong>Cookies:</strong> Small files stored on your device to enhance performance and personalize your experience.</li>
            <li><strong>Email:</strong> If you subscribe to our newsletter, we collect your email address.</li>
          </ul>

          <h2>2. How We Use Information</h2>
          <ul>
            <li>To improve our blog and user experience.</li>
            <li>To send newsletters and updates (if you opt-in).</li>
            <li>To analyze traffic and site performance.</li>
          </ul>

          <h2>3. Cookies & Third-Party Tools</h2>
          <p>
            We use cookies and third-party services such as Google Analytics. You
            can disable cookies in your browser settings. For more details, see{" "}
            <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:underline">
              Google’s Cookie Policy
            </a>.
          </p>

          <h2>4. Data Protection</h2>
          <p>
            We do not sell, trade, or rent personal information to third parties.
            Your data is used only to operate and improve this blog.
          </p>

          <h2>5. Your Rights</h2>
          <p>
            You have the right to request deletion of your personal data and opt
            out of tracking. You can use{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:underline">
              Google opt-out tools
            </a>{" "}
            to control data collection.
          </p>

          <h2>6. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. By continuing to
            use our site, you agree to the updated version.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at:
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
