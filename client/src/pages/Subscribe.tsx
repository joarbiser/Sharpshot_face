import { useState, useEffect } from "react";
import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";

// Initialize Stripe
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  console.error('Missing VITE_STRIPE_PUBLIC_KEY environment variable');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

interface SubscribeFormProps {
  planType: string;
  period: string;
  onSuccess: () => void;
}

const SubscribeForm = ({ planType, period, onSuccess }: SubscribeFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
        },
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Payment Successful",
          description: "Welcome to Sharp Shot! Your subscription is now active.",
        });
        onSuccess();
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button 
        type="submit" 
        className="w-full" 
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? "Processing..." : `Subscribe to ${planType} Plan`}
      </Button>
    </form>
  );
};

interface CryptoPaymentProps {
  planType: string;
  period: string;
  onSuccess: () => void;
}

const CryptoPayment = ({ planType, period, onSuccess }: CryptoPaymentProps) => {
  const [selectedToken, setSelectedToken] = useState('usdc');
  const [selectedNetwork, setSelectedNetwork] = useState('ethereum');

  const supportedTokens = [
    { id: 'usdc', name: 'USDC', description: 'USD Coin - Most widely accepted stablecoin' },
    { id: 'usdt', name: 'USDT', description: 'Tether - Popular stablecoin across all networks' },
  ];

  const supportedNetworks = [
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', description: 'Most secure and decentralized network', fee: '$5-15' },
    { id: 'tron', name: 'Tron', symbol: 'TRX', description: 'Ultra-low fees and fast transactions', fee: '$0.01-0.10' },
    { id: 'solana', name: 'Solana', symbol: 'SOL', description: 'Ultra-fast transactions with minimal fees', fee: '$0.01-0.05' },
    { id: 'base', name: 'Base', symbol: 'BASE', description: 'Fast & affordable Layer 2 solution', fee: '$0.10-1.00' },
    { id: 'arbitrum', name: 'Arbitrum', symbol: 'ARB', description: 'Ethereum Layer 2 with low fees', fee: '$0.20-2.00' },
    { id: 'bnb', name: 'BNB Chain', symbol: 'BNB', description: 'High-performance smart contracts', fee: '$0.50-2.00' },
  ];

  const getTokenPrice = () => {
    const basePrices = {
      basic: { monthly: 39.99, annual: 399.99 },
      pro: { monthly: 99.99, annual: 999.99 },
    };
    return basePrices[planType as keyof typeof basePrices]?.[period as keyof typeof basePrices.basic] || 0;
  };

  return (
    <div className="space-y-6">
      {/* Coming Soon Header */}
      <div className="text-center p-6 border-2 border-yellow-200 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
        <h3 className="text-2xl font-bold text-yellow-800 dark:text-yellow-200 mb-2">
          🚀 USDC/USDT Payments Coming Soon!
        </h3>
        <p className="text-yellow-700 dark:text-yellow-300">
          Preview the payment interface below. This feature will be available very soon.
        </p>
      </div>

      {/* Payment Form Preview */}
      <div className="space-y-6 opacity-75">
        {/* Token Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
            Select Token Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            {supportedTokens.map((token) => (
              <div
                key={token.id}
                className={`p-4 border-2 rounded-lg cursor-not-allowed transition-all ${
                  selectedToken === token.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-black dark:border-[#D8AC35]'
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
                }`}
              >
                <div className="text-center">
                  <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100">{token.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{token.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Network Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
            Select Network
          </label>
          <div className="space-y-2">
            {supportedNetworks.map((network) => (
              <div
                key={network.id}
                className={`p-4 border rounded-lg cursor-not-allowed transition-all flex items-center justify-between ${
                  selectedNetwork === network.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-black dark:border-[#D8AC35]'
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-black dark:to-[#D8AC35] rounded-full flex items-center justify-center">
                    <span className="text-charcoal font-bold">{network.symbol.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">{network.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{network.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Fee: {network.fee}</p>
                  <p className="text-xs text-gray-500">Network fee</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Summary */}
        <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800/50">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Payment Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Plan:</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">{planType} ({period})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Amount:</span>
              <span className="font-bold text-lg text-gray-900 dark:text-gray-100">${getTokenPrice()} {selectedToken.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Network:</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {supportedNetworks.find(n => n.id === selectedNetwork)?.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Important Disclaimers */}
      <div className="space-y-3">
        <div className="p-4 border-2 border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20">
          <h5 className="font-bold text-red-800 dark:text-red-200 mb-2 flex items-center">
            ⚠️ CRITICAL: Network Compatibility Warning
          </h5>
          <p className="text-sm text-red-700 dark:text-red-300">
            <strong>Only send {selectedToken.toUpperCase()} tokens on the {supportedNetworks.find(n => n.id === selectedNetwork)?.name} network.</strong> 
            Sending tokens on the wrong network or sending different tokens will result in <strong>permanent loss of funds</strong>.
          </p>
        </div>

        <div className="p-4 border border-amber-200 rounded-lg bg-amber-50 dark:bg-amber-900/20">
          <h5 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
            Payment Verification Process:
          </h5>
          <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
            <li>• Send exact amount: ${getTokenPrice()} {selectedToken.toUpperCase()}</li>
            <li>• Use only {supportedNetworks.find(n => n.id === selectedNetwork)?.name} network</li>
            <li>• Payment will be verified automatically within 1-5 minutes</li>
            <li>• Your subscription will activate immediately after confirmation</li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-4">
        <p className="text-gray-600 dark:text-gray-400">
          For now, please use credit card payment via Stripe above
        </p>
        <Button 
          variant="outline" 
          className="w-full" 
          disabled
        >
          Send {selectedToken.toUpperCase()} Payment (Coming Soon)
        </Button>
      </div>
    </div>
  );
};

interface SubscriptionFlowProps {
  planType: string;
  period: string;
  clientSecret?: string;
}

const SubscriptionFlow = ({ planType, period, clientSecret }: SubscriptionFlowProps) => {
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "crypto">("stripe");
  const { toast } = useToast();

  const handleSuccess = () => {
    toast({
      title: "Success!",
      description: "Your subscription has been activated successfully.",
    });
    // Redirect to dashboard or home page
    window.location.href = '/';
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Complete Your Subscription</h2>
        <p className="text-gray-600">
          You're subscribing to the {planType} plan ({period})
        </p>
      </div>

      <Tabs value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as "stripe" | "crypto")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="stripe">Credit Card</TabsTrigger>
          <TabsTrigger value="crypto">USDC Payment</TabsTrigger>
        </TabsList>

        <TabsContent value="stripe" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Credit Card Payment</CardTitle>
              <CardDescription>
                Secure payment processing powered by Stripe
              </CardDescription>
            </CardHeader>
            <CardContent>
              {clientSecret ? (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <SubscribeForm 
                    planType={planType} 
                    period={period} 
                    onSuccess={handleSuccess}
                  />
                </Elements>
              ) : (
                <div className="text-center py-8">
                  <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                  <p>Setting up payment...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="crypto" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>USDC Payment</CardTitle>
              <CardDescription>
                Pay with USDC on Ethereum, Polygon, or Solana networks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CryptoPayment 
                planType={planType} 
                period={period} 
                onSuccess={handleSuccess}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default function Subscribe() {
  const [subscriptionData, setSubscriptionData] = useState<{
    planType: string;
    period: string;
    clientSecret?: string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [_, setLocation] = useLocation();

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
        // Redirect to login if not authenticated
        setLocation("/login");
      }
    } catch (error) {
      setLocation("/login");
    }
  };

  const handlePlanSelection = async (planType: string, period: string) => {
    if (!user) {
      setLocation("/login");
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await apiRequest("POST", "/api/get-or-create-subscription", {
        planType,
        period,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      setSubscriptionData({
        planType,
        period,
        clientSecret: result.clientSecret,
      });
    } catch (error: any) {
      console.error("Failed to create subscription:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (subscriptionData) {
    return (
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SubscriptionFlow {...subscriptionData} />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl tungsten-style mb-6">Choose Your Plan</h1>
          <p className="text-xl text-gray-600 sharp-text">
            Select the perfect plan for your betting strategy
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Basic Plan */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">Basic Plan</CardTitle>
              <CardDescription>Perfect for getting started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monthly:</span>
                  <span className="font-bold">$39.99/month</span>
                </div>
                <div className="flex justify-between">
                  <span>Annual:</span>
                  <span className="font-bold">$399.90/year</span>
                  <Badge variant="secondary">Save $79.98</Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <Button 
                  onClick={() => handlePlanSelection('basic', 'monthly')}
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Start Monthly Plan"}
                </Button>
                <Button 
                  onClick={() => handlePlanSelection('basic', 'annual')}
                  variant="outline"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Start Annual Plan"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="hover:shadow-lg transition-shadow border-2 border-primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Pro Plan</CardTitle>
                  <CardDescription>For serious bettors and creators</CardDescription>
                </div>
                <Badge>Most Popular</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monthly:</span>
                  <span className="font-bold">$99.99/month</span>
                </div>
                <div className="flex justify-between">
                  <span>Annual:</span>
                  <span className="font-bold">$999.90/year</span>
                  <Badge variant="secondary">Save $199.98</Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <Button 
                  onClick={() => handlePlanSelection('pro', 'monthly')}
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Start Monthly Plan"}
                </Button>
                <Button 
                  onClick={() => handlePlanSelection('pro', 'annual')}
                  variant="outline"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Start Annual Plan"}
                </Button>
              </div>
            </CardContent>
          </Card>


        </div>
      </div>
    </section>
  );
}