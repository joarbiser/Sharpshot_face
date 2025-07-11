import { useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function DemoBadge() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm">
      <div className="bg-gray-900 border-2 border-gold rounded-lg p-4 shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
              <span className="text-gold font-bold text-sm">DEMO MODE</span>
            </div>
            <p className="text-white text-sm mb-3">
              You're experiencing the full platform. Create an account to save your bets and strategies.
            </p>
            <div className="flex gap-2">
              <Link href="/register">
                <Button 
                  size="sm" 
                  className="bg-gold hover:bg-gold/90 text-black font-medium"
                >
                  Create Account
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-gray-400 hover:text-white"
                onClick={() => setIsVisible(false)}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}