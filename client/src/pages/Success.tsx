import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { CheckCircle, Download, Users, TrendingUp } from "lucide-react";

export default function Success() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Welcome to Sharp Shot!</h1>
          <p className="text-xl text-gray-600 mb-6">
            Your subscription is now active. Let's get you started on your profitable betting journey.
          </p>
          <Badge className="bg-green-100 text-green-800 px-4 py-2">
            Subscription Active
          </Badge>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <CardTitle>Start Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Begin tracking lines and finding +EV opportunities across all major sportsbooks.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <CardTitle>Join the Community</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Connect with other sharp bettors and share your winning strategies.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Download className="w-8 h-8 text-gold mx-auto mb-2" />
              <CardTitle>Download Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Access our mobile app and browser extensions for on-the-go betting.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gray-50 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">What's Next?</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-gold text-white rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="font-semibold">Explore the Dashboard</h3>
                <p className="text-gray-600">Familiarize yourself with the interface and available tools.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-gold text-white rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="font-semibold">Set Your Bankroll</h3>
                <p className="text-gray-600">Configure your betting bankroll and risk management settings.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-gold text-white rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="font-semibold">Track Your First Bet</h3>
                <p className="text-gray-600">Start monitoring line movements and identify your first +EV opportunity.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-gold text-white rounded-full flex items-center justify-center font-bold text-sm">
                4
              </div>
              <div>
                <h3 className="font-semibold">Join the Community</h3>
                <p className="text-gray-600">Share strategies and learn from other successful bettors.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <Link href="/">
            <Button className="bg-gold text-white px-8 py-3 rounded-lg font-semibold hover:bg-gold/90 transition-colors">
              Go to Dashboard
            </Button>
          </Link>
          <div className="text-sm text-gray-600">
            Need help getting started? <a href="/contact" className="text-gold hover:underline">Contact our support team</a>
          </div>
        </div>
      </div>
    </section>
  );
}