import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <img 
                src="/logo-white.png" 
                alt="Sharp Shot Logo" 
                className="w-8 h-8"
              />
              <span className="text-xl font-bold">Sharp Shot</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              The professional sports betting analytics platform built by sharps, for sharps.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gold transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-bold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/product" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/presets" className="hover:text-white transition-colors">Presets</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/learn" className="hover:text-white transition-colors">Learn</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/affiliate" className="hover:text-white transition-colors">Affiliate</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms & Privacy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Sharp Shot. All rights reserved. It's not luck. It's Leverage.</p>
        </div>
      </div>
    </footer>
  );
}
