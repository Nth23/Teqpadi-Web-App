'use client';

import { ContactForm } from '@/components/contact/contact-form';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-32">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Get in Touch</h1>
            <p className="text-lg text-muted-foreground">
              Have questions? We&apos;re here to help. Reach out to us anytime across Nigeria.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <ContactForm />
            
            <div className="space-y-8">
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Address</p>
                    <p className="text-foreground">Teqpadi Tech Hub, Lagos, Nigeria</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <p className="text-foreground">+234 805 328 3754</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">WhatsApp</p>
                    <p className="text-foreground">+234 805 328 3754</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="text-foreground">support@teqpadi.com</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Hours</p>
                    <p className="text-foreground">Mon - Fri: 9AM - 6PM</p>
                    <p className="text-foreground">Sat: 10AM - 4PM</p>
                    <p className="text-foreground">Sun: Closed</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-primary/20 p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Quick Response Time</h3>
                <p className="text-sm text-muted-foreground">
                  We typically respond to inquiries within 2 hours during business hours. You can also reach us directly via WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
