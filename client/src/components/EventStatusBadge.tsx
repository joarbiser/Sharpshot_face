import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { type TruthStatus } from "../../../src/lib/eventStatus";

interface EventStatusBadgeProps {
  truthStatus: TruthStatus;
  className?: string;
  "data-testid"?: string;
}

export function EventStatusBadge({ truthStatus, className = "", "data-testid": testId }: EventStatusBadgeProps) {
  const getStatusConfig = (status: TruthStatus) => {
    switch (status) {
      case 'LIVE':
        return {
          label: 'Live',
          variant: 'destructive' as const,
          className: 'bg-red-500 text-white hover:bg-red-600'
        };
      case 'UPCOMING':
        return {
          label: 'Upcoming',
          variant: 'secondary' as const,
          className: 'bg-blue-500 text-white hover:bg-blue-600'
        };
      case 'FINISHED':
        return {
          label: 'Final',
          variant: 'outline' as const,
          className: 'bg-gray-500 text-white hover:bg-gray-600'
        };
      case 'UNKNOWN':
        return {
          label: '—',
          variant: 'outline' as const,
          className: 'bg-gray-400 text-white hover:bg-gray-500'
        };
      default:
        return {
          label: '—',
          variant: 'outline' as const,
          className: 'bg-gray-400 text-white hover:bg-gray-500'
        };
    }
  };

  const { label, variant, className: statusClassName } = getStatusConfig(truthStatus);

  const badge = (
    <Badge 
      variant={variant} 
      className={`${statusClassName} ${className} text-xs font-medium`}
      data-testid={testId}
    >
      {label}
    </Badge>
  );

  // Add tooltip for UNKNOWN status
  if (truthStatus === 'UNKNOWN') {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {badge}
          </TooltipTrigger>
          <TooltipContent>
            <p>Event status unavailable from provider; not showing Live to avoid false positives.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return badge;
}