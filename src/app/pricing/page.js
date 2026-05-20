"use client";

import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

export default function PricingPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(null);

  const handleCheckout = async (planId) => {
    if (!session) {
      signIn("google");
      return;
    }

    try {
      setLoading(planId);
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });

      if (!res.ok) throw new Error("Failed to create checkout");

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
      alert("Checkout error. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  const plans = [
    {
      id: "standard",
      name: "Standard Pack",
      price: "$5.00",
      credits: 1000,
      description: "Ideal for small shops starting with pet ad creatives.",
      features: [
        "Up to 83 full high-res generations (12 credits each)",
        "Support for up to 14 reference product photos",
        "Custom descriptive prompt support",
        "Believable pet species blending logic",
        "Download results in high definition"
      ],
      tag: "Best Value"
    },
    {
      id: "pro",
      name: "Pro Pack",
      price: "$10.00",
      credits: 2000,
      description: "Best for high-volume pet brands managing larger catalogs.",
      features: [
        "Up to 166 full high-res generations (12 credits each)",
        "Support for up to 14 reference product photos",
        "Custom descriptive prompt support",
        "Priority AI generation processing queue",
        "Premium customer support",
        "Download results in high definition"
      ],
      tag: "Popular"
    }
  ];

  return (
    <main className="flex-1 overflow-y-auto bg-neutral-50 px-6 py-12">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Simple, Credit-Based Pricing
        </h1>
        <p className="mt-3 text-neutral-500 max-w-md mx-auto text-sm">
          Top up your account with credits to generate photorealistic pet ad scenes. Each generation costs exactly 12 credits.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="flex flex-col justify-between bg-white border border-neutral-200/80 p-6 rounded-sm transition-all hover:shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-neutral-900">{plan.name}</h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 text-xs font-semibold">
                  {plan.tag}
                </span>
              </div>
              <p className="mt-2 text-xs text-neutral-400">{plan.description}</p>
              
              <div className="mt-4 flex items-baseline">
                <span className="text-3xl font-extrabold tracking-tight text-neutral-900">{plan.price}</span>
                <span className="ml-1 text-sm text-neutral-400">/ one-time</span>
              </div>

              <div className="mt-4 py-2 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-700">Credits Included</span>
                <span className="text-lg font-bold text-neutral-900">{plan.credits} credits</span>
              </div>

              <ul className="mt-6 space-y-2 border-t border-neutral-100 pt-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-600">
                    <FaCheck className="mt-0.5 text-neutral-400 flex-shrink-0 text-[10px]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleCheckout(plan.id)}
              disabled={loading !== null}
              className="mt-8 w-full py-2 bg-neutral-950 hover:bg-neutral-800 disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed text-white font-semibold text-xs rounded-sm transition-all cursor-pointer shadow-sm"
            >
              {loading === plan.id ? "Redirecting..." : `Buy ${plan.name}`}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
