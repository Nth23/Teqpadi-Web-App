'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    message: '',
  });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Send WhatsApp message
        const phoneNumber = "234805328 3754"; // Nigerian number for WhatsApp
        const message = `Hello Teqpadi!\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.serviceType}\nMessage: ${formData.message}`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        // Show success message
        toast({
          title: 'Message Sent',
          description: 'We&apos;ll get back to you shortly! Opening WhatsApp...',
        });
        
        // Open WhatsApp after a brief delay
        setTimeout(() => {
          window.open(whatsappUrl, '_blank');
        }, 500);
        
        setFormData({ name: '', email: '', phone: '', serviceType: '', message: '' });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to send message. Please try again.',
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
    <form onSubmit={handleSubmit} className="space-y-6 bg-card rounded-lg border border-border p-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-foreground">Full Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          required
          className="bg-background"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange}
          required
          className="bg-background"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-foreground">Phone</Label>
        <Input
          id="phone"
          name="phone"
          placeholder="+233 XXX XXX XXXX"
          value={formData.phone}
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
          <option value="">Select a service</option>
          <option value="repair">Repair</option>
          <option value="trade_in">Trade-In</option>
          <option value="purchase">Purchase</option>
          <option value="inquiry">General Inquiry</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-foreground">Message</Label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell us how we can help..."
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
