import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, set } from "firebase/database";
import { useAuth } from '../context/AuthContext'; // Ensure this path is correct

function Menus({ addToCart }) {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { user, loading: authLoading } = useAuth(); // Get user and auth loading state

    // Debug: Log the user state to see if it’s updating correctly
    useEffect(() => {
        console.log("Current user:", user);
    }, [user]);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
                if (!response.ok) throw new Error("Failed to fetch meals");
                const data = await response.json();
                setMeals(data.meals || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMeals();
    }, []);

    const handleOrder = (meal) => {
        // Strict check for user authentication
        if (!user || !user.uid) {
            console.log("No user logged in, redirecting to login...");
            alert("You must sign in to place an order!");
            navigate("/login");
            return;
        }

        // Proceed with order if user is logged in
        console.log("User is logged in, proceeding with order:", user.uid);
        addToCart(meal);

        const orderId = Date.now(); 
        const orderRef = ref(getDatabase(), 'orders/' + orderId);
        set(orderRef, {
            mealName: meal.strMeal,
            price: (Math.random() * 20 + 5).toFixed(2),  
            status: 'Order Received',
            userId: user.uid, // Tie order to user
        }).catch((error) => {
            console.error("Failed to save order to Firebase:", error);
            setError("Failed to place order. Please try again.");
        });

        navigate("/cart");
    };

    // Handle loading states
    if (authLoading || loading) {
        return (
            <div className="container mx-auto p-4 text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600 mx-auto"></div>
                <p className="mt-2 text-green-600">Loading...</p>
            </div>
        );
    }

    if (error) {
        return <div className="container mx-auto p-4 text-center text-red-500">Error: {error}</div>;
    }

    if (meals.length === 0) {
        return <div className="container mx-auto p-4 text-center text-gray-500">No meals found.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-green-600">Delicious Meals Just for You!</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {meals.map((meal) => {
                    const price = (Math.random() * 20 + 5).toFixed(2); 

                    return (
                        <div key={meal.idMeal} className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-lg overflow-hidden bg-white shadow-lg">
                            <img
                                src={meal.strMealThumb}
                                alt={meal.strMeal}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">{meal.strMeal}</h3>
                                <p className="text-gray-600 mb-4">Price: <span className="font-bold text-green-600">${price}</span></p>
                                <button
                                    onClick={() => handleOrder(meal)}
                                    className={`w-full px-4 py-2 rounded-lg transition duration-300 ${user ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
                                    disabled={!user} // Disable if no user
                                >
                                    {user ? "Order Now" : "Sign In to Order"}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Menus;