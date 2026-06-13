-- Seed device prices (Nigerian Naira)
-- Note: Prices are in NGN (Nigerian Naira)

-- iPhone 15 Pro Max prices
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '256GB', 'new', 1850000, 1200000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Apple' AND d.model = 'iPhone 15 Pro Max'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '256GB', 'like_new', 1650000, 1100000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Apple' AND d.model = 'iPhone 15 Pro Max'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '256GB', 'good', 1450000, 950000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Apple' AND d.model = 'iPhone 15 Pro Max'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '512GB', 'new', 2100000, 1400000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Apple' AND d.model = 'iPhone 15 Pro Max'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '512GB', 'like_new', 1900000, 1250000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Apple' AND d.model = 'iPhone 15 Pro Max'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '1TB', 'new', 2450000, 1600000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Apple' AND d.model = 'iPhone 15 Pro Max'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;

-- iPhone 15 Pro prices
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '128GB', 'new', 1550000, 1000000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Apple' AND d.model = 'iPhone 15 Pro'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '128GB', 'like_new', 1400000, 900000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Apple' AND d.model = 'iPhone 15 Pro'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '256GB', 'new', 1700000, 1100000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Apple' AND d.model = 'iPhone 15 Pro'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '256GB', 'like_new', 1550000, 1000000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Apple' AND d.model = 'iPhone 15 Pro'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;

-- iPhone 15 prices
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '128GB', 'new', 1200000, 780000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Apple' AND d.model = 'iPhone 15'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '128GB', 'like_new', 1100000, 700000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Apple' AND d.model = 'iPhone 15'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '256GB', 'new', 1350000, 880000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Apple' AND d.model = 'iPhone 15'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;

-- iPhone 14 Pro Max prices
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '128GB', 'new', 1400000, 900000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Apple' AND d.model = 'iPhone 14 Pro Max'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '128GB', 'like_new', 1250000, 800000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Apple' AND d.model = 'iPhone 14 Pro Max'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '128GB', 'good', 1100000, 700000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Apple' AND d.model = 'iPhone 14 Pro Max'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '256GB', 'new', 1550000, 1000000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Apple' AND d.model = 'iPhone 14 Pro Max'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '256GB', 'like_new', 1400000, 900000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Apple' AND d.model = 'iPhone 14 Pro Max'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;

-- iPhone 13 prices
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '128GB', 'new', 850000, 550000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Apple' AND d.model = 'iPhone 13'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '128GB', 'like_new', 750000, 480000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Apple' AND d.model = 'iPhone 13'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '128GB', 'good', 650000, 400000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Apple' AND d.model = 'iPhone 13'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '256GB', 'new', 950000, 620000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Apple' AND d.model = 'iPhone 13'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;

-- Samsung Galaxy S24 Ultra prices
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '256GB', 'new', 1650000, 1070000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Samsung' AND d.model = 'Samsung Galaxy S24 Ultra'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '256GB', 'like_new', 1500000, 975000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Samsung' AND d.model = 'Samsung Galaxy S24 Ultra'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '512GB', 'new', 1850000, 1200000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Samsung' AND d.model = 'Samsung Galaxy S24 Ultra'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '1TB', 'new', 2100000, 1365000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Samsung' AND d.model = 'Samsung Galaxy S24 Ultra'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;

-- Samsung Galaxy S24 prices
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '128GB', 'new', 950000, 617000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Samsung' AND d.model = 'Samsung Galaxy S24'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '128GB', 'like_new', 850000, 552000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Samsung' AND d.model = 'Samsung Galaxy S24'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '256GB', 'new', 1050000, 682000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Samsung' AND d.model = 'Samsung Galaxy S24'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;

-- Samsung Galaxy Z Fold 5 prices
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '256GB', 'new', 2200000, 1430000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Samsung' AND d.model = 'Samsung Galaxy Z Fold 5'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '256GB', 'like_new', 2000000, 1300000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Samsung' AND d.model = 'Samsung Galaxy Z Fold 5'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '512GB', 'new', 2400000, 1560000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Samsung' AND d.model = 'Samsung Galaxy Z Fold 5'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;

-- Google Pixel 8 Pro prices
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '128GB', 'new', 1200000, 780000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Google' AND d.model = 'Google Pixel 8 Pro'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '128GB', 'like_new', 1100000, 715000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Google' AND d.model = 'Google Pixel 8 Pro'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '256GB', 'new', 1350000, 877000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Google' AND d.model = 'Google Pixel 8 Pro'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;

-- Tecno Phantom X2 Pro prices
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '256GB', 'new', 550000, 357000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Tecno' AND d.model = 'Tecno Phantom X2 Pro'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '256GB', 'like_new', 480000, 312000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Tecno' AND d.model = 'Tecno Phantom X2 Pro'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '256GB', 'good', 400000, 260000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Tecno' AND d.model = 'Tecno Phantom X2 Pro'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;

-- Tecno Camon 20 Pro prices
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '256GB', 'new', 280000, 182000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Tecno' AND d.model = 'Tecno Camon 20 Pro'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '256GB', 'like_new', 240000, 156000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Tecno' AND d.model = 'Tecno Camon 20 Pro'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;

-- Infinix Note 30 Pro prices
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '256GB', 'new', 220000, 143000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Infinix' AND d.model = 'Infinix Note 30 Pro'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '256GB', 'like_new', 190000, 123000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Infinix' AND d.model = 'Infinix Note 30 Pro'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;

-- MacBook Pro 16" M3 Max prices
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '512GB', 'new', 4500000, 2925000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Apple' AND d.model = 'MacBook Pro 16" M3 Max'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '512GB', 'like_new', 4000000, 2600000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Apple' AND d.model = 'MacBook Pro 16" M3 Max'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '1TB', 'new', 5000000, 3250000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Apple' AND d.model = 'MacBook Pro 16" M3 Max'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;

-- MacBook Air 13" M3 prices
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '256GB', 'new', 1700000, 1105000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Apple' AND d.model = 'MacBook Air 13" M3'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '256GB', 'like_new', 1550000, 1007000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Apple' AND d.model = 'MacBook Air 13" M3'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '512GB', 'new', 1900000, 1235000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Apple' AND d.model = 'MacBook Air 13" M3'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;

-- PlayStation 5 prices
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '825GB', 'new', 750000, 487000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Sony' AND d.model = 'PlayStation 5'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '825GB', 'like_new', 650000, 422000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Sony' AND d.model = 'PlayStation 5'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '825GB', 'good', 550000, 357000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Sony' AND d.model = 'PlayStation 5'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;

-- Xbox Series X prices
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '1TB', 'new', 700000, 455000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Microsoft' AND d.model = 'Xbox Series X'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '1TB', 'like_new', 600000, 390000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Microsoft' AND d.model = 'Xbox Series X'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;

-- Xbox Series S prices
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '512GB', 'new', 420000, 273000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Microsoft' AND d.model = 'Xbox Series S'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '512GB', 'like_new', 380000, 247000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Microsoft' AND d.model = 'Xbox Series S'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;

-- Nintendo Switch OLED prices
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '64GB', 'new', 450000, 292000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Nintendo' AND d.model = 'Nintendo Switch OLED'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '64GB', 'like_new', 400000, 260000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Nintendo' AND d.model = 'Nintendo Switch OLED'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
INSERT INTO device_prices (device_id, storage, condition, price, trade_in_value)
SELECT d.id, '64GB', 'good', 350000, 227000 FROM devices d JOIN brands b ON d.brand_id = b.id WHERE b.name = 'Nintendo' AND d.model = 'Nintendo Switch OLED'
ON CONFLICT (device_id, storage, condition) DO UPDATE SET price = EXCLUDED.price, trade_in_value = EXCLUDED.trade_in_value;
