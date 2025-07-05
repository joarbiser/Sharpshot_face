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
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const cryptoOptions = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', address: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', address: '0x742d35Cc6634C0532925a3b8D5C7B96D6c6B1F6D' },
    { id: 'usdc', name: 'USD Coin', symbol: 'USDC', address: '0x742d35Cc6634C0532925a3b8D5C7B96D6c6B1F6D' },
  ];

  const prices = {
    starter: { monthly: 39.99, annual: 399.99 },
    pro: { monthly: 99.99, annual: 999.99 },
  };

  const amount = prices[planType as keyof typeof prices][period as keyof typeof prices.starter];
  const selectedCryptoData = cryptoOptions.find(crypto => crypto.id === selectedCrypto);

  const handleCryptoPayment = async () => {
    setIsProcessing(true);
    
    try {
      const response = await apiRequest("POST", "/api/create-crypto-payment", {
        planType,
        period,
        cryptoAddress: selectedCryptoData?.address,
        cryptoAmount: amount.toString(),
        cryptoCurrency: selectedCryptoData?.symbol,
      });

      const result = await response.json();
      
      toast({
        title: "Payment Initiated",
        description: `Please send ${amount} ${selectedCryptoData?.symbol} to the provided address`,
      });

      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to initiate crypto payment",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <h4 className="text-lg font-medium">Select Cryptocurrency</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cryptoOptions.map((crypto) => (
            <Card 
              key={crypto.id} 
              className={`cursor-pointer transition-all ${selectedCrypto === crypto.id ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setSelectedCrypto(crypto.id)}
            >
              <CardContent className="p-4 text-center">
                <div className="font-medium">{crypto.name}</div>
                <div className="text-sm text-gray-600">{crypto.symbol}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedCryptoData && (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between">
            <span>Amount:</span>
            <span className="font-medium">{amount} {selectedCryptoData.symbol}</span>
          </div>
          <div className="flex justify-between">
            <span>Address:</span>
            <span className="font-mono text-sm break-all">{selectedCryptoData.address}</span>
          </div>
          <div className="text-sm text-gray-600">
            Send exactly {amount} {selectedCryptoData.symbol} to the above address. 
            Your subscription will be activated once the payment is confirmed.
          </div>
        </div>
      )}

      <Button 
        onClick={handleCryptoPayment}
        className="w-full"
        disabled={isProcessing}
      >
        {isProcessing ? "Processing..." : "Confirm Crypto Payment"}
      </Button>
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
          <TabsTrigger value="crypto">Cryptocurrency</TabsTrigger>
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
              <CardTitle>Cryptocurrency Payment</CardTitle>
              <CardDescription>
                Pay with Bitcoin, Ethereum, or USDC
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
      const response = await apiRequest("POST", "/api/create-subscription", {
        planType,
        period,
      });

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
          {/* Starter Plan */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">Starter Plan</CardTitle>
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
                  <span className="font-bold">$399.99/year</span>
                  <Badge variant="secondary">Save 17%</Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <Button 
                  onClick={() => handlePlanSelection('starter', 'monthly')}
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Start Monthly Plan"}
                </Button>
                <Button 
                  onClick={() => handlePlanSelection('starter', 'annual')}
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
                  <span className="font-bold">$999.99/year</span>
                  <Badge variant="secondary">Save 17%</Badge>
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