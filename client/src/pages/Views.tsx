import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const viewsData = [
  {
    title: "1H NBA Totals | CLV > 4%",
    creator: "@TheHandle",
    description: "First half totals with strong closing line value in NBA games",
    ev: "+4.8%",
    winRate: "67%",
    followers: "217"
  },
  {
    title: "MLB Unders – Early Games Only",
    creator: "@BetBot_3000",
    description: "Under bets on early MLB games with specific weather conditions",
    ev: "+3.5%",
    winRate: "74%",
    followers: "108"
  },
  {
    title: "Road Dog Alt Lines",
    creator: "@edgefinder",
    description: "Road underdogs +7.5 or higher in divisional games",
    ev: "+5.4%",
    winRate: "61%",
    followers: "2.1k"
  },
  {
    title: "Prime Time Props",
    creator: "@primetime",
    description: "Player props in nationally televised games with high volume",
    ev: "+7.1%",
    winRate: "69%",
    followers: "934"
  },
  {
    title: "Weather Edge",
    creator: "@weatherbet",
    description: "Outdoor games with wind 15+ mph, target adjusted totals",
    ev: "+9.3%",
    winRate: "78%",
    followers: "567"
  },
  {
    title: "Closing Steam",
    creator: "@steamchaser",
    description: "Lines that moved 2+ points in the last 30 minutes",
    ev: "+11.2%",
    winRate: "72%",
    followers: "1.8k"
  }
];

export default function Views() {
  const [activeTab, setActiveTab] = useState("trending");
  const [activeSport, setActiveSport] = useState("all");

  const tabs = [
    { id: "trending", label: "Trending" },
    { id: "new", label: "New" },
    { id: "followed", label: "Most Followed" },
    { id: "ev", label: "Highest EV" }
  ];

  const sports = [
    { id: "all", label: "All Sports" },
    { id: "nfl", label: "NFL" },
    { id: "nba", label: "NBA" },
    { id: "props", label: "Props" },
    { id: "totals", label: "Totals" }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl tungsten-style mb-6 text-[#000000]">Explore Sharp Shot Views</h1>
          <p className="text-xl text-gray-600 sharp-text">Browse user-generated strategies and real-time filtered edges. Follow, fork, or build your own.</p>
          <div className="mt-6">
            <Link href="/view-builder">
              <Button className="bg-gold text-charcoal px-6 py-3 rounded-lg font-semibold text-lg hover:bg-gold/90 transition-colors">
                Create New View
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={
                activeTab === tab.id
                  ? "bg-gold text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Sport Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {sports.map((sport) => (
            <Badge
              key={sport.id}
              variant={activeSport === sport.id ? "default" : "secondary"}
              className={`cursor-pointer ${
                activeSport === sport.id
                  ? "bg-charcoal text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveSport(sport.id)}
            >
              {sport.label}
            </Badge>
          ))}
        </div>

        {/* View Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {viewsData.map((view, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover-lift border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold sharp-text text-[#b29566]">{view.title}</h3>
                <Badge className="bg-green-100 text-green-800 mono-font font-semibold">{view.ev} EV</Badge>
              </div>
              <p className="text-gray-600 text-sm mb-4">{view.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{view.creator}</span>
                <span>{view.winRate} Win Rate</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                <span><i className="fas fa-users mr-1"></i>{view.followers} followers</span>
              </div>
              <div className="flex gap-2">
                <Link href="/calculator" className="flex-1">
                  <Button className="w-full bg-gold text-charcoal hover:bg-gold/90">View Results</Button>
                </Link>
                <Link href="/view-builder" className="flex-1">
                  <Button variant="outline" className="w-full border-gold text-gold hover:bg-gold hover:text-white">Fork</Button>
                </Link>
                <Button variant="outline" size="icon" onClick={() => alert("Following " + view.creator)}>
                  <i className="fas fa-user-plus"></i>
                </Button>
                <Button variant="outline" size="icon" onClick={() => alert("Shared!")}>
                  <i className="fas fa-share"></i>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Pro CTA */}
        <div className="bg-gold/10 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4 text-[#000000]">Want to Create Your Own Views?</h3>
          <p className="text-gray-600 mb-6">Upgrade to Pro to access the full View Builder and share your strategies with the community.</p>
          <Button className="bg-gold text-charcoal hover:bg-gold/90">
            Upgrade to Pro
          </Button>
        </div>
      </div>
    </section>
  );
}
