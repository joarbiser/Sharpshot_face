// src/lib/featureFlags.ts
export const FEATURE_FLAGS = {
  STRICT_STATUS_LABELS: process.env.STRICT_STATUS_LABELS === 'true' || process.env.NODE_ENV === 'development'
} as const;

export function validateStrictStatusLabels() {
  if (!FEATURE_FLAGS.STRICT_STATUS_LABELS) return;
  
  console.info('[FEATURE-FLAG] STRICT_STATUS_LABELS enabled - enforcing truthStatus-only labeling');
}