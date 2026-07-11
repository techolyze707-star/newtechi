"use client";
import { ArrowRight, Facebook, Linkedin } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';

// ContactButton Component
const ContactButton = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center items-center gap-1 border border-neutral-800 cursor-pointer bg-[#1A1A1A] px-5 py-3.5 rounded-md border-solid hover:bg-neutral-700 transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

// ContactSection Component
const ContactSection = ({ title, items = [], children }) => {
  return (
    <section
      className=" flex flex-col items-start gap-[30px] flex-[1_0_0] px-0 py-[60px] 
             max-md:w-full max-md:px-0 max-md:py-10 
             max-sm:px-0 max-sm:py-[30px]"
      aria-labelledby="contact-section-title"
    >
      <header>
        <h2
          id="contact-section-title"
          className="self-stretch text-gray-900 dark:text-white 
                 text-lg font-medium leading-[23.4px] tracking-[-0.54px] 
                 max-sm:text-base"
        >
          {title}
        </h2>
      </header>

      {items.length > 0 && (
        <div className="flex flex-col items-start gap-2.5 self-stretch w-full">
          {items.map((item, index) => (
            <ContactButton
              key={index}
              onClick={item.onClick}
              aria-label={`Contact via ${item.text}`}
              className="flex justify-between items-center w-full px-3 py-2 rounded-lg 
                     bg-white dark:bg-neutral-900 
                     text-gray-800 dark:text-gray-200 
                     border border-gray-200 dark:border-neutral-800
                     hover:bg-yellow-50 dark:hover:bg-gray-800 
                     hover:text-yellow-600 dark:hover:text-yellow-400
                     hover:border-yellow-200 dark:hover:border-yellow-600
                     transition-colors duration-200 ease-in-out"
            >
              <span className="text-sm font-normal leading-[21px] tracking-[-0.42px]">
                {item.text}
              </span>
              <ArrowRight className="text-yellow-500 rotate-[320deg]" />
            </ContactButton>
          ))}
        </div>
      )}

      {children}
    </section>
  );
};


// ContactForm Component
const ContactForm = () => {
  const maxChars = 500;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
    agreeToTerms: false
  });

  const textareaRef = useRef(null);

  // Auto expand function
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [formData.message]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Contact form Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate terms agreement
    if (!formData.agreeToTerms) {
      alert('Please agree to Terms of Use and Privacy Policy');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Message sent successfully!');
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          message: '',
          agreeToTerms: false,
        });
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'An error occurred. Please try again later.');
    }
  };

  return (
    <section className="flex flex-col items-start gap-[30px] flex-[1_0_0] self-stretch border-l border-neutral-300 dark:border-neutral-800 pl-[60px] pr-0 py-[60px] max-md:px-0 max-md:py-10 max-md:border-l-0 max-md:border-t max-md:border-neutral-300 dark:max-md:border-neutral-800 max-sm:px-0 max-sm:py-[30px]">
      <form onSubmit={handleSubmit} className="flex flex-col items-start gap-[30px] w-full">
        {/* First + Last Name */}
        <div className="flex items-start gap-[50px] self-stretch max-sm:flex-col max-sm:gap-5">
          <div className="flex flex-col items-start gap-3 flex-[1_0_0]">
            <label htmlFor="firstName" className="self-stretch text-black dark:text-white text-base font-medium leading-6">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              placeholder="Enter First Name"
              className="flex-[1_0_0] text-gray-700 dark:text-gray-300 text-sm font-normal leading-[21px] self-stretch border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-[#1A1A1A] p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD11A] focus:border-transparent"
              required
            />
          </div>
          <div className="flex flex-col items-start gap-3 flex-[1_0_0]">
            <label htmlFor="lastName" className="self-stretch text-black dark:text-white text-base font-medium leading-6">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              placeholder="Enter Last Name"
              className="flex-[1_0_0] text-gray-700 dark:text-gray-300 text-sm font-normal leading-[21px] self-stretch border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-[#1A1A1A] p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD11A] focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Email + Phone */}
        <div className="flex items-start gap-[50px] self-stretch max-sm:flex-col max-sm:gap-5">
          <div className="flex flex-col items-start gap-3 flex-[1_0_0]">
            <label htmlFor="email" className="self-stretch text-black dark:text-white text-base font-medium leading-6">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter your Email"
              className="flex-[1_0_0] text-gray-700 dark:text-gray-300 text-sm font-normal leading-[21px] self-stretch border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-[#1A1A1A] p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD11A] focus:border-transparent"
              required
            />
          </div>
          <div className="flex flex-col items-start gap-3 flex-[1_0_0]">
            <label htmlFor="phoneNumber" className="self-stretch text-black dark:text-white text-base font-medium leading-6">
              Phone Number
            </label>
            <div className="flex items-center gap-3 self-stretch max-sm:flex-col max-sm:gap-2.5">
              <div className="flex items-center gap-1 border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-[#1A1A1A] px-3 py-2.5 rounded-[7px]">
                <span>
                  <ArrowRight style={{ transform: "rotate(320deg)", color: "yellow" }} />
                </span>
              </div>
              <input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                placeholder="Enter Phone Number"
                className="flex-[1_0_0] text-gray-700 dark:text-gray-300 text-sm font-normal leading-[21px] border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-[#1A1A1A] p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD11A] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col items-start gap-3 flex-[1_0_0] w-full">
          <label htmlFor="message" className="self-stretch text-black dark:text-white text-base font-medium leading-6">
            Message
          </label>
          <textarea
            id="message"
            ref={textareaRef}
            value={formData.message}
            maxLength={maxChars}
            onChange={(e) => handleInputChange("message", e.target.value)}
            placeholder="Enter your message..."
            className="w-full text-gray-700 dark:text-gray-200 text-sm font-normal leading-[21px] min-h-[100px] self-stretch border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-[#1A1A1A] p-4 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#FFD11A] focus:border-transparent transition-all duration-300"
            required
          />
          <div className="text-right text-sm text-neutral-500 mt-1">
            {formData.message.length}/{maxChars} characters
          </div>
        </div>

        {/* Terms + Submit */}
        <div className="flex items-center gap-[70px] self-stretch max-sm:flex-col max-sm:gap-5 max-sm:items-start">
          <div className="flex items-center gap-1.5 flex-[1_0_0] max-sm:flex-col max-sm:items-start max-sm:gap-2.5">
            <input
              id="agreeToTerms"
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={(e) => handleInputChange("agreeToTerms", e.target.checked)}
              className="w-6 h-6 rounded border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-[#1A1A1A] accent-[#FFD11A]"
              required
            />
            <label htmlFor="agreeToTerms" className="flex-[1_0_0] text-black dark:text-white text-base font-normal leading-6">
              I agree with Terms of Use and Privacy Policy
            </label>
          </div>
          <button
            type="submit"
            className="text-[#141414] text-sm font-medium leading-6 cursor-pointer bg-[#FFD11A] px-[34px] py-3.5 rounded-lg max-sm:self-stretch hover:bg-[#E6BC00] transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </section>

  );
};

// Main Component
const ContactPage = () => {
  const handleEmailClick = () => {
    window.location.href = 'mailto:hello@techolyze.com';
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+918492938';
  };


  return (
    <main className="flex w-full flex-col items-end min-h-screen ">
      {/* Contact Information Section */}
      <section
        className="flex items-start gap-[30px] self-stretch border-b border-b-neutral-800 
             px-20 py-0 
             max-md:flex-col max-md:px-10 
             max-sm:px-5"
        aria-label="Contact Information"
      >
        {/* General Inquiries */}
        <ContactSection
          title="General Inquiries"
          items={[
            { text: "hello@techolyze.com", onClick: handleEmailClick },
            // { text: "+923175416388", onClick: handlePhoneClick },
          ]}
        />

        {/* Divider */}
        <div className="w-px h-[282px] border dark:border-neutral-800
                  max-md:w-full max-md:h-px" />

        {/* Technical Support */}
        <ContactSection
          title="Technical Support"
          items={[
            { text: "hello@techolyze.com", onClick: handleEmailClick },
            // { text: "+923175416388", onClick: handlePhoneClick },
          ]}
        />

        {/* Divider */}
        <div className="w-px h-[282px] border dark:border-neutral-800 
                  max-md:w-full max-md:h-px" />

        {/* Social Media */}
        <ContactSection title="Connect with Us">
          <div className="flex items-start gap-2.5 self-stretch max-sm:flex-col w-full">
            <Link
              href="https://www.linkedin.com/company/techolyze"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Techolyze LinkedIn"
              className="flex justify-center items-center gap-2.5 flex-1 border border-neutral-800 
                   cursor-pointer bg-white dark:bg-[#1A1A1A] 
                   px-6 py-3.5 rounded-md border-solid 
                   hover:bg-gray-100 dark:hover:bg-neutral-700 
                   focus:ring-2 focus:ring-yellow-400 transition"
            >
              <Linkedin size={20} className="text-yellow-500" />
            </Link>

            <Link
              href="https://www.facebook.com/profile.php?id=61579304521670"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Techolyze Facebook"
              className="flex justify-center items-center gap-2.5 flex-1 border border-neutral-800 
                   cursor-pointer bg-white dark:bg-[#1A1A1A] 
                   px-6 py-3.5 rounded-md border-solid 
                   hover:bg-gray-100 dark:hover:bg-neutral-700 
                   focus:ring-2 focus:ring-yellow-400 transition"
            >
              <Facebook size={20} className="text-yellow-500" />
            </Link>
          </div>
        </ContactSection>
      </section>


      {/* Contact Form Section */}
      <section className="flex items-center gap-[60px] self-stretch border-b-neutral-800 px-20 py-0 border-b border-solid max-md:flex-col max-md:gap-10 max-md:px-10 max-md:py-0 max-sm:px-5 max-sm:py-0">
        <div className="flex w-[412px] flex-col justify-center items-start gap-[30px] max-md:w-full">
          <div className="text-4xl"> <ArrowRight style={{ transform: 'rotate(320deg)', color: 'yellow' }} /></div>
          <header>
            <h1 className="self-stretch text-black dark:text-white text-[44px] font-medium leading-[57.2px] tracking-[-1.32px] max-md:text-4xl max-sm:text-[28px]">
              Get in Touch with Techolyze
            </h1>
          </header>
        </div>
        <ContactForm />
      </section>
    </main>
  );
};

export default ContactPage;