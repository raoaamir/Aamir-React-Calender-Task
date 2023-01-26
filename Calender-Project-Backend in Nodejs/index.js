const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const calenderRoutes = require('./routes/calenderRoutes')
const alldayRoutes = require('./routes/alldayRoutes')

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())


app.use(authRoutes)
app.use(calenderRoutes)
app.use(alldayRoutes)


// database connection
mongoose.connect(process.env.DBURL,{ useNewUrlParser : true , useUnifiedTopology : true})
.then(()=>app.listen(process.env.PORT,()=>{
  console.log('Server Running')
}))
.catch((err)=>console.log(err))





