import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PricingToggle } from "@/components/ui/pricing-toggle";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const starterPrice = isAnnual ? "$399.99" : "$39.99";
  const proPrice = isAnnual ? "$999.99" : "$99.99";
  const billing = isAnnual ? "/year" : "/month";

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl tungsten-style mb-6">Simple, Sharp Pricing</h1>
          <p className="text-xl text-gray-600 mb-8">Choose the plan that fits your edge</p>
          
          {/* Billing Toggle */}
          <PricingToggle onToggle={setIsAnnual} className="mb-12" />
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Starter Plan */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover-lift">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <div className="text-4xl font-bold mb-4">
                <span>{starterPrice}</span>
                <span className="text-lg text-gray-500">{billing}</span>
              </div>
              <p className="text-gray-600">Perfect for getting started</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                <span>Access to public Views</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                <span>Use of premade filters</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                <span>Line tracker & EV calculator</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                <span>Save up to 3 Views</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                <span>CSV export & dark mode</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                <span>Historical EV log (24h)</span>
              </li>
            </ul>
            
            <Button className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200">
              Choose Starter
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover-lift border-2 border-gold relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gold text-white px-4 py-2">Best for creators & pros</Badge>
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="text-4xl font-bold mb-4">
                <span>{proPrice}</span>
                <span className="text-lg text-gray-500">{billing}</span>
              </div>
              <p className="text-gray-600">For serious bettors and creators</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                <span>Full custom View Builder</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                <span>Private & collaborative Views</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                <span>Creator bios and analytics</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                <span>Public follower count</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                <span>Book weighting controls</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                <span>Fork other strategies</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                <span className="font-semibold">Everything in Starter</span>
              </li>
            </ul>
            
            <Button className="w-full bg-gold text-white hover:bg-gold/90">
              Choose Pro
            </Button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h3>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-bold">What is a "View" in Sharp Shot?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                A View is a saved betting strategy or filter that runs automatically on top of our calculator to find specific types of bets that match your criteria.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-bold">Can I change my plan anytime?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and billing is prorated.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="font-bold">Do you offer refunds?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                We offer a 7-day money-back guarantee for all new subscriptions. No questions asked.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger className="font-bold">Which sportsbooks do you track?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                We track odds from 40+ major sportsbooks including DraftKings, FanDuel, BetMGM, Caesars, and many more.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
