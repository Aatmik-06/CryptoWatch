'use client';

import { createContext, ReactNode, useState } from "react";

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

interface CoinContextType {
  currentCoin: CoinData | null;
  setCurrentCoin: (coin: CoinData) => void;
}

export const CoinContext = createContext<CoinContextType | undefined>(undefined);

interface CoinContextProviderProps {
  children: ReactNode;
}

const CoinContextProvider: React.FC<CoinContextProviderProps> = ({ children }) => {
  const [currentCoin, setCurrentCoin] = useState<CoinData | null>(null);

  return (
    <CoinContext.Provider value={{ currentCoin, setCurrentCoin }}>
      {children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
