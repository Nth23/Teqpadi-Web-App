# Teqpadi - Premium Tech Repair & Trading PWA

A modern, fully-functional progressive web app built for Teqpadi, a leading tech repair and device trading platform in Ghana. The application provides real-time device price lookups, repair cost estimation, trade-in calculations, service booking, and a comprehensive admin dashboard.

## Features

### Customer-Facing Features

- **Device Price Lookup**: Search and compare prices for 25+ popular devices across multiple brands
- **Repair Cost Estimator**: Get instant repair cost quotes based on device model and service type
- **Trade-In Calculator**: Calculate accurate trade-in values for your devices
- **Service Booking**: Schedule repairs, consultations, or trade-in appointments
- **Contact Form**: Direct communication with the support team
- **Testimonials**: Real customer reviews and ratings
- **Responsive Design**: Fully optimized for mobile and desktop experiences

### Admin Dashboard

- **Submissions Management**: Track and manage customer inquiries
- **Booking Management**: View and update service appointment statuses
- **Testimonial Moderation**: Approve and feature customer reviews
- **Device Catalog**: View and manage device inventory
- **Analytics Dashboard**: Quick overview of key metrics

### Technical Features

- **Progressive Web App (PWA)**: Works offline with service worker support
- **Real-time Data**: Neon PostgreSQL integration for live database queries
- **API-First Architecture**: RESTful APIs for all features
- **Modern UI/UX**: Built with Next.js 16, React 19, Tailwind CSS, and Radix UI
- **Type-Safe**: Full TypeScript support
- **Performance Optimized**: Turbopack bundler, optimized images, lazy loading
- **Accessibility**: WCAG compliant, semantic HTML, ARIA labels

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **Database**: Neon PostgreSQL (serverless)
- **API**: Next.js API Routes
- **Data Fetching**: SWR for client-side caching and state management
- **Forms**: Native HTML5 with React hooks
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **PWA**: Service Workers, Web Manifest

## Database Schema

The application uses the following main tables:

- **brands**: Device manufacturers
- **devices**: Device models with specifications
- **device_prices**: Pricing information by condition and storage
- **repair_services**: Available repair services
- **repair_costs**: Service costs per device
- **contact_submissions**: Customer inquiries
- **testimonials**: Customer reviews
- **service_bookings**: Service appointments

## Getting Started

### Prerequisites

- Node.js 18+ (recommended 20+)
- npm or yarn
- Neon PostgreSQL database

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd teqpadi
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Then update `.env.local` with your Neon PostgreSQL connection string.

4. Initialize the database:
   The database schema is automatically created when needed. Seed data can be added through the admin panel or database scripts.

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Production Build

```bash
npm run build
npm run start
```

## Project Structure

```
/vercel/share/v0-project/
├── app/                          # Next.js app directory
│   ├── page.tsx                 # Home page
│   ├── prices/                  # Price lookup feature
│   ├── repair/                  # Repair estimator feature
│   ├── trade-in/                # Trade-in calculator
│   ├── contact/                 # Contact form
│   ├── booking/                 # Service booking
│   ├── admin/                   # Admin dashboard
│   ├── api/                     # API routes
│   ├── offline/                 # Offline fallback page
│   ├── layout.tsx               # Root layout with PWA setup
│   └── globals.css              # Global styles
├── components/                  # React components
│   ├── ui/                      # Reusable UI components
│   ├── layout/                  # Layout components
│   ├── home/                    # Homepage sections
│   ├── prices/                  # Price checker components
│   ├── repair/                  # Repair estimator components
│   ├── trade-in/                # Trade-in calculator components
│   ├── contact/                 # Contact form components
│   ├── booking/                 # Booking form components
│   └── admin/                   # Admin panel components
├── lib/
│   ├── utils.ts                # Utility functions
│   ├── db.ts                    # Database connection utilities
│   └── types.ts                 # TypeScript type definitions
├── public/
│   ├── sw.js                    # Service worker
│   ├── manifest.json            # PWA manifest
│   └── icons/                   # App icons
├── scripts/                     # Database migration scripts
└── tailwind.config.ts           # Tailwind configuration
```

## Key Pages and Routes

| Route                 | Purpose                                   |
| --------------------- | ----------------------------------------- |
| `/`                   | Homepage with hero and all main sections  |
| `/prices`             | Device price lookup with detailed pricing |
| `/repair`             | Repair cost estimation tool               |
| `/trade-in`           | Trade-in value calculator                 |
| `/contact`            | Contact form for customer inquiries       |
| `/booking`            | Service appointment booking               |
| `/admin`              | Admin dashboard                           |
| `/admin/submissions`  | Manage contact submissions                |
| `/admin/bookings`     | Manage service bookings                   |
| `/admin/testimonials` | Moderate customer testimonials            |
| `/admin/devices`      | View device catalog                       |
| `/offline`            | Offline fallback page                     |

## API Endpoints

The application provides the following REST API endpoints:

- `GET/POST /api/brands` - Brand management
- `GET/POST /api/devices` - Device management
- `GET/POST /api/prices` - Device pricing
- `GET/POST /api/repair-services` - Repair services
- `GET/POST /api/repair-costs` - Repair cost estimation
- `GET/POST /api/contact` - Contact submissions
- `GET/POST /api/bookings` - Service bookings
- `GET/POST /api/testimonials` - Customer testimonials

## Features Highlights

### 1. Smart Price Lookup

- Filter by brand, category, model, storage, and condition
- Real-time pricing from database
- Trade-in value calculator
- Price comparison across conditions

### 2. Repair Estimator

- Select device and issue type
- Get instant cost range
- Multiple repair service options
- Time estimates

### 3. Trade-In Calculator

- Device condition assessment
- Storage capacity selection
- Real-time value calculation
- Comparison with market rates

### 4. Service Booking

- Multi-step appointment scheduling
- Device information capture
- Preferred date and time selection
- Address collection for pickup/visit

### 5. Admin Dashboard

- Unified management interface
- Real-time statistics
- Status management
- Quick action buttons

## Deployment

The application is optimized for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Set the environment variables in Vercel project settings
3. Deploy with a single git push

For other platforms:

1. Build the application: `npm run build`
2. Start the server: `npm run start`
3. Ensure the `DATABASE_URL` environment variable is set

## Progressive Web App Features

The app includes full PWA support:

- **Offline Mode**: Service worker caches critical resources
- **Installable**: Add to homescreen on mobile and desktop
- **App-like Experience**: Full-screen mode, native navigation
- **Push Notifications Ready**: Framework in place for future notifications

To install as PWA:

1. Open the app in a browser
2. Look for "Install" or "Add to Home Screen" prompt
3. Alternatively, use the browser menu to install

## Performance Optimizations

- Turbopack bundler for fast builds
- Image optimization with next/image
- Code splitting and lazy loading
- CSS-in-JS with Tailwind for minimal CSS
- Service worker for offline support
- SWR for efficient data fetching and caching

## Security

- Environment variables for sensitive data
- Parameterized database queries (SQL injection prevention)
- CORS headers for API protection
- Input validation and sanitization
- Secure HTTP headers via Next.js

## Browser Support

- Chrome/Edge: 90+
- Firefox: 88+
- Safari: 14+
- Mobile browsers: All modern versions

## Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit your changes: `git commit -m 'Add amazing feature'`
3. Push to the branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## License

This project is proprietary to Teqpadi and all rights are reserved.

## Support

For support, contact support@teqpadi.com or visit the contact page in the application.

## Changelog

### Version 0.1.0 (Initial Release)

- Complete PWA with all core features
- Admin dashboard for content management
- Database integration with Neon
- Full mobile responsiveness
- SEO optimization
- Offline support

---

**Built with ❤️ for Teqpadi**
#   T e q p a d i - W e b - A p p  
 #   T e q p a d i - W e b - A p p  
 