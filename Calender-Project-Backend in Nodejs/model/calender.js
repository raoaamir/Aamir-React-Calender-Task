const mongoose = require('mongoose')
const calenderSchema = new mongoose.Schema({

    owner :{
        type :String,
    },

    eventName:{
        type : String,
        required:[true , 'Please enter Your EventName']
        
       
    },
    location :{
        type : String,
        required:[true , 'Please enter Event Location']
       
        
    },
    startTime :{
        type : String,
        required:[true , 'Please Select Start Time']
        
        
    },
    endTime :{
        type : String,
        required:[true , 'Please Select End Time']
        
        
    },

},
{
    timestamps :true
})

const Calender = mongoose.model('calender' , calenderSchema)

module.exports = Calender