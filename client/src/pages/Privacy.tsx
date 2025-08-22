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
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Collection</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                INFORMATION WE COLLECT
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">Account Information:</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Name, email, and login details.</p>
              </div>
              
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">Payment Information:</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Billing details processed securely through third-party providers (we do not store card numbers).</p>
              </div>
              
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">Usage Data:</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Site activity, preferences, and log files.</p>
              </div>
              
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">Cookies & Tracking:</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Analytics and functional cookies to improve performance.</p>
              </div>
            </div>
          </div>

          {/* How We Use Information */}
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Usage</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                HOW WE USE INFORMATION
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35] mt-3 flex-shrink-0"></div>
                  <span className="text-gray-900 dark:text-white text-lg leading-relaxed">Provide, maintain, and improve Sharp Shot.</span>
                </div>
              </div>
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35] mt-3 flex-shrink-0"></div>
                  <span className="text-gray-900 dark:text-white text-lg leading-relaxed">Process payments and manage subscriptions.</span>
                </div>
              </div>
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35] mt-3 flex-shrink-0"></div>
                  <span className="text-gray-900 dark:text-white text-lg leading-relaxed">Communicate with you about updates, support, and offers.</span>
                </div>
              </div>
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35] mt-3 flex-shrink-0"></div>
                  <span className="text-gray-900 dark:text-white text-lg leading-relaxed">Monitor security, prevent fraud, and ensure compliance.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sharing of Information */}
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Sharing</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                SHARING OF INFORMATION
              </h2>
              <p className="text-gray-600 dark:text-gray-300 font-semibold mb-8">
                We do not sell your personal data. We may share information only with:
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35] mt-3 flex-shrink-0"></div>
                  <span className="text-gray-900 dark:text-white text-lg leading-relaxed">Service Providers (hosting, payment, analytics).</span>
                </div>
              </div>
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35] mt-3 flex-shrink-0"></div>
                  <span className="text-gray-900 dark:text-white text-lg leading-relaxed">Affiliates/Partners when you opt into their offers.</span>
                </div>
              </div>
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35] mt-3 flex-shrink-0"></div>
                  <span className="text-gray-900 dark:text-white text-lg leading-relaxed">Legal Authorities if required by law.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Data Security & Retention */}
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Security</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                DATA SECURITY & RETENTION
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <p className="text-lg leading-relaxed text-gray-900 dark:text-white">
                  We use industry-standard safeguards to protect your data. Information is kept only as long as needed for legitimate business or legal purposes.
                </p>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Rights</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                YOUR RIGHTS
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Depending on your location, you may have the right to:
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35] mt-3 flex-shrink-0"></div>
                  <span className="text-gray-900 dark:text-white text-lg leading-relaxed">Access, update, or delete your data.</span>
                </div>
              </div>
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35] mt-3 flex-shrink-0"></div>
                  <span className="text-gray-900 dark:text-white text-lg leading-relaxed">Opt out of marketing communications.</span>
                </div>
              </div>
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35] mt-3 flex-shrink-0"></div>
                  <span className="text-gray-900 dark:text-white text-lg leading-relaxed">Request a copy of your personal data.</span>
                </div>
              </div>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <p className="text-gray-900 dark:text-white text-lg leading-relaxed font-semibold text-center">
                  You can exercise these rights by contacting us at <a href="mailto:support@sharpshotcalc.com" className="text-[#D8AC35] hover:underline">support@sharpshotcalc.com</a>.
                </p>
              </div>
            </div>
          </div>

          {/* Children's Privacy */}
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Protection</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                CHILDREN'S PRIVACY
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <p className="text-lg leading-relaxed text-gray-900 dark:text-white">
                  Sharp Shot is not directed to individuals under the age of 18. We do not knowingly collect data from minors.
                </p>
              </div>
            </div>
          </div>

          {/* Changes to This Policy */}
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Updates</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                CHANGES TO THIS POLICY
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <p className="text-lg leading-relaxed text-gray-900 dark:text-white">
                  We may update this Privacy Policy from time to time. Updates will be posted here with a revised "last updated" date.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Us */}
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Contact</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                CONTACT US
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <div className="text-center">
                  <p className="text-lg leading-relaxed text-gray-900 dark:text-white mb-6">
                    For questions about these Terms, please visit our Support Page:
                  </p>
                  
                  <a 
                    href="/support"
                    className="inline-flex items-center px-8 py-4 rounded-full bg-[#D8AC35] text-white hover:bg-[#D8AC35]/90 transition-colors duration-200 font-semibold text-lg"
                  >
                    Visit Support Page
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}