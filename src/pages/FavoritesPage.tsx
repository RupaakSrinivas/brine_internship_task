import { useUser, cartItem, ProductData } from "../context";
import ItemComponent from "../components/ItemComponent";
import { useEffect, useState } from "react";
import axios from "axios";

export default function FavoritesPage() {
  const { user } = useUser();
  const [products, setProducts] = useState<ProductData[]>([]);
  const baseUrl = process.env.REACT_APP_API_BASEURL;

  useEffect(() => {
    document.title = "Favorites";
    if (user === null) return;
    const favorites = user.favorites.favoriteitems || [];
    axios.get(baseUrl + "products").then((response) => {
      if (response.data ) {
        const data = response.data;
        const favproducts = data.filter((product: ProductData) => {
          const item = favorites.find((item: cartItem) => item.id === product.id);
          if (item) {
            return true;
          } else {
            return false;
          }
        });
        setProducts(favproducts);
      }
    });
  }, [user, baseUrl]);

  return (
    <div className="flex flex-wrap justify-center items-align w-full h-auto">
        {products.length === 0 ? (
            <p className="text-xl">You have no Favorite products</p>
        ) : (
            products.map((product: ProductData) => (
                <ItemComponent
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    description={product.description}
                    image={product.image}
                    amount={product.amount}
                    rating={product.rating}
                />
            ))
        )}
    </div>
  );
}
