import { Service } from '@/types/service';
import { Activity, Clock, Cpu, HardDrive, MoreVertical, Play, Square, RefreshCw, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ServiceCardProps {
  service: Service;
  onToggle: () => void;
  onRestart: () => void;
  onDelete: () => void;
}

const statusStyles = {
  running: {
    bg: 'bg-success',
    text: 'text-success',
    glow: 'glow-success',
  },
  stopped: {
    bg: 'bg-muted-foreground',
    text: 'text-muted-foreground',
    glow: '',
  },
  error: {
    bg: 'bg-destructive',
    text: 'text-destructive',
    glow: 'glow-destructive',
  },
};

const ServiceCard = ({ service, onToggle, onRestart, onDelete }: ServiceCardProps) => {
  const status = statusStyles[service.status];

  return (
    <div className="glass-card p-5 hover:border-primary/40 transition-all duration-300 animate-slide-up group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${status.bg} ${status.glow} status-pulse`} />
          <div>
            <h3 className="font-semibold text-foreground">{service.name}</h3>
            <p className="text-xs text-muted-foreground font-mono">{service.endpoint}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-card border-border">
            <DropdownMenuItem onClick={onRestart} className="cursor-pointer">
              <RefreshCw className="w-4 h-4 mr-2" /> Restart
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="cursor-pointer text-destructive focus:text-destructive">
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Activity className="w-3.5 h-3.5" />
          <span>{service.uptime} uptime</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          <span>{service.latency}ms</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <HardDrive className="w-3.5 h-3.5" />
          <span>{service.memory}MB</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Cpu className="w-3.5 h-3.5" />
          <span>{service.cpu}% CPU</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <span className="text-xs text-muted-foreground">
          Deployed {service.lastDeployed}
        </span>
        <Button
          size="sm"
          onClick={onToggle}
          variant={service.status === 'running' ? 'destructive' : 'default'}
          className="gap-2 h-8"
        >
          {service.status === 'running' ? (
            <>
              <Square className="w-3 h-3" /> Stop
            </>
          ) : (
            <>
              <Play className="w-3 h-3" /> Start
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;
