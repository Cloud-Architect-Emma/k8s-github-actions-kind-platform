import { Activity, Bell, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="border-b border-border/50 bg-card/30 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center glow-primary">
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gradient">MicroControl</h1>
            <p className="text-xs text-muted-foreground">Service Management</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <button className="text-sm text-foreground hover:text-primary transition-colors font-medium">
            Dashboard
          </button>
          <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Services
          </button>
          <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Logs
          </button>
          <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Metrics
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="ml-2">
            <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
