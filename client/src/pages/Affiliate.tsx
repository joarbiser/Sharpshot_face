import { Button } from "@/components/ui/button";

export default function Affiliate() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl tungsten-style mb-6">Profit Together. <span className="text-gold">Grow Sharper.</span></h1>
          <p className="text-xl text-gray-600">Earn by referring sharps, creators, and serious bettors.</p>
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

        {/* Commission Structure */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Commission Structure</h2>
          
          {/* Initial Commission */}
          <div className="bg-gold/10 rounded-xl p-8 mb-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Initial Commission</h3>
            <div className="text-6xl font-bold text-gold mb-4">50%</div>
            <p className="text-lg text-gray-700">Commission on each user's first monthly payment</p>
          </div>

          {/* Recurring Commission Tiers */}
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
            Apply Now
          </Button>
        </div>
      </div>
    </section>
  );
}
