"use client";

import { useState, useEffect } from "react";
import {
  Search,
  TrendingUp,
  Newspaper,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Marquee from "react-fast-marquee";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import MarqueeBar from "./components/MarqueeBar";

export interface Coin {
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

interface MarketData {
  total_market_cap: number;
  total_volume: number;
  market_cap_change_percentage_24h: number;
  active_cryptocurrencies: number;

  total_market_cap_usd: number;
  total_market_cap_btc: number;
  total_market_cap_eth: number;
  total_volume_usd: number;
  total_volume_btc: number;
  total_volume_eth: number;
  market_cap_percentage_btc: number;
  market_cap_percentage_eth: number;
}
// interface DefiData {
//   total_value_locked: number;
//   defi_volume_24h: number;
//   defi_market_cap: number;
//   defi_dominance: number;
//   top_coin_name:string;
// }

const cryptoNews: NewsItem[] = [
  {
    title: "Bitcoin Reaches New Heights",
    description:
      "The world's leading cryptocurrency continues its bullish trend as institutional adoption grows.",
    date: "2025-03-20",
  },
  {
    title: "DeFi Revolution",
    description:
      "Decentralized Finance protocols are reshaping traditional financial systems.",
    date: "2025-03-19",
  },
  {
    title: "Green Mining Initiative",
    description:
      "Major crypto mining operations transition to renewable energy sources.",
    date: "2025-03-18",
  },
];

async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          Accept: "application/json",
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw new Error("Failed after retries");
}

export default function Home() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  // const [defiData, setDefiData] = useState<DefiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleCoinClick = (coinId: string) => {
    console.log(`Navigating to coin: ${coinId}`);
  };

  const scrollbtn = () => {
    const position = window.scrollY + 700;
    window.scrollTo({ top: position, behavior: "smooth" });
  };

  useEffect(() => {
    let isMounted = true;

    const fetchCoins = async () => {
      const options = {
        method: "GET",
        url: "https://api.coingecko.com/api/v3/coins/markets",
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 100,
          sparkline: false,
          price_change_percentage: "24h,7d",
        },
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-kn4mzED9f94TGtdGsPf3sZrd",
        },
      };

      axios
        .request(options)
        .then((res) => {
          if (isMounted) {
            setCoins(res.data);
            setError(null);
            setLoading(false);
          }
        })
        .catch((err) => {
          if (isMounted) {
            console.error("Error fetching coins:", err);
            setError(
              "Failed to load cryptocurrency data. Please try again later."
            );
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

  // const fetchDefiData = async () => {
  //   try {
  //     const response = await fetch("https://api.coingecko.com/api/v3/global/decentralized_finance_defi");
  //     const data = await response.json();
  //     setDefiData({
  //       defi_market_cap: data.data.defi_market_cap,
  //       defi_volume_24h: data.data.trading_volume_24h,
  //       defi_dominance: data.data.defi_dominance,
  //       top_coin_name: data.data.top_coin_name,
  //       total_value_locked: data.data.total_value_locked || 0 // Adding missing required property
  //     });
  //   } catch (error) {
  //     console.error("Error fetching DeFi data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchDefiData();
  //   const interval = setInterval(fetchDefiData, 60000);
  //   return () => clearInterval(interval);
  // }, []);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/global");
        const data = await response.json();
        setMarketData({
          total_market_cap: data.data.total_market_cap.usd,
          total_volume: data.data.total_volume.usd,
          market_cap_change_percentage_24h:
            data.data.market_cap_change_percentage_24h_usd,
          active_cryptocurrencies: data.data.active_cryptocurrencies,
          total_market_cap_usd: data.data.total_market_cap.usd,
          total_market_cap_btc: data.data.total_market_cap.btc,
          total_market_cap_eth: data.data.total_market_cap.eth,
          total_volume_usd: data.data.total_volume.usd,
          total_volume_btc: data.data.total_volume.btc,
          total_volume_eth: data.data.total_volume.eth,
          market_cap_percentage_btc: data.data.market_cap_percentage.btc,
          market_cap_percentage_eth: data.data.market_cap_percentage.eth,
        });
      } catch (error) {
        console.error("Error fetching market data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}

      <div className="flex flex-col gap-4">
        <Marquee
          direction="left"
          speed={120}
          className="bg-black-500 text-white py-2"
        >
          <div className="flex gap-8">
            {coins.slice(0, 8).map((coin) => (
              <div key={coin.id} className="flex items-center gap-1">
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-6 h-6 sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full"

                  // className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                />
                <div className="flex items-center gap-0">
                  <span className="text-sm sm:text-base font-medium gap-0 sm:block hidden">
                    {coin.name}
                  </span>
                  <span className="text-xs font-medium gap-0 block sm:hidden">
                    {coin.name}
                  </span>
                  <div className="flex items-center gap-0 ml-1 mr-6">
                    {coin.price_change_percentage_24h > 0 ? (
                      <ArrowRight className="w-4 h-4 text-green-500 rotate-45" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-red-500 rotate-[135deg]" />
                    )}
                    <span
                      className={`text-sm ${
                        coin.price_change_percentage_24h > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Marquee>
      </div>
      <MarqueeBar />

      <div className="relative overflow-hidden">
        <div className="hero-grid absolute inset-0 opacity-10"></div>

        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pt-8 sm:pt-20 pb-16 sm:pb-10">
          <div
            id="hero-div"
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12"
          >
            <div className="space-y-4 sm:space-y-8 px-4 sm:px-6">
              <div
                id="marketdesktopdiv"
                className="flex flex-wrap justify-items-end gap-4 text-xs sm:text-sm p-4 rounded-lg shadow-lg"
              >
                {/* Market Cap Section */}

                <NeonGradientCard>
                  {marketData ? (
                    <div className="flex items-center gap-3 p-3 shadow-md w-full sm:w-24 md:w-32 lg:w-48 xl:w-60">
                      <span className="text-muted-foreground text-gray-300 text-xs sm:text-sm">
                        Market Cap (INR):
                      </span>
                      <span className="font-medium text-xs sm:text-sm text-white">
                        ₹
                        {(
                          (marketData.total_market_cap_usd * 82.75) /
                          1e12
                        ).toFixed(2)}
                        T
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-3 shadow-md w-full sm:w-24 md:w-32 lg:w-48 xl:w-60">
                      <div className="w-16 h-4 bg-gray-600 animate-pulse rounded-md" />
                      <div className="flex items-center gap-1">
                        <div className="w-12 h-6 bg-gray-600 animate-pulse rounded-md" />
                      </div>
                    </div>
                  )}
                </NeonGradientCard>

                <NeonGradientCard>
                  {marketData ? (
                    <div className="flex items-center gap-3 p-3 shadow-md w-full sm:w-24 md:w-32 lg:w-48 xl:w-60">
                      <span className="text-muted-foreground text-gray-300 text-xs sm:text-sm">
                        Total Volume (USD):
                      </span>
                      <span className="font-medium text-xs sm:text-sm text-white">
                        ${(marketData.total_volume_usd / 1e9).toFixed(2)}B
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-3 shadow-md w-full sm:w-24 md:w-32 lg:w-48 xl:w-60">
                      <div className="w-16 h-4 bg-gray-600 animate-pulse rounded-md" />
                      <div className="flex items-center gap-1">
                        <div className="w-12 h-6 bg-gray-600 animate-pulse rounded-md" />
                      </div>
                    </div>
                  )}
                </NeonGradientCard>

                <NeonGradientCard>
                  {marketData ? (
                    <div className="flex items-center gap-3 p-3 shadow-md w-full sm:w-24 md:w-32 lg:w-48 xl:w-60">
                      <span className="text-muted-foreground text-gray-300 text-xs sm:text-sm">
                        Market Cap Percentage (BTC):
                      </span>
                      <span className="font-medium text-xs sm:text-sm text-white">
                        {marketData.market_cap_percentage_btc.toFixed(2)}%
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-3 shadow-md w-full sm:w-24 md:w-32 lg:w-48 xl:w-60">
                      <div className="w-16 h-4 bg-gray-600 animate-pulse rounded-md" />
                      <div className="flex items-center gap-1">
                        <div className="w-12 h-6 bg-gray-600 animate-pulse rounded-md" />
                      </div>
                    </div>
                  )}
                </NeonGradientCard>

                <NeonGradientCard>
                  {marketData ? (
                    <div className="flex items-center gap-3 p-3 shadow-md w-full sm:w-24 md:w-32 lg:w-48 xl:w-60">
                      <span className="text-muted-foreground text-gray-300 text-xs sm:text-sm">
                        Market Cap Percentage (ETH):
                      </span>
                      <span className="font-medium text-xs sm:text-sm text-white">
                        {marketData.market_cap_percentage_eth.toFixed(2)}%
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-3 shadow-md w-full sm:w-24 md:w-32 lg:w-48 xl:w-60">
                      <div className="w-16 h-4 bg-gray-600 animate-pulse rounded-md" />
                      <div className="flex items-center gap-1">
                        <div className="w-12 h-6 bg-gray-600 animate-pulse rounded-md" />
                      </div>
                    </div>
                  )}
                </NeonGradientCard>

                {/* Active Cryptocurrencies Section
  <NeonGradientCard>
    {marketData ? (
      <div className="flex items-center gap-3 p-3 shadow-md w-full sm:w-24 md:w-32 lg:w-48 xl:w-60">
        <span className="text-muted-foreground text-gray-300 text-xs sm:text-sm">
          Active Cryptocurrencies:
        </span>
        <span className="font-medium text-xs sm:text-sm text-white">
          {marketData.active_cryptocurrencies.toLocaleString()}
        </span>
      </div>
    ) : (
      <div className="flex items-center gap-3 p-3 shadow-md w-full sm:w-24 md:w-32 lg:w-48 xl:w-60">
        <div className="w-16 h-4 bg-gray-600 animate-pulse rounded-md" />
        <div className="flex items-center gap-1">
          <div className="w-12 h-6 bg-gray-600 animate-pulse rounded-md" />
        </div>
      </div>
    )}
  </NeonGradientCard> */}
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
                The Future of Digital Assets
              </h1>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-muted-foreground">
                Track real-time cryptocurrency prices, market trends, and
                insights on the most secure and advanced crypto platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <Button
                  className="group relative overflow-hidden"
                  size="lg"
                  id="b1"
                  onClick={scrollbtn}
                >
                  <span className="mr-4 text-base transition-opacity duration-500 group-hover:opacity-0">
                    Get Started
                  </span>
                  <i
                    id="chev"
                    className="absolute right-1 top-1 bottom-1 rounded-sm z-10 grid w-1/4 place-items-center transition-all duration-500 bg-primary-foreground/15 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95 text-black-500"
                  >
                    <ChevronRight
                      size={20}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </i>
                </Button>

                <Link className="relative" href="/calculator">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full text-base sm:w-auto"
                  >
                    Profit Calculator
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative order-first sm:order-last" id="hero-img">
              <div className="absolute inset-0 bg-primary/20 blur-xl sm:w-3/4 md:w-full h-auto object-cover"></div>
              <img
                id="hero-img"
                src="https://imgproxy.gamma.app/resize/quality:80/resizing_type:fit/width:1200/https://cdn.gamma.app/a699hwuvbchbj8u/generated-images/tfCmVMsapZO1cHYFJyq0b.jpg"
                alt="Cryptocurrency"
                className="relative rounded-2xl animate-float w-full sm:w-3/4 md:w-full h-auto object-cover shadow-lg sm:shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Coins Section */}
      <section className="py-8 sm:py-16 px-2 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-6 sm:mb-3">
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

            <div className="container-padding py-4 bg-card/50 backdrop-blur-sm  mt-8">
              <div className="flex flex-col sm:flex-row justify-start items-start gap-2">
                <div className="flex items-center gap-2">
                  <h2 className="heading-3 ">
                    Today's Cryptocurrency Prices by Market Cap
                  </h2>
                
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="text-destructive text-center mb-4 sm:mb-8 text-sm sm:text-base">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {loading
              ? Array(9)
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
                            <h2 className="text-lg sm:text-xl font-semibold">
                              {coin.name}
                            </h2>
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
                            $
                            {coin.current_price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </p>
                          <div className="flex flex-col items-end">
                            <p
                              className={`text-xs sm:text-sm font-medium ${
                                coin.price_change_percentage_24h > 0
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {coin.price_change_percentage_24h > 0 ? "+" : ""}
                              {coin.price_change_percentage_24h?.toFixed(2) ||
                                "0.00"}
                              % (24h)
                            </p>
                            <p
                              className={`text-xs sm:text-sm ${
                                coin.price_change_percentage_7d > 0
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {coin.price_change_percentage_7d > 0 ? "+" : ""}
                              {coin.price_change_percentage_7d?.toFixed(2) ||
                                "0.00"}
                              % (7d)
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                          <div>
                            <p className="text-muted-foreground">Market Cap</p>
                            <p className="font-medium">
                              ${(coin.market_cap / 1e9).toFixed(2)}B
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">24h Volume</p>
                            <p className="font-medium">
                              ${(coin.total_volume / 1e9).toFixed(2)}B
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">
                              Circulating Supply
                            </p>
                            <p className="font-medium">
                              {coin.circulating_supply.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Max Supply</p>
                            <p className="font-medium">
                              {coin.max_supply
                                ? coin.max_supply.toLocaleString()
                                : "∞"}
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
              <Card
                key={index}
                className="p-4 sm:p-6 hover:glow transition-shadow duration-200"
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                  {news.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-2 sm:mb-3">
                  {news.description}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {news.date}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

     
    </main>
  );
}
