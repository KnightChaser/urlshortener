// shorten.js
const crypto = require("crypto");
const base62 = require("base62/lib/ascii");
const db = require("./db/dbConnection");
const dotenv = require("dotenv");
dotenv.config();

async function shortenURL(longURL) {
    try {
        const existingShortURL = await queryURL(longURL);
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

function queryURL(longURL) {
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

module.exports = shortenURL;
