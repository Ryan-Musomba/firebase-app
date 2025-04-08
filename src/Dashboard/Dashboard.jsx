import React from 'react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config'; // Adjust path as needed

const Dashboard = () => {
  const [orderData, setOrderData] = React.useState({
    labels: [],
    datasets: [
      {
        label: 'Orders Per Day',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  React.useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'orders'),
      (snapshot) => {
        const ordersPerDay = {};

        snapshot.forEach((doc) => {
          const order = doc.data();
          const timestamp = order.timestamp?.seconds;
          if (timestamp) {
            const orderDate = new Date(timestamp * 1000);
            const day = orderDate.toLocaleDateString('en-US', { weekday: 'long' });
            ordersPerDay[day] = (ordersPerDay[day] || 0) + 1;
          }
        });

        setOrderData({
          labels: Object.keys(ordersPerDay),
          datasets: [
            {
              label: 'Orders Per Day',
              data: Object.values(ordersPerDay),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      },
      (error) => {
        console.error('Firestore error:', error);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex flex-row">
        <aside className="w-64 bg-secondary text-secondary-foreground p-4">
          <h1 className="text-2xl font-bold mb-6">Food Express</h1>
          <nav>
            <ul>
              <li className="mb-4"><a href="#" className="hover:text-accent">Dashboard</a></li>
              <li className="mb-4"><a href="#" className="hover:text-accent">Orders</a></li>
              <li className="mb-4"><a href="/calendar" className="hover:text-accent">Calendar</a></li>
              <li className="mb-4"><a href="#" className="hover:text-accent">Order ID</a></li>
              <li className="mb-4"><a href="#" className="hover:text-accent">General Customers</a></li>
              <li className="mb-4"><a href="#" className="hover:text-accent">Analytics</a></li>
              <li className="mb-4"><a href="#" className="hover:text-accent">Reviews</a></li>
              <li className="mt-6"><span className="text-muted-foreground">Apps</span></li>
              <li className="mb-4"><a href="#" className="hover:text-accent">Icons <span className="text-pink-500">New</span></a></li>
              <li className="mb-4"><a href="#" className="hover:text-accent">CMS <span className="text-pink-500">New</span></a></li>
              <li className="mb-4"><a href="#" className="hover:text-accent">Charts</a></li>
              <li className="mb-4"><a href="#" className="hover:text-accent">Bootstrap</a></li>
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <header className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold">Dashboard</h2>
          </header>

          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="bg-gradient-to-r from-green-300 to-green-500 p-4 rounded-lg text-white">
              <h3 className="text-2xl">459</h3>
              <p>Total Menus Available</p>
            </div>
            <div className="bg-gradient-to-r from-green-300 to-green-500 p-4 rounded-lg text-white">
              <h3 className="text-2xl">$87,561</h3>
              <p>Total Revenue Generated</p>
            </div>
            <div className="bg-gradient-to-r from-green-300 to-green-500 p-4 rounded-lg text-white">
              <h3 className="text-2xl">872</h3>
              <p>Total Registered Customers</p>
            </div>
            <div className="bg-gradient-to-r from-green-300 to-green-500 p-4 rounded-lg text-white">
              <h3 className="text-2xl">247</h3>
              <p>Total Orders Processed</p>
            </div>
          </div>

          <section className="bg-card p-4 rounded-lg">
            <h3 className="text-xl font-semibold">Orders Summary</h3>
            <p className="text-muted-foreground">Track the status of your orders in real-time.</p>
            <div className="flex justify-between mt-4">
              <button className="bg-primary text-primary-foreground rounded-lg p-2">Monthly</button>
              <button className="bg-primary text-primary-foreground rounded-lg p-2">Weekly</button>
              <button className="bg-primary text-primary-foreground rounded-lg p-2">Today</button>
            </div>
            <div className="mt-4">
              <h4 className="text-2xl">$456,005.56</h4>
              <p className="text-muted-foreground">Revenue generated this month.</p>
            </div>
          </section>

          <section className="bg-card p-4 rounded-lg mt-6">
            <h3 className="text-xl font-semibold">Orders Per Day</h3>
            <Bar data={orderData} options={{ responsive: true }} />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;