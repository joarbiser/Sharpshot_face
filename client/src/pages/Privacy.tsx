export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-black dark:via-gray-900 dark:to-[#D8AC35]/10">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-20">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 text-gray-900 dark:text-white" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
            PRIVACY POLICY.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            We value your privacy. This policy explains how we collect, use, and protect your information when you use Sharp Shot.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-16">
          {/* Last Updated */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
              <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
              <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Updated</span>
            </div>
            <p className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
              LAST UPDATED: AUGUST 21, 2025
            </p>
          </div>

          {/* Information We Collect */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
              <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Collection</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-8 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
              INFORMATION WE COLLECT
            </h2>
            
            <div className="max-w-4xl mx-auto space-y-4 text-base leading-relaxed">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Account Information:</h3>
                <p className="text-gray-600 dark:text-gray-300">Name, email, and login details.</p>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Payment Information:</h3>
                <p className="text-gray-600 dark:text-gray-300">Billing details processed securely through third-party providers (we do not store card numbers).</p>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Usage Data:</h3>
                <p className="text-gray-600 dark:text-gray-300">Site activity, preferences, and log files.</p>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Cookies & Tracking:</h3>
                <p className="text-gray-600 dark:text-gray-300">Analytics and functional cookies to improve performance.</p>
              </div>
            </div>
          </div>

          {/* How We Use Information */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
              <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Usage</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-8 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
              HOW WE USE INFORMATION
            </h2>
            
            <ul className="max-w-4xl mx-auto space-y-3 text-base leading-relaxed text-gray-600 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35] mt-2 flex-shrink-0"></div>
                <span>Provide, maintain, and improve Sharp Shot.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35] mt-2 flex-shrink-0"></div>
                <span>Process payments and manage subscriptions.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35] mt-2 flex-shrink-0"></div>
                <span>Communicate with you about updates, support, and offers.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35] mt-2 flex-shrink-0"></div>
                <span>Monitor security, prevent fraud, and ensure compliance.</span>
              </li>
            </ul>
          </div>

          {/* Sharing of Information */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
              <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Sharing</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-8 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
              SHARING OF INFORMATION
            </h2>
            
            <div className="max-w-4xl mx-auto space-y-4 text-base leading-relaxed">
              <p className="text-gray-600 dark:text-gray-300 font-semibold">
                We do not sell your personal data. We may share information only with:
              </p>
              
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35] mt-2 flex-shrink-0"></div>
                  <span>Service Providers (hosting, payment, analytics).</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35] mt-2 flex-shrink-0"></div>
                  <span>Affiliates/Partners when you opt into their offers.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35] mt-2 flex-shrink-0"></div>
                  <span>Legal Authorities if required by law.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Data Security & Retention */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
              <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Security</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-8 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
              DATA SECURITY & RETENTION
            </h2>
            
            <p className="max-w-4xl mx-auto text-base leading-relaxed text-gray-600 dark:text-gray-300">
              We use industry-standard safeguards to protect your data. Information is kept only as long as needed for legitimate business or legal purposes.
            </p>
          </div>

          {/* Your Rights */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
              <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Rights</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-8 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
              YOUR RIGHTS
            </h2>
            
            <div className="max-w-4xl mx-auto space-y-4 text-base leading-relaxed">
              <p className="text-gray-600 dark:text-gray-300">
                Depending on your location, you may have the right to:
              </p>
              
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35] mt-2 flex-shrink-0"></div>
                  <span>Access, update, or delete your data.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35] mt-2 flex-shrink-0"></div>
                  <span>Opt out of marketing communications.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35] mt-2 flex-shrink-0"></div>
                  <span>Request a copy of your personal data.</span>
                </li>
              </ul>
              
              <p className="text-gray-600 dark:text-gray-300 font-semibold">
                You can exercise these rights by contacting us at <a href="mailto:support@sharpshotcalc.com" className="text-[#D8AC35] hover:underline">support@sharpshotcalc.com</a>.
              </p>
            </div>
          </div>

          {/* Children's Privacy */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
              <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Protection</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-8 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
              CHILDREN'S PRIVACY
            </h2>
            
            <p className="max-w-4xl mx-auto text-base leading-relaxed text-gray-600 dark:text-gray-300">
              Sharp Shot is not directed to individuals under the age of 18. We do not knowingly collect data from minors.
            </p>
          </div>

          {/* Changes to This Policy */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
              <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Updates</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-8 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
              CHANGES TO THIS POLICY
            </h2>
            
            <p className="max-w-4xl mx-auto text-base leading-relaxed text-gray-600 dark:text-gray-300">
              We may update this Privacy Policy from time to time. Updates will be posted here with a revised "last updated" date.
            </p>
          </div>

          {/* Contact Us */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
              <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Contact</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-8 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
              CONTACT US
            </h2>
            
            <div className="text-center">
              <p className="max-w-4xl mx-auto text-base leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
                If you have questions or concerns, contact us at:
              </p>
              
              <a 
                href="mailto:support@sharpshotcalc.com"
                className="inline-flex items-center px-6 py-3 rounded-full bg-[#D8AC35] text-white hover:bg-[#D8AC35]/90 transition-colors duration-200 font-semibold text-base"
              >
                support@sharpshotcalc.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}