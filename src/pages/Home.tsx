import axios from "axios";
import { useEffect, useState } from "react";
import ItemComponent from "../components/ItemComponent";

interface ProductData {
  id: number;
  title: string;
  description: string;
  image: string;
  amount: string;
  rating: string;
}

export default function Home() {
  const baseUrl = process.env.REACT_APP_API_BASEURL;
  const [products, setProducts] = useState<ProductData[]>([]);
  useEffect(() => {
    try {
      axios.get(baseUrl + "products").then((response) => {
        if (response.data) {
          setProducts(response.data);
        }
      });
    } catch (error) {
      window.alert(error);
    }
  }, [baseUrl]);

  return (
    <div className="flex flex-wrap justify-center items-align w-full h-auto">
      {products.map((product: ProductData) => (
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
