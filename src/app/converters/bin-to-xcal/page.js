import BinToXcalConverterClient from '@/components/converters/BinToXcalConverterClient';

// Force static generation - prebuilt at build time
export const dynamic = 'force-static';
export const revalidate = false; // Permanent static cache

const pageUrl = 'https://techolyze.com/converters/bin-to-xcal';
const ogImageUrl = 'https://techolyze.com/og-image.png';

export const metadata = {
  title: 'Convert BIN to XCAL Online (XML & Intel HEX) | Free Reverse Converter',
  description:
    'Convert binary calibration files to XCAL format with dual format support. Choose Intel HEX or XML output. Secure local browser processing for automotive tuning.',
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: 'Convert BIN to XCAL Online (XML & Intel HEX Support)',
    description:
      'Free BIN to XCAL converter supporting both Intel HEX and XML formats. Local browser processing keeps calibration data private.',
    url: pageUrl,
    siteName: 'Techolyze',
    type: 'website',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'BIN to XCAL Converter',
      },
    ],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'BIN to XCAL File Converter',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'All',
  url: pageUrl,
  description:
    'Convert binary calibration files into XCAL format (Intel HEX or XML) directly in your browser. Free tool with local processing for secure automotive tuning workflows.',
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
      name: 'Can I convert BIN to XCAL without uploading files?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. This converter runs fully client-side in your browser, so all binary data is processed locally and never uploaded to any server.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does this support both Intel HEX and XML output formats?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The converter lets you choose between Intel HEX format and structured XML format for your XCAL output file.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use the converted XCAL file in my tuning software?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, with some caveats. The converted file will be compatible with tuning tools that accept XCAL format. However, parameter names and table structures are auto-generated and should be reviewed and adjusted.',
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

      <BinToXcalConverterClient />

      <section className="g-px pb-20">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-black/20 md:p-8">
          {/* ===== QUICK START GUIDE ===== */}
          <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Quick Start Guide - Convert BIN Back to XCAL
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">📥 Step 1: Upload your BIN file</h3>
              <p className="mt-2">
                Drag and drop your .bin binary calibration file into the converter box above, or click <strong>"Select BIN File"</strong> to browse. A BIN file is a binary calibration image extracted from an ECU or created by your tuning software.
              </p>
            </div>

            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">⚙️ Step 2: Choose Output Format</h3>
              <p className="mt-2">
                Select your preferred XCAL format: <strong>Intel HEX</strong> (traditional, text-based) or <strong>XML</strong> (structured, human-readable). Both contain the same calibration data in different formats.
              </p>
              <p className="mt-2">
                <strong>Optional:</strong> You can also set <strong>Silence Threshold</strong> and <strong>Known Map Ranges</strong>. If you are new, leave these at default and convert normally.
              </p>
            </div>

            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">🔄 Step 3: Click "Convert to XCAL"</h3>
              <p className="mt-2">
                Press the button to convert your binary file. The converter reads the raw binary data and converts it into proper HEX or XML XCAL format. This happens instantly in your browser!
              </p>
            </div>

            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">⬇️ Step 4: Download your XCAL file</h3>
              <p className="mt-2">
                Once converted, click <strong>"Download .XCAL"</strong> to save your file. You can now open it in your tuning software or text editor to review the converted calibration data.
              </p>
            </div>
          </div>

          {/* ===== HOW IT WORKS ===== */}
          <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            How It Works - The Reverse Process
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            <p>
              This converter does the <strong>opposite</strong> of the XCAL to BIN converter. While XCAL→BIN compiles human-readable calibration data into raw binary, BIN→XCAL extracts raw binary data and structures it back into a readable format.
            </p>
            <p>
              <strong>In simple terms:</strong> BIN (raw bytes) → Converter → XCAL (structured data in HEX or XML)
            </p>
            <p className="text-xs italic text-neutral-600 dark:text-neutral-400">
              Note: Converting BIN to XCAL is a "reconstruction" process. Parameter names and table structures are auto-generated since the original BIN file contains no metadata about what each byte represents. You should review and adjust these in your tuning software.
            </p>
          </div>

          {/* ===== OPTIONAL ADVANCED SETTINGS ===== */}
          <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Optional Settings: Basic Knowledge (Beginner Friendly)
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Silence Threshold (Optional)</h3>
              <p className="mt-2">
                This controls how many continuous <strong>00</strong> or <strong>FF</strong> bytes are treated as filler data and skipped in generated XCAL parameters.
              </p>
              <p className="mt-2">
                Example: If threshold is <strong>16</strong>, then long filler regions like 16+ bytes of <strong>00</strong>/<strong>FF</strong> are ignored to keep your output cleaner.
              </p>
              <p className="mt-2">
                Beginner tip: Keep the default value unless you are analyzing a specific map layout.
              </p>
            </div>

            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Known Map Ranges (Optional)</h3>
              <p className="mt-2">
                Use this when you know exact important memory ranges and want to <strong>always keep them</strong>, even if they contain many 00/FF bytes.
              </p>
              <p className="mt-2">
                Format: <strong>0xSTART-0xEND</strong>, separated by commas.
              </p>
              <p className="mt-2">
                Example: <code className="rounded bg-neutral-200 px-2 py-1 text-xs dark:bg-neutral-800">0x1000-0x10FF, 0x2000-0x20AF</code>
              </p>
              <p className="mt-2">
                Beginner tip: Leave it empty if you do not know your calibration map addresses.
              </p>
            </div>

            <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-900/20">
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">
                Both options are optional. The converter works without them. They are advanced helpers for cleaner output and map-specific preservation.
              </p>
            </div>
          </div>

          {/* ===== VISUAL COMPARISON ===== */}
          <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Visual Example: Threshold Only vs Threshold + Known Ranges
          </h2>
          <p className="mt-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            Below is a simple conceptual example of how output changes with optional settings. This helps beginners understand when to use Known Map Ranges.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">A) Threshold Only (Known ranges empty)</h3>
              <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
                Silence Threshold = 16. Long 00/FF blocks are skipped.
              </p>
              <div className="mt-3 overflow-x-auto rounded-lg border border-neutral-300 bg-neutral-900 p-3 dark:border-neutral-700">
                <pre className="text-xs text-neutral-100 md:text-sm">
{`Input region (concept):
0x1000: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
0x1010: 2E E5 1F 00 FF EF 03 F5

Output (simplified):
<Parameter offset="0x1010" ... />
// 0x1000 filler block skipped`}
                </pre>
              </div>
            </div>

            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">B) Threshold + Known Map Range</h3>
              <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
                Silence Threshold = 16, Known Map Ranges = <code className="rounded bg-neutral-200 px-2 py-1 text-xs dark:bg-neutral-800">0x1000-0x10FF</code>
              </p>
              <div className="mt-3 overflow-x-auto rounded-lg border border-neutral-300 bg-neutral-900 p-3 dark:border-neutral-700">
                <pre className="text-xs text-neutral-100 md:text-sm">
{`Input region (concept):
0x1000: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
0x1010: 2E E5 1F 00 FF EF 03 F5

Output (simplified):
<Parameter offset="0x1000" ... />
<Parameter offset="0x1010" ... />
// 0x1000 region preserved because it is in known range`}
                </pre>
              </div>
            </div>
          </div>

          {/* ===== EXAMPLE 1: BIN FILE ===== */}
          <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Example 1: What a BIN File Looks Like
          </h2>
          <p className="mt-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            A BIN file is raw binary data. If you open it in a hex editor, you'll see something like this:
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-neutral-300 bg-neutral-900 p-4 dark:border-neutral-700">
            <pre className="text-xs text-neutral-100 md:text-sm">
{`Offset (hex)  00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F
00000000      E5 01 2E E5 1F 00 FF EF 03 F5 FF FA 11 F5 FF E7
00000010      E2 01 2E E5 1F 00 FF EF 03 F5 FF FA 11 F5 FF E4
00000020      E9 01 2E E5 1F 00 FF EF 03 F5 FF FA 11 F5 FF DD
00000030      F0 01 2E E5 1F 00 FF EF 03 F5 FF FA 11 F5 FF D6
00000040      E6 01 2E E5 1F 00 FF EF 03 F5 FF FA 11 F5 FF EB`}
            </pre>
          </div>
          <div className="mt-4 rounded-lg border-l-4 border-orange-500 bg-orange-50 p-4 dark:bg-orange-900/20">
            <p className="text-sm font-semibold text-orange-900 dark:text-orange-200">
              <strong>Important:</strong> This is just raw bytes. There's no information about what these bytes mean (parameters, tables, etc.). The converter reads this binary blob and converts it into structured XCAL format for easier viewing and editing.
            </p>
          </div>

          {/* ===== EXAMPLE 2: CONVERTED OUTPUT ===== */}
          <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Example 2: Converted XCAL Output (Intel HEX)
          </h2>
          <p className="mt-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            After conversion to Intel HEX format, your BIN file becomes:
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
              <strong>What changed:</strong> The converter added Intel HEX structure: byte count, addresses, record types, and checksums. Now the data is organized in records that your tuning software can understand.
            </p>
          </div>

          {/* ===== EXAMPLE 3: XML OUTPUT ===== */}
          <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Example 3: Converted XCAL Output (XML)
          </h2>
          <p className="mt-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            Or convert the same BIN file to XML format:
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-neutral-300 bg-neutral-900 p-4 dark:border-neutral-700">
            <pre className="text-xs text-neutral-100 md:text-sm">
{`<?xml version="1.0" encoding="UTF-8"?>
<Calibration>
    <!-- Auto-converted from BIN file -->
    <!-- Note: Parameter names are inferred from memory layout -->
    
    <Parameter name="Param_1" offset="0x0000" type="uint16" value="481" />
    <Parameter name="Param_2" offset="0x0002" type="uint16" value="12261" />
    <Parameter name="Param_3" offset="0x0004" type="uint16" value="255" />
    <Parameter name="Param_4" offset="0x0006" type="uint16" value="61419" />
    <!-- ... more parameters ... -->
    
    <!-- Data Table (sample from first region) -->
    <Table name="Data_Table" offset="0x0000" type="uint8">
        <Values>229, 1, 46, 229, 31, 0, 255, 239, 3, 245, 255, 250, 17, 245, 255, 231</Values>
    </Table>
</Calibration>`}
            </pre>
          </div>
          <div className="mt-4 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-900/20">
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">
              <strong>What changed:</strong> The converter structured the raw bytes into `&lt;Parameter&gt;` elements with addresses and values. Parameters have auto-generated names like "Param_1", "Param_2", etc. The XML is human-readable and can be edited in your tuning tool.
            </p>
          </div>

          {/* ===== DETAILED TUTORIAL ===== */}
          <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Complete Tutorial: Step-by-Step Walkthrough
          </h2>
          <div className="mt-6 space-y-6 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h4 className="text-base font-bold text-neutral-900 dark:text-white">Step 1️⃣: Get Your BIN File</h4>
              <ul className="mt-3 list-inside list-disc space-y-2">
                <li>Export a BIN file from your tuning software (EFILive, Calterm, etc.)</li>
                <li>Or extract a BIN file from your vehicle's ECU using a reader</li>
                <li>Make sure it has the <code className="rounded bg-neutral-200 px-2 py-1 text-xs dark:bg-neutral-800">.bin</code> extension</li>
                <li>Common file name patterns: <code className="rounded bg-neutral-200 px-2 py-1 text-xs dark:bg-neutral-800">engine.bin</code>, <code className="rounded bg-neutral-200 px-2 py-1 text-xs dark:bg-neutral-800">calibration.bin</code>, etc.</li>
              </ul>
            </div>

            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h4 className="text-base font-bold text-neutral-900 dark:text-white">Step 2️⃣: Upload the BIN File</h4>
              <ul className="mt-3 list-inside list-disc space-y-2">
                <li>Scroll back to the converter tool at the top</li>
                <li><strong>Drag and drop</strong> your BIN file into the blue box, or</li>
                <li>Click <strong>"Select BIN File"</strong> and choose the file from your computer</li>
                <li>You'll see: <code className="rounded bg-neutral-200 px-2 py-1 text-xs dark:bg-neutral-800">Selected: engine.bin</code></li>
              </ul>
            </div>

            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h4 className="text-base font-bold text-neutral-900 dark:text-white">Step 3️⃣: Choose Output Format</h4>
              <ul className="mt-3 list-inside list-disc space-y-2">
                <li>Look for the <strong>"Output Format"</strong> dropdown menu</li>
                <li>Select <strong>"Intel HEX Format"</strong> or <strong>"XML Format"</strong>:
                  <ul className="mt-2 list-inside list-circle space-y-1 ml-4">
                    <li><strong>Intel HEX:</strong> Traditional format, works with older tools, text-based but less structured</li>
                    <li><strong>XML:</strong> Modern format, easier to edit, clearer structure, recommended for review</li>
                  </ul>
                </li>
                <li>Optional advanced fields:
                  <ul className="mt-2 list-inside list-circle space-y-1 ml-4">
                    <li><strong>Silence Threshold:</strong> Skip long filler blocks of 00/FF bytes</li>
                    <li><strong>Known Map Ranges:</strong> Preserve important offset ranges even if they contain filler bytes</li>
                  </ul>
                </li>
                <li>If you are a beginner, keep defaults and leave known ranges blank.</li>
              </ul>
            </div>

            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h4 className="text-base font-bold text-neutral-900 dark:text-white">Step 4️⃣: Convert to XCAL</h4>
              <ul className="mt-3 list-inside list-disc space-y-2">
                <li>Click the white <strong>"Convert to XCAL"</strong> button</li>
                <li>The converter reads your BIN file's raw bytes instantly (in your browser)</li>
                <li>It structures the data into the format you selected</li>
                <li>For XML: creates `&lt;Parameter&gt;` and `&lt;Table&gt;` elements from the binary data</li>
                <li>For Intel HEX: adds proper HEX record syntax and checksums</li>
              </ul>
            </div>

            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h4 className="text-base font-bold text-neutral-900 dark:text-white">Step 5️⃣: Download Your XCAL File</h4>
              <ul className="mt-3 list-inside list-disc space-y-2">
                <li>Once conversion is complete, you'll see: <code className="rounded bg-neutral-200 px-2 py-1 text-xs dark:bg-neutral-800">Conversion complete. Output size: X bytes.</code></li>
                <li>Click <strong>"Download .XCAL"</strong> button</li>
                <li>Your converted file saves as <code className="rounded bg-neutral-200 px-2 py-1 text-xs dark:bg-neutral-800">engine.xcal</code></li>
              </ul>
            </div>

            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h4 className="text-base font-bold text-neutral-900 dark:text-white">Step 6️⃣: Review and Edit in Your Tuning Tool</h4>
              <ul className="mt-3 list-inside list-disc space-y-2">
                <li>Open the converted XCAL file in your tuning software</li>
                <li><strong>Review the auto-generated parameter names:</strong> They'll be generic like "Param_1", "Param_2" since the BIN file has no metadata</li>
                <li><strong>Rename parameters:</strong> Change "Param_1" to "Idle_Speed", "Param_2" to "Boost_Limit", etc. based on what you know</li>
                <li><strong>Verify memory addresses:</strong> Make sure offsets (addresses) are correct for your specific ECU/tuning tool</li>
                <li><strong>Adjust data types:</strong> Change uint8 to uint16 if parameters should be 2-byte values</li>
              </ul>
            </div>

            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h4 className="text-base font-bold text-neutral-900 dark:text-white">Step 7️⃣: Save and Use</h4>
              <ul className="mt-3 list-inside list-disc space-y-2">
                <li>After editing, save the XCAL file in your tuning software</li>
                <li>Now you have a structured, human-readable version of your BIN calibration</li>
                <li>Use it for backing up tunes, sharing with other tuners, or documentation</li>
              </ul>
            </div>
          </div>

          {/* ===== WHY CONVERT BIN TO XCAL ===== */}
          <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Why Convert BIN to XCAL?
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            <div className="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-5 dark:from-blue-900/20 dark:to-purple-900/20">
              <p className="font-bold text-neutral-900 dark:text-white">📝 Readability</p>
              <p className="mt-2">
                BIN files are raw binary—unreadable by humans. Converting to XCAL (HEX or XML) makes the data readable and understandable.
              </p>
            </div>

            <div className="rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 p-5 dark:from-green-900/20 dark:to-emerald-900/20">
              <p className="font-bold text-neutral-900 dark:text-white">🔧 Editability</p>
              <p className="mt-2">
                With calibration parameters visible, you can easily edit values in your tuning software without dealing with raw hex dumps.
              </p>
            </div>

            <div className="rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 p-5 dark:from-yellow-900/20 dark:to-orange-900/20">
              <p className="font-bold text-neutral-900 dark:text-white">📦 Compatibility</p>
              <p className="mt-2">
                Many tuning tools accept XCAL (HEX or XML) but not raw BIN. Conversion makes your calibration compatible with more software.
              </p>
            </div>

            <div className="rounded-lg bg-gradient-to-r from-pink-50 to-red-50 p-5 dark:from-pink-900/20 dark:to-red-900/20">
              <p className="font-bold text-neutral-900 dark:text-white">💾 Backup & Archives</p>
              <p className="mt-2">
                Keep structured XCAL backups with documented parameter names for future reference and troubleshooting.
              </p>
            </div>
          </div>

          {/* ===== KEY DEFINITIONS ===== */}
          <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Key Definitions
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            <div className="rounded-lg border-l-4 border-orange-500 bg-orange-50 p-4 dark:bg-orange-900/20">
              <p className="font-bold text-orange-900 dark:text-orange-200">What is a BIN file?</p>
              <p className="mt-2">
                A BIN file is raw binary data containing calibration code and parameters. It's the actual machine-readable format that ECUs (engine control units) execute. BIN files have no metadata—they're just bytes at memory addresses.
              </p>
            </div>

            <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-900/20">
              <p className="font-bold text-blue-900 dark:text-blue-200">What happens during conversion?</p>
              <p className="mt-2">
                The converter reads the raw binary bytes and organizes them into structured XCAL format. It doesn't change the data—just how it's presented. Intel HEX adds addressing and record structure; XML organizes bytes into labeled parameters.
              </p>
            </div>

            <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4 dark:bg-green-900/20">
              <p className="font-bold text-green-900 dark:text-green-200">Is the converted data the same as the original?</p>
              <p className="mt-2">
                Yes—all bytes remain identical. The only difference is the presentation format. The actual calibration data hasn't changed; it's just now readable and editable in tuning software.
              </p>
            </div>

            <div className="rounded-lg border-l-4 border-purple-500 bg-purple-50 p-4 dark:bg-purple-900/20">
              <p className="font-bold text-purple-900 dark:text-purple-200">Do auto-generated parameter names matter?</p>
              <p className="mt-2">
                The converter uses generic names like "Param_1", "Param_2" because BIN files have no metadata about what each byte represents. You should review these names in your tuning software and rename them to match actual parameters (Idle_Speed, Torque_Limit, etc.) for clarity.
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
                ❓ Can I convert BIN to XCAL without uploading files?
              </h3>
              <p className="mt-3">
                Yes, 100%. This converter runs fully client-side in your browser. All conversion happens in your device memory and nothing is sent to any server.
              </p>
            </div>

            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                ❓ Which format should I choose—Intel HEX or XML?
              </h3>
              <p className="mt-3">
                <strong>Intel HEX:</strong> Use if your tuning software requires traditional HEX format. <strong>XML:</strong> Use for better readability and modern tools. Both contain the same data; it's just presentation.
              </p>
            </div>

            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                ❓ Why are parameter names auto-generated (Param_1, Param_2, etc.)?
              </h3>
              <p className="mt-3">
                BIN files are pure data with no metadata. The converter doesn't know what each byte represents. After conversion, you can rename these parameters in your tuning software based on your knowledge of the ECU.
              </p>
            </div>

            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                ❓ Can I edit the converted XCAL file in Notepad?
              </h3>
              <p className="mt-3">
                Yes! XML XCAL files can be opened and edited in any text editor (Notepad, VS Code, etc.). Intel HEX is also text-based and editable. However, be careful—wrong edits can corrupt your calibration.
              </p>
            </div>

            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                ❓ Will the converted file work in my tuning software?
              </h3>
              <p className="mt-3">
                It depends on your software. If it accepts XCAL format (either HEX or XML), yes. However, you may need to import and review parameter names. Some tuning tools may not accept auto-generated parameter structures—check your software's documentation.
              </p>
            </div>

            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                ❓ Can I convert back to BIN if I edit the XCAL?
              </h3>
              <p className="mt-3">
                Yes! Use the <strong>XCAL to BIN converter</strong> (the reverse tool) to convert your edited XCAL file back to BIN format for flashing.
              </p>
            </div>

            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                ❓ What if my BIN file is very large (50+ MB)?
              </h3>
              <p className="mt-3">
                The converter handles files up to your browser's memory limit (usually 1-2 GB). Very large files will take longer to process and convert, but it should work. Mobile browsers may have tighter memory limits.
              </p>
            </div>

            <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                ❓ Does conversion change the data or just the format?
              </h3>
              <p className="mt-3">
                <strong>Only the format changes.</strong> Every single byte from your original BIN file appears in the converted XCAL file. No data is added, removed, or modified—only reorganized with addressing and structure.
              </p>
            </div>
          </div>

          {/* ===== PRO TIPS ===== */}
          <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            💡 Pro Tips & Best Practices
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            <div className="rounded-lg border border-green-300 bg-green-50 p-4 dark:border-green-700 dark:bg-green-900/20">
              <p className="font-bold text-green-900 dark:text-green-200">✅ Use XML for Better Readability</p>
              <p className="mt-2">If your tuning tool supports it, choose XML format. It's easier to read and edit than Intel HEX, making parameter identification and validation simpler.</p>
            </div>

            <div className="rounded-lg border border-green-300 bg-green-50 p-4 dark:border-green-700 dark:bg-green-900/20">
              <p className="font-bold text-green-900 dark:text-green-200">✅ Document Parameter Meanings</p>
              <p className="mt-2">After conversion, immediately rename generic parameters to meaningful names in your tuning software. Add comments about what each parameter controls. Future you will appreciate it!</p>
            </div>

            <div className="rounded-lg border border-green-300 bg-green-50 p-4 dark:border-green-700 dark:bg-green-900/20">
              <p className="font-bold text-green-900 dark:text-green-200">✅ Compare With Original</p>
              <p className="mt-2">If you have an XCAL version of the same file, compare it with your converted version. This helps identify parameter locations and validate the conversion worked correctly.</p>
            </div>

            <div className="rounded-lg border border-green-300 bg-green-50 p-4 dark:border-green-700 dark:bg-green-900/20">
              <p className="font-bold text-green-900 dark:text-green-200">✅ Keep Backups of Both Formats</p>
              <p className="mt-2">Maintain backups of original BIN files and converted XCAL files. This gives you flexibility if one format becomes corrupted or inaccessible.</p>
            </div>

            <div className="rounded-lg border border-green-300 bg-green-50 p-4 dark:border-green-700 dark:bg-green-900/20">
              <p className="font-bold text-green-900 dark:text-green-200">✅ Validate Before Using in Production</p>
              <p className="mt-2">Always test converted files in your tuning software on a test ECU before using on a live vehicle. Ensure checksums and data integrity are correct.</p>
            </div>

            <div className="rounded-lg border border-green-300 bg-green-50 p-4 dark:border-green-700 dark:bg-green-900/20">
              <p className="font-bold text-green-900 dark:text-green-200">✅ Use Descriptive File Names</p>
              <p className="mt-2">Name files clearly: <code className="rounded bg-neutral-200 px-2 py-1 text-xs dark:bg-neutral-800">cummins_ecu_original.bin</code> → <code className="rounded bg-neutral-200 px-2 py-1 text-xs dark:bg-neutral-800">cummins_ecu_converted.xcal</code>. This shows lineage and purpose.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
