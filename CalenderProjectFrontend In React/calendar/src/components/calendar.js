import React, { useState } from "react";
import {useEffect } from "react";
const Calendar = () => {
    const [data, setData] =  useState()
    const [alldata ,setAllData] = useState()
    const [once, setOnce] = useState(true)
    const [all ,setAll] =useState(true)
    let daily = []
    var p = 0
    var count;
    var starttime2 = 0;
    var format = 0;
    var timeform = "";
    let arr=[];
     var elementArray = [];

     const colors = [
      "red",
      "green",
      "blue",
      "yellow",
      "purple",
      "cyan",
      "gray",
      "limegreen",
      "pink",
      "orange",
      "magenta"
    ];
    
    
    function setAllDay(id){
    
      daily.forEach((element)=>{
        let allday = document.createElement("div");
        const color = Math.floor(Math.random() * colors.length);
        allday.style.background = colors[color];
        let x = document.createElement("p")
        let c = document.createElement("span")
        let y = document.createElement("p")
        let s = document.createElement('a')
        let E = document.createElement('a')
        E.innerHTML = "Edit";
        E.style.textDecoration="none"
        E.style.marginLeft = "2px"
        E.style.color = "white"
        E.style.backgroundColor = "green"
        E.style.fontSize = "12px"
        E.style.padding = "4px"
        E.setAttribute("href", "/all/" + element._id)
        s.innerHTML = "Delete"
        s.style.textDecoration="none"
        s.style.color = "white"
        s.style.fontSize = "12px"
        s.style.backgroundColor = "red"
        s.style.marginLeft ="3px"
        s.style.padding = "4px"
        s.setAttribute("href" , "http://localhost:5000/del/" + element._id)
        x.innerHTML = "ALL DAY-";
        c.innerHTML = element.eventName; 
        y.innerHTML = element.location;
        allday.appendChild(x);
        allday.appendChild(c);
        allday.appendChild(y);
        allday.appendChild(s);
        allday.appendChild(E)
       
    
        allday.setAttribute("class","inner")
        c.style.color = "green"
    
        let d = document.getElementById("outer");
        d.appendChild(allday);
    
      });
    }

    function createEvent(eventName, loc, time, endtime , id) {
      settime(time);
    
      var Container = document.createElement("div");
      Container.classList.add("event");
      count = p.toString()
      Container.id = count
      Container.style.height = cheight(endtime, time);
      const color = Math.floor(Math.random() * colors.length);
      Container.style.background = colors[color];
      var ti = document.createElement('h3');
      ti.innerHTML = starttime2.toString()
      var name = document.createElement('h6');
      name.innerHTML = eventName
      var location = document.createElement('span');
      location.innerHTML = loc
      location.style.color = "balck"
      location.style.fontSize = "small"
     
      var del = document.createElement('a')
      del.style.color = "white"
      del.style.textDecoration="none"
      del.style.backgroundColor = "red"
      del.style.padding = "4px"
      del.style.width="35px"
      del.style.marginLeft="7px"
      del.style.fontSize="small"
      del.style.marginBottom="3px"
      del.innerHTML = "Delete"
     del.setAttribute("href" , "/delete/" + id)
     
    
     var edit = document.createElement('a')
     edit.innerHTML = "Edit"
     edit.style.color = "white"
     edit.style.textDecoration="none"
     edit.style.backgroundColor = "green"
     edit.style.height = "14px"
     edit.style.padding = "4px"
     edit.style.width="35px"
     edit.style.marginLeft="7px"
     edit.style.fontSize="small"
     edit.style.marginBottom="3px"
     edit.setAttribute("href" ,"/edit/" + id)
    
      Container.appendChild(ti);
      Container.appendChild(name);
      Container.appendChild(location);
      Container.appendChild(del)
      Container.appendChild(edit)
      var element = document.getElementById(time);
      element.appendChild(Container);
      elementArray.push(Container);
      p++;
      
    
    }
    
    function cheight(a, b) {
    
      var c = (((a - b) * 1.9) * 2).toString() + "rem"
      return c;
    }
    
    function eventOverlap(evt1, evt2) {
      const domRect1 = evt1.getBoundingClientRect();
      const domRect2 = evt2.getBoundingClientRect();
    
      return !(
        domRect1.top > domRect2.bottom ||
        domRect1.right < domRect2.left ||
        domRect1.bottom < domRect2.top ||
        domRect1.left > domRect2.right
      );
    }

   
    function settime(time) {
      time = time.toString();
      format = time.split('.');

      if (format[0] > 12) {
        starttime2 = format[0] - 12;
        timeform = " PM-";
      }
      else {
        starttime2 = format[0];
        timeform = " AM-";
      }
      if (format[1]) {
        starttime2 = starttime2.toString() + ":30" + timeform;
      } else {
        starttime2 = starttime2.toString() + ":00" + timeform;
      }
    }
    
    
   
    useEffect(()=>{

       const owner = localStorage.getItem('email')
        fetch(`http://localhost:5000/send/${owner}`)
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
            data.sort(function(a,b){return a.startTime-b.startTime})
            arr = data
           console.log(arr)
           //console.log(arr)
            arr.forEach((element) => {
                createEvent(element.eventName, element.location, element.startTime, element.endTime , element._id)
              
            });
        } 

        for (let i = 0; i < elementArray.length; i++) {
          for (let j = i + 1; j < elementArray.length; j++) {
            if (eventOverlap(elementArray[i], elementArray[j])) {
                var s = elementArray[i].parentElement 
              var height = ((s.id - arr[j].startTime) * -1.9 * 2).toString() + "rem";
              var left = ((s.id -arr[j].startTime) -30 ).toString() +"rem"
              s.appendChild(elementArray[j]);
              elementArray[j].style.marginTop = height;
              elementArray[j].style.marginLeft=left
          }

          }
        
        }

        

        fetch(`http://localhost:5000/all_events/${owner}` )
        .then(res=>{
  
          if(!res.ok){
              throw Error ('Could not fetch the data from that resource')
          }
          res.json()
          .then((data) =>{
              setAllData(data)
          })
        })

        if(alldata && all){
          setAll(false)
          daily = alldata

          setAllDay()
      } 
    },[once,alldata, data,createEvent, elementArray ])

    return ( 

        
         
        <div className="calendar-container">

        <div id="head">
            <h5>Friday April 1</h5>
            
        </div>

        <div id="outer"></div>

        <div className="Am_container">
            <div className="am">

                <h1>AM</h1>

                <div className="timecontainer">

                    <div id="9" className="slot">9:00</div>
                    <div id="9.5" className="timeslothalf">9:30</div>
                    <div id="10" className="timeslotfull">10:00</div>
                    <div id="10.5" className="timeslothalf">10:30</div>
                    <div id="11" className="timeslotfull">11:00</div>
                    <div id="11.5" className="timeslothalf">11:30</div>

                </div>

            </div>
        </div>

        <div className="Pm_container">
            <div className="pm">
                <h1>PM</h1>

                <div className="timecontainer">
                    <div id="12" className="slot">12:00</div>
                    <div id="12.5" className="timeslothalf">12:30</div>
                    <div id="13" className="timeslotfull">1:00</div>
                    <div id="13.5" className="timeslothalf">1:30</div>
                    <div id="14" className="timeslotfull">2:00</div>
                    <div id="14.5" className="timeslothalf">2:30</div>
                    <div id="15" className="timeslotfull">3:00</div>
                    <div id="15.5" className="timeslothalf">3:30</div>
                    <div id="16" className="timeslotfull">4:00</div>
                    <div id="16.5" className="timeslothalf">4:30</div>
                    <div id="17" className="timeslotfull">5:00</div>
                    <div id="17.5" className="timeslothalf">5:30</div>
                    <div id="18" className="timeslotfull">6:00</div>
                    <div id="18.5" className="timeslothalf">6:30</div>
                    <div id="19" className="timeslotfull">7:00</div>
                    <div id="19.5" className="timeslothalf">7:30</div>
                    <div id="20" className="timeslotfull">8:00</div>
                    <div id="20.5" className="timeslothalf">8:30</div>

                </div>

            </div>
            
        </div> 
        
      


    </div>



    
     );
}
 
export default Calendar;