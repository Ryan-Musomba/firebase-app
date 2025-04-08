import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { ref, onValue } from "firebase/database";
import { database } from './firebase/config';

function TrackingOrder() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const orderRef = ref(database, `orders/${orderId}`);
        const unsubscribe = onValue(orderRef, (snapshot) => {
            if (snapshot.exists()) {
                setOrder(snapshot.val());
            } else {
                setError("Order not found");
            }
        });

        return () => unsubscribe();
    }, [orderId]);

    if (error) {
        return <div className="container mx-auto p-4 text-center text-red-500">Error: {error}</div>;
    }

    if (!order) {
        return (
            <div className="container mx-auto p-4 text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600 mx-auto"></div>
                <p className="mt-2 text-green-600">Loading...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-green-600">Order Status</h2>
            <div className="bg-white shadow-lg rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{order.mealName}</h3>
                <p className="text-gray-600 mb-4">Price: <span className="font-bold text-green-600">${order.price}</span></p>
                <p className="text-gray-600 mb-4">Status: <span className="font-bold text-green-600">{order.status}</span></p>
            </div>
        </div>
    );
}

export default TrackingOrder;