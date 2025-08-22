import { Link } from "wouter";
import { Terminal, TrendingUp, Users, CreditCard, FileText, Mail, Lock } from 'lucide-react';
import { FaInstagram, FaFacebook, FaTiktok, FaYoutube, FaDiscord } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="relative">
      {/* Gold divider line connecting to header */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
      
      <div className="bg-white dark:bg-gray-900 border-t border-primary/20">
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Clean brand lockup */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 pb-5 border-b border-border/30">
            <div className="flex items-center mb-3 lg:mb-0">
              <div style={{ fontSize: '1rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'inherit' }}>
                SHARP SHOT
              </div>
            </div>
            <div className="flex items-center text-sm text-muted-foreground font-mono">
              <span className="text-primary/80">SYSTEM OPTIMIZED FOR BETTING INTELLIGENCE</span>
            </div>
          </div>

          {/* Tighter grid layout like terminal window */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_1.5fr] gap-8 mb-7 items-start">
            {/* Access section - emphasized */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-[0.2em] text-foreground/80 font-semibold font-mono border-l-2 border-primary/40 pl-2">
                ACCESS
              </h3>
              <div className="space-y-3">
                <Link 
                  href="/pricing"
                  className="inline-flex items-center px-4 py-2.5 text-sm border border-primary/30 rounded-md text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all duration-200 group relative overflow-hidden"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <span className="relative z-10 font-medium uppercase tracking-wide">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                </Link>
                <Link 
                  href="/login"
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <span className="relative">
                    Sign In
                    <span className="absolute inset-x-0 -bottom-px h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                  </span>
                </Link>
              </div>
            </div>

            {/* Product section - emphasized */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-[0.2em] text-foreground/80 font-semibold font-mono border-l-2 border-primary/40 pl-2">
                PRODUCT
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/trading-terminal" 
                    className="flex items-center text-sm text-gray-600 dark:text-white hover:text-gray-900 dark:hover:text-white transition-all duration-200 group"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <TrendingUp className="w-3 h-3 mr-2 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-all" />
                    <span className="relative">
                      Trading Terminal
                      <span className="absolute inset-x-0 -bottom-px h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/preset-terminal" 
                    className="flex items-center text-sm text-gray-600 dark:text-white hover:text-gray-900 dark:hover:text-white transition-all duration-200 group"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <Terminal className="w-3 h-3 mr-2 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-all" />
                    <span className="relative">
                      Preset Terminal
                      <span className="absolute inset-x-0 -bottom-px h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/pricing" 
                    className="flex items-center text-sm text-gray-600 dark:text-white hover:text-gray-900 dark:hover:text-white transition-all duration-200 group"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <CreditCard className="w-3 h-3 mr-2 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-all" />
                    <span className="relative">
                      Pricing
                      <span className="absolute inset-x-0 -bottom-px h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources section - de-emphasized */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-[0.2em] text-foreground/80 font-semibold font-mono border-l-2 border-primary/40 pl-2">
                RESOURCES
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/tutorials" 
                    className="flex items-center text-sm text-gray-600 dark:text-white hover:text-gray-900 dark:hover:text-white transition-all duration-200 group"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <FileText className="w-3 h-3 mr-2 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-all" />
                    <span className="relative">
                      Tutorials
                      <span className="absolute inset-x-0 -bottom-px h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/faq" 
                    className="flex items-center text-sm text-gray-600 dark:text-white hover:text-gray-900 dark:hover:text-white transition-all duration-200 group"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <FileText className="w-3 h-3 mr-2 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-all" />
                    <span className="relative">
                      FAQ
                      <span className="absolute inset-x-0 -bottom-px h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/glossary" 
                    className="flex items-center text-sm text-gray-600 dark:text-white hover:text-gray-900 dark:hover:text-white transition-all duration-200 group"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <FileText className="w-3 h-3 mr-2 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-all" />
                    <span className="relative">
                      Glossary
                      <span className="absolute inset-x-0 -bottom-px h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </Link>
                </li>

              </ul>
            </div>

            {/* Company section - de-emphasized */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-[0.2em] text-foreground/80 font-semibold font-mono border-l-2 border-primary/40 pl-2">
                COMPANY
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/about" 
                    className="flex items-center text-sm text-gray-600 dark:text-white hover:text-gray-900 dark:hover:text-white transition-all duration-200 group"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <Users className="w-3 h-3 mr-2 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-all" />
                    <span className="relative">
                      About
                      <span className="absolute inset-x-0 -bottom-px h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/support" 
                    className="flex items-center text-sm text-gray-600 dark:text-white hover:text-gray-900 dark:hover:text-white transition-all duration-200 group"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <Mail className="w-3 h-3 mr-2 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-all" />
                    <span className="relative">
                      Contact
                      <span className="absolute inset-x-0 -bottom-px h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/privacy" 
                    className="flex items-center text-sm text-gray-600 dark:text-white hover:text-gray-900 dark:hover:text-white transition-all duration-200 group"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <Lock className="w-3 h-3 mr-2 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-all" />
                    <span className="relative">
                      Privacy
                      <span className="absolute inset-x-0 -bottom-px h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Socials section */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-[0.2em] text-foreground/80 font-semibold font-mono border-l-2 border-primary/40 pl-2">
                SOCIALS
              </h3>
              <div className="grid grid-cols-2 gap-x-4">
                <div className="space-y-2">
                  <a 
                    href="https://twitter.com/sharpshotcalc" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-gray-600 dark:text-white hover:text-gray-900 dark:hover:text-white transition-all duration-200 group"
                  >
                    <FaXTwitter className="w-3 h-3 mr-2 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-all" />
                    <span className="relative">
                      X
                      <span className="absolute inset-x-0 -bottom-px h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </a>
                  <a 
                    href="https://instagram.com/sharpshotcalc" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-gray-600 dark:text-white hover:text-gray-900 dark:hover:text-white transition-all duration-200 group"
                  >
                    <FaInstagram className="w-3 h-3 mr-2 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-all" />
                    <span className="relative">
                      Instagram
                      <span className="absolute inset-x-0 -bottom-px h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </a>
                  <a 
                    href="https://facebook.com/sharpshotcalc" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-gray-600 dark:text-white hover:text-gray-900 dark:hover:text-white transition-all duration-200 group"
                  >
                    <FaFacebook className="w-3 h-3 mr-2 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-all" />
                    <span className="relative">
                      Facebook
                      <span className="absolute inset-x-0 -bottom-px h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </a>
                </div>
                <div className="space-y-2">
                  <a 
                    href="https://www.tiktok.com/@sharpshotcalc?is_from_webapp=1&sender_device=pc" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-gray-600 dark:text-white hover:text-gray-900 dark:hover:text-white transition-all duration-200 group"
                  >
                    <FaTiktok className="w-3 h-3 mr-2 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-all" />
                    <span className="relative">
                      TikTok
                      <span className="absolute inset-x-0 -bottom-px h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </a>
                  <span className="flex items-center text-sm text-gray-400 dark:text-gray-500 cursor-not-allowed">
                    <FaYoutube className="w-3 h-3 mr-2 text-gray-400" />
                    <span className="relative">
                      YouTube
                      <span className="ml-1 text-xs text-gray-400 dark:text-gray-500 font-mono">(SOON)</span>
                    </span>
                  </span>
                  <span className="flex items-center text-sm text-gray-400 dark:text-gray-500 cursor-not-allowed">
                    <FaDiscord className="w-3 h-3 mr-2 text-gray-400" />
                    <span className="relative">
                      Discord
                      <span className="ml-1 text-xs text-gray-400 dark:text-gray-500 font-mono">(SOON)</span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Clean closing line in system-prompt style */}
          <div className="pt-5 border-t border-border/20">
            <div className="text-center">
              <p style={{ fontSize: '4px' }} className="text-muted-foreground font-mono">
                <span className="text-primary mr-2">&copy;</span>
                2025 SHARP SHOT BUILT FOR SHARP MINDS
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
