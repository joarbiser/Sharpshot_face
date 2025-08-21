import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const articles = [
  {
    title: "What Is +EV Betting (and Why It Works)",
    readTime: "8 min read",
    author: "Sharp Shot Team",
    preview: "Learn the fundamentals of expected value and why it's the cornerstone of profitable betting strategies.",
    icon: "fas fa-percentage",
    gradient: "from-gold/20 to-gold/40",
    iconColor: "text-gold"
  },
  {
    title: "How to Track True Edge Over Time",
    readTime: "12 min read",
    author: "Sharp Shot Team",
    preview: "Master CLV tracking and learn why it's the most reliable indicator of long-term betting success.",
    icon: "fas fa-chart-line",
    gradient: "from-blue-100 to-blue-200 dark:from-black dark:to-gray-900",
    iconColor: "text-blue-600"
  },
  {
    title: "Arbitrage vs. Middling: Which One Fits Your Bankroll?",
    readTime: "10 min read",
    author: "Sharp Shot Team",
    preview: "Discover how modern arbitrage opportunities have evolved and where to find guaranteed profits.",
    icon: "fas fa-balance-scale",
    gradient: "from-green-100 to-green-200",
    iconColor: "text-green-600"
  },
  {
    title: "Avoiding Bad Data in Sportsbooks",
    readTime: "6 min read",
    author: "Sharp Shot Team",
    preview: "Learn how to identify and avoid unreliable odds feeds that can sabotage your betting strategy.",
    icon: "fas fa-shield-alt",
    gradient: "from-red-100 to-red-200",
    iconColor: "text-red-600"
  },
  {
    title: "The Psychology of Betting Discipline",
    readTime: "15 min read",
    author: "Guest Author",
    preview: "Understand the mental game and develop the discipline needed for consistent profitability.",
    icon: "fas fa-brain",
    gradient: "from-purple-100 to-purple-200",
    iconColor: "text-purple-600"
  },
  {
    title: "Advanced Bankroll Management",
    readTime: "11 min read",
    author: "Sharp Shot Team",
    preview: "Learn sophisticated bankroll strategies that protect your capital while maximizing growth potential.",
    icon: "fas fa-piggy-bank",
    gradient: "from-yellow-100 to-yellow-200",
    iconColor: "text-yellow-600"
  }
];

export default function Learn() {
  const [searchTerm, setSearchTerm] = useState("");
  const [topicFilter, setTopicFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-black dark:via-gray-900 dark:to-[#D8AC35]/10">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-20">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 text-gray-900 dark:text-white" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
            LEARN.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Master profitable betting with data-driven strategies.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-20">
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Tutorials & Learning</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white mb-6 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 900, fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                LEARN THE SHARP WAY
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Tutorials, breakdowns, and real examples to help you master +EV betting.
              </p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-12">
              <div className="flex-1">
                <div className="relative">
                  <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    className="pl-12"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={topicFilter} onValueChange={setTopicFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Topics" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Topics</SelectItem>
                    <SelectItem value="clv">CLV</SelectItem>
                    <SelectItem value="props">Props</SelectItem>
                    <SelectItem value="ev">EV</SelectItem>
                    <SelectItem value="risk">Risk</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={authorFilter} onValueChange={setAuthorFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Authors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Authors</SelectItem>
                    <SelectItem value="team">Sharp Shot Team</SelectItem>
                    <SelectItem value="guests">Guests</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <article key={index} className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 overflow-hidden group cursor-pointer">
                  <div className={`h-48 bg-gradient-to-br ${article.gradient} flex items-center justify-center`}>
                    <i className={`${article.icon} text-4xl ${article.iconColor}`}></i>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-base text-gray-500 dark:text-gray-400 mb-3">
                      <span>{article.readTime}</span>
                      <span className="mx-2">•</span>
                      <span>{article.author}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{article.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg">{article.preview}</p>
                    <button className="text-[#D8AC35] font-semibold hover:text-[#D8AC35]/80 transition-colors text-lg">Read Article →</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
