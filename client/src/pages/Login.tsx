import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function Login() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: "Missing Fields",
        description: "Please enter both username and password.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiRequest("POST", "/api/auth/login", {
        username,
        password,
      });

      toast({
        title: "Login Successful",
        description: "Welcome back to Sharp Shot!",
      });

      // Invalidate user queries to refresh auth state
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      
      // Redirect to dashboard or home
      setLocation("/");
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error.message || "Invalid username or password.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 items-center justify-center p-16 relative overflow-hidden">
        {/* Background Logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <img 
            src="/logo-gold.png" 
            alt="Sharp Shot Logo" 
            className="w-96 h-96"
          />
        </div>
        
        <div className="text-center relative z-10">
          <h1 className="text-8xl font-extrabold text-white mb-6" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>Sharp Shot</h1>
          <p className="text-2xl text-gray-300 mb-12">Built to make you sharper</p>
          <div className="space-y-6 text-left max-w-lg">
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-gold rounded-full"></div>
              <span className="text-xl text-gray-300">Advanced betting analytics</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-gold rounded-full"></div>
              <span className="text-xl text-gray-300">Real-time odds comparison</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-gold rounded-full"></div>
              <span className="text-xl text-gray-300">Professional trading tools</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="lg:hidden w-16 h-16 bg-gold/10 dark:bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold/20 dark:border-gold/30">
              <img 
                src="/logo-gold.png" 
                alt="Sharp Shot Logo" 
                className="w-10 h-10"
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Sign in to your Sharp Shot account
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-700 dark:text-gray-300">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-12 text-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-12 text-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              <div className="text-right">
                <Link href="/forgot-password">
                  <Button variant="link" className="text-sm text-gold hover:text-gold/80 p-0 h-auto">
                    Forgot your password?
                  </Button>
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-lg bg-gradient-to-r from-gold to-yellow-600 text-charcoal hover:bg-gold/90"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-charcoal border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
              <div className="text-center space-y-3">
                <p className="text-gray-600 dark:text-gray-400">
                  Don't have an account?
                </p>
                <Link href="/register">
                  <Button variant="ghost" className="text-gold hover:text-gold/80 dark:text-gold dark:hover:text-gold/80">
                    Create Account
                  </Button>
                </Link>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                <Link href="/?demo=true">
                  <Button variant="outline" className="w-full h-12 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    Try Demo Mode
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}