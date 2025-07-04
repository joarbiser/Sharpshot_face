import { Button } from "@/components/ui/button";

export default function Affiliate() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl tungsten-style mb-6">Refer Sharps. Get Paid.</h1>
          <p className="text-xl text-gray-600 sharp-text">Earn recurring income by sharing Sharp Shot with other serious bettors.</p>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-gold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Apply & Get Approved</h3>
              <p className="text-gray-600">Submit your application and get approved for our affiliate program. We review all applications manually.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-gold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Share Your Link</h3>
              <p className="text-gray-600">Use your custom affiliate link and marketing assets to refer users to Sharp Shot.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-gold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Earn Commissions</h3>
              <p className="text-gray-600">Get paid weekly via PayPal or ACH based on your active referrals and commission tier.</p>
            </div>
          </div>
        </div>

        {/* Battle Pass Style Progress */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 sharp-text">Affiliate Structure (Battle Pass Style)</h2>
          
          {/* Progress Bar */}
          <div className="bg-charcoal rounded-xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Progress to Premium</h3>
              <span className="text-gold font-bold text-lg">7/25 Active Referrals</span>
            </div>
            
            {/* Progress Visualization */}
            <div className="relative">
              <div className="flex justify-between mb-2">
                {[5, 10, 15, 20, 25].map((milestone, index) => (
                  <div key={milestone} className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ${
                      index < 1 ? 'bg-gold text-white' : 'bg-gray-600 text-gray-400'
                    }`}>
                      {milestone}
                    </div>
                    <span className="text-xs text-gray-400 mt-2">{
                      milestone === 5 ? '20%' :
                      milestone === 10 ? '30%' :
                      milestone === 15 ? '40%' :
                      milestone === 20 ? '50%' :
                      '51% + Premium'
                    }</span>
                  </div>
                ))}
              </div>
              
              {/* Progress Line */}
              <div className="absolute top-6 left-6 right-6 h-1 bg-gray-600 rounded">
                <div className="h-full bg-gradient-to-r from-gold to-yellow-400 rounded w-[28%]"></div>
              </div>
            </div>
          </div>

          {/* Commission Milestones */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border-2 border-gold rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-gold mb-2">20%</div>
              <div className="text-sm text-gray-500 mb-2">5 active users</div>
              <div className="w-8 h-8 bg-gold rounded-full mx-auto flex items-center justify-center">
                <i className="fas fa-check text-white text-sm"></i>
              </div>
            </div>
            
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center opacity-60">
              <div className="text-3xl font-bold text-gray-400 mb-2">30%</div>
              <div className="text-sm text-gray-500 mb-2">10 active users</div>
              <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto flex items-center justify-center">
                <i className="fas fa-lock text-white text-sm"></i>
              </div>
            </div>
            
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center opacity-60">
              <div className="text-3xl font-bold text-gray-400 mb-2">40%</div>
              <div className="text-sm text-gray-500 mb-2">15 active users</div>
              <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto flex items-center justify-center">
                <i className="fas fa-lock text-white text-sm"></i>
              </div>
            </div>
            
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center opacity-60">
              <div className="text-3xl font-bold text-gray-400 mb-2">50%</div>
              <div className="text-sm text-gray-500 mb-2">20 active users</div>
              <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto flex items-center justify-center">
                <i className="fas fa-lock text-white text-sm"></i>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gold/20 to-gold/40 border-2 border-gold rounded-xl p-6 text-center relative">
              <div className="absolute -top-2 -right-2 bg-gold text-white text-xs px-2 py-1 rounded-full font-bold">PREMIUM</div>
              <div className="text-3xl font-bold text-charcoal mb-2">51%</div>
              <div className="text-sm text-gray-600 mb-2">25 active users</div>
              <div className="text-xs text-charcoal font-medium">
                + Free subscription<br />
                + Exclusive community
              </div>
            </div>
          </div>

          {/* Prize Wheel */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 sharp-text">Prize Wheel at Milestones</h3>
            <p className="text-gray-600 mb-6">Spin for bonus rewards at each milestone (5, 10, 15, 20, 25 referrals)</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-white p-3 rounded-lg">
                <div className="text-gold font-bold">50% off next month</div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="text-green-600 font-bold">1 free month Premium</div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="text-blue-600 font-bold">50% off Premium</div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="text-purple-600 font-bold">3 free months Regular</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recurring Commission Tiers */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 sharp-text">Recurring Commission Tiers</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover-lift">
              <h4 className="text-lg font-bold mb-4">Bronze Tier</h4>
              <div className="text-3xl font-bold text-gray-600 mb-2">10%</div>
              <p className="text-gray-600 mb-4">Recurring commission</p>
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <span className="font-semibold">1-9 active referrals</span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover-lift border-2 border-gold">
              <h4 className="text-lg font-bold mb-4">Silver Tier</h4>
              <div className="text-3xl font-bold text-gold mb-2">15%</div>
              <p className="text-gray-600 mb-4">Recurring commission</p>
              <div className="bg-gold/10 px-4 py-2 rounded-lg">
                <span className="font-semibold">10-49 active referrals</span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover-lift">
              <h4 className="text-lg font-bold mb-4">Gold Tier</h4>
              <div className="text-3xl font-bold text-gold mb-2">20%</div>
              <p className="text-gray-600 mb-4">Recurring commission</p>
              <div className="bg-gold/10 px-4 py-2 rounded-lg">
                <span className="font-semibold">50+ active referrals</span>
              </div>
            </div>
          </div>
        </div>

        {/* Program Details */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <h3 className="text-2xl font-bold mb-6">Program Benefits</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                <span>Custom affiliate dashboard with real-time tracking</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                <span>Complete marketing asset pack (banners, copy, etc.)</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                <span>Weekly payouts via PayPal or ACH</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                <span>No exclusivity required</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                <span>Dedicated affiliate support</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6">Requirements</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <i className="fas fa-circle text-gold mr-3 text-xs"></i>
                <span>Approval required for access</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-circle text-gold mr-3 text-xs"></i>
                <span>Active audience in sports betting/analytics</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-circle text-gold mr-3 text-xs"></i>
                <span>Compliance with our brand guidelines</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-circle text-gold mr-3 text-xs"></i>
                <span>No spammy or unethical marketing practices</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-charcoal text-white rounded-xl p-8 mb-12 text-center">
          <div className="text-4xl mb-4">"</div>
          <p className="text-xl mb-6">Easiest passive income in sports betting. Sharp Shot converts like crazy because the product actually works.</p>
          <div className="font-semibold">@BettingInfluencer</div>
          <div className="text-gray-300 text-sm">Sports Betting Content Creator</div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Start Earning?</h3>
          <p className="text-xl text-gray-600 mb-8">Join our affiliate program and start earning commissions today.</p>
          <Button className="bg-gold text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gold/90 transition-colors">
            Apply to Join the Program
          </Button>
        </div>
      </div>
    </section>
  );
}
