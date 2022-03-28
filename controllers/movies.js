const router =require("express").Router()
const Movie = require('../models/Movie')
const CryptoJS = require("crypto-js")
const verify = require('../verifyToken')

// TEST
// router.get("/use", async (req,res)=>{
//     console.log("working")
// })

// CREATE
router.post("/", verify, async(req,res)=>{
    if(req.user.isAdmin){
        const newMovie = new Movie(req.body) 
        try{
            const createdMovie = await newMovie.save()
            res.status(201).json(createdMovie)
        }catch(err){
            res.status(500).json(err)
        }
        }else{
            res.status(403).json("You are not admin! You are not allowed to add a movie!")
    }
})

// UPDATE
router.put("/:id", verify, async(req,res)=>{
    if(req.user.isAdmin){
        try{
            const updatedMovie = await Movie.findByIdAndUpdate(
                req.params.id,
                {
                    $set:req.body,
                },
                {new:true}
            )
            res.status(200).json(updatedMovie)
        }catch(err){
            res.status(500).json(err)
        }
        }else{
            res.status(403).json("You are not admin! You are not allowed to update a movie!")
    }
})


// DELETE


// GET


// GET ALL


module.exports=router