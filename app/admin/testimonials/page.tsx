'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  is_featured: boolean;
  is_approved: boolean;
  created_at: string;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials');
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch testimonials',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [toast]);

  const toggleApproved = async (id: string, approved: boolean) => {
    try {
      const response = await fetch(`/api/testimonials`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_approved: !approved }),
      });

      if (response.ok) {
        setTestimonials(testimonials.map(t => t.id === id ? { ...t, is_approved: !approved } : t));
        toast({
          title: 'Updated',
          description: 'Testimonial approval status updated',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update testimonial',
        variant: 'destructive',
      });
    }
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    try {
      const response = await fetch(`/api/testimonials`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_featured: !featured }),
      });

      if (response.ok) {
        setTestimonials(testimonials.map(t => t.id === id ? { ...t, is_featured: !featured } : t));
        toast({
          title: 'Updated',
          description: 'Testimonial featured status updated',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update testimonial',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-foreground mb-6">Testimonials</h1>

      <div className="space-y-4">
        {loading ? (
          [...Array(5)].map((_, i) => <Skeleton key={i} className="h-32" />)
        ) : testimonials.length === 0 ? (
          <Card className="p-6 bg-card border-border text-center text-muted-foreground">
            No testimonials yet
          </Card>
        ) : (
          testimonials.map(testimonial => (
            <Card key={testimonial.id} className="p-6 bg-card border-border">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-lg font-semibold text-foreground">{testimonial.name}</p>
                  <div className="flex gap-1">
                    {'⭐'.repeat(testimonial.rating)}
                  </div>
                </div>
                <p className="text-foreground">{testimonial.content}</p>
              </div>

              <div className="flex gap-2 items-center justify-between">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={testimonial.is_approved ? 'default' : 'outline'}
                    onClick={() => toggleApproved(testimonial.id, testimonial.is_approved)}
                  >
                    {testimonial.is_approved ? 'Approved' : 'Approve'}
                  </Button>
                  <Button
                    size="sm"
                    variant={testimonial.is_featured ? 'default' : 'outline'}
                    onClick={() => toggleFeatured(testimonial.id, testimonial.is_featured)}
                  >
                    {testimonial.is_featured ? 'Featured' : 'Feature'}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(testimonial.created_at).toLocaleDateString()}
                </p>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
