"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface OrderContextProps {
  orderBy: string;
  setOrderBy: Dispatch<SetStateAction<string>>;
}

const OrderContext = createContext<OrderContextProps | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [orderBy, setOrderBy] = useState<string>("");

  return (
    <OrderContext.Provider value={{ orderBy, setOrderBy }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = (): OrderContextProps => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
