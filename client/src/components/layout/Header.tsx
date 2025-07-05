import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, User, Settings, LogOut, Crown } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Product", href: "/product" },
  { name: "Sports", href: "/sports" },
  { name: "Calculator", href: "/calculator" },
  { name: "Views", href: "/views" },
  { name: "Pricing", href: "/pricing" },
  { name: "Learn", href: "/learn" },
  { name: "About", href: "/about" },
];

export default function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

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
    <nav className="sticky top-0 bg-white/98 backdrop-blur-md border-b border-gray-200 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
              <i className="fas fa-bullseye text-white text-sm"></i>
            </div>
            <span className="text-xl font-bold sharp-text">Sharp Shot</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`nav-link text-gray-700 hover:text-black transition-colors ${
                  location === item.href ? 'active' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {user.subscriptionStatus !== 'active' && (
                  <Link href="/subscribe">
                    <Button className="bg-gold text-white px-4 py-2 rounded-lg font-semibold hover:bg-gold/90 transition-colors">
                      Subscribe
                    </Button>
                  </Link>
                )}
                
                {/* User Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center space-x-2 focus:outline-none">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.profilePhoto || ""} alt={user.username || user.email} />
                      <AvatarFallback className="bg-gold text-white text-sm font-semibold">
                        {(user.username || user.email || "U").charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-700 font-medium">
                      {user.username || user.email}
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{user.username || user.email}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
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
                  <Button variant="outline" className="border border-charcoal text-charcoal px-4 py-2 rounded-lg font-semibold hover:bg-charcoal hover:text-white transition-colors">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-gold text-white px-6 py-2 rounded-lg font-semibold hover:bg-gold/90 transition-colors">
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
                  {navigation.map((item) => (
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
                            <AvatarFallback className="bg-gold text-white font-semibold">
                              {(user.username || user.email || "U").charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{user.username || user.email}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
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
  );
}
