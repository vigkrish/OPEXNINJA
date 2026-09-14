export type TradingDivisionSummary = {
  connected: boolean;
  health: 'healthy' | 'degraded' | 'disconnected';
  updated_at: string;
  certifications: { certified: number; probation: number; rejected: number };
  reconciliation: { clean: boolean | null; issues: number; last_run_at: string | null };
  executions: { recent: number; accepted: number; blocked: number; last_event_at: string | null };
  metrics: Record<string, number>;
  reason?: string;
};

const disconnected = (reason: string): TradingDivisionSummary => ({
  connected: false,
  health: 'disconnected',
  updated_at: new Date().toISOString(),
  certifications: { certified: 0, probation: 0, rejected: 0 },
  reconciliation: { clean: null, issues: 0, last_run_at: null },
  executions: { recent: 0, accepted: 0, blocked: 0, last_event_at: null },
  metrics: {},
  reason,
});

export async function getTradingDivisionSummary(): Promise<TradingDivisionSummary> {
  const endpoint = process.env.TRADING_TELEMETRY_URL || '';
  if (!endpoint) return disconnected('TRADING_TELEMETRY_URL_NOT_CONFIGURED');

  try {
    const response = await fetch(endpoint, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return disconnected(`TRADING_TELEMETRY_HTTP_${response.status}`);
    const payload = await response.json() as Partial<TradingDivisionSummary>;
    return {
      connected: true,
      health: payload.health === 'degraded' ? 'degraded' : 'healthy',
      updated_at: payload.updated_at || new Date().toISOString(),
      certifications: payload.certifications || { certified: 0, probation: 0, rejected: 0 },
      reconciliation: payload.reconciliation || { clean: null, issues: 0, last_run_at: null },
      executions: payload.executions || { recent: 0, accepted: 0, blocked: 0, last_event_at: null },
      metrics: payload.metrics || {},
    };
  } catch (error) {
    return disconnected(error instanceof Error ? error.message : 'TRADING_TELEMETRY_UNAVAILABLE');
  }
}
