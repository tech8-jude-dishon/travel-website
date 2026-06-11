-- ============================================================
-- Travel Website MySQL Schema
-- Run this in XAMPP phpMyAdmin or MySQL CLI
-- Database: travel_db
-- ============================================================

CREATE DATABASE IF NOT EXISTS travel_db;
USE travel_db;

-- ============================================================
-- Table: users
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) NOT NULL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255),
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- Table: admins
-- ============================================================
CREATE TABLE IF NOT EXISTS admins (
  id VARCHAR(36) NOT NULL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- Table: tour_packages
-- ============================================================
CREATE TABLE IF NOT EXISTS tour_packages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255),
  location VARCHAR(255),
  region VARCHAR(100),
  category VARCHAR(100),
  image_url TEXT,
  rating VARCHAR(10),
  duration VARCHAR(100),
  guest_capacity VARCHAR(100),
  tag VARCHAR(100),
  price VARCHAR(100) DEFAULT '',
  is_featured TINYINT(1) DEFAULT 0,
  overview TEXT,
  highlights JSON,
  inclusions JSON,
  exclusions JSON,
  gallery JSON,
  itinerary JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================================
-- Table: travel_details  (booking / general enquiries)
-- ============================================================
CREATE TABLE IF NOT EXISTS travel_details (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  travel_origin VARCHAR(255),
  destination VARCHAR(255),
  travel_date DATE,
  adults VARCHAR(50),
  children VARCHAR(50),
  tentative_budget VARCHAR(100),
  specific_requirements TEXT,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- Table: contact_details  (contact page form)
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_details (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- Table: package_enquiries  (enquiry from package detail page)
-- ============================================================
CREATE TABLE IF NOT EXISTS package_enquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  package_id VARCHAR(50),
  package_title VARCHAR(255),
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  travel_date DATE,
  num_travelers INT,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- Table: trending_destinations  (marquee images on home page)
-- ============================================================
CREATE TABLE IF NOT EXISTS trending_destinations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) DEFAULT '',
  image_url TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- Table: dream_destinations  (Dream Destination cards on home page)
-- ============================================================
CREATE TABLE IF NOT EXISTS dream_destinations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image_url TEXT NOT NULL,
  link VARCHAR(255) DEFAULT '',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Run this if the table already exists:
-- ALTER TABLE trending_destinations ADD COLUMN name VARCHAR(255) DEFAULT '' AFTER id;

-- Run this if tour_packages table already exists (to add price column):
-- ALTER TABLE tour_packages ADD COLUMN price VARCHAR(100) DEFAULT '' AFTER tag;

-- Run these if travel_details table already exists (to add new columns):
-- ALTER TABLE travel_details ADD COLUMN travel_origin VARCHAR(255) AFTER phone;
-- ALTER TABLE travel_details ADD COLUMN tentative_budget VARCHAR(100) AFTER children;
-- ALTER TABLE travel_details ADD COLUMN specific_requirements TEXT AFTER tentative_budget;
