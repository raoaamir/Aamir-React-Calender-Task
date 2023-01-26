const mongoose = require('mongoose')
const alldaySchema = new mongoose.Schema({
    owner:{
        type :String
    },

    eventName:{
        type : String,
        required:[true , 'Please enter Your Event Name']
    },
    location :{
        type : String,
        required:[true , 'Please enter Your Event Location']
    }
},
{
    timestamps :true
})

const allday = mongoose.model('allday' , alldaySchema)

module.exports = allday