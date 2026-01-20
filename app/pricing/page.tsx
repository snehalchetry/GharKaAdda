import { Check } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const studentPlans = [
    {
      name: "Free",
      price: "₹0",
      description: "Perfect for students looking for affordable stays",
      features: [
        "Browse all listings",
        "Basic filters",
        "View listing details",
        "Contact owners",
        "Save listings",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Premium",
      price: "₹49",
      period: "/month",
      description: "Early access to new listings and premium features",
      features: [
        "Everything in Free",
        "Early access to new listings",
        "Advanced filters",
        "Priority support",
        "Verified badge",
        "No ads",
      ],
      cta: "Upgrade Now",
      popular: true,
    },
  ];

  const ownerPlans = [
    {
      name: "Basic",
      price: "₹999",
      period: "/month",
      description: "Perfect for individual PG owners",
      features: [
        "List up to 3 properties",
        "Basic analytics",
        "Direct student contact",
        "Email support",
      ],
      cta: "Start Listing",
      popular: false,
    },
    {
      name: "Premium",
      price: "₹2,499",
      period: "/month",
      description: "For multiple properties and advanced features",
      features: [
        "Unlimited listings",
        "Advanced analytics",
        "Boost listings",
        "Priority placement",
        "Verified badge",
        "24/7 support",
        "Featured listings",
      ],
      cta: "Get Premium",
      popular: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600">
            Choose the plan that works best for you
          </p>
        </div>

        {/* Student Plans */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">For Students</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {studentPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-md p-8 ${
                  plan.popular ? "ring-2 ring-primary" : ""
                }`}
              >
                {plan.popular && (
                  <div className="bg-primary text-white text-center py-1 rounded-full text-sm font-semibold mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-600">{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/auth/signup?role=student"
                  className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Owner Plans */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">For PG Owners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {ownerPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-md p-8 ${
                  plan.popular ? "ring-2 ring-primary" : ""
                }`}
              >
                {plan.popular && (
                  <div className="bg-primary text-white text-center py-1 rounded-full text-sm font-semibold mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-600">{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/auth/signup?role=owner"
                  className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Model Info */}
        <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Our Revenue Model</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Free for Students:</strong> We believe in helping students find affordable
              accommodation without any barriers. Our basic service is completely free.
            </p>
            <p>
              <strong>Premium Subscriptions:</strong> Students can opt for premium features like
              early access to new listings and advanced filters for a small monthly fee.
            </p>
            <p>
              <strong>Owner Subscriptions:</strong> PG owners pay a monthly subscription to list
              their properties. Premium plans offer additional features like boosted listings and
              priority placement.
            </p>
            <p>
              <strong>No Brokers, No Hidden Fees:</strong> We maintain transparency. No commission
              charges, no hidden costs. What you see is what you pay.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

