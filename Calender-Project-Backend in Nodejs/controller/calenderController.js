const Calender = require('../model/calender')


    const create_event = async(req, res) => {
        const {eventName ,location ,startTime ,endTime ,owner} = req.body;
        try {
            const event = await Calender.create({owner,eventName , location ,startTime ,endTime})
           event.save();
            res.status(201).json(event)
            
        } catch (err) {
            const errors = err.message
            res.status(400).json({errors})
            
        }
      }

    const all_events =async (req ,res)=>{

        const id = req.params.id;
        
        try {
            Calender.find({owner:id}).sort({createdAt:1})
            .then((result)=>{
                res.status(201).json(result)
              
            })
            
        } catch (error) {
            console.log(error)
        }
       
     
        
    }

    const event =async (req ,res)=>{

        const id = req.params.id;
        
        try {
            Calender.findById({_id:id}).sort({createdAt:-1})
            .then((result)=>{
                res.status(201).json(result)
             })
            
        } catch (error) {
            console.log(error)
        }
       
     
        
    }

    const calender_edit =async (req ,res)=>{
       const data= await Calender.findById(req.params.id)
        if(!data)return res.send("EVENT NOT FOUND")
        res.render('edit',{calender : data})
    } 

    const calender_update = async (req ,res)=>{
        try {
           const id  = req.params.id
           const result = await Calender.findByIdAndUpdate(id ,{
               
                   eventName: req.body.eventName,
                   location : req.body.location,
                   startTime : req.body.startTime,
                   endTime : req.body.endTime
       
               },{new:true})
               res.send({result})
             
        } catch (e) {
           console.log(e)
        }
    }

    const delete_event = async (req , res)=>{
            const id = req.params.id
            Calender.findByIdAndDelete(id)
            .then(result =>{
                res.status(200).json(result)
            })
    }
    module.exports ={
        create_event,
        all_events,
        calender_edit,
        calender_update,
        delete_event,
        event
    }