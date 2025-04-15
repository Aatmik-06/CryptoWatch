"use client"
import { useState , useEffect} from "react";
import { motion } from "framer-motion";
import { CryptoTicker } from "../components1/layout/crypto-ticker";
import { CalculatorForm, type ResultType } from "./calculator-form";
import { ResultsDisplay } from "./results-display";
import Marquee from "react-fast-marquee";
import MarqueeBar from "../components/MarqueeBar";
import { Search, TrendingUp, Newspaper, ArrowRight, ChevronRight } from "lucide-react";
import axios from "axios";
import { Coin } from "../page";

export default function Calculator() {

    const [coins, setCoins] = useState<Coin[]>([]);   
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);  
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



  const [results, setResults] = useState<ResultType | null>(null);

  const handleCalculation = (calculatedResults: ResultType) => {
    setResults(calculatedResults);
  };
  return (
    <div className="bg-black text-white">
        <Marquee
          direction="left"
          speed={120}
          className="bg-black-500 text-white py-2"
        >
         
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
          
        </Marquee>
       {/* </div> */}
       <MarqueeBar />
      
      {/* Hero Section */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,149,255,0.15)_0%,transparent_70%)]"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Investment Return Calculator</h1>
            <p className="text-xl text-gray-400 mb-8">
              Calculate how your investments could grow over time with our compound interest calculator.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Calculator Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <CalculatorForm onCalculate={handleCalculation} />
            <ResultsDisplay results={results} />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Investment Strategies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="w-12 h-12 bg-blue-900/50 flex items-center justify-center rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Regular Investments</h3>
              <p className="text-gray-400">
                Making consistent periodic investments can significantly boost your long-term returns through dollar-cost averaging.
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="w-12 h-12 bg-blue-900/50 flex items-center justify-center rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Compound Interest</h3>
              <p className="text-gray-400">
                The power of compound interest means your earnings generate their own earnings over time, accelerating your wealth growth.
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="w-12 h-12 bg-blue-900/50 flex items-center justify-center rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Diversification</h3>
              <p className="text-gray-400">
                Spreading investments across different assets can help manage risk while still capturing growth opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

       {/* Footer */}
       <footer className="bg-secondary/30 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-20">
            <div>
              <h3 className="text-xl font-bold text-primary mb-4">
                CryptoWatch
              </h3>
              <p className="text-muted-foreground">
                Your trusted source for cryptocurrency market data and insights.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    API Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Market Data
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-secondary mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 CryptoWatch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}