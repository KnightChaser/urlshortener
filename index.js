// A simple hello world express.js app
express = require("express");
dotenv = require("dotenv");
path = require("path");
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