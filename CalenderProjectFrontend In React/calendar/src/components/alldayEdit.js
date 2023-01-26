import React, {useState} from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
let arr;
var name;
var loc;




const EditAllDayEvent = () => {
    const navigate = useNavigate();

    const {id} =useParams()


    const [eventName ,setEventName] = useState();
    const [location, setLocation] = useState('');
    const [data, setData] =  useState()
    const [once, setOnce] = useState(true)
   
    
    const handleEvent = async (e) => {
            e.preventDefault();
           
        try {
            const result = await fetch('http://localhost:5000/edit/'+id, {
                method: 'PUT',
                body: JSON.stringify({eventName , location}),
                headers: { 'Content-Type': 'application/json' }

            })
            navigate('/calender')



            const data = await result.json()
            console.log(data);
        
        } catch (error) {
            console.log(error)
        }
    }

    fetch("http://localhost:5000/ed/"+id)
        .then(res=>{
            if(!res.ok){
                throw Error ('Could not fetch the data from that resource')
            }
            res.json()
            .then(data =>{
              console.log(data)
                setData(data)
            })
    
          })
            if(data && once){
                setOnce(false)
                arr = data
                console.log(arr)
                name = arr.eventName
                loc = arr.location
             
              
                  
                };

    return ( 
        
        <div className="create-blog content">

        <form onSubmit={handleEvent}>
            <h3>Edit Event</h3>
          <label>Event Name:</label>
          <input type="text" id="eventName" name="eventName" defaultValue={name} onChange={(e) => setEventName(e.target.value)} required />
          <label>Location:</label>
          <input type="text" id="location" name="location" defaultValue={loc} onChange={(e) => setLocation(e.target.value)} required />
          <input type="text"  id="owner" name="owner"/>
      
          <button type="submit">Update</button>
        </form>
        </div>
        
        ); 
}
 
export default EditAllDayEvent;