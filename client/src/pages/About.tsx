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
            Why We Built Sharp Shot
          </h1>
        </div>

        {/* Main Content */}
        <div className="space-y-16 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {/* Opening - Hero Section */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black dark:from-gray-950 dark:via-gray-900 dark:to-black p-12 md:p-16">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, #D8AC35 2px, transparent 2px), radial-gradient(circle at 75% 75%, #D8AC35 2px, transparent 2px)`,
                backgroundSize: '50px 50px'
              }}></div>
            </div>
            
            {/* Content */}
            <div className="relative max-w-4xl">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D8AC35]/20 border border-[#D8AC35]/30 mb-6">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                  <span className="text-sm font-medium text-[#D8AC35] uppercase tracking-wider">The Problem</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  Most bettors lose because they're playing blind.
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  Every sportsbook stacks the odds against you with hidden margins and vague "edges." 
                  <span className="text-[#D8AC35] font-semibold"> Sharp Shot flips that.</span>
                </p>
              </div>

              <div className="border-l-4 border-[#D8AC35] pl-8 mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D8AC35]/20 border border-[#D8AC35]/30 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                  <span className="text-sm font-medium text-[#D8AC35] uppercase tracking-wider">Our Solution</span>
                </div>
                <p className="text-xl text-gray-300 leading-relaxed">
                  We built Sharp Shot to uncover real value in every market, expose where the books are vulnerable, and give bettors the leverage of data-driven strategy.
                </p>
              </div>

              {/* Call to Action Statement */}
              <div className="relative p-8 rounded-xl bg-gradient-to-r from-[#D8AC35]/20 to-[#D8AC35]/10 border border-[#D8AC35]/30">
                <div className="absolute top-4 left-4">
                  <div className="w-3 h-3 rounded-full bg-[#D8AC35] animate-pulse"></div>
                </div>
                <blockquote className="text-2xl md:text-3xl font-bold text-white leading-tight">
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
          <div>
            <h2 className="text-3xl tungsten-style text-gray-900 dark:text-white mb-8">
              What Sharp Shot Does
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Identifies True Odds
                </h3>
                <p>Removes the vig so you see the market's real probabilities.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Finds Profitable Bets
                </h3>
                <p>Surfaces +EV, arbitrage, and middling opportunities across all major sportsbooks.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Quantifies Performance
                </h3>
                <p>Tracks closing line value and measures actual strategy results.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Scales With You
                </h3>
                <p>Whether you're grinding daily bets or running a full portfolio, Sharp Shot adapts to your volume.</p>
              </div>
            </div>
          </div>

          {/* Our Values */}
          <div>
            <h2 className="text-3xl tungsten-style text-gray-900 dark:text-white mb-8">
              Our Values
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Edge
                </h3>
                <p>We don't build features for flash. Everything we release is designed to increase your advantage.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Precision
                </h3>
                <p>Data and calculations you can verify — no black box.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Proof
                </h3>
                <p>Transparent logic and measurable results.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Community
                </h3>
                <p>A platform built for sharps, by sharps. Helping serious bettors sharpen together.</p>
              </div>
            </div>
          </div>

          {/* Who We Are */}
          <div>
            <h2 className="text-3xl tungsten-style text-gray-900 dark:text-white mb-8">
              Who We Are
            </h2>
            <p className="mb-6">
              We're sharp bettors, data obsessives, and system builders who believe that proof beats hype. Sharp Shot was created for people who want to move past guesswork and start betting with a repeatable edge.
            </p>
            <p>
              Our team combines expertise in betting, finance, and technology to deliver tools that are as reliable as they are powerful. We don't chase trends — we engineer systems designed to last.
            </p>
          </div>

          {/* Connect With Us */}
          <div>
            <h2 className="text-3xl tungsten-style text-gray-900 dark:text-white mb-8">
              Connect With Us
            </h2>
            <p className="mb-6">Stay sharp and follow us here:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-[#D8AC35] dark:hover:border-[#D8AC35] transition-all duration-200 group"
                >
                  <i className={`${social.icon} text-xl text-gray-600 dark:text-gray-400 group-hover:text-[#D8AC35] transition-colors`}></i>
                  <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
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
  );
}