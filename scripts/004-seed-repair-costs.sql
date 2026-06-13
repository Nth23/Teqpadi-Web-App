-- Seed repair costs for various devices across all service categories

-- iPhone 15 Pro Max repairs
INSERT INTO repair_costs (device_id, service_id, min_cost, max_cost, estimated_time, notes)
SELECT d.id, s.id, 15000, 25000, '30-45 mins', 'Professional screen replacement'
FROM devices d, repair_services s
WHERE d.model = 'iPhone 15 Pro Max' AND s.name = 'Screen Replacement'
ON CONFLICT (device_id, service_id) DO NOTHING;

INSERT INTO repair_costs (device_id, service_id, min_cost, max_cost, estimated_time, notes)
SELECT d.id, s.id, 8000, 15000, '20-30 mins', 'Original or equivalent battery'
FROM devices d, repair_services s
WHERE d.model = 'iPhone 15 Pro Max' AND s.name = 'Battery Replacement'
ON CONFLICT (device_id, service_id) DO NOTHING;

INSERT INTO repair_costs (device_id, service_id, min_cost, max_cost, estimated_time, notes)
SELECT d.id, s.id, 5000, 10000, '15-20 mins', 'Professional charging port repair'
FROM devices d, repair_services s
WHERE d.model = 'iPhone 15 Pro Max' AND s.name = 'Charging Port Repair'
ON CONFLICT (device_id, service_id) DO NOTHING;

INSERT INTO repair_costs (device_id, service_id, min_cost, max_cost, estimated_time, notes)
SELECT d.id, s.id, 8000, 12000, '20 mins', 'Speaker module replacement'
FROM devices d, repair_services s
WHERE d.model = 'iPhone 15 Pro Max' AND s.name = 'Speaker Repair'
ON CONFLICT (device_id, service_id) DO NOTHING;

INSERT INTO repair_costs (device_id, service_id, min_cost, max_cost, estimated_time, notes)
SELECT d.id, s.id, 12000, 20000, '30-40 mins', 'Rear or front camera replacement'
FROM devices d, repair_services s
WHERE d.model = 'iPhone 15 Pro Max' AND s.name = 'Camera Repair'
ON CONFLICT (device_id, service_id) DO NOTHING;

INSERT INTO repair_costs (device_id, service_id, min_cost, max_cost, estimated_time, notes)
SELECT d.id, s.id, 20000, 35000, '1-2 hours', 'Water damage assessment and cleaning'
FROM devices d, repair_services s
WHERE d.model = 'iPhone 15 Pro Max' AND s.name = 'Water Damage Repair'
ON CONFLICT (device_id, service_id) DO NOTHING;

INSERT INTO repair_costs (device_id, service_id, min_cost, max_cost, estimated_time, notes)
SELECT d.id, s.id, 5000, 15000, '30 mins - 1 hour', 'Software reset or data recovery'
FROM devices d, repair_services s
WHERE d.model = 'iPhone 15 Pro Max' AND s.name = 'Software Issues'
ON CONFLICT (device_id, service_id) DO NOTHING;

-- Samsung Galaxy S24 Ultra repairs
INSERT INTO repair_costs (device_id, service_id, min_cost, max_cost, estimated_time, notes)
SELECT d.id, s.id, 14000, 24000, '30-45 mins', 'AMOLED screen replacement'
FROM devices d, repair_services s
WHERE d.model = 'Galaxy S24 Ultra' AND s.name = 'Screen Replacement'
ON CONFLICT (device_id, service_id) DO NOTHING;

INSERT INTO repair_costs (device_id, service_id, min_cost, max_cost, estimated_time, notes)
SELECT d.id, s.id, 7000, 14000, '20 mins', 'High-capacity battery replacement'
FROM devices d, repair_services s
WHERE d.model = 'Galaxy S24 Ultra' AND s.name = 'Battery Replacement'
ON CONFLICT (device_id, service_id) DO NOTHING;

INSERT INTO repair_costs (device_id, service_id, min_cost, max_cost, estimated_time, notes)
SELECT d.id, s.id, 4500, 9000, '15 mins', 'USB-C port cleaning and repair'
FROM devices d, repair_services s
WHERE d.model = 'Galaxy S24 Ultra' AND s.name = 'Charging Port Repair'
ON CONFLICT (device_id, service_id) DO NOTHING;

-- Google Pixel 8 Pro repairs
INSERT INTO repair_costs (device_id, service_id, min_cost, max_cost, estimated_time, notes)
SELECT d.id, s.id, 13000, 22000, '30-45 mins', 'OLED display replacement'
FROM devices d, repair_services s
WHERE d.model = 'Pixel 8 Pro' AND s.name = 'Screen Replacement'
ON CONFLICT (device_id, service_id) DO NOTHING;

INSERT INTO repair_costs (device_id, service_id, min_cost, max_cost, estimated_time, notes)
SELECT d.id, s.id, 6500, 13000, '20 mins', 'OEM battery replacement'
FROM devices d, repair_services s
WHERE d.model = 'Pixel 8 Pro' AND s.name = 'Battery Replacement'
ON CONFLICT (device_id, service_id) DO NOTHING;

-- MacBook Pro repairs
INSERT INTO repair_costs (device_id, service_id, min_cost, max_cost, estimated_time, notes)
SELECT d.id, s.id, 25000, 45000, '1-2 hours', 'Retina display replacement'
FROM devices d, repair_services s
WHERE d.model LIKE 'MacBook Pro%' AND s.name = 'Screen Replacement'
ON CONFLICT (device_id, service_id) DO NOTHING;

INSERT INTO repair_costs (device_id, service_id, min_cost, max_cost, estimated_time, notes)
SELECT d.id, s.id, 15000, 25000, '30 mins - 1 hour', 'Keyboard repair or replacement'
FROM devices d, repair_services s
WHERE d.model LIKE 'MacBook Pro%' AND s.name = 'Keyboard Replacement'
ON CONFLICT (device_id, service_id) DO NOTHING;

INSERT INTO repair_costs (device_id, service_id, min_cost, max_cost, estimated_time, notes)
SELECT d.id, s.id, 8000, 15000, '20-30 mins', 'Trackpad replacement'
FROM devices d, repair_services s
WHERE d.model LIKE 'MacBook Pro%' AND s.name = 'Trackpad Repair'
ON CONFLICT (device_id, service_id) DO NOTHING;

INSERT INTO repair_costs (device_id, service_id, min_cost, max_cost, estimated_time, notes)
SELECT d.id, s.id, 5000, 10000, '15-20 mins', 'Thermal paste reapplication and fan cleaning'
FROM devices d, repair_services s
WHERE d.model LIKE 'MacBook Pro%' AND s.name = 'Fan Cleaning/Replacement'
ON CONFLICT (device_id, service_id) DO NOTHING;

-- PlayStation 5 repairs
INSERT INTO repair_costs (device_id, service_id, min_cost, max_cost, estimated_time, notes)
SELECT d.id, s.id, 20000, 35000, '1-2 hours', 'Disc drive module replacement'
FROM devices d, repair_services s
WHERE d.model = 'PlayStation 5' AND s.name = 'Console Disc Drive Repair'
ON CONFLICT (device_id, service_id) DO NOTHING;

INSERT INTO repair_costs (device_id, service_id, min_cost, max_cost, estimated_time, notes)
SELECT d.id, s.id, 8000, 15000, '30-45 mins', 'DualSense controller repair or replacement'
FROM devices d, repair_services s
WHERE d.model = 'PlayStation 5' AND s.name = 'Controller Repair'
ON CONFLICT (device_id, service_id) DO NOTHING;

INSERT INTO repair_costs (device_id, service_id, min_cost, max_cost, estimated_time, notes)
SELECT d.id, s.id, 6000, 12000, '20-30 mins', 'HDMI port repair or replacement'
FROM devices d, repair_services s
WHERE d.model = 'PlayStation 5' AND s.name = 'HDMI Port Repair'
ON CONFLICT (device_id, service_id) DO NOTHING;

-- Xbox Series X repairs
INSERT INTO repair_costs (device_id, service_id, min_cost, max_cost, estimated_time, notes)
SELECT d.id, s.id, 8000, 15000, '30-45 mins', 'Xbox Series X controller repair'
FROM devices d, repair_services s
WHERE d.model = 'Xbox Series X' AND s.name = 'Controller Repair'
ON CONFLICT (device_id, service_id) DO NOTHING;

INSERT INTO repair_costs (device_id, service_id, min_cost, max_cost, estimated_time, notes)
SELECT d.id, s.id, 6000, 12000, '20-30 mins', 'HDMI port repair'
FROM devices d, repair_services s
WHERE d.model = 'Xbox Series X' AND s.name = 'HDMI Port Repair'
ON CONFLICT (device_id, service_id) DO NOTHING;
