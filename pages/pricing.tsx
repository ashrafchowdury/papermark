import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import Navbar from "@/components/web/navbar";
import Footer from "@/components/web/footer";
import Link from "next/link";
import GitHubIcon from "@/components/shared/icons/github";
import { usePlausible } from "next-plausible";

const frequencies: {
  value: "monthly" | "annually";
  label: "Monthly" | "Annually";
  priceSuffix: "/month" | "/year";
}[] = [
  { value: "monthly", label: "Monthly", priceSuffix: "/month" },
  { value: "annually", label: "Annually", priceSuffix: "/year" },
];
const tiers: {
  name: string;
  id: string;
  href: string;
  price: {
    monthly: string;
    annually: string;
  };
  description: string;
  features: string[];
  bgColor: string;
  borderColor: string;
  textColor: string;
  buttonText: string;
  mostPopular: boolean;
}[] = [
  {
    name: "Free",
    id: "tier-free",
    href: "/login",
    price: { monthly: "€0", annually: "$0" },
    description: "The essentials to start sharing documents securely.",
    features: [
      "1 user",
      "Unlimited links",
      "Analytics for each page",
      "Document sharing controls",
    ],

    bgColor: "bg-gray-200",
    borderColor: "#bg-gray-800",
    textColor: "#bg-gray-800",
    buttonText: "Start for free",
    mostPopular: false,
  },
  {
    name: "Pro",
    id: "tier-freelancer",
    href: "/login",
    price: { monthly: "€29", annually: "$290" },
    description:
      "The essentials to provide a branded experience for your documents.",
    features: [
      "Everything in Free, plus:",
      "Up to 3 active users",
      "Custom domain",
      "Advanced access controls",
      "Papermark AI",
    ],
    bgColor: "bg-gray-200",
    borderColor: "#bg-gray-800",
    textColor: "#bg-gray-800",
    buttonText: "Choose Pro",
    mostPopular: false,
  },
  {
    name: "Business",
    id: "tier-startup",
    href: "/login",
    price: { monthly: "€79", annually: "$790" },
    description: "A plan that scales with your rapidly growing business.",
    features: [
      "Everything in Pro, plus:",
      "Up to 10 active users",
      "Data room",
      "Large file uploads",
      "Custom Branding",
      "24h Priority Support",
    ],
    bgColor: "#fb7a00",
    borderColor: "#fb7a00",
    textColor: "#black",
    buttonText: "Choose Business",
    mostPopular: true,
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    href: "https://cal.com/marcseitz/papermark",
    price: { monthly: "Custom", annually: "$" },
    description: "Self-hosted and advanced infrastructure for your company.",
    features: [
      "Self-Hosted version",
      "Unlimited users",
      "Unlimited documents",
      "Different file types",
      "Up to 5TB file uploads",
      "Dedicated support",
      "Custom Papermark AI",
    ],
    bgColor: "bg-gray-200",
    borderColor: "#bg-gray-800",
    textColor: "#bg-gray-800",
    buttonText: "Book a demo",
    mostPopular: false,
  },
];

export default function PricingPage() {
  const plausible = usePlausible();
  const frequency = frequencies[0];

  plausible;

  return (
    <>
      <div className="flex flex-1 flex-col bg-white text-black">
        <Navbar />
        <div className="max-w-7xl w-full mx-auto px-4 md:px-8">
          <div className="pt-24 pb-2">
            <h1 className="text-4xl md:text-6xl text-balance">
              Find the plan that
              <br />
              works for you
            </h1>
            {/* <p className="text-xl mt-8 text-balance max-w-3xl">
              Papermark is an open-source document sharing infrastructure with
              built-in page analytics and custom domains.
            </p> */}
            {/* <div className="pt-8 space-x-2">
              <Link
                href="https://cal.com/marcseitz/papermark"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="text-base rounded-3xl bg-transparent border-black"
                >
                  Help with pricing
                </Button>
              </Link>
              <Link href="/login">
                <Button className="text-base bg-[#fb7a00] rounded-3xl">
                  Start free
                </Button>
              </Link>
            </div> */}
          </div>
        </div>
        <div className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="isolate grid  grid-cols-1  md:grid-cols-2  xl:grid-cols-4 border border-black rounded-xl overflow-hidden">
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className="border-black border-r-0 md:odd:border-r xl:even:border-r xl:last:!border-r-0 flex flex-col justify-between"
                >
                  <div>
                    <div className="border-b border-black p-6 bg-gray-100">
                      <h3
                        id={tier.id}
                        className="text-balance text-gray-900 text-xl leading-8"
                      >
                        {tier.name}
                      </h3>
                    </div>
                    <div className="p-6">
                      <p className="mt-4 text-sm leading-6 text-gray-600 text-balance">
                        {tier.description}
                      </p>
                      <p className="mt-6 flex items-baseline gap-x-1">
                        <span className="text-balance text-4xl font-medium  text-gray-900">
                          {tier.price[frequency.value]}
                        </span>
                        <span
                          className={cn(
                            "text-sm font-semibold leading-6 text-gray-600",
                            tier.id === "tier-enterprise" ? "hidden" : "",
                          )}
                        >
                          {frequency.priceSuffix}
                        </span>
                      </p>
                      <ul
                        role="list"
                        className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
                      >
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex gap-x-3">
                            <CheckIcon
                              className="h-6 w-5 flex-none text-[#fb7a00]"
                              aria-hidden="true"
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="p-6">
                    <Link
                      href={tier.href}
                      onClick={() => {
                        plausible("clickedPricing", {
                          props: { tier: tier.name },
                        });
                      }}
                    >
                      <Button
                        className="rounded-3xl hover:bg-gray-100"
                        style={{
                          backgroundColor: tier.bgColor,
                          borderColor: tier.borderColor,
                          color: tier.textColor,
                          borderWidth: "1px",
                        }}
                      >
                        {tier.buttonText}
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full max-w-7xl px-4 md:px-8 mx-auto ">
          <div className="py-12 bg-[#fb7a00] rounded-3xl mx-auto px-6">
            <div className="flex lg:flex-row flex-col item-center justify-between space-y-10 lg:space-y-0">
              <h2 className="text-3xl text-nowrap">Looking to self-host?</h2>
              <div className="space-x-2 flex items-center">
                <Link
                  href="https://github.com/mfts/papermark"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="text-base rounded-3xl bg-transparent border-black hover:bg-gray-200 hover:text-black"
                  >
                    <GitHubIcon className="mr-2 h-6 w-6" />
                    View Github
                  </Button>
                </Link>
                <Link
                  href="https://cal.com/marcseitz/papermark"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="text-base rounded-3xl text-gray-200 bg-black hover:bg-gray-900">
                    Book a demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
