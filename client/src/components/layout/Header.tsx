import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, User, Settings, LogOut, Crown, Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useDemoMode } from "@/contexts/DemoModeContext";

const resourcesItems = [
  { name: "Tutorials", href: "/tutorials" },
  { name: "FAQ", href: "/faq" },
  { name: "Sports", href: "/sports" },
  { name: "Achievements", href: "/achievements" },
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
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-[#D8AC35] shadow-sm hover:shadow-md transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-16">
            {/* Left - Logo and Terminal Navigation */}
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-3 cursor-pointer p-2 -m-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <img 
                  src="/logo-gold.png" 
                  alt="Sharp Shot Logo" 
                  className="w-7 h-7 md:w-7 md:h-7 flex-shrink-0"
                />
                <span className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white flex-shrink-0" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>Sharp Shot</span>
              </Link>

              {/* Terminal Navigation - Desktop Only */}
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/trading-terminal">
                  <button className={`text-gray-700 dark:text-gray-300 hover:text-[#D8AC35] font-medium transition-all duration-200 py-2 border-b border-transparent hover:border-[#D8AC35] cursor-pointer ${
                    location === '/trading-terminal' ? 'border-[#D8AC35] text-[#D8AC35]' : ''
                  }`}>
                    Trading Terminal
                  </button>
                </Link>
                <Link href="/preset-terminal">
                  <button className={`text-gray-700 dark:text-gray-300 hover:text-[#D8AC35] font-medium transition-all duration-200 py-2 border-b border-transparent hover:border-[#D8AC35] cursor-pointer ${
                    location === '/preset-terminal' ? 'border-[#D8AC35] text-[#D8AC35]' : ''
                  }`}>
                    Preset Terminal
                  </button>
                </Link>
              </div>
            </div>

            {/* Right - Navigation Links and CTAs */}
            <div className="flex items-center space-x-8">
              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
                {/* Pricing Link */}
                <Link
                  href="/pricing"
                  className={`text-gray-700 dark:text-gray-300 hover:text-[#D8AC35] font-medium transition-all duration-200 py-2 border-b border-transparent hover:border-[#D8AC35] cursor-pointer ${
                    location === '/pricing' ? 'border-[#D8AC35] text-[#D8AC35]' : ''
                  }`}
                >
                  Pricing
                </Link>

                {/* Resources Dropdown */}
                <div className="relative group">
                  <button 
                    className="relative text-gray-700 dark:text-gray-300 hover:text-[#D8AC35] font-medium transition-all duration-200 py-2 focus:outline-none cursor-pointer"
                    aria-haspopup="true"
                    aria-expanded={isResourcesDropdownOpen}
                    onMouseEnter={() => setIsResourcesDropdownOpen(true)}
                    onMouseLeave={() => setIsResourcesDropdownOpen(false)}
                  >
                    Resources
                    {/* Custom Chevron Underline */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1.5 transition-all duration-200 ease-in-out group-hover:mt-1 group-hover:opacity-100 opacity-70">
                      <svg 
                        width="10" 
                        height="5" 
                        viewBox="0 0 10 5" 
                        className={`fill-none stroke-[#D8AC35] stroke-2 transition-transform duration-200 ease-in-out ${
                          isResourcesDropdownOpen ? 'rotate-x-180' : ''
                        }`}
                        style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
                      >
                        <path d="M1 1l4 3 4-3" />
                      </svg>
                    </div>
                  </button>
                  <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 right-0 top-full pt-2 w-40 transition-all duration-200 ease-out transform group-hover:translate-y-0 translate-y-1 z-50"
                       onMouseEnter={() => setIsResourcesDropdownOpen(true)}
                       onMouseLeave={() => setIsResourcesDropdownOpen(false)}>
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-xl py-2">
                      {resourcesItems.map((item) => (
                        <Link key={item.name} href={item.href}>
                          <div className="block px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-[#D8AC35]/10 hover:text-gray-900 transition-colors cursor-pointer">
                            {item.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Theme Toggle and CTAs */}
              <div className="flex items-center space-x-4">
                {/* Theme Toggle Button */}
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
                
                {user ? (
                  <>
                    {user.subscriptionStatus !== 'active' && (
                      <Link href="/subscribe">
                        <Button className="bg-[#D8AC35] text-gray-900 px-4 py-2 rounded-md shadow-sm hover:bg-[#c49429] hover:scale-105 hover:shadow-md transition-all duration-200 font-semibold text-sm">
                          Get Started Free
                        </Button>
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
                    <Link href="/login">
                      <Button variant="outline" className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-[#D8AC35] hover:text-[#D8AC35] px-4 py-2 rounded-md font-medium transition-all duration-200 text-sm">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button className="bg-[#D8AC35] text-gray-900 px-4 py-2 rounded-md shadow-sm hover:bg-[#c49429] hover:scale-105 hover:shadow-md transition-all duration-200 font-semibold text-sm">
                        Get Started Free
                      </Button>
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Actions */}
              <div className="md:hidden flex items-center space-x-3">
                {!user && (
                  <Link href="/register">
                    <Button className="bg-[#D8AC35] text-gray-900 px-3 py-1.5 rounded-md shadow-sm hover:bg-[#c49429] transition-all duration-200 font-semibold text-sm">
                      Get Started Free
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
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="font-semibold">Trading Terminal</div>
                          <div className="text-sm opacity-75 mt-1">Live betting opportunities</div>
                        </Link>
                        <Link
                          href="/preset-terminal"
                          className={`block py-3 px-4 rounded-lg transition-colors min-h-[44px] ${
                            location === '/preset-terminal'
                              ? 'bg-[#D8AC35] text-gray-900'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="font-semibold">Preset Terminal</div>
                          <div className="text-sm opacity-75 mt-1">Strategy management</div>
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
                          <div className="font-semibold">Pricing</div>
                        </Link>
                        
                        {/* Resources Submenu */}
                        <div className="space-y-2">
                          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-4">Resources</div>
                          {resourcesItems.map((item) => (
                            <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
                              <div className="block py-2.5 px-4 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors min-h-[44px] flex items-center">
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
                              <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:border-[#D8AC35] hover:text-[#D8AC35]">
                                Sign In
                              </Button>
                            </Link>
                            <Link href="/register" onClick={() => setIsOpen(false)}>
                              <Button className="w-full bg-[#D8AC35] text-gray-900 hover:bg-[#c49429] font-semibold">
                                Get Started Free
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
        </div>
      </nav>
    </>
  );
}