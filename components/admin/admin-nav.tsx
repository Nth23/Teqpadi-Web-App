'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Mail, Calendar, Smartphone, MessageSquare, LogOut } from 'lucide-react';

export function AdminNav() {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Dashboard', icon: LayoutGrid },
    { href: '/admin/submissions', label: 'Submissions', icon: Mail },
    { href: '/admin/bookings', label: 'Bookings', icon: Calendar },
    { href: '/admin/devices', label: 'Devices', icon: Smartphone },
    { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
  ];

  return (
    <nav className="w-64 bg-card border-r border-border flex flex-col h-screen p-6 sticky top-0">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">Teqpadi Admin</h2>
        <p className="text-xs text-muted-foreground mt-1">Management Panel</p>
      </div>

      <div className="space-y-2 flex-1">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === href
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </Link>
        ))}
      </div>

      <Link
        href="/"
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
      >
        <LogOut className="w-5 h-5" />
        <span>Exit Admin</span>
      </Link>
    </nav>
  );
}
