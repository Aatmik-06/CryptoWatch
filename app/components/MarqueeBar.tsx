'use client';

import { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MarketData {
  total_market_cap: number;
  total_volume: number;
  market_cap_change_percentage_24h: number;
  active_cryptocurrencies: number;
}

export default function MarqueeBar() {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/global');
        const data = await response.json();
        setMarketData({
          total_market_cap: data.data.total_market_cap.usd,
          total_volume: data.data.total_volume.usd,
          market_cap_change_percentage_24h: data.data.market_cap_change_percentage_24h_usd,
          active_cryptocurrencies: data.data.active_cryptocurrencies,
          // bitcoin : data.data.
        });
      } catch (error) {
        console.error('Error fetching market data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000); 

    return () => clearInterval(interval);
  }, []);

  if (loading || !marketData) {
    return (
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-2">
          <div className="animate-pulse flex ">
          <div className="h-4 bg-muted rounded w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"></div>
          <div className="h-4 bg-muted rounded w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"></div>
          <div className="h-4 bg-muted rounded w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"></div>
    </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background border-b border-border" id="top-bar">
      <div className="container flex  gap-5 mx-auto px-4 py-2" id='top-bar-1'>
        <div className="flex flex-wrap justify-items-start gap-2 text-xs sm:text-sm">
          <div className="flex items-center gap-1" id='top-div'>
            <span className="text-muted-foreground">Market Cap:</span>
            <span className="font-medium text-primary">${(marketData.total_market_cap / 1e12).toFixed(2)}T</span>
            <span className={`flex items-center gap-0.5 ${marketData.market_cap_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {marketData.market_cap_change_percentage_24h >= 0 ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
              {Math.abs(marketData.market_cap_change_percentage_24h).toFixed(2)}%
            </span>
          </div>  
          <div className="flex items-center gap-1" id='hours-vloume-div'>
            <span className="text-muted-foreground">24h Volume:</span>
            <span className="font-medium">${(marketData.total_volume / 1e9).toFixed(2)}B</span>
          </div>
          <div className="flex items-center gap-1" id='top-div'>
            <span className="text-muted-foreground">Active Cryptocurrencies:</span>
            <span className="font-medium">{marketData.active_cryptocurrencies.toLocaleString()}</span>
          </div>
         
        </div>

      
      </div>
    </div>
  );
} 

