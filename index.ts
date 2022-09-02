import express from "express";
import { houses, residents } from "./data";

const app = express();

const port = 4500;

app.get("/houses", (req, res) => {
  res.send(houses);
});

app.get("/houses/:id", (req, res) => {
  const id = Number(req.params.id);
  const match = houses.find((house) => house.id === id);
  if (match) res.send(match);
  else res.status(404).send({ error: "House not found" });
});

app.get("/residents", (req, res) => {
  res.send(residents);
});

app.get("/residents/:id", (req, res) => {
  const id = Number(req.params.id);
  const match = residents.find((house) => house.id === id);
  if (match) res.send(match);
  else res.status(404).send({ error: "Resident not found" });
});

app.get("/residents&house", (req, res) => {
  const residentAndHouse = residents.map((resident) => {
    const findHouse = houses.find((house) => house.id === resident.houseID);
    return { ...resident, findHouse };
  });
  res.send(residentAndHouse);
});

app.get("/houses&residents", (req, res) => {
  const housesAndResidents = houses.map((house) => {
    const residentsHouse = residents.filter(
      (resident) => house.id === resident.houseID
    );
    return { ...house, residentsHouse };
  });
  res.send(housesAndResidents);
});

app.listen(port, () => {
  console.log(`Server is running in: http://localhost:${port}/houses`);
});
