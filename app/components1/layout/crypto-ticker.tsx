"use client"
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

type CryptoData = {
  id: string;
  name: string;
  price: number;
  change: number;
  icon: string;
};

export function CryptoTicker() {
  const [cryptos] = useState<CryptoData[]>([
    { id: "bnb", name: "BNB", price: 0.26, change: 0.26, icon: "bnb" },
    { id: "sol", name: "Solana", price: 131.25, change: -0.05, icon: "sol" },
    { id: "usdc", name: "USDC", price: 1.00, change: -0.00, icon: "usdc" },
    { id: "trx", name: "TRON", price: 0.138, change: 0.64, icon: "trx" },
    { id: "btc", name: "Bitcoin", price: 68392.12, change: 0.29, icon: "btc" },
    { id: "eth", name: "Ethereum", price: 3216.48, change: 2.48, icon: "eth" },
    { id: "usdt", name: "Tether", price: 1.00, change: 0.03, icon: "usdt" },
    { id: "xrp", name: "XRP", price: 0.59, change: -0.12, icon: "xrp" },
  ]);

  // Market stats
  const marketCap = "$2.76T";
  const marketCapChange = "+1.78%";
  const volume = "$105.32B";
  const activeCryptocurrencies = "17,047";

  return (
    <div className="w-full bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto">
        {/* Ticker */}
        <div className="overflow-hidden py-2">
          <div className="flex space-x-8">
            {cryptos.map((crypto) => (
              <div key={crypto.id} className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center">
                  <span className="text-xs font-semibold">{crypto.icon.substring(0, 1).toUpperCase()}</span>
                </div>
                <span className="font-medium text-white">{crypto.name}</span>
                <span className="text-gray-400">${crypto.price.toLocaleString()}</span>
                <span 
                  className={`flex items-center ${
                    crypto.change >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {crypto.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  <span className="ml-1">{Math.abs(crypto.change)}%</span>
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Market stats */}
        <div className="text-sm text-gray-400 border-t border-gray-800 py-2 flex flex-wrap justify-center md:justify-start gap-x-6">
          <span>Market Cap: <span className="text-white">{marketCap}</span> <span className="text-green-500">{marketCapChange}</span></span>
          <span>24h Volume: <span className="text-white">{volume}</span></span>
          <span>Active Cryptocurrencies: <span className="text-white">{activeCryptocurrencies}</span></span>
        </div>
      </div>
    </div>
  );
}
