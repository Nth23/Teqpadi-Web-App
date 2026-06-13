-- Teqpadi Database Schema
-- Create tables for devices, prices, repairs, and contacts

-- Device brands table
CREATE TABLE IF NOT EXISTS brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Devices table
CREATE TABLE IF NOT EXISTS devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  model VARCHAR(200) NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('phone', 'laptop', 'console', 'accessory', 'tablet')),
  storage_options TEXT[] DEFAULT '{}',
  image_url TEXT,
  release_year INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Device prices table
CREATE TABLE IF NOT EXISTS device_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id UUID NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
  storage VARCHAR(50) NOT NULL,
  condition VARCHAR(20) NOT NULL CHECK (condition IN ('new', 'like_new', 'good', 'fair', 'poor')),
  price INTEGER NOT NULL CHECK (price >= 0),
  trade_in_value INTEGER NOT NULL DEFAULT 0 CHECK (trade_in_value >= 0),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(device_id, storage, condition)
);

-- Repair services table
CREATE TABLE IF NOT EXISTS repair_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50),
  category VARCHAR(50) CHECK (category IN ('phone', 'laptop', 'console', 'general')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Repair costs table
CREATE TABLE IF NOT EXISTS repair_costs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id UUID NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES repair_services(id) ON DELETE CASCADE,
  min_cost INTEGER NOT NULL CHECK (min_cost >= 0),
  max_cost INTEGER NOT NULL CHECK (max_cost >= min_cost),
  estimated_time VARCHAR(50),
  notes TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(device_id, service_id)
);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  service_type VARCHAR(50),
  device_info TEXT,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  is_featured BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service bookings table
CREATE TABLE IF NOT EXISTS service_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name VARCHAR(100) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  service_type VARCHAR(50) NOT NULL CHECK (service_type IN ('repair', 'trade_in', 'purchase', 'consultation')),
  device_id UUID REFERENCES devices(id),
  device_description TEXT,
  issue_description TEXT,
  preferred_date DATE,
  preferred_time VARCHAR(20),
  address TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_devices_brand ON devices(brand_id);
CREATE INDEX IF NOT EXISTS idx_devices_category ON devices(category);
CREATE INDEX IF NOT EXISTS idx_devices_active ON devices(is_active);
CREATE INDEX IF NOT EXISTS idx_device_prices_device ON device_prices(device_id);
CREATE INDEX IF NOT EXISTS idx_device_prices_condition ON device_prices(condition);
CREATE INDEX IF NOT EXISTS idx_repair_costs_device ON repair_costs(device_id);
CREATE INDEX IF NOT EXISTS idx_repair_costs_service ON repair_costs(service_id);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(is_featured, is_approved);
CREATE INDEX IF NOT EXISTS idx_service_bookings_status ON service_bookings(status);
CREATE INDEX IF NOT EXISTS idx_service_bookings_date ON service_bookings(preferred_date);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
DROP TRIGGER IF EXISTS update_devices_updated_at ON devices;
CREATE TRIGGER update_devices_updated_at
  BEFORE UPDATE ON devices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_device_prices_updated_at ON device_prices;
CREATE TRIGGER update_device_prices_updated_at
  BEFORE UPDATE ON device_prices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_repair_costs_updated_at ON repair_costs;
CREATE TRIGGER update_repair_costs_updated_at
  BEFORE UPDATE ON repair_costs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_service_bookings_updated_at ON service_bookings;
CREATE TRIGGER update_service_bookings_updated_at
  BEFORE UPDATE ON service_bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
