import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Clock, Zap } from 'lucide-react';

interface LaunchStatus {
  isLaunchReady: boolean;
  demoStatus: {
    isActive: boolean;
    daysRemaining: number;
    message: string;
  };
  systemHealth: {
    booksScanned: number;
    evSignals: number;
    arbitrageOpportunities: number;
    lastUpdate: string;
  };
  dataQuality: {
    liveOpportunities: number;
    upcomingOpportunities: number;
    totalGamesTracked: number;
    lastValidated: string;
  };
  launchReport: string[];
  timestamp: string;
}

export default function LaunchStatusWidget() {
  const { data: launchStatus, isLoading } = useQuery<LaunchStatus>({
    queryKey: ['/api/launch-status'],
    refetchInterval: 30000, // Refresh every 30 seconds for real-time monitoring
  });

  // Additional data integrity monitoring
  const { data: oddsAccuracy } = useQuery({
    queryKey: ['/api/data-integrity/odds-accuracy'],
    refetchInterval: 60000, // Refresh every minute for accuracy monitoring
  });

  if (isLoading || !launchStatus) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-[#D8AC35] dark:text-[#00ff41] animate-pulse" />
            Launch Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600 dark:text-gray-400">Loading system status...</div>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (isReady: boolean) => {
    return isReady ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  };

  const getStatusIcon = (isReady: boolean) => {
    return isReady ? 
      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" /> : 
      <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />;
  };

  return (
    <Card className="w-full border-[#D8AC35]/20 dark:border-[#00ff41]/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-[#D8AC35] dark:text-[#00ff41]" />
          Launch Status
          <Badge variant={launchStatus.isLaunchReady ? "default" : "destructive"} className="ml-auto">
            {launchStatus.isLaunchReady ? 'READY' : 'NOT READY'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Demo Status */}
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#D8AC35] dark:text-[#00ff41]" />
            <span className="font-medium">Demo Access</span>
          </div>
          <div className="text-right">
            <div className={`font-mono text-sm ${getStatusColor(launchStatus.demoStatus.isActive)}`}>
              {launchStatus.demoStatus.daysRemaining} days remaining
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {launchStatus.demoStatus.message}
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Sportsbooks Active</div>
            <div className="text-xl font-bold text-[#D8AC35] dark:text-[#00ff41]">
              {launchStatus.systemHealth.booksScanned}
            </div>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Live Opportunities</div>
            <div className="text-xl font-bold text-[#D8AC35] dark:text-[#00ff41]">
              {launchStatus.dataQuality.liveOpportunities + launchStatus.dataQuality.upcomingOpportunities}
            </div>
          </div>
        </div>

        {/* Launch Report */}
        <div className="space-y-2">
          <div className="text-sm font-medium">System Checks:</div>
          <div className="space-y-1">
            {launchStatus.launchReport.map((item, index) => {
              const isSuccess = item.includes('✅');
              const isWarning = item.includes('⚠️');
              const isError = item.includes('❌');
              
              return (
                <div 
                  key={index} 
                  className={`flex items-center gap-2 text-xs p-2 rounded ${
                    isSuccess ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' :
                    isWarning ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300' :
                    isError ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300' :
                    'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {getStatusIcon(isSuccess)}
                  <span className="font-mono">{item.replace(/[✅⚠️❌]/g, '').trim()}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Data Accuracy Section */}
        {oddsAccuracy && (
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-sm font-medium mb-2">Data Accuracy</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Freshness: </span>
                <span className={`font-mono ${oddsAccuracy.dataFreshness?.freshnessPercentage > 95 ? 'text-green-600' : 'text-yellow-600'}`}>
                  {oddsAccuracy.dataFreshness?.freshnessPercentage?.toFixed(1) || 0}%
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Accuracy: </span>
                <span className={`font-mono ${oddsAccuracy.oddsAccuracy?.accuracyPercentage > 98 ? 'text-green-600' : 'text-yellow-600'}`}>
                  {oddsAccuracy.oddsAccuracy?.accuracyPercentage?.toFixed(1) || 0}%
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Last Updated */}
        <div className="text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
          Last validated: {new Date(launchStatus.timestamp).toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  );
}