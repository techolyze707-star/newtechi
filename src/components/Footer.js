import { Facebook, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#171717] border-t border-zinc-800 text-zinc-400 py-8 text-sm transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 space-y-4 md:space-y-0">


        {/* Contact */}
        <div className="flex flex-wrap gap-6 justify-center md:justify-start">
          <Link prefetch={false} href="mailto:hello@techolyze.com" className="hover:text-yellow-400 transition-colors">
            hello@techolyze.com
          </Link>
          <span className="text-zinc-500">Punjab, Pakistan</span>
        </div>

        {/* Navigation */}
        <div className="flex space-x-6 justify-center">
          <Link prefetch={false} href="/" className="hover:text-yellow-400 transition-colors">
            Home
          </Link>
          <Link prefetch={false} href="/blogs" className="hover:text-yellow-400 transition-colors">
            Blog
          </Link>
          <Link prefetch={false} href="/contact" className="hover:text-yellow-400 transition-colors">
            Contact
          </Link>
        </div>

        {/* Social */}
        <div className="flex space-x-4">
          <Link prefetch={false}
            href="https://www.linkedin.com/company/techolyze"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </Link>
          <Link prefetch={false}
            href="https://www.facebook.com/profile.php?id=61579304521670"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition-colors"
            aria-label="Facebook"
          >
            <Facebook size={18} />
          </Link>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-6 text-center text-xs text-zinc-500 border-t border-zinc-800/40 pt-4">
        © {new Date().getFullYear()} Techolyze. All rights reserved. |{" "}
        <Link prefetch={false} href="/privacy-policy" className="hover:text-yellow-400 transition-colors underline decoration-zinc-700 hover:decoration-yellow-400">Privacy Policy</Link> |{" "}
        <Link prefetch={false} href="/terms" className="hover:text-yellow-400 transition-colors underline decoration-zinc-700 hover:decoration-yellow-400">Terms & Conditions</Link>
      </div>
    </footer>
  );
}
