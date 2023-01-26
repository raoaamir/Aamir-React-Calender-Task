import React from "react";
import {Link, useNavigate} from "react-router-dom";


const Navbar = () =>{

    const auth =localStorage.getItem('token')
    const user = localStorage.getItem('email')
    const navigate = useNavigate()

    const logout =()=>{
        localStorage.clear();
        navigate('/register')
    }
    return ( 
   <nav className="navbar">
     <Link to="/"><h1>Calender Project</h1></Link>
     { auth ? 
     <div className="links">
       <Link>{user}</Link >
        <Link to="/calender" > View Calender </Link>
        <Link to="/create">Create New Event</Link >
        <Link to="/alldayevent">Create AllDay Event</Link >
        <Link to="/register" onClick={logout} >Logout</Link >
     </div>
     : 
     <div className="link"> 
         <Link to="/register">SignUp</Link >
        <Link to="/Login">Login</Link >
     </div>
     } 
   </nav>
    );
}
 
export default Navbar;