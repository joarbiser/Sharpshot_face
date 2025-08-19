import { Link } from "wouter";
import { ExternalLink } from "lucide-react";

export default function About() {
  const socialLinks = [
    { name: "X (Twitter)", url: "https://twitter.com/sharpshotcalc", icon: "fab fa-twitter" },
    { name: "Instagram", url: "https://instagram.com/sharpshotcalc", icon: "fab fa-instagram" },
    { name: "Facebook", url: "https://facebook.com/sharpshotcalc", icon: "fab fa-facebook" },
    { name: "TikTok", url: "https://tiktok.com/@sharpshotcalc", icon: "fab fa-tiktok" },
    { name: "YouTube", url: "https://youtube.com/sharpshotcalc", icon: "fab fa-youtube" },
    { name: "Discord", url: "https://discord.gg/sharpshotcalc", icon: "fab fa-discord" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-black dark:via-gray-900 dark:to-[#D8AC35]/10">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl tungsten-style text-gray-900 dark:text-white mb-8">
            About Sharp Shot
          </h1>
        </div>

        {/* Main Content */}
        <div className="space-y-16 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {/* Why We Built Sharp Shot Section */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-gray-900 dark:via-gray-800 dark:to-black p-12 md:p-16">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, #D8AC35 2px, transparent 2px), radial-gradient(circle at 75% 75%, #D8AC35 2px, transparent 2px)`,
                backgroundSize: '50px 50px'
              }}></div>
            </div>
            
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl tungsten-style text-gray-900 dark:text-white mb-4">
                Why We Built Sharp Shot
              </h2>
            </div>
            
            {/* Content */}
            <div className="relative max-w-4xl">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D8AC35]/20 border border-[#D8AC35]/30 mb-6">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                  <span className="text-sm font-medium text-[#D8AC35] uppercase tracking-wider">The Problem</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  Most bettors lose because they're playing blind.
                </h3>
                <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                  Every sportsbook stacks the odds against you with hidden margins and vague "edges." 
                  <span className="text-[#D8AC35] font-semibold"> Sharp Shot flips that.</span>
                </p>
              </div>

              <div className="border-l-4 border-[#D8AC35] pl-8 mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D8AC35]/20 border border-[#D8AC35]/30 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                  <span className="text-sm font-medium text-[#D8AC35] uppercase tracking-wider">Our Solution</span>
                </div>
                <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                  We built Sharp Shot to uncover real value in every market, expose where the books are vulnerable, and give bettors the leverage of data-driven strategy.
                </p>
              </div>

              {/* Call to Action Statement */}
              <div className="relative p-8 rounded-xl bg-gradient-to-r from-[#D8AC35]/20 to-[#D8AC35]/10 border border-[#D8AC35]/30">
                <div className="absolute top-4 left-4">
                  <div className="w-3 h-3 rounded-full bg-[#D8AC35] animate-pulse"></div>
                </div>
                <blockquote className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                  "This isn't a pick service. It's a system for bettors who want to win long-term by relying on 
                  <span className="text-[#D8AC35]"> math, not luck</span>."
                </blockquote>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-[#D8AC35] to-transparent"></div>
                  <span className="text-sm text-[#D8AC35] font-medium uppercase tracking-wider">Sharp Shot Philosophy</span>
                </div>
              </div>
            </div>
          </div>

          {/* What Sharp Shot Does */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-gray-900 dark:via-gray-800 dark:to-black p-12 md:p-16">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, #D8AC35 2px, transparent 2px), radial-gradient(circle at 75% 75%, #D8AC35 2px, transparent 2px)`,
                backgroundSize: '50px 50px'
              }}></div>
            </div>
            
            <div className="relative">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D8AC35]/20 border border-[#D8AC35]/30 mb-6">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                  <span className="text-sm font-medium text-[#D8AC35] uppercase tracking-wider">Capabilities</span>
                </div>
                <h2 className="text-3xl md:text-4xl tungsten-style text-gray-900 dark:text-white mb-4">
                  What Sharp Shot Does
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 rounded-xl bg-gradient-to-r from-[#D8AC35]/10 to-transparent border border-[#D8AC35]/20">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                    Identifies True Odds
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">Removes the vig so you see the market's real probabilities.</p>
                </div>
                
                <div className="p-6 rounded-xl bg-gradient-to-r from-[#D8AC35]/10 to-transparent border border-[#D8AC35]/20">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                    Finds Profitable Bets
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">Surfaces +EV, arbitrage, and middling opportunities across all major sportsbooks.</p>
                </div>
                
                <div className="p-6 rounded-xl bg-gradient-to-r from-[#D8AC35]/10 to-transparent border border-[#D8AC35]/20">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                    Quantifies Performance
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">Tracks closing line value and measures actual strategy results.</p>
                </div>
                
                <div className="p-6 rounded-xl bg-gradient-to-r from-[#D8AC35]/10 to-transparent border border-[#D8AC35]/20">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                    Scales With You
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">Whether you're grinding daily bets or running a full portfolio, Sharp Shot adapts to your volume.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Our Values */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-gray-900 dark:via-gray-800 dark:to-black p-12 md:p-16">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, #D8AC35 2px, transparent 2px), radial-gradient(circle at 75% 75%, #D8AC35 2px, transparent 2px)`,
                backgroundSize: '50px 50px'
              }}></div>
            </div>
            
            <div className="relative">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D8AC35]/20 border border-[#D8AC35]/30 mb-6">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                  <span className="text-sm font-medium text-[#D8AC35] uppercase tracking-wider">Principles</span>
                </div>
                <h2 className="text-3xl md:text-4xl tungsten-style text-gray-900 dark:text-white mb-4">
                  Our Values
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 rounded-xl bg-gradient-to-r from-[#D8AC35]/10 to-transparent border border-[#D8AC35]/20">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                    Edge
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">We don't build features for flash. Everything we release is designed to increase your advantage.</p>
                </div>
                
                <div className="p-6 rounded-xl bg-gradient-to-r from-[#D8AC35]/10 to-transparent border border-[#D8AC35]/20">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                    Precision
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">Data and calculations you can verify — no black box.</p>
                </div>
                
                <div className="p-6 rounded-xl bg-gradient-to-r from-[#D8AC35]/10 to-transparent border border-[#D8AC35]/20">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                    Proof
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">Transparent logic and measurable results.</p>
                </div>
                
                <div className="p-6 rounded-xl bg-gradient-to-r from-[#D8AC35]/10 to-transparent border border-[#D8AC35]/20">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                    Community
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">A platform built for sharps, by sharps. Helping serious bettors sharpen together.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Who We Are */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-gray-900 dark:via-gray-800 dark:to-black p-12 md:p-16">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, #D8AC35 2px, transparent 2px), radial-gradient(circle at 75% 75%, #D8AC35 2px, transparent 2px)`,
                backgroundSize: '50px 50px'
              }}></div>
            </div>
            
            <div className="relative">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D8AC35]/20 border border-[#D8AC35]/30 mb-6">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                  <span className="text-sm font-medium text-[#D8AC35] uppercase tracking-wider">Our Story</span>
                </div>
                <h2 className="text-3xl md:text-4xl tungsten-style text-gray-900 dark:text-white mb-4">
                  Who We Are
                </h2>
              </div>
              
              <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
                <p className="text-xl leading-relaxed">
                  We're sharp bettors, data obsessives, and system builders who believe that proof beats hype. Sharp Shot was created for people who want to move past guesswork and start betting with a repeatable edge.
                </p>
                <p className="text-xl leading-relaxed">
                  Our team combines expertise in betting, finance, and technology to deliver tools that are as reliable as they are powerful. We don't chase trends — we engineer systems designed to last.
                </p>
              </div>
            </div>
          </div>

          {/* Connect With Us */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-gray-900 dark:via-gray-800 dark:to-black p-12 md:p-16">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, #D8AC35 2px, transparent 2px), radial-gradient(circle at 75% 75%, #D8AC35 2px, transparent 2px)`,
                backgroundSize: '50px 50px'
              }}></div>
            </div>
            
            <div className="relative">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D8AC35]/20 border border-[#D8AC35]/30 mb-6">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                  <span className="text-sm font-medium text-[#D8AC35] uppercase tracking-wider">Community</span>
                </div>
                <h2 className="text-3xl md:text-4xl tungsten-style text-gray-900 dark:text-white mb-4">
                  Connect With Us
                </h2>
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">Stay sharp and follow us here:</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-6 rounded-xl bg-gradient-to-r from-[#D8AC35]/10 to-transparent border border-[#D8AC35]/20 hover:border-[#D8AC35] hover:from-[#D8AC35]/20 transition-all duration-200 group"
                  >
                    <i className={`${social.icon} text-xl text-gray-600 dark:text-gray-400 group-hover:text-[#D8AC35] transition-colors`}></i>
                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors font-medium">
                      {social.name}
                    </span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#D8AC35] ml-auto transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}