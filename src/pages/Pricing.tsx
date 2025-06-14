
import React from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "₹0",
    credits: "100 Credits",
    description: "Perfect for trying ScriptMitra",
    highlight: false,
    button: "Current Plan",
    isFree: true
  },
  {
    name: "Starter",
    price: "₹299/mo",
    credits: "1000 Credits/month",
    description: "For growing creators & advisors",
    highlight: false,
    button: "Buy Now"
  },
  {
    name: "Pro",
    price: "₹599/mo",
    credits: "2500 Credits/month",
    description: "For agencies & content pros",
    highlight: true,
    button: "Buy Now"
  },
];

export default function Pricing() {
  // Payment handlers would go here
  const handleBuyNow = (plan: string) => {
    // TODO: Integrate Stripe/Razorpay payment flow here
    alert(`Payment flow for '${plan}' coming soon!`);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center py-12 bg-gradient-to-tr from-blue-100 via-blue-400/30 to-white dark:from-gray-900 dark:via-blue-900/50 dark:to-black transition-all">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-blue-900 dark:text-white animate-fade-in">
          Simple, Transparent Pricing
        </h1>
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl justify-center">
          {plans.map((plan, i) => (
            <Card
              key={plan.name}
              className={`
                w-full md:w-80 animate-fade-in-up 
                ${plan.highlight ? "border-2 border-purple-400 shadow-2xl scale-105" : "border border-blue-200"}
                ${plan.isFree ? "opacity-70 bg-blue-50" : "bg-white dark:bg-gray-900/90"}
              `}
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <CardContent className="p-8 flex flex-col items-center gap-4">
                <div className={`text-3xl font-bold mb-2 ${plan.highlight ? "text-purple-500" : "text-blue-600"}`}>{plan.name}</div>
                <div className="text-4xl font-extrabold">{plan.price}</div>
                <div className="mt-2 text-lg">{plan.credits}</div>
                <div className="text-sm text-gray-700 dark:text-gray-200 opacity-80">{plan.description}</div>
                <Button
                  className={`mt-6 w-full py-2 rounded-lg text-lg font-bold
                    ${plan.isFree
                      ? "bg-gray-100 border-gray-300 text-gray-400 cursor-default"
                      : plan.highlight
                        ? "bg-gradient-to-r from-purple-500 to-blue-400 hover:from-purple-600 hover:to-blue-500 text-white"
                        : "bg-blue-600 text-white hover:bg-blue-700"}
                  `}
                  disabled={plan.isFree}
                  onClick={() => handleBuyNow(plan.name)}
                >
                  {plan.button}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
