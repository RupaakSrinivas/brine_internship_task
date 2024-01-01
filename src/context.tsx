import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export type cartItem = {
  id: string;
  quantity: number;
};

export type cartItems = {
  items: cartItem[];
};

export interface UserData {
  name: string;
  profilePic: string;
  username: string;
  password: string;
  email: string;
  cart: cartItems;
}

interface UserContextType {
  user: UserData | null;
  setUser: Dispatch<SetStateAction<UserData | null>>;
  login: (userData: UserData) => void;
  logout: () => void;
  updateCart: (cart: cartItem[]) => void;
  getCart: () => cartItems["items"];
}

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

  const updateCart = (cart: cartItem[]) => {
    if (user) {
      setUser({ ...user, cart: { items: cart } });
    }
  };

  const getCart = () => {
    return user?.cart.items || [];
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
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
