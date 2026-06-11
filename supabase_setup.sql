-- 1. Create the tour_packages table
CREATE TABLE IF NOT EXISTS tour_packages (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  location TEXT,
  region TEXT, -- 'India', 'Dubai', 'International'
  category TEXT, -- 'Local', 'Standard', 'North', 'South', etc.
  image_url TEXT,
  rating TEXT,
  duration TEXT,
  guest_capacity TEXT,
  tag TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  overview TEXT,
  highlights JSONB DEFAULT '[]'::jsonb,
  inclusions JSONB DEFAULT '[]'::jsonb,
  exclusions JSONB DEFAULT '[]'::jsonb,
  gallery JSONB DEFAULT '[]'::jsonb,
  itinerary JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security
ALTER TABLE tour_packages ENABLE ROW LEVEL SECURITY;

-- 3. Create Policies
-- Allow anyone to read the tours
CREATE POLICY "Allow public read access" ON tour_packages
  FOR SELECT USING (true);

-- Allow authenticated users (Admins) to manage tours
CREATE POLICY "Allow authenticated full access" ON tour_packages
  FOR ALL TO authenticated USING (true);

-- 4. Seed Data (Initial migration from static files)
-- Note: This is an example, it's better to add full data via the Admin Dashboard later or expand this script.
INSERT INTO tour_packages 
(title, slug, location, region, category, image_url, rating, duration, tag, is_featured, overview, highlights, inclusions, exclusions, gallery, itinerary)
VALUES
(
  'Thailand', 'thailand', 'Dubai, UAE', 'Dubai', 'Standard', '/images/thailand.jpg', '5.00 (528)', '6 Hours', 'Adventure', true,
  'Explore the Land of Smiles with our comprehensive Thailand tour...',
  '["Visit the majestic Grand Palace", "Island hopping tour in Phuket", "Authentic Thai cooking class"]'::jsonb,
  '["Luxury 4-star hotel", "Daily international breakfast", "Private AC transfers"]'::jsonb,
  '["International flight tickets", "Personal shopping", "Travel insurance"]'::jsonb,
  '["/images/thailand.jpg", "/images/thai.jpg", "/images/thaiFour.jpg"]'::jsonb,
  '[{"day": "Day 1", "title": "Dune Bashing", "detail": "Thrilling 4x4 drive"}]'::jsonb
),
(
  'Bali', 'bali', 'Dubai, UAE', 'Dubai', 'Standard', '/images/BALI.jpg', '5.00 (420)', '2 Hours', 'Skyline', true,
  'Find your zen in the Island of the Gods...',
  '["Spiritual morning yoga", "Visit Uluwatu Temple", "Balinese cooking class"]'::jsonb,
  '["Private pool villa", "Daily healthy breakfast", "Private car and driver"]'::jsonb,
  '["International airfare", "Personal laundry", "Additional meals"]'::jsonb,
  '["/images/baliimageoneTwo.jpg", "/images/baliimageoneFour.jpg"]'::jsonb,
  '[{"day": "Day 1", "title": "Level 124 & 125", "detail": "Access to observation decks"}]'::jsonb
),
(
  'Delhi City Highlights', 'delhi-city-highlights', 'Delhi, India', 'India', 'North', '/images/delhiicityone.png', '4.95 (840)', '2 Days', 'Cultural', false,
  'Discover the heart of India with our Delhi City Highlights tour...',
  '["UNESCO World Heritage Red Fort", "Rickshaw ride in Chandni Chowk", "Humayun''s Tomb"]'::jsonb,
  '["Luxury 5-star hotel", "Daily breakfast", "Professional guide"]'::jsonb,
  '["International flights", "Personal beverages", "Tips"]'::jsonb,
  '["/images/delhiicityTwo.png", "/images/delhiiCityThree.png"]'::jsonb,
  '[{"day": "Day 1", "title": "Old Delhi Heritage", "detail": "Visit Red Fort"}]'::jsonb
);
