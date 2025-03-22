'use client';

import { useState, useEffect } from 'react';
import { Search, TrendingUp, Newspaper, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import axios from "axios"
import img1 from "./Assets/img.png"

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
  max_supply: number | null;
  market_cap_rank: number;
  price_change_percentage_7d: number;
}

interface NewsItem {
  title: string;
  description: string;
  date: string;
}

const cryptoNews: NewsItem[] = [
  {
    title: "Bitcoin Reaches New Heights",
    description: "The world's leading cryptocurrency continues its bullish trend as institutional adoption grows.",
    date: "2025-03-20"
  },
  {
    title: "DeFi Revolution",
    description: "Decentralized Finance protocols are reshaping traditional financial systems.",
    date: "2025-03-19"
  },
  {
    title: "Green Mining Initiative",
    description: "Major crypto mining operations transition to renewable energy sources.",
    date: "2025-03-18"
  }
];

async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(url, { 
        signal: controller.signal,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw new Error('Failed after retries');
}

export default function Home() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleCoinClick = (coinId: string) => {
    // You can add any additional logic here before navigation
    console.log(`Navigating to coin: ${coinId}`);
  };

  useEffect(() => {
    let isMounted = true;

    const fetchCoins = async () => {
      const options = {
        method: 'GET',
        url: 'https://api.coingecko.com/api/v3/coins/markets',
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 100,
          sparkline: false,
          price_change_percentage: '24h,7d'
        },
        headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-kn4mzED9f94TGtdGsPf3sZrd'}
      };
      
      axios
        .request(options)
        .then(res => {
          if (isMounted) {
            setCoins(res.data);
            setError(null);
            setLoading(false);
          }
        })
        .catch(err => {
          if (isMounted) {
            console.error('Error fetching coins:', err);
            setError('Failed to load cryptocurrency data. Please try again later.');
            setLoading(false);
          }
        });
    };

    fetchCoins();
    const interval = setInterval(fetchCoins, 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen">
      {/* Market Cap Summary */}
      <div className="container-padding py-4 bg-card/50 backdrop-blur-sm border-b border-border">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <h2 className="heading-3 text-center sm:text-left">Today's Cryptocurrency Prices by Market Cap</h2>
          <div className="flex items-center gap-2">
            <span className="body-text">The global crypto market cap is</span>
            <span className="heading-3 text-primary">$2.76T</span>
            <span className="body-text">a</span>
            <span className="text-green-500">0.88%</span>
            <span className="body-text">increase over the last day.</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="hero-grid absolute inset-0 opacity-10"></div>
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pt-8 sm:pt-20 pb-16 sm:pb-32">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-center">
            <div className="space-y-4 sm:space-y-8">
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
                The Future of Digital Assets
              </h1>
              <p className="text-base sm:text-xl text-muted-foreground">
                Track real-time cryptocurrency prices, market trends, and insights on the most secure and advanced crypto platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <Button size="default" className="glow w-full sm:w-auto">
                  Get Started <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button size="default" variant="secondary" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative order-first lg:order-last">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
              <img
                src="https://imgproxy.gamma.app/resize/quality:80/resizing_type:fit/width:1200/https://cdn.gamma.app/a699hwuvbchbj8u/generated-images/tfCmVMsapZO1cHYFJyq0b.jpg"
                alt="Cryptocurrency"
                className="relative rounded-2xl animate-float w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Coins Section */}
      <section className="py-8 sm:py-16 px-2 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-6 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-primary mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
              <TrendingUp className="w-6 h-6 sm:w-10 sm:h-10" />
              Live Market Data
            </h2>
            <div className="w-full max-w-md relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 sm:h-5 sm:w-5" />
              <Input
                type="text"
                placeholder="Search cryptocurrencies..."
                className="pl-9 sm:pl-10 text-sm sm:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-destructive text-center mb-4 sm:mb-8 text-sm sm:text-base">{error}</div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {loading
              ? Array(90)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="p-2 sm:p-4">
                      <Skeleton className="h-[200px] sm:h-[250px] rounded-xl" />
                    </div>
                  ))
              : filteredCoins.map((coin) => (
                  <Link 
                    href={`/coin/${coin.id}`} 
                    key={coin.id}
                    onClick={() => handleCoinClick(coin.id)}
                  >
                    <Card className="p-4 sm:p-6 hover:scale-105 transition-transform duration-200 cursor-pointer hover:glow">
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className="flex items-center gap-2 sm:gap-4">
                          <img
                            src={coin.image}
                            alt={coin.name}
                            className="w-8 h-8 sm:w-12 sm:h-12"
                          />
                          <div>
                            <h2 className="text-lg sm:text-xl font-semibold">{coin.name}</h2>
                            <p className="text-xs sm:text-sm text-muted-foreground uppercase">
                              {coin.symbol}
                            </p>
                          </div>
                        </div>
                        <div className="text-xs sm:text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                          Rank #{coin.market_cap_rank}
                        </div>
                      </div>
                      
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex justify-between items-center">
                          <p className="text-xl sm:text-2xl font-bold">
                            ${coin.current_price.toLocaleString()}
                          </p>
                          <div className="flex flex-col items-end">
                            <p
                              className={`text-xs sm:text-sm font-medium ${
                                coin.price_change_percentage_24h > 0
                                  ? 'text-green-500'
                                  : 'text-red-500'
                              }`}
                            >
                              {coin.price_change_percentage_24h > 0 ? '+' : ''}
                              {coin.price_change_percentage_24h?.toFixed(2) || '0.00'}% (24h)
                            </p>
                            <p
                              className={`text-xs sm:text-sm ${
                                coin.price_change_percentage_7d > 0
                                  ? 'text-green-500'
                                  : 'text-red-500'
                              }`}
                            >
                              {coin.price_change_percentage_7d > 0 ? '+' : ''}
                              {coin.price_change_percentage_7d?.toFixed(2) || '0.00'}% (7d)
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                          <div>
                            <p className="text-muted-foreground">Market Cap</p>
                            <p className="font-medium">${(coin.market_cap / 1e9).toFixed(2)}B</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">24h Volume</p>
                            <p className="font-medium">${(coin.total_volume / 1e9).toFixed(2)}B</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Circulating Supply</p>
                            <p className="font-medium">
                              {coin.circulating_supply.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Max Supply</p>
                            <p className="font-medium">
                              {coin.max_supply ? coin.max_supply.toLocaleString() : '∞'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-8 sm:py-16 px-2 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-bold text-primary mb-6 sm:mb-12 flex items-center gap-2 sm:gap-3">
            <Newspaper className="w-6 h-6 sm:w-10 sm:h-10" />
            Latest Crypto News
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {cryptoNews.map((news, index) => (
              <Card key={index} className="p-4 sm:p-6 hover:glow transition-shadow duration-200">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{news.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-2 sm:mb-3">{news.description}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{news.date}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/30 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-primary mb-4">CryptoWatch</h3>
              <p className="text-muted-foreground">
                Your trusted source for cryptocurrency market data and insights.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Features</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Help Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">API Documentation</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Market Data</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-secondary mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 CryptoWatch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

