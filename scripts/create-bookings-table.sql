-- Create bookings table for storing customer reservations
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email VARCHAR(255) NOT NULL,
  car_id INTEGER NOT NULL,
  car_name VARCHAR(255) NOT NULL,
  car_price VARCHAR(50),
  price_per_day BIGINT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  duration_days INTEGER NOT NULL,
  total_price BIGINT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending-order',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS bookings_email_idx ON bookings(user_email);
CREATE INDEX IF NOT EXISTS bookings_status_idx ON bookings(status);
