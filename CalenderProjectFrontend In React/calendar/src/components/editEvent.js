import React, {useState} from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
let arr;
var name;
var loc;
var sTime;
var eTime;

const EditEvent = () => {
    const navigate = useNavigate();
    const {id} =useParams()

    const [eventName ,setEventName] = useState();
    const [location, setLocation] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [data, setData] =  useState()
    const [once, setOnce] = useState(true)
    
    const handleEvent = async (e) => {
            e.preventDefault();
           
        try {
            const result = await fetch('http://localhost:5000/post/'+id, {
                method: 'PUT',
                body: JSON.stringify({eventName , location , startTime , endTime}),
                headers: { 'Content-Type': 'application/json' }

            })
            navigate('/calender')

            const data = await result.json()
            console.log(data);
        
        } catch (error) {
            console.log(error)
        }
    }

       
        fetch("http://localhost:5000/e/"+id)
        .then(res=>{
            if(!res.ok){
                throw Error ('Could not fetch the data from that resource')
            }
            res.json()
            .then(data =>{
                setData(data)
            })
    
          })
            if(data && once){
                setOnce(false)
                arr = data
                name = arr.eventName
                loc = arr.location
                sTime=arr.startTime
                eTime = arr.endTime
              
                  
                };

      
   




    
    return ( 
        
        <div className="create-blog content">

        <form onSubmit={handleEvent}>
            <h3>Edit Event</h3>
          <label>Event Name:</label>
          <input type="text" id="eventName" name="eventName" defaultValue={name} onChange={(e) => setEventName(e.target.value)} required />
          <label>Location:</label>
          <input type="text" id="location" name="location" defaultValue={loc}  onChange={(e) => setLocation(e.target.value)} required />
          <label >StartTime:</label>
          <input type="text" id="startTime" name="startTime" defaultValue={sTime}  onChange={(e) => setStartTime(e.target.value)} required /> 
          <label >EndTime:</label>
          <input type="text" id="endTime" name="endTime" defaultValue={eTime} onChange={(e) => setEndTime(e.target.value)} required/>
          <button type="submit">Update</button>
        </form>
        </div>
        
        ); 
}
 
export default EditEvent;