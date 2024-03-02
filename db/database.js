// Query to the database to check if the URL already exists.
// If it does, return the existing shortened URL.
// If it doesn't, save the new shortened URL to the database.
function queryURL(longURL) {
    // Query the database to check if the URL already exists
    const db = require("./db/dbConnection");
    const query = "SELECT short_url FROM url_shortener WHERE long_url = ?";
    db.query(query, [longURL], (error, results) => {
        if (error) {
            console.log("Error querying the database");
        } else {
            if (results.length > 0) {
                // The URL already exists in the database
                return results[0].short_url;
            } else {
                // The URL does not exist in the database
                const shortURL = shortenURL(longURL);
                saveURL(uuid(), longURL, shortURL);
                return shortURL;
            }
        }
    });
}

// Register a new shortened URL to the database
function saveURL(uuid, longURL, shortURL) {
    // Save the URL to the database
    const db = require("./db/dbConnection");
    const query = "INSERT INTO url_shortener (uuid, long_url, short_url) VALUES (?, ?, ?)";
    db.query(query, [uuid, longURL, shortURL], (error, results) => {
        if (error) {
            console.log("Error saving the URL to the database");
        }
    });
}
