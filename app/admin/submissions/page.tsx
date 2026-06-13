'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  service_type: string;
  status: string;
  created_at: string;
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('/api/contact');
        const data = await response.json();
        setSubmissions(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch submissions',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [toast]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/contact`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (response.ok) {
        setSubmissions(submissions.map(s => s.id === id ? { ...s, status: newStatus } : s));
        toast({
          title: 'Updated',
          description: 'Submission status updated',
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
      <h1 className="text-3xl font-bold text-foreground mb-6">Contact Submissions</h1>

      <div className="space-y-4">
        {loading ? (
          [...Array(5)].map((_, i) => <Skeleton key={i} className="h-24" />)
        ) : submissions.length === 0 ? (
          <Card className="p-6 bg-card border-border text-center text-muted-foreground">
            No submissions yet
          </Card>
        ) : (
          submissions.map(submission => (
            <Card key={submission.id} className="p-6 bg-card border-border">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Name</p>
                  <p className="text-foreground font-medium">{submission.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-foreground">{submission.email}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-foreground">{submission.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Service</p>
                  <p className="text-foreground">{submission.service_type || 'General'}</p>
                </div>
              </div>

              <p className="text-foreground mb-4">{submission.message}</p>

              <div className="flex gap-2 items-center justify-between">
                <div className="flex gap-2">
                  {['new', 'in_progress', 'resolved', 'archived'].map(status => (
                    <Button
                      key={status}
                      size="sm"
                      variant={submission.status === status ? 'default' : 'outline'}
                      onClick={() => updateStatus(submission.id, status)}
                    >
                      {status.replace('_', ' ')}
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(submission.created_at).toLocaleDateString()}
                </p>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
