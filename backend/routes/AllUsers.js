const express = require('express')
const Router = express.Router()
const User = require('../models/User')


Router.get('/:id',async(req,res)=>{
    const users = await User.find({_id: {$ne: req.params.id} })

    res.json(users)
})


Router.get('/:id1/:id2',async(req,res)=>{
    const users = await User.find({_id: {$nin:[req.params.id1,req.params.id2] }})

    res.json(users);
})



module.exports = Router