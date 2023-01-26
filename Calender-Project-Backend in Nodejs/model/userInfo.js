const mongoose = require('mongoose')
const {isEmail} = require('validator')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({

    name :{
    type : String,
    required:[true , 'Please enter Your Name']
    },

    email:{
        type : String,
        required :[true , 'Please enter an email'],
        lowercase : true,
        unique : true,
        validate : [isEmail , 'Please enter a valid email address']
    },
    password :{
        type : String,
        required : [true , 'Please enter an Password'],
        minlength : [6 , 'Minimum length of the password is 6']
    },

})

userSchema.pre('save' , async function(next){
    this.password = await bcrypt.hash(this.password ,8)
    next();
})

userSchema.statics.login = async function (email , password){
    const user = await this.findOne({email})
    if(user){
        const auth = await bcrypt.compare(password , user.password)
        if(auth){
            return user;
        }
        throw Error('Incorrect Password')
    }
    throw Error ('Incorrect Email')
}

const user = mongoose.model('userInfo' , userSchema)

module.exports = user