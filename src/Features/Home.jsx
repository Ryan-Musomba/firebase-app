import React, { useState } from 'react';
import { MagnifyingGlassIcon, StarIcon } from "@heroicons/react/24/solid";
import { useNavigate } from 'react-router-dom';

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [meals, setMeals] = useState([]);
  const [deliveryOption, setDeliveryOption] = useState("Deliver now");
  const [scheduledTime, setScheduledTime] = useState("");
  const navigate = useNavigate();

  
  const locations = [
    "Nairobi Central Business District (CBD)",
    "Westlands",
    "Kilimani",
    "Lang'ata",
    "Karen",
    "Parklands",
    "Eastleigh",
    "Gikambura",
    "Ruiru",
    "Juja",
    "Nairobi West",
    "Hurlingham",
    "Lavington",
    "South B",
    "South C",
    "Ngong Road",
    "Ngara",
    "Upper Hill",
    "Kasarani",
    "Roysambu",
    "Kawangware",
    "Ziwani",
    "Buru Buru",
    "Embakasi",
    "Mombasa Road",
    "Thika Road",
    "Kilimani",
    "Jamhuri",
    "Donholm",
    "Waiyaki Way"
  ];

  
  const fetchLocationSuggestions = () => {
    if (searchQuery.trim() === "") {
      setSuggestions([]); 
      return;
    }

    const filteredLocations = locations.filter((location) =>
      location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSuggestions(filteredLocations);
  };

  
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    fetchLocationSuggestions();  
  };

  
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);  
  };

  
  const fetchMeals = async () => {
    if (!searchQuery.trim()) return;
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`);
      const data = await response.json();
      setMeals(data.meals || []);
      navigate("/menus");  
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  return (
    <div className="w-full bg-gray-100 h-max">
      <div className="relative w-full h-[600px] bg-cover bg-center flex flex-col justify-center items-center text-white text-center" style={{ backgroundImage: "url('bg.jpg')" }}>
        <h1 className="text-4xl font-bold mb-4">Order Delivery Near You</h1>
        <div className="flex flex-col sm:flex-row items-center w-full max-w-2xl bg-white rounded-full shadow-lg overflow-hidden px-4 py-2 space-y-2 sm:space-y-0 sm:space-x-2 relative z-10">
          <div className="flex items-center w-full sm:w-auto flex-grow relative">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Enter delivery address"
              className="flex-1 py-2 outline-none text-gray-700"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 w-full bg-white border border-gray-200 mt-1 rounded-md z-20 shadow-lg text-left max-h-48 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <select
            className="px-4 py-2 bg-white border border-gray-300 rounded-md outline-none text-black"
            value={deliveryOption}
            onChange={(e) => setDeliveryOption(e.target.value)}
          >
            <option>Deliver now</option>
            <option>Schedule for later</option>
          </select>

          {deliveryOption === "Schedule for later" && (
            <input
              type="datetime-local"
              className="px-4 py-2 border border-gray-300 rounded-md text-black"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
            />
          )}

          <button
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
            onClick={fetchMeals}
          >
            Find Food
          </button>
        </div>
      </div>

     
      {meals.length > 0 && (
        <div className="px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-6">
          {meals.map((meal) => (
            <div key={meal.idMeal} className="shadow-lg rounded-lg overflow-hidden bg-white">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{meal.strMeal}</h2>
                <div className="flex items-center text-yellow-500">
                  <StarIcon className="h-5 w-5" />
                  <span className="ml-1 font-semibold">4.5</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;


