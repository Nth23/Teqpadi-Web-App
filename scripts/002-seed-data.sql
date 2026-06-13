-- Seed data for Teqpadi database

-- Insert brands
INSERT INTO brands (name, logo_url) VALUES
  ('Apple', '/brands/apple.svg'),
  ('Samsung', '/brands/samsung.svg'),
  ('Google', '/brands/google.svg'),
  ('OnePlus', '/brands/oneplus.svg'),
  ('Xiaomi', '/brands/xiaomi.svg'),
  ('HP', '/brands/hp.svg'),
  ('Dell', '/brands/dell.svg'),
  ('Lenovo', '/brands/lenovo.svg'),
  ('Sony', '/brands/sony.svg'),
  ('Microsoft', '/brands/microsoft.svg'),
  ('Nintendo', '/brands/nintendo.svg'),
  ('Tecno', '/brands/tecno.svg'),
  ('Infinix', '/brands/infinix.svg')
ON CONFLICT (name) DO NOTHING;

-- Insert repair services
INSERT INTO repair_services (name, description, icon, category) VALUES
  ('Screen Replacement', 'Replace cracked or damaged screens with original or quality parts', 'monitor', 'phone'),
  ('Battery Replacement', 'Replace worn out batteries for better performance', 'battery', 'phone'),
  ('Charging Port Repair', 'Fix charging issues and replace damaged ports', 'plug', 'phone'),
  ('Water Damage Repair', 'Specialized treatment for water-damaged devices', 'droplet', 'general'),
  ('Software Issues', 'Fix OS issues, virus removal, and software optimization', 'code', 'general'),
  ('Camera Repair', 'Fix or replace front and back cameras', 'camera', 'phone'),
  ('Speaker/Mic Repair', 'Fix audio issues, replace speakers or microphones', 'volume-2', 'phone'),
  ('Back Cover Replacement', 'Replace cracked or damaged back covers', 'smartphone', 'phone'),
  ('Keyboard Replacement', 'Replace damaged laptop keyboards', 'keyboard', 'laptop'),
  ('Hard Drive/SSD Upgrade', 'Upgrade storage or replace failing drives', 'hard-drive', 'laptop'),
  ('RAM Upgrade', 'Increase your device memory for better performance', 'cpu', 'laptop'),
  ('Motherboard Repair', 'Diagnose and fix motherboard issues', 'circuit-board', 'general'),
  ('HDMI Port Repair', 'Fix or replace damaged HDMI ports on consoles', 'monitor', 'console'),
  ('Controller Repair', 'Fix joystick drift and button issues', 'gamepad-2', 'console'),
  ('General Diagnostics', 'Comprehensive device checkup and issue identification', 'search', 'general')
ON CONFLICT (name) DO NOTHING;

-- Insert sample devices (phones)
INSERT INTO devices (brand_id, model, category, storage_options, release_year, is_active)
SELECT b.id, 'iPhone 15 Pro Max', 'phone', ARRAY['256GB', '512GB', '1TB'], 2023, true
FROM brands b WHERE b.name = 'Apple'
ON CONFLICT DO NOTHING;

INSERT INTO devices (brand_id, model, category, storage_options, release_year, is_active)
SELECT b.id, 'iPhone 15 Pro', 'phone', ARRAY['128GB', '256GB', '512GB', '1TB'], 2023, true
FROM brands b WHERE b.name = 'Apple'
ON CONFLICT DO NOTHING;

INSERT INTO devices (brand_id, model, category, storage_options, release_year, is_active)
SELECT b.id, 'iPhone 15', 'phone', ARRAY['128GB', '256GB', '512GB'], 2023, true
FROM brands b WHERE b.name = 'Apple'
ON CONFLICT DO NOTHING;

INSERT INTO devices (brand_id, model, category, storage_options, release_year, is_active)
SELECT b.id, 'iPhone 14 Pro Max', 'phone', ARRAY['128GB', '256GB', '512GB', '1TB'], 2022, true
FROM brands b WHERE b.name = 'Apple'
ON CONFLICT DO NOTHING;

INSERT INTO devices (brand_id, model, category, storage_options, release_year, is_active)
SELECT b.id, 'iPhone 14 Pro', 'phone', ARRAY['128GB', '256GB', '512GB', '1TB'], 2022, true
FROM brands b WHERE b.name = 'Apple'
ON CONFLICT DO NOTHING;

INSERT INTO devices (brand_id, model, category, storage_options, release_year, is_active)
SELECT b.id, 'iPhone 14', 'phone', ARRAY['128GB', '256GB', '512GB'], 2022, true
FROM brands b WHERE b.name = 'Apple'
ON CONFLICT DO NOTHING;

INSERT INTO devices (brand_id, model, category, storage_options, release_year, is_active)
SELECT b.id, 'iPhone 13', 'phone', ARRAY['128GB', '256GB', '512GB'], 2021, true
FROM brands b WHERE b.name = 'Apple'
ON CONFLICT DO NOTHING;

INSERT INTO devices (brand_id, model, category, storage_options, release_year, is_active)
SELECT b.id, 'Samsung Galaxy S24 Ultra', 'phone', ARRAY['256GB', '512GB', '1TB'], 2024, true
FROM brands b WHERE b.name = 'Samsung'
ON CONFLICT DO NOTHING;

INSERT INTO devices (brand_id, model, category, storage_options, release_year, is_active)
SELECT b.id, 'Samsung Galaxy S24+', 'phone', ARRAY['256GB', '512GB'], 2024, true
FROM brands b WHERE b.name = 'Samsung'
ON CONFLICT DO NOTHING;

INSERT INTO devices (brand_id, model, category, storage_options, release_year, is_active)
SELECT b.id, 'Samsung Galaxy S24', 'phone', ARRAY['128GB', '256GB'], 2024, true
FROM brands b WHERE b.name = 'Samsung'
ON CONFLICT DO NOTHING;

INSERT INTO devices (brand_id, model, category, storage_options, release_year, is_active)
SELECT b.id, 'Samsung Galaxy S23 Ultra', 'phone', ARRAY['256GB', '512GB', '1TB'], 2023, true
FROM brands b WHERE b.name = 'Samsung'
ON CONFLICT DO NOTHING;

INSERT INTO devices (brand_id, model, category, storage_options, release_year, is_active)
SELECT b.id, 'Samsung Galaxy Z Fold 5', 'phone', ARRAY['256GB', '512GB', '1TB'], 2023, true
FROM brands b WHERE b.name = 'Samsung'
ON CONFLICT DO NOTHING;

INSERT INTO devices (brand_id, model, category, storage_options, release_year, is_active)
SELECT b.id, 'Samsung Galaxy Z Flip 5', 'phone', ARRAY['256GB', '512GB'], 2023, true
FROM brands b WHERE b.name = 'Samsung'
ON CONFLICT DO NOTHING;

INSERT INTO devices (brand_id, model, category, storage_options, release_year, is_active)
SELECT b.id, 'Google Pixel 8 Pro', 'phone', ARRAY['128GB', '256GB', '512GB', '1TB'], 2023, true
FROM brands b WHERE b.name = 'Google'
ON CONFLICT DO NOTHING;

INSERT INTO devices (brand_id, model, category, storage_options, release_year, is_active)
SELECT b.id, 'Google Pixel 8', 'phone', ARRAY['128GB', '256GB'], 2023, true
FROM brands b WHERE b.name = 'Google'
ON CONFLICT DO NOTHING;

INSERT INTO devices (brand_id, model, category, storage_options, release_year, is_active)
SELECT b.id, 'Tecno Phantom X2 Pro', 'phone', ARRAY['256GB'], 2023, true
FROM brands b WHERE b.name = 'Tecno'
ON CONFLICT DO NOTHING;

INSERT INTO devices (brand_id, model, category, storage_options, release_year, is_active)
SELECT b.id, 'Tecno Camon 20 Pro', 'phone', ARRAY['256GB'], 2023, true
FROM brands b WHERE b.name = 'Tecno'
ON CONFLICT DO NOTHING;

INSERT INTO devices (brand_id, model, category, storage_options, release_year, is_active)
SELECT b.id, 'Infinix Note 30 Pro', 'phone', ARRAY['256GB'], 2023, true
FROM brands b WHERE b.name = 'Infinix'
ON CONFLICT DO NOTHING;

-- Insert sample laptops
INSERT INTO devices (brand_id, model, category, storage_options, release_year, is_active)
SELECT b.id, 'MacBook Pro 16" M3 Max', 'laptop', ARRAY['512GB', '1TB', '2TB', '4TB'], 2023, true
FROM brands b WHERE b.name = 'Apple'
ON CONFLICT DO NOTHING;

INSERT INTO devices (brand_id, model, category, storage_options, release_year, is_active)
SELECT b.id, 'MacBook Pro 14" M3 Pro', 'laptop', ARRAY['512GB', '1TB', '2TB'], 2023, true
FROM brands b WHERE b.name = 'Apple'
ON CONFLICT DO NOTHING;

INSERT INTO devices (brand_id, model, category, storage_options, release_year, is_active)
SELECT b.id, 'MacBook Air 15" M3', 'laptop', ARRAY['256GB', '512GB', '1TB'], 2024, true
FROM brands b WHERE b.name = 'Apple'
ON CONFLICT DO NOTHING;

INSERT INTO devices (brand_id, model, category, storage_options, release_year, is_active)
SELECT b.id, 'MacBook Air 13" M3', 'laptop', ARRAY['256GB', '512GB', '1TB'], 2024, true
FROM brands b WHERE b.name = 'Apple'
ON CONFLICT DO NOTHING;

INSERT INTO devices (brand_id, model, category, storage_options, release_year, is_active)
SELECT b.id, 'HP Spectre x360', 'laptop', ARRAY['512GB', '1TB'], 2023, true
FROM brands b WHERE b.name = 'HP'
ON CONFLICT DO NOTHING;

INSERT INTO devices (brand_id, model, category, storage_options, release_year, is_active)
SELECT b.id, 'Dell XPS 15', 'laptop', ARRAY['512GB', '1TB', '2TB'], 2023, true
FROM brands b WHERE b.name = 'Dell'
ON CONFLICT DO NOTHING;

INSERT INTO devices (brand_id, model, category, storage_options, release_year, is_active)
SELECT b.id, 'Lenovo ThinkPad X1 Carbon', 'laptop', ARRAY['256GB', '512GB', '1TB'], 2023, true
FROM brands b WHERE b.name = 'Lenovo'
ON CONFLICT DO NOTHING;

-- Insert sample consoles
INSERT INTO devices (brand_id, model, category, storage_options, release_year, is_active)
SELECT b.id, 'PlayStation 5', 'console', ARRAY['825GB', '1TB'], 2020, true
FROM brands b WHERE b.name = 'Sony'
ON CONFLICT DO NOTHING;

INSERT INTO devices (brand_id, model, category, storage_options, release_year, is_active)
SELECT b.id, 'PlayStation 5 Slim', 'console', ARRAY['1TB'], 2023, true
FROM brands b WHERE b.name = 'Sony'
ON CONFLICT DO NOTHING;

INSERT INTO devices (brand_id, model, category, storage_options, release_year, is_active)
SELECT b.id, 'Xbox Series X', 'console', ARRAY['1TB'], 2020, true
FROM brands b WHERE b.name = 'Microsoft'
ON CONFLICT DO NOTHING;

INSERT INTO devices (brand_id, model, category, storage_options, release_year, is_active)
SELECT b.id, 'Xbox Series S', 'console', ARRAY['512GB', '1TB'], 2020, true
FROM brands b WHERE b.name = 'Microsoft'
ON CONFLICT DO NOTHING;

INSERT INTO devices (brand_id, model, category, storage_options, release_year, is_active)
SELECT b.id, 'Nintendo Switch OLED', 'console', ARRAY['64GB'], 2021, true
FROM brands b WHERE b.name = 'Nintendo'
ON CONFLICT DO NOTHING;

-- Insert testimonials
INSERT INTO testimonials (name, content, rating, is_featured, is_approved) VALUES
  ('Mary Jo', 'Thanks for helping get this phone yesterday, really touched and grateful!', 5, true, true),
  ('Olufemi Adebayo', 'The phone has been activated and is now active for use. Thanks!', 5, true, true),
  ('Felicity', 'Thanks for the laptop. It is so fine and I really love it', 5, true, true),
  ('Bisola', 'The changed screen on my phone works perfectly', 5, true, true),
  ('Chidi Okonkwo', 'Fast service and great prices. Fixed my iPhone in under an hour!', 5, true, true),
  ('Amaka Nwachukwu', 'Very professional team. They diagnosed my laptop issue accurately and fixed it same day.', 5, false, true),
  ('Tunde Bakare', 'Got a great deal on my phone trade-in. Will definitely recommend Teqpadi!', 5, false, true),
  ('Ngozi Eze', 'Excellent customer service. They kept me updated throughout the repair process.', 4, false, true)
ON CONFLICT DO NOTHING;
