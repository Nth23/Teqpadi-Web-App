'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface ServiceBooking {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  service_type: string;
  preferred_date: string;
  preferred_time: string;
  status: string;
  created_at: string;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<ServiceBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/bookings');
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch bookings',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [toast]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/bookings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (response.ok) {
        setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
        toast({
          title: 'Updated',
          description: 'Booking status updated',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update status',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-foreground mb-6">Service Bookings</h1>

      <div className="space-y-4">
        {loading ? (
          [...Array(5)].map((_, i) => <Skeleton key={i} className="h-24" />)
        ) : bookings.length === 0 ? (
          <Card className="p-6 bg-card border-border text-center text-muted-foreground">
            No bookings yet
          </Card>
        ) : (
          bookings.map(booking => (
            <Card key={booking.id} className="p-6 bg-card border-border">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Name</p>
                  <p className="text-foreground font-medium">{booking.customer_name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-foreground">{booking.customer_email}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Service</p>
                  <p className="text-foreground capitalize">{booking.service_type.replace('_', ' ')}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Appointment</p>
                  <p className="text-foreground">{booking.preferred_date} at {booking.preferred_time}</p>
                </div>
              </div>

              <div className="flex gap-2 items-center justify-between">
                <div className="flex gap-2">
                  {['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'].map(status => (
                    <Button
                      key={status}
                      size="sm"
                      variant={booking.status === status ? 'default' : 'outline'}
                      onClick={() => updateStatus(booking.id, status)}
                    >
                      {status.replace('_', ' ')}
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(booking.created_at).toLocaleDateString()}
                </p>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
