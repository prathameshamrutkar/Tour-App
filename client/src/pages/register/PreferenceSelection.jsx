import React, { useState } from "react";
import './register.css'

const PreferenceSelection = ({ onSubmit }) => {
  const [preferences, setPreferences] = useState({
    destination: "",
    travelStyle: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences({ ...preferences, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(preferences);
  };

  return (
    <div className="login">
      <div className="lContainer">
        <select
          name="destination"
          value={preferences.destination}
          onChange={handleChange}
          autoFocus={true}
          className="select"
        >
          <option value="" disabled hidden style={{ color: 'lightgray' }}>Destination</option>
          <option value="Agra">Agra</option>
          <option value="New Delhi">New Delhi</option>
          <option value="Jaipur">Jaipur</option>
          <option value="Kochi">Kochi</option>
          <option value="Udaipur">Udaipur</option>
          <option value="Kashmir">Kashmir</option>
          <option value="Leh & Ladakh">Leh & Ladakh</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Rajastan">Rajastan</option>
          <option value="Kerala">Kerala</option>
        </select>
        <select
          name="travelStyle"
          value={preferences.travelStyle}
          onChange={handleChange}
          className="select"
        >
          <option value="" disabled hidden style={{ color: 'lightgray' }}>Travel Style</option>
          <option value="In-depth Cultural">In-depth Cultural</option>
          <option value="Explorer">Explorer</option>
          <option value="Safari">Safari</option>
          <option value="Hiking & Trekking">Hiking & Trekking</option>
          <option value="Active Adventure">Active Adventure</option>
        </select>
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={preferences.price}
          onChange={handleChange}
          className="lInput"
          onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
        />
        <button type="submit" onClick={handleSubmit} className="lButton">Save Preferences</button>
      </div>
    </div>
  );
};

export default PreferenceSelection;
