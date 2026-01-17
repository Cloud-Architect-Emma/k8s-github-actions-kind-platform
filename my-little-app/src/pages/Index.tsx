import { Activity, AlertTriangle, CheckCircle, Clock, Server, Zap } from 'lucide-react';
import Header from '@/components/Header';
import StatCard from '@/components/StatCard';
import ServiceCard from '@/components/ServiceCard';
import AddServiceModal from '@/components/AddServiceModal';
import { useServices } from '@/hooks/useServices';
import { toast } from 'sonner';

const Index = () => {
  const {
    services,
    toggleServiceStatus,
    addService,
    deleteService,
    restartService,
    getStats,
  } = useServices();

  const stats = getStats();

  const handleToggle = (id: string, name: string, currentStatus: string) => {
    toggleServiceStatus(id);
    if (currentStatus === 'running') {
      toast.warning(`${name} has been stopped`);
    } else {
      toast.success(`${name} is now running`);
    }
  };

  const handleRestart = (id: string, name: string) => {
    restartService(id);
    toast.success(`${name} restarted successfully`);
  };

  const handleDelete = (id: string, name: string) => {
    deleteService(id);
    toast.error(`${name} has been deleted`);
  };

  const handleAdd = (name: string, endpoint: string) => {
    addService(name, endpoint);
    toast.success(`${name} deployed successfully`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <StatCard
            title="Running"
            value={stats.running}
            icon={CheckCircle}
            variant="success"
            trend="+2 this week"
            trendUp
          />
          <StatCard
            title="Stopped"
            value={stats.stopped}
            icon={Server}
          />
          <StatCard
            title="Errors"
            value={stats.errors}
            icon={AlertTriangle}
            variant="destructive"
          />
          <StatCard
            title="Total Requests"
            value={stats.totalRequests.toLocaleString()}
            icon={Activity}
            trend="+12.5%"
            trendUp
          />
          <StatCard
            title="Avg Latency"
            value={`${stats.avgLatency}ms`}
            icon={Zap}
            variant="warning"
          />
          <StatCard
            title="Memory Used"
            value={`${(stats.totalMemory / 1024).toFixed(1)}GB`}
            icon={Clock}
          />
        </div>

        {/* Services Section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Services</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Manage your microservices infrastructure
            </p>
          </div>
          <AddServiceModal onAdd={handleAdd} />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <div key={service.id} style={{ animationDelay: `${index * 0.1}s` }}>
              <ServiceCard
                service={service}
                onToggle={() => handleToggle(service.id, service.name, service.status)}
                onRestart={() => handleRestart(service.id, service.name)}
                onDelete={() => handleDelete(service.id, service.name)}
              />
            </div>
          ))}
        </div>

        {services.length === 0 && (
          <div className="glass-card p-12 text-center">
            <Server className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No services deployed</h3>
            <p className="text-muted-foreground mb-6">Deploy your first microservice to get started</p>
            <AddServiceModal onAdd={handleAdd} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-12">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between text-sm text-muted-foreground">
          <p>© 2026 MicroControl. All systems operational.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span>System Status: Healthy</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
