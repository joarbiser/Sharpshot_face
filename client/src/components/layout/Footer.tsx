import { Link } from "wouter";
import { Terminal, TrendingUp, Users, Shield, FileText, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative">
      {/* Minimal separator line - system prompt style */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      
      <div className="bg-background/95 backdrop-blur-sm border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Top row: Brand lockup and tagline */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 pb-6 border-b border-border/30">
            <div className="flex items-center space-x-2 mb-4 lg:mb-0">
              <Terminal className="w-6 h-6 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Sharp Shot
              </span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <span className="text-primary mr-2">&gt;</span>
              <span>System optimized for betting intelligence</span>
            </div>
          </div>

          {/* Link grid with system-style labels */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Product section */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                PRODUCT
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/trading-terminal" 
                    className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                  >
                    <TrendingUp className="w-4 h-4 mr-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="relative">
                      Trading Terminal
                      <span className="absolute inset-x-0 -bottom-px h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/preset-terminal" 
                    className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                  >
                    <Terminal className="w-4 h-4 mr-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="relative">
                      Preset Terminal
                      <span className="absolute inset-x-0 -bottom-px h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/pricing" 
                    className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                  >
                    <Shield className="w-4 h-4 mr-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="relative">
                      Pricing
                      <span className="absolute inset-x-0 -bottom-px h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources section */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                RESOURCES
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/tutorials" 
                    className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                  >
                    <FileText className="w-4 h-4 mr-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="relative">
                      Tutorials
                      <span className="absolute inset-x-0 -bottom-px h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/glossary" 
                    className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                  >
                    <FileText className="w-4 h-4 mr-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="relative">
                      Glossary
                      <span className="absolute inset-x-0 -bottom-px h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/faq" 
                    className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                  >
                    <FileText className="w-4 h-4 mr-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="relative">
                      FAQ
                      <span className="absolute inset-x-0 -bottom-px h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company section */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                COMPANY
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/about" 
                    className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                  >
                    <Users className="w-4 h-4 mr-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="relative">
                      About
                      <span className="absolute inset-x-0 -bottom-px h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/contact" 
                    className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                  >
                    <Mail className="w-4 h-4 mr-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="relative">
                      Contact
                      <span className="absolute inset-x-0 -bottom-px h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/privacy" 
                    className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                  >
                    <Shield className="w-4 h-4 mr-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="relative">
                      Privacy
                      <span className="absolute inset-x-0 -bottom-px h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* CTA section with ghost button style */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                ACCESS
              </h3>
              <div className="space-y-3">
                <Link 
                  href="/register"
                  className="inline-flex items-center px-4 py-2 text-sm border border-border/50 rounded-md text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-200 group"
                >
                  <span className="relative overflow-hidden">
                    <span className="block transition-transform duration-200 group-hover:-translate-y-full">
                      Get Started
                    </span>
                    <span className="absolute inset-0 transition-transform duration-200 translate-y-full group-hover:translate-y-0 text-primary">
                      Get Started
                    </span>
                  </span>
                </Link>
                <Link 
                  href="/login"
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Sign In &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Legal line - quiet and minimal */}
          <div className="pt-6 border-t border-border/30">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between text-xs text-muted-foreground">
              <p>© 2025 Sharp Shot. System built for betting intelligence.</p>
              <div className="flex items-center mt-2 md:mt-0">
                <span className="text-primary mr-2">&#36;</span>
                <span>Advanced analytics for sharp minds</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
