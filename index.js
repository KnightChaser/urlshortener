express = require("express");
dotenv = require("dotenv");
path = require("path");
shorten = require("./shorten");
dotenv.config();

const app = express();
const port = process.env.SERVER_ACCESS_PORT || 7777;

app.use(express.json());
app.use("/", express.static(path.resolve(__dirname, "views")))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get("/", (request, response) => {
    response.send("Hello World");
})

// Get the original URL from the input field
app.get("/shorten", (request, response) => {
    var longUrl = request.query.longUrl;
    shorten(longUrl)
        .then(shortenedUrl => {
            response.status(200).json({
                shortenedUrl: shortenedUrl
            });
        })
        .catch(error => {
            console.error("Error shortening the URL:", error);
            response.status(500).json({
                error: "Internal server error"
            });
        });
});