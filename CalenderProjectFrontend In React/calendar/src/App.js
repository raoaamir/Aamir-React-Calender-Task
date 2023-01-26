import React from "react";
import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Calendar from "./components/calendar";
import CreateEvent from "./components/createEvent";
import EditEvent from "./components/editEvent";
import CreateAlldayEvent from "./components/createAlldayEvent";
import EditAllDayEvent from "./components/alldayEdit";
import EventDelete from "./components/eventDelete";
import ProtectedRoute from "./components/Protected";



function App() {


  return (
    <div className="App">

      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={ <Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>

          <Route element={<ProtectedRoute/>}>
          <Route path="/delete/:id" element={<EventDelete/>}/>
          <Route path="/calender" element={<Calendar/>}/>
          <Route path="/create" element={<CreateEvent/>}/>
          <Route path="/edit/:id" element={<EditEvent/>} />
           <Route path="/alldayevent" element={<CreateAlldayEvent />} />
          <Route path="/all/:id" element={<EditAllDayEvent/>} />
        </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
