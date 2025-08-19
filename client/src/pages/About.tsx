import { Link } from "wouter";
import { FaXTwitter, FaInstagram, FaFacebook, FaTiktok, FaYoutube, FaDiscord } from "react-icons/fa6";

export default function About() {
  const socialLinks = [
    { name: "X", url: "https://twitter.com/sharpshotcalc", icon: FaXTwitter },
    { name: "Instagram", url: "https://instagram.com/sharpshotcalc", icon: FaInstagram },
    { name: "Facebook", url: "https://facebook.com/sharpshotcalc", icon: FaFacebook },
    { name: "TikTok", url: "https://www.tiktok.com/@sharpshotcalc?is_from_webapp=1&sender_device=pc", icon: FaTiktok },
    { name: "YouTube", url: "https://youtube.com/sharpshotcalc", icon: FaYoutube },
    { name: "Discord", url: "https://discord.gg/sharpshotcalc", icon: FaDiscord }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-black dark:via-gray-900 dark:to-[#D8AC35]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl tungsten-style text-gray-900 dark:text-white mb-8">
            About Sharp Shot
          </h1>
        </div>

        {/* Main Content */}
        <div className="space-y-16 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {/* Why We Built Sharp Shot Section */}
          <div className="relative">
            {/* Background with improved styling */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D8AC35]/5 to-transparent rounded-3xl"></div>
            
            <div className="relative border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 md:p-12 lg:p-16 backdrop-blur-sm">
              {/* Section Header */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                  <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Mission Statement</span>
                </div>
                <h2 className="text-4xl md:text-5xl tungsten-style text-gray-900 dark:text-white mb-6">
                  Why We Built Sharp Shot
                </h2>
              </div>
              
              {/* Two Column Layout */}
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-16">
                {/* The Problem */}
                <div className="flex flex-col">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-200/50 dark:border-red-800/50 mb-6">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span className="text-sm font-medium text-red-600 dark:text-red-400 uppercase tracking-wider">The Problem</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-6 min-h-[4rem]">
                    Most bettors lose because they're playing blind.
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    Every sportsbook stacks the odds against you with hidden margins and vague "edges." 
                    <span className="text-[#D8AC35] font-semibold"> Sharp Shot flips that.</span>
                  </p>
                </div>

                {/* Our Solution */}
                <div className="flex flex-col">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-6">
                    <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                    <span className="text-sm font-medium text-[#D8AC35] uppercase tracking-wider">Our Solution</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-6 min-h-[4rem]">
                    Data-driven betting intelligence.
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    We built Sharp Shot to uncover real value in every market, expose where the books are vulnerable, and give bettors the leverage of data-driven strategy.
                  </p>
                </div>
              </div>

              {/* Philosophy Statement */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#D8AC35]/10 via-[#D8AC35]/5 to-[#D8AC35]/10 rounded-2xl"></div>
                <div className="relative p-8 md:p-12 rounded-2xl border border-[#D8AC35]/20">
                  <div className="text-center mb-6">
                    <div className="w-4 h-4 rounded-full bg-[#D8AC35] mx-auto mb-4 animate-pulse"></div>
                    <blockquote className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                      "This isn't a pick service. It's a system for bettors who want to win long-term by relying on 
                      <span className="text-[#D8AC35]"> math, not luck</span>."
                    </blockquote>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D8AC35]"></div>
                    <span className="text-sm text-[#D8AC35] font-semibold uppercase tracking-[0.2em]">Sharp Shot Philosophy</span>
                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D8AC35]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What Sharp Shot Does */}
          <div className="py-8 md:py-12">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                  <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Capabilities</span>
                </div>
                <h2 className="text-4xl md:text-5xl tungsten-style text-gray-900 dark:text-white mb-6">
                  What Sharp Shot Does
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#D8AC35]"></div>
                    Identifies True Odds
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">Removes the vig so you see the market's real probabilities.</p>
                </div>
                
                <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#D8AC35]"></div>
                    Finds Profitable Bets
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">Surfaces +EV, arbitrage, and middling opportunities across all major sportsbooks.</p>
                </div>
                
                <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#D8AC35]"></div>
                    Quantifies Performance
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">Tracks closing line value and measures actual strategy results.</p>
                </div>
                
                <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#D8AC35]"></div>
                    Scales With You
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">Whether you're grinding daily bets or running a full portfolio, Sharp Shot adapts to your volume.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Our Values */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D8AC35]/5 to-transparent rounded-3xl"></div>
            
            <div className="relative border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                  <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Principles</span>
                </div>
                <h2 className="text-4xl md:text-5xl tungsten-style text-gray-900 dark:text-white mb-6">
                  Our Values
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#D8AC35]"></div>
                    Edge
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">We don't build features for flash. Everything we release is designed to increase your advantage.</p>
                </div>
                
                <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#D8AC35]"></div>
                    Precision
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">Data and calculations you can verify — no black box.</p>
                </div>
                
                <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#D8AC35]"></div>
                    Proof
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">Transparent logic and measurable results.</p>
                </div>
                
                <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#D8AC35]"></div>
                    Community
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">A platform built for sharps, by sharps. Helping serious bettors sharpen together.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Who We Are */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D8AC35]/5 to-transparent rounded-3xl"></div>
            
            <div className="relative border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                  <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Our Story</span>
                </div>
                <h2 className="text-4xl md:text-5xl tungsten-style text-gray-900 dark:text-white mb-6">
                  Who We Are
                </h2>
              </div>
              
              <div className="max-w-3xl mx-auto space-y-8 text-center">
                <p className="text-xl md:text-2xl leading-relaxed text-gray-700 dark:text-gray-300">
                  We're sharp bettors, data obsessives, and system builders who believe that proof beats hype. Sharp Shot was created for people who want to move past guesswork and start betting with a repeatable edge.
                </p>
                <p className="text-xl md:text-2xl leading-relaxed text-gray-700 dark:text-gray-300">
                  Our team combines expertise in betting, finance, and technology to deliver tools that are as reliable as they are powerful. We don't chase trends — we engineer systems designed to last.
                </p>
              </div>
            </div>
          </div>

          {/* Connect With Us */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D8AC35]/5 to-transparent rounded-3xl"></div>
            
            <div className="relative border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                  <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Community</span>
                </div>
                <h2 className="text-4xl md:text-5xl tungsten-style text-gray-900 dark:text-white mb-6">
                  Connect With Us
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Stay sharp and follow us here:</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  const isComingSoon = social.name === 'YouTube' || social.name === 'Discord';
                  
                  if (isComingSoon) {
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-center gap-3 p-6 rounded-2xl bg-white/30 dark:bg-gray-800/30 border border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm cursor-not-allowed"
                      >
                        <IconComponent className="text-xl text-gray-400 dark:text-gray-500" />
                        <span className="text-gray-400 dark:text-gray-500 font-medium">
                          {social.name}
                          <span className="ml-1 text-xs font-mono">(SOON)</span>
                        </span>
                      </div>
                    );
                  }
                  
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm hover:border-[#D8AC35]/50 hover:bg-[#D8AC35]/5 transition-all duration-200 group"
                    >
                      <IconComponent className="text-xl text-gray-600 dark:text-gray-400 group-hover:text-[#D8AC35] transition-colors" />
                      <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors font-medium">
                        {social.name}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}