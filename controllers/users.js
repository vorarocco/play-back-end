const router =require("express").Router()
const User = require('../models/User')
const CryptoJS = require("crypto-js")
const verify = require('../verifyToken')

// TEST
// router.get("/use", async (req,res)=>{
//     console.log("working")
// })

// UPDATE
router.put("/:id", verify, async(req,res)=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
        if(req.body.password){
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.SECRET_KEY
              ).toString()
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set:req.body,
                },
                {new:true}
            )
            res.status(200).json(updatedUser)

        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("You can update only your account")
    }
})

// DELETE
router.delete("/:id", verify, async(req,res)=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
       
        try{
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User has been deleted")
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("You can delete only your account")
    }
})

// GET
router.get("/find/:id", async(req,res)=>{  
    try{
        const user = await User.findById(req.params.id)
        const {password, ...info} = user._doc
        res.status(200).json(info)
        } catch(err) {
        res.status(500).json(err)
    }
})

// GET ALL
router.get("/:id", verify, async(req,res)=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
       
        try{
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User has been deleted")
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("You can delete only your account")
    }
})

// GET USER STAT


module.exports=router