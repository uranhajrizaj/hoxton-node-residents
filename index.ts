import express from 'express'

const app=express()

const port=4500

const houses=[
    {
    id:1,
    adress:"",
    type:""

}]


app.get("/",(req,res)=>{
    res.send(houses)
})

app.listen(port,()=>{
    console.log(`Server is running in: http://localhost:${port}/`)

})