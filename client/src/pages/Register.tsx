import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Target, Activity, Cpu, Lock } from "lucide-react";

export default function Register() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !email || !password || !confirmPassword) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please ensure both password fields match.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await apiRequest("POST", "/api/auth/register", {
        username,
        email,
        password,
      });

      toast({
        title: "Account Created Successfully",
        description: "Welcome to Sharp Shot! You can now log in.",
        duration: 5000,
      });

      // Redirect to login page
      setLocation("/login");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-black dark:via-gray-900 dark:to-[#D8AC35]/10 relative overflow-hidden">
      
      {/* Lidar Sweep Animation - Hidden on mobile */}
      <div 
        className="hidden md:block absolute inset-0 pointer-events-none opacity-8 dark:opacity-12 lidar-sweep-container"
        aria-hidden="true"
        style={{
          background: `
            linear-gradient(45deg, 
              transparent 0%, 
              rgba(128, 128, 128, 0.03) 25%, 
              transparent 50%, 
              rgba(128, 128, 128, 0.03) 75%, 
              transparent 100%
            ),
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 19px,
              rgba(128, 128, 128, 0.06) 20px,
              rgba(128, 128, 128, 0.06) 21px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 19px,
              rgba(128, 128, 128, 0.04) 20px,
              rgba(128, 128, 128, 0.04) 21px
            )
          `,
          maskImage: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.1) 100%)',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.1) 100%)'
        }}
      >
        {/* Diagonal Scan Bar */}
        <div 
          className="absolute inset-0 opacity-0 animate-[lidarSweep_9s_infinite_linear]"
          style={{
            background: 'linear-gradient(45deg, transparent 0%, transparent 48%, rgba(216, 172, 53, 0.15) 50%, transparent 52%, transparent 100%)',
            transform: 'translateX(-100%)'
          }}
        />
        
        {/* Faint "SS" Logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] dark:opacity-[0.04] pointer-events-none">
          <div 
            className="text-[40vw] font-black tracking-tighter select-none"
            style={{ 
              fontFamily: "'Saira Condensed', sans-serif",
              fontStyle: 'italic',
              transform: 'skew(-10deg)'
            }}
          >
            SS
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header Section */}
        <div className="text-center space-y-8 mb-16 max-w-4xl mx-auto">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D8AC35]/10 dark:bg-[#D8AC35]/20 border border-[#D8AC35]/20 dark:border-[#D8AC35]/30 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
            <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-wider">CREATE ACCOUNT</span>
          </div>

          {/* Main Heading */}
          <h1 
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-gray-900 dark:text-white leading-none tracking-tighter" 
            style={{ 
              fontFamily: "'Saira Condensed', sans-serif", 
              fontStyle: 'italic', 
              transform: 'skew(-5deg)' 
            }}
          >
            CREATE ACCOUNT
          </h1>
          
          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            Join the terminal — built for sharps, not edge-seekers.
          </p>

          {/* Value Pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 dark:bg-blue-900/20 border border-blue-200/50 dark:border-blue-800/50">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-sm font-medium text-blue-700 dark:text-blue-400 uppercase tracking-wider" style={{ fontFamily: "'Rajdhani', sans-serif" }}>Data-Driven</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100/50 dark:bg-green-900/20 border border-green-200/50 dark:border-green-800/50">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm font-medium text-green-700 dark:text-green-400 uppercase tracking-wider" style={{ fontFamily: "'Rajdhani', sans-serif" }}>Transparent</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100/50 dark:bg-purple-900/20 border border-purple-200/50 dark:border-purple-800/50">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span className="text-sm font-medium text-purple-700 dark:text-purple-400 uppercase tracking-wider" style={{ fontFamily: "'Rajdhani', sans-serif" }}>Secure</span>
            </div>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-[1600px] mx-auto">
          
          {/* Left Column - Value Props */}
          <div className="relative flex items-center justify-center lg:justify-end">
            
            {/* Value Props Content */}
            <div className="relative z-10 w-full max-w-md lg:mr-4">
              <div className="flex flex-col justify-center min-h-[500px] space-y-8">
                
                {/* Precision over luck */}
                <div className="group relative" style={{ animation: 'fadeInUp 0.6s ease-out 0.1s both' }}>
                  <div className="flex items-start gap-5">
                    <div className="relative flex-shrink-0 mt-1">
                      <div className="w-10 h-10 bg-[#D8AC35]/10 rounded-lg flex items-center justify-center border border-[#D8AC35]/20 group-hover:bg-[#D8AC35]/20 transition-all duration-300 relative overflow-hidden">
                        <Target className="w-5 h-5 text-[#D8AC35] relative z-10" />
                        {/* Shimmer overlay */}
                        <div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(216,172,53,0.3)] to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[goldShimmer_0.8s_ease-out]"
                          style={{ animationDelay: '0s' }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                        Precision over luck
                      </h3>
                      <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                        Trade with confidence, not chance.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Real-time odds analysis - CENTER ALIGNED */}
                <div className="group relative" style={{ animation: 'fadeInUp 0.6s ease-out 0.2s both' }}>
                  <div className="flex items-start gap-5">
                    <div className="relative flex-shrink-0 mt-1">
                      <div className="w-10 h-10 bg-[#D8AC35]/10 rounded-lg flex items-center justify-center border border-[#D8AC35]/20 group-hover:bg-[#D8AC35]/20 transition-all duration-300 relative overflow-hidden">
                        <Activity className="w-5 h-5 text-[#D8AC35] relative z-10" />
                        {/* Shimmer overlay */}
                        <div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(216,172,53,0.3)] to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[goldShimmer_0.8s_ease-out]"
                          style={{ animationDelay: '0.1s' }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                        Real-time odds analysis
                      </h3>
                      <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                        Live data streams for instant market insights.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Professional-grade tools */}
                <div className="group relative" style={{ animation: 'fadeInUp 0.6s ease-out 0.3s both' }}>
                  <div className="flex items-start gap-5">
                    <div className="relative flex-shrink-0 mt-1">
                      <div className="w-10 h-10 bg-[#D8AC35]/10 rounded-lg flex items-center justify-center border border-[#D8AC35]/20 group-hover:bg-[#D8AC35]/20 transition-all duration-300 relative overflow-hidden">
                        <Cpu className="w-5 h-5 text-[#D8AC35] relative z-10" />
                        {/* Shimmer overlay */}
                        <div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(216,172,53,0.3)] to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[goldShimmer_0.8s_ease-out]"
                          style={{ animationDelay: '0.2s' }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                        Professional-grade tools
                      </h3>
                      <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                        Advanced analytics built for serious traders.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column - Form Card */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              
              {/* Form Card */}
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8 mb-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden group">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Username Field */}
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-semibold text-gray-700 dark:text-gray-300" style={{ fontFamily: "'Rajdhani', sans-serif" }}>Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Choose a username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      disabled={isLoading}
                      className="h-12 text-base bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-150 focus:ring-2 focus:ring-[#D8AC35]/30 focus:border-[#D8AC35]"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300" style={{ fontFamily: "'Rajdhani', sans-serif" }}>Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                      className="h-12 text-base bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-150 focus:ring-2 focus:ring-[#D8AC35]/30 focus:border-[#D8AC35]"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-semibold text-gray-700 dark:text-gray-300" style={{ fontFamily: "'Rajdhani', sans-serif" }}>Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      className="h-12 text-base bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-150 focus:ring-2 focus:ring-[#D8AC35]/30 focus:border-[#D8AC35]"
                      minLength={6}
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400">Password must be at least 6 characters long.</p>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700 dark:text-gray-300" style={{ fontFamily: "'Rajdhani', sans-serif" }}>Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      className="h-12 text-base bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-150 focus:ring-2 focus:ring-[#D8AC35]/30 focus:border-[#D8AC35]"
                    />
                  </div>

                  {/* Create Account Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 text-base bg-[#D8AC35] hover:bg-[#B8941F] text-black font-semibold transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                    onMouseEnter={() => {
                      // Trigger localized card sweep on button hover
                      const card = document.querySelector('.group.bg-gray-50\\/80');
                      if (card) {
                        const sweep = document.createElement('div');
                        sweep.className = 'absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(216,172,53,0.1)] to-transparent opacity-0 animate-[cardSweep_300ms_ease-out] pointer-events-none';
                        card.appendChild(sweep);
                        setTimeout(() => sweep.remove(), 300);
                      }
                    }}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                    </div>
                  </div>

                  {/* Sign In Link */}
                  <div className="text-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Already have an account? </span>
                    <Link href="/login">
                      <span className="text-sm text-[#D8AC35] hover:text-[#B8941F] hover:underline transition-colors duration-150 cursor-pointer font-medium">
                        Sign In
                      </span>
                    </Link>
                  </div>
                </form>
              </div>

              {/* Support Strip */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Lock className="w-4 h-4" />
                  <span>Questions about your account? </span>
                  <Link href="/support">
                    <span 
                      className="text-[#D8AC35] hover:text-[#B8941F] hover:underline transition-colors duration-150 cursor-pointer"
                      onClick={() => {
                        setTimeout(() => {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }, 100);
                      }}
                    >
                      Contact support
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}