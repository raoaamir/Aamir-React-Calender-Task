import React from "react";
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";

const EventDelete = () => {
    const {id} =useParams()
    const navigate = useNavigate()

    const handleEvent = async () => {
       
    try {
        const result = await fetch("http://localhost:5000/delete/"+id, {
            method: 'GET',
        })
        navigate('/calender')

        const data = await result.json()

    
    } catch (error) {
        console.log(error)
    }
}
handleEvent()
    return ( 

        <button onClick={handleEvent}></button>
     );
}
 
export default EventDelete;