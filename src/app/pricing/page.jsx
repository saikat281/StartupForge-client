"use client";

import { useState } from "react";
import { Check, Crown, Sparkles } from "lucide-react";

const FEATURES = [
    "Unlimited startup listings",
    "Unlimited opportunity postings",
    "Priority listing placement",
    "Advanced applicant analytics",
    "Verified badge on your profile",
    "Priority email support",
];

const PricingPage = () => {
    const [subscribing, setSubscribing] = useState(false);
    const currentPlan = "free"; // replace with actual user plan from session/props

    // const handleSubscribe = async () => {
    //     setSubscribing(true);
    //     try {
    //         console.log("Subscribing to Pro plan");
    //         // await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/subscribe`, {
    //         //   method: "POST",
    //         //   headers: { "Content-Type": "application/json" },
    //         //   body: JSON.stringify({ plan: "pro" }),
    //         // });
    //     } finally {
    //         setSubscribing(false);
    //     }
    // };

    return (
        <div className="p-6">
            <div className="max-w-md mx-auto">
                <div className="mb-6 text-center">
                    <h1 className="text-xl font-semibold text-gray-900">Upgrade to Pro</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Unlock the full experience with a Pro subscription.
                    </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                    {/* Header */}
                    <div className="bg-gray-900 px-6 py-6 text-white">
                        <div className="flex items-center justify-between">
                            <div className="h-11 w-11 rounded-lg bg-white/10 flex items-center justify-center">
                                <Crown size={22} />
                            </div>
                            {currentPlan === "pro" && (
                                <span className="flex items-center gap-1 rounded-full bg-white/10 text-xs font-medium px-2.5 py-1">
                                    <Sparkles size={12} />
                                    Current Plan
                                </span>
                            )}
                        </div>
                        <p className="text-lg font-semibold mt-4">Pro Plan</p>
                        <div className="flex items-end gap-1 mt-1">
                            <span className="text-3xl font-bold">$19</span>
                            <span className="text-sm text-gray-300 mb-1">/ month</span>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="px-6 py-6">
                        <ul className="space-y-3">
                            {FEATURES.map((feature) => (
                                <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-600">
                                    <Check size={16} className="text-green-600 shrink-0 mt-0.5" />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <form method="POST" action={'/api/subscription'}>
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 rounded-lg bg-gray-900 text-white text-sm font-medium px-5 py-2.5 mt-6 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed "
                            >
                                <Crown size={16} />
                                {"Subscribe to Pro"}
                            </button>
                        </form>

                        <p className="text-xs text-gray-400 text-center mt-3">
                            Cancel anytime. No hidden fees.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;