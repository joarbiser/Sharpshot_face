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
  const [network, setNetwork] = useState('ethereum');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const networkOptions = [
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', address: '0x742d35Cc6635C0532925a3b8Eb1e49EA30AC3E2C', fee: '$2-15' },
    { id: 'polygon', name: 'Polygon', symbol: 'MATIC', address: '0x742d35Cc6635C0532925a3b8Eb1e49EA30AC3E2C', fee: '$0.01-0.10' },
    { id: 'solana', name: 'Solana', symbol: 'SOL', address: 'DRpbCBMxVnDK7maPM5tGv6MvB3v1sRMC86PZ8okm21hy', fee: '$0.0001-0.01' },
    { id: 'tron', name: 'Tron', symbol: 'TRX', address: 'TQn9Y2khTMzH3WPYMJnBt8xFqjdVnEqYoB', fee: '$0.01-0.05' },
    { id: 'optimism', name: 'Optimism', symbol: 'OP', address: '0x742d35Cc6635C0532925a3b8Eb1e49EA30AC3E2C', fee: '$0.10-1.00' },
    { id: 'base', name: 'Base', symbol: 'BASE', address: '0x742d35Cc6635C0532925a3b8Eb1e49EA30AC3E2C', fee: '$0.05-0.50' },
    { id: 'arbitrum', name: 'Arbitrum', symbol: 'ARB', address: '0x742d35Cc6635C0532925a3b8Eb1e49EA30AC3E2C', fee: '$0.20-2.00' },
  ];

  const prices = {
    starter: { monthly: 39.99, annual: 399.99 },
    pro: { monthly: 99.99, annual: 999.99 },
  };

  const amount = prices[planType as keyof typeof prices][period as keyof typeof prices.starter];
  const selectedNetwork = networkOptions.find(net => net.id === network);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(selectedNetwork?.address || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUSDCPayment = async () => {
    setIsProcessing(true);
    
    try {
      const response = await apiRequest("POST", "/api/create-usdc-payment", {
        planType,
        period,
        network: selectedNetwork?.id,
        address: selectedNetwork?.address,
        amount: amount.toString(),
      });

      const result = await response.json();
      
      toast({
        title: "Payment Initiated",
        description: `Please send ${amount} USDC to the provided address on ${selectedNetwork?.name}`,
      });

      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to initiate USDC payment",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
        <h4 className="font-semibold mb-2 flex items-center">
          💰 USDC Payment Instructions
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Send exactly <strong className="text-gold">{amount} USDC</strong> to the address below on your selected network.
          Payment will be verified automatically within 1-3 minutes.
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Select Network</label>
          <Select value={network} onValueChange={setNetwork}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {networkOptions.map((net) => (
                <SelectItem key={net.id} value={net.id}>
                  <span className="flex items-center gap-2">
                    {net.name} ({net.symbol})
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">USDC Wallet Address</label>
          <div className="flex items-center space-x-2">
            <input 
              value={selectedNetwork?.address || ""} 
              readOnly 
              className="flex-1 p-2 border rounded-md font-mono text-sm bg-gray-50 dark:bg-gray-800"
            />
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={copyToClipboard}
            >
              {copied ? "✓ Copied!" : "Copy"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800/50">
          <div>
            <p className="text-sm font-medium">Amount</p>
            <p className="text-lg font-bold text-gold">{amount} USDC</p>
          </div>
          <div>
            <p className="text-sm font-medium">Network</p>
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {selectedNetwork?.name}
            </p>
          </div>
        </div>
        
        <div className="p-4 border rounded-lg bg-amber-50 dark:bg-amber-900/20">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>⚠️ Important:</strong> Only send USDC tokens to this address. Sending other cryptocurrencies will result in permanent loss of funds.
          </p>
        </div>

        <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
          <p className="text-sm text-green-800 dark:text-green-200">
            <strong>✅ Auto-Verification:</strong> Your payment will be automatically detected and your subscription activated within 1-3 minutes of confirmation.
          </p>
        </div>
      </div>
      
      <div className="space-y-3">
        {!isProcessing ? (
          <Button 
            onClick={handleUSDCPayment} 
            className="w-full bg-gold hover:bg-gold/90"
          >
            I have sent the USDC payment
          </Button>
        ) : (
          <div className="text-center py-4">
            <div className="animate-spin w-8 h-8 border-4 border-gold border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Monitoring blockchain for your payment...
            </p>
            <Button 
              onClick={onSuccess} 
              variant="outline"
              className="mt-4"
            >
              Skip verification (Demo)
            </Button>
          </div>
        )}
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