require("dotenv").config()
const fs = require("fs")
const Io = require("./io")
const path = require("path")
const FruitStock = new Io( path.join(__dirname, "data.json") ) 
const express = require("express")

const app = express()
app.use(express.json())


app.post("/", async (req, res) => {
    const {name, count} = req.body
    const read  = await FruitStock.read() 
    console.log(read);
    // const id = (read[read.length - 1]?.id || 0) + 1    
    const id = (read[read.length - 1]?.id || 0) + 1    
    const data = read.length ? [...read, {id, name, count}] : [{id, name, count}]

    FruitStock.write(data)
    res.status(201).json({message: "data is written"})
})

app.put("/", async (req, res) => {
    const {name, count} = req.body
    console.log(count);

    const read  = await FruitStock.read() 
    for(let i = 0; i < read.length; i++) {
        if(read[i].name == name) {
            read[i].count = ( read[i].count * 1) +  (count * 1)
            read[i].count = JSON.stringify(read[i].count)
        }
    }    

    FruitStock.write(read)
    res.status(200).json({message: "uptodated"})  
}) 

app.delete("/", async (req, res) => {
    const {id} = req.body

    const read  = await FruitStock.read() 
    for(let i = 0; i < read.length; i++) {
        if(id == read[i].id ) {
            const index = read.indexOf(read[i] )
            read.splice(index, 1)
        }
    }    
    FruitStock.write(read)
    res.status(200).json({message: "deleted"})  
        
})
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(PORT);
})



