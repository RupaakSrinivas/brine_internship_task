/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useUser, ProductData, FavoritesData } from "../context";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { user, updateCart, updateFavorites } = useUser();
  const [ isFavorite, setIsFavorite ] = useState(false);
  const [ cartStatus, setCartStatus ] = useState(false);

  const baseUrl = process.env.REACT_APP_API_BASEURL;
  const [product, setProduct] = useState<ProductData>({
    id: 0,
    title: "",
    description: "",
    image: "",
    amount: "",
    rating: "",
  });

  useEffect(() => {
    try {
      axios.get(baseUrl + "products/" + id).then((response) => {
        if (response.data) {
          setProduct(response.data);
        }
      });
      const favorites = user?.favorites.favoriteitems || [];
      const favitem = favorites.find((item) => item.id === product.id);
      if (favitem) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
      const cart = user?.cart || { items: [], price: 0 };
      const items = cart.items;
      const item = items.find((item) => item.id === product.id);
      if (item) {
        setCartStatus(true);
      } else {
        setCartStatus(false);
      }
    } catch (error) {
      window.alert(error);
    }
    
  }, [id, user ]);

  const handleAddItemCart = () => {
    const cart = user?.cart || { items: [], price: 0 };
    const items = cart.items;
    const item = items.find((item) => item.id === product?.id);
    if (item) {
      const index = items.findIndex((item) => item.id === product?.id);
      if (index !== -1) {
        items.splice(index, 1);
      }
    } else {
      items.push({
        id: product.id,
        quantity: 1,
        title: product.title,
        image: product.image,
        amount: product.amount,
      });
    }
    cart.items = items;
    updateCart(cart);
    const Data = {
      "cart":{
        items: items,
        price: cart.price,
      },
      }
    axios.patch(process.env.REACT_APP_API_BASEURL + `users/${user?.id}`, Data);
  };

  const handleFavoriteToggle = () => {
    const favorites = user?.favorites.favoriteitems || [];
    const favitem = favorites.find((item) => item.id === product.id);
    if (favitem) {
      const index = favorites.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        favorites.splice(index, 1);
      }
    } else {
      favorites.push({
        id: product.id,
        title: product.title,
        image: product.image,
        amount: product.amount,
        quantity: 1,
      });
    }
    const Data: FavoritesData = {
      email: user?.email || "",
      favoriteitems: favorites,
    };
    updateFavorites(Data);
    axios.patch(process.env.REACT_APP_API_BASEURL + `favourites/${user?.id}`, Data);
  };

  return (
    <div className="flex flex-col md:flex-row justify-around w-full items-center p-4">
      <div className="w-fit md:max-w-[40vw] flex justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-fit max-h-[60vh] object-cover border  rounded-lg shadow-sm"
        />
      </div>
      <div className="w-full flex flex-col md:max-w-[35vw] md:h-[60vh]">
        <div className="flex flex-row w-full justify-between items-center pr-2">
          <h1 className="text-2xl font-bold py-4 max-w-[80%]">
            {product.title}
          </h1>
          <FaHeart
            id="favorite"
            className={`h-6 w-auto hover:cursor-pointer ${isFavorite ? "text-red-600" : "text-gray-500"}`}
            onClick={handleFavoriteToggle}
          />
        </div>
        <p className="text-sm text-gray-500 mt-4">{product.description}</p>
        <p className="text-sm pt-4 text-gray-500">&#8377; {product.amount}</p>
        <div className="h-max w-full md:max-w-[35vw] flex justify-between align-center mt-8 md:mt-auto self-end">
          <button
            className="bg-[#0478ee] text-white px-4 py-2 rounded-lg hover:cursor-pointer"
            onClick={handleAddItemCart}
          >
            {cartStatus ? "Remove from Cart" : "Add to Cart"}
          </button>
          <button className="bg-[#0478ee] text-white px-4 py-2 rounded-lg hover:cursor-pointer">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
