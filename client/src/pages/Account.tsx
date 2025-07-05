import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";
import { User, CreditCard, Settings, Shield, BarChart3 } from "lucide-react";

export default function Account() {
  const [user, setUser] = useState<any>(null);
  const [payments, setPayments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [_, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    fetchUserData();
    fetchPaymentHistory();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await apiRequest("GET", "/api/auth/me");
      const result = await response.json();
      
      if (response.ok) {
        setUser(result.user);
      } else {
        // User not authenticated, redirect to login
        setLocation("/login");
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setLocation("/login");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPaymentHistory = async () => {
    try {
      const response = await apiRequest("GET", "/api/user/payments");
      const result = await response.json();
      
      if (response.ok) {
        setPayments(result);
      }
    } catch (error) {
      console.error("Failed to fetch payment history:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await apiRequest("POST", "/api/auth/logout");
      localStorage.removeItem("user");
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
      setLocation("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
            <p>Loading your account...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  const getSubscriptionStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      case 'canceled':
        return <Badge className="bg-red-100 text-red-800">Canceled</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatAmount = (amount: string, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(parseFloat(amount));
  };

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
          <p className="text-gray-600">Manage your account, subscription, and billing information</p>
        </div>

        <div className="grid gap-6">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <CardTitle>Profile Information</CardTitle>
              </div>
              <CardDescription>Your account details and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Username</label>
                  <Input value={user.username} disabled />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input value={user.email} disabled />
                </div>
              </div>
              <div className="flex space-x-4">
                <Link href="/dashboard">
                  <Button className="bg-gold text-white hover:bg-gold/90">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Dashboard
                  </Button>
                </Link>
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline">
                  <Shield className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Status */}
          <Card>
            <CardHeader>
              <CardTitle>Subscription Status</CardTitle>
              <CardDescription>Your current plan and billing information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium">
                      {user.subscriptionPlan ? 
                        `${user.subscriptionPlan.charAt(0).toUpperCase() + user.subscriptionPlan.slice(1)} Plan` : 
                        'No active plan'
                      }
                    </span>
                    {getSubscriptionStatusBadge(user.subscriptionStatus || 'inactive')}
                  </div>
                  {user.subscriptionPeriod && (
                    <p className="text-sm text-gray-600">
                      Billed {user.subscriptionPeriod}
                    </p>
                  )}
                  {user.subscriptionEndsAt && (
                    <p className="text-sm text-gray-600">
                      {user.subscriptionStatus === 'active' ? 'Renews' : 'Expires'} on {formatDate(user.subscriptionEndsAt)}
                    </p>
                  )}
                </div>
                <div className="space-x-2">
                  {user.subscriptionStatus === 'inactive' ? (
                    <Button onClick={() => setLocation('/subscribe')}>
                      Subscribe Now
                    </Button>
                  ) : (
                    <Button variant="outline">
                      Manage Subscription
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment History */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <CardTitle>Payment History</CardTitle>
              </div>
              <CardDescription>Your recent transactions and billing history</CardDescription>
            </CardHeader>
            <CardContent>
              {payments.length > 0 ? (
                <div className="space-y-3">
                  {payments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">
                            {formatAmount(payment.amount, payment.currency)}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {payment.paymentMethod}
                          </Badge>
                          <Badge 
                            className={`text-xs ${
                              payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                              payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}
                          >
                            {payment.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {formatDate(payment.createdAt)}
                        </p>
                      </div>
                      <div className="text-right">
                        {payment.stripePaymentId && (
                          <p className="text-xs text-gray-500">
                            ID: {payment.stripePaymentId.slice(-8)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <CreditCard className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No payment history yet</p>
                  <Button 
                    onClick={() => setLocation('/subscribe')}
                    className="mt-2"
                    variant="outline"
                  >
                    Start Your Subscription
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
              <CardDescription>Manage your account settings and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Separator />
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Sign Out</h4>
                    <p className="text-sm text-gray-600">Sign out of your account on this device</p>
                  </div>
                  <Button variant="outline" onClick={handleLogout}>
                    Sign Out
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}