const router =require("express").Router()
const List = require('../models/List')
const verify = require('../verifyToken')

// TEST
// router.get("/use", async (req,res)=>{
//     console.log("working")
// })

// CREATE
router.post("/", verify, async(req,res)=>{
    if(req.user.isAdmin){
        const newList = new List(req.body) 
        try{
            const createdList = await newList.save()
            res.status(201).json(createdList)
        }catch(err){
            res.status(500).json(err)
        }
        }else{
            res.status(403).json("You are not admin! You are not allowed to add a movie!")
    }
})

// DELETE
router.delete("/:id", verify, async(req,res)=>{
    if(req.user.isAdmin){
        try{
            await List.findByIdAndDelete()
            res.status(201).json("The list has been deleted")
        }catch(err){
            res.status(500).json(err)
        }
        }else{
            res.status(403).json("You are not admin! You are not allowed to delete a movie!")
    } 
})

// GET ROUTE
router.get("/", verify, async(req,res)=>{
    const typeQuery = req.query.type
    const genreQuery = req.query.genre
    let list = []
    
    try{
        // GET by type and genre
        if(typeQuery){
            if(genreQuery){
                list = await List.aggregate([
                    {$sample: {size: 10}},
                    {$match: {type: typeQuery, genre: genreQuery}}
                ])
            //GET by type
            }else{
                list = await List.aggregate([
                    {$sample: {size: 10}},
                    {$match: {type: typeQuery}}
                ])
            }
        }else{
            list = await List.aggregate([{$sample: {size:10} }])
        }
        res.status(200).json(list)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports=router