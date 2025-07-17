import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { apiRequest } from '@/lib/queryClient';
import { ExternalLink, DollarSign, Users, TrendingUp, Calendar, Award, Target } from 'lucide-react';

interface AffiliateSportsbook {
  id: string;
  name: string;
  color: string;
  commissionRate: number;
  signupBonus: number;
  minimumDeposit: number;
  promoCode?: string;
  specialOffers?: SpecialOffer[];
  isActive: boolean;
  priority: number;
}

interface SpecialOffer {
  id: string;
  title: string;
  description: string;
  bonusAmount: number;
  requirements: string;
  expiresAt: string;
  isActive: boolean;
}

interface AffiliateMetrics {
  totalClicks: number;
  totalConversions: number;
  totalRevenue: number;
  totalCommission: number;
  conversionRate: number;
  avgDepositAmount: number;
  topSportsbooks: Array<{
    sportsbookId: string;
    name: string;
    clicks: number;
    conversions: number;
    revenue: number;
    commission: number;
  }>;
}

export default function Affiliate() {
  const [selectedSportsbook, setSelectedSportsbook] = useState<AffiliateSportsbook | null>(null);

  const { data: sportsbooks, isLoading: sportsbooksLoading } = useQuery({
    queryKey: ['/api/affiliate/sportsbooks'],
    queryFn: () => apiRequest('GET', '/api/affiliate/sportsbooks'),
  });

  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ['/api/affiliate/metrics'],
    queryFn: () => apiRequest('GET', '/api/affiliate/metrics'),
  });

  const { data: recommended } = useQuery({
    queryKey: ['/api/affiliate/recommended'],
    queryFn: () => apiRequest('GET', '/api/affiliate/recommended?count=6'),
  });

  const handleSportsbookClick = async (sportsbook: AffiliateSportsbook) => {
    try {
      // Track the click
      await apiRequest('POST', '/api/affiliate/click', {
        sportsbookId: sportsbook.id,
        referrer: window.location.href
      });

      // Get affiliate URL
      const response = await apiRequest('GET', `/api/affiliate/url/${sportsbook.id}`);
      if (response.url) {
        window.open(response.url, '_blank');
      }
    } catch (error) {
      console.error('Error tracking affiliate click:', error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (sportsbooksLoading || metricsLoading) {
    return (
      <div className="min-h-screen bg-charcoal text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin w-8 h-8 border-4 border-gold border-t-transparent rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Affiliate Marketing Dashboard
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Track your referral performance and earn commissions from our {sportsbooks?.sportsbooks?.length || 18} integrated sportsbook partners
            </p>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sportsbooks">Sportsbooks</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="offers">Special Offers</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">Total Clicks</CardTitle>
                    <Users className="h-4 w-4 text-gold" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">
                      {metrics?.totalClicks?.toLocaleString() || 0}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">Conversions</CardTitle>
                    <Target className="h-4 w-4 text-gold" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">
                      {metrics?.totalConversions?.toLocaleString() || 0}
                    </div>
                    <p className="text-xs text-gray-400">
                      {metrics?.conversionRate?.toFixed(1) || 0}% conversion rate
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">Revenue</CardTitle>
                    <TrendingUp className="h-4 w-4 text-gold" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">
                      {formatCurrency(metrics?.totalRevenue || 0)}
                    </div>
                    <p className="text-xs text-gray-400">
                      {formatCurrency(metrics?.avgDepositAmount || 0)} avg deposit
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">Commission</CardTitle>
                    <DollarSign className="h-4 w-4 text-gold" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gold">
                      {formatCurrency(metrics?.totalCommission || 0)}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Top Performing Sportsbooks */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Top Performing Sportsbooks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {metrics?.topSportsbooks?.slice(0, 5).map((sportsbook, index) => (
                      <div key={sportsbook.sportsbookId} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-charcoal font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{sportsbook.name}</h3>
                            <p className="text-sm text-gray-400">
                              {sportsbook.clicks} clicks • {sportsbook.conversions} conversions
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gold">
                            {formatCurrency(sportsbook.commission)}
                          </div>
                          <div className="text-sm text-gray-400">
                            {formatCurrency(sportsbook.revenue)} revenue
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sportsbooks">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sportsbooks?.sportsbooks?.map((sportsbook: AffiliateSportsbook) => (
                  <Card key={sportsbook.id} className="bg-gray-800 border-gray-700 hover:border-gold transition-colors">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white">{sportsbook.name}</CardTitle>
                        <Badge variant="outline" className="text-gold border-gold">
                          {sportsbook.commissionRate}% Commission
                        </Badge>
                      </div>
                      <CardDescription className="text-gray-400">
                        {formatCurrency(sportsbook.signupBonus)} signup bonus
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Min. Deposit:</span>
                          <span className="text-white">{formatCurrency(sportsbook.minimumDeposit)}</span>
                        </div>
                        {sportsbook.promoCode && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Promo Code:</span>
                            <Badge variant="secondary" className="text-gold">
                              {sportsbook.promoCode}
                            </Badge>
                          </div>
                        )}
                        <Button
                          onClick={() => handleSportsbookClick(sportsbook)}
                          className="w-full bg-gold hover:bg-gold/90 text-charcoal font-semibold"
                        >
                          Sign Up & Earn Commission
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="performance">
              <div className="space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Conversion Rate by Sportsbook</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {metrics?.topSportsbooks?.map((sportsbook) => {
                        const conversionRate = sportsbook.clicks > 0 ? (sportsbook.conversions / sportsbook.clicks) * 100 : 0;
                        return (
                          <div key={sportsbook.sportsbookId} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-300">{sportsbook.name}</span>
                              <span className="text-gold">{conversionRate.toFixed(1)}%</span>
                            </div>
                            <Progress value={conversionRate} className="h-2" />
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Revenue by Sportsbook</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {metrics?.topSportsbooks?.map((sportsbook) => {
                        const percentage = metrics.totalRevenue > 0 ? (sportsbook.revenue / metrics.totalRevenue) * 100 : 0;
                        return (
                          <div key={sportsbook.sportsbookId} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-300">{sportsbook.name}</span>
                              <span className="text-gold">{formatCurrency(sportsbook.revenue)}</span>
                            </div>
                            <Progress value={percentage} className="h-2" />
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="offers">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sportsbooks?.sportsbooks?.filter((book: AffiliateSportsbook) => book.specialOffers?.length > 0)
                  .map((sportsbook: AffiliateSportsbook) => (
                    <Card key={sportsbook.id} className="bg-gray-800 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white">{sportsbook.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {sportsbook.specialOffers?.map((offer) => (
                            <div key={offer.id} className="p-4 bg-gray-700 rounded-lg">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-white text-sm">{offer.title}</h3>
                                <Badge variant="outline" className="text-gold border-gold">
                                  {formatCurrency(offer.bonusAmount)}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-400 mb-2">{offer.description}</p>
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>{offer.requirements}</span>
                                <span className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {formatDate(offer.expiresAt)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}