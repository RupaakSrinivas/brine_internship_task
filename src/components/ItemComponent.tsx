import { MdAddShoppingCart } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser, ProductData, FavoritesData } from "../context";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ItemComponent(data: ProductData) {
  const { user, getCart, updateCart, updateFavorites } = useUser();
  const rating = parseInt(data.rating);
  const Navigate = useNavigate();
  const [cartStatus, setCartStatus] = useState(false);
  //   const [favorites, setFavorites] = useState<FavoritesData[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleProductPage = () => {
    Navigate(`/product/${data.id}`);
  };

  const baseUrl = process.env.REACT_APP_API_BASEURL;

  useEffect(() => {
    const cart = getCart();
    const items = cart.items;
    const item = items.find((item) => item.id === data.id);
    if (item) {
      setCartStatus(true);
    } else {
      setCartStatus(false);
    }
    const favorites = user?.favorites.favoriteitems || [];
    const favitem = favorites.find((item) => item.id === data.id);
    if (favitem) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [data.id, getCart, user]);

  const handleAddItemCart = () => {
    const cart = user?.cart || { items: [], price: 0 };
    const items = cart.items;
    const item = items.find((item) => item.id === data.id);
    if (item) {
      const index = items.findIndex((item) => item.id === data.id);
      if (index !== -1) {
        items.splice(index, 1);
      }
    } else {
      items.push({
        id: data.id,
        quantity: 1,
        title: data.title,
        image: data.image,
        amount: data.amount,
      });
    }
    cart.items = items;
    updateCart(cart);
  };

  const handleFavoriteToggle = () => {
    if (user === null) return;
    const items = user.favorites.favoriteitems || [];
    const item = items.find((item) => item.id === data.id);
    if (item) {
      const index = items.findIndex((item) => item.id === data.id);
      if (index !== -1) {
        items.splice(index, 1);
      }
    } else {
      items.push({
        id: data.id,
        title: data.title,
        image: data.image,
        amount: data.amount,
        quantity: 1,
      });
    }
    // favorites.items = items;
    const Data: FavoritesData = {
      email: user?.email || "",
      favoriteitems: items,
    };

    try{
        axios.post(baseUrl + `favorites`, Data);
        updateFavorites(Data);
        setIsFavorite(!isFavorite);
    } catch (e: any) {
        window.alert(e);
        console.log(e);
    }
  };

  return (
    <div
      className="flex flex-col m-4 w-[270px] h-[360px] aspect-square border rounded-lg bg-white shadow-sm"
      onClick={handleProductPage}
    >
      <img
        src={data.image}
        alt={data.title}
        className="w-full h-[50%] object-cover border-t rounded-t-lg"
      />
      <div className="flex flex-col p-4">
        <h1 className="text-xl font-bold line-clamp-2 h-[2lh]">{data.title}</h1>
        {/* <p className="text-sm text-gray-500">{data.description}</p> */}
        <p className="text-sm pt-4 text-gray-500">&#8377; {data.amount}</p>
        <p
          className={`text-sm text-black ${
            rating >= 4
              ? "bg-green-500"
              : rating >= 3
              ? "bg-yellow-300"
              : "bg-red-500"
          } w-fit px-2 rounded mt-2`}
        >
          {data.rating}
        </p>
      </div>
      <div
        className="w-full px-4 pb-2 h-full flex flex-row justify-between items-end"
        onClick={(e) => e.stopPropagation()}
      >
        <FaHeart
          className={`h-6 w-auto hover:cursor-pointer ${
            isFavorite ? "text-red-500" : "text-gray-500"
          }`}
          onClick={handleFavoriteToggle}
        />
        <MdAddShoppingCart
          className={`h-6 w-auto hover:cursor-pointer ${
            cartStatus ? "text-blue-500" : "text-gray-500"
          }`}
          onClick={handleAddItemCart}
        />
      </div>
    </div>
  );
}
