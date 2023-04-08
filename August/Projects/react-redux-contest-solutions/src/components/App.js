import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAppointment } from '../action';
import '../styles/App.css';

const App = () => {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const appointments = useSelector((state) => state.appointments);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAppointment({ name, time, description }));
    setName('');
    setTime('');
    setDescription('');
  };

  return (
    <div id="main">
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="name-input"/>
        <br />
        <label>Time:</label>
        <input type="text" value={time} onChange={(e) => setTime(e.target.value)} className="time-input"/>
        <br />
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="description-input"/>
        <br />
        <button type="submit">Add Appointment</button>
      </form>
      <br />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Time</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index}>
              <td>{appointment.name}</td>
              <td>{appointment.time}</td>
              <td>{appointment.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


export default App;
