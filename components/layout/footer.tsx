import Link from "next/link"
import { Phone, Mail, MapPin, Clock, Instagram, Twitter, Facebook } from "lucide-react"

const footerLinks = {
  services: [
    { href: "/prices", label: "Device Prices" },
    { href: "/repair", label: "Repair Services" },
    { href: "/trade-in", label: "Trade-In" },
    { href: "/contact", label: "Get a Quote" },
  ],
  devices: [
    { href: "/prices?category=phone", label: "Phones" },
    { href: "/prices?category=laptop", label: "Laptops" },
    { href: "/prices?category=console", label: "Consoles" },
    { href: "/prices?category=accessory", label: "Accessories" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQ" },
    { href: "/terms", label: "Terms of Service" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-card border-t border-border hidden md:block">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="relative w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl font-mono">T</span>
              </div>
              <span className="font-semibold text-xl tracking-tight">Teqpadi</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
              {"Nigeria's trusted destination for device repairs, fair pricing, and hassle-free trade-ins. We bring quality tech services to your doorstep."}
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Devices */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Devices</h3>
            <ul className="space-y-3">
              {footerLinks.devices.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-foreground">+234 805 328 3754</p>
                  <p className="text-xs text-muted-foreground">Mon-Sat, 8am-6pm</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-primary mt-0.5" />
                <p className="text-sm text-muted-foreground">hello@teqpadi.com</p>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Lagos, Nigeria
                </p>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-primary mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Mon - Sat: 8:00 AM - 6:00 PM<br />
                  Sunday: 10:00 AM - 4:00 PM
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} Teqpadi. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
