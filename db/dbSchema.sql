-- A Database schema for URLShortener service database

CREATE TABLE urlshortener.urls (
    uuid VARCHAR(36) PRIMARY KEY,
    longUrl TEXT NOT NULL,
    shortUrl TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);