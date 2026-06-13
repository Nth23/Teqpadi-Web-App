'use client';

import { BookingForm } from '@/components/booking/booking-form';

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-32">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Book a Service</h1>
            <p className="text-lg text-muted-foreground">
              Schedule a repair, trade-in, or consultation appointment at your convenience.
            </p>
          </div>

          <div className="bg-card rounded-lg border border-border shadow-lg">
            <BookingForm />
          </div>
        </div>
      </div>
    </main>
  );
}
