import { useState } from "react";
import { useUser, Order, OrderData } from "../context";
import axios from "axios";

export default function Cart() {
  const { getCart, updateCart, user } = useUser();
  const cartItems = getCart();
  const [ showConfirm, setConfirm ] = useState(false);
  const baseUrl = process.env.REACT_APP_API_BASEURL;

  const handleOrderPlaced = () => {
    updateCart({ items: [], price: 0 });
    const orderdata: OrderData = {
        orderid: Math.floor(Math.random() * 10000000),
        cart: cartItems,
        };
    const order: Order = {
        useremail: user?.email || "",
        orderdata: orderdata,
    };
    try{
        axios.post(baseUrl + "orders", order);
    } catch (e: any) {
        window.alert(e);
        console.log(e);
    }
    try{
        axios.put(baseUrl + "users", user);
    } catch (e: any) {
        window.alert(e);
        console.log(e);
    }
    setConfirm(true);
  };

  cartItems.items.map((item) => console.log(item));

  return (
    <div className="w-full flex flex-col justify-center self-start  lg:ml-[10vw]">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="bg-white w-fit mx-auto md:mx-0 p-4">
          <p className="text-2xl font-bold">My Cart</p>
          <p className="text-gray-500">Items in your cart</p>
        {cartItems.items.length === 0 ? (
            <p>Your cart is empty.</p>
        ) : (
            cartItems.items.map((item) => (
                // console.log(item)
                <div
                    key={item.id}
                    className="w-full md:w-[600px] h-[10rem] flex flex-row justify-start items-center border rounded-md shadow-md overflow-hidden mt-4"
                >
                    <img
                        src={item.image}
                        alt={item.title}
                        className="max-w-[20%] object-cover shadow-sm"
                    />
                    <div className="flex flex-col justify-between items-start p-4">
                        <p className="text-xl font-bold line-clamp-1">{item.title}</p>
                        <p className="text-gray-500">&#8377; {item.amount}</p>
                        <p className="text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                </div>
            ))
        )}
        </div>
        <div className="flex flex-col h-fit w-[18rem] mx-auto md:mx-0 p-4 bg-white rounded shadow-md">
          <p className="text-2xl font-bold">Price Details</p>
          <div className="flex flex-row w-full justify-between items-center">
            <p className="text-gray-500">Price</p>
            <p className="text-gray-500">&#8377; {cartItems.price}</p>
          </div>
          <div className="flex flex-row w-full justify-between items-center">
            <p className="text-gray-500">Discount Price</p>
            <p className="text-gray-500">&#8377; {(cartItems.items.length === 0)?0:100}</p>
          </div>
          <div className="flex flex-row w-full justify-between items-center">
            <p className="text-gray-500">Delivery Charges</p>
            <p className="text-gray-500">&#8377; {(cartItems.items.length === 0)?0:100}</p>
          </div>
          <p className="w-full border border-gray-400 my-2"></p>
          <div className="flex flex-row w-full justify-between items-center">
            <p className="text-gray-500">Total Amount</p>
            <p className="text-gray-500">
              &#8377; {(cartItems.items.length === 0)?0:(cartItems.price - 100 + 50)}
            </p>
          </div>
        </div>
      </div>
      <button
        className="bg-[#0478ee] w-fit text-white px-4 py-2 rounded-lg hover:cursor-pointer mt-4"
        onClick={handleOrderPlaced}
      >
        Place Order
      </button>
    </div>
  );
}
