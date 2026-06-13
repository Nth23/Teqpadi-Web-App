'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

export function BookingForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [devicesLoading, setDevicesLoading] = useState(true);
  const [devices, setDevices] = useState<Array<{ id: string; model: string; brand: string }>>([]);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    serviceType: 'repair',
    deviceId: '',
    deviceDescription: '',
    issueDescription: '',
    preferredDate: '',
    preferredTime: '',
    address: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch('/api/devices');
        const data = await response.json();
        setDevices(data.slice(0, 20));
      } catch (error) {
        console.error('Failed to fetch devices:', error);
      } finally {
        setDevicesLoading(false);
      }
    };

    fetchDevices();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: 'Booking Confirmed',
          description: 'We&apos;ll contact you shortly to confirm your appointment.',
        });
        setFormData({
          customerName: '',
          customerEmail: '',
          customerPhone: '',
          serviceType: 'repair',
          deviceId: '',
          deviceDescription: '',
          issueDescription: '',
          preferredDate: '',
          preferredTime: '',
          address: '',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to book appointment. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="customerName" className="text-foreground">Full Name</Label>
          <Input
            id="customerName"
            name="customerName"
            placeholder="Your name"
            value={formData.customerName}
            onChange={handleChange}
            required
            className="bg-background"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="customerEmail" className="text-foreground">Email</Label>
          <Input
            id="customerEmail"
            name="customerEmail"
            type="email"
            placeholder="your@email.com"
            value={formData.customerEmail}
            onChange={handleChange}
            required
            className="bg-background"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="customerPhone" className="text-foreground">Phone</Label>
          <Input
            id="customerPhone"
            name="customerPhone"
            placeholder="+233 XXX XXX XXXX"
            value={formData.customerPhone}
            onChange={handleChange}
            required
            className="bg-background"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="serviceType" className="text-foreground">Service Type</Label>
          <select
            id="serviceType"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
          >
            <option value="repair">Repair</option>
            <option value="trade_in">Trade-In</option>
            <option value="purchase">Purchase</option>
            <option value="consultation">Consultation</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="deviceId" className="text-foreground">Device (Optional)</Label>
        {devicesLoading ? (
          <Skeleton className="w-full h-10" />
        ) : (
          <select
            id="deviceId"
            name="deviceId"
            value={formData.deviceId}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
          >
            <option value="">Select a device or describe below</option>
            {devices.map(device => (
              <option key={device.id} value={device.id}>
                {device.brand} {device.model}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="deviceDescription" className="text-foreground">Device Description</Label>
        <Input
          id="deviceDescription"
          name="deviceDescription"
          placeholder="e.g., iPhone 15 Pro Max, 256GB, Space Black"
          value={formData.deviceDescription}
          onChange={handleChange}
          className="bg-background"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="issueDescription" className="text-foreground">Issue Description</Label>
        <textarea
          id="issueDescription"
          name="issueDescription"
          placeholder="Describe the issue with your device..."
          value={formData.issueDescription}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="preferredDate" className="text-foreground">Preferred Date</Label>
          <Input
            id="preferredDate"
            name="preferredDate"
            type="date"
            value={formData.preferredDate}
            onChange={handleChange}
            required
            className="bg-background"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferredTime" className="text-foreground">Preferred Time</Label>
          <select
            id="preferredTime"
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
          >
            <option value="">Select time</option>
            <option value="09:00">9:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="12:00">12:00 PM</option>
            <option value="14:00">2:00 PM</option>
            <option value="15:00">3:00 PM</option>
            <option value="16:00">4:00 PM</option>
            <option value="17:00">5:00 PM</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address" className="text-foreground">Address</Label>
        <textarea
          id="address"
          name="address"
          placeholder="Your address for pickup or visit"
          value={formData.address}
          onChange={handleChange}
          rows={2}
          className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? 'Booking...' : 'Book Appointment'}
      </Button>
    </form>
  );
}
