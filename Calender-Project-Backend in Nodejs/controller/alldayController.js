const allday = require('../model/allday')


const create_event= async(req ,res)=>{
    const {eventName ,location ,owner}=(req.body)

    try {
        const event = await allday.create({eventName , location ,owner})
       event.save();
        res.status(201).json(event)
        
    } catch (err) {
        const errors = err.message
        res.status(400).json({errors})
    }
}

const all_day_events = async(req ,res)=>{

    const id = req.params.id;
    allday.find({owner:id}).then((result)=>{
        res.status(201).json(result)  
    })
}

const event =async (req ,res)=>{

    const id = req.params.id;
    try {
        allday.findById({_id:id}).sort({createdAt:1})
        .then((result)=>{
            res.status(201).json(result)
        })
        
    } catch (error) {
        console.log(error)
    }
}

const edit_event = async (req ,res)=>{
    const data = await allday.findById(req.params.id)
    if(!data)return res.send("EVENT NOT FOUND")
    res.render('alldayedit' , {allday : data})
}

const update_event = async (req , res)=>{
    try {
          const id  = req.params.id
          const result = await allday.findByIdAndUpdate(id ,{
              
                  eventName: req.body.eventName,
                  location : req.body.location,
                
            },{new:true})
              res.send({result})
            
       } catch (err) {
          console.log(err)
       }

}

const delete_event = (req ,res)=>{
    const id = req.params.id
    allday.findByIdAndDelete(id)
    .then(result=>{
        res.status(200).json(result)
    })
}

module.exports ={
    create_event,
    all_day_events,
    edit_event,
    update_event,
    delete_event,
    event

}