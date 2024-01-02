import { useEffect, useState } from "react";
import { useUser, Order, OrderData } from "../context";
import axios from "axios";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";

export default function Cart() {
  const { getCart, updateCart, user } = useUser();
  const [confirm, setConfirm] = useState(false);
  const baseUrl = process.env.REACT_APP_API_BASEURL;
  const cartItems = getCart();
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const cart = getCart();
    const items = cart.items;
    const totalQuantity = items.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setQuantity(totalQuantity);
    setDeliveryCharges(totalQuantity * 50);
    if (totalQuantity === 0) {
      setDiscount(0);
    } else if (totalQuantity < 10) {
      setDiscount(50);
    } else if (totalQuantity < 20) {
      setDiscount(100);
    }
  }, [getCart]);

  const handleOrderPlaced = () => {
    const cart = { items: [], price: 0 };
    updateCart(cart);
    const Data = {
      cart: {
        items: [],
        price: 0,
      },
    };
    axios.put(process.env.REACT_APP_API_BASEURL + `users/${user?.id}`, Data);

    const orderdata: OrderData = {
      orderid: Math.floor(Math.random() * 10000000),
      cart: cartItems,
    };
    const order: Order = {
      useremail: user?.email || "",
      orderdata: orderdata,
    };
    try {
      axios.post(baseUrl + "orders", order);
      axios.put(baseUrl + "users/?email=" + user?.email, user?.cart);
      console.log(user?.cart);
    } catch (e: any) {
      window.alert(e);
      console.log(e);
    }
    setConfirm(true);
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    const updatedItems = cartItems.items.map((item) => {
      if (item.id === parseInt(itemId)) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    const updatedPrice = updatedItems.reduce(
      (total, item) => total + parseInt(item.amount) * item.quantity,
      0
    );

    const newPrice = Math.max(updatedPrice, 0);
    const cart = { items: updatedItems, price: newPrice };
    updateCart(cart);
    const Data = {
      cart: {
        items: updatedItems,
        price: newPrice,
      },
    };
    axios.put(process.env.REACT_APP_API_BASEURL + `users/${user?.id}`, Data);
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center self-start  lg:ml-[10vw]">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="bg-white w-fit mx-auto md:mx-0 p-4">
            <p className="text-2xl font-bold">My Cart</p>
            <p className="text-gray-500">Items in your cart</p>
            {cartItems.items.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.items.map((item) => (
                <div
                  key={item.id}
                  className="w-full md:w-[600px] h-[10rem] flex flex-row justify-start items-center border rounded-md shadow-md overflow-hidden mt-4 pr-2"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-w-[20%] object-cover shadow-sm"
                  />
                  <div className="w-full flex flex-col justify-between items-start p-4">
                    <p className="text-xl font-bold line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-black m-2">&#8377; {item.amount}</p>
                    <div className="w-full flex flex-row justify-between items-center">
                      <div className="flex items-center">
                        <button
                          className="text-gray-500 px-2 py-1 border border-gray-500 rounded-md"
                          onClick={() =>
                            handleQuantityChange(
                              `${item.id}`,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity === 0}
                        >
                          -
                        </button>
                        <p className="text-gray-500 mx-2">{item.quantity}</p>
                        <button
                          className="text-gray-500 px-2 py-1 border border-gray-500 rounded-md"
                          onClick={() =>
                            handleQuantityChange(
                              `${item.id}`,
                              item.quantity + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                      <IoMdCloseCircleOutline
                        className="h-full text-2xl text-red-600 w-auto hover:scale-110 hover:cursor-pointer"
                        onClick={() => handleQuantityChange(`${item.id}`, 0)}
                      />
                    </div>
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
              <p className="text-gray-500">&#8377; {discount}</p>
            </div>
            <div className="flex flex-row w-full justify-between items-center">
              <p className="text-gray-500">Delivery Charges</p>
              <p className="text-gray-500">&#8377; {deliveryCharges}</p>
            </div>
            <p className="w-full border border-gray-400 my-2"></p>
            <div className="flex flex-row w-full justify-between items-center">
              <p className="text-gray-500">Total Amount</p>
              <p className="text-gray-500">
                &#8377;{" "}
                {cartItems.items.length === 0
                  ? 0
                  : cartItems.price + deliveryCharges - discount}
              </p>
            </div>
          </div>
        </div>
        <button
          className="bg-[#0478ee] w-fit text-white px-4 py-2 rounded-lg hover:cursor-pointer mt-4 disabled:opacity-50 focus:scale-95"
          onClick={handleOrderPlaced}
          disabled={quantity === 0}
        >
          Place Order
        </button>
      </div>
      <div
        className={`absolute top-0 justify-center items-center h-screen w-screen bg-black bg-opacity-50 ${
          confirm ? "flex" : "hidden"
        }`}
        onClick={() => setConfirm(false)}
      >
        <div
          className="bg-white rounded p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-2xl font-bold">Order Placed</p>
          <div className="w-full flex justify-center">
            <FaCheckCircle className="text-green-500 text-center w-[20vw] md:w-[10vw] h-auto" />
          </div>
          <p className="text-gray-500">
            Your order has been placed successfully.
            <br />
            It will be delivered in {Math.floor(Math.random() * 5) + 1} working
            days.
          </p>
          <button
            className="bg-[#0478ee] w-fit text-white px-4 py-2 rounded-lg hover:cursor-pointer mt-4"
            onClick={() => setConfirm(false)}
          >
            OK
          </button>
        </div>
      </div>
    </>
  );
}
