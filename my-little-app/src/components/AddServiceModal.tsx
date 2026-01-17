import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface AddServiceModalProps {
  onAdd: (name: string, endpoint: string) => void;
}

const AddServiceModal = ({ onAdd }: AddServiceModalProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [endpoint, setEndpoint] = useState('/api/');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && endpoint.trim()) {
      onAdd(name.trim(), endpoint.trim());
      setName('');
      setEndpoint('/api/');
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 glow-primary">
          <Plus className="w-4 h-4" />
          Deploy Service
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Deploy New Service</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">Service Name</Label>
            <Input
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. User Service"
              className="bg-secondary border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endpoint" className="text-foreground">Endpoint</Label>
            <Input
              id="endpoint"
              value={endpoint}
              onChange={e => setEndpoint(e.target.value)}
              placeholder="/api/users"
              className="bg-secondary border-border font-mono text-sm"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 glow-primary">
              Deploy
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddServiceModal;
