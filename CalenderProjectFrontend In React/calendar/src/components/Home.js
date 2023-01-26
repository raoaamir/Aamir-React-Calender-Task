import React from "react"


const Homepage = () => {

    const user = localStorage.getItem('email')
    return (
        <div className="homepage">
            <a href="/calender"><h1>Go To Calender</h1></a>
            <h3>{user}</h3>
            <img src="pexels-ylanite-koppens-796602.jpg"  alt="" />
        </div>
    )
}

export default Homepage;