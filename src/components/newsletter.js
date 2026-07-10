'use client';

import { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export default function NewsLetter() {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        /* 
        // --- API INTEGRATION LOGIC ---
        // Uncomment and configure this block when connecting your real backend
        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) throw new Error('Subscription failed');
        } catch (error) {
            console.error(error);
        }
        // ------------------------------
        */

        // Instantly switch to success layout state
        setIsSubscribed(true);
        setEmail('');
    };

    return (
        <section className="py-16 px-4 bg-[#171717]">
            <div className="max-w-xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-8 md:p-10 text-center shadow-xl relative overflow-hidden">
                {/* Background ambient accent ring */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400/5 rounded-full blur-2xl pointer-events-none" />
                
                {!isSubscribed ? (
                    <div className="space-y-6 animate-fadeIn">
                        {/* Header Icon */}
                        <div className="mx-auto w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-yellow-400 border border-zinc-700">
                            <Mail className="h-5 w-5" />
                        </div>

                        <div>
                            <h3 className="text-2xl md:text-3xl font-light text-white tracking-tight mb-2">
                                Join Our Newsletter
                            </h3>
                            <p className="text-zinc-400 text-sm md:text-base max-w-sm mx-auto font-light leading-relaxed">
                                Get the latest updates and curated articles delivered straight to your inbox.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
                        >
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="px-4 py-3 w-full rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 w-full sm:w-auto bg-yellow-400 text-neutral-900 font-semibold text-sm rounded-xl hover:bg-yellow-500 active:scale-95 transition-all shadow-md shrink-0"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                ) : (
                    /* Elegant Post-Subscription View */
                    <div className="py-6 space-y-4 animate-scaleUp">
                        <div className="mx-auto w-14 h-14 rounded-full bg-yellow-400/10 flex items-center justify-center text-yellow-400">
                            <CheckCircle2 className="h-8 w-8" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-normal text-white mb-1">
                                You&apos;re on the list!
                            </h3>
                            <p className="text-zinc-400 text-sm max-w-xs mx-auto font-light">
                                Thank you for subscribing. We look forward to sharing premium insights with you shortly.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}