import { Check } from "lucide-react";
import { FaDiscord, FaTwitter, FaYoutube } from "react-icons/fa";

export default function About() {
  const socialLinks = [
    { name: "Twitter", url: "https://twitter.com/sharpshotcalc", icon: FaTwitter },
    { name: "YouTube", url: "https://youtube.com/@sharpshotcalc", icon: FaYoutube },
    { name: "Discord", url: "https://discord.gg/sharpshotcalc", icon: FaDiscord }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-black dark:via-gray-900 dark:to-[#D8AC35]/10">
      <section className="pt-16 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black mb-3 text-gray-900 dark:text-white" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
              About Sharp Shot
            </h1>
            <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-6">
              Built for sharp minds. Powered by data.
            </p>
            
            {/* Tag Chip */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200/50 dark:border-gray-700/50 bg-gray-50/30 dark:bg-gray-800/30 text-xs text-gray-600 dark:text-gray-400 inline-flex mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D8AC35]"></div>
              About Sharp Shot
            </div>
          </div>

          {/* Mission & Values Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-16 max-w-[1280px] mx-auto">
            {/* Our Mission */}
            <div className="group bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg border border-gray-200/50 dark:border-gray-700/50 px-8 py-7 h-full flex flex-col transition-all duration-300 hover:transform hover:translate-y-[-2px] hover:border-gray-300/60 dark:hover:border-gray-600/60">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Our Mission</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Democratizing betting intelligence</p>
              </div>
              
              <div className="space-y-3 mt-4 mb-6 flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                  </div>
                  <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Level the playing field in sports betting</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                  </div>
                  <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Provide professional-grade analytics tools</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                  </div>
                  <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Make sophisticated strategies accessible</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                  </div>
                  <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Help bettors develop sustainable edge</span>
                </div>
              </div>
            </div>

            {/* Our Values */}
            <div className="group bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg border border-gray-200/50 dark:border-gray-700/50 px-8 py-7 h-full flex flex-col transition-all duration-300 hover:transform hover:translate-y-[-2px] hover:border-gray-300/60 dark:hover:border-gray-600/60">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Our Values</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">What drives every decision</p>
              </div>
              
              <div className="space-y-3 mt-4 mb-6 flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                  </div>
                  <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Data-Driven Decisions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                  </div>
                  <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Transparency First</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                  </div>
                  <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Community Growth</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                  </div>
                  <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Mathematical Foundation</span>
                </div>
              </div>
            </div>
          </div>

          {/* What We Do Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-16 max-w-[1280px] mx-auto">
            {/* Expected Value Detection */}
            <div className="group bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg border border-gray-200/50 dark:border-gray-700/50 px-8 py-7 h-full flex flex-col transition-all duration-300 hover:transform hover:translate-y-[-2px] hover:border-gray-300/60 dark:hover:border-gray-600/60">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-[#D8AC35]/10 dark:bg-[#D8AC35]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D8AC35]/20 dark:border-[#D8AC35]/30">
                  <span className="text-[#D8AC35] font-bold text-lg">+EV</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Expected Value</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm text-center leading-relaxed flex-1">
                Identify profitable betting opportunities with mathematical precision across all major sportsbooks.
              </p>
            </div>

            {/* Arbitrage Detection */}
            <div className="group bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg border border-gray-200/50 dark:border-gray-700/50 px-8 py-7 h-full flex flex-col transition-all duration-300 hover:transform hover:translate-y-[-2px] hover:border-gray-300/60 dark:hover:border-gray-600/60">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-[#D8AC35]/10 dark:bg-[#D8AC35]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D8AC35]/20 dark:border-[#D8AC35]/30">
                  <span className="text-[#D8AC35] font-bold text-lg">ARB</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Arbitrage</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm text-center leading-relaxed flex-1">
                Find guaranteed profit opportunities by exploiting pricing differences between sportsbooks.
              </p>
            </div>

            {/* Middling Detection */}
            <div className="group bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg border border-gray-200/50 dark:border-gray-700/50 px-8 py-7 h-full flex flex-col transition-all duration-300 hover:transform hover:translate-y-[-2px] hover:border-gray-300/60 dark:hover:border-gray-600/60">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-[#D8AC35]/10 dark:bg-[#D8AC35]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D8AC35]/20 dark:border-[#D8AC35]/30">
                  <span className="text-[#D8AC35] font-bold text-lg">MID</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Middling</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm text-center leading-relaxed flex-1">
                Discover middling opportunities where you can win both sides of a bet when lines move.
              </p>
            </div>
          </div>

          {/* Community Section */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">Join the Community</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Connect with thousands of sharp bettors sharing strategies, insights, and wins.
            </p>
            <div className="flex justify-center gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-[#D8AC35]/10 dark:bg-[#D8AC35]/20 hover:bg-[#D8AC35]/20 dark:hover:bg-[#D8AC35]/30 rounded-full flex items-center justify-center transition-colors border border-[#D8AC35]/20 dark:border-[#D8AC35]/30"
                >
                  <link.icon className="w-5 h-5 text-[#D8AC35]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}