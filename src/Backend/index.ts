import express from "express";
const app = express();

app.get('/', (req, res) => {
    res.send("hello aaaa");
});

app.listen(5174, () => {
    console.log("app running on port 5174");
});
