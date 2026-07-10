import XcalToBinConverterClient from '@/components/converters/XcalToBinConverterClient';

// Force static generation - prebuilt at build time
export const dynamic = 'force-static';
export const revalidate = false; // Permanent static cache

const pageUrl = 'https://techolyze.com/converters/xcal-to-bin';
const ogImageUrl = 'https://techolyze.com/og-image.png';

export const metadata = {
  title: 'Convert XCAL to BIN Online (Free Cummins Tuning Tool) | Instant Local Converter',
  description:
    'Free, secure, and instant. Process automotive tuning calibration files locally in your browser. Convert XCAL Intel HEX files to BIN with zero server upload.',
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: 'Convert XCAL to BIN Online (Free Cummins Tuning Tool)',
    description:
      'Free, secure, and instant XCAL to BIN conversion for Cummins tuning workflows. Local browser processing keeps your calibration data private.',
    url: pageUrl,
    siteName: 'Techolyze',
    type: 'website',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'XCAL to BIN Converter for Cummins Tuning',
      },
    ],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'XCAL to BIN File Converter',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'All',
  url: pageUrl,
  description:
    'Convert XCAL Intel HEX tuning files into BIN format directly in your browser. Free tool with local processing for secure calibration handling.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can I convert XCAL to BIN without uploading files?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. This converter runs fully client-side in your browser, so calibration content is processed locally and not uploaded to a server.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does this support Intel HEX records inside XCAL files?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The parser reads Intel HEX records beginning with a colon, extracts address and data payload bytes, and compiles them into raw BIN output.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will this work for Cummins tuning workflows?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This tool is designed for automotive tuners handling Cummins-related calibration files. Always validate generated BIN data before flashing any ECU.',
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c'),
        }}
      />

      <XcalToBinConverterClient />

      <section className="g-px pb-20">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-black/20 md:p-8">
          {/* ===== QUICK START GUIDE ===== */}
          <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Quick Start Guide - 3 Easy Steps
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">📥 Step 1: Upload your XCAL file</h3>
              <p className="mt-2">
                Drag and drop your .xcal calibration file into the converter box above, or click the <strong>"Select XCAL File"</strong> button to browse your computer. The file can be in either XML or Intel HEX format—both are supported!
              </p>
            </div>

            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">⚙️ Step 2: Click "Convert to BIN"</h3>
              <p className="mt-2">
                Once your file is loaded, press the <strong>"Convert to BIN"</strong> button. The converter will read your XCAL file, parse all calibration parameters, and compile them into a binary format. This happens instantly in your browser!
              </p>
            </div>

            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">⬇️ Step 3: Download your BIN file</h3>
              <p className="mt-2">
                Once converted successfully, click <strong>"Download .BIN"</strong> to save your binary file to your computer. Use this BIN file in your tuning software or ECU flashing tool.
              </p>
            </div>
          </div>

          {/* ===== HOW IT WORKS ===== */}
          <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            How It Works (Beginner-Friendly Explanation)
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            <p>
              Think of this converter as a <strong>language translator</strong>. Your XCAL file describes tuning parameters in a human-readable format (either XML or text-based HEX records), and your ECU only understands raw binary data. This tool converts between them.
            </p>
            <p>
              <strong>In simple terms:</strong> XCAL → Converter → BIN (the format your tuning software needs)
            </p>
          </div>

          {/* ===== EXAMPLE 1: XML FORMAT ===== */}
          <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Example 1: XML XCAL Format
          </h2>
          <p className="mt-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            If your XCAL file looks like this (structured XML), the converter will handle it perfectly:
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-neutral-300 bg-neutral-900 p-4 dark:border-neutral-700">
            <pre className="text-xs text-neutral-100 md:text-sm">
{`<?xml version="1.0" encoding="UTF-8"?>
<Calibration>
    <!-- Engine Parameters -->
    <Parameter name="Idle_Speed" offset="0x0010" type="uint16" value="750" />
    <Parameter name="Max_Boost" offset="0x0020" type="uint8" value="25" />
    <Parameter name="Fuel_Pressure" offset="0x0030" type="uint16" value="1800" />
    
    <!-- Torque Limiter Table -->
    <Table name="Torque_Limit" offset="0x0100" type="uint8">
        <Values>100, 150, 200, 250, 300</Values>
    </Table>
    
    <!-- Boost Control Table -->
    <Table name="Boost_Map" offset="0x0120" type="uint16">
        <Values>500, 750, 1000, 1250, 1500</Values>
    </Table>
</Calibration>`}
            </pre>
          </div>
          <div className="mt-4 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-900/20">
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">
              <strong>What's happening:</strong> Each `&lt;Parameter&gt;` tells the converter "put this value at this memory address". Each `&lt;Table&gt;` creates a list of values starting at an offset. When converted, these become binary data.
            </p>
          </div>

          {/* ===== EXAMPLE 2: INTEL HEX FORMAT ===== */}
          <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Example 2: Intel HEX XCAL Format
          </h2>
          <p className="mt-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            Some XCAL files use Intel HEX format instead. They look like this:
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-neutral-300 bg-neutral-900 p-4 dark:border-neutral-700">
            <pre className="text-xs text-neutral-100 md:text-sm">
{`:020000040000FA
:10000000E5012EE51F00FFEF03F5FFFA11F5FFE7
:10001000E2012EE51F00FFEF03F5FFFA11F5FFE4
:10002000E9012EE51F00FFEF03F5FFFA11F5FFDD
:10003000F0012EE51F00FFEF03F5FFFA11F5FFD6
:10004000E6012EE51F00FFEF03F5FFFA11F5FFEB
:00000001FF`}
            </pre>
          </div>
          <div className="mt-4 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-900/20">
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">
              <strong>What's happening:</strong> Each line starting with `:` is a HEX record containing calibration data. The lines tell the converter "these bytes go at this address". The converter combines all these records into one binary file. This is an older format but still widely used in tuning tools.
            </p>
          </div>

          {/* ===== DETAILED WALKTHROUGH ===== */}
          <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Complete Tutorial: Step-by-Step Walkthrough
          </h2>
          <div className="mt-6 space-y-6 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h4 className="text-base font-bold text-neutral-900 dark:text-white">Step 1️⃣: Prepare Your XCAL File</h4>
              <ul className="mt-3 list-inside list-disc space-y-2">
                <li>Get your XCAL file from your tuning software (EFILive, Calterm, etc.)</li>
                <li>Make sure it's named something like: <code className="rounded bg-neutral-200 px-2 py-1 text-xs dark:bg-neutral-800">engine_tune.xcal</code></li>
                <li>The file will be text-based (you can open it in Notepad to check)</li>
              </ul>
            </div>

            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h4 className="text-base font-bold text-neutral-900 dark:text-white">Step 2️⃣: Upload the File</h4>
              <ul className="mt-3 list-inside list-disc space-y-2">
                <li>Go back to the converter tool at the top of this page</li>
                <li>Either <strong>drag and drop</strong> your XCAL file into the blue box, or</li>
                <li>Click <strong>"Select XCAL File"</strong> and choose the file from your computer</li>
                <li>You'll see confirmation: <code className="rounded bg-neutral-200 px-2 py-1 text-xs dark:bg-neutral-800">Selected: engine_tune.xcal</code></li>
              </ul>
            </div>

            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h4 className="text-base font-bold text-neutral-900 dark:text-white">Step 3️⃣: Convert to Binary</h4>
              <ul className="mt-3 list-inside list-disc space-y-2">
                <li>Click the white <strong>"Convert to BIN"</strong> button</li>
                <li>The tool will analyze your file instantly (in your browser)</li>
                <li>It detects whether it's XML or Intel HEX format automatically</li>
                <li>It reads all calibration values and their memory addresses</li>
                <li>It creates a binary file with all the data in the right places</li>
              </ul>
            </div>

            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h4 className="text-base font-bold text-neutral-900 dark:text-white">Step 4️⃣: Download Your BIN File</h4>
              <ul className="mt-3 list-inside list-disc space-y-2">
                <li>Once conversion is complete, you'll see: <code className="rounded bg-neutral-200 px-2 py-1 text-xs dark:bg-neutral-800">Conversion complete. Output size: X bytes.</code></li>
                <li>Click <strong>"Download .BIN"</strong> button</li>
                <li>Your binary file will download as <code className="rounded bg-neutral-200 px-2 py-1 text-xs dark:bg-neutral-800">engine_tune.bin</code></li>
              </ul>
            </div>

            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h4 className="text-base font-bold text-neutral-900 dark:text-white">Step 5️⃣: Use in Your Tuning Tool</h4>
              <ul className="mt-3 list-inside list-disc space-y-2">
                <li>Open your tuning software or ECU flashing tool</li>
                <li>Look for "Load BIN" or "Import Binary" option</li>
                <li>Select your newly converted <code className="rounded bg-neutral-200 px-2 py-1 text-xs dark:bg-neutral-800">.bin</code> file</li>
                <li>Your calibration is now ready to review or flash to the ECU</li>
              </ul>
            </div>
          </div>

          {/* ===== WHAT HAPPENS INSIDE ===== */}
          <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            What Happens Inside the Converter?
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            <div className="rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 p-5 dark:from-purple-900/20 dark:to-blue-900/20">
              <p>
                <strong>For XML Files:</strong>
              </p>
              <ol className="mt-3 list-inside list-decimal space-y-2">
                <li>Reads each `&lt;Parameter&gt;` tag and extracts: name, offset (memory address), type, and value</li>
                <li>Converts the value to the right format (uint8 = 1 byte, uint16 = 2 bytes, uint32 = 4 bytes)</li>
                <li>Places each byte at the correct address in memory</li>
                <li>Reads each `&lt;Table&gt;` tag and handles multiple values sequentially</li>
                <li>Combines all bytes into one continuous binary file</li>
              </ol>
            </div>

            <div className="rounded-lg bg-gradient-to-r from-orange-50 to-red-50 p-5 dark:from-orange-900/20 dark:to-red-900/20">
              <p>
                <strong>For Intel HEX Files:</strong>
              </p>
              <ol className="mt-3 list-inside list-decimal space-y-2">
                <li>Parses each line starting with `:` as a HEX record</li>
                <li>Extracts the hexadecimal address and data bytes from each record</li>
                <li>Handles extended addressing (for files larger than 64KB)</li>
                <li>Places all bytes at their specified memory addresses</li>
                <li>Stops at the End-Of-File (EOF) record</li>
                <li>Creates the binary output file with all data combined</li>
              </ol>
            </div>
          </div>

          {/* ===== DATA SAFETY ===== */}
          <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            🔒 Is My Tuning Data Safe?
          </h2>
          <p className="mt-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            <strong>Yes, absolutely.</strong> This converter uses local browser memory only. Your custom calibrations are read and processed inside your device session, so the file never leaves your machine and remains protected from remote theft risks tied to server uploads. Everything happens offline—no data is sent to any server.
          </p>

          {/* ===== DEFINITIONS ===== */}
          <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Key Definitions - Understand the Terminology
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4 dark:bg-green-900/20">
              <p className="font-bold text-green-900 dark:text-green-200">What is an XCAL file?</p>
              <p className="mt-2">
                An XCAL file is an automotive calibration container commonly seen in ECM tuning ecosystems, including EFILive, Calterm, and Cummins-based workflows. It contains tuning parameters (like idle speed, boost limits, fuel pressure maps) in either XML format or Intel HEX format. The core payload describes what values should be loaded into your engine's control unit.
              </p>
            </div>

            <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-900/20">
              <p className="font-bold text-blue-900 dark:text-blue-200">What is a BIN file?</p>
              <p className="mt-2">
                A BIN file contains raw binary bytes—the actual machine code that your ECU understands. Unlike XCAL or HEX files (which are text-based), BIN is a compact binary image used directly by ECU flashing software. It's what your engine control unit reads and executes.
              </p>
            </div>

            <div className="rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4 dark:bg-yellow-900/20">
              <p className="font-bold text-yellow-900 dark:text-yellow-200">What is Intel HEX?</p>
              <p className="mt-2">
                Intel HEX is a text-based format for representing binary data. Each line contains: an address, data bytes, and a checksum. It's human-readable (you can open it in Notepad) but larger than binary. Many automotive tuning tools use Intel HEX to store calibration data.
              </p>
            </div>

            <div className="rounded-lg border-l-4 border-purple-500 bg-purple-50 p-4 dark:bg-purple-900/20">
              <p className="font-bold text-purple-900 dark:text-purple-200">What is XML?</p>
              <p className="mt-2">
                XML (eXtensible Markup Language) is a structured, tag-based format for organizing data. In XCAL files, XML looks like: `&lt;Parameter name="Speed" offset="0x10" value="750"/&gt;`. It's easier for humans to read and understand than raw hex data.
              </p>
            </div>
          </div>

          {/* ===== FAQ ===== */}
          <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 space-y-6 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                ❓ Can I convert XCAL to BIN without uploading files to a server?
              </h3>
              <p className="mt-3">
                Yes, 100%. This converter runs fully client-side in your browser. Your XCAL file is only read in your web browser's memory and never uploaded to any server. This makes it perfect for sensitive tuning files.
              </p>
            </div>

            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                ❓ Does this tool support both XML and Intel HEX formats?
              </h3>
              <p className="mt-3">
                Yes! The converter automatically detects whether your XCAL file is in XML format or Intel HEX format and handles each correctly. You don't need to worry about the format—just upload your file and it works.
              </p>
            </div>

            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                ❓ What data types are supported in XML XCAL files?
              </h3>
              <p className="mt-3">
                The converter supports: <code className="rounded bg-neutral-200 px-2 py-1 text-xs dark:bg-neutral-800">uint8</code> (byte), <code className="rounded bg-neutral-200 px-2 py-1 text-xs dark:bg-neutral-800">uint16</code> (word), and <code className="rounded bg-neutral-200 px-2 py-1 text-xs dark:bg-neutral-800">uint32</code> (dword) for individual parameters, and tables of any of these types. Multi-byte values are stored in big-endian format.
              </p>
            </div>

            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                ❓ Will this work for Cummins diesel tuning workflows?
              </h3>
              <p className="mt-3">
                Yes! This tool is specifically designed for automotive tuners handling Cummins-related calibration files from EFILive, Calterm, and similar platforms. Always validate generated BIN data before flashing any ECU in a real vehicle.
              </p>
            </div>

            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                ❓ Can I use this converter on a phone or tablet?
              </h3>
              <p className="mt-3">
                Yes! The interface is responsive and works on modern mobile browsers (Chrome, Safari, Firefox). However, desktop is recommended for handling large calibration files and better user experience.
              </p>
            </div>

            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                ❓ Should I validate or checksum the BIN file before flashing?
              </h3>
              <p className="mt-3">
                <strong>Absolutely, yes.</strong> Always validate the output BIN file:
              </p>
              <ul className="mt-3 list-inside list-disc space-y-2">
                <li>Check that output size matches your expectations</li>
                <li>Compare checksums with your original XCAL if available</li>
                <li>Review the converted data in your tuning tool</li>
                <li>Never flash an untested BIN file directly to an ECU</li>
              </ul>
            </div>

            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                ❓ What if I get an error saying "No calibration data found"?
              </h3>
              <p className="mt-3">
                This error means the converter couldn't find valid calibration parameters in your file. Check:
              </p>
              <ul className="mt-3 list-inside list-disc space-y-2">
                <li>Is the file actually a .xcal file?</li>
                <li>Does it contain either XML tags like `&lt;Parameter&gt;` or Intel HEX records starting with `:`?</li>
                <li>Is the file corrupted or incomplete?</li>
                <li>Try opening it in Notepad to verify its contents</li>
              </ul>
            </div>

            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                ❓ How large can my XCAL file be?
              </h3>
              <p className="mt-3">
                The converter can handle files up to your browser's available memory limit, which is typically 1-2 GB on modern computers. Most automotive calibration files are much smaller (under 10 MB), so you should have no issues.
              </p>
            </div>
          </div>

          {/* ===== TIPS & BEST PRACTICES ===== */}
          <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            💡 Pro Tips & Best Practices
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            <div className="rounded-lg border border-green-300 bg-green-50 p-4 dark:border-green-700 dark:bg-green-900/20">
              <p className="font-bold text-green-900 dark:text-green-200">✅ Keep Original Backups</p>
              <p className="mt-2">Always keep your original XCAL file backed up before conversion. Store it in a safe location in case you need to re-convert or troubleshoot.</p>
            </div>

            <div className="rounded-lg border border-green-300 bg-green-50 p-4 dark:border-green-700 dark:bg-green-900/20">
              <p className="font-bold text-green-900 dark:text-green-200">✅ Test on a Bench First</p>
              <p className="mt-2">If possible, test the converted BIN file on a bench ECU or test stand before flashing to a live vehicle. This ensures everything works correctly.</p>
            </div>

            <div className="rounded-lg border border-green-300 bg-green-50 p-4 dark:border-green-700 dark:bg-green-900/20">
              <p className="font-bold text-green-900 dark:text-green-200">✅ Verify File Sizes Match</p>
              <p className="mt-2">The output BIN file size should be reasonable. If it's unexpectedly large or tiny, the conversion may have issues. Double-check your original XCAL file, too.</p>
            </div>

            <div className="rounded-lg border border-green-300 bg-green-50 p-4 dark:border-green-700 dark:bg-green-900/20">
              <p className="font-bold text-green-900 dark:text-green-200">✅ Use Descriptive File Names</p>
              <p className="mt-2">Name your XCAL and BIN files clearly, like `cummins_stock_2023.xcal` and `cummins_stock_2023.bin`, so you know exactly what tune each file represents.</p>
            </div>

            <div className="rounded-lg border border-green-300 bg-green-50 p-4 dark:border-green-700 dark:bg-green-900/20">
              <p className="font-bold text-green-900 dark:text-green-200">✅ Document Your Tunes</p>
              <p className="mt-2">Keep notes about what parameters were modified in each tune. This helps if you need to troubleshoot issues or revert to a known-good calibration.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
