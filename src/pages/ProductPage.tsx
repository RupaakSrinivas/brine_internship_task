/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

interface ProductData {
  id: number;
  title: string;
  description: string;
  image: string;
  amount: string;
  rating: string;
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();

  const baseUrl = process.env.REACT_APP_API_BASEURL;
  const [product, setProduct] = useState<ProductData>();
  useEffect(() => {
    try {
      axios.get(baseUrl + "products/" + id).then((response) => {
        if (response.data) {
          setProduct(response.data);
        }
      });
    } catch (error) {
      window.alert(error);
    }
  }, [id]);

  return (
    <div className="flex flex-col md:flex-row justify-around w-full items-center p-4">
      <div className="w-fit md:max-w-[40vw] flex justify-center">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-fit max-h-[60vh] object-cover border  rounded-lg shadow-sm"
        />
      </div>
      <div className="w-full flex flex-col md:max-w-[35vw] md:h-[60vh]">
        <div className="flex flex-row w-full justify-between items-center pr-2">
          <h1 className="text-2xl font-bold py-4 max-w-[80%]">
            {product?.title}
          </h1>
          <FaHeart id="favorite" className="h-6 w-auto hover:cursor-pointer text-gray-500" />
        </div>
        <p className="text-sm text-gray-500 mt-4">{product?.description}</p>
        <p className="text-sm pt-4 text-gray-500">&#8377; {product?.amount}</p>
        <div className="h-max w-full md:max-w-[35vw] flex justify-between align-center mt-8 md:mt-auto self-end">
          <button className="bg-[#0478ee] text-white px-4 py-2 rounded-lg hover:cursor-pointer">
            Add to Cart
          </button>
          <button className="bg-[#0478ee] text-white px-4 py-2 rounded-lg hover:cursor-pointer">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
