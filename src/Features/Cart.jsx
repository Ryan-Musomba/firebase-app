import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cart, removeFromCart, clearCart }) => {
  return (
    <div className="w-full bg-gray-100 min-h-screen py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

        
        {cart.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>Your cart is empty!</p>
            <Link to="/" className="text-green-600 font-semibold hover:underline">
              Go back to menu
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              
              {cart.map((meal) => (
                <div key={meal.idMeal} className="flex items-center justify-between border-b py-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{meal.strMeal}</h3>
                      <p className="text-gray-600">Price: ${Math.random() * 20 + 5}</p>
                    </div>
                  </div>

                 
                  <button
                    onClick={() => removeFromCart(meal.idMeal)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  Clear Cart
                </button>
                <div className="font-semibold text-lg">Total: ${cart.length * (Math.random() * 20 + 5).toFixed(2)}</div>
              </div>

              
              <button
                onClick={() => alert('Proceeding to checkout...')}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
