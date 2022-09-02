import express from "express";
import { houses, residents } from "./data";

const app = express();

const port = 4500;

app.get("/houses", (req, res) => {
  res.send(houses);
});

app.get("/residents", (req, res) => {
  res.send(residents);
});

app.listen(port, () => {
  console.log(`Server is running in: http://localhost:${port}/houses`);
});
