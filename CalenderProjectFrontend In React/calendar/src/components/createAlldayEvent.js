import React, { useState } from "react"
import { useNavigate } from "react-router-dom";

const CreateAlldayEvent = () => {

    const navigate = useNavigate();
    const [eventName, setEventName] = useState('');
    const [location, setLocation] = useState('');
    const owner = localStorage.getItem('email')

    const handleEvent = async (e) => {
        e.preventDefault();
        try {
            const result = await fetch('http://localhost:5000/allday', {
                method: 'POST',
                body: JSON.stringify({ eventName, location , owner }),
                headers: { 'Content-Type': 'application/json' }

            })
            navigate('/calender')


            const data = await result.json()
            console.log(data)

        } catch (error) {
            console.log(error)
        }
    }
    return (

        <div className="create-blog content">
            <form onSubmit={handleEvent}>
                <h3>Create New Event</h3>
                <label>Event Name:</label>
                <input type="text" id="eventName" name="eventName" onChange={(e) => setEventName(e.target.value)} required />
                <label>Location:</label>
                <input type="text" id="location" name="location" onChange={(e) => setLocation(e.target.value)} required />
                <button type="submit">Submit</button>
            </form>
        </div>

    );
}

export default CreateAlldayEvent;