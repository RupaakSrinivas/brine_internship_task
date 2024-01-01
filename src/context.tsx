import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export type cartItem = {
  id: number;
  quantity: number;
  title: string;
  image: string;
  amount: string;
};

export type cartItems = {
  items: cartItem[];
  price: number;
};

export interface UserData {
  name: string;
  profilePic: string;
  username: string;
  password: string;
  email: string;
  cart: cartItems;
};

export type OrderData = {
  orderid: number;
  cart: cartItems;
};

export interface Order {
  useremail: string;
  orderdata: OrderData;
};

interface UserContextType {
  user: UserData | null;
  setUser: Dispatch<SetStateAction<UserData | null>>;
  login: (userData: UserData) => void;
  logout: () => void;
  updateCart: (cart: cartItems) => void;
  getCart: () => cartItems;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserData | null>(null);

  const login = (userData: UserData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateCart = (cart: cartItems) => {
    if (user) {
      setUser({ ...user, cart: cart });
    }
  };

  const getCart = () => {
    return user?.cart || { items: [], price: 0 };
  };

  const contextValue: UserContextType = {
    user,
    setUser,
    login,
    logout,
    updateCart,
    getCart,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
