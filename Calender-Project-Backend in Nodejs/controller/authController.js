const userInfo = require('../model/userInfo')
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) =>{
    return jwt.sign({id} ,process.env.SECRETKEY ,{
        expiresIn :maxAge
    } )
}


const create_user = async(req, res) => {
    const {name ,email ,password , } = req.body;
    try {
        const user = await userInfo.create({name , email ,password})
        const token = createToken(user._id)
        res.status(201).json({user,token})
        
    } catch (err) {
        const errors = err.message
        res.status(400).json({errors})
        
    }
  }
  
  const login_user = async (req, res) => {
    console.log('running')
    const {email ,password} = req.body;

    try {

        const user =await userInfo.login(email , password)
        const token = createToken(user._id)
        res.status(200).json({token ,user})
        
    } catch (err) {
        const errors = err.message
        res.json({errors})
        
    }
}

module.exports ={
    create_user,
    login_user
}