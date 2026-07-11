'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
// import ThemeToggle from '../ThemeBtn';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/blogs', label: 'Blog' },
  { path: '/converters', label: 'Converters' },
  { path: '/about', label: 'About' },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) =>
    path === '/' ? pathname === '/' : pathname.startsWith(path);

  const navigate = (path) => {
    setIsOpen(false);
    router.push(path);
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className=" top-0 z-50 w-full bg-[#171717] border-b border-zinc-800">
      <div className="py-2 md:px-12 sm:px-4 px-2">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center"
            aria-label="Home"
          >
            <Image
              src="/assets/f6.svg"
              alt="AI Tech Blog Logo"
              width={254}
              height={16}
              className="mr-2 invert-0 w-36 sm:w-40 md:w-52 h-auto"
              priority
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`relative px-3 py-2 text-md transition-colors duration-200 ${isActive(item.path)
                  ? 'text-white font-medium'
                  : 'text-zinc-400 hover:text-white'
                  }`}
              >
                {item.label}

                <span
                  className={`absolute bottom-0 left-0 h-0.5 w-full bg-yellow-400 transition-transform duration-300 origin-left ${isActive(item.path) ? 'scale-x-100' : 'scale-x-0'
                    }`}
                />
              </button>
            ))}

            <button
              onClick={() => navigate('/contact')}
              className="px-4 py-2 text-sm font-medium rounded-md bg-yellow-400 text-neutral-900 hover:bg-yellow-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-zinc-900"
            >
              Contact
            </button>

            {/* <ThemeToggle /> */}
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* <ThemeToggle /> */}

            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="p-4 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800"
              aria-label="Toggle Menu"
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute h-0.5 w-full bg-current transition-all duration-300 ${isOpen ? 'rotate-45 top-3' : 'top-1'
                    }`}
                />
                <span
                  className={`absolute h-0.5 w-full bg-current transition-all duration-300 ${isOpen ? 'opacity-0 top-3' : 'top-3'
                    }`}
                />
                <span
                  className={`absolute h-0.5 w-full bg-current transition-all duration-300 ${isOpen ? '-rotate-45 top-3' : 'top-5'
                    }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${isOpen
            ? 'max-h-96 opacity-100'
            : 'max-h-0 opacity-0 pointer-events-none'
            }`}
        >
          <div className="border-t border-zinc-800 px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${isActive(item.path)
                  ? 'bg-zinc-800 text-white font-medium'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                  }`}
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={() => navigate('/contact')}
              className="mt-4 w-full rounded-md bg-yellow-400 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-yellow-500 transition-colors duration-200"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}