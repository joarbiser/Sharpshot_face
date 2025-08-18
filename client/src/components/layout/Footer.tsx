import { Link } from "wouter";
import { Terminal, TrendingUp, Users, CreditCard, FileText, Mail, Lock, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative">
      {/* Thin top separator */}
      <div className="h-px bg-border/60"></div>
      
      {/* Subtle panel background */}
      <div className="bg-muted/30 border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Brand area - minimal and professional */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 pb-4">
            <div className="flex items-center mb-2 lg:mb-0">
              <div className="text-xl font-bold uppercase tracking-wider text-foreground">
                SHARP SHOT
              </div>
            </div>
            <div className="text-sm text-muted-foreground/80">
              System optimized for betting intelligence
            </div>
          </div>

          {/* Four-column grid with tight spacing */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
            {/* Product section */}
            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-3">
                PRODUCT
              </h3>
              <ul className="space-y-1.5">
                <li>
                  <Link 
                    href="/trading-terminal" 
                    className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-all duration-200 group"
                  >
                    <TrendingUp className="w-3 h-3 mr-2 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span className="relative">
                      Trading Terminal
                      <span className="absolute inset-x-0 -bottom-px h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/preset-terminal" 
                    className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-all duration-200 group"
                  >
                    <Terminal className="w-3 h-3 mr-2 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span className="relative">
                      Preset Terminal
                      <span className="absolute inset-x-0 -bottom-px h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/pricing" 
                    className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-all duration-200 group"
                  >
                    <CreditCard className="w-3 h-3 mr-2 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span className="relative">
                      Pricing
                      <span className="absolute inset-x-0 -bottom-px h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources section */}
            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-3">
                RESOURCES
              </h3>
              <ul className="space-y-1.5">
                <li>
                  <Link 
                    href="/tutorials" 
                    className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-all duration-200 group"
                  >
                    <FileText className="w-3 h-3 mr-2 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span className="relative">
                      Tutorials
                      <span className="absolute inset-x-0 -bottom-px h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/glossary" 
                    className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-all duration-200 group"
                  >
                    <FileText className="w-3 h-3 mr-2 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span className="relative">
                      Glossary
                      <span className="absolute inset-x-0 -bottom-px h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/faq" 
                    className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-all duration-200 group"
                  >
                    <FileText className="w-3 h-3 mr-2 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span className="relative">
                      FAQ
                      <span className="absolute inset-x-0 -bottom-px h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social section */}
            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-3">
                SOCIAL
              </h3>
              <ul className="space-y-1.5">
                <li>
                  <a 
                    href="https://x.com/sharpshot" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-all duration-200 group"
                  >
                    <Twitter className="w-3 h-3 mr-2 opacity-60 group-hover:opacity-100 group-hover:drop-shadow-sm transition-all" />
                    <span className="relative">
                      X
                      <span className="absolute inset-x-0 -bottom-px h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://instagram.com/sharpshot" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-all duration-200 group"
                  >
                    <Instagram className="w-3 h-3 mr-2 opacity-60 group-hover:opacity-100 group-hover:drop-shadow-sm transition-all" />
                    <span className="relative">
                      Instagram
                      <span className="absolute inset-x-0 -bottom-px h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://youtube.com/sharpshot" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-all duration-200 group"
                  >
                    <Youtube className="w-3 h-3 mr-2 opacity-60 group-hover:opacity-100 group-hover:drop-shadow-sm transition-all" />
                    <span className="relative">
                      YouTube
                      <span className="absolute inset-x-0 -bottom-px h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Access section */}
            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-3">
                ACCESS
              </h3>
              <div className="space-y-2">
                <Link 
                  href="/register"
                  className="inline-flex items-center px-3 py-1.5 text-sm border border-muted-foreground/30 text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-200 group relative overflow-hidden"
                >
                  <span className="relative z-10 font-medium uppercase tracking-wide text-xs">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-300"></div>
                </Link>
                <Link 
                  href="/login"
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                >
                  <span className="relative">
                    Sign In
                    <span className="absolute inset-x-0 -bottom-px h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Simple bottom line */}
          <div className="pt-4 border-t border-border/30">
            <p className="text-xs text-muted-foreground/70">
              © 2025 Sharp Shot. Built for sharp minds.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
