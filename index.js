// A simple hello world express.js app
express = require("express");
dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.SERVER_ACCESS_PORT || 7777;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
    res.send("Hello World");
})