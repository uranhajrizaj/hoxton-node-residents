import express from "express";
import { houses, residents } from "./data";

const app = express();

const port = 4500;
app.use(express.json())

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

app.get("*",(req,res)=>{
  res.send(404)
})

app.patch("/residents/:id",(req,res)=>{
  const id=Number(req.params.id)
  const match=residents.find(resident=>resident.id===id)
  if(match){
    if(typeof req.body.name) match.name=req.body.name
    if(typeof req.body.age) match.age=req.body.age
    if(typeof req.body.gender) match.gender=req.body.gender
    if(typeof req.body.houseID){
      const findHouse=houses.find(house=>house.id===req.body.houseID)
      const houseResidents=residents.filter(resident=>resident.houseID===req.body.houseID).length
     if(findHouse && houseResidents < findHouse.capacity) {
      match.houseID=req.body.house.houseID 
      res.send(match)
     }
     else res.status(400).send({error:"House if full"})
    } 
  }
  else res.status(404).send({error:"Resident not found"})
})
app.delete("/residents/:id",(req,res)=>{
  const id=Number(req.params.id)
  const matchIndex=residents.findIndex(resident=>resident.id===id)
  if(matchIndex>-1){
    residents.splice(id,1)
    res.send({message:"Resident deleted successfully"})
  }
  else res.status(404).send({error:"Resident not found"})
})


app.delete("/houses/:id",(req,res)=>{
  const id=Number(req.params.id)
  const matchIndex=houses.findIndex(house=>house.id===id)
  if(matchIndex>-1){
    houses.splice(id,1)
    res.send({message:"House deleted successfully"})
  }
  else res.status(404).send({error:"House not found"})
})

app.patch("/houses/:id",(req,res)=>{
  const id=Number(req.params.id)
  const match=houses.find(house=>house.id===id)
  if(match){
    if(typeof req.body.adress) match.adress=req.body.adress
    if(typeof req.body.type) match.type=req.body.type
    if(typeof req.body.capacity) match.capacity=req.body.capacity
    res.send(match)
  }
  else res.status(404).send({error:" House not found"})
})

app.post("/houses",(req,res)=>{
  let errors:String[]=[]
  if(typeof req.body.adress!=='string') errors.push("Adress not provided or not a string")
 
  if(typeof req.body.type!=='string') errors.push("Type not provided or not a string")
 

  const newHouse={
    id:houses[houses.length-1].id+1,
    adress:req.body.adress,
    type: req.body.type,
    capacity: req.body.capacity
  }
 
  if(errors.length===0){ 
    houses.push(newHouse)
    res.send(newHouse)
  } 
  else res.status(400).send({errors})
})

app.post("/residents",(req,res)=>{
  let errors:String[]=[]
  if(typeof req.body.name!=="string") errors.push("Name not provided or not a string")
  if(typeof req.body.gender!=="string") errors.push("Gender not provided or not a string")

  const newResident={
    id: residents[residents.length-1].id+1,
    name:req.body.name,
    gender:req.body.gender,
    age:req.body.age,
    houseID:Number(req.body.houseID)
  }
 
  if(errors.length===0 ){
    const findHouse=houses.find(house=>house.id===Number(req.body.houseID))
    console.log(findHouse)
    const houseResidents=residents.filter(resident=>resident.houseID===req.body.houseID).length
   if(findHouse && houseResidents < findHouse.capacity) {
    residents.push(newResident)
    res.send(newResident)
   }
   else res.status(400).send({error:"House if full"})
  }
  else res.status(400).send(errors)
 
})



app.listen(port, () => {
  console.log(`Server is running in: http://localhost:${port}/houses`);
});
