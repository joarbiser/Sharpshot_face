import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, User, Settings, LogOut, Crown, Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useDemoMode } from "@/contexts/DemoModeContext";

const toolsItems = [
  { name: "Calculator", href: "/calculator" },
  { name: "Preset Terminal", href: "/views" },
];

const resourcesItems = [
  { name: "FAQ", href: "/faq" },
  { name: "Tutorials", href: "/tutorials" },
  { name: "Blog", href: "/blog" },
  { name: "Sports", href: "/sports" },
  { name: "Achievements", href: "/achievements" },
];

export default function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
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
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: 'include'
      });
      setUser(null);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white dark:bg-charcoal shadow-md transition-shadow duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex justify-between items-center h-16">
            {/* Left - Logo and Brand */}
            <Link href="/" className="flex items-center space-x-3">
              <img 
                src="/logo-gold.png" 
                alt="Sharp Shot Logo" 
                className="w-8 h-8 block dark:hidden"
              />
              <img 
                src="/logo-white.png" 
                alt="Sharp Shot Logo" 
                className="w-8 h-8 hidden dark:block"
              />
              <span className="text-xl font-bold text-black dark:text-white">Sharp Shot</span>
            </Link>

            {/* Center - Navigation Dropdowns */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Tools Dropdown */}
              <div className="relative group">
                <button className="text-black dark:text-white hover:underline focus:outline-none transition-all duration-300 py-2">
                  Tools
                </button>
                <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 left-0 top-full pt-1 w-48 transition-all duration-200 z-50">
                  <div className="bg-white dark:bg-charcoal border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg py-2">
                    {toolsItems.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <div className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                          {item.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing Link */}
              <Link
                href="/pricing"
                className="text-black dark:text-white hover:underline transition-all duration-300 py-2"
              >
                Pricing
              </Link>

              {/* Resources Dropdown */}
              <div className="relative group">
                <button className="text-black dark:text-white hover:underline focus:outline-none transition-all duration-300 py-2">
                  Resources
                </button>
                <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 left-0 top-full pt-1 w-48 transition-all duration-200 z-50">
                  <div className="bg-white dark:bg-charcoal border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg py-2">
                    {resourcesItems.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <div className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                          {item.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          
            {/* Right - CTAs */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  {user.subscriptionStatus !== 'active' && (
                    <Link href="/subscribe">
                      <Button className="bg-[#D8AC35] text-black px-5 py-2 rounded-xl shadow-md hover:scale-105 transition-all duration-300 font-semibold">
                        Subscribe
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
                    <span className="text-sm text-secondary font-medium">
                      {user.username || user.email}
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{user.username || user.email}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                      {user.subscriptionStatus === 'active' && (
                        <div className="flex items-center mt-1">
                          <Crown className="h-3 w-3 text-gold mr-1" />
                          <span className="text-xs text-gold font-medium">
                            {user.subscriptionPlan} Plan
                          </span>
                        </div>
                      )}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/account" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
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
                <Link href="/login">
                  <Button variant="outline" className="text-black border-gray-300 px-4 py-2 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-[#D8AC35] text-black px-5 py-2 rounded-xl shadow-md hover:scale-105 transition-all duration-300 font-semibold">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {/* Mobile Tools */}
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Tools</div>
                  {toolsItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`text-lg py-2 px-4 rounded-lg transition-colors ${
                        location === item.href
                          ? 'bg-gold text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  {/* Mobile Pricing */}
                  <Link
                    href="/pricing"
                    className={`text-lg py-2 px-4 rounded-lg transition-colors ${
                      location === '/pricing'
                        ? 'bg-gold text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Pricing
                  </Link>
                  
                  {/* Mobile Resources */}
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mt-4">Resources</div>
                  {resourcesItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`text-lg py-2 px-4 rounded-lg transition-colors ${
                        location === item.href
                          ? 'bg-gold text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-4 space-y-3">
                    {user ? (
                      <>
                        {/* Mobile User Profile */}
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.profilePhoto || ""} alt={user.username || user.email} />
                            <AvatarFallback className="bg-gold text-charcoal font-semibold">
                              {(user.username || user.email || "U").charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{user.username || user.email}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                            {user.subscriptionStatus === 'active' && (
                              <div className="flex items-center mt-1">
                                <Crown className="h-3 w-3 text-gold mr-1" />
                                <span className="text-xs text-gold font-medium">
                                  {user.subscriptionPlan} Plan
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <Link href="/account" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full border-charcoal text-charcoal hover:bg-charcoal hover:text-white">
                            <User className="mr-2 h-4 w-4" />
                            Account
                          </Button>
                        </Link>
                        
                        {user.subscriptionStatus !== 'active' && (
                          <Link href="/subscribe" onClick={() => setIsOpen(false)}>
                            <Button className="w-full bg-gold text-white hover:bg-gold/90">
                              Subscribe
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
                          <Button variant="outline" className="w-full border-charcoal text-charcoal hover:bg-charcoal hover:text-white">
                            Sign In
                          </Button>
                        </Link>
                        <Link href="/register" onClick={() => setIsOpen(false)}>
                          <Button className="w-full bg-gold text-white hover:bg-gold/90">
                            Get Started
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
