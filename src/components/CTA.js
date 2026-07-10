import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Portable Button component
function Button({
  variant = "default",
  size = "default",
  asChild = false,
  className = "",
  children,
  ...props
}) {
  const base = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-900";

  const variants = {
    default: "bg-neutral-900 text-white hover:bg-neutral-800",
    outline: "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-100 hover:border-neutral-400",
    secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200",
    ghost: "bg-transparent text-neutral-900 hover:bg-neutral-100",
    link: "text-neutral-900 underline-offset-4 hover:underline",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3 text-xs",
    lg: "h-11 rounded-lg px-6 py-2.5",
    icon: "h-10 w-10 p-0",
  };

  const classes = [base, variants[variant] || variants.default, sizes[size] || sizes.default, className]
    .filter(Boolean)
    .join(" ");

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: [children.props.className, classes].filter(Boolean).join(" "),
      ...props,
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export function CTA() {
  return (
    <section className="w-full py-16 md:py-20 lg:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* CTA Card */}
        <div className="bg-white border border-neutral-200 rounded-xl p-8 md:p-12 lg:p-16 text-center shadow-sm overflow-hidden">

          <div className="max-w-3xl mx-auto flex flex-col gap-6 md:gap-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 w-fit mx-auto">
              <span className="text-xs font-medium text-neutral-700">🇵🇰 Trusted by 1000+ Pakistani Students</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight tracking-tight">
              Start Your Learning Journey Today
            </h2>

            {/* Description */}
            <p className="text-base md:text-lg text-neutral-600 px-2 md:px-0 max-w-2xl mx-auto">
              Join thousands of Pakistani students accessing free educational resources from VU, AIOU, NUST, and all major universities across Pakistan.
            </p>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-3 justify-center pt-2">
              <Button
                size="lg"
                asChild
              >
                <Link href="/documents">
                  Browse Documents
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
              >
                <Link href="/blogs">
                  Explore Resources
                </Link>
              </Button>
            </div>

            {/* Features */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 pt-2 text-xs md:text-sm border-t border-neutral-200 mt-4 pt-6">
              <div className="flex items-center gap-2 text-neutral-600">
                <div className="w-2 h-2 rounded-full bg-neutral-900"></div>
                <span>100% Free Forever</span>
              </div>
              <div className="hidden md:block w-1 h-1 rounded-full bg-neutral-300"></div>
              <div className="flex items-center gap-2 text-neutral-600">
                <div className="w-2 h-2 rounded-full bg-neutral-900"></div>
                <span>Instant Access</span>
              </div>
              <div className="hidden md:block w-1 h-1 rounded-full bg-neutral-300"></div>
              <div className="flex items-center gap-2 text-neutral-600">
                <div className="w-2 h-2 rounded-full bg-neutral-900"></div>
                <span>No Registration</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;