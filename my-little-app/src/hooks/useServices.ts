import { useState, useEffect } from 'react';
import { Service } from '@/types/service';

const STORAGE_KEY = 'microservices-data';

const defaultServices: Service[] = [
  {
    id: '1',
    name: 'Auth Service',
    status: 'running',
    endpoint: '/api/auth',
    uptime: '99.98%',
    requests: 45230,
    latency: 23,
    memory: 256,
    cpu: 12,
    lastDeployed: '2h ago',
  },
  {
    id: '2',
    name: 'Payment Gateway',
    status: 'running',
    endpoint: '/api/payments',
    uptime: '99.95%',
    requests: 12450,
    latency: 45,
    memory: 512,
    cpu: 28,
    lastDeployed: '1d ago',
  },
  {
    id: '3',
    name: 'Notification Hub',
    status: 'stopped',
    endpoint: '/api/notify',
    uptime: '98.50%',
    requests: 8920,
    latency: 15,
    memory: 128,
    cpu: 5,
    lastDeployed: '3d ago',
  },
  {
    id: '4',
    name: 'Analytics Engine',
    status: 'running',
    endpoint: '/api/analytics',
    uptime: '99.99%',
    requests: 89340,
    latency: 78,
    memory: 1024,
    cpu: 45,
    lastDeployed: '5h ago',
  },
  {
    id: '5',
    name: 'File Storage',
    status: 'error',
    endpoint: '/api/storage',
    uptime: '95.20%',
    requests: 3420,
    latency: 120,
    memory: 2048,
    cpu: 65,
    lastDeployed: '1w ago',
  },
];

export const useServices = () => {
  const [services, setServices] = useState<Service[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultServices;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
  }, [services]);

  const toggleServiceStatus = (id: string) => {
    setServices(prev =>
      prev.map(service =>
        service.id === id
          ? {
              ...service,
              status: service.status === 'running' ? 'stopped' : 'running',
            }
          : service
      )
    );
  };

  const addService = (name: string, endpoint: string) => {
    const newService: Service = {
      id: Date.now().toString(),
      name,
      endpoint,
      status: 'stopped',
      uptime: '0%',
      requests: 0,
      latency: 0,
      memory: 64,
      cpu: 0,
      lastDeployed: 'Just now',
    };
    setServices(prev => [...prev, newService]);
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(service => service.id !== id));
  };

  const restartService = (id: string) => {
    setServices(prev =>
      prev.map(service =>
        service.id === id
          ? { ...service, status: 'running', lastDeployed: 'Just now' }
          : service
      )
    );
  };

  const getStats = () => {
    const running = services.filter(s => s.status === 'running').length;
    const stopped = services.filter(s => s.status === 'stopped').length;
    const errors = services.filter(s => s.status === 'error').length;
    const totalRequests = services.reduce((acc, s) => acc + s.requests, 0);
    const avgLatency = Math.round(
      services.reduce((acc, s) => acc + s.latency, 0) / services.length
    );
    const totalMemory = services.reduce((acc, s) => acc + s.memory, 0);

    return { running, stopped, errors, totalRequests, avgLatency, totalMemory };
  };

  return {
    services,
    toggleServiceStatus,
    addService,
    deleteService,
    restartService,
    getStats,
  };
};
