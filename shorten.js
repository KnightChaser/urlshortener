// shorten.js
const crypto = require("crypto");
const base62 = require("base62/lib/ascii");
const db = require("./db/dbConnection");
const dotenv = require("dotenv");
dotenv.config();

async function shortenURL(longURL) {
    try {
        const existingShortURL = await queryShortURLExistence(longURL);
        if (existingShortURL) {
            return existingShortURL;
        }

        // Hash the long URL and encode a substring to base62
        const hashedURL = crypto.createHash("sha256").update(longURL).digest("hex");
        const shortURL = base62.encode(parseInt(hashedURL, 16)).substring(0, 10);

        return await saveURL(longURL, shortURL) ? shortURL : null;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

// Query the database for the long URL
// Return the short URL if it exists, otherwise return null
function queryShortURLExistence(longURL) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${process.env.MYSQL_USER_DATABASE_NAME}.${process.env.MYSQL_USER_TABLE_NAME} WHERE longUrl = ?`;
        db.query(query, [longURL], (error, results) => {
            if (error) {
                console.error("Error querying the database:", error);
                reject(error);
            } else {
                resolve(results.length > 0 ? results[0].shortUrl : null);
            }
        });
    });
}

// With the short URL, return the long URL if it exists, otherwise return null
function queryLongURLExistence(shortURL) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${process.env.MYSQL_USER_DATABASE_NAME}.${process.env.MYSQL_USER_TABLE_NAME} WHERE shortUrl = ?`;
        db.query(query, [shortURL], (error, results) => {
            if (error) {
                console.error("Error querying the database:", error);
                reject(error);
            } else {
                // Add click count to the database
                const clickQuery = `UPDATE ${process.env.MYSQL_USER_DATABASE_NAME}.${process.env.MYSQL_USER_TABLE_NAME} SET clickCount = clickCount + 1 WHERE shortUrl = ?`;
                db.query(clickQuery, [shortURL], (error, results) => {
                    if (error) {
                        console.error("Error updating the click count:", error);
                    }
                });
                resolve(results.length > 0 ? results[0].longUrl : null);
            }
        });
    });
}

// Save the long URL and short URL to the database
// Return true if the URL was saved successfully, otherwise return false
function saveURL(longUrl, shortUrl) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO ${process.env.MYSQL_USER_DATABASE_NAME}.${process.env.MYSQL_USER_TABLE_NAME} (longUrl, shortUrl) VALUES (?, ?)`;
        db.query(query, [longUrl, shortUrl], (error, results) => {
            if (error) {
                console.error(`Error saving the URL to the database: ${error}`);
                reject(error);
            } else {
                resolve(true);
            }
        });
    });
}

module.exports = {
    shortenURL,
    queryLongURLExistence
}