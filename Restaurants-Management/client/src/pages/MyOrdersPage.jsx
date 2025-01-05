import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Circles } from 'react-loader-spinner';
import { useLocation } from 'react-router-dom';

const MyOrdersPage = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "DineFusion | My Orders";
    document.title = pageTitle;
  }, [location]);
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch orders for the logged-in user
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.email) {
        toast.error('User is not logged in.');
        return;
      }
      setLoading(true);
      try {
        const response = await axios.get(
          `https://restaurants-server-theta.vercel.app/my-orders?email=${user.email}`, { withCredentials: true }
        );
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  // Handle delete order
  const handleDelete = async (orderId) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `https://restaurants-server-theta.vercel.app/orders/${orderId}`, { withCredentials: true }
      );
      if (response.status === 200) {
        setOrders((prevOrders) => {
          const updatedOrders = prevOrders.filter((order) => order._id !== orderId);
          toast.success('Order deleted successfully!');
          return updatedOrders;
        });
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Failed to delete order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-orders-page p-4 sm:p-6 lg:p-10">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center">My Orders</h1>

      {/* Spinner during loading */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            visible={true}
          />
        </div>
      ) : orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm sm:text-base">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="p-3">#</th>
                <th className="p-3">Food Image</th>
                <th className="p-3">Food Name</th>
                <th className="p-3">Price</th>
                {/* Hide these columns on small screens */}
                <th className="p-3 sm:table-cell hidden">Food Owner</th>
                <th className="p-3 sm:table-cell hidden">Buying Date</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id} className="border-t">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">
                    <img
                      src={order.foodImage}
                      alt={order.foodName}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                    />
                  </td>
                  <td className="p-3">{order.foodName}</td>
                  <td className="p-3">${order.price}</td>
                  {/* Hide these columns on small screens */}
                  <td className="p-3 sm:table-cell hidden">{order.foodOwner}</td>
                  <td className="p-3 sm:table-cell hidden">
                    {moment(order.buyingDate).format('MMMM Do YYYY, h:mm:ss a')}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="btn btn-error btn-sm w-full sm:w-auto"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">You have no orders yet.</p>
      )}
    </div>
  );
};

export default MyOrdersPage;
