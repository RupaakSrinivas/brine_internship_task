import { useUser, ProductData } from "../context";
import ItemComponent from "../components/ItemComponent";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";

export default function FavoritesPage() {
    const { user } = useUser();
    const favorites = useMemo(() => user?.favorites.favoriteitems || [], [user]);
    const baseUrl = process.env.REACT_APP_API_BASEURL;
    const [products, setProducts] = useState<ProductData[]>([]);

    useEffect(() => {
        const fetchAllProducts = async () => {
          try {
            const response = await axios.get(baseUrl + "products");
            if (response.data) {
              setProducts(response.data);
            }
          } catch (error) {
            window.alert(error);
          }
        };
    
        fetchAllProducts();
      }, [baseUrl]);
    
      const filteredProducts = useMemo(() => {
        if (!favorites.length || !products.length) return [];
    
        // Filter products based on the product IDs in favorites
        return products.filter((product) => favorites.some((fav) => fav.id === product.id));
      }, [favorites, products]);

    return (
        <div className="flex flex-wrap justify-center items-align w-full h-auto">
            {filteredProducts.map((product: ProductData) => (
                <ItemComponent
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    description={product.description}
                    image={product.image}
                    amount={product.amount}
                    rating={product.rating}
                />
            ))}
        </div>
    );
}
