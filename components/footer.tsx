"use client";

import Link from "next/link";
import {
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/teqpadi",
      color: "#E1306C",
    },
    {
      name: "TikTok",
      icon: Twitter,
      url: "https://tiktok.com/@teqpadi",
      color: "#000000",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/company/teqpadi",
      color: "#0A66C2",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com/teqpadi",
      color: "#1877F2",
    },
  ];

  const footerLinks = [
    {
      title: "Services",
      links: [
        { name: "Device Repairs", href: "/repair" },
        { name: "Trade-In Program", href: "/trade-in" },
        { name: "Browse Devices", href: "/prices" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Return Policy", href: "/returns" },
      ],
    },
  ];

  return (
    <footer className="relative" style={{ background: "#0d0a1a" }}>
      {/* Kente stripe */}
      <div
        className="h-1"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, #5b1fa8 0px, #5b1fa8 25%, #f5c800 25%, #f5c800 50%, #7c3dd6 50%, #7c3dd6 75%, #d4a800 75%, #d4a800 100%)`,
          backgroundSize: "80px 100%",
        }}
      />

      <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          {/* Brand section */}
          <div className="md:col-span-1">
            <img
              src="/images/Teqpadi_logo_3-removebg-preview.png"
              alt="Teqpadi"
              className="h-12 w-auto mb-4"
            />
            <p
              className="text-sm"
              style={{ color: "rgba(255, 255, 255, 0.6)" }}
            >
              Your trusted tech companion across Nigeria
            </p>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-bold mb-4 text-white">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-[#f5c800]"
                      style={{ color: "rgba(255, 255, 255, 0.6)" }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact info and social */}
        <div
          className="border-t"
          style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
        >
          <div className="py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Contact info */}
              <div>
                <h5 className="font-bold mb-4 text-white flex items-center gap-2">
                  <Phone className="w-4 h-4" style={{ color: "#f5c800" }} />
                  Contact
                </h5>
                <p
                  className="text-sm"
                  style={{ color: "rgba(255, 255, 255, 0.6)" }}
                >
                  +234 805 328 3754
                </p>
              </div>

              <div>
                <h5 className="font-bold mb-4 text-white flex items-center gap-2">
                  <Mail className="w-4 h-4" style={{ color: "#f5c800" }} />
                  Email
                </h5>
                <p
                  className="text-sm"
                  style={{ color: "rgba(255, 255, 255, 0.6)" }}
                >
                  hello@teqpadi.com
                </p>
              </div>

              <div>
                <h5 className="font-bold mb-4 text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4" style={{ color: "#f5c800" }} />
                  Location
                </h5>
                <p
                  className="text-sm"
                  style={{ color: "rgba(255, 255, 255, 0.6)" }}
                >
                  Lagos, Nigeria
                </p>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center justify-center gap-6 mb-12">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    style={{
                      background: "rgba(245, 200, 0, 0.12)",
                      color: "#f5c800",
                    }}
                    title={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="border-t pt-8"
          style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
        >
          <p
            className="text-center text-sm"
            style={{ color: "rgba(255, 255, 255, 0.5)" }}
          >
            {`© ${currentYear} Teqpadi. All rights reserved. Your Guy for All Tech Needs.`}
          </p>
        </div>
      </div>
    </footer>
  );
}
