import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, User, Settings, LogOut, Crown, Moon, Sun, LockOpen } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

import { scrollToTop } from "@/utils/scrollToTop";

const resourcesItems = [
  { name: "Memberships", href: "/pricing" },
  { name: "Scores", href: "/scores" },
  { name: "Tutorials", href: "/tutorials" },
  { name: "FAQ", href: "/faq" },
  { name: "Glossary", href: "/glossary" },
  { name: "Patch Notes", href: "/patch-notes" },
  { name: "Support", href: "/support" },
];

export default function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { theme, toggleTheme } = useTheme();


  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("/api/auth/me", {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: 'include'
      });
      
      if (response.ok) {
        setUser(null);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-[#D8AC35] transition-colors duration-200">
        <div className="max-w-full mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-10 md:h-10">
            
            {/* Left - Terminal Navigation */}
            <div className="flex items-center justify-start flex-1">
              <div className="hidden lg:flex items-center space-x-3">
                <Link href="/trading-terminal">
                  <button 
                    onClick={scrollToTop}
                    className={`relative flex items-center uppercase tracking-widest text-xs font-semibold transition-all duration-250 ease-in-out py-3 px-3 h-12 cursor-pointer group ${
                      location === '/trading-terminal' ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                    }`}
                    aria-current={location === '/trading-terminal' ? 'page' : undefined}>
                    <span className={`inline-block rounded-full mr-2 transition-all duration-250 ease-in-out ${
                      location === '/trading-terminal' 
                        ? 'h-1.5 w-1.5 bg-[#D8AC35] opacity-100 scale-100' 
                        : 'h-1 w-1 bg-[#D8AC35] opacity-0 scale-0 group-hover:opacity-50 group-hover:scale-100'
                    }`}></span>
                    TRADING TERMINAL
                  </button>
                </Link>
                
                {/* Vertical Divider */}
                <div className="w-px h-5 bg-gray-300 dark:bg-white/10 mx-3"></div>
                
                {/* Disabled Preset Terminal - Coming Soon */}
                <div>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      return false;
                    }}
                    className="uppercase tracking-widest text-xs font-semibold text-gray-400 dark:text-white/30 py-3 px-3 h-12 cursor-not-allowed"
                    disabled>
                    PRESET TERMINAL
                    <span className="text-[10px] ml-1">(SOON)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Center - Logo */}
            <div className="flex items-center justify-center flex-shrink-0">
              <Link href="/" onClick={scrollToTop} className={`flex items-center space-x-2 cursor-pointer py-2 px-4 transition-all duration-150 ease-out group ${location !== '/' ? 'hover:scale-x-95' : ''}`} style={{ width: 'max-content', transformOrigin: 'center' }}>
                <img 
                  src="/logo-gold.png" 
                  alt="Sharp Shot Logo" 
                  className="w-7 h-7 md:w-8 md:h-8 flex-shrink-0"
                />
                <span 
                  className={`logo-text text-xl md:text-2xl font-black flex-shrink-0 uppercase tracking-wide whitespace-nowrap cursor-pointer overflow-visible pr-2 transition-all duration-150 ease-out ${location !== '/' ? 'group-hover:tracking-tighter' : ''}`} 
                  style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)', minWidth: 'max-content', width: 'max-content' }}
                >
                  SHARP SHOT
                </span>
              </Link>
            </div>

            {/* Right - Navigation Links and CTAs */}
            <div className="flex items-center justify-end space-x-3 flex-1">
              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex items-center space-x-3">
                {/* Resources Dropdown */}
                <div className="relative group">
                  <button 
                    className={`relative flex items-center uppercase tracking-widest text-xs font-semibold transition-all duration-250 ease-in-out py-3 px-3 h-12 focus:outline-none cursor-pointer group ${
                      resourcesItems.some(item => location === item.href) ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                    }`}
                    aria-haspopup="true"
                    aria-expanded={isResourcesDropdownOpen}
                    onMouseEnter={() => setIsResourcesDropdownOpen(true)}
                    onMouseLeave={() => setIsResourcesDropdownOpen(false)}
                  >
                    <span className={`inline-block rounded-full mr-2 transition-all duration-250 ease-in-out ${
                      resourcesItems.some(item => location === item.href)
                        ? 'h-1.5 w-1.5 bg-[#D8AC35] opacity-100 scale-100' 
                        : 'h-1 w-1 bg-[#D8AC35] opacity-0 scale-0 group-hover:opacity-50 group-hover:scale-100 group-hover:shadow-[0_0_4px_#D8AC35]'
                    }`}></span>
                    RESOURCES
                  </button>
                  <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 right-0 top-full pt-2 w-48 transition-all duration-200 ease-out transform group-hover:translate-y-0 translate-y-1 z-50"
                       onMouseEnter={() => setIsResourcesDropdownOpen(true)}
                       onMouseLeave={() => setIsResourcesDropdownOpen(false)}>
                    <div className="bg-white/95 dark:bg-black/90 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-lg shadow-xl py-2">
                      {resourcesItems.map((item) => (
                        <Link key={item.name} href={item.href}>
                          <div 
                            onClick={scrollToTop}
                            className={`flex items-center px-4 py-2.5 text-xs uppercase tracking-wide font-semibold transition-colors cursor-pointer ${
                              location === item.href 
                                ? 'bg-[#D8AC35]/20 text-gray-900 dark:text-white' 
                                : 'text-gray-600 dark:text-white/65 hover:bg-gray-100 dark:hover:bg-white/5'
                            }`}>
                            <span className={`inline-block rounded-full mr-2 transition-all duration-250 ease-in-out ${
                              location === item.href
                                ? 'h-1 w-1 bg-[#D8AC35] opacity-100 scale-100' 
                                : 'h-0.5 w-0.5 bg-[#D8AC35] opacity-0 scale-0'
                            }`}></span>
                            {item.name.toUpperCase()}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                
                {/* Vertical Divider */}
                <div className="w-px h-5 bg-gray-300 dark:bg-white/10 mx-3"></div>
              </div>
              
              {/* Auth Links and CTAs */}
              <div className="flex items-center space-x-3">
                {user ? (
                  <>
                    {user.subscriptionStatus !== 'active' && (
                      <Link
                        href="/subscribe"
                        onClick={scrollToTop}
                        className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#D8AC35] text-[#D8AC35] transition-all duration-200 group overflow-hidden hover:shadow-[0_0_14px_rgba(216,172,53,0.25)] focus:ring-2 focus:ring-[#D8AC35]/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
                        aria-label="Access Sharp Shot Beta"
                      >
                        <LockOpen size={16} strokeWidth={2} />
                        <span className="relative z-10 uppercase tracking-widest text-xs font-semibold">ACCESS BETA</span>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D8AC35]/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                        </div>
                      </Link>
                    )}
                  
                    {/* User Profile Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center space-x-2 focus:outline-none">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.profilePhoto || ""} alt={user.username || user.email} />
                          <AvatarFallback className="bg-[#D8AC35] text-black text-sm font-semibold">
                            {(user.username || user.email || "U").charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <div className="flex items-center space-x-2 p-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.profilePhoto || ""} alt={user.username || user.email} />
                            <AvatarFallback className="bg-[#D8AC35] text-black text-sm font-semibold">
                              {(user.username || user.email || "U").charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium">{user.username || user.email}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                            {user.subscriptionStatus === 'active' && (
                              <div className="flex items-center">
                                <Crown className="h-3 w-3 text-[#D8AC35] mr-1" />
                                <span className="text-xs text-[#D8AC35] font-medium">
                                  {user.subscriptionPlan} Plan
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/account" className="flex items-center">
                            <User className="mr-2 h-4 w-4" />
                            Account
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={scrollToTop}
                      className={`relative flex items-center uppercase tracking-widest text-xs font-semibold transition-all duration-250 ease-in-out py-3 px-3 h-12 cursor-pointer group ${
                        location === '/login' ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                      }`}
                      aria-current={location === '/login' ? 'page' : undefined}
                    >
                      <span className={`inline-block rounded-full mr-2 transition-all duration-250 ease-in-out ${
                        location === '/login'
                          ? 'h-1.5 w-1.5 bg-[#D8AC35] opacity-100 scale-100' 
                          : 'h-1 w-1 bg-[#D8AC35] opacity-0 scale-0 group-hover:opacity-50 group-hover:scale-100 group-hover:shadow-[0_0_4px_#D8AC35]'
                      }`}></span>
                      SIGN IN
                    </Link>
                    
                    <Link
                      href="/register"
                      onClick={scrollToTop}
                      className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#D8AC35] text-[#D8AC35] transition-all duration-200 group overflow-hidden hover:shadow-[0_0_14px_rgba(216,172,53,0.25)] focus:ring-2 focus:ring-[#D8AC35]/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
                      aria-label="Access Sharp Shot Beta"
                    >
                      <LockOpen size={16} strokeWidth={2} />
                      <span className="relative z-10 uppercase tracking-widest text-xs font-semibold">ACCESS BETA</span>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D8AC35]/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                      </div>
                    </Link>
                  </>
                )}
                
                {/* Theme Toggle Button */}
                <div className="ml-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    className="h-12 w-12 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                    aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                  >
                    {theme === 'light' ? (
                      <Moon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                    ) : (
                      <Sun className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="lg:hidden absolute top-0 right-0 h-full flex items-center pr-4">
          <div className="flex items-center space-x-3">
            {!user && (
              <Link href="/register">
                <Button 
                  onClick={scrollToTop}
                  className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#D8AC35] text-[#D8AC35] transition-all duration-200 group overflow-hidden hover:shadow-[0_0_14px_rgba(216,172,53,0.25)] text-xs"
                  aria-label="Access Sharp Shot Beta"
                >
                  <LockOpen size={12} strokeWidth={2} />
                  <span className="relative z-10 uppercase tracking-wide font-semibold">BETA</span>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D8AC35]/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                  </div>
                </Button>
              </Link>
            )}
            
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200" aria-expanded={isOpen} aria-controls="mobile-menu">
                  <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </Button>
              </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                    <div className="flex flex-col space-y-6 mt-8">
                      {/* Mobile Product Navigation */}
                      <div className="space-y-4">
                        <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Product</div>
                        <Link
                          href="/trading-terminal"
                          className={`block py-3 px-4 rounded-lg transition-colors min-h-[44px] ${
                            location === '/trading-terminal'
                              ? 'bg-[#D8AC35] text-gray-900'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                          onClick={() => {
                            scrollToTop();
                            setIsOpen(false);
                          }}
                        >
                          <div className="font-semibold text-sm">Trading Terminal</div>
                          <div className="text-xs opacity-75 mt-1">Live betting opportunities</div>
                        </Link>
                        <Link
                          href="/preset-terminal"
                          className={`block py-3 px-4 rounded-lg transition-colors min-h-[44px] ${
                            location === '/preset-terminal'
                              ? 'bg-[#D8AC35] text-gray-900'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                          onClick={() => {
                            scrollToTop();
                            setIsOpen(false);
                          }}
                        >
                          <div className="font-semibold text-sm">Preset Terminal</div>
                          <div className="text-xs opacity-75 mt-1">Strategy management</div>
                        </Link>
                      </div>
                      
                      {/* Navigation Links */}
                      <div className="space-y-4">
                        <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Navigation</div>
                        <Link
                          href="/pricing"
                          className={`block py-3 px-4 rounded-lg transition-colors min-h-[44px] ${
                            location === '/pricing'
                              ? 'bg-[#D8AC35] text-gray-900'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="font-semibold text-sm">Pricing</div>
                        </Link>
                        
                        {/* Resources Submenu */}
                        <div className="space-y-2">
                          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-4">Resources</div>
                          {resourcesItems.map((item) => (
                            <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
                              <div className="block py-2.5 px-4 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors min-h-[44px] flex items-center text-sm">
                                {item.name}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                      
                      {/* Mobile User Section */}
                      <div className="pt-4 space-y-3">
                        {user ? (
                          <>
                            {/* Mobile User Profile */}
                            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={user.profilePhoto || ""} alt={user.username || user.email} />
                                <AvatarFallback className="bg-[#D8AC35] text-gray-900 font-semibold">
                                  {(user.username || user.email || "U").charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <p className="text-sm font-medium">{user.username || user.email}</p>
                                <p className="text-xs text-muted-foreground">{user.email}</p>
                                {user.subscriptionStatus === 'active' && (
                                  <div className="flex items-center mt-1">
                                    <Crown className="h-3 w-3 text-[#D8AC35] mr-1" />
                                    <span className="text-xs text-[#D8AC35] font-medium">
                                      {user.subscriptionPlan} Plan
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <Link href="/account" onClick={() => setIsOpen(false)}>
                              <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-100">
                                <User className="mr-2 h-4 w-4" />
                                Account
                              </Button>
                            </Link>
                            
                            {user.subscriptionStatus !== 'active' && (
                              <Link href="/subscribe" onClick={() => setIsOpen(false)}>
                                <Button className="w-full bg-[#D8AC35] text-gray-900 hover:bg-[#c49429] font-semibold">
                                  Get Started Free
                                </Button>
                              </Link>
                            )}
                            
                            <Button 
                              variant="outline" 
                              onClick={() => {
                                handleLogout();
                                setIsOpen(false);
                              }}
                              className="w-full border-red-200 text-red-600 hover:bg-red-50"
                            >
                              <LogOut className="mr-2 h-4 w-4" />
                              Logout
                            </Button>
                          </>
                        ) : (
                          <>
                            <Link href="/login" onClick={() => setIsOpen(false)}>
                              <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:border-[#D8AC35] hover:text-[#D8AC35] text-sm">
                                Sign In
                              </Button>
                            </Link>
                            <Link href="/register" onClick={() => setIsOpen(false)}>
                              <Button className="w-full bg-[#D8AC35] text-gray-900 hover:bg-[#c49429] font-semibold text-sm">
                                Unlock Free Access
                              </Button>
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
}