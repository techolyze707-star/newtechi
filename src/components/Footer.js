import { Facebook, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 py-6 text-sm transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 space-y-4 md:space-y-0">


        {/* Contact */}
        <div className="flex flex-wrap gap-6 justify-center md:justify-start">
          <Link prefetch={false} href="mailto:hello@techolyze.com" className="hover:text-black dark:hover:text-white">
            hello@techolyze.com
          </Link>
          <span>Punjab, Pakistan</span>
        </div>

        {/* Social */}
        <div className="flex space-x-4">
          <Link prefetch={false}
            href="https://www.linkedin.com/company/techolyze"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-white"
          >
            <Linkedin size={18} />
          </Link>
          <Link prefetch={false}
            href="https://www.facebook.com/profile.php?id=61579304521670"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-white"
          >
            <Facebook size={18} />
          </Link>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-500">
        © {new Date().getFullYear()} Techolyze. All rights reserved. |{" "}
        <Link prefetch={false} href="/privacy-policy" className="hover:underline">Privacy Policy</Link> |{" "}
        <Link prefetch={false} href="/terms" className="hover:underline">Terms & Conditions</Link>
      </div>
    </footer>
  );
}
