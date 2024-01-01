import { MdAddShoppingCart } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface ProductData {
    id: number;
    title: string;
    description: string;
    image: string;
    amount: string;
    rating: string;
}  


export default function ItemComponent(data: ProductData) {

    const rating = parseInt(data.rating);
    const Navigate = useNavigate();

    const handleProductPage = () => {
        Navigate(`/product/${data.id}`);
    }

    return (
        <div className="flex flex-col m-4 w-[270px] h-[360px] aspect-square border rounded-lg bg-white shadow-sm" onClick={handleProductPage}>
            <img src={data.image} alt={data.title} className="w-full h-[50%] object-cover border-t rounded-t-lg" />
            <div className="flex flex-col p-4">
                <h1 className="text-xl font-bold line-clamp-2 h-[2lh]">{data.title}</h1>
                {/* <p className="text-sm text-gray-500">{data.description}</p> */}
                <p className="text-sm pt-4 text-gray-500">&#8377; {data.amount}</p>
                <p className={`text-sm text-black ${rating >= 4 ? 'bg-green-500' : (rating >= 3 ? 'bg-yellow-300' : 'bg-red-500')} w-fit px-2 rounded mt-2`}>{data.rating}</p>
            </div>
            <div className="w-full px-4 pb-2 h-full flex flex-row justify-between items-end">
                <FaHeart className="h-6 w-auto hover:cursor-pointer text-gray-500"/>
                <MdAddShoppingCart className="h-6 w-auto hover:cursor-pointer text-gray-500"/>
            </div>
        </div>
    );
}