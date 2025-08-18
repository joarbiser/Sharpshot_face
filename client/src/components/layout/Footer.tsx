import { Link } from "wouter";
import { Terminal, TrendingUp, Users, Shield, FileText, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative">
      {/* Gold divider line connecting to header */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
      
      <div className="bg-gradient-to-b from-background to-muted/20 border-t border-primary/20">
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Terminal-style brand lockup */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 pb-5 border-b border-border/30">
            <div className="flex items-center space-x-3 mb-3 lg:mb-0">
              <span className="text-primary font-mono text-sm">&gt;_</span>
              <Terminal className="w-5 h-5 text-primary" />
              <span className="text-xl font-bold uppercase tracking-wide text-foreground">
                Sharp Shot
              </span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground font-mono">
              <span className="text-primary/80">System optimized for betting intelligence</span>
            </div>
          </div>

          {/* Tighter grid layout like terminal window */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-7">
            {/* Product section - emphasized */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-[0.2em] text-foreground/80 font-semibold font-mono border-l-2 border-primary/40 pl-2">
                PRODUCT
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link 
                    href="/trading-terminal" 
                    className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-all duration-200 group"
                  >
                    <TrendingUp className="w-3.5 h-3.5 mr-2.5 opacity-60 group-hover:opacity-100 group-hover:text-primary transition-all" />
                    <span className="relative font-medium">
                      Trading Terminal
                      <span className="absolute inset-x-0 -bottom-px h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/preset-terminal" 
                    className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-all duration-200 group"
                  >
                    <Terminal className="w-3.5 h-3.5 mr-2.5 opacity-60 group-hover:opacity-100 group-hover:text-primary transition-all" />
                    <span className="relative font-medium">
                      Preset Terminal
                      <span className="absolute inset-x-0 -bottom-px h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/pricing" 
                    className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-all duration-200 group"
                  >
                    <Shield className="w-3.5 h-3.5 mr-2.5 opacity-60 group-hover:opacity-100 group-hover:text-primary transition-all" />
                    <span className="relative font-medium">
                      Pricing
                      <span className="absolute inset-x-0 -bottom-px h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources section - de-emphasized */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium font-mono">
                RESOURCES
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/tutorials" 
                    className="flex items-center text-sm text-muted-foreground/80 hover:text-muted-foreground transition-all duration-200 group"
                  >
                    <FileText className="w-3 h-3 mr-2 opacity-50 group-hover:opacity-70 transition-all" />
                    <span className="relative">
                      Tutorials
                      <span className="absolute inset-x-0 -bottom-px h-px bg-muted-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/glossary" 
                    className="flex items-center text-sm text-muted-foreground/80 hover:text-muted-foreground transition-all duration-200 group"
                  >
                    <FileText className="w-3 h-3 mr-2 opacity-50 group-hover:opacity-70 transition-all" />
                    <span className="relative">
                      Glossary
                      <span className="absolute inset-x-0 -bottom-px h-px bg-muted-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/faq" 
                    className="flex items-center text-sm text-muted-foreground/80 hover:text-muted-foreground transition-all duration-200 group"
                  >
                    <FileText className="w-3 h-3 mr-2 opacity-50 group-hover:opacity-70 transition-all" />
                    <span className="relative">
                      FAQ
                      <span className="absolute inset-x-0 -bottom-px h-px bg-muted-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company section - de-emphasized */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium font-mono">
                COMPANY
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/about" 
                    className="flex items-center text-sm text-muted-foreground/80 hover:text-muted-foreground transition-all duration-200 group"
                  >
                    <Users className="w-3 h-3 mr-2 opacity-50 group-hover:opacity-70 transition-all" />
                    <span className="relative">
                      About
                      <span className="absolute inset-x-0 -bottom-px h-px bg-muted-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/contact" 
                    className="flex items-center text-sm text-muted-foreground/80 hover:text-muted-foreground transition-all duration-200 group"
                  >
                    <Mail className="w-3 h-3 mr-2 opacity-50 group-hover:opacity-70 transition-all" />
                    <span className="relative">
                      Contact
                      <span className="absolute inset-x-0 -bottom-px h-px bg-muted-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/privacy" 
                    className="flex items-center text-sm text-muted-foreground/80 hover:text-muted-foreground transition-all duration-200 group"
                  >
                    <Shield className="w-3 h-3 mr-2 opacity-50 group-hover:opacity-70 transition-all" />
                    <span className="relative">
                      Privacy
                      <span className="absolute inset-x-0 -bottom-px h-px bg-muted-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Access section - emphasized */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-[0.2em] text-foreground/80 font-semibold font-mono border-l-2 border-primary/40 pl-2">
                ACCESS
              </h3>
              <div className="space-y-3">
                <Link 
                  href="/register"
                  className="inline-flex items-center px-4 py-2.5 text-sm border border-primary/30 rounded-md text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all duration-200 group relative overflow-hidden"
                >
                  <span className="relative z-10 font-medium uppercase tracking-wide">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                </Link>
                <Link 
                  href="/login"
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                >
                  <span className="relative">
                    Sign In
                    <span className="absolute inset-x-0 -bottom-px h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                  </span>
                  <span className="ml-1 transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Clean closing line in system-prompt style */}
          <div className="pt-5 border-t border-border/20">
            <div className="text-center">
              <p className="text-xs text-muted-foreground font-mono">
                <span className="text-primary mr-2">&copy;</span>
                2025 Sharp Shot 
                <span className="text-primary/60 mx-2">&rsaquo;</span>
                Built for sharp minds
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
