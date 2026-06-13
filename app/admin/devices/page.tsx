'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface Device {
  id: string;
  brand: string;
  model: string;
  category: string;
  release_year: number;
  is_active: boolean;
}

export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch('/api/devices');
        const data = await response.json();
        setDevices(data);
      } catch (error) {
        console.error('Failed to fetch devices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-foreground mb-6">Devices Catalog</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          [...Array(6)].map((_, i) => <Skeleton key={i} className="h-40" />)
        ) : devices.length === 0 ? (
          <Card className="p-6 bg-card border-border text-center text-muted-foreground col-span-full">
            No devices yet
          </Card>
        ) : (
          devices.map(device => (
            <Card key={device.id} className="p-6 bg-card border-border">
              <p className="text-lg font-semibold text-foreground">{device.brand} {device.model}</p>
              <div className="mt-4 space-y-2 text-sm">
                <p><span className="text-muted-foreground">Category:</span> <span className="text-foreground capitalize">{device.category}</span></p>
                <p><span className="text-muted-foreground">Year:</span> <span className="text-foreground">{device.release_year}</span></p>
                <p><span className="text-muted-foreground">Status:</span> <span className={device.is_active ? 'text-green-600' : 'text-red-600'}>{device.is_active ? 'Active' : 'Inactive'}</span></p>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
