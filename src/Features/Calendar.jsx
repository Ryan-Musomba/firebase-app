import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState('');
  const navigate = useNavigate();

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleAddEvent = () => {
    if (newEvent.trim() === '') return; 
    setEvents([...events, { date: date.toDateString(), title: newEvent }]);
    setNewEvent(''); 
  };

  const handleDeleteEvent = (eventIndex) => {
    setEvents(events.filter((_, index) => index !== eventIndex));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold">Calendar</h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
        >
          Back
        </button>
      </div>
      <Calendar
        onChange={handleDateChange}
        value={date}
        className="w-full h-[400px]" 
        tileClassName={({ date, view }) =>
          view === 'month' && date.getDate() % 2 === 0
            ? 'bg-gray-100 border-b border-gray-300'
            : 'bg-white border-b border-gray-300'
        }
      />
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Events on {date.toDateString()}</h3>
        <ul className="mb-4">
          {events
            .filter((event) => event.date === date.toDateString())
            .map((event, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 p-2 rounded-lg mb-2"
              >
                <span>{event.title}</span>
                <button
                  onClick={() => handleDeleteEvent(index)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
        </ul>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Add new event"
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
            className="border rounded-lg p-2 flex-1 mr-2"
          />
          <button
            onClick={handleAddEvent}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Add Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;