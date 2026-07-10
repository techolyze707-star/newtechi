'use client';

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function NavbarClientWrapper({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden flex items-center">

      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden p-2"
        aria-label="Toggle menu"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Responsive Nav Container */}
      <div
        className={`fixed lg:static top-20 left-4 right-4 lg:left-auto lg:right-auto 
                    bg-white lg:bg-transparent rounded-2xl lg:rounded-none shadow-xl lg:shadow-none 
                    p-5 lg:p-0 transition lg:block 
                    ${open ? "block" : "hidden lg:block"}`}
      >
        {children}
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}
