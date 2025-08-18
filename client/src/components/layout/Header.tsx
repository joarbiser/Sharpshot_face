import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, User, Settings, LogOut, Crown, Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useDemoMode } from "@/contexts/DemoModeContext";
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
  const { demoMode, toggleDemoMode } = useDemoMode();

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
      <nav className="sticky top-0 z-50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border-b border-[#D8AC35] shadow-sm hover:shadow-md transition-all duration-200">
        <div className="max-w-full mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-3 items-center h-18 md:h-18">
            
            {/* Left - Terminal Navigation */}
            <div className="flex items-center space-x-8 justify-start">
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/trading-terminal">
                  <button 
                    onClick={scrollToTop}
                    className={`relative text-gray-700 dark:text-gray-300 hover:text-[#D8AC35] dark:hover:text-[#D8AC35] font-bold transition-all duration-200 py-2 px-4 h-10 cursor-pointer text-base ${
                      location === '/trading-terminal' ? 'text-[#D8AC35]' : ''
                    }`}>
                    Trading Terminal
                    {location === '/trading-terminal' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D8AC35] rounded-full"></div>
                    )}
                  </button>
                </Link>
                {/* Disabled Preset Terminal - Coming Soon */}
                <div>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      return false;
                    }}
                    className="text-gray-400 dark:text-gray-600 font-bold py-2 px-4 h-10 cursor-not-allowed opacity-60 text-base"
                    disabled>
                    Preset Terminal (SOON)
                  </button>
                </div>
              </div>
            </div>

            {/* Center - Logo */}
            <div className="flex items-center justify-center">
              <Link href="/" onClick={scrollToTop} className="flex items-center space-x-3 cursor-pointer transition-all duration-200 group">
                <img 
                  src="/logo-gold.png" 
                  alt="Sharp Shot Logo" 
                  className="w-8 h-8 md:w-8 md:h-8 flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
                />
                <span className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white group-hover:text-[#D8AC35] dark:group-hover:text-[#D8AC35] group-hover:scale-110 flex-shrink-0 transition-all duration-200" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)', fontWeight: 'inherit' }} onMouseEnter={(e) => e.currentTarget.style.fontWeight = '900'} onMouseLeave={(e) => e.currentTarget.style.fontWeight = '800'}>Sharp Shot</span>
              </Link>
            </div>

            {/* Right - Navigation Links and CTAs */}
            <div className="flex items-center justify-end space-x-6">
              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center space-x-6">
                {/* Resources Dropdown */}
                <div className="relative group">
                  <button 
                    className={`relative text-gray-700 dark:text-gray-300 hover:text-[#D8AC35] dark:hover:text-[#D8AC35] font-bold transition-all duration-200 py-2 px-4 h-10 flex items-center focus:outline-none cursor-pointer text-base ${
                      resourcesItems.some(item => location === item.href) ? 'text-[#D8AC35]' : ''
                    }`}
                    aria-haspopup="true"
                    aria-expanded={isResourcesDropdownOpen}
                    onMouseEnter={() => setIsResourcesDropdownOpen(true)}
                    onMouseLeave={() => setIsResourcesDropdownOpen(false)}
                  >
                    Resources
                    {/* Active underline for Resources */}
                    {resourcesItems.some(item => location === item.href) && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D8AC35] rounded-full"></div>
                    )}
                    {/* Custom Chevron */}
                    <div className="ml-1 transition-all duration-200 ease-in-out">
                      <svg 
                        width="10" 
                        height="5" 
                        viewBox="0 0 10 5" 
                        className={`fill-none stroke-current stroke-2 transition-transform duration-200 ease-in-out ${
                          isResourcesDropdownOpen ? 'rotate-180' : ''
                        }`}
                        style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
                      >
                        <path d="M1 1l4 3 4-3" />
                      </svg>
                    </div>
                  </button>
                  <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 right-0 top-full pt-2 w-52 transition-all duration-200 ease-out transform group-hover:translate-y-0 translate-y-1 z-50"
                       onMouseEnter={() => setIsResourcesDropdownOpen(true)}
                       onMouseLeave={() => setIsResourcesDropdownOpen(false)}>
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-xl py-2">
                      {resourcesItems.map((item) => (
                        <Link key={item.name} href={item.href}>
                          <div 
                            onClick={scrollToTop}
                            className={`block px-4 py-2.5 text-sm md:text-base font-medium transition-colors cursor-pointer ${
                              location === item.href 
                                ? 'bg-[#D8AC35]/10 text-[#D8AC35] font-semibold' 
                                : 'text-gray-700 dark:text-gray-300 hover:bg-[#D8AC35]/10 hover:text-gray-900 dark:hover:text-white'
                            }`}>
                            {item.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Auth Links and CTAs */}
              <div className="flex items-center space-x-4">
                {user ? (
                  <>
                    {user.subscriptionStatus !== 'active' && (
                      <Link
                        href="/subscribe"
                        onClick={scrollToTop}
                        className="relative overflow-hidden bg-transparent border-2 border-[#D8AC35] text-[#D8AC35] hover:bg-[#D8AC35] hover:text-white px-5 py-2 rounded-full font-semibold transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-lg group text-base"
                      >
                        <span className="relative z-10">Unlock Free Access</span>
                        <div className="absolute inset-0 bg-[#D8AC35] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></div>
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
                        <DropdownMenuItem onClick={toggleDemoMode} className="flex items-center">
                          <Settings className="mr-2 h-4 w-4" />
                          {demoMode ? 'Disable' : 'Enable'} Demo Mode
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
                      className={`relative text-gray-700 dark:text-gray-300 hover:text-[#D8AC35] dark:hover:text-[#D8AC35] font-bold transition-all duration-200 py-2 px-4 h-10 flex items-center cursor-pointer text-base ${
                        location === '/login' ? 'text-[#D8AC35]' : ''
                      }`}
                    >
                      Sign In
                      {location === '/login' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D8AC35] rounded-full"></div>
                      )}
                    </Link>
                    <Link
                      href="/register"
                      onClick={scrollToTop}
                      className="relative overflow-hidden bg-transparent border-2 border-[#D8AC35] text-[#D8AC35] hover:bg-[#D8AC35] hover:text-white px-5 py-2 rounded-full font-semibold transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-lg group text-base"
                    >
                      <span className="relative z-10">Unlock Free Access</span>
                      <div className="absolute inset-0 bg-[#D8AC35] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></div>
                    </Link>
                  </>
                )}
                
                {/* Theme Toggle Button */}
                <div className="ml-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    className="h-9 w-9 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
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
        <div className="md:hidden absolute top-0 right-0 h-full flex items-center pr-4">
          <div className="flex items-center space-x-3">
              <div className="md:hidden flex items-center space-x-3">
                {!user && (
                  <Link href="/register">
                    <Button 
                      onClick={scrollToTop}
                      className="bg-[#D8AC35] text-gray-900 px-3 py-1.5 rounded-md shadow-sm hover:bg-[#c49429] transition-all duration-200 font-semibold text-sm">
                      Unlock Free Access
                    </Button>
                  </Link>
                )}
                
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-11 w-11 rounded-md">
                      <Menu className="h-5 w-5" />
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
        </div>
      </nav>
    </>
  );
}