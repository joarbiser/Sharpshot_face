import { Check } from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube, FaDiscord } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import sharpShotLogo from "@assets/Gold_StarLeaf_1755739948433.png";

export default function About() {
  const socialLinks = [
    { name: "X", url: "https://x.com/sharpshotcalc", icon: FaXTwitter },
    { name: "Instagram", url: "https://instagram.com/sharpshotcalc", icon: FaInstagram },
    { name: "Facebook", url: "https://facebook.com/sharpshotcalc", icon: FaFacebook },
    { name: "TikTok", url: "https://tiktok.com/@sharpshotcalc", icon: FaTiktok },
    { name: "YouTube (SOON)", url: "#", icon: FaYoutube },
    { name: "Discord (SOON)", url: "#", icon: FaDiscord }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-black dark:via-gray-900 dark:to-[#D8AC35]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 text-gray-900 dark:text-white" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
            ABOUT SHARP SHOT.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Sharp Shot turns data into leverage, uncovering +EV, arbitrage, and middling opportunities so you can bet with precision, not luck.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-20">

          {/* Section */}
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Mission Statement</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                Why We Built Sharp Shot
              </h2>
            </div>

            {/* Two Column Layout - Separate Cards */}
            <div className="grid lg:grid-cols-2 gap-7 mb-12 max-w-[1280px] mx-auto">
              {/* The Problem */}
              <div className="group bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 px-8 py-7 h-full flex flex-col transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100/50 dark:bg-red-900/20 border border-red-200/50 dark:border-red-800/50 mb-6">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-sm font-medium text-red-700 dark:text-red-400 uppercase tracking-wider">The Problem</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                  Most bettors lose because they're playing blind.
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Every sportsbook stacks the odds against you with hidden margins and vague "edges." 
                  <span className="text-[#D8AC35] font-semibold"> Sharp Shot flips that.</span>
                </p>
              </div>

              {/* Our Solution */}
              <div className="group bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 px-8 py-7 h-full flex flex-col transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100/50 dark:bg-green-900/20 border border-green-200/50 dark:border-green-800/50 mb-6">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium text-green-700 dark:text-green-400 uppercase tracking-wider">Our Solution</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                  Data-driven betting intelligence.
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  We built Sharp Shot to uncover real value in every market, expose where the books are vulnerable, and give bettors the leverage of data-driven strategy.
                </p>
              </div>
            </div>
          </div>

          {/* Philosophy Statement */}
          <div>
            <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
              <div className="text-center mb-6">
                <div className="w-4 h-4 rounded-full bg-[#D8AC35] mx-auto mb-4 animate-pulse"></div>
                <blockquote className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                  This isn't a pick service. It's a system for bettors who want to win long-term by relying on 
                  <span className="text-[#D8AC35]"> math, not luck</span>.
                </blockquote>
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-16 bg-gray-300 dark:bg-gray-600"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-[0.2em]">Sharp Shot</span>
                <div className="h-px w-16 bg-gray-300 dark:bg-gray-600"></div>
              </div>
            </div>
          </div>

          {/* What Sharp Shot Does */}
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Capabilities</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                What Sharp Shot Does
              </h2>
            </div>

            {/* Three-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-12 max-w-[1280px] mx-auto">
              {/* Expected Value Detection */}
              <div className="group bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 px-8 py-7 h-full flex flex-col transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-[#D8AC35]/10 dark:bg-[#D8AC35]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D8AC35]/20 dark:border-[#D8AC35]/30">
                    <span className="text-[#D8AC35] font-bold text-lg">+EV</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Expected Value</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Find profitable opportunities</p>
                </div>
                
                <div className="space-y-3 mt-4 mb-6 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Real-time odds analysis</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Mathematical precision</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Value quantification</span>
                  </div>
                </div>
              </div>

              {/* Arbitrage Detection */}
              <div className="group bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 px-8 py-7 h-full flex flex-col transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-[#D8AC35]/10 dark:bg-[#D8AC35]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D8AC35]/20 dark:border-[#D8AC35]/30">
                    <span className="text-[#D8AC35] font-bold text-lg">ARB</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Arbitrage</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Guaranteed profit opportunities</p>
                </div>
                
                <div className="space-y-3 mt-4 mb-6 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Cross-book analysis</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Risk-free profits</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Stake optimization</span>
                  </div>
                </div>
              </div>

              {/* Middling Detection */}
              <div className="group bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 px-8 py-7 h-full flex flex-col transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-[#D8AC35]/10 dark:bg-[#D8AC35]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D8AC35]/20 dark:border-[#D8AC35]/30">
                    <span className="text-[#D8AC35] font-bold text-lg">MID</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Middling</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Strategic positioning</p>
                </div>
                
                <div className="space-y-3 mt-4 mb-6 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Line movement tracking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Win-win scenarios</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Advanced positioning</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Global Data Access Section */}
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Global Scale</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                Scanning Data from 40+ Books Worldwide
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Our system processes live odds from major sportsbooks across the globe, ensuring you never miss a profitable opportunity regardless of your location.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              {/* Left Column - Globe */}
              <div className="relative flex justify-center">
                <div className="logo-container" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
                  <div className="pulse-ring"></div>
                  <div className="pulse-ring"></div>
                  <div className="pulse-ring"></div>
                  <div className="spinning-3d-logo" style={{ transformStyle: 'preserve-3d' }}>
                    <img 
                      src={sharpShotLogo} 
                      alt="Sharp Shot Logo" 
                      className="logo-3d"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Stats */}
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-6 text-center">
                    <div className="text-3xl font-black text-[#D8AC35] mb-2">40+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Global Sportsbooks</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Monitored 24/7</div>
                  </div>
                  
                  <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-6 text-center">
                    <div className="text-3xl font-black text-[#D8AC35] mb-2">99.9%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Data Accuracy</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Real-time updates</div>
                  </div>
                  
                  <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-6 text-center">
                    <div className="text-3xl font-black text-[#D8AC35] mb-2">&lt;5s</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Update Speed</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Lightning fast</div>
                  </div>
                  
                  <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-6 text-center">
                    <div className="text-3xl font-black text-[#D8AC35] mb-2">24/7</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Continuous Monitoring</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Never sleeps</div>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Global Coverage</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                    Sharp Shot connects to major sportsbooks worldwide including DraftKings, FanDuel, BetMGM, Caesars, PointsBet, and 35+ international providers across North America, Europe, and Asia.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-[#D8AC35]/20 text-[#D8AC35] text-xs rounded">US Markets</span>
                    <span className="px-2 py-1 bg-[#D8AC35]/20 text-[#D8AC35] text-xs rounded">European Books</span>
                    <span className="px-2 py-1 bg-[#D8AC35]/20 text-[#D8AC35] text-xs rounded">Asian Markets</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Our Values */}
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Core Values</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                What We Stand For
              </h2>
            </div>

            <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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

          {/* Community Section */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">Join the Community</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Connect with thousands of sharp bettors sharing strategies, insights, and wins.
            </p>
            <div className="flex justify-center flex-wrap gap-4 mb-20">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-[#D8AC35]/10 dark:bg-[#D8AC35]/20 hover:bg-[#D8AC35]/20 dark:hover:bg-[#D8AC35]/30 rounded-full flex items-center justify-center transition-colors border border-[#D8AC35]/20 dark:border-[#D8AC35]/30"
                  title={link.name}
                >
                  <link.icon className="w-5 h-5 text-[#D8AC35]" />
                </a>
              ))}
            </div>
          </div>

          {/* Quote Section */}
          <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
            <div className="text-center mb-6">
              <div className="w-4 h-4 rounded-full bg-[#D8AC35] mx-auto mb-4 animate-pulse"></div>
              <blockquote className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                Data-driven decisions beat gut feelings every time — that's the 
                <span className="text-[#D8AC35]"> Sharp Shot difference</span>.
              </blockquote>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-gray-300 dark:bg-gray-600"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-[0.2em]">Sharp Shot</span>
              <div className="h-px w-16 bg-gray-300 dark:bg-gray-600"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}