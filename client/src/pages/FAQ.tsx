import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQ() {
  const faqSections = [
    {
      title: "About Sharp Shot",
      questions: [
        {
          id: "what-is-sharp-shot",
          question: "What is Sharp Shot?",
          answer: "Sharp Shot is a betting intelligence platform that identifies +EV (positive expected value), arbitrage, and middling opportunities across major sportsbooks. It helps users flip the vig and make data-driven bets with long-term edge."
        },
        {
          id: "who-is-it-for",
          question: "Who is Sharp Shot built for?",
          answer: "Sharp Shot is designed for serious bettors who want to move beyond gut feelings and develop a systematic, data-driven approach to sports betting. Whether you're a beginner learning the fundamentals or an experienced bettor looking for an edge, our tools scale to your level."
        },
        {
          id: "how-different",
          question: "How is Sharp Shot different from other betting tools?",
          answer: "Unlike pick services or tip sheets, Sharp Shot teaches you to fish rather than giving you fish. We provide the analytical tools and education you need to identify profitable opportunities yourself, backed by real-time data from dozens of sportsbooks."
        }
      ]
    },
    {
      title: "Getting Started",
      questions: [
        {
          id: "how-to-start",
          question: "How do I get started with Sharp Shot?",
          answer: "Start with our free trial to explore the platform. Begin with the +EV calculator to understand expected value concepts, then progress to our Trading Terminal to see live opportunities. Our learning resources will guide you through the fundamentals of profitable betting."
        },
        {
          id: "what-bankroll",
          question: "What bankroll do I need to get started?",
          answer: "Sharp Shot works with any bankroll size. Our tools help you manage risk appropriately whether you're betting $10 or $10,000 per game. The key is proper bankroll management and betting within your means, which our calculators help you determine."
        },
        {
          id: "which-sportsbooks",
          question: "Which sportsbooks does Sharp Shot support?",
          answer: "We integrate with all major US sportsbooks including DraftKings, FanDuel, BetMGM, Caesars, PointsBet, and many others. Our system continuously monitors dozens of books to find the best opportunities across the market."
        }
      ]
    },
    {
      title: "Features & Tools",
      questions: [
        {
          id: "what-is-ev",
          question: "What is +EV betting and why does it matter?",
          answer: "+EV (positive expected value) betting means placing bets that, mathematically, should be profitable over time. Even if you lose individual bets, +EV betting ensures you're making smart long-term decisions that will generate profit as your sample size increases."
        },
        {
          id: "how-arbitrage-works",
          question: "How does arbitrage betting work?",
          answer: "Arbitrage betting involves placing bets on all possible outcomes of an event across different sportsbooks, guaranteeing a profit regardless of the result. Our system identifies these opportunities and calculates the exact bet amounts needed to secure a profit."
        },
        {
          id: "what-is-middling",
          question: "What is middling in sports betting?",
          answer: "Middling occurs when you can bet both sides of a game at different point spreads or totals, creating a window where both bets can win. For example, betting the under at 45.5 and over at 43.5 creates a middle where you win both if the total lands at 44 or 45."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-black dark:via-gray-900 dark:to-[#D8AC35]/10">
      <section className="pt-16 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black mb-3 text-gray-900 dark:text-white" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
              Frequently Asked Questions
            </h1>
            <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-6">
              Everything you need to know about Sharp Shot.
            </p>
            
            {/* Tag Chip */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200/50 dark:border-gray-700/50 bg-gray-50/30 dark:bg-gray-800/30 text-xs text-gray-600 dark:text-gray-400 inline-flex mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D8AC35]"></div>
              Frequently Asked Questions
            </div>
          </div>

          {/* FAQ Sections */}
          <div className="space-y-12">
            {faqSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="group bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 px-8 py-7 transition-all duration-300">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">{section.title}</h2>
                
                <Accordion type="single" collapsible className="space-y-4">
                  {section.questions.map((faq, questionIndex) => (
                    <AccordionItem 
                      key={faq.id} 
                      value={faq.id} 
                      className="border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-6 py-2 hover:border-[#D8AC35]/30 transition-colors"
                    >
                      <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed pt-2 pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="group bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg border border-gray-200/50 dark:border-gray-700/50 px-8 py-8 transition-all duration-300 hover:transform hover:translate-y-[-2px] hover:border-gray-300/60 dark:hover:border-gray-600/60 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Still have questions?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Our community and support team are here to help you succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors">
                  Join Discord Community
                </button>
                <button className="border border-[#D8AC35] text-[#D8AC35] px-8 py-3 rounded-full font-semibold hover:bg-[#D8AC35] hover:text-white dark:hover:text-gray-900 transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}