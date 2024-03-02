-- A Database schema for URLShortener service database

CREATE TABLE urlshortener.urls (
  id SERIAL PRIMARY KEY AUTO_INCREMENT,
  longUrl VARCHAR(255) NOT NULL,
  shortUrl VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);