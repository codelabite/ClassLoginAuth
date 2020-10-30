const express = require('express')
const mongoose = require('mongoose')
const user = require('../Model/EntryFormat')
const router = express.Router()
const {Register, Login} = require('./varify')
const bcrypt = require('bcryptjs')




router.post('/register', async(req, res)=>{
  try{
    const {error} = await Register(req.body)
    if(error){
      return res.status(404).send(error.details[0].message)
    }

    const emailChecker = await user.findOne({email: req.body.email})
    if(emailChecker){
      return res.status(404).send("Email already Exist")
    }

    hider = await bcrypt.genSalt(10)
    passwordHider = await bcrypt.hash(req.body.password, hider)

    const newData = new user({
      username: req.body.username,
      email: req.body.email,
      password: passwordHider,
    })

    const saveData = await newData.save()
     res.status(201).json(saveData)
  }catch(err){
    console.log(err.message)
  }
})


router.post('/login', async(req, res)=>{
  try{
    const {error} = await Login(req.body)
    if(error){
      return res.status(404).send(error.details[0].message)
    }

    const userEmail = await user.findOne({email: req.body.email})
    if(!userEmail){
      return res.status(404).send("The Email is Wrong ⚗️")
    }

   
    passwordHider = await bcrypt.compare(req.body.password, userEmail.password)
    if(!passwordHider){
      return res.status(404).send("Invalid Password 👎")
    }

   res.status(200).send("You have Successfully Logged in 👍")

  }catch(err){
    console.log(err.message)
  }
})



module.exports = router