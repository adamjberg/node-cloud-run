import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Fake broken build")
})

app.listen(80);