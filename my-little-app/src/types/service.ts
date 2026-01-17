export interface Service {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'error';
  endpoint: string;
  uptime: string;
  requests: number;
  latency: number;
  memory: number;
  cpu: number;
  lastDeployed: string;
}
