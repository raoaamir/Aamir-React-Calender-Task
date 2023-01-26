import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [cities, setCities] = useState([]);

  const owner = localStorage.getItem("email");

  const getLocations = async () => {
    const where = encodeURIComponent(
      JSON.stringify({
        name: {
          $exists: true,
        },
      })
    );
    const response = await fetch(
      `https://parseapi.back4app.com/classes/City?limit=1000&order=name&where=${where}`,
      {
        headers: {
          "X-Parse-Application-Id": "q1QfxhDv1KLM5OPzUFzZRIvYERUAFLWEWX9r053J",
          "X-Parse-Master-Key": "POcTYBgrQ52WGn2lJrcQrYwFFM44uhQ2eqmoy8hS",
        },
      }
    );
    const data = await response.json();
  

    setCities(data.results);
  };
  useEffect(() => {
    getLocations();
  }, []);
  const handleEvent = async (e) => {
    e.preventDefault();
    console.log("createeee", location);
    try {
      const result = await fetch("http://localhost:5000/event", {
        method: "POST",
        body: JSON.stringify({
          eventName,
          location,
          startTime,
          endTime,
          owner,
        }),
        headers: { "Content-Type": "application/json" },
      });

      navigate("/calender");

      const data = await result.json();
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    var id = "";
    document.querySelectorAll(".start").forEach((opt) => {
      if (opt.value === e.target.value) {
        id = opt.id;
      }
    });

    document.querySelectorAll(".end").forEach((opt) => {
      if (parseFloat(opt.id) <= parseFloat(id)) {
        opt.disabled = true;
      }
    });
  };
  return (
    <div className="create-blog content">
      <form onSubmit={handleEvent}>
        <h3>Create New Event</h3>
        <label>Event Name:</label>
        <input
          type="text"
          id="eventName"
          name="eventName"
          onChange={(e) => setEventName(e.target.value)}
          required
        />
        <label>Location:</label>

        <Autocomplete
          id="country-select-demo"
          sx={{ width: 360 }}
          options={cities}
          autoHighlight
          getOptionLabel={(option) => option?.name}
          onChange={(event, newValue) => {
            setLocation(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            setLocation(newInputValue);
          }}
          inputValue={location}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose a country"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        />

        <label>Start Time:</label>
        <select
          id="startTime"
          required
          value={startTime}
          name="startTime"
          onChange={(e) => {
            setStartTime(e.target.value);
            handleChange(e);
          }}
        >
          <option className="start" id="9" value="9">
            9:00am
          </option>
          <option className="start" id="9.5" value="9.5">
            {" "}
            9:30am
          </option>
          <option className="start" id="10" value="10">
            {" "}
            10:00am
          </option>
          <option className="start" id="10.5" value="10.5">
            {" "}
            10:30am
          </option>
          <option className="start" id="11" value="11">
            {" "}
            11:00am
          </option>
          <option className="start" id="11.5" value="11.5">
            {" "}
            11:30am
          </option>
          <option className="start" id="12" value="12">
            12:00pm{" "}
          </option>
          <option className="start" id="12.5" value="12.5">
            {" "}
            12:30pm
          </option>
          <option className="start" id="13" value="13">
            {" "}
            1:00pm
          </option>
          <option className="start" id="13.5" value="13.5">
            {" "}
            1:30pm
          </option>
          <option className="start" id="14" value="14">
            {" "}
            2:00pm
          </option>
          <option className="start" id="14.5" value="14.5">
            {" "}
            2:30pm
          </option>
          <option className="start" id="15" value="15">
            {" "}
            3:00pm
          </option>
          <option className="start" id="15.5" value="15.5">
            {" "}
            3:30pm
          </option>
          <option className="start" id="16" value="16">
            {" "}
            4:00pm
          </option>
          <option className="start" id="16.5" value="16.5">
            {" "}
            4:30pm
          </option>
          <option className="start" id="17" value="17">
            {" "}
            5:00pm
          </option>
          <option className="start" id="17.5" value="17.5">
            {" "}
            5:30pm
          </option>
          <option className="start" id="18" value="18">
            {" "}
            6:00pm
          </option>
          <option className="start" id="18.5" value="18.5">
            {" "}
            6:30pm
          </option>
          <option className="start" id="19" value="19">
            {" "}
            7:00am
          </option>
          <option className="start" id="19.5" value="19.5">
            {" "}
            7:30pm
          </option>
        </select>
        <label>End Time:</label>
        <select
          id="endTime"
          name="endTime"
          required
          className="end"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        >
          <option className="end" id="9" value="9">
            9:00am
          </option>
          <option className="end" id="9.5" value="9.5">
            {" "}
            9:30am
          </option>
          <option className="end" id="10" value="10">
            {" "}
            10:00am
          </option>
          <option className="end" id="10.5" value="10.5">
            {" "}
            10:30am
          </option>
          <option className="end" id="11" value="11">
            {" "}
            11:00am
          </option>
          <option className="end" id="11.5" value="11.5">
            {" "}
            11:30am
          </option>
          <option className="end" id="12" value="12">
            12:00pm{" "}
          </option>
          <option className="end" id="12.5" value="12.5">
            {" "}
            12:30pm
          </option>
          <option className="end" id="13" value="13">
            {" "}
            1:00pm
          </option>
          <option className="end" id="13.5" value="13.5">
            {" "}
            1:30pm
          </option>
          <option className="end" id="14" value="14">
            {" "}
            2:00pm
          </option>
          <option className="end" id="14.5" value="14.5">
            {" "}
            2:30pm
          </option>
          <option className="end" id="15" value="15">
            {" "}
            3:00pm
          </option>
          <option className="end" id="15.5" value="15.5">
            {" "}
            3:30pm
          </option>
          <option className="end" id="16" value="16">
            {" "}
            4:00pm
          </option>
          <option className="end" id="16.5" value="16.5">
            {" "}
            4:30pm
          </option>
          <option className="end" id="17" value="17">
            {" "}
            5:00pm
          </option>
          <option className="end" id="17.5" value="17.5">
            {" "}
            5:30pm
          </option>
          <option className="end" id="18" value="18">
            {" "}
            6:00pm
          </option>
          <option className="end" id="18.5" value="18.5">
            {" "}
            6:30pm
          </option>
          <option className="end" id="19" value="19">
            {" "}
            7:00pm
          </option>
          <option className="end" id="19.5" value="19.5">
            {" "}
            7:30pm
          </option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateEvent;