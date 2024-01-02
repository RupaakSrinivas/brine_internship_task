import { useUser, cartItem } from "../context";
import ItemComponent from "../components/ItemComponent";
import { useEffect, useState } from "react";

export default function FavoritesPage() {
  const { user } = useUser();
  const [products, setProducts] = useState<cartItem[]>([]);

useEffect(() => {
    setProducts(user?.favorites.favoriteitems || []);
}
, [user]);

  return (
    <div className="flex flex-wrap justify-center items-align w-full h-auto">
            {products.map((product: cartItem) => (
                <ItemComponent
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    description=""
                    image={product.image}
                    amount={product.amount}
                    rating="4"
                />
            ))}
        </div>
    );
}
